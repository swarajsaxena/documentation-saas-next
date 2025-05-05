import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel).*)"],
};

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl;

  const isSubdomain =
    process.env.NODE_ENV === "development"
      ? host.split(".").length > 1
      : host.split(".").length > 2 && !host.startsWith("www");

  if (isSubdomain && !url.pathname.startsWith("/_next")) {
    // Rewrite everything for slug.domain.com to /_tenant/...
    const slug = host.split(".")[0];
    const path = `/documentation/${slug}${url.pathname}`;
    url.pathname = path;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
