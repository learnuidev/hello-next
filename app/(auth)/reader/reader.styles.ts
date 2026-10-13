/**
 * The reader's surface, as a card.
 *
 * The insights are panels rather than a ruled table: each block sits on the page
 * by shadow instead of being separated by a line, which is what keeps a screen
 * of numbers from reading like a spreadsheet.
 */
export const readerCard = "bg-gray-50 dark:bg-[rgb(13,14,15)]";

export const readerCardShadow =
  "shadow-xl shadow-zinc-900/10 dark:shadow-black/40";

/** A rounded card: the surface, the shadow, ready for its own padding. */
export const readerCardFull = `${readerCard} ${readerCardShadow} rounded-2xl`;
