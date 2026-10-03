const HAN_PATTERN = /[\u3400-\u4dbf\u4e00-\u9fff]/;

/**
 * The language the reader hands to `Intl.Segmenter`.
 *
 * A reader text has no language of its own (it is whatever was pasted), so the
 * presence of Han characters is what decides between Chinese word segmentation
 * and the generic one. Latin text inside a Chinese text is still segmented
 * fine, which is why the check is "any Han character", not "mostly Han".
 */
export const detectReaderLang = (text: string) =>
  HAN_PATTERN.test(text || "") ? "zh" : "en";
