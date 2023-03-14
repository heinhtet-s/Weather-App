/** @type {import('next').NextConfig} */
const nextConfig = {
  future: { webpack5: true },
  experimental: {
    appDir: true,
    outputStandalone: true,
  },
};

module.exports = nextConfig;
