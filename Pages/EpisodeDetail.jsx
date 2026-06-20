import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/Search.css";

export const EpisodeDetail = () => {
  const { id, seasonNumber, episodeNumber } = useParams();
  const navigate = useNavigate();
  const [showData, setShowData] = useState(null);
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) throw new Error("Unable to load show details.");
        const data = await response.json();
        setShowData(data);
        const season = Array.isArray(data.seasons)
          ? data.seasons.find((item) => String(item.season) === String(seasonNumber))
          : null;
        const selectedEpisode = season?.episodes?.find(
          (item) => String(item.episode) === String(episodeNumber)
        );
        setEpisode(selectedEpisode || null);
      } catch (err) {
        setError(err.message || "Could not load episode.");
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, [id, seasonNumber, episodeNumber]);

  if (loading) {
    return (
      <div className="search">
        <div className="loader"></div>
      </div>
    );
  }

  if (error || !showData || !episode) {
    return (
      <div className="search">
        <div className="not-found">
          <h2>{error || "Episode not found."}</h2>
          <button className="back-btn" onClick={() => navigate(-1)}>
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="podcast-detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <div className="detail-header episode-header">
        <div
          className="detail-image"
          style={{ backgroundImage: `url(${showData.image})` }}
        />
        <div className="detail-meta">
          <h1>{episode.title}</h1>
          <div className="detail-tags">
            <span>{showData.title}</span>
            <span>Season {seasonNumber}</span>
            <span>Episode {episodeNumber}</span>
          </div>
          <p>{episode.description || "No episode description available."}</p>
        </div>
      </div>

      <section className="episode-player-section">
        <h2>Listen</h2>
        <audio className="episode-player" controls src={episode.file}>
          Your browser does not support the audio element.
        </audio>
      </section>
    </div>
  );
};
