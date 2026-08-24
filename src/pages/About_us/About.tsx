import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faBed,
  faPersonSwimming,
  faWineGlass,
  faPaw,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import "./About.css";

// Placeholder image imports — replace these paths with the real files
// from your assets folder when available.
import heroImage from "../../assets/hotel_hero.webp";
import aboutImage from "../../assets/hotel_lobby.webp";
import servicesBackground from "../../assets/hotel_services_bg.webp";
import teamMemberOne from "../../assets/team_member_1.webp";
import teamMemberTwo from "../../assets/team_member_2.webp";
import teamMemberThree from "../../assets/team_member_3.webp";
import teamMemberFour from "../../assets/team_member_4.webp";

const services = [
  {
    icon: faBed,
    title: "Comfortable Rooms",
    description:
      "Relax in clean and comfortable rooms designed to make your stay enjoyable.",
    link: "/rooms",
  },
  {
    icon: faPersonSwimming,
    title: "Swimming Pool",
    description:
      "Take a refreshing swim and enjoy a relaxing time by the pool.",
    link: "/rooms",
  },
  {
    icon: faWineGlass,
    title: "Restaurant & Bar",
    description:
      "Enjoy delicious meals, refreshing drinks and a relaxed dining atmosphere.",
    link: "/resto-bar",
  },
  {
    icon: faPaw,
    title: "Mini Zoo",
    description: "Enjoy a unique mini zoo experience during your stay with us.",
    link: "/events",
  },
  {
    icon: faWifi,
    title: "Free Wi-Fi",
    description:
      "Stay connected with complimentary high-speed Wi-Fi throughout your stay.",
    link: "/rooms",
  },
];

// Placeholder team data — replace names, positions and photos as needed.
const team = [
  {
    name: "Team Member One",
    position: "General Manager",
    photo: teamMemberOne,
  },
  { name: "Team Member Two", position: "Hotel Manager", photo: teamMemberTwo },
  {
    name: "Team Member Three",
    position: "Guest Relations",
    photo: teamMemberThree,
  },
  {
    name: "Team Member Four",
    position: "Hospitality Manager",
    photo: teamMemberFour,
  },
];

const About = () => {
  return (
    <div className="about-page">
      {/* ABOUT HERO */}
      <section
        className="about-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <span className="about-hero-label">About Us</span>
          <h1 className="about-hero-title">
            Discover Exclusive Holiday Resort &amp; Suites
          </h1>
          <div className="about-hero-breadcrumb">
            <Link to="/">Home</Link>
            <span className="about-hero-breadcrumb-divider">/</span>
            <span>About</span>
          </div>
        </div>
      </section>

      {/* ABOUT THE HOTEL */}
      <section className="about-hotel">
        <div className="about-hotel-image-wrap">
          <img
            src={aboutImage}
            alt="Exclusive Holiday Resort & Suites"
            className="about-hotel-image"
            loading="lazy"
            width={900}
            height={700}
          />
        </div>

        <div className="about-hotel-content">
          <span className="about-eyebrow">
            Welcome To Exclusive Holiday Resort &amp; Suites
          </span>
          <h2 className="about-heading">
            A Place To Relax, Unwind &amp; Feel At Home
          </h2>
          <p className="about-text">
            At Exclusive Holiday Resort &amp; Suites, we provide a comfortable
            and welcoming environment where guests can relax, unwind and enjoy
            quality hospitality in Abuja. Our resort brings together comfortable
            accommodation, a swimming pool, a bar &amp; lounge, a restaurant, a
            mini zoo experience, free high-speed Wi-Fi and a relaxing
            environment designed around your comfort.
          </p>

          <div className="about-hotel-meta">
            <div className="about-hotel-meta-item">
              <FontAwesomeIcon icon={faLocationDot} className="about-icon" />
              <span>Kabusa, Federal Capital Territory, Nigeria</span>
            </div>
            <div className="about-hotel-meta-item">
              <FontAwesomeIcon icon={faPhone} className="about-icon" />
              <a href="tel:+2349139135500">0913 913 5500</a>
            </div>
          </div>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section
        className="about-services"
        style={{ backgroundImage: `url(${servicesBackground})` }}
      >
        <div className="about-services-overlay" />
        <div className="about-services-content">
          <span className="about-eyebrow about-eyebrow-center">Experience</span>
          <h2 className="about-heading about-heading-center">
            Our Comfortable Services
          </h2>

          <div className="about-services-grid">
            {services.map((service) => (
              <div className="about-service-card" key={service.title}>
                <FontAwesomeIcon
                  icon={service.icon}
                  className="about-service-icon"
                />
                <h3 className="about-service-title">{service.title}</h3>
                <p className="about-service-description">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEET OUR TEAM */}
      <section className="about-team">
        <span className="about-eyebrow about-eyebrow-center">Our Team</span>
        <h2 className="about-heading about-heading-center">Meet Our Team</h2>
        <p className="about-team-intro">
          Meet the people dedicated to making every stay at Exclusive Holiday
          Resort &amp; Suites comfortable and memorable.
        </p>

        <div className="about-team-grid">
          {team.map((member) => (
            <div className="about-team-card" key={member.name}>
              <img
                src={member.photo}
                alt={member.name}
                className="about-team-photo"
                loading="lazy"
                width={420}
                height={420}
              />
              <h3 className="about-team-name">{member.name}</h3>
              <p className="about-team-position">{member.position}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="about-cta">
        <h2 className="about-cta-title">Ready For Your Stay?</h2>
        <p className="about-cta-text">
          Experience comfort, relaxation and warm hospitality at Exclusive
          Holiday Resort &amp; Suites.
        </p>
        <div className="about-cta-buttons">
          <Link to="/room" className="about-btn about-btn-primary">
            Book A Room
          </Link>
          <Link to="/contact" className="about-btn about-btn-outline">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
