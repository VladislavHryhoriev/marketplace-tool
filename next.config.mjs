/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    ROZETKA_USERNAME: process.env.ROZETKA_USERNAME,
    ROZETKA_PASSWORD: process.env.ROZETKA_PASSWORD,
    EPICENTR_TOKEN: process.env.EPICENTR_TOKEN,
  },
  async rewrites() {
    return [
      {
        source: "/api/epicentr/:path*",
        destination: "https://merchant-api.epicentrm.com.ua/:path*",
      },
      {
        source: "/api/rozetka/:path*",
        destination: "https://api-seller.rozetka.com.ua/:path*",
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST" },
        ],
      },
    ];
  },
};

export default nextConfig;
