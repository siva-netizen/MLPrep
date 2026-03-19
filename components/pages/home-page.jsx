import { useState, useEffect } from 'react'
import { ArrowRight, Brain } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Zap, Target, Flame, Trophy, LayoutGrid, Mail, Github } from 'lucide-react'
import { ActivityHeatmap } from '@/components/ui/activity-heatmap'
import { AnimatedProgressCard } from '../ui/progress-card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { getUserActivity, calculateStreak, getAvailableActivityYears, getUserActivityByYear } from '../../firestoreUtils'
import curriculum from '../../curriculum.json'

export default function HomePage({ onStartLearning, completed = 0, totalTopics = 0, user }) {
  const [activityData, setActivityData] = useState({})

  const [availableYears, setAvailableYears] = useState([])
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString())

  useEffect(() => {
    const loadData = async () => {
      if (!user?.uid) return;
      
      // On initial load (user change), fetch available years first
      const years = await getAvailableActivityYears(user.uid);
      setAvailableYears(years);
      
      let yearToFetch = selectedYear;
      if (years.length > 0 && !years.includes(selectedYear)) {
        yearToFetch = years[0];
        setSelectedYear(yearToFetch);
      }
      
      const data = await getUserActivityByYear(user.uid, yearToFetch);
      setActivityData(data);
    };
    
    loadData();
  }, [user]);

  // Handle manual year changes
  useEffect(() => {
    // Skip if we're also in the process of initial loading (this is still a bit tricky with React's batching)
    // but the most reliable way is to only fetch if selectedYear changes AFTER mount.
    const fetchActivity = async () => {
      if (user?.uid) {
        const data = await getUserActivityByYear(user.uid, selectedYear);
        setActivityData(data);
      }
    };
    
    // Only fetch if availableYears is already populated (prevents double fetch on mount)
    if (availableYears.length > 0) {
      fetchActivity();
    }
  }, [selectedYear]);

  // Extract main categories from curriculum
  // Extract main categories from curriculum - memoized for performance
  const categories = import.meta.env.SSR ? [] : Object.keys(curriculum).map((categoryName) => ({
    title: categoryName,
    topics: flattenTopics(curriculum[categoryName]).length,
    description: getCategoryDescription(categoryName),
  }));

  function flattenTopics(node) {
    if (Array.isArray(node)) return node
    if (typeof node === 'object') return Object.values(node).flatMap(flattenTopics)
    return []
  }

  function getCategoryDescription(categoryName) {
    const descriptions = {
      'Mathematics for Machine Learning':
        'Master the mathematical foundations including linear algebra, calculus, and probability theory essential for understanding machine learning algorithms.',
      'Machine Learning Algorithms':
        'Learn supervised, unsupervised, and reinforcement learning techniques with practical implementations and real-world applications.',
      'Deep Learning':
        'Explore neural networks, convolutional networks, recurrent architectures, and transformers for advanced pattern recognition and AI tasks.',
      'Natural Language Processing':
        'Master text processing, language models, embeddings, and transformer architectures for understanding and generating human language.',
      'Computer Vision':
        'Learn image processing, convolutional neural networks, object detection, and segmentation for visual understanding tasks.',
      'Reinforcement Learning':
        'Understand agents, environments, and learning algorithms for training systems to make optimal decisions.',
      'AI Ethics & Deployment':
        'Explore responsible AI practices, model deployment, monitoring, and ethical considerations in production systems.',
    }
    return descriptions[categoryName] || `Comprehensive topics on ${categoryName}`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-12 md:py-20 lg:py-32">
        {/* Background Patterns */}
        <div className="absolute inset-0 z-0 opacity-40">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
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
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-blue-50/50 mix-blend-multiply blur-3xl" />
        <div className="absolute -left-20 top-40 h-72 w-72 rounded-full bg-green-50/50 mix-blend-multiply blur-3xl" />
        <div className="absolute right-1/4 top-3/4 h-64 w-64 rounded-full bg-orange-50/50 mix-blend-multiply blur-3xl opacity-50" />
        
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <motion.div 
                whileHover={{ rotate: 15 }}
                className="rounded-full bg-black p-3 shadow-lg shadow-black/20"
              >
                <Brain className="h-8 w-8 text-white" />
              </motion.div>
              <span className="text-sm font-bold text-black uppercase tracking-[0.2em]">
                Master AI & ML
              </span>
            </div>

            <h1 className="mb-8 text-5xl font-extrabold leading-[1.1] tracking-tight text-black md:text-7xl">
              Your Complete <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent italic">AI/ML</span> Journey
            </h1>

            <p className="mb-10 text-xl text-gray-600 leading-relaxed max-w-2xl">
              Master the future of technology with a structured, step-by-step curriculum covering everything from foundations to advanced architectures.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onStartLearning}
                size="lg"
                className="gap-3 bg-black px-10 py-7 text-xl font-bold text-white shadow-xl shadow-black/20 hover:bg-gray-800 transition-all rounded-full"
              >
                Start Learning
                <ArrowRight className="h-6 w-6" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content / Dashboard */}
      <section className="bg-gray-50/50 py-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-bold text-black md:text-4xl">Learning Insights</h2>
              <p className="mt-2 text-lg text-gray-600">Track your momentum and upcoming milestones</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Column: Progress & Stats */}
            <div className="space-y-8 lg:col-span-4">
              <AnimatedProgressCard
                icon={<Zap className="h-6 w-6" />}
                title="Your Learning Journey"
                progressLabel="Study Progress"
                progressSubLabel={`Today's session - ${completed} topics completed`}
                currentValue={completed}
                maxValue={totalTopics}
                className="border-black bg-black text-white shadow-xl"
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="mb-4 rounded-xl bg-orange-50 p-3 text-orange-600 w-fit">
                    <Flame className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-black">{calculateStreak(activityData)} Days</div>
                  <div className="text-sm text-gray-500">Current Streak</div>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="mb-4 rounded-xl bg-blue-50 p-3 text-blue-600 w-fit">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-black">
                    {completed > 0 ? (completed * 10).toLocaleString() : '0'}
                  </div>
                  <div className="text-sm text-gray-500">Total Points</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <ActivityHeatmap 
                className="h-full" 
                data={activityData} 
                availableYears={availableYears}
                selectedYear={selectedYear}
                onYearChange={setSelectedYear}
              />
            </div>
          </div>

          {/* Curriculum Overview */}
          <div className="mt-20">
            <div className="mb-10 text-center">
              <span className="mb-2 inline-block rounded-full bg-green-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-green-700">
                Explore Curriculum
              </span>
              <h2 className="text-3xl font-bold text-black">Structured Learning Paths</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-green-200 hover:shadow-md"
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="rounded-xl bg-gray-50 p-2.5 text-gray-600 group-hover:bg-green-50 group-hover:text-green-600 transition-colors">
                        <LayoutGrid size={22} />
                      </div>
                      <span className="text-xs font-bold text-gray-400">
                        {cat.topics} Topics
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-black group-hover:text-green-700 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-relaxed text-gray-500">
                      {cat.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={onStartLearning}
                    className="mt-6 w-fit gap-2 px-0 font-bold hover:bg-transparent hover:text-green-600 text-gray-900"
                  >
                    View Details
                    <ArrowRight size={16} />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-6 w-6 text-black" />
                <span className="text-xl font-bold text-black tracking-tight">Study Companion</span>
              </div>
              <p className="text-sm text-gray-500 max-w-xs">
                Your structured journey to mastering Artificial Intelligence and Machine Learning.
              </p>
            </div>

            <div className="flex flex-col gap-6 md:flex-row md:gap-12">
              <div>
                <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-black">Support</h4>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="mailto:sivasabarivel008@gmail.com" 
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
                    >
                      <Mail size={16} />
                      sivasabarivel008@gmail.com
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://github.com/siva-netizen/ML_AI_StudyNotes/issues" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
                    >
                      <Github size={16} />
                      Raise an Issue
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-50 pt-8 text-center text-xs text-gray-400">
            <p>© 2026 AI/ML Study Companion • Built for Lifelong Learners</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
