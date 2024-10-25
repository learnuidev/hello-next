import { useGetSelectedFeature } from "@/app/next/hooks/use-get-selected-feature";

export const SelectedFeatureComponent = () => {
  const feature = useGetSelectedFeature();
  return (
    <div>
      <feature.Component />
    </div>
  );
};
