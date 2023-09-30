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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "游牧方法 - nomad method",
  description: "Learn languages at the speed of light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-bkg text-content flex h-screen flex-col`}
      >
        <div className="flex-1">
          <QueryClientProvider>{children}</QueryClientProvider>
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
