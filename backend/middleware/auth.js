import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

export const protect = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.adminId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
