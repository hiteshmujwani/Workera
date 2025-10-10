import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  let user = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      user = payload;
    } catch (error) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      return response;
    }
  }

  const publicRoutes = ["/", "/login", "/register"];
  const adminRoutes = ["/admin"];
  const userRoutes = ["/user", "/profile", "/jobs"];

  const isPublicRoute = publicRoutes.includes(pathname);
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isUserRoute = userRoutes.some((route) => pathname.startsWith(route));

  if (user && (pathname === "/login" || pathname === "/register")) {
    const redirectUrl = user.role === "admin" ? "/admin" : "/user";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  if (!user && (isAdminRoute || isUserRoute)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user) {
    if (user.role === "admin" && isUserRoute) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (user.role === "user" && isAdminRoute) {
      return NextResponse.redirect(new URL("/user", request.url));
    }

    if (pathname === "/") {
      const redirectUrl = user.role === "admin" ? "/admin" : "/user";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/user/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/jobs/:path*",
  ],
};
