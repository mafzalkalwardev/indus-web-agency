import { SITE_CONTACT } from "@/lib/site-config";

/** Public IndexNow key — must match public/{key}.txt contents */
export const INDEXNOW_KEY = "a7f3c91e0b2d4e8f9a1c6d5e4b3a2f10";

const HOST = new URL(SITE_CONTACT.siteUrl).host;

export async function submitIndexNow(urls: string[]): Promise<{ ok: boolean; status: number; body: string }> {
  const absolute = urls.map((u) => (u.startsWith("http") ? u : `${SITE_CONTACT.siteUrl}${u}`));
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_CONTACT.siteUrl}/${INDEXNOW_KEY}.txt`,
    urlList: absolute,
  };

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const body = await res.text();
  return { ok: res.ok || res.status === 202, status: res.status, body };
}
