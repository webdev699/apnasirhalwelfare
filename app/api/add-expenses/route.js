
import { connectToDatabase } from "../../../utils/db";
import Expense from "@/model/expenses";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { amount, projectName, description, paymentMethod } = body;

    // Validation
    if (!amount || Number(amount) <= 0) {
      return NextResponse.json(
        { success: false, message: "Amount must be greater than 0." },
        { status: 400 }
      );
    }

    if (!projectName?.trim()) {
      return NextResponse.json(
        { success: false, message: "Project name is required." },
        { status: 400 }
      );
    }

    const validPaymentMethods = [
      "cash",
      "bank",
      "jazzcash",
      "easypaisa",
      "other",
    ];

    if (!validPaymentMethods.includes(paymentMethod)) {
      return NextResponse.json(
        { success: false, message: "Invalid payment method." },
        { status: 400 }
      );
    }

    const expense = await Expense.create({
      amount: Number(amount),
      projectName: projectName.trim(),
      description: description?.trim() || "",
      paymentMethod,

    });

    return NextResponse.json(
      {
        success: true,
        message: "Expense added successfully!",
        data: expense,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Add Expense Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add expense." },
      { status: 500 }
    );
  }
}
