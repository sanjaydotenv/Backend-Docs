import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [formData, setFormData] = useState({});
  const [userData, setUserData] = useState(null);

  console.log("accessToken", accessToken);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, formData, setFormData , userData , setUserData}}
    >
      {children}
    </AuthContext.Provider>
  );
};
