import { useRef, useState } from "react";
import "./App.css";

function App() {
  const audioRef = useRef(null);

  const [currentSong, setCurrentSong] = useState(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);

  const songs = [
  {
    title: "tum-tak",
    artist: "Artist One",
    src: "/songs/song1.mp3",
    cover: "/images/cover1.jpg",
  },
  {
    title: "perfect",
    artist: "Artist Two",
    src: "/songs/song2.mp3",
    cover: "/images/cover2.jpg",
  },
  {
    title: "husn",
    artist: "Artist Three",
    src: "/songs/song3.mp3",
    cover: "/images/cover3.jpg",
  },
];

  const playSong = (song) => {
    setCurrentSong(song);
    setTimeout(() => {
      audioRef.current.play();
    }, 100);
  };

  const updateProgress = () => {
    if (!audioRef.current.duration) return;

    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;

    setCurrentTime(current);
    setDuration(total);
    setProgress((current / total) * 100);
  };

  const setSeek = (e) => {
    const newTime =
      (e.target.value / 100) * audioRef.current.duration;

    audioRef.current.currentTime = newTime;
  };

  const changeVolume = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const formatTime = (time) => {
    if (!time) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
  };

  return (
    <div className="app">
      <h2>🎵 My Music Player</h2>

      {/* SONG CARDS */}
      <div className="song-grid">
        {songs.map((song) => (
          <div
            key={song.id}
            className={`song-card ${
              currentSong?.id === song.id ? "active" : ""
            }`}
            onClick={() => playSong(song)}
          >
            <img src={song.cover} alt={song.title} />
            <h4>{song.title}</h4>
            <p>{song.artist}</p>
          </div>
        ))}
      </div>

      {/* PLAYER SECTION */}
      {currentSong && (
        <div className="player">
          <img
            src={currentSong.cover}
            alt="cover"
            className="cover"
          />

          <div className="player-info">
            <h3>{currentSong.title}</h3>
            <p>{currentSong.artist}</p>
          </div>

          <div className="controls">
            <button onClick={() => audioRef.current.play()}>
              ▶
            </button>
            <button onClick={() => audioRef.current.pause()}>
              ⏸
            </button>
          </div>

          <input
            type="range"
            value={progress}
            onChange={setSeek}
            max="100"
          />

          <div className="time">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="volume-control">
            🔊
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={changeVolume}
            />
          </div>

          <audio
            ref={audioRef}
            src={currentSong.file}
            onTimeUpdate={updateProgress}
          />
        </div>
      )}
    </div>
  );
}

export default App;