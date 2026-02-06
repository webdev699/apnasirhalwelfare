import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  // Remove cookie
  res.cookies.set("admin-auth", "", {
    path: "/",
    maxAge: 0, // immediately expires
  });

  return res;
}
