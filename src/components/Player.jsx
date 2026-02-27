import { useContext, useEffect, useRef } from "react";
import { MusicContext } from "../context/MusicContext";

function Player() {
  const { currentSong } = useContext(MusicContext);
  const audioRef = useRef();

  useEffect(() => {
    if (currentSong) {
      audioRef.current.play();
    }
  }, [currentSong]);

  if (!currentSong) return null;

  return (
    <div className="player">
      <h3>Now Playing: {currentSong.title}</h3>

      <audio
        ref={audioRef}
        controls
        src={currentSong.audio}
      />
    </div>
  );
}

export default Player;