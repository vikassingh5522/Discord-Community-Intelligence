import React from "react";
import { motion } from "framer-motion";

const globalStyles = `
  ::-webkit-scrollbar { display: none; }
  html { scrollbar-width: none; }
`;

export default function About() {
  return (
    <>
      <style>{globalStyles}</style>

      <div
        className="relative w-screen min-h-screen bg-[#0d102b] text-white overflow-x-hidden overflow-y-scroll"
        style={{ fontFamily: "Sora, sans-serif" }}
      >

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-12 w-80 h-80 bg-purple-600 rounded-full opacity-20 blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600 rounded-full opacity-20 blur-[140px]" />
        </div>

        <section className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 text-center relative z-20 gap-16 lg:gap-28">

          <motion.img
            src="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/6847184f796a07b05ac1f559_hero-d.webp"
            alt="Analytics Visual"
            className="w-full max-w-xl rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-2xl"
            >
              About Our Intelligence
            </h1>

            <p className="text-gray-300 mt-6 text-lg sm:text-xl leading-relaxed">
              Discord Analytics turns raw server activity into powerful insights using
              advanced AI models for real-time engagement tracking, sentiment analysis,
              user behavior patterns, and long-term community evolution.
            </p>

            <p className="text-gray-300 mt-4 text-lg sm:text-xl leading-relaxed">
              It detects engagement spikes, identifies inactive segments, highlights
              trends, and monitors community health automatically.
            </p>

            <p className="text-gray-300 mt-4 text-lg sm:text-xl leading-relaxed">
              With predictive retention models and creator-level dashboards, teams can
              effortlessly understand, improve, and grow their Discord communities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 text-gray-400 cursor-pointer text-lg"
            onClick={() =>
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              })
            }
          >
            ↓ Scroll Down
          </motion.div>
        </section>

        <section className="w-full py-28 px-6 flex flex-col items-center text-center relative z-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-10">
            Why Choose Discord Analytics?
          </h2>

          <p className="text-gray-300 max-w-4xl text-lg sm:text-xl leading-relaxed mb-14">
            Our advanced AI-powered features are built for creators, moderators, and
            community managers who want complete clarity and control.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl">
            {[
              "AI-powered insights & anomaly detection",
              "Creator-grade dashboards",
              "Sentiment & toxicity tracking",
              "Behavior heatmaps & message flow",
              "Predictive growth & retention signals",
              "Weekly automated reports",
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
