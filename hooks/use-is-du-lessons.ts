import { usePathname } from "next/navigation";

export const useIsDuLessons = (exact = true) => {
  const routeName = usePathname();
  return routeName?.includes("/du/lessons");
};
