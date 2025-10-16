// backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String },
  password: { type: String, required: true },
  bio: { type: String, default: "" },
  profilePic: { type: String, default: "" },
}, { timestamps: true });

// ✅ Correct export (named export)
export const User = mongoose.models.User || mongoose.model("User", userSchema);
