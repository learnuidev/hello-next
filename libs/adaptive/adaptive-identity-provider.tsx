import { useQuery } from "@tanstack/react-query";
import { useAdaptive } from "./adaptive-provider";
// import { useAdaptive } from "./adaptive-core-provider";

export const AdapiveIdentityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { identify } = useAdaptive();

  const { data } = useQuery({
    queryKey: ["identify"],
    queryFn: identify,
  });

  console.log("IDENTITY", data);

  return children;
};
