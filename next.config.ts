import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/:path*",
          has: [
            { type: "host", value: "(?<slug>.+)\\.domain\\.com" },
            { type: "host", value: "(?<slug>[^.]+)\\.localhost(?::[0-9]+)?" },
          ],
          destination: "/_tenant/:slug/:path*",
        },
        {
          source: "/dashboard/:path*",
          destination: `/dashboard/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
