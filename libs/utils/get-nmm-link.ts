export const getNmmLink = ({
  id,
  lang,
  contentId,
}: {
  id: string;
  lang: string;
  contentId?: string;
}) => {
  const baseLink = `/nmm/${encodeURIComponent(id)}?lang=${lang}`;
  return contentId
    ? `${baseLink}&contentId=${encodeURIComponent(contentId)}`
    : baseLink;
};
