/**
 * Decoding the shape tokens HanziJS-style decompositions emit.
 *
 * A character's sub components sometimes come back as bare stroke shapes instead
 * of characters: the CJK Strokes block (U+31C0–U+31EF) holds `㇒`, `㇆`, `㇏` …, and
 * the decomposition data also borrows the katakana `コ` for a fold (己 = コ + 乚).
 * Those are not text a learner can open, so they are decoded to the basic stroke
 * they draw — the Kangxi stroke radicals 一 丨 丿 丶 乙 — before rendering, and the
 * meaning lookup then finds that radical's gloss in the components list.
 */

/** Stroke and shape tokens → the basic stroke radical they draw. */
export const STROKE_TOKENS: Record<string, string> = {
  "㇀": "一", // 提, a rising horizontal
  "㇁": "乙", // 弯钩
  "㇂": "乙", // 斜钩
  "㇃": "乙", // 扁斜钩
  "㇄": "乙", // 竖弯
  "㇅": "乙", // 横折折
  "㇆": "乙", // 横折钩
  "㇇": "乙", // 横撇
  "㇈": "乙", // 横折弯钩
  "㇉": "乙", // 竖折弯钩
  "㇊": "乙", // 横折提
  "㇋": "乙", // 横折撇
  "㇌": "乙", // 横撇弯钩
  "㇍": "乙", // 横折弯
  "㇎": "乙", // 横折折折
  "㇏": "丶", // 捺
  "㇐": "一", // 横
  "㇑": "丨", // 竖
  "㇒": "丿", // 撇
  "㇓": "丿", // 竖撇
  "㇔": "丶", // 点
  "㇕": "乙", // 横折
  "㇖": "乙", // 横钩
  "㇗": "乙", // 竖折
  "㇘": "乙", // 竖弯折
  "㇙": "乙", // 竖提
  "㇚": "乙", // 竖钩
  "㇛": "乙", // 撇点
  "㇜": "乙", // 撇折
  "㇝": "丶", // 提捺
  "㇞": "乙", // 竖折折
  "㇟": "乙", // 竖弯钩
  "㇠": "乙", // 横斜弯钩
  "㇡": "乙", // 横折折折钩
  "㇢": "乙", // 撇钩
  "㇣": "乙", // 圈
  "コ": "乙", // 横折 — a shape token, not the katakana letter
};

/** A stroke token becomes the basic stroke radical it draws; anything else stays. */
export function decodeGlyph(glyph: string): string {
  return STROKE_TOKENS[glyph] ?? glyph;
}

/** `㇒ 亻 木` → `丿 亻 木`, with the duplicates a decode can create collapsed. */
export function decodeGlyphs<T extends { hanzi: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  const decoded: T[] = [];
  for (const item of items) {
    const hanzi = decodeGlyph(item?.hanzi ?? "");
    if (!hanzi || seen.has(hanzi)) continue;
    seen.add(hanzi);
    decoded.push({ ...item, hanzi });
  }
  return decoded;
}
