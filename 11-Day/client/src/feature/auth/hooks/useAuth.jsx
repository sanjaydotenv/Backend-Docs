import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import axiosInsatnce from "../api/axiosInstance";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const navigate = useNavigate();

  const { formData, setFormData, setAccessToken, setUserData } =
    useContext(AuthContext);

  const handleSumbit = async (e) => {
    e.preventDefault();

    const res = await axiosInsatnce.post("/register", formData);

    setAccessToken(res.data.data.accessToken);
    setUserData(res.data.data);

    navigate("/profile");
  };

  const handleChange = (data) => {
    setFormData({ ...formData, [data.target.name]: data.target.value });
  };

  return {
    handleChange,
    handleSumbit,
  };
};
