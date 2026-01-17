import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: String,
  job: String,
  country: String,
  bio: String,
  skills: String
}, { timestamps: true });

export default mongoose.model("Profile", ProfileSchema);
