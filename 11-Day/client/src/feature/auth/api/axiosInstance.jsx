import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";

const axiosInsatnce = new axios.create({
  baseURL: "http://localhost:3000/auth/api/users",
  withCredentials: true,
});


export default axiosInsatnce;
