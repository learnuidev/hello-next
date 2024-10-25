import { getFeatureById } from "../components/features";
import { useGetNextParams } from "./use-get-next-params";

export const useGetSelectedFeature = () => {
  const { featureId } = useGetNextParams();

  const feature = getFeatureById(featureId);

  return feature;
};
