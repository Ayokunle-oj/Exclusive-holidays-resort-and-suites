import { useState } from "react";
import "./RoomGallery.css";

interface RoomGalleryProps {
  images: string[];
  alt: string;
}

// Works with a single image (current asset set) and scales up automatically
// once more room photos are added — arrows/dots only appear when needed.
const RoomGallery = ({ images, alt }: RoomGalleryProps) => {
  const [active, setActive] = useState(0);
  const hasMultiple = images.length > 1;

  return (
    <div className="room-gallery">
      <img
        src={images[active]}
        alt={alt}
        className="room-gallery-image"
        loading="lazy"
        width={1200}
        height={900}
      />

      {hasMultiple && (
        <>
          <button
            type="button"
            className="room-gallery-arrow room-gallery-arrow-left"
            aria-label="Previous image"
            onClick={() =>
              setActive((i) => (i - 1 + images.length) % images.length)
            }
          >
            ‹
          </button>
          <button
            type="button"
            className="room-gallery-arrow room-gallery-arrow-right"
            aria-label="Next image"
            onClick={() => setActive((i) => (i + 1) % images.length)}
          >
            ›
          </button>
          <div className="room-gallery-dots">
            {images.map((_, i) => (
              <span
                key={i}
                className={`room-gallery-dot${i === active ? " room-gallery-dot-active" : ""}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RoomGallery;
