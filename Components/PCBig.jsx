import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../Styles/PCBigs.css";

export const PCBig = (props) => {
    const navigate = useNavigate();

    return (
        <div
            className="Big"
            style={{ backgroundImage: `url(${props.img})`, height: "39%", backgroundSize: "cover", backgroundPosition: "center" }}
            onClick={() => navigate(`/podcast/${props.id}`)}
            role="button"
            aria-label={`Open details for ${props.title}`}
        >
        </div>
    );
};

// Add PropTypes validation
PCBig.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
};




