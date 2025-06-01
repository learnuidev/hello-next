import { useSize } from "@/hooks/use-size";

export const useGetDimensions = () => {
  const size = useSize();

  console.log("size", size);

  return {
    x: size[0],
    y: size[1],
  };
};
