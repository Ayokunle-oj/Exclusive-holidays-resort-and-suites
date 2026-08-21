import Hero from "../../component/hero/Hero";
import About from "../../component/About/About";
import Services from "../../component/services/Services";
import Location from "../../component/Location/Location";
import Rooms from "../../component/Home_room/Rooms";
import Tour from "../../component/tour/Tour";
import Testimonials from "../../component/Home_events/Testimonials";
function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <Location />
      <Rooms />
      <Tour />
      <Testimonials />
    </div>
  );
}

export default Home;
