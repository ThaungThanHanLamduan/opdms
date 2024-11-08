import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get("ODPAuthToken");
  const url = req.nextUrl.clone();

  // If the user is on a public path and has a token, redirect to home
  if ((url.pathname === "/auth/login" || url.pathname === "/auth/signup") && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If the user is not authenticated and trying to access protected routes, redirect to login
  if (!token && !url.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/patients/*", "/user-guide"],
};
