/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    ROZETKA_USERNAME: process.env.ROZETKA_USERNAME,
    ROZETKA_PASSWORD: process.env.ROZETKA_PASSWORD,
    ALLO_USERNAME: process.env.ALLO_USERNAME,
    ALLO_PASSWORD: process.env.ALLO_PASSWORD,
    EPICENTR_TOKEN: process.env.EPICENTR_TOKEN,
    BASE_URL: process.env.BASE_URL,
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
      {
        source: "/api/allo/:path*",
        destination: "https://allo.ua/ua/api/public/:path*",
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://seller.rozetka.com.ua",
          },
          { key: "Access-Control-Allow-Methods", value: "GET,POST" },
        ],
      },
    ];
  },
};

export default nextConfig;
