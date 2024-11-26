import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });

    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/login")

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      return null;
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url),
      );
    } else {
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  },
);

export const config = {
  matcher: [
    "/login",
    "/admin/:path*",
  ],
};
