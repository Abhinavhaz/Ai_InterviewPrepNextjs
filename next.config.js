/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevent ESLint errors from failing the Vercel build. We still get lint locally.
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Keep TS type-checking during build. If needed, set to true to unblock quickly.
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;

