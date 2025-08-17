// "use client";

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guidelines - Mandarino",
};

export default function Terms() {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <section className="mb-12 text-center">
        <h1 className="text-2xl mb-4 font-semibold">Community Guidelines</h1>

        <p className="text-gray-500 font-extralight text-xs">
          Please note that these Community Guidelines were last revised on
          August 16st, 2025
        </p>
      </section>

      <section className="py-4">
        <h2 className="font-bold my-8 text-xl">Always be Respectful</h2>

        <p className="dark:text-gray-300">
          We join from different parts of the world, speaking at different
          levels, but all with the same goal — to learn. We value curiosity,
          asking questions, and understanding each other’s cultures. Be
          respectful of others and their backgrounds.
        </p>
      </section>
      <section className="py-4">
        <h2 className="font-bold my-8 text-xl">Content Upload Policy</h2>

        <p className="dark:text-gray-300">Please dont upload content that is</p>

        <ul className="list-disc px-8 p-4">
          <li>Illegal</li>
          <li>Pornographic</li>
          <li>Excessively profane or violent</li>
          <li>Spam</li>
          <li>Threatening, harassing, or bullying</li>
          <li>Associated with racism or intolerance</li>
          <li>Impersonating someone in a misleading or deceptive manner</li>
          <li>Personal confidential information</li>
        </ul>
      </section>
    </div>
  );
}
