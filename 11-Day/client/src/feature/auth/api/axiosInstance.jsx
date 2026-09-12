import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";

const axiosInsatnce = axios.create({
  baseURL: "http://localhost:5173",
  withCredentials: true,
});

axiosInsatnce.interceptors.request.use((config) => {
  const { accessToken } = useContext(AuthContext);

  console.log(accessToken)

  config.headers.Authorization = `Bearer ${accessToken}`;
});

export default axiosInsatnce;
