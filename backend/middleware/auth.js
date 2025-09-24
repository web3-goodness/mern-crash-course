// backend/middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // Prefer Authorization header but accept cookie if you use cookies
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET not set in environment!");
      return res.status(500).json({ success: false, message: "Server misconfiguration" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user; // attach user
    next();
  } catch (err) {
    console.error("❌ Token verification error:", err.message);
    return res.status(401).json({ success: false, message: "Not authorized, token failed" });
  }
};

// // backend/middleware/auth.js
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// // ------------------------
// // Protect Routes Middleware
// // ------------------------
// export const protect = async (req, res, next) => {
//   let token;

//   // Check for Bearer token in headers
//   if (req.headers.authorization?.startsWith("Bearer")) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, token missing" });
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Attach user to request object
//     const user = await User.findById(decoded.id).select("-password");
//     if (!user) {
//       return res.status(401).json({ message: "Not authorized, user not found" });
//     }

//     req.user = user; // attach user for later use in routes
//     next();
//   } catch (err) {
//     console.error("Auth middleware error:", err);
//     res.status(401).json({ message: "Token invalid" });
//   }
// };

// // ------------------------
// // Admin-only Middleware
// // ------------------------
// export const admin = (req, res, next) => {
//   if (req.user && req.user.role === "admin") {
//     next();
//   } else {
//     res.status(403).json({ message: "Admin only" });
//   }
// };
