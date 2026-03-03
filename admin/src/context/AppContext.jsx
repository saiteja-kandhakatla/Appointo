import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const calculateAge = (dob) => {
    if (!dob) return "-";

    const birthDate = new Date(dob);
    if (Number.isNaN(birthDate.getTime())) return "-";

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age -= 1;
    }

    return age;
  };

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    if (!slotDate) return "-";
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  return (
    <AppContext.Provider value={{ calculateAge, slotDateFormat }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
