import { useGetMemberType } from "./use-get-member-type";

export const useIsFreeMember = () => {
  const memberType = useGetMemberType();

  return memberType === "free";
};
