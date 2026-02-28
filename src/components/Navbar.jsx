import { useState, useEffect } from "react";
import {
  FaHome,
  FaListAlt,
  FaHeart,
  FaUser,
  FaSearch,
  FaSun,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaMusic,
} from "react-icons/fa";

import "./Navbar.css";

function Navbar() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: "Home", icon: <FaHome /> },
    { name: "Library", icon: <FaListAlt /> },
    { name: "Favorites", icon: <FaHeart /> },
    { name: "Profile", icon: <FaUser /> },
  ];

  /* ================= THEME ================= */

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  /* ================= SCROLL EFFECT ================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= CLOSE DRAWER ON OUTSIDE CLICK ================= */

  useEffect(() => {
    const handleClick = (e) => {
      if (menuOpen && !e.target.closest(".mobile-drawer")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>

        {/* LEFT LOGO */}
        <div className="nav-left">
          <div className="logo-box">
            <FaMusic />
          </div>
          <span className="brand">BeatBox</span>
        </div>

        {/* CENTER NAV */}
        <div className="nav-center">
          {navItems.map((item) => (
            <div
              key={item.name}
              className={`nav-item ${
                active === item.name ? "active" : ""
              }`}
              onClick={() => setActive(item.name)}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="nav-right">

          {/* SEARCH */}
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search songs, artists..."
            />
          </div>

          {/* THEME */}
          <div
            className="theme-icon"
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
          >
            <FaSun />
          </div>

          {/* LOGOUT */}
          <div className="logout-btn">
            <FaSignOutAlt />
            <span>Logout</span>
          </div>

          {/* HAMBURGER */}
          <div
            className="hamburger"
            onClick={() => setMenuOpen(true)}
          >
            <FaBars />
          </div>
        </div>
      </nav>

      {/* ================= MOBILE DRAWER ================= */}

      {menuOpen && (
        <>
          <div className="overlay" />

          <div className="mobile-drawer">
            <div className="drawer-header">
              <FaTimes onClick={() => setMenuOpen(false)} />
            </div>

            {navItems.map((item) => (
              <div
                key={item.name}
                className={`drawer-item ${
                  active === item.name ? "active" : ""
                }`}
                onClick={() => {
                  setActive(item.name);
                  setMenuOpen(false);
                }}
              >
                {item.icon}
                <span>{item.name}</span>
              </div>
            ))}

            <div className="drawer-item logout">
              <FaSignOutAlt />
              <span>Logout</span>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;