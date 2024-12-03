import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const requestMethod = req.method;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/login");

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      return null;
    }

    if (
      req.nextUrl.pathname.startsWith("/api") &&
      ["POST", "PUT", "DELETE"].includes(requestMethod)
    ) {
      if (!isAuth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    } else if (
      req.nextUrl.pathname.startsWith("/api") &&
      requestMethod === "GET"
    ) {
      return null;
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/login", "/admin/:path*", "/api/:path*"],
};
