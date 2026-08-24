import { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faChevronLeft,
  faChevronRight,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import avatar1 from "../../assets/reviewer-1.webp";
import avatar2 from "../../assets/reviewer-2.webp";
import avatar3 from "../../assets/reviewer-3.webp";
import avatar4 from "../../assets/reviewer-4.webp";
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

const AUTOPLAY_DELAY = 4000;

function Testimonials() {
  const [visibleCards, setVisibleCards] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  // Keep currentIndex in range whenever visibleCards changes
  // (e.g. resizing from desktop to mobile shrinks maxIndex)
  useEffect(() => {
    setCurrentIndex((prev) => {
      const newMaxIndex = Math.max(reviews.length - visibleCards, 0);
      return Math.min(prev, newMaxIndex);
    });
  }, [visibleCards]);

  const clearAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    clearAutoplay();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const newMaxIndex = Math.max(reviews.length - visibleCards, 0);
        return prev >= newMaxIndex ? 0 : prev + 1;
      });
    }, AUTOPLAY_DELAY);
  }, [clearAutoplay, visibleCards]);

  // Start autoplay on mount and whenever visibleCards changes;
  // always clean up on unmount.
  useEffect(() => {
    startAutoplay();
    return clearAutoplay;
  }, [startAutoplay, clearAutoplay]);

  // Any manual navigation resets the autoplay clock, so it doesn't
  // fire moments later and undo what the user just did.
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    startAutoplay();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    startAutoplay();
  };

  // translateX(%) resolves against the TRACK's own width, not the
  // visible window's width. Each slide occupies exactly (100 /
  // reviews.length)% of the track (that's how slide widths are set
  // below), so shifting by `index` slides is index * (100 / N)% —
  // independent of how many cards are visible at once. Using
  // visibleCards here (the old formula) overshoots by a factor of
  // (reviews.length / visibleCards), which is why it was mild on
  // desktop (4 visible) and catastrophic on mobile (1 visible).
  const trackOffset = (currentIndex / reviews.length) * 100;

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
                className="testimonial-slide"
                key={index}
                style={{ width: `${100 / reviews.length}%` }}
              >
                <div className="testimonial-card">
                  <div className="testimonial-avatar-wrapper">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="testimonial-avatar"
                      loading="lazy"
                      width={180}
                      height={180}
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
