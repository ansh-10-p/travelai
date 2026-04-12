"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "../travel/AppContext";

export const AuthPage = () => {
  const { setCurrentPage, isDarkMode } = useApp();
  const dark = isDarkMode;
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = () => {
    setIsLoading(true);
    // Simulate OAuth - In production, use next-auth or similar
    setTimeout(() => {
      const userData = { 
        name: "Guest User", 
        email: "user@gmail.com", 
        provider: "google" as const
      };
      localStorage.setItem("user", JSON.stringify(userData));
      setCurrentPage("home");
    }, 1000);
  };

  const handleFacebookAuth = () => {
    setIsLoading(true);
    // Simulate OAuth - In production, use next-auth or similar
    setTimeout(() => {
      const userData = { 
        name: "Guest User", 
        email: "user@facebook.com", 
        provider: "facebook" as const
      };
      localStorage.setItem("user", JSON.stringify(userData));
      setCurrentPage("home");
    }, 1000);
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate email authentication
    setTimeout(() => {
      const userData = { 
        name: isSignUp ? name : "Guest User",
        email, 
        provider: "email" as const
      };
      localStorage.setItem("user", JSON.stringify(userData));
      setCurrentPage("home");
    }, 1000);
  };

  return (
    <div className={`min-h-screen ${dark ? "bg-gray-900" : "bg-white"} flex items-center justify-center px-4 py-12`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-black tracking-tight mb-2 ${dark ? "text-white" : "text-gray-900"}`}>
            TravelAI
          </h1>
          <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>
            {isSignUp ? "Create your travel companion account" : "Welcome back to your travel companion"}
          </p>
        </div>

        {/* Auth Card */}
        <motion.div
          key={isSignUp ? "signup" : "login"}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className={`rounded-3xl border p-8 ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} shadow-xl mb-6`}
        >
          {/* Email Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
            {isSignUp && (
              <div>
                <label className={`text-xs font-semibold uppercase tracking-wider block mb-2 ${dark ? "text-gray-400" : "text-gray-600"}`}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-colors focus:border-orange-400 ${
                    dark
                      ? "bg-gray-900 border-gray-600 text-white placeholder-gray-500"
                      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                  }`}
                  required
                />
              </div>
            )}

            <div>
              <label className={`text-xs font-semibold uppercase tracking-wider block mb-2 ${dark ? "text-gray-400" : "text-gray-600"}`}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-colors focus:border-orange-400 ${
                  dark
                    ? "bg-gray-900 border-gray-600 text-white placeholder-gray-500"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                }`}
                required
              />
            </div>

            <div>
              <label className={`text-xs font-semibold uppercase tracking-wider block mb-2 ${dark ? "text-gray-400" : "text-gray-600"}`}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-colors focus:border-orange-400 ${
                  dark
                    ? "bg-gray-900 border-gray-600 text-white placeholder-gray-500"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                }`}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold py-3 rounded-xl transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`flex-1 h-px ${dark ? "bg-gray-700" : "bg-gray-200"}`} />
            <span className={`text-xs font-semibold ${dark ? "text-gray-500" : "text-gray-400"}`}>OR</span>
            <div className={`flex-1 h-px ${dark ? "bg-gray-700" : "bg-gray-200"}`} />
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                dark
                  ? "bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-900"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <button
              onClick={handleFacebookAuth}
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                dark
                  ? "bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-900"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </button>
          </div>
        </motion.div>

        {/* Toggle Auth Mode */}
        <div className={`text-center text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setEmail("");
              setPassword("");
              setName("");
            }}
            className="font-semibold text-orange-500 hover:text-orange-600 transition-colors"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>

        {/* Terms & Privacy */}
        <p className={`text-xs text-center mt-6 ${dark ? "text-gray-500" : "text-gray-400"}`}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
};
