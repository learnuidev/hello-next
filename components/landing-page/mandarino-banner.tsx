import { Sparkles } from "../ui/sparkles";

export function MandarinoBanner() {
  return (
    <div className="h-[40rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="text-black md:text-7xl text-5xl lg:text-8xl font-bold text-center dark:text-white relative z-20">
        Mandarino
      </h1>
      <p className="mb-4 lg:text-2xl text-lg font-extralight dark:text-gray-300 text-gray-800">
        A modern language learning app
      </p>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-rose-500 to-transparent h-px w-3/4" />
      </div>
    </div>
  );
}
