import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")
  const isLoginPage = request.nextUrl.pathname === "/admin/login"

  if (isAdminRoute && !isLoginPage && !sessionToken) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  if (isLoginPage && sessionToken) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}