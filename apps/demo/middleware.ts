import { NextRequest, NextResponse } from "next/server";

/**
 * @file middleware.ts
 * @description Edge middleware for the Puck demo.
 * Currently adds a no-store cache header to /edit/* routes
 * and a no-index header to prevent search engine indexing of the editor.
 *
 * TODO: Add authentication guard before production use.
 * e.g. check for a session cookie / JWT and redirect to /login if missing.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();

  // Editor route — never cache, never index
  if (pathname.startsWith("/edit")) {
    res.headers.set("Cache-Control", "no-store, must-revalidate");
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return res;
}

export const config = {
  matcher: ["/edit/:path*", "/api/save"],
};
