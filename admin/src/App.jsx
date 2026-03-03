import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import { DoctorContext } from "./context/DoctorContext";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  const isAuthenticated = Boolean(aToken || dToken);

  if (!isAuthenticated) {
    return (
      <>
        <Login />
        <ToastContainer position="top-right" autoClose={2500} />
      </>
    );
  }

  return (
    <div className="admin-shell">
      <div className="admin-bg admin-bg-one" />
      <div className="admin-bg admin-bg-two" />
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="admin-container">
        <NavBar />
        <div className="admin-body">
          <Sidebar />
          <main className="admin-main">
            <Routes>
              <Route
                path="/"
                element={
                  <Navigate
                    to={aToken ? "/admin-dashboard" : "/doctor-dashboard"}
                    replace
                  />
                }
              />

              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/all-appointments" element={<AllAppointments />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/doctor-list" element={<DoctorsList />} />

              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor-appointments" element={<DoctorAppointment />} />
              <Route path="/doctor-profile" element={<DoctorProfile />} />

              <Route
                path="*"
                element={
                  <Navigate
                    to={aToken ? "/admin-dashboard" : "/doctor-dashboard"}
                    replace
                  />
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
