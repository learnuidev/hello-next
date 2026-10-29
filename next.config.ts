import { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `/` is the public landing page. Logged-in visitors are sent to `/convos`
  // from <Authenticated>, which owns the auth gate — a redirect here would run
  // before that gate and dump logged-out visitors into the login screen.
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
