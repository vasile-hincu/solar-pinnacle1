export const SITE_URL =
  import.meta.env.VITE_SITE_URL || "https://xcbotnari.md";

export function absoluteUrl(pathname: string) {
  const base = SITE_URL.replace(/\/$/, "");
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}
