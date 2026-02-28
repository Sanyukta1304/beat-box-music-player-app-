import { useContext, useEffect, useState } from "react";
import { MusicContext } from "../context/MusicContext";
import "./Player.css";

const Player = () => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    audioRef,
    songs,
    setCurrentSong,
  } = useContext(MusicContext);

  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

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

    const handleEnd = () => {
      if (repeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextSong();
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", handleEnd);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", handleEnd);
    };
  }, [audioRef, repeat]);

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

  const nextSong = () => {
    if (!currentSong) return;

    if (shuffle) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      setCurrentSong(songs[randomIndex]);
      return;
    }

    const currentIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );

    const nextIndex =
      (currentIndex + 1) % songs.length;

    setCurrentSong(songs[nextIndex]);
  };

  const prevSong = () => {
    if (!currentSong) return;

    const currentIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );

    const prevIndex =
      (currentIndex - 1 + songs.length) % songs.length;

    setCurrentSong(songs[prevIndex]);
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
            className={shuffle ? "active" : ""}
            onClick={() => setShuffle(!shuffle)}
          >
            🔀
          </button>

          <button onClick={prevSong}>⏮</button>

          <button className="play-toggle" onClick={togglePlay}>
            {isPlaying ? "❚❚" : "▶"}
          </button>

          <button onClick={nextSong}>⏭</button>

          <button
            className={repeat ? "active" : ""}
            onClick={() => setRepeat(!repeat)}
          >
            🔁
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