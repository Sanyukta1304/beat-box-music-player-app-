import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MusicContext } from "../context/MusicContext";

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
        <h2>Welcome Back</h2>
        <p>Sign in to continue to BeatBox</p>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button onClick={handleLogin}>
          Sign In
        </button>

        {/* ✅ Sign Up Link */}
        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Don’t have an account?
          <span
            style={{
              color: "#38bdf8",
              cursor: "pointer",
              marginLeft: "5px",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/register")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;