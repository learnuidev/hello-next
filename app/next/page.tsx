"use client";

import { FeatureSelect } from "@/app/next/components/feature-select";
import { useRouter } from "next/navigation";
import { SelectedFeatureComponent } from "@/app/next/components/selected-feature-component";
import { Icons } from "@/components/ui/icons.v2";
import { useGetNextParams } from "./hooks/use-get-next-params";

const MandarinoNext = () => {
  const router = useRouter();

  const { view, featureId, url } = useGetNextParams();
  return (
    <main className="mx-4 sm:mx-16">
      <div className="flex justify-between items-center">
        <FeatureSelect
          onValueChange={(val) => {
            // alert(val);

            router.push(`/next?feature-id=${val}`);
          }}
        />
        <div className="space-x-8">
          <button
            onClick={() => {
              router.push(
                `/next?feature-id=html-parser&url=${url}&view=default`
              );
            }}
          >
            <Icons.mandarin className="text-2xl" />
          </button>
          <button
            onClick={() => {
              router.push(
                `/next?feature-id=html-parser&url=${url}&view=analytics`
              );
            }}
          >
            <Icons.chartColumn className="text-2xl" />
          </button>
        </div>
      </div>

      <SelectedFeatureComponent />
    </main>
  );
};

export default MandarinoNext;
