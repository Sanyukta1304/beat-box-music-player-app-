import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">🎵 BeatBox</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/library">Library</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/dashboard">Profile</Link>
      </div>

      <Link to="/login" className="login-btn">
        Login
      </Link>
    </nav>
  );
}

export default Navbar;