export const getNmmLink = ({
  id,
  lang,
  contentId,
  context,
  view,
}: {
  id: string;
  lang: string;
  contentId?: string;
  context?: string | null;
  view?: string;
}) => {
  let baseLink = `/nmm/${encodeURIComponent(id)}?lang=${lang}`;
  if (contentId) {
    baseLink += `&contentId=${encodeURIComponent(contentId)}`;
  }

  if (context) {
    baseLink += `&context=${encodeURIComponent(context)}`;
  }

  if (view) {
    baseLink += `&view=${encodeURIComponent(view)}`;
  }
  return baseLink;
};
