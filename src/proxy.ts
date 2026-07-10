import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

export default auth((request) => {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard") && !request.auth) {
    const loginUrl = new URL("/dashboard/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/dashboard/login" && request.auth) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
