import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "",
        pathname: "/v0/b/**",
      },
    ],
  },
};

export default nextConfig;
