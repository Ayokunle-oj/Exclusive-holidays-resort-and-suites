import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBed,
  faRulerCombined,
} from "@fortawesome/free-solid-svg-icons";
import RoomGallery from "./RoomGallery";
import RoomAmenities from "./RoomAmenities";
import { roomAmenities } from "./roomsData";
import type { Room } from "./roomsData";
import "./RoomDetails.css";

interface RoomDetailsProps {
  room: Room;
  originRect: DOMRect;
  onClose: () => void;
}

type Phase = "opening" | "open" | "closing";

const TRANSITION_MS = 420;

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
  radius: number;
}

// Where the panel lands once fully expanded — near full-screen on mobile,
// a large centered panel everywhere else.
const getFinalRect = (): Rect => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  if (vw <= 640) {
    return { top: 0, left: 0, width: vw, height: vh, radius: 0 };
  }

  const width = Math.min(920, vw * 0.92);
  const height = Math.min(vh * 0.88, 760);
  return {
    top: (vh - height) / 2,
    left: (vw - width) / 2,
    width,
    height,
    radius: 16,
  };
};

// Expands the clicked card in place (via a fixed-position, animated panel
// that starts at the card's exact screen position) rather than popping a
// generic modal into the center of the screen.
const RoomDetails = ({ room, originRect, onClose }: RoomDetailsProps) => {
  const [phase, setPhase] = useState<Phase>("opening");
  const finalRect = useMemo(getFinalRect, []);
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    frame.current = requestAnimationFrame(() => {
      frame.current = requestAnimationFrame(() => setPhase("open"));
    });
    return () => {
      document.body.style.overflow = "";
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  const handleClose = () => {
    setPhase("closing");
    window.setTimeout(onClose, TRANSITION_MS);
  };

  const rect: Rect =
    phase === "open"
      ? finalRect
      : {
          top: originRect.top,
          left: originRect.left,
          width: originRect.width,
          height: originRect.height,
          radius: 14,
        };

  return createPortal(
    <div className={`room-details-overlay room-details-overlay-${phase}`}>
      <div className="room-details-backdrop" onClick={handleClose} />
      <div
        className="room-details-panel"
        style={{
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          borderRadius: rect.radius,
        }}
      >
        <button
          type="button"
          className="room-details-close"
          aria-label="Close room details"
          onClick={handleClose}
        >
          ×
        </button>

        <div className="room-details-gallery">
          <RoomGallery images={[room.image]} alt={room.name} />
        </div>

        <div className={`room-details-body room-details-body-${phase}`}>
          <h2 className="room-details-name">{room.name}</h2>
          <p className="room-details-price">
            {room.price}
            <span className="room-details-price-unit"> / night</span>
          </p>
          <p className="room-details-description">{room.description}</p>

          <div className="room-details-facts">
            <span className="room-details-fact">
              <FontAwesomeIcon icon={faRulerCombined} /> {room.size}
            </span>
            <span className="room-details-fact">
              <FontAwesomeIcon icon={faBed} /> {room.bed}
            </span>
            <span className="room-details-fact">
              <FontAwesomeIcon icon={faUser} /> {room.guests}
            </span>
          </div>

          <h3 className="room-details-amenities-title">Amenities</h3>
          <RoomAmenities amenities={roomAmenities} />

          <Link
            to={`/booking?room=${room.slug}`}
            className="btn btn-gold room-details-book"
          >
            Book This Room
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default RoomDetails;
