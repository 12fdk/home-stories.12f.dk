import { readFile } from "node:fs/promises";
import path from "node:path";
import { fetchAppStoreData } from "../utils/appStoreData";

// Self-hosted copy of the App Store icon, downloaded at build time so the
// apple-touch-icon, JSON-LD brand image, and PWA manifest never depend on
// Apple's CDN (whose thumb URLs rotate between app versions). Falls back to
// the checked-in copy when the lookup is unavailable. See #74.
export async function GET() {
  const data = await fetchAppStoreData();
  const url = data?.artworkUrl512;
  if (url?.startsWith("http")) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        return new Response(Buffer.from(await res.arrayBuffer()), {
          headers: { "Content-Type": "image/jpeg" },
        });
      }
    } catch {
      // fall through to the local copy
    }
  }
  // public/logo.png carries the same 512x512 icon (JPEG data despite the name)
  const local = await readFile(path.join(process.cwd(), "public/logo.png"));
  return new Response(local, { headers: { "Content-Type": "image/jpeg" } });
}
