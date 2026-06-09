import { useEffect, useState } from "react";
import "./structure.css";

export interface TocItem {
  /** Anchor id of the target section. */
  id: string;
  /** Optional ordinal shown before the label, e.g. "01". */
  index?: string;
  /** Section title. */
  title?: string;
  /** Heading depth: 1 (Section), 2 or 3 (Subsection). Defaults to 1. */
  level?: 1 | 2 | 3;
}

export interface TOCProps {
  /** Entries to list. Usually auto-derived by Article from its Section children. */
  items: TocItem[];
  /** Heading shown above the list. */
  title?: string;
}

/** A left-hand table of contents with scroll-spy highlighting. */
export function TOC({ items, title = "目录" }: TOCProps) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0 || typeof IntersectionObserver === "undefined") return;
    const els = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el != null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="ra-toc" aria-label={title}>
      <div className="ra-toc__title">{title}</div>
      <ol className="ra-toc__list">
        {items.map((it) => {
          const level = it.level ?? 1;
          const classes = ["ra-toc__item", `ra-toc__item--l${level}`];
          if (active === it.id) classes.push("ra-toc__item--active");
          return (
            <li key={it.id} className={classes.join(" ")}>
              <a href={`#${it.id}`}>
                {it.index ? <span className="ra-toc__index">{it.index}</span> : null}
                <span className="ra-toc__label">{it.title ?? "未命名章节"}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
