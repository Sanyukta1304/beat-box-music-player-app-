import SongCard from "./SongCard";
import "./Trending.css";

function NewReleases({ songs }) {
  return (
    <section className="trending-section">

      <div className="trending-header">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
        >
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>

        <h2>New Releases</h2>
      </div>

      <div className="trending-grid">
        {songs?.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>

    </section>
  );
}

export default NewReleases;