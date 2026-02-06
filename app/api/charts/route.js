import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Funds from "@/model/funds";
import Expenses from "@/model/expenses";

export async function GET(req) {
  try {
    await connectToDatabase();

    // 1️⃣ Get selected year OR default to current year
    const { searchParams } = new URL(req.url);
    const currentYear = new Date().getFullYear();
    const selectedYear = Number(searchParams.get("year")) || currentYear;

    // 2️⃣ Define year date range
    const startDate = new Date(`${selectedYear}-01-01`);
    const endDate = new Date(`${selectedYear}-12-31`);

    // 3️⃣ Aggregate FUNDS by month
    const fundsAgg = await Funds.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$amount" }
        }
      }
    ]);

    // 4️⃣ Aggregate EXPENSES by month
    const expensesAgg = await Expenses.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$amount" }
        }
      }
    ]);

    // 5️⃣ Normalize months (ALWAYS 12 months)
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      funds: 0,
      expenses: 0
    }));

    fundsAgg.forEach(item => {
      months[item._id - 1].funds = item.total;
    });

    expensesAgg.forEach(item => {
      months[item._id - 1].expenses = item.total;
    });

    // 6️⃣ Build years dropdown list
    const startYear = 2026; // your system start year
    const years = Array.from(
      { length: currentYear - startYear + 1 },
      (_, i) => startYear + i
    );

    // 7️⃣ Final response
    return NextResponse.json({
      success: true,
      data: {
        year: selectedYear,
        months,
        years
      }
    });

  } catch (error) {
    console.error("Yearly Chart API Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load chart data" },
      { status: 500 }
    );
  }
}
