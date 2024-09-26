import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authGuard = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        // User not found
        return res.status(404).json({ message: "User not found" });
      }

      // Attach user to request object
      req.user = user;
      next();
    } catch (error) {
      // Invalid token
      console.error("Authentication error:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    // No token provided
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

export const adminGuard = async (req, res, next) => {
  if (req.user && req.user.admin) {
    console.log(req.user.admin);
    next();
  } else {
    let error = new Error("Not authorized as admin");
    error.statusCode = 401;
    next(error);
  }
};
