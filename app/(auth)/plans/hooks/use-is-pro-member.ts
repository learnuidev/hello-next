import { useGetMemberType } from "./use-get-member-type";

export const useIsProMember = () => {
  const memberType = useGetMemberType();
  return memberType === "pro";
};
