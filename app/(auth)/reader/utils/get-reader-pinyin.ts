import { getPinyin } from "@/libs/utils/segment-text";

/**
 * Pinyin of a line, read locally with pinyin-pro (the app's own overrides
 * included) — the reader never calls an API for it.
 */
export const getReaderPinyin = (text: string) => (text ? getPinyin(text) : "");
