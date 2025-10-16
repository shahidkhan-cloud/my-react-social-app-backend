import express from "express";
const router = express.Router(); // ✅ Router initialize sahi tarike se

import { signup, login } from "../controllers/authcontroller.js"; // ✅ ES6 import

// ✅ Routes
router.post("/signup", signup);
router.post("/login", login);

export default router;
