import { useMemo, useState } from "react";
import { ThemeProvider } from "reacticle";
import {
  galleryEntries,
  galleryKinds,
  findGalleryEntry,
  galleryNeighbors,
  THEME_ACCENT,
  type GalleryEntry,
} from "../data/gallery";

/* ============================================================ INDEX ===== */

/**
 * Gallery index — a searchable, filterable card grid built to scale to a large
 * collection. It renders only metadata (never live articles), so it stays fast
 * regardless of how many specimens exist. Cards link to a dedicated reader at
 * #/gallery/<slug>.
 */
export function GalleryIndexPage() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return galleryEntries.filter((e) => {
      if (kind && e.kind !== kind) return false;
      if (!q) return true;
      return (
        e.title.toLowerCase().includes(q) ||
        e.blurb.toLowerCase().includes(q) ||
        e.kind.toLowerCase().includes(q) ||
        e.themeLabel.toLowerCase().includes(q)
      );
    });
  }, [query, kind]);

  return (
    <div className="gx">
      <header className="gx__head">
        <div className="gx__headtext">
          <span className="gx__eyebrow">效果演示</span>
          <h1 className="gx__title">样本文章集</h1>
          <p className="gx__lede">
            每篇文章绑定一套契合其气质的主题，点开即在该主题下全幅阅读。用搜索与分类筛选，
            随集合增长依旧好找。
          </p>
        </div>
        <div className="gx__count">
          <b>{galleryEntries.length}</b>
          <span>篇</span>
        </div>
      </header>

      <div className="gx__controls">
        <label className="gx__search">
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" />
            <line x1="10.5" y1="10.5" x2="14" y2="14" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索标题、摘要、主题…"
            aria-label="搜索文章"
          />
        </label>
        <div className="gx__chips" role="group" aria-label="按类别筛选">
          <button
            className="gx-chip"
            data-active={kind === null}
            onClick={() => setKind(null)}
          >
            全部
          </button>
          {galleryKinds.map((k) => (
            <button
              key={k}
              className="gx-chip"
              data-active={kind === k}
              onClick={() => setKind(k === kind ? null : k)}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {results.length > 0 ? (
        <ul className="gx__grid">
          {results.map((e) => (
            <GalleryCard key={e.slug} entry={e} />
          ))}
        </ul>
      ) : (
        <div className="gx__empty">
          没有匹配的文章。
          <button
            className="gx__reset"
            onClick={() => {
              setQuery("");
              setKind(null);
            }}
          >
            清除筛选
          </button>
        </div>
      )}
    </div>
  );
}

function GalleryCard({ entry }: { entry: GalleryEntry }) {
  const accent = THEME_ACCENT[entry.theme];
  return (
    <li className="gx-card" style={{ ["--gx-accent" as string]: accent }}>
      <a className="gx-card__link" href={`#/gallery/${entry.slug}`}>
        <div className="gx-card__cover" data-theme={entry.theme}>
          <span className="gx-card__kind">{entry.kind}</span>
          <span className="gx-card__theme">{entry.themeLabel}</span>
        </div>
        <div className="gx-card__body">
          <h2 className="gx-card__title">{entry.title}</h2>
          <p className="gx-card__blurb">{entry.blurb}</p>
        </div>
        <div className="gx-card__foot">
          <time>{entry.date}</time>
          <span className="gx-card__go">阅读 →</span>
        </div>
      </a>
    </li>
  );
}

/* =========================================================== READER ===== */

/**
 * Gallery reader — one article, full-bleed, framed on a mat keyed to ITS bound
 * theme so the exhibit is self-consistent regardless of the global chrome
 * theme. Includes a back link and prev/next navigation across the collection.
 */
export function GalleryReaderPage({ slug }: { slug: string }) {
  const entry = findGalleryEntry(slug);

  if (!entry) {
    return (
      <div className="gx-reader gx-reader--missing">
        <p>没有找到这篇文章。</p>
        <a className="gx-back" href="#/gallery">
          ← 返回全部文章
        </a>
      </div>
    );
  }

  const { prev, next } = galleryNeighbors(slug);
  const Report = entry.render;

  return (
    <div className="gx-reader" data-theme={entry.theme}>
      <div className="gx-reader__bar">
        <a className="gx-back" href="#/gallery">
          ← 全部文章
        </a>
        <div className="gx-reader__meta">
          <span>{entry.kind}</span>
          <span>·</span>
          <b>{entry.themeLabel}</b>
          <span>·</span>
          <time>{entry.date}</time>
        </div>
      </div>

      <div className="gx-reader__stage">
        <div className="gx-reader__paper">
          <ThemeProvider theme={entry.theme}>
            <Report />
          </ThemeProvider>
        </div>
      </div>

      <nav className="gx-reader__nav" aria-label="文章导航">
        {prev ? (
          <a className="gx-reader__sib gx-reader__sib--prev" href={`#/gallery/${prev.slug}`}>
            <span className="gx-reader__dir">← 上一篇</span>
            <span className="gx-reader__sibtitle">{prev.title}</span>
          </a>
        ) : (
          <span />
        )}
        {next ? (
          <a className="gx-reader__sib gx-reader__sib--next" href={`#/gallery/${next.slug}`}>
            <span className="gx-reader__dir">下一篇 →</span>
            <span className="gx-reader__sibtitle">{next.title}</span>
          </a>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
