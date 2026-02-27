import { useEffect, useState } from "react";
import SongCard from "../components/SongCard";

function SongLibrary() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("/songs.json")
      .then((res) => res.json())
      .then((data) => setSongs(data));
  }, []);

  return (
    <div>
      <h1>Song Library</h1>

      {songs.map((song) => (
        <SongCard key={song.id} song={song} />
      ))}
    </div>
  );
}

export default SongLibrary;