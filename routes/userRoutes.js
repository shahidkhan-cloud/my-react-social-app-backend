// backend/routes/userRoutes.js
import express from "express";
import bcrypt from "bcryptjs";
import cloudinary from "cloudinary";
import { User } from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js"; // agar auth chahiye

const router = express.Router();

// 🟢 Cloudinary config
cloudinary.v2.config({
  cloud_name: "ddxuael58",
  api_key: "142743491188937",
  api_secret: "emRfjOtJSPV77IzZkcGaODu0Gs8",
});

// 🟩 Get a user by ID
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🟦 Update user profile (Edit details + image + optional password)
router.put("/:userId", async (req, res) => {
  try {
    const { username, bio, password, profilePic } = req.body;
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (username) user.username = username;
    if (bio) user.bio = bio;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    if (profilePic && profilePic.startsWith("http")) {
      user.profilePic = profilePic;
    }

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully ✅",
      user: { ...updatedUser._doc, password: undefined },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error ❌" });
  }
});

// 🟥 Delete user profile
router.delete("/:userId", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
