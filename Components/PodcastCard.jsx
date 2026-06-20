import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../Styles/PCBigs.css";

export const PodcastCard = (props) => {
    const navigate = useNavigate();

    const genreLabels = Array.isArray(props.genres)
        ? props.genres.map((genre) => (typeof genre === "number" ? `Genre ${genre}` : genre)).join(", ")
        : props.genres || "N/A";

    return (
        <div
            className="Card"
            style={{ backgroundImage: `url(${props.img})`, backgroundSize: "cover", backgroundPosition: "center" }}
            onClick={() => navigate(`/podcast/${props.id}`)}
            role="button"
            aria-label={`Open details for ${props.title}`}
        >
            <div className="card-overlay" />
            <div className="card-popup">
                <h3>{props.title}</h3>
                <p>{props.description || "No description available."}</p>
                <div className="card-info">
                    <span>Seasons: {props.seasons ?? "N/A"}</span>
                    <span>Genres: {genreLabels}</span>
                </div>
            </div>
        </div>
    );
};

PodcastCard.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    description: PropTypes.string,
    seasons: PropTypes.number,
    genres: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
    ]),
};

