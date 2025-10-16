// backend/routes/replyRoutes.js
import express from "express";
const router = express.Router(); // ✅ Router sahi initialize

import {
  getRepliesByComment,
  createReply,
  toggleReplyLike,
  deleteReply, // ✅ newly added controller
} from "../controllers/replyController.js"; // ✅ ES6 import with .js

import { protect } from "../middleware/authMiddleware.js"; // ✅ ES6 import

// ✅ Get all replies of a comment
router.get("/:commentId", getRepliesByComment);

// ✅ Create a reply for a comment
router.post("/:commentId/create", protect, createReply);

// ✅ Like or unlike a reply
router.post("/:replyId/like", protect, toggleReplyLike);

// ✅ Delete a reply (only post owner)
router.delete("/:replyId", protect, deleteReply);

export default router;
