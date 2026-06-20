import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/Search.css";
import { getFavoriteForEpisode, toggleFavoriteEpisode } from "../config/favorites";
import { saveEpisodeProgress } from "../config/progress";

export const EpisodeDetail = () => {
  const { id, seasonNumber, episodeNumber } = useParams();
  const navigate = useNavigate();
  const [showData, setShowData] = useState(null);
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

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

        if (selectedEpisode) {
          setEpisode(selectedEpisode);
          const userEmail = localStorage.getItem("EmailVal");
          if (userEmail) {
            const { data: favorite, error } = await getFavoriteForEpisode({
              userEmail,
              showId: id,
              season: seasonNumber,
              episode: episodeNumber,
            });
            if (!error && favorite) {
              setIsFavorite(true);
            }
          }

          saveEpisodeProgress({
            showId: id,
            season: seasonNumber,
            episode: episodeNumber,
            title: selectedEpisode.title,
            description: selectedEpisode.description,
            audioUrl: selectedEpisode.file,
            updated: data.updated,
            completed: false,
          });
        }
      } catch (err) {
        setError(err.message || "Could not load episode.");
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, [id, seasonNumber, episodeNumber]);

  const handleFavoriteClick = async () => {
    const userEmail = localStorage.getItem("EmailVal");
    if (!userEmail) {
      window.alert("Log in to add this episode to your favorites.");
      return;
    }

    setFavoriteLoading(true);
    const { error } = await toggleFavoriteEpisode({
      userEmail,
      showId: id,
      season: seasonNumber,
      episode: episodeNumber,
      title: episode?.title,
      description: episode?.description,
      audioUrl: episode?.file,
    });
    setFavoriteLoading(false);

    if (error) {
      console.error(error);
      window.alert("Could not update favorite status. Try again.");
      return;
    }

    setIsFavorite((current) => !current);
  };

  if (loading) {
    return (
      <div className="search">
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
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
        <div className="detail-image" style={{ backgroundImage: `url(${showData.image})` }} />
        <div className="detail-meta">
          <div className="episode-title-row">
            <h1>{episode.title}</h1>
          </div>
          <div className="detail-tags">
            <span>{showData.title}</span>
            <span className="season-tag">
              Season {seasonNumber}
            
            </span>
              <button
                className={isFavorite ? "favorite-btn active" : "favorite-btn"}
                onClick={handleFavoriteClick}
                disabled={favoriteLoading}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite ? "★" : "☆"}
              </button>
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
