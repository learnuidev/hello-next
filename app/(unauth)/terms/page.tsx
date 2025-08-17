// "use client";

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms - Mandarino",
  description: "Terms & Conditions",
};

export default function Terms() {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <section className="mb-12 text-center">
        <h1 className="text-2xl mb-4 font-semibold">Terms & Conditions</h1>

        <p className="text-gray-500 font-extralight text-xs">
          Please note that these Terms and Conditions were last revised on
          August 16st, 2025
        </p>
      </section>

      <section className="py-4">
        <h2 className="font-bold my-8 text-xl">General</h2>

        <p className="dark:text-gray-300 font-light">
          The service lets you use different educational tools, like learning or
          practicing a language. Mandarino can update, change, pause, improve,
          or stop any part of the service at any time.
        </p>
      </section>
      <section className="py-4">
        <h2 className="font-bold my-8 text-xl">
          Acceptable Use of the Services
        </h2>

        <p className="dark:text-gray-300 font-light">
          <span>
            You’re responsible for what you do on our services, including
            through your account. To keep things safe and enjoyable for
            everyone, some actions aren’t allowed. When using the services, you
            must follow our{" "}
          </span>
          <Link href="/guidelines" className="underline">
            Community Guidelines.
          </Link>
        </p>
      </section>
      <section className="py-4">
        <h2 className="font-bold my-8 text-xl">Registration</h2>

        <p className="dark:text-gray-300 font-light">
          When you sign up for and use the service, you agree to:
        </p>

        <ul className="list-disc px-8 p-4 font-light">
          <li>
            Give Mandarino accurate and up-to-date information about yourself
            (or your organization).
          </li>
          <li>Keep your password and account details private and secure.</li>
          <li>
            Update your information if it changes, so it stays correct and
            current.
          </li>
          <li>
            Take full responsibility for everything that happens under your
            account.
          </li>
        </ul>
      </section>
      <section className="py-4">
        <h2 className="font-bold my-8 text-xl">Content Submission</h2>

        <p className="dark:text-gray-300 font-light">
          When you upload or share anything on Mandarino (like text, photos,
          audio, videos or other materials), you give Mandarino permission to
          use it in many ways. This permission:
        </p>

        <ul className="list-disc px-8 p-4 font-light">
          <li>Is free for Mandarino (you won’t get paid).</li>
          <li>You can delete any time</li>
          <li>Allows Mandarino to give others permission to use it too.</li>
        </ul>

        <p className="dark:text-gray-300 font-light">
          <span>
            Please dont upload content that that violates Mandarino's{" "}
          </span>{" "}
          <Link href="/guidelines" className="underline">
            Community Guidelines.
          </Link>
        </p>
      </section>
      <section className="py-4">
        <h2 className="font-bold my-8 text-xl">
          Copyright Infringement Notice
        </h2>

        <p className="dark:text-gray-300 font-light pb-4">
          If you believe something on our service violates your copyright, you
          can send us a notice under the DMCA with details about the work, the
          infringing material, your contact info, and a statement that your
          claim is made in good faith. Our copyright agent can be reached at
          <a href="mailto:mandarinohello@gmail.com" className="underline">
            {" "}
            mandarinohello@gmail.com
          </a>
          .
        </p>
        <p className="dark:text-gray-300 font-light">
          If your content was removed by mistake, you may send us a
          counter‑notice with your contact info, a description of the removed
          content, and a statement that you believe it was removed in error.
          We’ll forward your counter‑notice to the original claimant, and
          they’ll have 10 days to let us know if they’re taking legal action. If
          we don’t hear back, we may restore your content.
        </p>
      </section>
      <section className="py-4">
        <h2 className="font-bold my-8 text-xl">License to Apps</h2>

        <p className="dark:text-gray-300 font-light">
          You can use one copy of the Mandarino app on a device you own or
          control. You can’t share, copy, or mess with the app’s code (no
          reverse-engineering, decompiling, etc.). Mandarino owns all rights to
          the app, including updates and fixes.
        </p>
      </section>
      <section className="py-4">
        <h2 className="font-bold my-8 text-xl">Refund Policy</h2>

        <p className="dark:text-gray-300 font-light">
          You get 30 days to try the product (via Mandarino Free). If you decide
          to buy (Mandarino Pro), all payments are final. We don’t give refunds
          or credits for virtual items or unused membership time, unless your
          local law requires it.
        </p>
      </section>
      <section className="py-4">
        <h2 className="font-bold my-8 text-xl">Termination</h2>

        <p className="dark:text-gray-300 font-light">
          Mandarino can end your access to the service anytime, for any reason,
          and you won’t be able to keep using it. You can also close your
          account anytime by following the instructions in the service. Certain
          sections of these Terms will still apply even after your account is
          closed.
        </p>
      </section>
      <section className="py-4">
        <h2 className="font-bold my-8 text-xl">Trademarks</h2>

        <p className="dark:text-gray-300 font-light">
          ‘Mandarino’ and the related logos, graphics, and trademarks belong to
          Mandarino or other owners. Using the service doesn’t give you any
          right to use or copy these names, logos, or trademarks.
        </p>
      </section>

      <section className="py-4">
        <h2 className="font-bold my-8 text-xl">Privacy</h2>

        <p className="dark:text-gray-300 font-light">
          Use of the Service is also governed by our Privacy Policy, a copy of
          which is located at{" "}
          <Link href="/privacy" className="underline">
            www.mandarino.io/privacy
          </Link>
          . By using the Service, you consent to the terms of the Privacy
          Policy.
        </p>
      </section>

      <section className="py-4">
        <h2 className="font-bold my-8 text-xl">Governing Law</h2>

        <p className="dark:text-gray-300 font-light">
          These Terms and Conditions are governed by the laws of the Province of
          Québec and the laws of Canada that apply there, no matter where you
          are from or where you use the service.
        </p>
      </section>

      <section className="py-4">
        <h2 className="font-bold my-8 text-xl">Language</h2>

        <p className="dark:text-gray-300 font-light">
          This agreement was written in English. If a translation says something
          different, the English version is what counts.
        </p>
      </section>
    </div>
  );
}
