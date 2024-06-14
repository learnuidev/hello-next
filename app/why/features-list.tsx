"use client";

import { Icons } from "@/components/ui/icons.v2";
import { useRouter, useSearchParams } from "next/navigation";
import { mandarinoFeatures } from "./mandarino-features";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import { FadeInDiv } from "@/components/fadein-div";
import { Button } from "@/components/ui/button";

function SectionItem({
  step,
  feature,
}: {
  step: number;
  feature: {
    id: string;
    title: string;
    description: string;
  };
}) {
  return (
    <FadeInDiv>
      <section className="flex flex-col items-center justify-center w-full px-4 mx-auto antialiased text-gray-200 h-screen">
        <h3 className="text-gray-800 font-extralight text-3xl md:text-6xl my-8 lg:my-12">
          {step}
        </h3>
        <h1 className="max-w-xl mb-8  font-extrabold text-center uppercase text-4xl md:text-5xl lg:text-6xl font-display tracking-crazy lg:leading-tight">
          {feature?.title}
        </h1>

        <h2
          dangerouslySetInnerHTML={{ __html: feature?.description }}
          className="text-xl lg:text-2xl px-8 md:px-16 lg:px-64 selection:bg-purple-600 text-center font-light text-gray-300"
        ></h2>
      </section>
    </FadeInDiv>
  );
}

export const FreeTrialButton = ({ showBanner }: { showBanner?: boolean }) => {
  const router = useRouter();
  return (
    <FadeInDiv>
      <div className="flex justify-center h-screen items-center space-y-16">
        <Button
          variant="outline"
          className="rounded-full animate-bounce"
          onClick={() => {
            router.push("/register");
          }}
        >
          {" "}
          Register For Free
        </Button>
      </div>
    </FadeInDiv>
  );
};

export const FeaturesList = () => {
  const router = useRouter();

  return (
    <>
      {mandarinoFeatures?.map((feature, idx) => {
        return (
          <SectionItem key={feature.id} feature={feature} step={idx + 1} />
        );
      })}

      <FreeTrialButton />
    </>
  );
};
