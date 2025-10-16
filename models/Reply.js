// backend/models/Reply.js
import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
export const Reply = mongoose.models.Reply || mongoose.model("Reply", replySchema);
