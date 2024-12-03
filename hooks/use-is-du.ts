import { usePathname } from "next/navigation";

export const useIsDu = () => {
  const routeName = usePathname();
  return routeName?.includes("/du");
};
