import { useEffect } from "react";
import "./AvailabilityModal.css";

interface AvailabilityModalProps {
  open: boolean;
  onClose: () => void;
  onBook: () => void;
  checkIn: string;
  checkOut: string;
  roomType: string;
  guests: string;
}

function formatDisplayDate(iso: string): string {
  if (!iso) return "Not set";
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function AvailabilityModal({
  open,
  onClose,
  onBook,
  checkIn,
  checkOut,
  roomType,
  guests,
}: AvailabilityModalProps) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <div
      className={`availability_modal_overlay${open ? " availability_modal_visible" : ""}`}
      aria-hidden={!open}
      onClick={onClose}
    >
      <div
        className="availability_modal_card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="availability_modal_title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="availability_modal_close"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <div className="availability_modal_mark">&#10003;</div>

        <h2 id="availability_modal_title" className="availability_modal_title">
          This Room Is Available
        </h2>
        <p className="availability_modal_text">
          Good news — the {roomType} room is open for your selected dates.
          Continue to send your booking request.
        </p>

        <dl className="availability_modal_details">
          <div className="availability_modal_row">
            <dt>Check-in</dt>
            <dd>{formatDisplayDate(checkIn)}</dd>
          </div>
          <div className="availability_modal_row">
            <dt>Check-out</dt>
            <dd>{formatDisplayDate(checkOut)}</dd>
          </div>
          <div className="availability_modal_row">
            <dt>Room</dt>
            <dd>{roomType}</dd>
          </div>
          <div className="availability_modal_row">
            <dt>Guests</dt>
            <dd>{guests}</dd>
          </div>
        </dl>

        <div className="availability_modal_actions">
          <button
            type="button"
            className="availability_modal_secondary"
            onClick={onClose}
          >
            Maybe Later
          </button>
          <button
            type="button"
            className="availability_modal_primary"
            onClick={onBook}
          >
            Book This Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default AvailabilityModal;
