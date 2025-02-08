"use client";

import "@/libs/cognito/init";

import { NavBar } from "@/components/navbar";

import { SpeakPage } from "@/components/speak/v1";

export default function Home() {
  return (
    <main className="">
      <NavBar />

      <SpeakPage />
    </main>
  );
}
