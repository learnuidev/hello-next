import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/**", // Allows all paths from this hostname
      },

      {
        protocol: "https",
        hostname:
          "nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
