import userModel from "../models/user.model.js";

const registerController = async (req, res) => {
  const { email, phone, password } = req.body;

  const user = await userModel.create({
    email,
    phone,
    password,
  });

  res.status(201).json({
    message: "User registered Successfully",
    data: {
      email,
      phone,
      id: user._id,
    },
  });
};

export default { registerController };
