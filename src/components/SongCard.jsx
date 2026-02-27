import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";

function SongCard({ song }) {
  const { setCurrentSong, addToFavorites } =
    useContext(MusicContext);

  return (
    <div style={{ border: "1px solid white", margin: "10px", padding: "10px" }}>
      <img src={song.image} width="200" />
      <h3>{song.title}</h3>

      <button onClick={() => setCurrentSong(song)}>
        ▶ Play
      </button>

      <button onClick={() => addToFavorites(song)}>
        ❤️ Favorite
      </button>
    </div>
  );
}

export default SongCard;