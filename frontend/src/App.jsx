import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";

const App = () => {
  return (
    <div className="app-shell">
      <div className="bg-shape bg-shape-one" />
      <div className="bg-shape bg-shape-two" />

      <ToastContainer position="top-right" autoClose={2500} />

      <div className="app-container">
        <Navbar />
        <main className="page-section">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:speciality" element={<Doctors />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
            <Route path="/appointments/:docId" element={<Appointment />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
