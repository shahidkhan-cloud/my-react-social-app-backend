import express from require("express");
import router from express.Router();
export const {
  getRepliesByComment,
  createReply,
  toggleReplyLike,
  deleteReply, // ✅ newly added controller
} = require("../controllers/replyController");
export const protect = require("../middleware/authMiddleware");

// ✅ Get all replies of a comment
router.get("/:commentId", getRepliesByComment);

// ✅ Create a reply for a comment
router.post("/:commentId/create", protect, createReply);

// ✅ Like or unlike a reply
router.post("/:replyId/like", protect, toggleReplyLike);

// ✅ Delete a reply (only post owner)
//router.delete("/:replyId/delete", protect, deleteReply);
router.delete("/:replyId", protect, deleteReply);


//module.exports = router;
