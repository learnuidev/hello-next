import { getNmmLink } from "@/libs/utils/get-nmm-link";

/**
 * Where a word of a text leads: its own page inside that text, listing every
 * line which says it — rather than straight out to nmm. The word on that page
 * is what leads to nmm.
 *
 * A convo has no such page under the reader, so its words keep the nmm link
 * instead of being sent to a page that does not exist.
 */
export const getReaderWordHref = ({
  readerItemId,
  word,
  kind,
  lang,
}: {
  readerItemId: string;
  word: string;
  kind?: "reader" | "convo";
  lang: string;
}) =>
  kind === "convo"
    ? getNmmLink({ id: word, lang })
    : `/reader/${readerItemId}/contents/${encodeURIComponent(word)}`;
