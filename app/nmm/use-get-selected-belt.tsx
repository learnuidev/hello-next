import { useGetNmmParams } from "./use-get-nmm-params";
import { belts } from "./utils";

export const useGetSelectedBelt = () => {
  const { level } = useGetNmmParams();

  const selectedBelt = belts?.find((belt) => belt?.hskLevel === level);

  return selectedBelt || belts?.[0];
};
