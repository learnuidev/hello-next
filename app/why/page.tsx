"use client";

import { LandingNavbar } from "@/components/landing-page/landing-page";
import { NavBar } from "@/components/navbar";
import { Icons } from "@/components/ui/icons.v2";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "zh";

  return (
    <main className="w-full">
      <LandingNavbar />

      <section className="flex flex-col items-center justify-center w-full px-4 mx-auto antialiased text-white bg-black h-screen mt-[-120px]">
        <h1 className="max-w-xl mb-8 text-4xl font-extrabold text-center uppercase lg:text-6xl font-display tracking-crazy lg:leading-tight">
          <span> WHY GET A </span>
          <span className=" bg-gradient-to-r from-rose-400 via-purple-500 to-indigo-400 text-transparent bg-clip-text">
            {" "}
            MANDARINO{" "}
          </span>
          <span> ACCOUNT?</span>
        </h1>

        <h2 className="text-xl lg:text-2xl px-8 md:px-16 selection:bg-purple-600">
          Keep your customers happy even during downtime. Reduce support
          tickets. Build customer trust!
        </h2>
      </section>

      <section className="flex flex-col items-center justify-center w-full px-4 mx-auto antialiased text-white bg-black h-screen mt-[-120px]">
        <h3 className="text-gray-500 font-extralight text-3xl md:text-6xl my-8 lg:my-12">
          1
        </h3>
        <h1 className="max-w-xl mb-8 text-3xl font-extrabold text-center uppercase lg:text-5xl font-display tracking-crazy lg:leading-tight">
          Fast
        </h1>

        <h2 className="text-xl lg:text-2xl px-8 md:px-16 selection:bg-purple-600">
          Mandarino is very fast. Which means getting learning more with less
          time
        </h2>
      </section>
      <section className="flex flex-col items-center justify-center w-full px-4 mx-auto antialiased text-white bg-black h-screen mt-[-120px]">
        <h3 className="text-gray-500 font-extralight text-3xl md:text-6xl my-8 lg:my-12">
          2
        </h3>
        <h1 className="max-w-xl mb-8 text-3xl font-extrabold text-center uppercase lg:text-5xl font-display tracking-crazy lg:leading-tight">
          BYOD
        </h1>

        <h2 className="text-xl lg:text-2xl px-8 md:px-16 selection:bg-purple-600">
          Aka Bring Your Own Data. Unlike many cookie cutter language learning
          apps, you bring your own data. This allows you to learn what actually
          matters, rather than forcing things that doesnt even matter. This
          means more personalized and lean learning experience.
        </h2>
      </section>

      <section className="flex flex-col items-center justify-center w-full px-4 mx-auto antialiased text-white bg-black h-screen mt-[-120px]">
        <h3 className="text-gray-500 font-extralight text-3xl md:text-6xl my-8 lg:my-12">
          3
        </h3>
        <h1 className="max-w-xl mb-8 text-3xl font-extrabold text-center uppercase lg:text-5xl font-display tracking-crazy lg:leading-tight">
          Track what you Need
        </h1>

        <h2 className="text-xl lg:text-2xl px-8 md:px-16 selection:bg-purple-600">
          Whether you want to track your content, search or navigation, no
          problem. Mandarino provides it all. With Tracking, you will never lose
          your history
        </h2>
      </section>
      <section className="flex flex-col items-center justify-center w-full px-4 mx-auto antialiased text-white bg-black h-screen mt-[-120px]">
        <h3 className="text-gray-500 font-extralight text-3xl md:text-6xl my-8 lg:my-12">
          4
        </h3>
        <h1 className="max-w-xl mb-8 text-3xl font-extrabold text-center uppercase lg:text-5xl font-display tracking-crazy lg:leading-tight">
          Learn Once, Never Lose Again
        </h1>

        <h2 className="text-xl lg:text-2xl px-8 md:px-16 selection:bg-purple-600">
          Aka Bring Your Own Data. Unlike many cookie cutter language learning
          apps, you bring your own data. This allows you to learn what actually
          matters, rather than forcing things that doesnt even matter
        </h2>
      </section>
      <section className="flex flex-col items-center justify-center w-full px-4 mx-auto antialiased text-white bg-black h-screen mt-[-120px]">
        <h3 className="text-gray-500 font-extralight text-3xl md:text-6xl my-8 lg:my-12">
          5
        </h3>
        <h1 className="max-w-xl mb-8 text-3xl font-extrabold text-center uppercase lg:text-5xl font-display tracking-crazy lg:leading-tight">
          Gen AI
        </h1>

        <h2 className="text-xl lg:text-2xl px-8 md:px-16 selection:bg-purple-600">
          What if you dont have any data? No Problem. With Mandarino AI you can
          do: grammar analysis as well as high quality sentence, dialog and
          story generation and much much more.
        </h2>
      </section>
      <section className="flex flex-col items-center justify-center w-full px-4 mx-auto antialiased text-white bg-black h-screen mt-[-120px]">
        <h3 className="text-gray-500 font-extralight text-3xl md:text-6xl my-8 lg:my-12">
          5
        </h3>
        <h1 className="max-w-xl mb-8 text-3xl font-extrabold text-center uppercase lg:text-5xl font-display tracking-crazy lg:leading-tight">
          Applications
        </h1>

        <h2 className="text-xl lg:text-2xl px-8 md:px-16 selection:bg-purple-600">
          Mandarino is a collection of smaller apps. Which means you only pay
          for the apps that you use
        </h2>
      </section>
    </main>
  );
}
