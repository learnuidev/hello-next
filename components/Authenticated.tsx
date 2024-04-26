import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { Authenticate } from "./Authenticate";
import { usePathname } from "next/navigation";

export const Authenticated = (props: any) => {
  const { data: authUser, isLoading } = useCurrentAuthUser({});

  const routeName = usePathname();

  if (["/login", "/register"]?.includes(routeName)) {
    return <>{props.children}</>;
  }
  // const route

  if (authUser) {
    return <>{props.children}</>;
  }

  if (isLoading) {
    return <div></div>;
  }

  return <Authenticate />;
};
