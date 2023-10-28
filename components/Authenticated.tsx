import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { Authenticate } from "./Authenticate";

export const Authenticated = (props: any) => {
  const { data: authUser } = useCurrentAuthUser({});

  if (authUser) {
    return <>{props.children}</>;
  }

  return <Authenticate />;
};
