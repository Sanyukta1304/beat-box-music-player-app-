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

  // ✅ SONG LIST (MATCHES YOUR FILE NAMES)
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

  // ✅ PLAY SONG
  const playSong = (song) => {
    if (!song?.audio) return;

    // If same song → toggle
    if (currentSong?.id === song.id) {
      togglePlay();
      return;
    }

    try {
      audioRef.current.pause();
      audioRef.current.src = song.audio;
      audioRef.current.load();
      audioRef.current.play();

      setCurrentSong(song);
      setIsPlaying(true);

      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    } catch (error) {
      console.error("Error playing audio:", error);
    }
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

  // ✅ AUTH FUNCTIONS
  const login = (email) => {
    const userData = { email };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // ✅ FILTERS
  const filteredSongs = songs;
  const newReleaseSongs = songs.filter((song) => song.isNew);

  return (
    <MusicContext.Provider
      value={{
        user,
        login,
        logout,
        songs,
        filteredSongs,
        newReleaseSongs,
        currentSong,
        isPlaying,
        playSong,
        togglePlay,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};