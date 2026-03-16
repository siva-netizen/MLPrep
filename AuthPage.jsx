import { useState } from "react";
import { auth } from "./firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { initializeUserDocument } from "./firestoreUtils";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut, Brain } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthPage({ user, onAuthComplete }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let userCredential;

      if (isLogin) {
        // Sign in existing user
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Create new user
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // Initialize user document in Firestore
        await initializeUserDocument(
          userCredential.user.uid,
          userCredential.user.email
        );
      }

      // Call the callback with the authenticated user
      onAuthComplete(userCredential.user);
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onAuthComplete(null);
    } catch (err) {
      setError(err.message || "Logout failed");
    }
  };

  // If user is logged in, show logout button
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center justify-center">
                <div className="bg-green-100 p-4 rounded-xl">
                  <Brain className="text-green-600 w-8 h-8" />
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 text-sm">Logged in as</p>
                <p className="text-lg font-semibold">{user.email}</p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-8">
            {/* Header */}
            <div className="flex items-center justify-center mb-6 gap-3">
              <div className="bg-green-100 p-3 rounded-xl">
                <Brain className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AI/ML Prep</h1>
                <p className="text-xs text-gray-500">Study Tracker</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                {loading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
              </button>
            </form>

            {/* Toggle between login and signup */}
            <div className="mt-6 text-center text-sm">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
