import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import "./SongCard.css";

const SongCard = ({ song }) => {
  const { playSong } = useContext(MusicContext);

  return (
    <div className="song-card">
      <div className="song-image-wrapper">
        <img src={song.image} alt={song.title} />
      </div>

      <div className="song-info">
        <h3>{song.title}</h3>
        <p className="artist">{song.artist}</p>
        <p className="genre">{song.genre}</p>

        <div className="song-bottom">
          <span className="duration">{song.duration}</span>

          <div className="card-buttons">
            <button className="fav-btn">♥</button>
            <button className="add-btn">+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;