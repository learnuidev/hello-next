"use client";

import { FeatureSelect } from "@/app/next/components/feature-select";
import { SelectedFeatureComponent } from "@/app/next/components/selected-feature-component";
import { useRouter } from "next/navigation";
import { useGetNextParams } from "./hooks/use-get-next-params";

const MandarinoNext = () => {
  const router = useRouter();

  const { view, featureId, url } = useGetNextParams();
  return (
    <main className={featureId === "phrase" ? "" : "mx-4 sm:mx-16"}>
      {featureId !== "phrase" && (
        <div className="flex justify-between items-center">
          <FeatureSelect
            onValueChange={(val) => {
              // alert(val);

              router.push(`/next?feature-id=${val}`);
            }}
          />
        </div>
      )}

      <SelectedFeatureComponent />
    </main>
  );
};

export default MandarinoNext;
