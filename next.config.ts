import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enables React's strict mode
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
    ],
  },
};

export default nextConfig;
