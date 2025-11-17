import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="w-full h-16 backdrop-blur bg-white/10 shadow-md fixed top-0 left-0 right-0 z-50 flex items-center">
      <div className="w-full px-8 flex justify-between items-center">

        {/* Logo + Brand */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-indigo-400">
          <img src="/logo1.png" alt="Logo" className="w-8 h-8" />
          Discord Analytics
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-white text-lg">
          <Link to="/" className="hover:text-indigo-400 transition">Home</Link>
          <Link to="/about" className="hover:text-indigo-400 transition">About</Link>
          
          {/* Auth Buttons */}
          <Link to="/login" className="hover:text-indigo-400 transition">Login</Link>
          <Link to="/register" className="hover:text-indigo-400 transition">Register</Link>
        </nav>

      </div>
    </header>
  );
}
