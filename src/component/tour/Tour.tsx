import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import pexels_alley_chien from "../../assets/pexels_alley_chien.webp";
import "./Tour.css";

function Tour() {
  return (
    <section
      className="tour"
      style={{ backgroundImage: `url(${pexels_alley_chien})` }}
    >
      <div className="tour-overlay"></div>

      <div className="tour-content">
        <p className="tour-small-title">Watch Our Luxurious Hotel</p>
        <h2 className="tour-title">Take A Tour</h2>

        <button className="tour-play-btn" aria-label="Play hotel tour">
          <FontAwesomeIcon icon={faPlay} />
        </button>

        {/* Replace the placeholder with the actual hotel video later */}
      </div>
    </section>
  );
}

export default Tour;
