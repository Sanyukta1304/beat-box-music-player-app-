import { createContext, useState, useRef, useEffect, useMemo } from "react";

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

  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off");
  const [activeQueue, setActiveQueue] = useState([]);

  // 🔎 SEARCH
  const [searchQuery, setSearchQuery] = useState("");

  // 🎨 THEME
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 🔔 TOAST SYSTEM
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  // 💾 LOCAL STORAGE
  const storedFavorites =
    JSON.parse(localStorage.getItem("favorites")) || [];
  const storedPlaylist =
    JSON.parse(localStorage.getItem("playlist")) || [];

  const [favorites, setFavorites] = useState(storedFavorites);
  const [playlist, setPlaylist] = useState(storedPlaylist);

  // 🎵 SONG LIST
  const songs = [
    {
      id: 1,
      title: "Electric Pulse",
      artist: "Bass Drop",
      genre: "EDM",
      album: "Electric Dreams",
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
      album: "Evening Glow",
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
      album: "City Lights",
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
      album: "Chill Sessions",
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
      album: "Road Trip",
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
      album: "Skyline",
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
      album: "Midnight Vibes",
      duration: "3:33",
      image: "/images/cover7.jpg",
      audio: "/audio/song7.mp3",
      isNew: true,
    },
  ];

  // 🔎 GLOBAL FILTER
  const filterSongs = (list) => {
    return list.filter((song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.album.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredSongs = useMemo(
    () => filterSongs(songs),
    [searchQuery]
  );

  const filteredFavorites = useMemo(
    () => filterSongs(favorites),
    [searchQuery, favorites]
  );

  const newReleaseSongs = songs.filter((song) => song.isNew);

  const filteredNewReleases = useMemo(
    () => filterSongs(newReleaseSongs),
    [searchQuery]
  );

  // ▶ PLAY SONG
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

  const togglePlay = () => {
    if (!currentSong) return;

    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();

    setIsPlaying(!isPlaying);
  };

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
        if (repeatMode === "all") nextIndex = 0;
        else {
          setIsPlaying(false);
          return;
        }
      }
    }

    playSong(activeQueue[nextIndex], activeQueue);
  };

  const playPrevious = () => {
    if (!currentSong || activeQueue.length === 0) return;

    const currentIndex = activeQueue.findIndex(
      (song) => song.id === currentSong.id
    );

    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = activeQueue.length - 1;

    playSong(activeQueue[prevIndex], activeQueue);
  };

  // ❤️ FAVORITES
  const addToFavorites = (song) => {
    const exists = favorites.find((item) => item.id === song.id);

    let updated;

    if (exists) {
      updated = favorites.filter((item) => item.id !== song.id);
      showToast("Removed from Favorites ❌");
    } else {
      updated = [...favorites, song];
      showToast("Added to Favorites ❤️");
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // ➕ ADD TO PLAYLIST
  const addToPlaylist = (song) => {
    const exists = playlist.find((item) => item.id === song.id);

    if (exists) {
      showToast("Already in Playlist ⚠️");
      return;
    }

    const updated = [...playlist, song];
    setPlaylist(updated);
    localStorage.setItem("playlist", JSON.stringify(updated));
    showToast("Added to Playlist 🎵");
  };

  // ❌ REMOVE FROM PLAYLIST
  const removeFromPlaylist = (id) => {
    const updated = playlist.filter((item) => item.id !== id);
    setPlaylist(updated);
    localStorage.setItem("playlist", JSON.stringify(updated));
    showToast("Removed from Playlist 🗑");
  };

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

  return (
    <MusicContext.Provider
      value={{
        user,
        login,
        logout,
        songs,
        filteredSongs,
        newReleaseSongs,
        filteredNewReleases,
        favorites,
        filteredFavorites,
        playlist,
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
        addToFavorites,
        addToPlaylist,
        removeFromPlaylist,
        audioRef,
        theme,
        setTheme,
        searchQuery,
        setSearchQuery,
        toast,
        filterSongs,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};