import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";

export const useAuth = () => {
  const { formData, setFormData } = useContext(AuthContext);

  const handleSumbit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  const handleChange = (data) => {
    setFormData({ ...formData, [data.target.name]: data.target.value });
  };

  return {
    handleChange,
    handleSumbit,
  };
};
