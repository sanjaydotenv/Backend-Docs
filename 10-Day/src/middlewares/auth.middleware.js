import jwt, { decode } from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log("get a Token", token);

  if (!token) {
    return res.send("token not found");
  }

  let decoded;

  try {
    decoded = jwt.verify(token, "secret");
  } catch (error) {
    return res.status(401).send("Invalid token");
  }

  const getUser = await userModel.findById(decoded.id);
  console.log("getUser", getUser);

  req.forMe = getUser;

  next();
};

export default isAuthenticated;
