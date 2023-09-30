import { QueryClientProvider } from "@/libs/react-query";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
      <body className={`${inter.className} bg-bkg text-content`}>
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
