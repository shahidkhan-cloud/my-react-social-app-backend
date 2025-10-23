// // backend/socketServer.js
// import { Server } from "socket.io";
// import http from "http";
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// //  MongoDB connection

// //mongoose
//   //.connect(process.env.MONGO_URI)
//   //.then(() => console.log("✅ MongoDB Connected (Socket Server)"))
//   //.catch((err) => console.error("❌ MongoDB Error:", err));


// // User schema (online status)
// const userSchema = new mongoose.Schema({
//   username: { type: String, unique: true },
//   online: Boolean,
// });
// const User = mongoose.model("SocketUser", userSchema);

// // Message schema
// const messageSchema = new mongoose.Schema({
//   from: String,
//   to: String,
//   text: String,
//   createdAt: { type: Date, default: Date.now },
// });
// const Message = mongoose.model("SocketMessage", messageSchema);

// //  Socket.io setup

// export const startSocketServer = (expressApp) => {
//   const server = http.createServer(expressApp);

//   const io = new Server(server, {
//     cors: { origin: "*" },
//   });

//   io.on("connection", (socket) => {
//     console.log("User connected: " + socket.id);

//     // User online
//     socket.on("userOnline", async (username) => {
//       await User.findOneAndUpdate(
//         { username },
//         { online: true },
//         { upsert: true, new: true }
//       );
//       socket.username = username; // save username for disconnect
//       io.emit("updateUsers");
//     });

//     // Join private room
//     socket.on("joinRoom", (username) => {
//       socket.join(username);
//     });

//     // Send message
//     socket.on("sendMessage", async ({ from, to, text }) => {
//       const message = new Message({ from, to, text });
//       await message.save();

//       io.to(to).emit("receiveMessage", message); // send to recipient
//     });

//     // Disconnect
//     socket.on("disconnect", async () => {
//       if (socket.username) {
//         await User.findOneAndUpdate(
//           { username: socket.username },
//           { online: false }
//         );
//         io.emit("updateUsers");
//       }
//       console.log("User disconnected: " + socket.id);
//     });
//   });

//   server.listen(5000, () =>
//     console.log("✅ Socket.io server running on port 5000")
//   );
// };
