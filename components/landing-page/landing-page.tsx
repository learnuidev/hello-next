import Link from "next/link";
import { Icons } from "../ui/icons.v2";
import { Sparkles } from "../ui/sparkles";

export function MandarinoBanner() {
  return (
    <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="md:text-7xl text-5xl lg:text-8xl font-bold text-center text-white relative z-20">
        Mandarino
      </h1>
      <p className="mb-4 lg:text-xl text-lg font-extralight text-gray-300">
        A modern language learning app
      </p>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <Sparkles
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}

export const LandingPage = () => {
  return (
    <div>
      <nav className="flex justify-between items-center w-full px-4 md:px-20 my-6">
        <div className="my-2 flex space-x-2 md:space-x-8 items-center">
          <Link href="/">
            <Icons.mandarin className="text-xl hover:text-rose-400 transition" />
          </Link>
        </div>
        <div>
          <Link
            href="/login"
            className="flex items-center text-sm space-x-2 hover:text-rose-400 transition"
          >
            <Icons.fingerPrint className="" />
            <p>Login</p>
          </Link>
        </div>
      </nav>

      <main>
        <section>
          <MandarinoBanner />
        </section>
        <section className="flex mx-auto">{/* <p>BYOB</p> */}</section>
      </main>
    </div>
  );
};
