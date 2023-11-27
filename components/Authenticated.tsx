import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { Authenticate } from "./Authenticate";

export const Authenticated = (props: any) => {
  const { data: authUser, isLoading } = useCurrentAuthUser({});
  // const route
  const isHomePage = true

  if (authUser || isHomePage) {
    return <>{props.children}</>;
  }

  if (isLoading) {
    return <div></div>
  }

  return <Authenticate />;
};
