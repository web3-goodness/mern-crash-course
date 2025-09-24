// backend/controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper: generate JWT token
const generateToken = (id, role) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // First user becomes admin, others are normal users
    const userCount = await User.countDocuments();
    const role = userCount === 0 ? "admin" : "user";

    const user = new User({ username, email, password, role });
    await user.save();

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: `User created successfully as ${role}`,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Logged out successfully. Please clear token on client.",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// // backend/controllers/authController.js
// import User from "../models/User.js";
// import jwt from "jsonwebtoken";

// // Helper to generate token
// const generateToken = (id, role) => {
//   return jwt.sign(
//     { id, role },
//     process.env.JWT_SECRET || "devsecret",
//     { expiresIn: "1d" }
//   );
// };

// // SIGNUP (plain-text password - testing only ❌ DO NOT USE IN PRODUCTION)
// export const signup = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Save user with plain-text password
//     const user = new User({
//       username,
//       email,
//       password, // ⚠️ plain-text for now
//       role: "user",
//     });
//     await user.save();

//     const token = generateToken(user._id, user.role);

//     res.status(201).json({
//       message: "User created successfully (plain-text password - testing only)",
//       token,
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // LOGIN (plain-text compare - testing only ❌ DO NOT USE IN PRODUCTION)
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Plain-text comparison
//     if (user.password !== password) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = generateToken(user._id, user.role);

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // LOGOUT (JWT-based -> client must clear token)
// export const logout = async (req, res) => {
//   try {
//     // With JWT, logout is handled client-side by removing token
//     res.json({ message: "Logged out successfully. Please clear token on client." });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
