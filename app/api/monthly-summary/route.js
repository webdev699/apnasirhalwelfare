// app/api/dashboard/monthly-summary/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Funds from "@/model/funds";
import Expense from "@/model/expenses";

export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const year = Number(searchParams.get("year"));
    const month = Number(searchParams.get("month"));

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    // 🔹 Funds aggregation
    const fundsAgg = await Funds.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lt: endDate }
        }
      },
      {
        $group: {
          _id: "$donorName",
          total: { $sum: "$amount" }
        }
      }
    ]);

    // 🔹 Total funds
    const totalFunds = fundsAgg.reduce((sum, f) => sum + f.total, 0);

    // 🔹 Expenses total
    const expensesAgg = await Expense.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lt: endDate }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);
    const startYear = 2026;
const currentYear = new Date().getFullYear();

const years = Array.from(
  { length: currentYear - startYear + 1 },
  (_, i) => startYear + i
);


    const totalExpenses = expensesAgg[0]?.total || 0;

    return NextResponse.json({
      success: true,
      data: {
        totalFunds,
        totalExpenses,
        balance: totalFunds - totalExpenses,
        contributors: fundsAgg,
        years
      }
    });
  } catch (error) {
    console.error("Monthly summary error:", error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
