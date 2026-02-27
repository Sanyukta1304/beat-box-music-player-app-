import "./Dashboard.css";

function Dashboard() {
  const trendingSongs = [
    {
      id: 1,
      title: "Night Vibes",
      artist: "DJ Nova",
      genre: "Lo-Fi",
      duration: "3:45",
      image: "https://source.unsplash.com/300x300/?music",
    },
    {
      id: 2,
      title: "Sky High",
      artist: "Ava Beats",
      genre: "Pop",
      duration: "4:12",
      image: "https://source.unsplash.com/300x300/?album",
    },
    {
      id: 3,
      title: "Deep Flow",
      artist: "Beat Master",
      genre: "EDM",
      duration: "2:58",
      image: "https://source.unsplash.com/300x300/?headphones",
    },
    {
      id: 4,
      title: "Summer Chill",
      artist: "Luna",
      genre: "Indie",
      duration: "3:20",
      image: "https://source.unsplash.com/300x300/?concert",
    },
  ];

  return (
    <div className="dashboard-container">

      {/* ✅ NAVBAR */}
      <nav className="dashboard-nav">
        <div className="nav-left">
          <h2>🎵 BeatBox</h2>

          <ul>
            <li className="active">Home</li>
            <li>Library</li>
            <li>Favorites</li>
            <li>Profile</li>
          </ul>
        </div>

        <div className="nav-right">
          <input type="text" placeholder="Search music..." />
        </div>
      </nav>

      {/* ✅ HERO BANNER */}
      <div className="hero-banner">
        <h1>Welcome to BeatBox</h1>
        <p>Discover and enjoy your favorite music</p>
      </div>

      {/* ✅ TRENDING SECTION */}
      <div className="trending-section">
        <h2>Trending Now</h2>

        <div className="song-grid">
          {trendingSongs.map((song) => (
            <div key={song.id} className="song-card">

              <img src={song.image} alt="album" />

              <div className="song-info">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
                <p>{song.genre}</p>
              </div>

              <div className="song-footer">
                <span>{song.duration}</span>

                <div className="buttons">
                  <button>❤️</button>
                  <button>➕</button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Dashboard;