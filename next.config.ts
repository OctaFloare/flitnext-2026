import type { NextConfig } from "next";

module.exports = {
  images: {
    remotePatterns: [new URL("https://picsum.photos/seed/**")]
  }
}

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
