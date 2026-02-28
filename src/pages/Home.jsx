import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import SongCard from "../components/SongCard";
import "./Home.css";

const Home = () => {
  const { filteredSongs, newReleaseSongs } = useContext(MusicContext);

  return (
    <div className="home">

      {/* HERO */}
      <div className="hero">
        <h1>Welcome to BeatBox</h1>
        <p>Your vibe. Your music. Anytime.</p>
      </div>

      {/* TRENDING */}
      <section className="section">
        <div className="section-header">
          <h2>Trending Now</h2>
          <span>View All</span>
        </div>

        <div className="song-grid">
          {filteredSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>

      {/* NEW RELEASES */}
      <section className="section">
        <div className="section-header">
          <h2>New Releases</h2>
          <span>View All</span>
        </div>

        <div className="song-grid">
          {newReleaseSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;