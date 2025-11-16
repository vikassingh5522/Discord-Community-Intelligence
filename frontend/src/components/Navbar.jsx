import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="w-full h-16 backdrop-blur bg-white/10 shadow-md fixed top-0 left-0 right-0 z-50 flex items-center">
      <div className="w-full px-8 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-400">
          Discord Analytics
        </Link>

        <nav className="space-x-6 text-white">
          <Link to="/login" className="hover:text-indigo-400">Login</Link>
          <Link to="/register" className="hover:text-indigo-400">Register</Link>
        </nav>
      </div>
    </header>
  );
}
