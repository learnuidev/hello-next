import { Skeleton } from "@/components/ui/skeleton";

export const ConvoLoadingScreen = () => {
  return (
    <main className="mx-4 md:mx-16 my-16">
      <div className="flex items-center space-x-4">
        <div className="space-y-2">
          <Skeleton className="h-12 w-[450px] bg-slate-800" />
          <Skeleton className="h-6 w-[550px] bg-slate-900" />
        </div>
      </div>
      <div className="flex items-center space-x-4 mt-8">
        <div className="space-y-2">
          <Skeleton className="h-12 w-[450px] bg-rose-500" />
          <Skeleton className="h-6 w-[550px] bg-rose-200" />
        </div>
      </div>
    </main>
  );
};
