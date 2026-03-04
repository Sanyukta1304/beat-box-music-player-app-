import { useContext, useEffect, useState } from "react";
import { MusicContext } from "../context/MusicContext";
import "./Player.css";

const Player = () => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    audioRef,
    playNext,
    playPrevious,
    isShuffle,
    setIsShuffle,
    repeatMode,
    setRepeatMode,
  } = useContext(MusicContext);

  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const updateTime = () => {
      const percent =
        (audio.currentTime / audio.duration) * 100;
      setProgress(percent || 0);

      setCurrentTime(formatTime(audio.currentTime));
      setDuration(formatTime(audio.duration));
    };

    audio.addEventListener("timeupdate", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [audioRef]);

  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleSeek = (e) => {
    const value = e.target.value;
    const audio = audioRef.current;
    audio.currentTime = (value / 100) * audio.duration;
    setProgress(value);
  };

  const handleVolume = (e) => {
    const value = e.target.value;
    audioRef.current.volume = value;
    setVolume(value);
  };

  if (!currentSong) return null;

  return (
    <div className="player">
      {/* LEFT */}
      <div className="player-left">
        <img src={currentSong.image} alt={currentSong.title} />
        <div>
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artist}</p>
        </div>
      </div>

      {/* CENTER */}
      <div className="player-center">
        <div className="controls">
          <button
            className={isShuffle ? "active" : ""}
            onClick={() => setIsShuffle(!isShuffle)}
          >
            🔀
          </button>

          {/* PREVIOUS */}
          <button onClick={playPrevious}>⏪</button>

          {/* PLAY / PAUSE */}
          <button className="play-toggle" onClick={togglePlay}>
            {isPlaying ? "❚❚" : "▶"}
          </button>

          {/* NEXT */}
          <button onClick={playNext}>⏩</button>

          {/* REPEAT */}
          <button
            className={repeatMode !== "off" ? "active" : ""}
            onClick={() =>
              setRepeatMode(
                repeatMode === "off"
                  ? "all"
                  : repeatMode === "all"
                  ? "one"
                  : "off"
              )
            }
          >
            {repeatMode === "one" ? "🔂" : "🔁"}
          </button>
        </div>

        <div className="timeline">
          <span>{currentTime}</span>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="progress"
          />

          <span>{duration}</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="player-right">
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
