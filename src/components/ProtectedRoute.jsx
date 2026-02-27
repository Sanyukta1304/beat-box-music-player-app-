import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { MusicContext } from "../context/MusicContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(MusicContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;