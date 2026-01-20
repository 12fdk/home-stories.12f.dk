// Get the base path from Astro config (set at build time)
const BASE_PATH = import.meta.env.BASE_URL || "";

/**
 * Prefix a path with the base URL for GitHub Pages deployment
 * @param path - The path to prefix (should start with /)
 * @returns The path prefixed with the base URL
 */
export function withBase(path: string): string {
  if (!path) return BASE_PATH;
  // Don't modify external URLs (http:// or https://)
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  // Remove trailing slash from base and ensure path starts with /
  const base = BASE_PATH.endsWith("/") ? BASE_PATH.slice(0, -1) : BASE_PATH;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

export default withBase;
