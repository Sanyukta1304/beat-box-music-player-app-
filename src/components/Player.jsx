import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import { Play, Pause } from "lucide-react";

const Player = () => {
  const { currentSong, isPlaying, togglePlay } = useContext(MusicContext);

  if (!currentSong) return null;

  return (
    <div className="
      fixed bottom-0 left-0 w-full
      bg-white/5 backdrop-blur-2xl
      border-t border-white/10
      px-6 py-4
      flex items-center justify-between
      shadow-2xl shadow-black/40
      z-50
    ">
      {/* Song Info */}
      <div className="flex items-center gap-4">
        <img
          src={currentSong.image}
          alt={currentSong.title}
          className="w-14 h-14 rounded-xl object-cover shadow-lg"
        />
        <div>
          <h4 className="text-white font-semibold text-sm">
            {currentSong.title}
          </h4>
          <p className="text-gray-400 text-xs">
            {currentSong.artist}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        <button
          onClick={togglePlay}
          className="
            bg-green-500
            hover:bg-green-400
            text-black
            p-4 rounded-full
            shadow-lg shadow-green-500/40
            transition transform hover:scale-110
          "
        >
          {isPlaying ? (
            <Pause size={20} />
          ) : (
            <Play size={20} className="ml-1" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Player;