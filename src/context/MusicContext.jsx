import { createContext, useState, useRef } from "react";

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const storedUser =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;

  const [user, setUser] = useState(
    storedUser ? JSON.parse(storedUser) : null
  );

  const audioRef = useRef(new Audio());

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 🔥 NEW STATES
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off"); // off | one | all
  const [activeQueue, setActiveQueue] = useState([]); // 🔥 important

  // ✅ PERSISTENT FAVORITES & PLAYLIST
  const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const storedPlaylist = JSON.parse(localStorage.getItem("playlist")) || [];

  const [favorites, setFavorites] = useState(storedFavorites);
  const [playlist, setPlaylist] = useState(storedPlaylist);

  // ✅ SONG LIST
  const songs = [
    {
      id: 1,
      title: "Electric Pulse",
      artist: "Bass Drop",
      genre: "EDM",
      duration: "3:43",
      image: "/images/cover1.jpg",
      audio: "/audio/song1.mp3",
      isNew: true,
    },
    {
      id: 2,
      title: "Sunset Vibes",
      artist: "Luna Beats",
      genre: "Chill",
      duration: "4:02",
      image: "/images/cover2.jpg",
      audio: "/audio/song2.mp3",
      isNew: false,
    },
    {
      id: 3,
      title: "Night Drive",
      artist: "DJ Nova",
      genre: "Pop",
      duration: "3:20",
      image: "/images/cover3.jpg",
      audio: "/audio/song3.mp3",
      isNew: true,
    },
    {
      id: 4,
      title: "Deep Flow",
      artist: "Beat Collective",
      genre: "Lo-Fi",
      duration: "2:58",
      image: "/images/cover4.jpg",
      audio: "/audio/song4.mp3",
      isNew: false,
    },
    {
      id: 5,
      title: "Thunder Road",
      artist: "Rock Legends",
      genre: "Rock",
      duration: "4:14",
      image: "/images/cover5.jpg",
      audio: "/audio/song5.mp3",
      isNew: true,
    },
    {
      id: 6,
      title: "Sky High",
      artist: "Ava Beats",
      genre: "EDM",
      duration: "3:50",
      image: "/images/cover6.jpg",
      audio: "/audio/song6.mp3",
      isNew: false,
    },
    {
      id: 7,
      title: "Midnight Chill",
      artist: "Lofi Crew",
      genre: "Chill",
      duration: "3:33",
      image: "/images/cover7.jpg",
      audio: "/audio/song7.mp3",
      isNew: true,
    },
  ];

  // ✅ PLAY SONG (NOW SUPPORTS QUEUE)
  const playSong = (song, queue = songs) => {
    if (!song?.audio) return;

    setActiveQueue(queue);

    if (currentSong?.id === song.id) {
      togglePlay();
      return;
    }

    audioRef.current.pause();
    audioRef.current.src = song.audio;
    audioRef.current.load();
    audioRef.current.play();

    setCurrentSong(song);
    setIsPlaying(true);

    audioRef.current.onended = () => {
      if (repeatMode === "one") {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        playNext();
      }
    };
  };

  // ✅ TOGGLE PLAY / PAUSE
  const togglePlay = () => {
    if (!currentSong) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  // 🔥 NEXT SONG (USES ACTIVE QUEUE)
  const playNext = () => {
    if (!currentSong || activeQueue.length === 0) return;

    const currentIndex = activeQueue.findIndex(
      (song) => song.id === currentSong.id
    );

    let nextIndex;

    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * activeQueue.length);
    } else {
      nextIndex = currentIndex + 1;

      if (nextIndex >= activeQueue.length) {
        if (repeatMode === "all") {
          nextIndex = 0;
        } else {
          setIsPlaying(false);
          return;
        }
      }
    }

    playSong(activeQueue[nextIndex], activeQueue);
  };

  // 🔥 PREVIOUS SONG (USES ACTIVE QUEUE)
  const playPrevious = () => {
    if (!currentSong || activeQueue.length === 0) return;

    const currentIndex = activeQueue.findIndex(
      (song) => song.id === currentSong.id
    );

    let prevIndex = currentIndex - 1;

    if (prevIndex < 0) {
      prevIndex = activeQueue.length - 1;
    }

    playSong(activeQueue[prevIndex], activeQueue);
  };

  // ✅ TOGGLE FAVORITE
  const addToFavorites = (song) => {
    const exists = favorites.find((item) => item.id === song.id);

    let updated;

    if (exists) {
      updated = favorites.filter((item) => item.id !== song.id);
    } else {
      updated = [...favorites, song];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // ✅ ADD TO PLAYLIST
  const addToPlaylist = (song) => {
    const updated = [...playlist, song];
    setPlaylist(updated);
    localStorage.setItem("playlist", JSON.stringify(updated));
  };

  // ✅ AUTH
  const login = (email) => {
    const userData = { email };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    setPlaylist([]);
    localStorage.removeItem("user");
    localStorage.removeItem("favorites");
    localStorage.removeItem("playlist");
  };

  const newReleaseSongs = songs.filter((song) => song.isNew);

  return (
    <MusicContext.Provider
      value={{
        user,
        login,
        logout,
        songs,
        newReleaseSongs,
        currentSong,
        isPlaying,
        playSong,
        togglePlay,
        playNext,
        playPrevious,
        isShuffle,
        setIsShuffle,
        repeatMode,
        setRepeatMode,
        favorites,
        addToFavorites,
        playlist,
        addToPlaylist,
        audioRef,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};