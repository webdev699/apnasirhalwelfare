// models/Expense.js
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    projectName: {
      type: String, // Food, Medical, Education, Rent
      required: true,
    },

    description: {
      type: String,
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

export default mongoose.models.Expense || mongoose.model("Expense", expenseSchema);
