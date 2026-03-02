import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
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

import "./App.css";

function LayoutWrapper({ children }) {
  const location = useLocation();

  // Hide Navbar & Player on auth pages
  const hideLayout = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="app-layout">
      {!hideLayout && <Navbar />}

      <main className="main-content">
        {children}
      </main>

      {!hideLayout && <Player />}
    </div>
  );
}

function App() {
  return (
    <MusicProvider>
      <BrowserRouter>
        <LayoutWrapper>
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

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </LayoutWrapper>
      </BrowserRouter>
    </MusicProvider>
  );
}

export default App;