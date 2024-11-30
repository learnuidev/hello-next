import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { useVerifyUser } from "../hooks/auth/use-verify-user";
import { useGetDuParams } from "../hooks/use-get-du-params";
import { DuLogin } from "./du-login";

export const WithVerifiedUser = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { cookie } = useGetDuParams();

  const { data, isLoading } = useVerifyUser({ cookie });

  if (isLoading) {
    return null;
  }

  if (data) {
    return children;
  }

  return <DuLogin />;
};
