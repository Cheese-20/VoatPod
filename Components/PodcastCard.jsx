import PropTypes from "prop-types";  // Import PropTypes
import "../Styles/PCBigs.css";

export const PodcastCard = (props) => {
    return (
        <div className="Card" style={{ backgroundImage: `url(${props.img})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        </div>
    );
};

PodcastCard.propTypes = {
    title: PropTypes.string.isRequired,  // 'title' should be a string and required
    img: PropTypes.string.isRequired,    // Ensure img is a string (url)
};
