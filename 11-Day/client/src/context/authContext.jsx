import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState("hello");
  const [formData, setFormData] = useState({});

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, formData, setFormData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
