import { useCallback, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import RoomCard from "./RoomCard";
import RoomDetails from "./RoomDetails";
import { rooms } from "./roomsData";
import "./RoomSwipe.css";

const SWIPE_THRESHOLD = 110;
const VISIBLE_DEPTH = 3;

interface ExpandedState {
  index: number;
  rect: DOMRect;
}

const RoomSwipe = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [expanded, setExpanded] = useState<ExpandedState | null>(null);

  const dragStartX = useRef(0);
  const activeCardRef = useRef<HTMLDivElement | null>(null);

  const total = rooms.length;

  const goTo = useCallback(
    (direction: 1 | -1) => {
      setActiveIndex((current) => (current + direction + total) % total);
    },
    [total],
  );

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragStartX.current = e.clientX;
    setIsDragging(true);
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setDragX(e.clientX - dragStartX.current);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragX <= -SWIPE_THRESHOLD) {
      goTo(1);
    } else if (dragX >= SWIPE_THRESHOLD) {
      goTo(-1);
    }
    setDragX(0);
  };

  const handleSeeDetails = (index: number) => {
    const node = activeCardRef.current;
    if (!node) return;
    setExpanded({ index, rect: node.getBoundingClientRect() });
  };

  // Only render the top few cards in the stack — the rest stay out of the DOM.
  const visibleRooms = Array.from(
    { length: Math.min(VISIBLE_DEPTH, total) },
    (_, offset) => {
      const roomIndex = (activeIndex + offset) % total;
      return { room: rooms[roomIndex], roomIndex, offset };
    },
  );

  return (
    <div className="room-swipe">
      <div className="room-swipe-stack">
        {visibleRooms.map(({ room, roomIndex, offset }) => {
          const isActive = offset === 0;
          const style = isActive
            ? {
                transform: `translateX(${dragX}px) rotate(${dragX / 24}deg)`,
                transition: isDragging
                  ? "none"
                  : "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                zIndex: VISIBLE_DEPTH,
                opacity: 1,
              }
            : {
                transform: `translateY(${offset * 16}px) scale(${1 - offset * 0.045})`,
                transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                zIndex: VISIBLE_DEPTH - offset,
                opacity: 1 - offset * 0.12,
              };

          return (
            <RoomCard
              key={room.slug}
              ref={isActive ? activeCardRef : undefined}
              room={room}
              style={style}
              isActive={isActive}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onSeeDetails={() => handleSeeDetails(roomIndex)}
            />
          );
        })}
      </div>

      <div className="room-swipe-controls">
        <button
          type="button"
          className="room-swipe-arrow"
          aria-label="Previous room"
          onClick={() => goTo(-1)}
        >
          ‹
        </button>
        <div className="room-swipe-dots">
          {rooms.map((room, i) => (
            <span
              key={room.slug}
              className={`room-swipe-dot${i === activeIndex ? " room-swipe-dot-active" : ""}`}
            />
          ))}
        </div>
        <button
          type="button"
          className="room-swipe-arrow"
          aria-label="Next room"
          onClick={() => goTo(1)}
        >
          ›
        </button>
      </div>

      {expanded && (
        <RoomDetails
          room={rooms[expanded.index]}
          originRect={expanded.rect}
          onClose={() => setExpanded(null)}
        />
      )}
    </div>
  );
};

export default RoomSwipe;
