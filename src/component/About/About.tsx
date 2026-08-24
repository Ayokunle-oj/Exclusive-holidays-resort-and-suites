import "./About.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import pexels_rdne from "../../assets/pexels_rdne.webp";
import pexels_aj_ahamad from "../../assets/pexels_aj_ahamad.webp";
import pexels_guillaume_dhalluin from "../../assets/pexels_guillaume_dhalluin.webp";
import pexels_lhthoai from "../../assets/pexels_lhthoai.webp";

function About() {
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const revealElements = aboutRef.current?.querySelectorAll("[data-reveal]");

    if (!revealElements || revealElements.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={aboutRef} className="about_container" id="about">
      <div className="about_wrapper" data-reveal="fade-up">
        <div className="about_content1" data-reveal="fade-up">
          <div className="content_img" data-reveal="fade-left">
            <img
              src={pexels_rdne}
              alt="Exclusive Holiday and suites"
              loading="lazy"
              width={800}
              height={650}
            />
          </div>
          <div className="content_text" data-reveal="fade-right">
            <div className="about_title" data-reveal="fade-up">
              <h2>About US</h2>
            </div>
            <h2 data-reveal="fade-up">
              Welcome To Exclusive Holiday Resort &amp; suites
            </h2>
            <p data-reveal="fade-up">
              With over 340+ hotels worldwide, Exclusive Holiday Resort and
              suites offers a wide variety of hotels catering for a perfect stay
              no matter where your destination. There's a version of luxury that
              shouts, and a version that gets everything right. Exclusive
              Holiday Resort and suites is the latter, a property built for
              comfort and relaxation.
            </p>
            <div className="about_booking_container">
              <button
                onClick={() => navigate("/room")}
                className="about_booking"
                data-reveal="fade-up"
              >
                Book A Room Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="about_wrapper_2">
        <div className="about_wrapper_2_text" data-reveal="fade-right">
          <h2 data-reveal="fade-up">
            We Also Provide Outdoor Activities <br />
            To All Visitors
          </h2>
          <p data-reveal="fade-up">
            From sunrise nature walks to evening bonfares by the pool, our
            outdoor experience are designed to make every stay unforgettable.
            Whether you'er here to unwind or explore, there's something for
            every kind of guest.
          </p>
          <ul className="about_feature_list">
            <li data-reveal="fade-up">
              Take a dip in our swimming pool, surrounded by lush greenery and
              calm.
            </li>
            <li data-reveal="fade-up">
              Delicious meals crafted from fresh locally sourced ingredients.
            </li>
            <li data-reveal="fade-up">
              A cool, relaxing environment designed for total peace of mind.
            </li>
          </ul>
        </div>
        <div className="about_wrapper_2_images" data-reveal="fade-left">
          <div className="about_wrapper_2_img1" data-reveal="fade-right">
            <img
              src={pexels_guillaume_dhalluin}
              alt=""
              loading="lazy"
              width={700}
              height={500}
            />
          </div>
          <div className="about_wrapper_2_img2" data-reveal="fade-up">
            <img
              src={pexels_aj_ahamad}
              alt=""
              loading="lazy"
              width={700}
              height={500}
            />
          </div>
          <div className="about_wrapper_2_img3" data-reveal="fade-left">
            <img
              src={pexels_lhthoai}
              alt=""
              loading="lazy"
              width={700}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
