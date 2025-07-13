import { cn } from "@/lib/utils";

export const NoResultView = ({ className }: { className?: string }) => {
  return (
    <div className={cn("text-center mt-32 text-gray-400", className)}>
      <h1 className="text-3xl font-extralight">Nothing here</h1>
      <p className="mt-2 text-gray-500">
        Please try a different term and try again
      </p>
    </div>
  );
};
