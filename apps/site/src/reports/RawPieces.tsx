import { useEffect, useState } from "react";
import "./raw-pieces.css";

/**
 * Creative pieces meant to be dropped inside <Raw>. They use state, animation,
 * SVG and custom layout — exactly the things semantic components (and Markdown)
 * don't do — while reading --ra-* tokens so they match the active theme.
 */

/** A live slider estimating the token cost of raw HTML vs ReActicle. */
export function TokenEconomics() {
  const [sections, setSections] = useState(5);
  const rawHtml = sections * 920;
  const reacticle = sections * 170;
  const saved = Math.round((1 - reacticle / rawHtml) * 100);
  return (
    <div className="rp rp-card">
      <div className="rp-card__head">
        <span className="rp-eyebrow">交互 · 拖动估算</span>
        <span className="rp-card__title">Token 经济学</span>
      </div>
      <label className="rp-slider">
        <span>报告规模：{sections} 个章节</span>
        <input
          type="range"
          min={1}
          max={10}
          value={sections}
          onChange={(e) => setSections(Number(e.target.value))}
          aria-label="报告章节数"
        />
      </label>
      <div className="rp-bars">
        <div className="rp-bar">
          <span>裸 HTML</span>
          <span className="rp-bar__track">
            <span className="rp-bar__fill rp-bar__fill--risk" style={{ width: "100%" }} />
          </span>
          <span className="rp-bar__num">{rawHtml.toLocaleString()}</span>
        </div>
        <div className="rp-bar">
          <span>ReActicle</span>
          <span className="rp-bar__track">
            <span
              className="rp-bar__fill rp-bar__fill--accent"
              style={{ width: `${(reacticle / rawHtml) * 100}%` }}
            />
          </span>
          <span className="rp-bar__num">{reacticle.toLocaleString()}</span>
        </div>
      </div>
      <div className="rp-result">
        同一份报告，约节省 <strong>{saved}%</strong> 的输出 token。
      </div>
    </div>
  );
}

interface DensityRow {
  metric: string;
  md: number;
  html: number;
  ra: number;
}

const DENSITY: DensityRow[] = [
  { metric: "信息密度", md: 32, html: 86, ra: 92 },
  { metric: "可交互", md: 6, html: 78, ra: 90 },
  { metric: "稳定性", md: 90, html: 34, ra: 96 },
  { metric: "可审阅", md: 55, html: 40, ra: 94 },
];

/** Grouped bars that grow from zero on mount, with hover read-outs. */
export function DensityChart() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 80);
    return () => clearTimeout(t);
  }, []);
  const series: { key: keyof DensityRow; color: string; label: string }[] = [
    { key: "md", color: "var(--ra-color-faint)", label: "Markdown" },
    { key: "html", color: "var(--ra-color-risk)", label: "裸 HTML" },
    { key: "ra", color: "var(--ra-color-accent)", label: "ReActicle" },
  ];
  return (
    <div className="rp rp-density">
      <div className="rp-density__plot">
        {DENSITY.map((row) => (
          <div className="rp-density__group" key={row.metric}>
            {series.map((s) => {
              const v = row[s.key] as number;
              return (
                <span
                  key={s.key}
                  className="rp-density__bar"
                  data-v={v}
                  style={{
                    background: s.color,
                    height: shown ? `${v}%` : 0,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="rp-density__labels">
        {DENSITY.map((row) => (
          <span className="rp-density__label" key={row.metric}>
            {row.metric}
          </span>
        ))}
      </div>
      <div className="rp-legend">
        {series.map((s) => (
          <span key={s.key}>
            <i style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/** The authoring pipeline as nodes with a pulse travelling along the wire. */
export function GenerationPipeline() {
  const nodes = ["上下文", "语义组件", "Vite 构建", "单页 HTML", "人类审阅"];
  return (
    <div className="rp rp-pipe">
      <span className="rp-pipe__line" />
      <span className="rp-pipe__pulse" />
      {nodes.map((n) => (
        <span className="rp-pipe__node" key={n}>
          <span className="rp-pipe__dot" />
          <span className="rp-pipe__name">{n}</span>
        </span>
      ))}
    </div>
  );
}

const TOKENS = [
  "--ra-color-accent",
  "--ra-color-accent-strong",
  "--ra-color-heading",
  "--ra-color-risk",
  "--ra-color-success",
  "--ra-color-muted",
];

/** Live swatches of the active theme's tokens — changes when the theme does. */
export function ThemeTokens() {
  return (
    <div className="rp rp-tokens">
      {TOKENS.map((t) => (
        <div className="rp-token" key={t}>
          <span className="rp-token__chip" style={{ background: `var(${t})` }} />
          <code>{t.replace("--ra-color-", "")}</code>
        </div>
      ))}
    </div>
  );
}

/** A headline whose letters rise into place on load. */
export function KineticHeadline({ text }: { text: string }) {
  return (
    <div className="rp rp-kinetic" aria-label={text}>
      {[...text].map((ch, i) => (
        <span key={i} style={{ animationDelay: `${i * 0.05}s` }} aria-hidden>
          {ch}
        </span>
      ))}
    </div>
  );
}

/** A paragraph with an oversized, gently shimmering drop cap. */
export function DropCap({ cap, children }: { cap: string; children: string }) {
  return (
    <p className="rp rp-dropcap">
      <span className="rp-dropcap__cap">{cap}</span>
      {children}
    </p>
  );
}

interface Tile {
  n: string;
  k: string;
  d: string;
}

/** A grid of feature tiles that lift on hover. */
export function FeatureGrid({ tiles }: { tiles: Tile[] }) {
  return (
    <div className="rp rp-grid">
      {tiles.map((t) => (
        <div className="rp-tile" key={t.k}>
          <span className="rp-tile__n">{t.n}</span>
          <span className="rp-tile__k">{t.k}</span>
          <span className="rp-tile__d">{t.d}</span>
        </div>
      ))}
    </div>
  );
}

/** Drifting chips of component names. */
export function ComponentCloud({ names }: { names: string[] }) {
  return (
    <div className="rp rp-cloud">
      {names.map((n, i) => (
        <span className="rp-chip" key={n} style={{ animationDelay: `${i * 0.15}s` }}>
          {n}
        </span>
      ))}
    </div>
  );
}
