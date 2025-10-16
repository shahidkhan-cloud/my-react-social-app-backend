// backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    // email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    bio: { type: String, default: "" },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError in development/hot reload
export const User = mongoose.models.User || mongoose.model("User", userSchema);
