// "use client";

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy - Mandarino",
};

export default function Terms() {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <section className="mb-12 text-center">
        <h1 className="text-2xl mb-4 font-semibold">Privacy</h1>

        <p className="text-gray-500 font-extralight text-xs">
          Please note that these Privacy were last revised on August 16st, 2025
        </p>
      </section>

      <section className="py-4">
        <h2 className="font-bold my-8 text-xl">General</h2>

        <p className="dark:text-gray-300 font-light">
          We care about your privacy. This policy explains how we collect, use,
          and share your information when you use Mandarino’s websites, apps,
          and services. By using them, you agree to this policy.
        </p>
      </section>
      <section className="py-4">
        <h2 className="font-bold my-8 text-xl">Information we collect</h2>

        <p className="dark:text-gray-300 font-light">
          When you use the Service, Mandarino may collect the following personal
          information about you.
        </p>

        <ul className="list-disc px-8 p-4 font-light">
          <li>Account Registration</li>
          <li>Profile Settings</li>
          <li>User Uploaded Content</li>
        </ul>
      </section>
    </div>
  );
}
