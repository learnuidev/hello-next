import { useGetContent } from "@/app/nmm/content/use-get-content";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useGetContentQuery } from "@/domain/content/content.queries";

export const useIsContentAuthor = (contentId: string) => {
  const { data: user } = useCurrentAuthUser();

  const { data: content } = useGetContentQuery({ contentId });

  return content?.userId === user?.email;
};
