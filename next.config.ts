import { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The convos page is the app's home page.
      {
        source: "/",
        destination: "/convos",
        permanent: false,
      },
    ];
  },
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
      {
        protocol: "https",
        hostname: "d375awjr36fy6n.cloudfront.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
