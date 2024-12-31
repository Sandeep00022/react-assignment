import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const authUser = async (req, res, next) => {
  const token =
    req.cookies.access_token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ message: "Access denied" });
    req.user = await userModel.findById(user._id);
    next();
  });
};
