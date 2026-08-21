import { forwardRef } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import type { Room } from "./roomsData";
import "./RoomCard.css";

interface RoomCardProps {
  room: Room;
  style?: CSSProperties;
  isActive: boolean;
  onPointerDown?: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerMove?: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerUp?: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onSeeDetails?: () => void;
}

// Intentionally minimal: image, name, price, See Details. Full room info
// lives in RoomDetails, not here.
const RoomCard = forwardRef<HTMLDivElement, RoomCardProps>(
  (
    { room, style, isActive, onPointerDown, onPointerMove, onPointerUp, onSeeDetails },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`room-stack-card${isActive ? " room-stack-card-active" : ""}`}
        style={style}
        onPointerDown={isActive ? onPointerDown : undefined}
        onPointerMove={isActive ? onPointerMove : undefined}
        onPointerUp={isActive ? onPointerUp : undefined}
        onPointerCancel={isActive ? onPointerUp : undefined}
      >
        <div className="room-stack-card-image">
          <img src={room.image} alt={room.name} draggable={false} />
        </div>
        <div className="room-stack-card-body">
          <h3 className="room-stack-card-name">{room.name}</h3>
          <p className="room-stack-card-price">
            {room.price}
            <span className="room-stack-card-price-unit"> / night</span>
          </p>
          <button
            type="button"
            className="room-stack-card-btn"
            onClick={(e) => {
              e.stopPropagation();
              onSeeDetails?.();
            }}
          >
            See Details
          </button>
        </div>
      </div>
    );
  },
);

RoomCard.displayName = "RoomCard";

export default RoomCard;
