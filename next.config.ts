import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/petroflow-scada",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
