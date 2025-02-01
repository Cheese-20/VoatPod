import PropTypes from "prop-types";  // Import PropTypes
import "../Styles/PCBigs.css";

export const PCBig = (props) => {
    return (
        <div className="Big" style={{ backgroundImage: `url(${props.img})`, height:"39%", backgroundSize: "cover", backgroundPosition: "center" }}>
            {/* <h2 className="identifier">#Trending</h2> */}
            {/* <img src={props.img} alt={props.title} className="BGimg" /> */}
        </div>
    );
};

// Add PropTypes validation
PCBig.propTypes = {
    title: PropTypes.string.isRequired,  // 'title' should be a string and required
    img: PropTypes.string.isRequired,    // Ensure img is a string (url)
};




