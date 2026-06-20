import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PodNavigation } from "../Components/navigation";
import { getFavoritesForUser, toggleFavoriteEpisode } from "../config/favorites";
import "../Styles/Search.css";
import "../Styles/home.css";

export const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  const loadFavorites = async () => {
    setLoading(true);
    setError("");

    if (!userEmail) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const { data, error } = await getFavoritesForUser(userEmail);
    if (error) {
      setError("Unable to load favorites. Please try again later.");
      setFavorites([]);
    } else {
      setFavorites(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemove = async (fav) => {
    setLoading(true);
    const { error } = await toggleFavoriteEpisode({
      userEmail,
      showId: fav.show_id,
      season: fav.season,
      episode: fav.episode,
      title: fav.title,
      description: fav.description,
      audioUrl: fav.audio_url,
    });
    if (error) {
      setError("Unable to remove favorite. Please try again.");
    }
    await loadFavorites();
  };

  const goToEpisode = (fav) => {
    navigate(`/podcast/${fav.show_id}/season/${fav.season}/episode/${fav.episode}`);
  };

  return (
    <div className="page-container">
      <PodNavigation />
      <div className="page-content favorites-page">
        <h1>Favorites</h1>
        {!userEmail && (
          <div className="no-results">
            <p>Please log in to see your saved favorites.</p>
            <button className="clear-btn" onClick={() => navigate("/Profile")}>Go to Profile</button>
          </div>
        )}

        {userEmail && loading && (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}

        {userEmail && !loading && favorites.length === 0 && (
          <div className="no-results">
            <p>You have no favorite episodes yet.</p>
            <p>Tap the star icon on an episode page to save favorites.</p>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        {favorites.length > 0 && (
          <div className="favorites-list">
            {favorites.map((fav) => (
              <div key={`${fav.show_id}-${fav.season}-${fav.episode}`} className="favorite-row">
                <div className="favorite-main">
                  <h3>{fav.title || `S${fav.season} • E${fav.episode}`}</h3>
                  <p>{fav.description || "No description available."}</p>
                  <div className="favorite-meta">
                    <span>Show: {fav.title ? fav.title : fav.show_id}</span>
                    <span>Saved: {new Date(fav.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="favorite-actions">
                  <button className="primary-btn" onClick={() => goToEpisode(fav)}>
                    Play
                  </button>
                  <button className="clear-btn" onClick={() => handleRemove(fav)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};