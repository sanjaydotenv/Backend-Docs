import { createContext, useEffect, useState } from "react";
import axiosInsatnce from "../feature/auth/api/axiosInstance";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [formData, setFormData] = useState({});
  const [userData, setUserData] = useState(null);

  const hydrateUser = async () => {
    const res = await axiosInsatnce.post("/access-token");

    const newAccessToken = res.data.data.accessTokenn;

    setAccessToken(newAccessToken);

    const data = await axiosInsatnce.get("/me", {
      headers: {
        Authorization: `Bearer ${newAccessToken}`,
      },
    });

    setUserData(data.data.data);
  };

  useEffect(() => {
    hydrateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        formData,
        setFormData,
        userData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
