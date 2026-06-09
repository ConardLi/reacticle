import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { TOC, type TocItem } from "./TOC";
import "./structure.css";

/**
 * Reading-column width. Independent of the theme: the theme owns aesthetics
 * (type, color, rhythm), the article owns how wide it reads. Defaults to
 * `regular`.
 */
export type ArticleWidth = "narrow" | "regular" | "wide" | "full";

export interface ArticleProps {
  children: ReactNode;
  /**
   * Render a left-hand table of contents, auto-derived from the rendered
   * Section / Subsection headings. Works regardless of how sections are
   * composed — including the one-Section-per-component-file pattern — because
   * derivation reads the live DOM, not the static React child tree.
   */
  toc?: boolean;
  /**
   * Reading-column width mode, decoupled from the theme:
   * `narrow` (~34rem, focused essay/briefing) · `regular` (~46rem, default
   * longform reading) · `wide` (~58rem, table/code/data-dense) · `full`
   * (~78rem, visual-essay / wide media).
   */
  width?: ArticleWidth;
}

function sameItems(a: TocItem[], b: TocItem[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((it, i) => {
    const o = b[i];
    return (
      o != null &&
      it.id === o.id &&
      it.index === o.index &&
      it.title === o.title &&
      it.level === o.level
    );
  });
}

/** Top-level container for a whole ReActicle article / report. */
export function Article({ children, toc = false, width = "regular" }: ArticleProps) {
  const articleRef = useRef<HTMLElement>(null);
  const [items, setItems] = useState<TocItem[]>([]);

  // Derive the TOC from the real DOM after each commit. Reading the rendered
  // headings (rather than inspecting React children) lets the TOC see through
  // section wrapper components, so `<SectionFoo />` in an assembler still lists.
  useLayoutEffect(() => {
    if (!toc) {
      if (items.length) setItems([]);
      return;
    }
    const root = articleRef.current;
    if (!root) return;
    const next: TocItem[] = Array.from(
      root.querySelectorAll<HTMLElement>("[data-ra-toc]")
    ).map((el) => {
      const lvl = Number(el.getAttribute("data-ra-level")) || 1;
      return {
        id: el.id,
        index: el.getAttribute("data-ra-index") ?? undefined,
        title: el.getAttribute("data-ra-title") ?? undefined,
        level: Math.min(Math.max(lvl, 1), 3) as 1 | 2 | 3,
      };
    });
    setItems((prev) => (sameItems(prev, next) ? prev : next));
  });

  const showToc = toc && items.length > 0;

  return (
    <div
      className={
        showToc
          ? "ra-article-layout ra-article-layout--with-toc"
          : "ra-article-layout"
      }
      data-width={width}
    >
      {showToc ? <TOC items={items} /> : null}
      <article className="ra-article" ref={articleRef}>
        {children}
      </article>
    </div>
  );
}
