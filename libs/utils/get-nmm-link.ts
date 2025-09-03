export const getNmmLink = ({ id, lang }: { id: string; lang: string }) => {
  return `/nmm/${encodeURIComponent(id)}?lang=${lang}`;
};
