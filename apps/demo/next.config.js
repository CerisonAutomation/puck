/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@measured/puck"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  poweredByHeader: false,
}
