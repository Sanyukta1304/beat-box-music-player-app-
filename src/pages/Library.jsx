import { useEffect, useState } from "react";

function Library() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/songs.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch songs");
        }
        return res.json();
      })
      .then((data) => {
        setSongs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading Songs...</h2>;
  }

  return (
    <div className="library">
      <h1>Music Library</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Album</th>
            <th>Genre</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {songs.length > 0 ? (
            songs.map((song, index) => (
              <tr key={song.id}>
                <td>{index + 1}</td>
                <td>{song.title}</td>
                <td>{song.album}</td>
                <td>{song.genre}</td>
                <td>{song.duration}</td>
                <td>
                  ❤️ &nbsp; ➕
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No Songs Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Library;