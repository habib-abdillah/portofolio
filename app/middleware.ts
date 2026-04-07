import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value

  const pathname = request.nextUrl.pathname
  const isAdminRoute = pathname.startsWith("/admin")
  const isLoginPage = pathname === "/admin/login"

  // Redirect root /login to /admin/login
  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  if (isAdminRoute && !isLoginPage && !sessionToken) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  if (isLoginPage && sessionToken) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}