export const getCoverPhotoUrl = (content: any) => {
  return (
    content?.coverPhotoUrl ||
    content?.backgroundImageUrl ||
    content?.thumbnails?.standard?.url ||
    content?.thumbnails?.high?.url ||
    content?.thumbnails?.medium?.url ||
    content?.thumbnails?.default?.url ||
    content?.thumbnails?.maxres?.url ||
    content?.thumbnails?.[0]?.url
  );
};
