/** Pragmatic email check — the real verification happens via the emailed code. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function validateEmail(value: string) {
  if (!value.trim()) return "Enter your email address.";
  if (!EMAIL_PATTERN.test(value.trim())) return "Enter a valid email address.";
  return null;
}

export function validateNewPassword(value: string) {
  if (!value) return "Choose a password.";
  if (value.length < 8) return "Use at least 8 characters.";
  return null;
}
