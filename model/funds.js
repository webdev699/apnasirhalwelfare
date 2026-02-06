// models/Fund.js
import mongoose from "mongoose";

const fundSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    donorName: {
      type: String, // optional
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "bank", "jazzcash", "easypaisa", "other"],
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Fund || mongoose.model("Fund", fundSchema);
