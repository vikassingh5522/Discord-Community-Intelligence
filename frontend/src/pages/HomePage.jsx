import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const globalStyles = `
  /* Hide scrollbar for Chrome, Brave, Safari */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for Firefox */
  html {
    scrollbar-width: none;
  }
`;

const isAuthenticated = () => !!localStorage.getItem("token");

export default function HomePage() {
  const loggedIn = isAuthenticated();

  return (
    <>
    
      <style>{globalStyles}</style>

      <div
        className="relative w-screen min-h-screen bg-[#0d102b] text-white overflow-x-hidden overflow-y-scroll"
        style={{ fontFamily: "Sora, sans-serif" }}
      >
      
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-80 h-80 bg-purple-600 rounded-full opacity-20 blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600 rounded-full opacity-20 blur-[140px]" />
        </div>

        <section className="w-full min-h-screen flex flex-col items-center justify-center px-6 text-center relative z-20">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl sm:text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-2xl"
          >
            Discord Analytics
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-gray-300 mt-6 text-lg sm:text-xl max-w-3xl leading-relaxed"
          >
            The most powerful AI-driven intelligence platform for Discord servers —
            track growth, engagement, sentiment, retention and real-time community health.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {loggedIn ? (
              <Link
                to="/login"
                className="mt-10 inline-block px-12 py-4 bg-purple-600 hover:bg-purple-500 rounded-2xl text-xl font-semibold shadow-[0_0_25px_rgba(139,92,246,0.6)] transition hover:scale-105"
              >
                Go to Dashboard →
              </Link>
            ) : (
              <Link
                to="/login"
                className="mt-10 inline-block px-12 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-xl font-semibold shadow-[0_0_25px_rgba(99,102,241,0.6)] transition hover:scale-105"
              >
                Login to Continue →
              </Link>
            )}
          </motion.div>

      
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 text-gray-400 cursor-pointer text-lg"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            ↓ Scroll Down
          </motion.div>
        </section>

        <section className="w-full py-28 px-6 flex flex-col items-center text-center relative z-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-10">
            Powerful Intelligence Features
          </h2>

          <p className="text-gray-300 max-w-4xl text-lg sm:text-xl leading-relaxed mb-14">
            Our advanced AI models monitor your server in real-time and perform deep
            analysis on activity, behavior, trends, and community engagement.
          </p>

      
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl">
            {[
              "Real-time Server Analytics",
              "Engagement Heatmaps",
              "Community Sentiment Tracking",
              "Retention & Churn Predictions",
              "AI-Moderation Insights",
              "Automated Weekly Reports",
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl hover:scale-105 transition"
              >
                <h3 className="text-xl font-semibold">{feature}</h3>
              </motion.div>
            ))}
          </div>
        </section>

      
        <section className="w-full flex justify-center py-24 px-6 relative z-20">
          <motion.img
            src="https://cdn.prod.website-files.com/5f9072399b2640f14d6a2bf4/690bd1527f131ae7862bbc5b_image11.png"
            alt="Analytics Dashboard"
            className="w-[85%] max-w-5xl rounded-3xl drop-shadow-[0_0_35px_rgba(255,255,255,0.15)]"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1 }}
          />
        </section>

        
        <footer className="w-full py-5 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Discord Analytics • Built with ❤️ by Vikas
        </footer>
      </div>
    </>
  );
}
