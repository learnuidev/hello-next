import { ContentToCollect } from "./content-collections.types";

/**
 * The bits of a piece of content that a collection remembers.
 *
 * Collections store a snapshot rather than a reference, so their cards can be
 * rendered without fetching the content again. Callers hold the content in
 * different shapes — the player has a full content item, the collections page
 * has a stored item — so this picks the fields out of either.
 *
 * Returns null when there is nothing to identify the content by, which is what
 * keeps a star from being rendered for something unsaved.
 */
export const toContentToCollect = (content: any): ContentToCollect | null => {
  const contentId = content?.id || content?.contentId;

  if (!contentId) {
    return null;
  }

  return {
    contentId,
    title: content?.title,
    subtitle: content?.subtitle,
    description: content?.description,
    author: content?.author,
    thumbnailUrl:
      content?.coverPhotoUrl ||
      content?.backgroundImageUrl ||
      content?.thumbnailUrl,
    format: content?.format,
    lang: content?.lang,
    seriesId: content?.seriesId,
  };
};
