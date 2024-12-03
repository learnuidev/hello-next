import { usePathname } from "next/navigation";

export const useIsDu = (exact = true) => {
  const routeName = usePathname();
  return exact ? routeName === "/du" : routeName?.includes("/du");
};
