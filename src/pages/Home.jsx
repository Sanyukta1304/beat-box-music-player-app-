import { useContext, useMemo } from "react";
import { MusicContext } from "../context/MusicContext";
import SongCard from "../components/SongCard";
import "./Home.css";

const Home = () => {
  const { songs, newReleaseSongs, searchQuery } =
    useContext(MusicContext);

  // 🔍 FILTER TRENDING
  const filteredSongs = useMemo(() => {
    if (!searchQuery.trim()) return songs;

    return songs.filter((song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [songs, searchQuery]);

  // 🔍 FILTER NEW RELEASES
  const filteredNewReleases = useMemo(() => {
    if (!searchQuery.trim()) return newReleaseSongs;

    return newReleaseSongs.filter((song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [newReleaseSongs, searchQuery]);

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
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))
          ) : (
            <p className="no-results">No songs found</p>
          )}
        </div>
      </div>

      {/* New Releases Section */}
      <div className="section">
        <div className="section-header">
          <h2>New Releases</h2>
        </div>

        <div className="song-row">
          {filteredNewReleases.length > 0 ? (
            filteredNewReleases.map((song) => (
              <SongCard key={song.id} song={song} />
            ))
          ) : (
            <p className="no-results">No songs found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;