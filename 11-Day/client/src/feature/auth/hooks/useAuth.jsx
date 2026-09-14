import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import axiosInsatnce from "../api/axiosInstance";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const navigate = useNavigate();

  const { formData, setFormData, setAccessToken, setUserData } =
    useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axiosInsatnce.post("/register", formData);

    setAccessToken(res.data.data.accessToken);
    setUserData(res.data.data);

    navigate("/profile");
  };

  const handleChange = (data) => {
    setFormData({ ...formData, [data.target.name]: data.target.value });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    const res = await axiosInsatnce.post("/login", formData);
    setUserData(res.data.data);
    navigate("/profile");
  };

  const handleChangeLogin = (data) => {
    setFormData({ ...formData, [data.target.name]: data.target.value });
  };

  return {
    handleChange,
    handleSubmit,
    handleChangeLogin,
    handleSubmitLogin,
  };
};
