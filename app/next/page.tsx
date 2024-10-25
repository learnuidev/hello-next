"use client";

import { FeatureSelect } from "@/app/next/components/feature-select";
import { useRouter } from "next/navigation";
import { SelectedFeatureComponent } from "@/app/next/components/selected-feature-component";

const MandarinoNext = () => {
  const router = useRouter();
  return (
    <main className="mx-4">
      <FeatureSelect
        onValueChange={(val) => {
          // alert(val);

          router.push(`/next?feature-id=${val}`);
        }}
      />

      <SelectedFeatureComponent />
    </main>
  );
};

export default MandarinoNext;
