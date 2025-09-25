export const sanitizeValue = (value: any): string => {
  if (value == null) return "";

  return String(value)
    .substring(0, 255)
    .replace(/[<>'"&]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .replace(/data:/gi, "")
    .replace(/vbscript:/gi, "")
    .trim();
};
