"use client";
import { Toaster } from "@/components/ui/toaster";
import { InitialLoadingBanner } from "@/components/ui/initial-loading-banner";

import "core-js/stable";
import "regenerator-runtime/runtime";

import { QueryClientProvider } from "@/libs/react-query";
import "./globals.css";
import "./zhongwen.css";

import { Inter } from "next/font/google";

import "../lib/font-awesome/init";

import { Authenticated } from "@/components/Authenticated";
import "@/libs/cognito/clientInit";
import "@/libs/cognito/init";

import { LanguageSelector } from "@/components/language-selector/language-selector";
import { SearchDialog } from "@/components/search-dialog/search-dialog";
import { SettingsDialog } from "@/components/settings-dialog/settings-dialog";
import { ThemeProvider } from "@/components/theme-provider";
// import { PostHogPageView } from "@/libs/posthog/posthog.page-view";
import { PostHogProvider } from "@/libs/posthog/posthog.provider";
import { Suspense } from "react";

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
    <html suppressHydrationWarning>
      <head>
        {/* <Script
          src="https://datafa.st/js/script.js"
          data-website-id="68d4c2a24b0000c1caa0dde9"
          data-domain="mandarino.io"
          strategy="afterInteractive"
          defer
        /> */}
      </head>

      <body className="dark:bg-[rgb(9,10,11)] bg-white text-black dark:text-white">
        <Suspense>
          <PostHogProvider>
            {/* <PostHogPageView /> */}
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <InitialLoadingBanner>
                <div
                  className={`${inter.className} bg-bkg text-content flex h-screen relative flex-col`}
                >
                  <div className="flex-1">
                    <QueryClientProvider>
                      <Authenticated>{children}</Authenticated>
                      <SettingsDialog />
                      <SearchDialog />
                    </QueryClientProvider>
                  </div>

                  {/* <LanguageSelector /> */}

                  <footer className="font-light text-xs my-4 flex justify-center items-center space-x-2 text-gray-300 dark:text-gray-700"></footer>
                </div>
              </InitialLoadingBanner>
            </ThemeProvider>
          </PostHogProvider>

          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
