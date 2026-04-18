export const getNmmLink = ({
  id,
  lang,
  contentId,
  context,
}: {
  id: string;
  lang: string;
  contentId?: string;
  context?: string;
}) => {
  let baseLink = `/nmm/${encodeURIComponent(id)}?lang=${lang}`;
  if (contentId) {
    baseLink += `&contentId=${encodeURIComponent(contentId)}`;
  }

  if (context) {
    baseLink += `&context=${encodeURIComponent(context)}`;
  }
  return baseLink;
};
