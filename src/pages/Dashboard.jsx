import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import "./Dashboard.css";

function Dashboard() {
  const { user, playlist, favorites, songs } =
    useContext(MusicContext);

  const firstLetter =
    user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <div className="dashboard-container">
      {/* ================= HEADER ================= */}
      <div className="dashboard-header">
        <div className="dashboard-avatar">
          {firstLetter}
        </div>

        <div>
          <h1>{user?.email}</h1>
          <p>Music Enthusiast</p>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div>
            <h3>My Playlists</h3>
            <h2>{playlist.length}</h2>
          </div>
          <div className="stat-icon blue">🎵</div>
        </div>

        <div className="stat-card">
          <div>
            <h3>Liked Songs</h3>
            <h2>{favorites.length}</h2>
          </div>
          <div className="stat-icon red">❤️</div>
        </div>

        <div className="stat-card">
          <div>
            <h3>Total Songs</h3>
            <h2>{songs.length}</h2>
          </div>
          <div className="stat-icon green">🎶</div>
        </div>
      </div>

      {/* ================= PLAYLIST SECTION ================= */}
      <div className="dashboard-playlists">
        <h2>My Playlists</h2>

        {playlist.length === 0 ? (
          <div className="empty-playlist">
            <div className="empty-icon">🎵</div>
            <p>No playlists yet</p>
          </div>
        ) : (
          <div className="playlist-list">
            {playlist.map((song) => (
              <div key={song.id} className="playlist-item">
                <img src={song.image} alt={song.title} />
                <div>
                  <h4>{song.title}</h4>
                  <p>{song.artist}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;