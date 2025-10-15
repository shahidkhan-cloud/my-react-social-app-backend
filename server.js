const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(
  cors({
    origin: ["https://my-react-social-app.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ TEMPORARY: Basic routes without auth dependencies
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
    database: "Not connected yet",
    timestamp: new Date().toISOString()
  });
});

// ✅ TEMPORARY: Comment out problematic routes until we fix User model
// const authRoutes = require("./routes/authRoutes");
// const postRoutes = require("./routes/postRoutes");
// const replyRoutes = require("./routes/replyRoutes");
// const userRoutes = require("./routes/userRoutes");

// app.use("/api/auth", authRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/replies", replyRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/comments", require("./routes/commentRoutes"));
// app.use("/uploads", express.static("uploads"));

// MongoDB Connect (optional for now)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;