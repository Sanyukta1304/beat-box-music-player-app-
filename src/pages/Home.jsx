import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import SongCard from "../components/SongCard";
import "./Home.css";

const Home = () => {
  const { songs, newReleaseSongs } = useContext(MusicContext);

  return (
    <div className="home">      
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-text">
          <h1>Welcome to BeatBox</h1>
          <p>Discover and enjoy your favorite music</p>
        </div>
      </div>

      {/* Trending Section */}
      <div className="section">
        <div className="section-header">
          <h2>Trending Now</h2>
        </div>

        <div className="song-row">
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </div>

      {/* New Releases Section */}
      <div className="section">
        <div className="section-header">
          <h2>New Releases</h2>
        </div>

        <div className="song-row">
          {newReleaseSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;