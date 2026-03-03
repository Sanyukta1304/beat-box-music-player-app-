import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import "./SongCard.css";

const SongCard = ({ song }) => {
  const {
    playSong,
    currentSong,
    isPlaying,
    favorites,
    addToFavorites,
    addToPlaylist,
  } = useContext(MusicContext);

  const isActive = currentSong?.id === song.id;
  const isFav = favorites.some((item) => item.id === song.id);

  return (
    <div
      className={`song-card ${isActive ? "active" : ""}`}
      onClick={() => playSong(song)}
    >
      <div className="song-image-wrapper">
        <img src={song.image} alt={song.title} />

        <div className="play-overlay">
          {isActive && isPlaying ? "⏸" : "▶"}
        </div>
      </div>

      <div className="song-info">
        <h3>{song.title}</h3>
        <p className="artist">{song.artist}</p>
        <p className="genre">{song.genre}</p>

        <div className="song-bottom">
          <span className="duration">{song.duration}</span>

          <div
            className="card-buttons"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={isFav ? "heart active" : "heart"}
              onClick={() => addToFavorites(song)}
            >
              ❤️
            </button>

            <button
              className="add"
              onClick={() => addToPlaylist(song)}
            >
              ➕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;