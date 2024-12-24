"use client";

import { FeatureSelect } from "@/app/next/components/feature-select";
import { useRouter } from "next/navigation";
import { SelectedFeatureComponent } from "@/app/next/components/selected-feature-component";
import { Icons } from "@/components/ui/icons.v2";
import { useGetNextParams } from "./hooks/use-get-next-params";
import { cn } from "@/lib/utils";

const MandarinoNext = () => {
  const router = useRouter();

  const { view, featureId, url } = useGetNextParams();
  return (
    <main className="mx-4 sm:mx-16">
      {featureId !== "phrase" && (
        <div className="flex justify-between items-center">
          <FeatureSelect
            onValueChange={(val) => {
              // alert(val);

              router.push(`/next?feature-id=${val}`);
            }}
          />
          <div className="space-x-8">
            <button
              className={cn(
                view === "history" ? "text-white" : "text-gray-400",
                "transition"
              )}
              onClick={() => {
                router.push(
                  `/next?feature-id=html-parser&url=${url}&view=history`
                );
              }}
            >
              {view === "history" ? (
                <Icons.verticalStackSolid className="text-2xl" />
              ) : (
                <Icons.verticalStack className="text-2xl" />
              )}
            </button>
            <button
              className={cn(
                view === "default" ? "text-white" : "text-gray-400",
                "transition"
              )}
              onClick={() => {
                router.push(
                  `/next?feature-id=html-parser&url=${url}&view=default`
                );
              }}
            >
              {view === "default" ? (
                <Icons.mandarinSolid className="text-2xl" />
              ) : (
                <Icons.mandarin className="text-2xl" />
              )}
            </button>
            <button
              className={cn(
                view === "analytics" ? "text-white" : "text-gray-400",
                "transition"
              )}
              onClick={() => {
                router.push(
                  `/next?feature-id=html-parser&url=${url}&view=analytics`
                );
              }}
            >
              {view === "analytics" ? (
                <Icons.chartColumnSolid className="text-2xl" />
              ) : (
                <Icons.chartColumn className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      )}

      <SelectedFeatureComponent />
    </main>
  );
};

export default MandarinoNext;
