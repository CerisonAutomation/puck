/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: [
    '@measured/puck',
    '@measured/puck-plugin-heading-analyzer',
    '@measured/puck-plugin-emotion-cache',
    'lucide-react',
  ],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
};
