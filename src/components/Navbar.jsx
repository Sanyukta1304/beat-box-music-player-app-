import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaListAlt,
  FaHeart,
  FaUser,
  FaSearch,
  FaSun,
  FaMoon,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaMusic,
} from "react-icons/fa";

import { MusicContext } from "../context/MusicContext";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useContext(MusicContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "Library", icon: <FaListAlt />, path: "/library" },
    { name: "Favorites", icon: <FaHeart />, path: "/favorites" },
    { name: "Profile", icon: <FaUser />, path: "/dashboard" },
  ];

  /* ================= THEME ================= */

  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* ================= SCROLL ================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-left" onClick={() => navigate("/")}>
          <div className="logo-box">
            <FaMusic />
          </div>
          <span className="brand">BeatBox</span>
        </div>

        <div className="nav-center">
          {navItems.map((item) => (
            <div
              key={item.name}
              className={`nav-item ${
                location.pathname === item.path ? "active" : ""
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        <div className="nav-right">
          <div className="search-box">
            <FaSearch />
            <input placeholder="Search songs..." />
          </div>

          {/* THEME TOGGLE */}
          <div
            className="theme-icon"
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </div>

          {user && (
            <div className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt />
              <span>Logout</span>
            </div>
          )}

          <div className="hamburger" onClick={() => setMenuOpen(true)}>
            <FaBars />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;