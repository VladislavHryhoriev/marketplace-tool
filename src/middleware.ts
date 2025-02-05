import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

  if (req.nextUrl.pathname.startsWith("/menu") && token !== "token3301") {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (!token) return NextResponse.redirect(new URL("/auth", req.url));
  if (isAuthPage && token) return NextResponse.redirect(new URL("/", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/menu/:path*"],
};
