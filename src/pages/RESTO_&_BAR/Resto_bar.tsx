import { Link } from "react-router-dom";
import "./Resto.css";

// Replace these with real photos of the bar/lounge when available.
import barHeroImg from "../../assets/bar-hero.jpg";
import barDrinksImg from "../../assets/bar-drinks.jpg";
import barLoungeImg from "../../assets/bar-lounge.jpg";
import barPoolsideImg from "../../assets/bar-poolside.jpg";

export default function Resto_bar() {
  return (
    <div>
      {/* Hero */}
      <div className="bar-page-hero">
        <div className="bar-page-hero-content">
          <span className="bar-page-eyebrow">Bar &amp; Lounge</span>
          <h1 className="bar-page-heading">Unwind, Sip &amp; Stay Awhile</h1>
          <p className="bar-page-hero-text">
            Enjoy refreshing drinks and a relaxed atmosphere after a day by the
            pool or exploring Abuja. Our bar and lounge are open for guests
            looking to slow down, whether that's a quiet evening cocktail or
            drinks with friends.
          </p>
          <Link to="/menu" className="btn btn-gold">
            View Menu
          </Link>
        </div>
        <div className="bar-page-hero-image">
          <img
            src={barHeroImg}
            alt="The hotel bar at Exclusive Holiday & Suites"
          />
        </div>
      </div>

      {/* What's on offer */}
      <div className="bar-page-offer">
        <div className="bar-page-offer-image">
          <img src={barDrinksImg} alt="A selection of cocktails and drinks" />
        </div>
        <div className="bar-page-offer-content">
          <span className="bar-page-eyebrow">On the Menu</span>
          <h2 className="bar-page-subheading">Something for Every Evening</h2>
          <p className="bar-page-body-text">
            From signature cocktails to a well-stocked selection of wines,
            spirits, and soft drinks, our bar is built around ease and quality.
            Light bites are available if you'd rather not leave your seat.
          </p>
          <ul className="bar-page-highlights">
            <li>Signature and classic cocktails</li>
            <li>Local and imported spirits</li>
            <li>Wine by the glass or bottle</li>
            <li>Light bites and bar snacks</li>
          </ul>
          <Link to="/menu" className="btn btn-outline">
            View Drinks Menu
          </Link>
        </div>
      </div>

      {/* Atmosphere */}
      <div className="bar-page-atmosphere">
        <div className="bar-page-atmosphere-content">
          <span className="bar-page-eyebrow">The Atmosphere</span>
          <h2 className="bar-page-subheading">A Space to Slow Down</h2>
          <p className="bar-page-body-text">
            Whether you're catching up with friends, unwinding after a meeting,
            or watching the evening settle over the city, the lounge is designed
            for comfort. Soft seating, warm lighting, and unhurried service set
            the pace.
          </p>
        </div>
        <div className="bar-page-atmosphere-image">
          <img src={barLoungeImg} alt="The lounge seating area" />
        </div>
      </div>

      {/* Poolside */}
      <div className="bar-page-poolside">
        <div className="bar-page-poolside-image">
          <img src={barPoolsideImg} alt="Poolside drink service" />
        </div>
        <div className="bar-page-poolside-overlay">
          <span className="bar-page-eyebrow bar-page-eyebrow-light">
            Poolside Service
          </span>
          <h2 className="bar-page-subheading bar-page-heading-light">
            Drinks by the Water
          </h2>
          <p className="bar-page-body-text bar-page-text-light">
            Order straight from your lounger. Our poolside service brings the
            bar to you, from fresh juices in the afternoon to cocktails as the
            sun goes down.
          </p>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bar-page-cta">
        <h2 className="bar-page-cta-heading">Pull Up a Seat</h2>
        <p className="bar-page-cta-text">
          Open daily for guests and visitors. Walk-ins are welcome, or reserve a
          table ahead of time for larger groups.
        </p>
        <div className="bar-page-cta-buttons">
          <Link to="/menu" className="btn btn-outline">
            View Menu
          </Link>
          <Link to="/booking" className="btn btn-gold">
            Book a Table
          </Link>
        </div>
      </div>
    </div>
  );
}
