import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // pdf.js canvas dependency workaround
    config.resolve.alias.canvas = false;

    // pdfjs-dist & mammoth are client-only
    if (isServer) {
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : []),
        "pdfjs-dist",
        "mammoth",
      ];
    }

    return config;
  },
};

export default nextConfig;
