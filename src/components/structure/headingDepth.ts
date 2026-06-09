import { createContext } from "react";

/**
 * Depth of the nearest heading ancestor (Section = 1, Subsection = its own
 * level). A Subsection renders one level deeper than its parent. Default is 1 so
 * an orphan Subsection still resolves to level 2.
 */
export const HeadingDepthContext = createContext(1);

/** Deepest heading level the TOC lists / Subsection renders. */
export const MAX_HEADING_LEVEL = 3;

/**
 * Build a stable anchor id for a heading. Prefers an explicit id, then a slug
 * of the ordinal (e.g. "5.1" → "5-1"), then the title, falling back to a
 * React-provided unique id. Keeps anchors human-readable and link-stable across
 * renders so the auto-derived TOC and scroll-spy can target them.
 */
export function headingAnchorId(
  prefix: string,
  explicit: string | undefined,
  index: string | undefined,
  title: string | undefined,
  fallback: string
): string {
  if (explicit) return explicit;
  const source = index ?? title ?? "";
  const slug = source
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}_-]+/gu, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return slug ? `${prefix}-${slug}` : `${prefix}-${fallback}`;
}

