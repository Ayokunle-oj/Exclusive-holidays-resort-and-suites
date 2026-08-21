import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faChevronLeft,
  faChevronRight,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import avatar1 from "../../assets/reviewer-1.jpg";
import avatar2 from "../../assets/reviewer-2.jpg";
import avatar3 from "../../assets/reviewer-3.jpg";
import avatar4 from "../../assets/reviewer-4.jpg";
import "./Testimonials.css";

// Dummy Google reviews — replace with real reviews later
const reviews = [
  {
    name: "Prominence Concepts",
    time: "1 year ago",
    rating: 5,
    avatar: avatar1,
    comment:
      "The Serenity of the hotel is top notch and to ice the cake, the management and staff are highly courteous.",
  },
  {
    name: "Oladimeji Moses",
    time: "1 year ago",
    rating: 5,
    avatar: avatar2,
    comment:
      "Exquisite, unique and fantastic. The ambience is second to non. The foods are sumptuous. So intriguing.",
  },
  {
    name: "Grace Oyeniyi",
    time: "1 year ago",
    rating: 5,
    avatar: avatar3,
    comment: "Exquisite! Nothing but premium and luxury.",
  },
  {
    name: "Anellya Ogunsan",
    time: "1 year ago",
    rating: 5,
    avatar: avatar4,
    comment:
      "Classy and elegant with secure, peaceful atmosphere, also with excellent chose of food.",
  },
  {
    name: "Chidera Okafor",
    time: "1 year ago",
    rating: 5,
    avatar: avatar1,
    comment:
      "A truly relaxing stay. The rooms were spotless and the staff went above and beyond for us.",
  },
  {
    name: "Tunde Bakare",
    time: "1 year ago",
    rating: 5,
    avatar: avatar2,
    comment:
      "Wonderful hospitality from start to finish. Will definitely be booking again soon.",
  },
];

function Testimonials() {
  const [visibleCards, setVisibleCards] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const maxIndex = Math.max(reviews.length - visibleCards, 0);

  // Adjust how many cards are visible based on screen width
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth <= 600) {
        setVisibleCards(1);
      } else if (window.innerWidth <= 992) {
        setVisibleCards(2);
      } else {
        setVisibleCards(4);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  // Automatic carousel scroll every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const newMaxIndex = Math.max(reviews.length - visibleCards, 0);
        return prev >= newMaxIndex ? 0 : prev + 1;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [visibleCards]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const trackOffset = currentIndex * (100 / visibleCards);

  return (
    <section className="testimonials">
      <div className="testimonials-viewport">
        <button
          className="testimonials-arrow testimonials-arrow-left"
          onClick={handlePrev}
          aria-label="Previous reviews"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <div className="testimonials-window">
          <div
            className="testimonials-track"
            ref={trackRef}
            style={{
              transform: `translateX(-${trackOffset}%)`,
              width: `${(reviews.length / visibleCards) * 100}%`,
            }}
          >
            {reviews.map((review, index) => (
              <div
                className="testimonial-card"
                key={index}
                style={{ width: `${100 / reviews.length}%` }}
              >
                <div className="testimonial-avatar-wrapper">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="testimonial-avatar"
                  />
                  <span className="testimonial-google-badge">
                    <FontAwesomeIcon icon={faGoogle} />
                  </span>
                </div>

                <h3 className="testimonial-name">{review.name}</h3>
                <p className="testimonial-time">{review.time}</p>

                <div className="testimonial-rating">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className="testimonial-star"
                    />
                  ))}
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="testimonial-verified"
                  />
                </div>

                <p className="testimonial-comment">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          className="testimonials-arrow testimonials-arrow-right"
          onClick={handleNext}
          aria-label="Next reviews"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </section>
  );
}

export default Testimonials;
