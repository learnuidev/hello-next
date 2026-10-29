"use client";

import Link from "next/link";

import { LandingNavbar } from "@/components/landing-page/landing-navbar";
import { FadeInDiv } from "@/components/fadein-div";

export default function Home() {
  return (
    <main>
      <LandingNavbar />

      <div>
        <FadeInDiv>
          <div className="flex justify-center h-screen items-center space-y-16">
            <Link
              href="/register"
              className="inline-flex h-10 items-center justify-center rounded-full border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground animate-bounce"
            >
              Register For Free
            </Link>
          </div>
        </FadeInDiv>
      </div>
    </main>
  );
}
