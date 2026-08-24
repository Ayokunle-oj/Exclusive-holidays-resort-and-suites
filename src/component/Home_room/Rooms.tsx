import standard from "../../assets/Standard.webp";
import permium from "../../assets/permium.webp";
import deluxe from "../../assets/deluxe.webp";
import { Link } from "react-router-dom";
import "./Room.css";

// Easy-to-change placeholder prices (₦ Nigerian Naira only)
const ROOM_PRICES = {
  standard: "₦50,000 / night",
  premium: "₦75,000 / night",
  deluxe: "₦100,000 / night",
};

function Rooms() {
  return (
    <section className="home-room-section">
      <div className="home-room-header">
        <h2 className="home-room-heading">Our Rooms</h2>
        <p className="home-room-subtext">
          Choose the perfect room for your stay at Exclusive Holidays &amp;
          Suites.
        </p>
      </div>

      {/* ===== Standard Room (text left, image right) ===== */}
      <div className="home-room-row">
        <div className="home-room-info">
          <h3 className="home-room-name">
            Standard
            <br />
            Room
          </h3>
          <p className="home-room-price">{ROOM_PRICES.standard}</p>

          <p className="home-room-intro">
            For just ₦50,000, enjoy our Standard Room with:
          </p>

          <ul className="home-room-amenities">
            <li> Complimentary Breakfast</li>
            <li> Free High-Speed Wi-Fi</li>
            <li> Access to our Swimming Pool</li>
            <li> Mini Zoo Experience</li>
            <li> Pool, Bar &amp; Lounge Services</li>
          </ul>

          <div className="home-room-specs">
            <div className="home-room-spec">
              <span className="home-room-spec-label">Room Size</span>
              <span className="home-room-spec-value">32 m²</span>
            </div>
            <div className="home-room-spec">
              <span className="home-room-spec-label">Guests</span>
              <span className="home-room-spec-value">2 Adults</span>
            </div>
          </div>

          <div className="home-room-buttons">
            <Link className="home-room-btn-book-now" to="/booking">
              Book Now
            </Link>
            <Link className="home-room-btn-view-details" to="/room">
              View Details
            </Link>
          </div>
        </div>

        <div className="home-room-image">
          <img
            src={standard}
            alt="Standard Room at Exclusive Holidays & Suites"
            loading="lazy"
            width={900}
            height={700}
          />
        </div>
      </div>

      {/* ===== Premium Room (image left, text right) ===== */}
      <div className="home-room-row home-room-row-reverse">
        <div className="home-room-info">
          <h3 className="home-room-name">
            Premium
            <br />
            Room
          </h3>
          <p className="home-room-price">{ROOM_PRICES.premium}</p>

          <p className="home-room-intro">
            For just ₦75,000, enjoy our Premium Room with:
          </p>

          <ul className="home-room-amenities">
            <li> Complimentary Breakfast</li>
            <li> Free High-Speed Wi-Fi</li>
            <li> Access to our Swimming Pool</li>
            <li> Priority Room Service</li>
            <li> Pool, Bar &amp; Lounge Services</li>
          </ul>

          <div className="home-room-specs">
            <div className="home-room-spec">
              <span className="home-room-spec-label">Room Size</span>
              <span className="home-room-spec-value">40 m²</span>
            </div>
            <div className="home-room-spec">
              <span className="home-room-spec-label">Guests</span>
              <span className="home-room-spec-value">2 Adults</span>
            </div>
          </div>

          <div className="home-room-buttons">
            <Link className="home-room-btn-book-now" to="/booking">
              Book Now
            </Link>
            <Link className="home-room-btn-view-details" to="/room">
              View Details
            </Link>
          </div>
        </div>

        <div className="home-room-image">
          <img
            src={deluxe}
            alt="Premium Room at Exclusive Holidays & Suites"
            loading="lazy"
            width={900}
            height={700}
          />
        </div>
      </div>

      {/* ===== Deluxe Room (text left, image right) ===== */}
      <div className="home-room-row">
        <div className="home-room-info">
          <h3 className="home-room-name">
            Deluxe
            <br />
            Room
          </h3>
          <p className="home-room-price">{ROOM_PRICES.deluxe}</p>

          <p className="home-room-intro">
            For just ₦100,000, enjoy our Deluxe Room with:
          </p>

          <ul className="home-room-amenities">
            <li> Complimentary Breakfast</li>
            <li> Free High-Speed Wi-Fi</li>
            <li> Access to our Swimming Pool</li>
            <li> Private Jacuzzi</li>
            <li> Pool, Bar &amp; Lounge Services</li>
          </ul>

          <div className="home-room-specs">
            <div className="home-room-spec">
              <span className="home-room-spec-label">Room Size</span>
              <span className="home-room-spec-value">55 m²</span>
            </div>
            <div className="home-room-spec">
              <span className="home-room-spec-label">Guests</span>
              <span className="home-room-spec-value">2 Adults</span>
            </div>
          </div>

          <div className="home-room-buttons">
            <Link className="home-room-btn-book-now" to="/booking">
              Book Now
            </Link>
            <Link className="home-room-btn-view-details" to="/room">
              {" "}
              View Details
            </Link>
          </div>
        </div>

        <div className="home-room-image">
          <img
            src={permium}
            alt="Deluxe Room at Exclusive Holidays & Suites"
            loading="lazy"
            width={900}
            height={700}
          />
        </div>
      </div>
    </section>
  );
}

export default Rooms;
