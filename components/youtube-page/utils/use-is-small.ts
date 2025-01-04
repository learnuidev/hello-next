import { useSize } from "@/hooks/use-size";

export const useIsSmall = () => {
  const size = useSize();

  const isSmall = size?.[0] < 600;
  return isSmall;
};
