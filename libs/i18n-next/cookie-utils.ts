export const isClient = () => typeof window !== "undefined";

export function setCookie(key: string, value: string) {
  if (isClient()) {
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; Secure; SameSite=Lax; path=/`;
  }
}

export function getCookie(key: string) {
  if (isClient()) {
    const cookies = document.cookie ? document.cookie.split("; ") : [];
    for (let i = 0; i < cookies.length; i++) {
      const parts = cookies[i].split("=");
      const cookieKey = decodeURIComponent(parts[0]);

      if (cookieKey === key) {
        const cookieValue = parts.slice(1).join("=");
        return decodeURIComponent(cookieValue);
      }
    }
  }
}
