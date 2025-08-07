import { ReactNode } from "react";
import { useGetActiveUserPlan } from "../hooks/use-get-active-user-plan";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const WithUserPlanOnboarding = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { data: userPlan, isLoading } = useGetActiveUserPlan();

  const pathName = usePathname();

  if (pathName === "/plans") {
    return children;
  }

  if (isLoading) {
    return null;
  }

  if (!userPlan) {
    return (
      <div className="text-center mt-32">
        <h1 className="text-3xl">You dont have a plan.</h1>

        <p className="mt-4 text-xl">
          Please <Link href="/plans"> Upgrade </Link> to continue.
        </p>
      </div>
    );
  }
  if (userPlan?.isExpired) {
    return (
      <div className="text-center mt-32">
        <h1 className="text-3xl">Your plan has expired.</h1>

        <p className="mt-4 text-xl">
          Please click here to <Link href="/plans"> Upgrade </Link>
        </p>
      </div>
    );
  }
  return children;
};
