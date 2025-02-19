import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "assets.indolj.io",
      "media-assets.swiggy.com",
      "i.ytimg.com",
      "assets.epicurious.com",
      "leitesculinaria.com",
      "www.thecookierookie.com",
      "www.mysavoryadventures.com",
      "i.pinimg.com",
      "encrypted-tbn0.gstatic.com",
      "www.foodandwine.com",
      "static.toiimg.com",
      "t3.ftcdn.net",
     " cdn-icons-png.flaticon.com",
     "e7.pngegg.com",
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, DELETE, PATCH, POST, PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
