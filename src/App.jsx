import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { MusicProvider } from "./context/MusicContext";
import ProtectedRoute from "./components/ProtectedRoute";

/* Pages */
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import Favorites from "./pages/Favorites";
import Album from "./pages/Album";

function App() {
  return (
    <MusicProvider>
      <BrowserRouter>
        <Routes>

          {/* ✅ Public Routes */}
<Route path="/" element={<Navigate to="/login" replace />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />

          {/* ✅ Protected Routes */}
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

          {/* ✅ Catch Unknown Routes */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </MusicProvider>
  );
}

export default App;