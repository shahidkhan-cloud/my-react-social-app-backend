// backend/routes/commentRoutes.js
import express from "express";
import router from express.Router();
import Comment from"../models/Comment";
import Post from "../models/Post";
import protect from "../middleware/authMiddleware"; // ✅ fixed import

// DELETE a comment
 router.delete("/:id", protect, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // ✅ Only comment owner can delete
    if (String(comment.user) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    // ✅ Delete comment from Comment collection
    await Comment.deleteOne({ _id: comment._id });

    // ✅ Remove comment reference from Post
    await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: comment._id },
    });

    res.status(200).json({ message: "Comment deleted successfully ✅" });
  } catch (err) {
    console.error("❌ Delete Comment Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
