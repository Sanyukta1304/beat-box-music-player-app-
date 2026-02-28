import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import SongCard from "../components/SongCard";
import "./Dashboard.css";

const Dashboard = () => {
  const { songs } = useContext(MusicContext);

  const trendingSongs = songs.slice(0, 5);
  const newReleaseSongs = songs.slice(5, songs.length);

  return (
    <div className="dashboard-container">

      <h2 className="section-title">Trending Now</h2>
      <div className="song-grid">
        {trendingSongs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>

      <h2 className="section-title">New Releases</h2>
      <div className="song-grid">
        {newReleaseSongs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>

    </div>
  );
};

export default Dashboard;