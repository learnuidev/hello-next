/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { LandingFeatures } from "./landing-features";
import { LandingNavbar } from "./landing-navbar";

/**
 * The public page: the hero the app already had, then the features as links over
 * the real screens.
 *
 * It is assembled from the app's own pieces — `LandingNavbar` and
 * `LandingFeatures` (the app's `Tabs` over the app's player, cloze, reader and
 * dictionary). Nothing on this page is a bespoke look: it is the product,
 * framed.
 */
export const LandingPage = () => {
  return (
    <div>
      <LandingNavbar />

      <main>
        {/* 1. Hero */}
        <section className="relative mx-auto mt-[100px] min-h-[530px] px-8 md:mt-[180px] md:px-32">
          <div className="flex w-full flex-col-reverse gap-8 sm:flex-row">
            <div className="z-50 flex flex-1 flex-col">
              <h2 className="mt-6 max-w-[580px] text-[24px] font-medium leading-tight text-[#878787] md:mt-10 md:text-[36px]">
                Grammar Analysis, Context Learning, Automatic Sentence Mining,
                Content Tracking, Analytics &amp; your own language learning
                superapp
              </h2>

              <div className="mt-8 md:mt-10">
                <div className="flex items-center space-x-4">
                  <Link
                    href="/register"
                    className="inline-flex h-11 items-center justify-center border border-transparent bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none"
                  >
                    Try it for free
                  </Link>

                  <Link
                    href="/login"
                    className="inline-flex h-11 items-center justify-center border border-transparent bg-[#F2F1EF] px-6 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none dark:bg-[#1D1D1D]"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>

            <div className="z-10 mt-10 flex-1 scale-100 sm:scale-100 md:mt-0 md:scale-[0.9] lg:scale-[1.2] 2xl:-top-[20px] 2xl:scale-[1.35]">
              <div style={{ opacity: 1, transform: "none" }}>
                <div className="height-[100%] flex-1">
                  <img
                    alt="Mandarino search results page"
                    height="641"
                    decoding="async"
                    data-nimg="1"
                    className="hidden max-h-[100%] border border-border dark:block dark:[box-shadow:0px_80px_60px_0px_rgba(0,0,0,0.35),0px_35px_28px_0px_rgba(0,0,0,0.25),0px_18px_15px_0px_rgba(0,0,0,0.20),0px_10px_8px_0px_rgba(0,0,0,0.17),0px_5px_4px_0px_rgba(0,0,0,0.14),0px_2px_2px_0px_rgba(0,0,0,0.10)]"
                    src="https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.us-east-1.amazonaws.com/learnuidev@gmail.com/01JJR5AJS9N2P1VW5KNJA6GGH7.png"
                    style={{ color: "transparent" }}
                  />
                  <img
                    alt="Mandarino search results page"
                    height="641"
                    decoding="async"
                    data-nimg="1"
                    className="block max-h-[100%] border border-border dark:hidden"
                    src="https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.us-east-1.amazonaws.com/learnuidev@gmail.com/01JJSJ7J5QB40ZM8TVTCB06BWE.png"
                    style={{ color: "transparent" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Features: links on top, the real screens underneath */}
        <LandingFeatures />

      </main>

      <div className="my-8 text-center text-gray-500">
        <Link href="/terms" className="text-xs">
          Terms &amp; Conditions
        </Link>
      </div>
    </div>
  );
};
