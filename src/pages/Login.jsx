import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MusicContext } from "../context/MusicContext";
import "./Login.css"; // ✅ we move styles to css file

function Login() {
  const { login } = useContext(MusicContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      alert("Invalid credentials");
      return;
    }

    login(email);
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="app-title">
          BeatBox 🎵
        </div>

        <div className="subtitle">
          Your Ultimate Music Streaming Experience
        </div>

        <h2>Welcome Back</h2>
        <p>Sign in to continue to BeatBox</p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Sign In
        </button>

        <div className="signup-text">
          Don’t have an account?
            <span onClick={() => navigate("/register")}>
              Sign Up
            </span>
        </div>

      </div>
    </div>
  );
}

export default Login;