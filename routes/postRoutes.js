import express from "express";
const router = express.Router(); // ✅ router ko import sahi tarike se
//import { verifyToken } from "../middleware/authMiddleware.js";
//router.post("/create", verifyToken, createPost);

import {
  createPost,
  getAllPosts,
  toggleLike,
  addComment,
  toggleCommentLike,
  toggleReplyLike,
  getPostsByUser,
  updatePost,
  deletePost,
} from "../controllers/postController.js"; // ✅ correct import path

import { protect } from "../middleware/authMiddleware.js"; // ✅ correct import

// ✅ Create a new post
router.post("/create", protect, createPost);

// ✅ Get all posts
router.get("/", getAllPosts);

// ✅ Like or Unlike a specific post
router.post("/:id/like", protect, toggleLike);

// ✅ Edit a post
router.put("/:id", protect, updatePost);

// ✅ Delete a post
router.delete("/:id", protect, deletePost);

// ✅ Add a comment
router.post("/:id/comment", protect, addComment);

// ✅ Like or Unlike a comment
router.post("/comment/:id/like", protect, toggleCommentLike);

// ✅ Like or Unlike a reply
router.post("/reply/:id/like", protect, toggleReplyLike);

// ✅ Get posts by user
router.get("/user/:userId", getPostsByUser);

export default router;
