import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import exclusive_holiday from "../../assets/exclusive_holiday.webp";
import exclusive_holiday_white from "../../assets/exclusive_holiday_white.webp";

import "./Navbar.css";

const Navbar: React.FC = () => {
  // true once the user has scrolled past the threshold
  const [isScrolled, setIsScrolled] = useState(false);

  // controls the mobile slide-in menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const SCROLL_THRESHOLD = 80; // px - matches the 50-100px range requested

    const handleScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // run once on mount in case the page loads already scrolled
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "HOME", Link: "/", hasDropdown: false },
    { label: "ROOMS", Link: "/room", hasDropdown: true },
    { label: "RESTO & BAR", Link: "/resto", hasDropdown: false },
    { label: "ABOUT", Link: "/about", hasDropdown: false },
    { label: "CONTACT", Link: "/contact", hasDropdown: false },
  ];

  return (
    <>
      {/* Transparent navbar - sits over the hero, visible only at the very top */}
      <header
        className={
          "navbar navbar-transparent" + (isScrolled ? " navbar-hidden" : "")
        }
      >
        <div className="navbar-inner">
          <div className="navbar-logo">
            <Link to="/">
              <img src={exclusive_holiday} alt="Exclusive Holiday" />
            </Link>
          </div>

          <nav className="navbar-links">
            {navLinks.map((link) => (
              <Link to={link.Link} className="navbar-link" key={link.label}>
                {link.label}

                {link.hasDropdown && (
                  <span className="navbar-chevron">&#9662;</span>
                )}
              </Link>
            ))}
          </nav>

          <button
            className="navbar-hamburger"
            onClick={toggleMobileMenu}
            aria-label="Open menu"
          >
            <span className="navbar-hamburger-line"></span>
            <span className="navbar-hamburger-line"></span>
            <span className="navbar-hamburger-line"></span>
          </button>
        </div>
      </header>

      {/* Dark navbar - slides down from above once the user scrolls past the threshold */}
      <header
        className={"navbar navbar-dark" + (isScrolled ? " navbar-visible" : "")}
      >
        <div className="navbar-inner">
          <div className="navbar-logo">
            <Link to="/">
              <img
                src={isScrolled ? exclusive_holiday_white : exclusive_holiday}
                alt="Exclusive Holiday"
              />
            </Link>
          </div>

          <nav className="navbar-links">
            {navLinks.map((link) => (
              <Link
                to={link.Link}
                className={
                  "navbar-link" +
                  (link.label === "HOME" ? " navbar-link-active" : "")
                }
                key={link.label}
              >
                {link.label}
                {link.hasDropdown && (
                  <span className="navbar-chevron">&#9662;</span>
                )}
              </Link>
            ))}
          </nav>

          <button
            className="navbar-hamburger"
            onClick={toggleMobileMenu}
            aria-label="Open menu"
          >
            <span className="navbar-hamburger-line"></span>
            <span className="navbar-hamburger-line"></span>
            <span className="navbar-hamburger-line"></span>
          </button>
        </div>
      </header>

      {/* Dark overlay behind the mobile menu panel */}
      <div
        className={
          "mobile-menu-overlay" +
          (isMobileMenuOpen ? " mobile-menu-overlay-visible" : "")
        }
        onClick={closeMobileMenu}
      ></div>

      {/* Mobile menu panel - slides in from the right */}
      <div
        className={
          "mobile-menu" + (isMobileMenuOpen ? " mobile-menu-open" : "")
        }
      >
        <button
          className="mobile-menu-close"
          onClick={closeMobileMenu}
          aria-label="Close menu"
        >
          &times;
        </button>

        <nav className="mobile-menu-links">
          {navLinks.map((link) => (
            <Link
              to={link.Link}
              className="mobile-menu-link"
              key={link.label}
              onClick={closeMobileMenu}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
