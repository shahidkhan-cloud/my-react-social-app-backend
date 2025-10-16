// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// ✅ Load env variables
dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// ✅ Restrict CORS to frontend
app.use(
  cors({
    origin: ["https://my-react-social-app.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Basic routes
app.get("/", (req, res) => {
  res.json({ 
    message: "Server is running! 🚀",
    status: "OK",
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.json({ 
    status: "Healthy ✅",
    database: mongoose.connection.readyState === 1 ? "Connected ✅" : "Not connected ❌",
    timestamp: new Date().toISOString()
  });
});

// ✅ Routes (ES6 import)
import authRoutes from "./routes/authRoutes.js";
// import postRoutes from "./routes/postRoutes.js";
// import replyRoutes from "./routes/replyRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import commentRoutes from "./routes/commentRoutes.js";

// Use routes
app.use("/api/auth", authRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/replies", replyRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/comments", commentRoutes);
// app.use("/uploads", express.static("uploads"));

// ✅ MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
