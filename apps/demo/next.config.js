/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@puckeditor/core", "lucide-react"],
  experimental: {
    optimizePackageImports: ["lucide-react", "@puckeditor/core"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: "/edit/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};
