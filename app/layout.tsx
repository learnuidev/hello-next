"use client";
import { Toaster } from "@/components/ui/toaster";

import "core-js/stable";
import "regenerator-runtime/runtime";

import { QueryClientProvider } from "@/libs/react-query";
import "./globals.css";
import "./zhongwen.css";
import "../libs/sentry/sentry-init";

import { Inter } from "next/font/google";

import "../lib/font-awesome/init";

import "@/libs/cognito/init";
import "@/libs/cognito/clientInit";
import { Authenticated } from "@/components/Authenticated";

import { PostHogProvider } from "@/libs/posthog/posthog.provider";
import { PostHogPageView } from "@/libs/posthog/posthog.page-view";
import { Suspense } from "react";
import { SettingsDialog } from "@/components/settings-dialog/settings-dialog";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageSelector } from "@/components/language-selector/language-selector";

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
      <head></head>

      <body className="dark:bg-[rgb(9,10,11)] bg-white text-black dark:text-white">
        <Suspense>
          <PostHogProvider>
            <PostHogPageView />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div
                className={`${inter.className} bg-bkg text-content flex h-screen relative flex-col`}
              >
                <div className="flex-1">
                  <QueryClientProvider>
                    <Authenticated>{children}</Authenticated>
                    <SettingsDialog />
                  </QueryClientProvider>
                </div>

                <LanguageSelector />

                <footer className="font-light text-xs my-4 flex justify-center items-center space-x-2 text-gray-300 dark:text-gray-700">
                  {/* <FontAwesomeIcon icon={faScrewdriverWrench} />
                <Link
                  target="_blank"
                  href="https://www.linkedin.com/in/vishalgautamm/"
                >
                  Vishal Gautam
                </Link> */}
                </footer>
              </div>
            </ThemeProvider>
          </PostHogProvider>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
