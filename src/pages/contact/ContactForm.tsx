import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import contactRoomImage from "../../assets/pexels_cottonbro.jpg";
import "./Contact.css";

function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic can be added here later
  };

  return (
    <section className="contact-form-section">
      <div className="contact-form-panel">
        <h2 className="contact-form-heading">
          Love to hear from you
          <br />
          Get In touch!
        </h2>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-group">
            <label htmlFor="name">Your Name</label>
            <div className="contact-input-wrapper">
              <FontAwesomeIcon icon={faUser} className="contact-input-icon" />
              <input type="text" id="name" placeholder="Your Name" required />
            </div>
          </div>

          <div className="contact-form-group">
            <label htmlFor="email">Your Email</label>
            <div className="contact-input-wrapper">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="contact-input-icon"
              />
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                required
              />
            </div>
          </div>

          <div className="contact-form-group">
            <label htmlFor="message">Your Message</label>
            <div className="contact-input-wrapper">
              <FontAwesomeIcon
                icon={faMessage}
                className="contact-input-icon"
              />
              <textarea
                id="message"
                placeholder="Message"
                rows={4}
                required
              ></textarea>
            </div>
          </div>

          <button type="submit" className="contact-submit-btn">
            Send Message
          </button>
        </form>
      </div>

      <div className="contact_image_panel">
        <img src={contactRoomImage} alt="Exclusive Holidays & Suites room" />
      </div>
    </section>
  );
}

export default ContactForm;
