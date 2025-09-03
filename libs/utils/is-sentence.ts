export function isSentence(str: string) {
  str = str.trim();

  // English / Latin script: starts with capital A–Z, ends with ., ?, !
  const latinPattern = /^[A-Z][\s\S]*[.!?]$/;

  // Chinese/Japanese: must end with 。！？ (full-width stop, exclamation, question)
  const cjkPattern =
    /^[\u4E00-\u9FFF\u3040-\u30FF\u3400-\u4DBF\uF900-\uFAFF][\s\S]*[。！？]$/;

  // Korean (Hangul: U+AC00–U+D7AF). Ends with normal or full-width punctuation
  const koreanPattern = /^[\uAC00-\uD7AF][\s\S]*[.!?。！？]$/;

  // Arabic + Urdu (Arabic extended): U+0600–U+06FF and supplementary blocks
  // Ends with ., !, or Arabic question mark (؟) [U+061F]
  const arabicPattern =
    /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF][\s\S]*[.!؟!]$/;

  return (
    latinPattern.test(str) ||
    cjkPattern.test(str) ||
    koreanPattern.test(str) ||
    arabicPattern.test(str)
  );
}
