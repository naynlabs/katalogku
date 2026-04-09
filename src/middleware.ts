import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  // --------------------------------------------------------
  // 1. Authenticated users trying to access auth pages → redirect to dashboard
  // --------------------------------------------------------
  if (sessionCookie && ["/login", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL("/etalase/dashboard", request.url));
  }

  // --------------------------------------------------------
  // 2. Unauthenticated users trying to access protected routes → redirect to login
  // --------------------------------------------------------
  if (!sessionCookie && pathname.startsWith("/etalase")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // --------------------------------------------------------
  // 3. Unauthenticated users trying to access onboarding → redirect to login
  // --------------------------------------------------------
  if (!sessionCookie && pathname.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // --------------------------------------------------------
  // 4. Unauthenticated users trying to access admin console → redirect to login
  //    (RBAC role check "ADMIN" akan dilakukan di level page/layout)
  // --------------------------------------------------------
  if (!sessionCookie && pathname.startsWith("/x-control")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/etalase/:path*",
    "/login",
    "/register",
    "/onboarding",
    "/x-control/:path*",
  ],
};
