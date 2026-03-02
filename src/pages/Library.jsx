import { useContext, useState, useMemo } from "react";
import { MusicContext } from "../context/MusicContext";
import "./Library.css";

function Library() {
  const {
    songs,
    playSong,
    addToFavorites,
    addToPlaylist,
    favorites,
    currentSong,
  } = useContext(MusicContext);

  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortOption, setSortOption] = useState("Newest");

  const isFavorite = (id) =>
    favorites.some((song) => song.id === id);

  // 🎯 FILTER + SORT LOGIC
  const filteredSongs = useMemo(() => {
    let updatedSongs = [...songs];

    // Filter by genre
    if (selectedGenre !== "All") {
      updatedSongs = updatedSongs.filter(
        (song) => song.genre === selectedGenre
      );
    }

    // Sort logic
    if (sortOption === "Newest") {
      updatedSongs.reverse(); // latest added at bottom → reverse for newest first
    }

    if (sortOption === "Duration") {
      updatedSongs.sort((a, b) => {
        const convert = (time) => {
          const [min, sec] = time.split(":").map(Number);
          return min * 60 + sec;
        };
        return convert(a.duration) - convert(b.duration);
      });
    }

    return updatedSongs;
  }, [songs, selectedGenre, sortOption]);

  return (
    <div className="library">

      {/* HEADER */}
      <div className="library-header">
        <div>
          <h1 className="library-title">Music Library</h1>
          <p className="song-count">
            Showing {filteredSongs.length} of {songs.length} songs
          </p>
        </div>

        <div className="filter-controls">
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="All">All Genres</option>
            <option value="EDM">EDM</option>
            <option value="Chill">Chill</option>
            <option value="Pop">Pop</option>
            <option value="Rock">Rock</option>
            <option value="Lo-Fi">Lo-Fi</option>
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="Newest">Newest</option>
            <option value="Duration">Duration</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="library-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredSongs.map((song, index) => (
              <tr
                key={song.id}
                className={
                  currentSong?.id === song.id ? "active-row" : ""
                }
                onClick={() => playSong(song)}
              >
                <td>{index + 1}</td>

                <td>
                  <div className="title-wrapper">
                    <img
                      src={song.image}
                      alt={song.title}
                      className="cover-img"
                    />
                    <div>
                      <strong>{song.title}</strong>
                      <span className="artist">
                        {song.artist}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="genre-badge">
                    {song.genre}
                  </span>
                </td>

                <td>{song.duration}</td>

                <td
                  className="actions"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span
                    className={
                      isFavorite(song.id)
                        ? "heart active"
                        : "heart"
                    }
                    onClick={() => addToFavorites(song)}
                  >
                    ❤️
                  </span>

                  <span
                    className="add"
                    onClick={() => addToPlaylist(song)}
                  >
                    ➕
                  </span>
                </td>
              </tr>
            ))}

            {filteredSongs.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "40px" }}>
                  No songs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Library;