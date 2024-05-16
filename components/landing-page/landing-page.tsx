import { FeaturesList } from "@/app/why/features-list";
import { WhyMandarinoBanner } from "@/app/why/why-mandarino-banner";
import { MandarinoBanner } from "./mandarino-banner";
import { LandingNavbar } from "./landing-navbar";

export const LandingPage = () => {
  return (
    <div>
      <LandingNavbar />

      <main>
        <section className="h-screen">
          <MandarinoBanner />
        </section>

        <WhyMandarinoBanner />
        <FeaturesList />
      </main>
    </div>
  );
};
