import { useCurrentAuthUser } from "@/domain/auth/auth.queries";

export const useJwtToken = () => {
  const { data: authUser } = useCurrentAuthUser();

  return authUser?.jwt;
};
