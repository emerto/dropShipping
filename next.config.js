/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  swcMinify: true,
  images: {
    domains: ["tcvbahslxgfxsxqidkyy.supabase.co", "via.placeholder.com"],
  },
};

module.exports = nextConfig;
