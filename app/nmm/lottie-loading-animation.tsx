import { cn } from "@/lib/utils";

export function LottieLoadingAnimation({ className }: { className?: string }) {
  return (
    <div className="flex justify-center items-center py-8">
      <div
        className={cn(
          "animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white",
          className,
        )}
      ></div>
    </div>
  );
}
