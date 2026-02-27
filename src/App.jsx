import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const songs = [
    {
      title: "Song One",
      artist: "Artist One",
      src: "/songs/song1.mp3",
      cover: "/images/cover1.jpg",
    },
    {
      title: "Song Two",
      artist: "Artist Two",
      src: "/songs/song2.mp3",
      cover: "/images/cover2.jpg",
    },
    {
      title: "Song Three",
      artist: "Artist Three",
      src: "/songs/song3.mp3",
      cover: "/images/cover3.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const currentSong = songs[currentIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentIndex]);

  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const selectSong = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const nextSong = () => {
    const next = (currentIndex + 1) % songs.length;
    setCurrentIndex(next);
    setIsPlaying(true);
  };

  const prevSong = () => {
    const prev = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentIndex(prev);
    setIsPlaying(true);
  };

  return (
    <div className="app">
      <h2>My Music Player</h2>

      <div className="song-grid">
        {songs.map((song, index) => (
          <div
            key={index}
            className={`song-card ${currentIndex === index ? "active" : ""}`}
            onClick={() => selectSong(index)}
          >
            <img src={song.cover} alt={song.title} />
            <h4>{song.title}</h4>
            <p>{song.artist}</p>
          </div>
        ))}
      </div>

      <div className="player">
        <div className="player-left">
          <img src={currentSong.cover} alt="cover" />
          <div>
            <h4>{currentSong.title}</h4>
            <p>{currentSong.artist}</p>
          </div>
        </div>

        <div className="player-controls">
          <button onClick={prevSong}>⏮</button>
          <button onClick={playPause}>
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button onClick={nextSong}>⏭</button>
        </div>

        <audio ref={audioRef} src={currentSong.src} />
      </div>
    </div>
  );
}

export default App;