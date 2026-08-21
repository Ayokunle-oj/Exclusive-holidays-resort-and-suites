import contactBellImage from "../../assets/contact_imge.webp";
import "./Contact.css";

function ContactHero() {
  return (
    <section
      className="contact-hero"
      style={{ backgroundImage: `url(${contactBellImage})` }}
    >
      <div className="contact-hero-overlay"></div>

      <div className="contact-hero-content">
        <h1 className="contact-hero-title">Contact Us</h1>
        <p className="contact-hero-subtext">
          Whether you have questions, need assistance, or simply want to share
          your experience, we'd love to hear from you.
        </p>
      </div>
    </section>
  );
}

export default ContactHero;
