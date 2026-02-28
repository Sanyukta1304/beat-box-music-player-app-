import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MusicProvider } from "./context/MusicContext";

import Navbar from "./components/Navbar";
import Player from "./components/Player";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import Favorites from "./pages/Favorites";
import Album from "./pages/Album";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css"; // make sure this exists

function App() {
  return (
    <MusicProvider>
      <BrowserRouter>
        <div className="app-layout">
          {/* Top Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
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
                path="/library"
                element={
                  <ProtectedRoute>
                    <Library />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/album/:id"
                element={
                  <ProtectedRoute>
                    <Album />
                  </ProtectedRoute>
                }
              />

              {/* Redirect unknown routes */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Bottom Global Player */}
          <Player />
        </div>
      </BrowserRouter>
    </MusicProvider>
  );
}

export default App;