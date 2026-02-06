


import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Funds from "@/model/funds";

export async function POST(request) {
  try {
    await connectToDatabase();

    const { amount, donorName, paymentMethod } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { message: "Invalid amount" },
        { status: 400 }
      );
    }

    const fund = await Funds.create({
      amount,
      donorName: donorName || "Anonymous",
      paymentMethod,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, data: fund },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
