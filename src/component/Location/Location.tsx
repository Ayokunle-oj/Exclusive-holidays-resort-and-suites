import "./Location.css";

function Location() {
  const mapEmbedUrl =
    "https://www.google.com/maps?q=Plot+258D,+Lokogoma+District,+Abuja,+Nigeria&output=embed";

  const directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=Exclusive+Holiday+Resort+%26+Suites,+Plot+258D,+Lokogoma+District,+Abuja,+Nigeria";

  return (
    <section className="location">
      <div className="location-header">
        <span className="location-label">Our Location</span>
        <h2 className="location-heading">Location &amp; Maps</h2>
        <p className="location-subtext">
          Find us easily and experience comfort right in the heart of a serene
          and accessible neighborhood.
        </p>
      </div>

      <div className="location-card">
        {/* Left Information Panel */}
        <div className="location-info">
          <div className="location-info-top">
            <div className="location-icon-circle">
              <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
            </div>
            <div>
              <p className="location-hotel-label">
                Exclusive Holiday Resort &amp; Suites
              </p>
              <h3 className="location-subheading">Our Location</h3>
            </div>
          </div>

          <address className="location-address">
            <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
            <span>Plot 258D, Lokogoma District, Abuja, Nigeria.</span>
          </address>

          <p className="location-description">
            We are located in Lokogoma District, Abuja. Easily accessible and
            perfect for both relaxation and business.
          </p>

          <div className="location-contact">
            <div className="location-contact-item">
              <div className="location-contact-icon">
                <i className="fa-solid fa-phone" aria-hidden="true"></i>
              </div>
              <div>
                <p className="location-contact-label">Phone</p>
                <a href="tel:09139135500" className="location-contact-value">
                  09139135500
                </a>
              </div>
            </div>

            <div className="location-contact-item">
              <div className="location-contact-icon">
                <i className="fa-solid fa-envelope" aria-hidden="true"></i>
              </div>
              <div>
                <p className="location-contact-label">Email</p>
                <a
                  href="mailto:info@exclusiveholidaysandsuites.com"
                  className="location-contact-value"
                >
                  info@exclusiveholidaysandsuites.com
                </a>
              </div>
            </div>
          </div>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="location-directions-btn"
          >
            Get Directions
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </a>
        </div>

        {/* Right Google Map */}
        <div className="location-map">
          <iframe
            src={mapEmbedUrl}
            title="Google Maps showing the location of Exclusive Holiday Resort & Suites"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default Location;
