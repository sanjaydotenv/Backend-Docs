import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import axiosInsatnce from "../api/axiosInstance";

export const useAuth = () => {
  const { formData, setFormData , setAccessToken } = useContext(AuthContext);

  const handleSumbit = async (e) => {
    e.preventDefault();

    const res = await axiosInsatnce.post("/register", formData);

    setAccessToken(res.data.data.accessToken)

  };

  const handleChange = (data) => {
    setFormData({ ...formData, [data.target.name]: data.target.value });
  };

  return {
    handleChange,
    handleSumbit,
  };
};
