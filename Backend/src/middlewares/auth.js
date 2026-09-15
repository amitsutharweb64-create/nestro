import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export async function protect(req, res, next) {
  try {
    let token = null;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      const authorization = req.headers.authorization;
      token = authorization?.startsWith("Bearer ")
        ? authorization.slice(7)
        : authorization;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required",
      });
    }
    
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // Support the current token shape (`{ data: { id } }`) as well as
    // previously issued tokens that may use `{ id }`.
    const userId = decoded.data?.id || decoded.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();

  } catch (error) {
    console.log("Auth Error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}
  


export function authorized(...roles) {
  return (req, res, next) => {
    try {
      console.log("Allowed roles:", roles);
      console.log("Current user:", req.user);

      if (!req.user) {
        return res.status(401).json({
          message: "User not authenticated",
        });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Access denied, you are not authorized",
        });
      }

      next();

    } catch (error) {
      console.log("Authorization error:", error);

      return res.status(500).json({
        message: "Authorization failed",
      });
    }
  };
}
