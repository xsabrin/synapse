import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema(
  {
    ownerEmail: {
      type: String,
      required: true,
      unique: true
    },

    contacts: [
      {
        email: { type: String, required: true },
        addedAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.Collection ||
  mongoose.model("Collection", CollectionSchema);
