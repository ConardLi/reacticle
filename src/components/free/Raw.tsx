import type { ReactNode } from "react";
import "./free.css";

export interface RawProps {
  /** Optional caption shown under the custom block. */
  title?: string;
  /** A raw HTML string to render as-is. */
  html?: string;
  /**
   * Arbitrary React content — full components with state, animation, SVG or
   * canvas. This is where the article comes alive beyond what any fixed
   * semantic component (or Markdown) could ever express.
   */
  children?: ReactNode;
}

/**
 * The free-expression layer.
 *
 * The semantic components carry the article's structural body — insights,
 * risks, decisions — and guarantee it always renders completely. Raw is the
 * opposite end of the same idea: it is where HTML's real flexibility shows.
 * Bespoke visualisations, interactive widgets, animation, novel layouts — the
 * standout, creative parts that Markdown simply cannot do.
 *
 * Raw is NOT a rarely-used escape hatch. It does not drop information; it makes
 * an otherwise rigid document feel alive. Reach for it often, and render
 * whatever you like — including full React components, not just HTML strings.
 *
 * Crucially, Raw is NOT a widget library either: its content should be authored
 * fresh for the specific spot it sits in — a one-off `<svg>`, a bespoke bit of
 * `<style>`, a tiny interactive made for this article — never the same few
 * pre-made components reused everywhere. Pull colours/fonts/spacing from theme
 * tokens (`var(--ra-*)`) so each unique piece still matches the theme and
 * switches with it. That is what makes Raw genuinely free yet consistent.
 */
export function Raw({ title, html, children }: RawProps) {
  return (
    <div className="ra-raw">
      {html != null ? (
        <div
          className="ra-raw__body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <div className="ra-raw__body">{children}</div>
      )}
      {title ? <div className="ra-raw__caption">{title}</div> : null}
    </div>
  );
}
