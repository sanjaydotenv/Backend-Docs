import { createContext, useState } from "react";

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [allData, setAllData] = useState([]);
  const [formData, setFormData] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <MyContext.Provider
      value={{
        allData,
        setAllData,
        formData,
        isLoading,
        setIsLoading,
        setFormData,
        setIsUpdate,
        isUpdate,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
