import { useSize } from "@/hooks/use-size";

export const useGetDimensions = () => {
  const size = useSize();

  return {
    x: size[0],
    y: size[1],
  };
};
