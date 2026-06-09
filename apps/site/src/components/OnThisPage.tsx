import { useEffect, useState } from "react";

export interface TocEntry {
  id: string;
  label: string;
  depth?: 1 | 2;
}

export interface OnThisPageProps {
  entries: TocEntry[];
}

/** Right-rail "on this page" with scroll-spy, mono small-caps styling. */
export function OnThisPage({ entries }: OnThisPageProps) {
  const [active, setActive] = useState<string | null>(
    entries[0]?.id ?? null
  );

  useEffect(() => {
    if (entries.length === 0 || typeof IntersectionObserver === "undefined")
      return;
    const els = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => el != null);
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((r) => r.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav className="toc" aria-label="本页目录">
      <div className="toc__title">本页</div>
      {entries.map((e) => (
        <a
          key={e.id}
          className="toc__link"
          href={`#${e.id}`}
          data-active={active === e.id}
          data-depth={e.depth ?? 1}
        >
          {e.label}
        </a>
      ))}
    </nav>
  );
}
