"use client";

import { QueryClientProvider } from "@/libs/react-query";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faBuildingUser,
  faScrewdriverWrench,
  faToolbox,
} from "@fortawesome/sharp-solid-svg-icons";

import "@/libs/cognito/init";
import { Authenticated } from "@/components/Authenticated";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "游牧方法 - nomad method",
//   description: "Learn languages at the speed of light",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.7.15/mapbox-gl.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css"
          type="text/css"
        />

        <style>
          {`body {
        margin: 0;
        font-family: Helvetica, Arial, sans-serif;
      }
      #map {
        // width: 100vw;
        // height:650px;
      }
      .control-panel {
        position: absolute;
        top: 0;
        right: 0;
        max-width: 320px;
        background: #fff;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        padding: 12px 24px;
        margin: 20px;
        font-size: 13px;
        line-height: 2;
        color: #6b6b76;
        text-transform: uppercase;
        outline: none;
      }

      .mapboxgl-ctrl-attrib-inner {
        display: none;
    }
      
      `}
        </style>
      </head>
      <body
        className={`${inter.className} bg-bkg text-content flex h-screen flex-col`}
      >
        <div className="flex-1">
          <QueryClientProvider>
            <Authenticated>{children}</Authenticated>
          </QueryClientProvider>
        </div>

        <footer className="font-light text-xs my-4 flex justify-center items-center space-x-2 text-gray-300">
          <FontAwesomeIcon icon={faScrewdriverWrench} />
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/vishalgautamm/"
          >
            Vishal Gautam
          </Link>
        </footer>
      </body>
    </html>
  );
}
