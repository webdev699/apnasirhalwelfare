import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Funds from "@/model/funds";
import Expense from "@/model/expenses";
import expenses from "../../../model/expenses";

export async function GET() {
  try {
    await connectToDatabase();

    // Aggregate total funds collected
    const totalFundsResult = await Funds.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);
// Aggregate total funds by payment method
    const fundMethodsResult = await Funds.aggregate([
      { $group: { _id: "$paymentMethod", total: { $sum: "$amount" } } }
    ]);

    // Aggregate total expenses by payment method
    const expenseMethodsResult = await Expense.aggregate([
      { $group: { _id: "$paymentMethod", total: { $sum: "$amount" } } }
    ]);

    // Merge funds + expenses into single number per payment method
    const paymentTotals = {};

    // Add funds
    fundMethodsResult.forEach(item => {
      paymentTotals[item._id] = (paymentTotals[item._id] || 0) + item.total;
    });

    // Add expenses
    expenseMethodsResult.forEach(item => {
      paymentTotals[item._id] = (paymentTotals[item._id] || 0) + item.total;
    });
    // Aggregate total expenses spent
    const totalExpensesResult = await Expense.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    const totalFundsCollected = totalFundsResult[0]?.total || 0;
    const totalFundsSpent = totalExpensesResult[0]?.total || 0;
    const currentBalance = totalFundsCollected - totalFundsSpent;

    return NextResponse.json(
      {
        success: true,
        data: {
          totalFundsCollected,
          totalFundsSpent,
          currentBalance,
         paymentTotals
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Stats API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch statistics"
      },
      { status: 500 }
    );
  }
}
