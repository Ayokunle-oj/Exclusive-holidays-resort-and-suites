import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faUtensils,
  faPersonSwimming,
  faWineGlass,
} from "@fortawesome/free-solid-svg-icons";
import "./Services.css";

function Services() {
  const services_items = [
    {
      icon: faWifi,
      title: "Free Wifi",
    },

    {
      icon: faUtensils,
      title: "Restaurant",
    },
    {
      icon: faPersonSwimming,
      title: "Swimming Pool",
    },

    {
      icon: faWineGlass,
      title: "Bar & Lounge Services",
    },
  ];

  return (
    <section className="services_container">
      <h2 className="services_heading">Explore Our Hotel Services</h2>

      <div className="services_items">
        {services_items.map((item) => (
          <div className="services_card" key={item.title}>
            <FontAwesomeIcon icon={item.icon} className="services_icon" />
            <h3 className="services_title">{item.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
