/* eslint-disable @next/next/no-img-element */
import { FeaturesList } from "@/app/why/features-list";
import { WhyMandarinoBanner } from "@/app/why/why-mandarino-banner";
import { MandarinoBanner } from "./mandarino-banner";
import { LandingNavbar } from "./landing-navbar";
import Link from "next/link";

export const LandingPage = () => {
  return (
    <div>
      <LandingNavbar />

      <main>
        <section className="mt-[100px] sm:mt-[250px] min-h-[530px] relative lg:h-[calc(100vh-300px)] mx-auto px-8 md:px-32">
          <div className="flex flex-col-reverse sm:flex-row w-full gap-8">
            <div className="flex flex-col flex-1 z-50">
              <h2 className="mt-6 md:mt-10 max-w-[580px] text-[#878787] leading-tight text-[24px] md:text-[36px] font-medium">
                Grammar Analysis, Context Learning, Automatic Sentence Mining,
                Content Tracking, Analytics &amp; your own language learning
                superapp
              </h2>
              <div className="mt-8 md:mt-10">
                <div className="flex items-center space-x-4">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://cal.com/vishal-gautam-0ubnvw/15min"
                  >
                    <button className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border hover:bg-accent hover:text-accent-foreground py-2 border-transparent h-11 px-6 dark:bg-[#1D1D1D] bg-[#F2F1EF]">
                      Talk to founder
                    </button>
                  </a>
                  <a href="https://mandarino.io/login">
                    <button className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 py-2 h-11 px-5">
                      Try it for free
                    </button>
                  </a>
                </div>
              </div>
              {/* <p className="text-xs text-[#707070] mt-4 font-mono">
                Claim $49/mo deal, free during beta.
              </p> */}
            </div>

            <div className="flex-1 scale-100 sm:scale-100 md:scale-[0.9] lg:scale-[1.2] mt-10 md:mt-0  2xl:scale-[1.35] 2xl:-top-[20px] z-10">
              <div style={{ opacity: 1, transform: "none" }}>
                <div className="height-[100%] flex-1">
                  <img
                    alt="Mandarino search results page"
                    // width="1141"
                    height="641"
                    decoding="async"
                    data-nimg="1"
                    className="max-h-[100%] hidden dark:block border border-border dark:[box-shadow:0px_80px_60px_0px_rgba(0,0,0,0.35),0px_35px_28px_0px_rgba(0,0,0,0.25),0px_18px_15px_0px_rgba(0,0,0,0.20),0px_10px_8px_0px_rgba(0,0,0,0.17),0px_5px_4px_0px_rgba(0,0,0,0.14),0px_2px_2px_0px_rgba(0,0,0,0.10)] [box-shadow:0px_82px_105px_0px_#E3E2DF7A,0px_29.93px_38.33px_0px_#E3E2DF54,0px_14.53px_18.61px_0px_#E3E2DF44,0px_7.12px_9.12px_0px_#E3E2DF36,0px_2.82px_3.61px_0px_#E3E2DF26]"
                    src="https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.us-east-1.amazonaws.com/learnuidev@gmail.com/01JJR5AJS9N2P1VW5KNJA6GGH7.png"
                    style={{ color: "transparent" }}
                  />
                  <img
                    alt="Mandarino search results page"
                    // width="1141"
                    height="641"
                    decoding="async"
                    data-nimg="1"
                    className="max-h-[100%] block dark:hidden border border-border dark:[box-shadow:0px_80px_60px_0px_rgba(0,0,0,0.35),0px_35px_28px_0px_rgba(0,0,0,0.25),0px_18px_15px_0px_rgba(0,0,0,0.20),0px_10px_8px_0px_rgba(0,0,0,0.17),0px_5px_4px_0px_rgba(0,0,0,0.14),0px_2px_2px_0px_rgba(0,0,0,0.10)] [box-shadow:0px_82px_105px_0px_#E3E2DF7A,0px_29.93px_38.33px_0px_#E3E2DF54,0px_14.53px_18.61px_0px_#E3E2DF44,0px_7.12px_9.12px_0px_#E3E2DF36,0px_2.82px_3.61px_0px_#E3E2DF26]"
                    src="https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.us-east-1.amazonaws.com/learnuidev@gmail.com/01JJSJ7J5QB40ZM8TVTCB06BWE.png"
                    style={{ color: "transparent" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="h-screen">
          <MandarinoBanner />
        </section>

        <WhyMandarinoBanner />
        <FeaturesList />
      </main>

      <div className="text-center my-8 text-gray-500">
        <Link href="/terms" className="text-xs">
          {" "}
          Terms & Conditions{" "}
        </Link>
      </div>
    </div>
  );
};
