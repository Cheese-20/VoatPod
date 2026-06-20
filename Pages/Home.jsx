import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../config/Data";
import "../Styles/home.css";
import Trending from "../Components/Trending";
import { PodNavigation } from "../Components/navigation";
import { getIncompleteProgressItems } from "../config/progress";

const genres = [
  "Personal Growth",
  "True Crime and Investigative Journalism",
  "History",
  "Comedy",
  "Entertainment",
  "Business",
  "Fiction",
  "News",
  "Kids & Family",
];

const formatDate = (value) => {
  if (!value) return "Unknown date";
  const date = new Date(value);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const Home = () => {
  const data = useData();
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [continueEpisodes, setContinueEpisodes] = useState([]);
  const navigate = useNavigate();
  const isLoading = !data || data.length === 0;

  useEffect(() => {
    setContinueEpisodes(getIncompleteProgressItems());
  }, [data]);

  const selectedShows = selectedGenre
    ? data.filter((show) => Array.isArray(show.genres) && show.genres.includes(selectedGenre))
    : [];

  const continueItems = continueEpisodes.map((item) => {
    const show = data.find((showItem) => showItem.id === item.showId);
    return {
      ...item,
      image: show?.image,
      showTitle: show?.title,
    };
  });

  if (isLoading)
    return (
      <div className="home">
        <div className="loader"></div>
      </div>
    );

  return (
    <div className="home">
      <PodNavigation />

      <h1>Trending</h1>
      <div className="trending-container">
        <Trending />
      </div>

      <h1>Genres</h1>
      <div className="genres-container">
        {genres.map((type, index) => (
          <button
            key={index}
            className={selectedGenre === index + 1 ? "genre-btn selected" : "genre-btn"}
            onClick={() => setSelectedGenre(index + 1)}
          >
            {type}
          </button>
        ))}
      </div>

      {selectedGenre && (
        <div className="genre-results">
          <h2>{genres[selectedGenre - 1] || "Genre"} shows</h2>
          {selectedShows.length > 0 ? (
            <div className="genre-grid">
              {selectedShows.map((show) => (
                <article
                  key={show.id}
                  className="genre-card"
                  onClick={() => navigate(`/podcast/${show.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") navigate(`/podcast/${show.id}`);
                  }}
                >
                  <img src={show.image} alt={show.title} />
                  <div className="genre-card-content">
                    <div className="genre-card-main">
                      <h3>{show.title}</h3>
                      <p>{show.description}</p>
                    </div>
                    <div className="genre-card-meta">
                      <span>Show: {show.title}</span>
                      <span>Uploaded: {formatDate(show.updated)}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="genre-empty">No shows found for this genre yet.</p>
          )}
        </div>
      )}

      <h1>Continue listening</h1>
      <div className="continue-list">
          {continueItems.length > 0 ? (
            continueItems.map((item) => (
              <article
                key={item.key}
                className="continue-card"
                onClick={() => navigate(`/podcast/${item.showId}/season/${item.season}/episode/${item.episode}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    navigate(`/podcast/${item.showId}/season/${item.season}/episode/${item.episode}`);
                }}
              >
                <img src={item.image} alt={item.title || item.showTitle} />
                <div className="continue-card-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span>Show: {item.showTitle || "Unknown show"}</span>
                  <span>Last visited: {formatDate(item.lastVisited)}</span>
                </div>
              </article>
            ))
          ) : (
          <div className="continue-empty">No unfinished episodes yet. Start listening to pick up where you left off.</div>
        )}
      </div>
    </div>
  );
};