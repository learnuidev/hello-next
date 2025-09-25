export const findCookie = (cookies: string[], name: string): string | null => {
  const nameEQ = name + "=";
  const cookie = cookies.find((c) => c.indexOf(nameEQ) === 0);
  return cookie ? cookie.substring(nameEQ.length) : null;
};
