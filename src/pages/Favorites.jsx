import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import "./Favorites.css";

function Favorites() {
  const {
    filteredFavorites,
    playSong,
    addToFavorites,
    addToPlaylist,
  } = useContext(MusicContext);

  return (
    <div style={{ padding: "30px 60px 120px" }}>
      {/* HEADER */}
      <div className="fav-header">
        <div className="fav-icon">❤️</div>

        <div className="fav-title">
          <h1>Liked Songs</h1>
          <p>{filteredFavorites.length} songs</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="fav-table">
        <div className="fav-header-row">
          <span>#</span>
          <span>Title</span>
          <span>Album</span>
          <span>Genre</span>
          <span>Duration</span>
          <span>Actions</span>
        </div>

        {filteredFavorites.length === 0 ? (
          <p
            style={{
              padding: "30px",
              textAlign: "center",
              opacity: 0.6,
            }}
          >
            No results found
          </p>
        ) : (
          filteredFavorites.map((song, index) => (
            <div
              key={song.id}
              className="fav-row"
              onClick={() =>
                playSong(song, filteredFavorites)
              }
            >
              {/* INDEX */}
              <span>{index + 1}</span>

              {/* TITLE + IMAGE */}
              <div className="fav-song-info">
                <img src={song.image} alt={song.title} />
                <div>
                  <h4 style={{ margin: 0 }}>{song.title}</h4>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      opacity: 0.7,
                    }}
                  >
                    {song.artist}
                  </p>
                </div>
              </div>

              {/* ALBUM */}
              <span>{song.album}</span>

              {/* GENRE */}
              <span className="fav-genre">
                {song.genre}
              </span>

              {/* DURATION */}
              <span>{song.duration}</span>

              {/* ACTIONS */}
              <div
                className="fav-actions"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="fav-btn"
                  onClick={() => addToFavorites(song)}
                >
                  ❤️
                </button>

                <button
                  className="fav-btn"
                  onClick={() => addToPlaylist(song)}
                >
                  ➕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;