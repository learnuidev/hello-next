import { useGetDimensions } from "./use-get-dimensions";

export const useIsSmall = () => {
  const size = useGetDimensions();

  const isSmall = size?.x < 700;
  return isSmall;
};
