import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import Rooms from "./pages/Rooms/Rooms";
import Events from "./pages/Events/Events";
import Resto_bar from "./pages/RESTO_&_BAR/Resto_bar";
import Home from "./pages/Home_page/Home";
import About from "./pages/About_us/About";
import Contact from "./pages/contact/Contact";
import Footer from "./component/Footer/Footer";
import Booking from "./component/BookingModal/BookingModal";
import Scroll_To_Top from "./component/Scroll_to_top/Scroll_To_Top";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Scroll_To_Top />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room" element={<Rooms />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/resto" element={<Resto_bar />} />
          <Route path="/event" element={<Events />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
