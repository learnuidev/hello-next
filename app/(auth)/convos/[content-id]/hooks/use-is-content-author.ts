import { useGetContentQuery } from "@/domain/content/content.queries";
import { useGetAuthUserProfileQuery } from "@/hooks/user/use-get-auth-user-profile";

export const useIsContentAuthor = (contentId: string) => {
  const { data: user } = useGetAuthUserProfileQuery();

  const { data: content } = useGetContentQuery({ contentId });

  return content?.userId === user?.email;
};
