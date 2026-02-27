import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // ✅ reuse same styling

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((u) => u.email === email);

    if (userExists) {
      alert("User already exists");
      return;
    }

    users.push({ email, password });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account Created!");

    navigate("/login", { replace: true });
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="app-title">
          BeatBox 🎵
        </div>

        <div className="subtitle">
          Create your account
        </div>

        <h2>Sign Up</h2>

        <input
          type="email"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>
          Sign Up
        </button>

        <div className="signup-text">
          Already have an account?
          <span onClick={() => navigate("/login")}>
            Login
          </span>
        </div>

      </div>
    </div>
  );
}

export default Register;