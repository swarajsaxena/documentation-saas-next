// middleware.ts

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// 1. Define which routes you want to protect with Clerk
//    You can adjust these patterns to match your private sections.
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

function handleTenantRewrite(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl.clone();

  const isSubdomain =
    process.env.NODE_ENV === "development"
      ? host.split(".").length > 1
      : host.split(".").length > 2 && !host.startsWith("www");

  if (isSubdomain && !url.pathname.startsWith("/_next")) {
    const slug = host.split(".")[0];
    url.pathname = `/documentation/${slug}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// 3. Compose Clerk’s middleware with your rewrite
export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Enforce authentication on protected routes
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  return handleTenantRewrite(req);
});

export const config = {
  matcher: [
    // Apply to all non-API, non-Next.js internals and static files
    "/((?!api/|_next/|_static/|_vercel).*)",
    // If you have API or tRPC routes that need auth/rewrites, include them:
    "/api/:path*",
    "/trpc/:path*",
  ],
}; // :contentReference[oaicite:3]{index=3}
