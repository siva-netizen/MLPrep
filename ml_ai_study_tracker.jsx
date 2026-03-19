import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, Brain, LogOut, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { LoginPage } from "@/components/ui/sign-in-page";
import HomePage from "@/components/pages/home-page";
import {
  saveUserProgress,
  getUserProgress,
  getCurriculumFromFirestore,
  trackUserActivity,
  clearTopicCache,
} from "./firestoreUtils";
import { TopicCard } from "@/components/ui/topic-card";
import { getTopicStyling } from "@/lib/topicStyling";
import { TopicDetails } from "@/components/ui/topic-details";
import curriculum from "./curriculum.json";

function flattenTopics(node) {
  if (Array.isArray(node)) return node;
  if (typeof node === "object") return Object.values(node).flatMap(flattenTopics);
  return [];
}

const curriculumTopics = flattenTopics(curriculum);

const renderTree = (node, checked, toggleTopic, openNotes, openSections, toggleSection, parentName = "") => {
  if (Array.isArray(node)) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {node.map((sub) => {
          const styling = getTopicStyling(sub);
          return (
            <TopicCard
              key={sub}
              category={parentName}
              title={sub}
              gradient={styling.gradient}
              imageUrl={styling.image}
              isCompleted={checked[sub] || false}
              onToggle={() => toggleTopic(sub)}
              onOpenNotes={() => openNotes(sub)}
              className="hover:scale-[1.02] active:scale-[0.98] transition-transform"
            />
          );
        })}
      </div>
    );
  }

  if (typeof node === "object") {
    return Object.entries(node).map(([key, value]) => {
      const isOpen = openSections[key];

      return (
        <div key={key} className="space-y-4">
          <motion.div
            layout
            className={cn(
              "overflow-hidden rounded-3xl border transition-all duration-500",
              isOpen 
                ? "bg-white border-gray-200 shadow-2xl shadow-gray-100 ring-1 ring-gray-50" 
                : "bg-white/50 backdrop-blur-sm border-gray-100 hover:border-black/10 hover:shadow-xl hover:shadow-gray-100/50"
            )}
          >
            <div
              className={cn(
                "flex justify-between items-center cursor-pointer p-6 select-none transition-colors",
                isOpen ? "bg-gray-50/50" : "hover:bg-gray-50/20"
              )}
              onClick={() => toggleSection(key)}
            >
              <div className="flex items-center gap-5">
                <div className={cn(
                  "w-1.5 h-10 rounded-full transition-all duration-500",
                  isOpen ? "bg-black scale-y-110" : "bg-gray-200"
                )} />
                <div>
                  <h3 className={cn(
                    "text-2xl font-black tracking-tight transition-colors",
                    isOpen ? "text-black" : "text-gray-700"
                  )}>{key}</h3>
                  {!isOpen && <p className="text-sm text-gray-400 font-medium">Click to expand topics</p>}
                </div>
              </div>

              <div className={cn(
                "p-2.5 rounded-full transition-all duration-500",
                isOpen ? "bg-black text-white rotate-180 shadow-lg shadow-black/20" : "bg-gray-100 text-gray-400"
              )}>
                <ChevronDown size={22} />
              </div>
            </div>

            <motion.div
              initial={false}
              animate={{ 
                height: isOpen ? "auto" : 0, 
                opacity: isOpen ? 1 : 0,
                scale: isOpen ? 1 : 0.98
              }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden"
            >
              <div className="p-6 pt-2 border-t border-gray-100/50">
                <div className="mt-6">
                  {renderTree(value, checked, toggleTopic, openNotes, openSections, toggleSection, key)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      );
    });
  }

  return null;
};

export default function StudyTracker() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [hasStarted, setHasStarted] = useState(false);
  const allTopics = curriculumTopics;

  // Handle URL changes - Single source of truth for routing
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    handleLocationChange(); // Initial check

    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const totalTopics = allTopics.length;
  const [checked, setChecked] = useState({});
  const [openSections, setOpenSections] = useState({});

  const completed = Object.values(checked).filter(Boolean).length;
  const progress = totalTopics === 0 ? 0 : Math.round((completed / totalTopics) * 100);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Load user progress from Firestore
        try {
          const userProgress = await getUserProgress(currentUser.uid);
          setChecked(userProgress);
          setProgressLoaded(true);
          // Track visit/activity
          await trackUserActivity(currentUser.uid);
        } catch (error) {
          console.error("Error loading progress:", error);
          setProgressLoaded(true); // Still mark as loaded to prevent overwrites
        }
      } else {
        setUser(null);
        setChecked({});
        setProgressLoaded(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Save progress to Firestore whenever it changes
  useEffect(() => {
    if (user && progressLoaded) { // Guard saves until progress is loaded from Firestore
      const timer = setTimeout(async () => {
        try {
          await saveUserProgress(user.uid, checked);
        } catch (error) {
          console.error("Error saving progress:", error);
        }
      }, 500); // Debounce saves

      return () => clearTimeout(timer);
    }
  }, [checked, user, progressLoaded]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Brain className="mx-auto w-12 h-12 text-green-600 animate-pulse mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage onAuthComplete={setUser} />;
  }

  // Conditional Rendering Logic
  const isNotesPath = currentPath.startsWith('/notes/');
  const isHomePath = currentPath === '/' || currentPath === '';

  // Show landing page if at root and hasn't started learning yet
  if (isHomePath && !hasStarted) {
    return (
      <HomePage 
        onStartLearning={() => setHasStarted(true)} 
        completed={completed}
        totalTopics={totalTopics}
        user={user}
      />
    );
  }

  // Handle Note Detail view
  const getTopicIdFromUrl = () => {
    const match = currentPath.match(/\/notes\/(.+)/);
    return match ? match[1] : null;
  };

  const topicId = getTopicIdFromUrl();
  if (topicId) {
    // Find matching topic name
    const topicName = allTopics.find(t => t.replace(/\s+/g, "-").toLowerCase() === topicId) || topicId;
    return (
      <TopicDetails 
        topicId={topicId}
        topicTitle={topicName}
        userId={user.uid}
        onBack={() => {
          window.history.pushState({}, '', '/');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }}
      />
    );
  }

  const toggleTopic = (topic) => {
    setChecked((prev) => ({ ...prev, [topic]: !prev[topic] }));
  };

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const openNotes = (topic) => {
    const topicId = topic.replace(/\s+/g, "-").toLowerCase();
    const url = `/notes/${topicId}`;
    window.history.pushState({}, '', url);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearTopicCache();
      setUser(null);
      setChecked({});
      setHasStarted(false); // Reset to landing page on logout
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Moved renderNode logic outside to renderTree for performance
  const renderNode = (node, parentName) => renderTree(node, checked, toggleTopic, openNotes, openSections, toggleSection, parentName);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Patterns - Consistent with Home Page */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid-dashboard"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(0,0,0,0.05)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-dashboard)" />
        </svg>
      </div>

      {/* Decorative Glows */}
      <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-blue-50/30 mix-blend-multiply blur-3xl pointer-events-none" />
      <div className="absolute -left-20 top-40 h-72 w-72 rounded-full bg-green-50/30 mix-blend-multiply blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 space-y-12">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="bg-black p-2.5 rounded-xl shadow-lg shadow-black/10">
              <Brain className="text-white h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-black">
                Study Dashboard
              </h1>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setHasStarted(false)}
              className="flex items-center gap-2 bg-white border border-gray-200 hover:border-black text-black font-bold py-2 px-5 rounded-full transition-all text-sm"
            >
              Home
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-2 px-5 rounded-full transition-all text-sm shadow-lg shadow-black/10"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Sections Container */}
        <div className="space-y-16">
          {Object.entries(curriculum).map(([section, topics]) => (
            <section key={section} className="space-y-6">
              <div className="flex items-center gap-4 px-2">
                <div className="h-8 w-1.5 bg-black rounded-full" />
                <h2 className="text-3xl font-black text-black tracking-tight">{section}</h2>
              </div>

              <div className="grid gap-6">
                {renderNode(topics, section)}
              </div>
            </section>
          ))}
        </div>

        {/* Footer info */}
        <div className="pt-12 pb-8 text-center text-gray-400 text-sm font-medium">
          <p>© 2026 AI/ML Study Companion • Structured Learning Journey</p>
        </div>
      </div>
    </div>
  );
}
