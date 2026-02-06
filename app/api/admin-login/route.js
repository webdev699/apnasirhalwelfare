// app/api/admin-login/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  // Example: hardcoded admin credentials
  if (email === "admin@example.com" && password === "password123") {
    // Here you can set a cookie for middleware
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin-auth", "true", { path: "/", httpOnly: true });
    return res;
  }

  // Wrong credentials
  return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
}
