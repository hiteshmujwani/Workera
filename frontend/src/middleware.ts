import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  // 🚫 Skip middleware for login/register but redirect logged-in users away from them
  if (
    pathname.startsWith("/candidate/login") ||
    pathname.startsWith("/candidate/register") ||
    pathname.startsWith("/employer/login") ||
    pathname.startsWith("/employer/register")
  ) {
    if (token) {
      try {
        const { payload } = await jwtVerify(token, secret);
        const redirectUrl =
          payload.role === "employer" ? "/employer" : "/candidate";
        return NextResponse.redirect(new URL(redirectUrl, request.url));
      } catch {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  let user = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      user = payload;
    } catch {
      const response = NextResponse.redirect(
        new URL("/candidate/login", request.url)
      );
      response.cookies.delete("token");
      return response;
    }
  }

  const employerRoutes = ["/employer"];
  const candidateRoutes = ["/candidate"];
  const isEmployerRoute = employerRoutes.some((r) => pathname.startsWith(r));
  const isCandidateRoute = candidateRoutes.some((r) => pathname.startsWith(r));

  // 🔒 No token → send to correct login
  if (!user && (isEmployerRoute || isCandidateRoute)) {
    return isEmployerRoute
      ? NextResponse.redirect(new URL("/employer/login", request.url))
      : NextResponse.redirect(new URL("/candidate/login", request.url));
  }

  // 🚫 Wrong role access
  if (user) {
    if (user.role === "employer" && isCandidateRoute)
      return NextResponse.redirect(new URL("/employer", request.url));

    if (user.role === "candidate" && isEmployerRoute)
      return NextResponse.redirect(new URL("/candidate", request.url));

    // 🏠 Root redirect
    if (pathname === "/") {
      const redirectUrl = user.role === "employer" ? "/employer" : "/candidate";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/candidate/:path*", "/employer/:path*"],
};
