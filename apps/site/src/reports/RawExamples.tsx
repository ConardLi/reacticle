import { useState } from "react";
import "./raw-examples.css";

/**
 * Small, single-purpose pieces used as <Raw> examples in the docs. Each one
 * isolates a single capability — state, SVG, animation, custom layout — so the
 * Raw component page can show, not just tell, what the free layer can do.
 */

/** Interactive state: a live +/- counter. */
export function LiveCounter() {
  const [n, setN] = useState(3);
  return (
    <div className="rx rx-counter">
      <button onClick={() => setN((v) => Math.max(0, v - 1))} aria-label="减一">
        −
      </button>
      <span className="rx-counter__num">{n}</span>
      <button onClick={() => setN((v) => v + 1)} aria-label="加一">
        +
      </button>
      <span className="rx-counter__label">这是 Raw 里真正运行的 React 状态</span>
    </div>
  );
}

/** Interactive SVG: a progress ring driven by a slider. */
export function ProgressGauge() {
  const [v, setV] = useState(64);
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <div className="rx rx-gauge">
      <svg width="120" height="120" viewBox="0 0 120 120" role="img" aria-label={`进度 ${v}%`}>
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--ra-color-border)" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="var(--ra-color-accent)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v / 100)}
          transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dashoffset 0.35s ease" }}
        />
        <text
          x="60"
          y="67"
          textAnchor="middle"
          fontSize="22"
          fill="var(--ra-color-heading)"
          fontFamily="var(--ra-font-label)"
        >
          {v}%
        </text>
      </svg>
      <input
        type="range"
        min={0}
        max={100}
        value={v}
        onChange={(e) => setV(Number(e.target.value))}
        aria-label="进度"
      />
    </div>
  );
}

/** A hand-built inline-SVG sparkline. */
export function Sparkline() {
  const data = [4, 9, 6, 12, 8, 15, 11, 18, 14, 22];
  const w = 260;
  const h = 60;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data.map(
    (d, i) => `${(i / (data.length - 1)) * w},${h - ((d - min) / (max - min)) * (h - 8) - 4}`
  );
  const last = pts[pts.length - 1]!.split(",");
  return (
    <svg className="rx" width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="img" aria-label="趋势">
      <polyline
        fill="none"
        stroke="var(--ra-color-accent)"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={pts.join(" ")}
      />
      <circle cx={last[0]} cy={last[1]} r="3.5" fill="var(--ra-color-accent)" />
    </svg>
  );
}

/** Pure-CSS animation: three orbiting dots. */
export function OrbitLoader() {
  return (
    <div className="rx rx-orbit-wrap">
      <span className="rx-orbit" aria-label="加载中">
        <span />
        <span />
        <span />
      </span>
      <span className="rx-orbit__label">纯 CSS 关键帧动画</span>
    </div>
  );
}
