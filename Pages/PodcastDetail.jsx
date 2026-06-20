import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/Search.css";

export const PodcastDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) throw new Error("Failed to load podcast details.");
        const data = await response.json();
        setPodcast(data);
        setSelectedSeason(data.seasons?.[0]?.season ?? 1);
      } catch (err) {
        setError(err.message || "Could not fetch podcast details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPodcast();
  }, [id]);

  if (loading) {
    return (
      <div className="search">
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  if (error || !podcast) {
    return (
      <div className="search">
        <div className="not-found">
          <h2>{error || "Podcast not found."}</h2>
          <button className="back-btn" onClick={() => navigate(-1)}>
            Go back
          </button>
        </div>
      </div>
    );
  }

  const genreNames = Array.isArray(podcast.genres)
    ? podcast.genres.map((genre) => (typeof genre === "number" ? `Genre ${genre}` : genre)).join(", ")
    : "N/A";

  const seasons = Array.isArray(podcast.seasons) ? podcast.seasons : [];
  const currentSeason = seasons.find((season) => String(season.season) === String(selectedSeason)) || seasons[0] || null;
  const episodes = Array.isArray(currentSeason?.episodes) ? currentSeason.episodes : [];

  return (
    <div className="podcast-detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <div className="detail-header">
        <div className="detail-image" style={{ backgroundImage: `url(${podcast.image})` }} />
        <div className="detail-meta">
          <h1>{podcast.title}</h1>
          <p>{podcast.description}</p>
          <div className="detail-tags">
            <span>Seasons: {seasons.length}</span>
            <span>Genres: {genreNames}</span>
          </div>
        </div>
      </div>

      <section className="season-selector">
        <h2>Seasons</h2>
        <div className="season-list">
          {seasons.map((season) => (
            <button
              key={season.season}
              className={String(selectedSeason) === String(season.season) ? "season-btn selected" : "season-btn"}
              onClick={() => setSelectedSeason(season.season)}
            >
              Season {season.season}
            </button>
          ))}
        </div>
      </section>

      <section className="episodes-list">
        <h2>Episodes for Season {currentSeason?.season ?? "N/A"}</h2>
        <ul>
          {episodes.length > 0 ? (
            episodes.map((episode) => (
              <li
                key={episode.episode}
                className="episode-item"
                onClick={() => navigate(`/podcast/${id}/season/${currentSeason.season}/episode/${episode.episode}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    navigate(`/podcast/${id}/season/${currentSeason.season}/episode/${episode.episode}`);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div>
                  <strong>{episode.title}</strong>
                  <p>{episode.description}</p>
                </div>
              </li>
            ))
          ) : (
            <li className="episode-empty">No episodes available for this season.</li>
          )}
        </ul>
      </section>
    </div>
  );
};
