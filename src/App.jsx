import { useRef, useState } from "react";
import "./App.css";

function App() {
  const audioRef = useRef(null);
  const [currentSong, setCurrentSong] = useState(null);

  const songs = [
    { id: 1, title: "Night Drive", artist: "DJ Moon", file: "/songs/song1.mp3" },
    { id: 2, title: "Chill Vibes", artist: "LoFi Boy", file: "/songs/song1.mp3" },
    { id: 3, title: "Energy Blast", artist: "ElectroX", file: "/songs/song1.mp3" },
  ];

  const playSong = (song) => {
    setCurrentSong(song);
    setTimeout(() => {
      audioRef.current.play();
    }, 100);
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>🎵 BeatBox</h2>
        <p>Home</p>
        <p>Search</p>
        <p>Your Library</p>
      </div>

      {/* Main Content */}
      <div className="main">
        <h1>Trending Songs</h1>

        {songs.map((song) => (
          <div key={song.id} className="song" onClick={() => playSong(song)}>
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </div>
        ))}
      </div>

      {/* Bottom Player */}
      <div className="player">
  {currentSong ? (
    <>
      <div className="player-info">
        <h4>{currentSong.title}</h4>
        <p>{currentSong.artist}</p>
      </div>

      <div className="controls">
        <button onClick={() => audioRef.current.play()}>▶</button>
        <button onClick={() => audioRef.current.pause()}>⏸</button>
      </div>

      <audio ref={audioRef} src={currentSong.file} />
    </>
  ) : (
    <p>Select a song to play</p>
  )}
</div>
    </div>
  );
}
export default App;