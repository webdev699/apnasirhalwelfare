import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Funds from "@/model/funds";


export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit")) || 50;
    const page = parseInt(searchParams.get("page")) || 1;
    const skip = (page - 1) * limit;

    const [funds, totalRecords] = await Promise.all([
      Funds.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .lean(),

      Funds.countDocuments()
    ]);

    return NextResponse.json({
      success: true,
      data: funds,
      totalRecords
    });

  } catch (error) {
    console.error("Funds API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch funds" },
      { status: 500 }
    );
  }
}
