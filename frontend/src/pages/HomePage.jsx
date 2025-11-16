import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const isAuthenticated = () => !!localStorage.getItem("token");

export default function HomePage() {
  const loggedIn = isAuthenticated();

  return (
    <div className="relative w-screen h-screen flex flex-col justify-between items-center bg-gray-900 text-center overflow-hidden">

      
      <div className="absolute top-10 left-10 w-60 h-60 bg-indigo-700 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-700 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <div className="flex flex-col justify-center items-center px-6 flex-grow relative z-10">

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-lg select-none"
        >
          Discord Analytics
        </motion.h1>

       
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-300 mt-4 text-base sm:text-lg max-w-2xl md:max-w-3xl"
        >
          Track server insights, analyze user engagement, community health, 
          and real-time activity trends with powerful visual analytics.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="mt-8 p-5 rounded-2xl max-w-xl border border-transparent
                     bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
                     shadow-[0_0_30px_rgba(139,92,246,0.5)] text-white text-sm sm:text-base"
        >
          Discord Community Intelligence (DCI) helps you understand growth patterns,
          analyze member behavior, detect active channels, track message frequency,
          and build a healthier, more active community.
        </motion.div>

       
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {loggedIn ? (
            <Link
              to="/dashboard"
              className="mt-10 inline-block px-10 py-3 bg-green-600 hover:bg-green-500 
                         rounded-xl text-white text-lg font-semibold shadow-xl 
                         transition-all hover:scale-105"
            >
              Go to Dashboard →
            </Link>
          ) : (
            <Link
              to="/login"
              className="mt-10 inline-block px-10 py-3 bg-indigo-600 hover:bg-indigo-500 
                         rounded-xl text-white text-lg font-semibold shadow-xl 
                         transition-all hover:scale-105"
            >
              Login to Continue →
            </Link>
          )}
        </motion.div>

      </div>

      
      <footer className="w-full py-4 text-center text-gray-400 text-sm relative z-10">
        © {new Date().getFullYear()} Discord Analytics • Built with ❤️ by Vikas
      </footer>
    </div>
  );
}
