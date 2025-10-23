// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// add near top with other imports
import { startSocketServer } from "./socketServer.js";
// (agar tumne socketServer.js ko alag file me banaya hai jaisa pehle discuss hua)

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import replyRoutes from "./routes/replyRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
//import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();

const app = express();

// ✅ Proper CORS setup
const allowedOrigins = [
  "https://my-react-social-app-backend-dtyc.vercel.app", // frontend
  "http://localhost:3000", // local frontend react
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Base route
app.get("/", (req, res) => {
  res.json({ message: "✅ Backend server is running fine!" });
});

// ✅ Use routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/replies", replyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
//app.use("/api/messages", messageRoutes);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Export app — required for Vercel
//if (process.env.START_SOCKETS === "true") {
  // Start the separate socket server (it creates its own http server)
 // startSocketServer(app);

  // If you also want this same file to start the API listener:
 // const PORT = process.env.PORT || 6000;
 // app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
//}

export default app;
