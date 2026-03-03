import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/getAppointments`, {
        headers: { dToken },
      });

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setAppointments([...data.appointments].reverse());
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/cancel-appointment`,
        { appointmentId },
        { headers: { dToken } }
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      await getAppointments();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <DoctorContext.Provider
      value={{
        dToken,
        setDToken,
        backendUrl,
        getAppointments,
        appointments,
        setAppointments,
        cancelAppointment,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
