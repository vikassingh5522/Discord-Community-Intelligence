import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user || null));

      nav("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-screen h-screen flex justify-center items-center px-4"
      style={{ backgroundColor: "#0D1321" }} 
    >
     
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl text-white"
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold mb-6 text-center"
        >
          Create Account
        </motion.h2>

        <form onSubmit={submit} className="space-y-4">

          <motion.input
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full p-3 bg-white/20 border border-white/40 rounded-lg 
                       text-white placeholder-gray-200 
                       focus:bg-white/30 focus:outline-none transition"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <motion.input
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full p-3 bg-white/20 border border-white/40 rounded-lg 
                       text-white placeholder-gray-200 
                       focus:bg-white/30 focus:outline-none transition"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <motion.input
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            type="password"
            className="w-full p-3 bg-white/20 border border-white/40 rounded-lg 
                       text-white placeholder-gray-200 
                       focus:bg-white/30 focus:outline-none transition"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="w-full bg-indigo-500 hover:bg-indigo-400 transition-all 
                       p-3 rounded-xl font-semibold text-white shadow-lg"
          >
            {loading ? "Creating account..." : "Register"}
          </motion.button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-300">
          Already have an account?{" "}
          <span
            className="text-indigo-300 underline cursor-pointer"
            onClick={() => nav("/login")}
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}
