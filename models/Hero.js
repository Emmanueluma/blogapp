import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    subtext: { type: String, required: true },
    image: { type: String, required: true }, // Cloudinary URL, same pattern as Post
  },
  { timestamps: true }
);

export default mongoose.models.Hero || mongoose.model("Hero", heroSchema);