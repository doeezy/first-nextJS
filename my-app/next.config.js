/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/route/:path*",
        destination: "http://192.168.100.126:9010/route/:path*"
      }
    ];
  }
};

module.exports = nextConfig;
