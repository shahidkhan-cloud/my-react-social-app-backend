import  mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    //email: { type: String, : true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    bio: { type: String, default: "" },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
//module.exports = mongoose.models.User || mongoose.model("User", userSchema);
