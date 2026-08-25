import { createContext, useState } from "react";

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [allData, setAllData] = useState([]);


  return (
    <MyContext.Provider value={{ allData, setAllData }}>
      {children}
    </MyContext.Provider>
  );
};
