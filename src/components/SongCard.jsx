import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import "./SongCard.css";

const SongCard = ({ song }) => {
  const { currentSong, isPlaying, playSong } = useContext(MusicContext);
  const isActive = currentSong?.id === song.id;

  return (
    <div
      className={`song-card ${isActive ? "active" : ""}`}
      onClick={() => playSong(song)}
    >
      <div className="cover">
        <img src={song.image} alt={song.title} />

        <div className="play-overlay">
          <div className="play-button">
            {isActive && isPlaying ? "❚❚" : "▶"}
          </div>
        </div>
      </div>

      <div className="info">
        <div className="top">
          <h3>{song.title}</h3>
          {song.duration && <span>{song.duration}</span>}
        </div>
        <p>{song.artist}</p>
        {song.genre && <small>{song.genre}</small>}
      </div>
    </div>
  );
};

export default SongCard;