// backend/controllers/authController.js
import { User } from "../models/User.js";
//import User from "../models/User.js";


import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ SIGNUP
export const signup = async (req, res) => {
  try {
    const { username, bio, password, profilePic } = req.body;

    // 🧩 Debug log (see what data is actually coming)
    console.log("📥 Signup request received:", req.body);

    // ✅ Field validation
    if (!username || !bio || !password || !profilePic) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken!" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user
    const newUser = new User({
      username,
      bio,
      profilePic,
      password: hashedPassword,
    });

    // ✅ Save to MongoDB
    const savedUser = await newUser.save();
    console.log("✅ New user saved:", savedUser._id);

    // ✅ Response
    res.status(201).json({ message: "User created successfully ✅" });
  } catch (err) {
    console.error("❌ Signup error:", err.message);
    res.status(500).json({ message: err.message || "Server error ❌" });
  }
};

// ✅ LOGIN
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "Login successful ✅",
      token,
      user: {
        id: user._id,
        username: user.username,
        bio: user.bio,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error ❌" });
  }
};
