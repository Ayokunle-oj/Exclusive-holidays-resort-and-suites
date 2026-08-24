import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMugSaucer,
  faWifi,
  faPersonSwimming,
  faPaw,
  faMartiniGlass,
} from "@fortawesome/free-solid-svg-icons";
import RoomSwipe from "./RoomSwipe";
import "./Rooms.css";

// Replace these with the real hotel photos when available.
import heroRoomImg from "../../assets/pexels_alley_chien.webp";
import promoRoomImg from "../../assets/pexels-cottonbro-6466236.webp";

// Room benefits — edit the list here to add or remove an amenity.
const benefits = [
  {
    icon: faMugSaucer,
    title: "Complimentary Breakfast",
    text: "Enjoy breakfast during your stay.",
  },
  {
    icon: faWifi,
    title: "Free High-Speed Wi-Fi",
    text: "Stay connected throughout the hotel.",
  },
  {
    icon: faPersonSwimming,
    title: "Swimming Pool Access",
    text: "Relax and unwind by the pool.",
  },
  {
    icon: faPaw,
    title: "Mini Zoo Experience",
    text: "Enjoy our unique mini zoo experience.",
  },
  {
    icon: faMartiniGlass,
    title: "Bar & Lounge",
    text: "Relax with drinks and refreshments.",
  },
];

const Rooms = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const animatedElements = root.querySelectorAll("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Toggling the class on every intersection change, rather than only
          // adding it once, is what lets the animation reverse on scroll-up
          // and replay on scroll-down.
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.15 },
    );

    animatedElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="rooms" ref={sectionRef}>
      {/* SECTION 1 — Rooms hero */}
      <div className="rooms-hero">
        <img
          src={heroRoomImg}
          alt="A comfortable guest room at Exclusive Holiday & Suites"
          className="rooms-hero-image"
          width={1600}
          height={1100}
        />
        <div className="rooms-hero-overlay" />
        <div className="rooms-hero-content" data-reveal="up">
          <span className="rooms-eyebrow rooms-eyebrow-light">
            Stay With Us
          </span>
          <h1 className="rooms-heading rooms-heading-light">
            Comfort,
            <br />
            Designed Around You
          </h1>
          <p className="rooms-hero-text">
            Choose from comfortable and thoughtfully designed rooms suited for
            short stays, business trips, vacations, and family visits.
          </p>
          <Link to="/booking" className="btn btn-gold">
            Book Rooms
          </Link>
        </div>
      </div>

      {/* SECTION 3 — Explore our rooms intro */}
      <div className="rooms-intro" data-reveal="up">
        <span className="rooms-eyebrow">Enjoy Your Stay</span>
        <h2 className="rooms-heading">Explore Our Rooms</h2>
        <p className="rooms-intro-text">
          Exclusive Holiday &amp; Suites offers comfortable rooms designed for
          relaxation, convenience, and a memorable stay.
        </p>
      </div>

      {/* SECTION 4 — Room listings: swipeable card stack */}
      <div className="rooms-listing" data-reveal="up">
        <RoomSwipe />
      </div>

      {/* SECTION 5 — Room benefits */}
      <div className="rooms-benefits">
        {benefits.map((benefit, index) => (
          <div
            key={benefit.title}
            className={`benefit-item stagger-${index + 1}`}
            data-reveal="up"
          >
            <span className="benefit-icon">
              <FontAwesomeIcon icon={benefit.icon} />
            </span>
            <div>
              <h4 className="benefit-title">{benefit.title}</h4>
              <p className="benefit-text">{benefit.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* SECTION 6 — Final promotional section */}
      <div className="rooms-promo">
        <img
          src={promoRoomImg}
          alt="A beautifully designed room at Exclusive Holiday & Suites"
          className="rooms-promo-image"
          loading="lazy"
          width={1400}
          height={1000}
        />
        <div className="rooms-promo-overlay" />
        <div className="rooms-promo-content" data-reveal="up">
          <span className="rooms-eyebrow rooms-eyebrow-light">
            Exclusive Holiday &amp; Suites
          </span>
          <h2 className="rooms-heading rooms-heading-light">
            A Stay Designed Around You
          </h2>
          <p className="rooms-promo-text">
            From comfortable rooms to thoughtful amenities, every part of your
            stay is designed to help you relax, recharge and enjoy your time
            with us.
          </p>
          <div className="rooms-promo-buttons">
            <Link to="/booking" className="btn btn-gold">
              Book Your Stay
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rooms;
