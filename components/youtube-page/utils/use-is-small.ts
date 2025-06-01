import { useGetDimensions } from "./use-get-dimensions";

export const useIsSmall = () => {
  const size = useGetDimensions();

  console.log("size", size);

  const isSmall = size?.x < 700;
  return isSmall;
};
