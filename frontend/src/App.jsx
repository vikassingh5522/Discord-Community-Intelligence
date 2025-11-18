import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";


import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";


import Dashboard from "./pages/Dashboard";


import EmojiTrendsPage from "./pages/EmojiTrendsPage";
import MemeTrendsPage from "./pages/MemeTrendsPage";
import LinkSharingPage from "./pages/LinkSharingPage";
import VoiceMetricsPage from "./pages/VoiceMetricsPage";


import CommunityHealthPage from "./pages/CommunityHealthPage";


import RaidDetectionPage from "./pages/RaidDetectionPage";     
import EventTrackingPage from "./pages/EventTrackingPage";     
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

     
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

       
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

          <Route
            path="/community-health"
            element={
              <ProtectedRoute>
                <CommunityHealthPage />
              </ProtectedRoute>
            }
          />

         
          <Route
            path="/raids"
            element={
              <ProtectedRoute>
                <RaidDetectionPage />     
              </ProtectedRoute>
            }
          />

          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <EventTrackingPage />      
              </ProtectedRoute>
            }
          />

        </Routes>
      </main>
    </div>
  );
}
