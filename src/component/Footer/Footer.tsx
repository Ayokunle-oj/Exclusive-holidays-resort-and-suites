import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faInstagram,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1: Hotel Information */}
        <div className="footer-column">
          <h3 className="footer-logo">Exclusive Holidays &amp; Suites</h3>
          <p className="footer-description">
            Experience comfort, luxury, and unforgettable hospitality at
            Exclusive Holidays &amp; Suites.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-column">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <Link className="a_tag" to="/">
                HOME
              </Link>
            </li>
            <li>
              <Link className="a_tag" to="/room">
                ROOMS
              </Link>
            </li>
            <li>
              <Link className="a_tag" to="/resto">
                RESTO &amp; BAR
              </Link>
            </li>
            <li>
              <Link className="a_tag" to="/about">
                ABOUT
              </Link>
            </li>
            <li>
              <Link className="a_tag" to="/contact">
                CONTACT
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div className="footer-column">
          <h4 className="footer-heading">Follow Us</h4>
          <div className="footer-socials">
            <a
              href="https://wa.me/2349139135500"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
              aria-label="WhatsApp"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
            <a
              href="https://www.instagram.com/exclusiveholidayresortabj/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />{" "}
            </a>
            <a
              href="https://www.facebook.com/ExclusiveHolidayAbuja/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
          </div>
        </div>

        {/* Column 4: Contact / Email */}
        <div className="footer-column">
          <h4 className="footer-heading">Get In Touch</h4>
          <a
            href="mailto:info@exclusiveholidaysandsuites.com"
            className="footer-email"
          >
            <i className="fa-solid fa-envelope"></i>
            <span>info@exclusiveholidaysandsuites.com</span>
          </a>
          <br />
          <div>Address: Plot 258D, Lokogoma District, Abuja</div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2026 Exclusive Holidays Resort &amp; Suites. All Rights Reserved.
        </p>
        <p className="footer-credit">
          Built by{" "}
          <a
            href="https://portfolio-psi-ivory-28.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ayokunle_Ojo
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
