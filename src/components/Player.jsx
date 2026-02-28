import { useContext, useEffect, useRef, useState } from "react";
import { MusicContext } from "../context/MusicContext";
import "./Player.css";

const Player = () => {
  const { currentSong, isPlaying, setIsPlaying } = useContext(MusicContext);

  const audioRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolume = (e) => {
    const vol = e.target.value;
    setVolume(vol);
    audioRef.current.volume = vol;
  };

  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!currentSong) return null;

  return (
    <div className="player">
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* LEFT - SONG INFO */}
      <div className="player-left">
        <img src={currentSong.image} alt={currentSong.title} />
        <div>
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artist}</p>
        </div>
      </div>

      {/* CENTER - CONTROLS */}
      <div className="player-center">
        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? "❚❚" : "▶"}
        </button>

        <div className="progress-section">
          <span>{formatTime(currentTime)}</span>

          <input
            type="range"
            min="0"
            max="100"
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
          />

          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* RIGHT - VOLUME */}
      <div className="player-right">
        <span>🔊</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolume}
        />
      </div>
    </div>
  );
};

export default Player;