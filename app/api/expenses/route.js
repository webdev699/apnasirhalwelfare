import { NextResponse } from "next/server";
import Expense from "@/model/expenses";
import { connectToDatabase } from "@/utils/db";

export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit")) || 50;
    const page = parseInt(searchParams.get("page")) || 1;
    const skip = (page - 1) * limit;

    const [expenses, totalRecords] = await Promise.all([
      Expense.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .lean(),

      Expense.countDocuments()
    ]);

    return NextResponse.json({
      success: true,
      data: expenses,
      totalRecords
    });

  } catch (error) {
    console.error("Expenses API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch expenses" },
      { status: 500 }
    );
  }
}
