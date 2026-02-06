import { NextResponse } from "next/server";

export default function proxy(req) {
  const adminAuth = req.cookies.get("admin-auth")?.value;
  const pathname = req.nextUrl.pathname;

  const protectedRoutes = [
    "/dashboard",
    "/add-funds",
    "/add-expenses",
  ];

  const isProtected = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (isProtected && !adminAuth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// 👇 VERY IMPORTANT
export const config = {
  matcher: ["/dashboard/:path*", "/add-funds", "/add-expenses"],
};
