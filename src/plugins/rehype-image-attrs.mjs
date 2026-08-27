import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = "public";
const cache = new Map();

/**
 * Intrinsic dimensions straight from the file header. Markdown images render as
 * a bare <img>, so every in-article photo shipped with no width/height and no
 * loading hint — the browser reserved no space for it and the article reflowed
 * as each one arrived. Reading the header avoids adding an image dependency
 * just to learn two numbers.
 */
function readSize(file) {
  if (cache.has(file)) return cache.get(file);
  let size = null;
  try {
    const fd = fs.openSync(file, "r");
    const buf = Buffer.alloc(64 * 1024);
    const read = fs.readSync(fd, buf, 0, buf.length, 0);
    fs.closeSync(fd);
    const b = buf.subarray(0, read);

    if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) {
      // PNG: IHDR is always the first chunk.
      size = { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
    } else if (b.length > 30 && b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
      const fmt = b.toString("ascii", 12, 16);
      if (fmt === "VP8X") {
        size = {
          width: 1 + (b[24] | (b[25] << 8) | (b[26] << 16)),
          height: 1 + (b[27] | (b[28] << 8) | (b[29] << 16)),
        };
      } else if (fmt === "VP8 ") {
        size = { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
      } else if (fmt === "VP8L") {
        const bits = b.readUInt32LE(21);
        size = { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
      }
    } else if (b.length > 4 && b[0] === 0xff && b[1] === 0xd8) {
      // JPEG: walk segments to the first SOF marker.
      let i = 2;
      while (i < b.length - 9) {
        if (b[i] !== 0xff) { i++; continue; }
        const marker = b[i + 1];
        if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
          size = { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) };
          break;
        }
        i += 2 + b.readUInt16BE(i + 2);
      }
    }
  } catch {
    size = null;
  }
  cache.set(file, size);
  return size;
}

function walk(node, visit) {
  if (!node || typeof node !== "object") return;
  if (node.type === "element") visit(node);
  for (const child of node.children ?? []) walk(child, visit);
}

/**
 * Stamps intrinsic width/height plus the right loading hint onto every image in
 * a markdown post. The first image is the article's LCP candidate, so it loads
 * eagerly at high priority; the rest are lazy.
 */
export function rehypeImageAttrs() {
  return (tree) => {
    let index = 0;
    walk(tree, (node) => {
      if (node.tagName !== "img") return;
      const props = (node.properties ??= {});
      const src = String(props.src ?? "");
      if (!src.startsWith("/")) return;

      const isFirst = index++ === 0;

      if (props.width == null || props.height == null) {
        const size = readSize(path.join(PUBLIC_DIR, src.replace(/^\//, "")));
        if (size) {
          props.width = size.width;
          props.height = size.height;
        }
      }
      props.decoding ??= "async";
      if (isFirst) {
        props.loading ??= "eager";
        props.fetchpriority ??= "high";
      } else {
        props.loading ??= "lazy";
      }
    });
  };
}

export default rehypeImageAttrs;
