import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./RoomAmenities.css";

interface RoomAmenitiesProps {
  amenities: string[];
}

const RoomAmenities = ({ amenities }: RoomAmenitiesProps) => (
  <ul className="room-amenities">
    {amenities.map((item) => (
      <li key={item} className="room-amenities-item">
        <FontAwesomeIcon icon={faCheck} className="room-amenities-icon" />
        {item}
      </li>
    ))}
  </ul>
);

export default RoomAmenities;
