import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";

// Protected Dashboard
import Dashboard from "./pages/Dashboard";

// Feature Pages
import EmojiTrendsPage from "./pages/EmojiTrendsPage";
import MemeTrendsPage from "./pages/MemeTrendsPage";
import LinkSharingPage from "./pages/LinkSharingPage";
import VoiceMetricsPage from "./pages/VoiceMetricsPage";

// ⭐ COMMUNITY HEALTH PAGE
import CommunityHealthPage from "./pages/CommunityHealthPage";

export default function App() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/dashboard";

  return (
    <div
      className="min-h-screen w-full bg-gradient-to-br 
      from-gray-900 via-gray-800 to-black text-white flex flex-col"
    >
      {!hideNavbar && <Navbar />}

      <main className="flex-grow w-full">
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Analytics Pages */}
          <Route
            path="/emoji-trends"
            element={
              <ProtectedRoute>
                <EmojiTrendsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/meme-trends"
            element={
              <ProtectedRoute>
                <MemeTrendsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/link-sharing"
            element={
              <ProtectedRoute>
                <LinkSharingPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/voice-metrics"
            element={
              <ProtectedRoute>
                <VoiceMetricsPage />
              </ProtectedRoute>
            }
          />

          {/* ⭐ COMMUNITY HEALTH MASTER PAGE */}
          <Route
            path="/community-health"
            element={
              <ProtectedRoute>
                <CommunityHealthPage />
              </ProtectedRoute>
            }
          />

        </Routes>
      </main>
    </div>
  );
}
