/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      "rozetka.com.ua",
      "content.rozetka.com.ua",
      "content1.rozetka.com.ua",
      "content2.rozetka.com.ua",
    ],
  },
  env: {
    ROZETKA_USERNAME: process.env.ROZETKA_USERNAME,
    ROZETKA_PASSWORD: process.env.ROZETKA_PASSWORD,
    EPICENTR_TOKEN: process.env.EPICENTR_TOKEN,
    BASE_URL: process.env.BASE_URL,
    BOT_TOKEN: process.env.BOT_TOKEN,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
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
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT" },
        ],
      },
    ];
  },
};

export default nextConfig;
