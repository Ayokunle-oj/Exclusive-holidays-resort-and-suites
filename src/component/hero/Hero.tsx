import "./Hero.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pexels_alley_chien from "../../assets/pexels-louie-alma.jpg";
import AvailabilityModal from "../Availabilitymodal/Availabilitymodal";

function Hero() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomType, setRoomType] = useState("Suite");
  const [guests, setGuests] = useState("1 Person");
  const [loaded, setLoaded] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // trigger on next frame so the initial (hidden) styles apply first
    const raf = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  function handleCheckAvailability() {
    setShowAvailability(true);
  }

  function handleBookNow() {
    setShowAvailability(false);
    navigate("/booking", {
      state: { checkIn, checkOut, roomType, guests },
    });
  }

  return (
    <div className="Hero_container">
      <div
        className="hero_wrapper"
        style={{ backgroundImage: `url(${pexels_alley_chien})` }}
      >
        <div className={`hero_text${loaded ? " hero_loaded" : ""}`}>
          <h2>Exclusive Holidays Resort &amp; Suites</h2>
          <p>Enjoy Your Wonderful Holidays With A Great Luxury Experience!</p>
        </div>
        <div className={`hero_btn${loaded ? " hero_loaded" : ""}`}>
          <button onClick={() => navigate("/room")} className="hero_book">
            Book now
          </button>
          <button
            onClick={() => navigate("/about")}
            className="hero_learn_more"
          >
            Learn more
          </button>
        </div>
      </div>

      {/* Booking Card */}
      <div className="booking_card">
        <div className="booking_item">
          <h2>CHECK IN</h2>
          <div className="booking_value">
            <svg
              className="booking_icon"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <line x1="8" y1="3" x2="8" y2="7" />
              <line x1="16" y1="3" x2="16" y2="7" />
            </svg>

            <input
              type="date"
              className="booking_input"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              aria-label="Check-in date"
            />
          </div>
        </div>

        <div className="booking_item">
          <h2>CHECK OUT</h2>
          <div className="booking_value">
            <svg
              className="booking_icon"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <line x1="8" y1="3" x2="8" y2="7" />
              <line x1="16" y1="3" x2="16" y2="7" />
            </svg>
            <input
              type="date"
              className="booking_input"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              aria-label="Check-out date"
            />
          </div>
        </div>

        <div className="booking_item">
          <h2>ROOMS</h2>
          <div className="booking_value">
            <span className="booking_chevron">⌄</span>
            <select
              className="booking_select"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              aria-label="Room type"
            >
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
        </div>

        <div className="booking_item">
          <h2>GUESTS</h2>
          <div className="booking_value">
            <span className="booking_chevron">⌄</span>
            <select
              className="booking_select"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              aria-label="Number of guests"
            >
              <option value="1 Person">1 Person</option>
              <option value="2 Person">2 Person</option>
              <option value="3 Person">3 Person</option>
              <option value="4+ Person">4+ Person</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          className="availability_button"
          onClick={handleCheckAvailability}
        >
          <span>CHECK</span>
          <span>AVAILABILITY</span>
        </button>
      </div>

      <AvailabilityModal
        open={showAvailability}
        onClose={() => setShowAvailability(false)}
        onBook={handleBookNow}
        checkIn={checkIn}
        checkOut={checkOut}
        roomType={roomType}
        guests={guests}
      />
    </div>
  );
}

export default Hero;
