import { useState, type ReactNode } from "react";
import {
  Article,
  Hero,
  Lead,
  Section,
  Aside,
  Table,
  Formula,
  CodeBlock,
  Conclusion,
  Raw,
} from "reacticle";

/*
 * A `tufte` data-ink long read on caffeine pharmacokinetics. Prose carries the
 * argument; a Formula, two Tables and a CodeBlock appear only where the content
 * genuinely is that structure. Every Raw block below is hand-drawn for the one
 * paragraph it sits beside — a hairline decay curve, an interactive bedtime
 * calculator, a row of thin dose bars, a half-life lollipop chart — never a
 * shared widget, and every colour / font / space is pulled from --ra-* tokens
 * so it stays Data-Ink and switches with the theme.
 */

/* ---- bespoke Raw pieces for this essay, used nowhere else ---- */

/** §opening — one dose decaying, with the half-life ticks marked. */
function DecayCurve() {
  const w = 360;
  const h = 150;
  const ml = 30;
  const mr = 40;
  const mt = 14;
  const mb = 24;
  const plotW = w - ml - mr;
  const plotH = h - mt - mb;
  const maxHL = 4; // show 0 … 4 half-lives
  const X = (k: number) => ml + (k / maxHL) * plotW;
  const Y = (frac: number) => mt + (1 - frac) * plotH;
  const pts: string[] = [];
  for (let k = 0; k <= maxHL; k += 0.05) {
    pts.push(`${X(k).toFixed(1)},${Y(Math.pow(0.5, k)).toFixed(1)}`);
  }
  const marks = [
    { k: 1, label: "50%" },
    { k: 2, label: "25%" },
    { k: 3, label: "12.5%" },
  ];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: "block" }} role="img" aria-label="一份剂量随半衰期衰减的曲线">
      {/* axes — hairline only */}
      <line x1={ml} y1={mt} x2={ml} y2={mt + plotH} stroke="var(--ra-color-border-strong)" strokeWidth="1" />
      <line x1={ml} y1={mt + plotH} x2={ml + plotW} y2={mt + plotH} stroke="var(--ra-color-border-strong)" strokeWidth="1" />
      {/* half-life guide lines */}
      {marks.map((m) => (
        <g key={m.k}>
          <line x1={ml} y1={Y(Math.pow(0.5, m.k))} x2={X(m.k)} y2={Y(Math.pow(0.5, m.k))} stroke="var(--ra-color-border)" strokeDasharray="2 3" />
          <line x1={X(m.k)} y1={Y(Math.pow(0.5, m.k))} x2={X(m.k)} y2={mt + plotH} stroke="var(--ra-color-border)" strokeDasharray="2 3" />
          <circle cx={X(m.k)} cy={Y(Math.pow(0.5, m.k))} r={2.6} fill="var(--ra-color-accent)" />
          <text x={X(m.k) + 4} y={Y(Math.pow(0.5, m.k)) - 5} style={{ fontFamily: "var(--ra-font-mono)", fontSize: "10px", fill: "var(--ra-color-muted)" }}>{m.label}</text>
        </g>
      ))}
      <polyline points={pts.join(" ")} fill="none" stroke="var(--ra-color-accent)" strokeWidth="1.6" />
      {/* x labels in half-lives */}
      {[0, 1, 2, 3, 4].map((k) => (
        <text key={k} x={X(k)} y={mt + plotH + 14} textAnchor="middle" style={{ fontFamily: "var(--ra-font-mono)", fontSize: "10px", fill: "var(--ra-color-faint)" }}>
          {k === 0 ? "0" : `${k}×t½`}
        </text>
      ))}
      <text x={ml - 6} y={Y(1) + 3} textAnchor="end" style={{ fontFamily: "var(--ra-font-mono)", fontSize: "10px", fill: "var(--ra-color-faint)" }}>100%</text>
    </svg>
  );
}

/** §to-bed — the interactive core: residual caffeine at an 11pm bedtime. */
function ResidualCalculator() {
  const [dose, setDose] = useState(200);
  const [intake, setIntake] = useState(15); // hour of day
  const [halfLife, setHalfLife] = useState(5);
  const BED = 23; // 23:00 fixed bedtime

  const elapsed = BED - intake;
  const residual = dose * Math.pow(0.5, elapsed / halfLife);
  const pct = Math.round((residual / dose) * 100);

  // chart geometry
  const w = 360;
  const h = 170;
  const ml = 34;
  const mr = 12;
  const mt = 14;
  const mb = 28;
  const plotW = w - ml - mr;
  const plotH = h - mt - mb;
  const H0 = 6;
  const H1 = 27; // 6:00 → 3:00 next day
  const X = (hr: number) => ml + ((hr - H0) / (H1 - H0)) * plotW;
  const Y = (v: number) => mt + (1 - v / dose) * plotH;

  const pts: string[] = [];
  for (let hr = intake; hr <= H1; hr += 0.2) {
    pts.push(`${X(hr).toFixed(1)},${Y(dose * Math.pow(0.5, (hr - intake) / halfLife)).toFixed(1)}`);
  }
  const hourLabel = (hr: number) => `${((hr % 24) + 24) % 24}:00`.replace(/^(\d):/, "0$1:");

  const ctrl = (label: string, value: string, node: ReactNode) => (
    <label style={{ display: "grid", gridTemplateColumns: "5.5rem 1fr 3.5rem", alignItems: "center", gap: "var(--ra-space-3)", fontFamily: "var(--ra-font-label)", fontSize: "var(--ra-text-sm)", color: "var(--ra-color-muted)" }}>
      <span>{label}</span>
      {node}
      <span style={{ fontFamily: "var(--ra-font-mono)", color: "var(--ra-color-text)", textAlign: "right" }}>{value}</span>
    </label>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--ra-space-3)" }}>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: "block" }} role="img" aria-label="睡前体内残留咖啡因曲线">
        {/* the 6-hour-before-bed window (evidence-based sensitivity band) */}
        <rect x={X(17)} y={mt} width={X(BED) - X(17)} height={plotH} fill="var(--ra-color-accent-soft)" />
        <text x={(X(17) + X(BED)) / 2} y={mt + 11} textAnchor="middle" style={{ fontFamily: "var(--ra-font-label)", fontSize: "9px", fill: "var(--ra-color-muted)" }}>睡前 6 小时</text>
        {/* axes */}
        <line x1={ml} y1={mt} x2={ml} y2={mt + plotH} stroke="var(--ra-color-border-strong)" />
        <line x1={ml} y1={mt + plotH} x2={ml + plotW} y2={mt + plotH} stroke="var(--ra-color-border-strong)" />
        {/* bedtime hairline */}
        <line x1={X(BED)} y1={mt} x2={X(BED)} y2={mt + plotH} stroke="var(--ra-color-risk)" strokeWidth="1" />
        <text x={X(BED)} y={mt - 3} textAnchor="middle" style={{ fontFamily: "var(--ra-font-label)", fontSize: "9px", fill: "var(--ra-color-risk)" }}>就寝 23:00</text>
        {/* decay curve */}
        <polyline points={pts.join(" ")} fill="none" stroke="var(--ra-color-accent)" strokeWidth="1.6" />
        {/* residual marker at bedtime */}
        <circle cx={X(BED)} cy={Y(residual)} r={3} fill="var(--ra-color-risk)" />
        <text x={X(BED) - 6} y={Y(residual) - 6} textAnchor="end" style={{ fontFamily: "var(--ra-font-mono)", fontSize: "11px", fill: "var(--ra-color-risk)" }}>
          {Math.round(residual)} mg
        </text>
        {/* x ticks */}
        {[6, 11, 16, 21, 26].map((hr) => (
          <text key={hr} x={X(hr)} y={mt + plotH + 14} textAnchor="middle" style={{ fontFamily: "var(--ra-font-mono)", fontSize: "9px", fill: "var(--ra-color-faint)" }}>
            {hourLabel(hr)}
          </text>
        ))}
        <text x={ml - 6} y={Y(dose) + 3} textAnchor="end" style={{ fontFamily: "var(--ra-font-mono)", fontSize: "9px", fill: "var(--ra-color-faint)" }}>{dose}</text>
      </svg>
      {ctrl("剂量", `${dose} mg`, (
        <input type="range" min={50} max={400} step={5} value={dose} onChange={(e) => setDose(+e.target.value)} style={{ accentColor: "var(--ra-color-accent)" }} />
      ))}
      {ctrl("饮用时间", hourLabel(intake), (
        <input type="range" min={6} max={22} step={1} value={intake} onChange={(e) => setIntake(+e.target.value)} style={{ accentColor: "var(--ra-color-accent)" }} />
      ))}
      {ctrl("你的半衰期", `${halfLife} h`, (
        <input type="range" min={3} max={9} step={0.5} value={halfLife} onChange={(e) => setHalfLife(+e.target.value)} style={{ accentColor: "var(--ra-color-accent)" }} />
      ))}
      <div style={{ borderTop: "1px solid var(--ra-color-border-strong)", paddingTop: "var(--ra-space-2)", fontFamily: "var(--ra-font-label)", fontSize: "var(--ra-text-sm)", color: "var(--ra-color-muted)" }}>
        就寝时仍有 <span style={{ fontFamily: "var(--ra-font-mono)", color: "var(--ra-color-risk)" }}>{Math.round(residual)} mg</span> 在体内，约为入口剂量的 <span style={{ fontFamily: "var(--ra-font-mono)", color: "var(--ra-color-text)" }}>{pct}%</span>
        {intake >= 17 ? "——而且这一杯正落在睡前 6 小时的敏感窗里。" : "。"}
      </div>
    </div>
  );
}

/** §a-cup — thin Data-Ink bars: caffeine per common serving. */
function DrinkBars() {
  const rows = [
    { name: "能量饮料（355 ml）", v: 80 },
    { name: "滴滤咖啡（240 ml）", v: 95 },
    { name: "浓缩咖啡（单份）", v: 63 },
    { name: "速溶咖啡（一杯）", v: 62 },
    { name: "红茶（240 ml）", v: 47 },
    { name: "可乐（330 ml）", v: 34 },
    { name: "绿茶（240 ml）", v: 28 },
    { name: "黑巧克力（30 g）", v: 12 },
  ];
  const max = 100;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--ra-space-2)" }}>
      {rows.map((r) => (
        <div key={r.name} style={{ display: "grid", gridTemplateColumns: "9.5rem 1fr 2.5rem", alignItems: "center", gap: "var(--ra-space-3)" }}>
          <span style={{ fontFamily: "var(--ra-font-label)", fontSize: "var(--ra-text-xs)", color: "var(--ra-color-muted)" }}>{r.name}</span>
          <span style={{ position: "relative", height: "8px" }}>
            <i style={{ position: "absolute", left: 0, top: "3px", width: "100%", height: "1px", background: "var(--ra-color-border)" }} />
            <i style={{ position: "absolute", left: 0, top: 0, height: "8px", width: `${(r.v / max) * 100}%`, background: "var(--ra-color-accent)" }} />
          </span>
          <span style={{ fontFamily: "var(--ra-font-mono)", fontSize: "var(--ra-text-xs)", color: "var(--ra-color-faint)", textAlign: "right" }}>{r.v}</span>
        </div>
      ))}
    </div>
  );
}

/** §everyone — a half-life lollipop chart across physiological conditions. */
function HalfLifeLollipop() {
  const rows = [
    { name: "重度吸烟者", v: 3.5 },
    { name: "健康成人（基线）", v: 5, base: true },
    { name: "口服避孕药", v: 10 },
    { name: "妊娠晚期", v: 15 },
  ];
  const w = 360;
  const rowH = 26;
  const ml = 112;
  const mr = 28;
  const max = 16;
  const X = (v: number) => ml + (v / max) * (w - ml - mr);
  return (
    <svg viewBox={`0 0 ${w} ${rows.length * rowH + 16}`} width="100%" style={{ display: "block" }} role="img" aria-label="不同人群的咖啡因半衰期">
      {[5, 10, 15].map((g) => (
        <g key={g}>
          <line x1={X(g)} y1={4} x2={X(g)} y2={rows.length * rowH + 2} stroke="var(--ra-color-border)" strokeDasharray="2 3" />
          <text x={X(g)} y={rows.length * rowH + 14} textAnchor="middle" style={{ fontFamily: "var(--ra-font-mono)", fontSize: "9px", fill: "var(--ra-color-faint)" }}>{g}h</text>
        </g>
      ))}
      {rows.map((r, i) => {
        const y = i * rowH + rowH / 2;
        const c = r.base ? "var(--ra-color-accent)" : "var(--ra-color-text)";
        return (
          <g key={r.name}>
            <text x={ml - 8} y={y + 3} textAnchor="end" style={{ fontFamily: "var(--ra-font-label)", fontSize: "11px", fill: r.base ? "var(--ra-color-accent)" : "var(--ra-color-muted)" }}>{r.name}</text>
            <line x1={ml} y1={y} x2={X(r.v)} y2={y} stroke={c} strokeWidth="1.4" />
            <circle cx={X(r.v)} cy={y} r={3.2} fill={c} />
            <text x={X(r.v) + 7} y={y + 3} style={{ fontFamily: "var(--ra-font-mono)", fontSize: "10px", fill: "var(--ra-color-muted)" }}>{r.v}h</text>
          </g>
        );
      })}
    </svg>
  );
}

const residualCode = `// 一阶消除：饮用 t 小时后，体内还剩多少咖啡因
function remaining(dose, hours, halfLife = 5) {
  return dose * Math.pow(0.5, hours / halfLife);
}

// 下午三点一杯 200 mg，到晚上十一点（8 小时后）：
remaining(200, 8);       // → 66   （mg，约为入口的三分之一）
remaining(200, 8, 10);   // → 115  （半衰期翻倍的人，剩得更多）
remaining(200, 8, 3.5);  // → 41   （代谢快的人，所剩有限）`;

/** tufte · 数据笔记 */
/**
 * Cover —— Tufte data-ink. Template C (上下分屏)：上半是发丝级指数衰减曲线 + 四个半衰
 * 期刻度（100/50/25/12.5%），下半是 serif 标题 + 横分割 + 小 kicker。整体只用
 * --ra-* token，零写死颜色 / 字号；内部全用 % / inset / grid，PDF 拉成整页不破。
 */
function CaffeineHalfLifeCover() {
  return (
    <section
      className="ra-cover"
      aria-label="封面 · 咖啡因与睡眠"
      data-ra-cover=""
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "min(100%, 48rem, calc((100vh - 8rem) * 3 / 4))",
        margin: "0 auto var(--ra-space-7, 3rem) auto",
        aspectRatio: "3 / 4",
        overflow: "hidden",
        background: "transparent",
        color: "var(--ra-color-heading)",
        border: "1px solid var(--ra-color-border)",
        isolation: "isolate",
      }}
    >
      {/* kicker — typewriter-ish 顶部 */}
      <div
        style={{
          position: "absolute",
          top: "var(--ra-space-5)",
          left: "var(--ra-space-6)",
          right: "var(--ra-space-6)",
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "var(--ra-font-mono)",
          fontSize: "var(--ra-text-xs)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--ra-color-muted)",
        }}
      >
        <span>DATA NOTE · No. 01</span>
        <span>2026 · t½</span>
      </div>

      {/* 上 55%：发丝级指数衰减曲线 */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "var(--ra-space-6)",
          right: "var(--ra-space-6)",
          height: "44%",
        }}
      >
        <svg viewBox="0 0 360 200" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="咖啡因指数衰减曲线">
          {/* axes — tufte hairlines */}
          <line x1="36" y1="170" x2="346" y2="170" stroke="var(--ra-color-border-strong)" strokeWidth="0.6" />
          <line x1="36" y1="20" x2="36" y2="170" stroke="var(--ra-color-border-strong)" strokeWidth="0.6" />
          {/* decay curve y = (1/2)^x, sampled */}
          <path
            d={(() => {
              const ml = 36, mr = 14, mt = 20, mb = 30;
              const w = 360 - ml - mr, h = 200 - mt - mb;
              const pts: string[] = [];
              for (let i = 0; i <= 96; i++) {
                const k = (i / 96) * 4;
                const x = ml + (k / 4) * w;
                const y = mt + (1 - Math.pow(0.5, k)) * h;
                pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
              }
              return pts.join(" ");
            })()}
            fill="none"
            stroke="var(--ra-color-accent)"
            strokeWidth="1.1"
          />
          {/* tick marks at 0, 1, 2, 3 half-lives with labels */}
          {[0, 1, 2, 3].map((k) => {
            const ml = 36, mr = 14, mt = 20, mb = 30;
            const w = 360 - ml - mr, h = 200 - mt - mb;
            const frac = Math.pow(0.5, k);
            const x = ml + (k / 4) * w;
            const y = mt + (1 - frac) * h;
            const pct = `${(frac * 100).toFixed(frac < 0.2 ? 1 : 0)}%`;
            return (
              <g key={k}>
                <circle cx={x} cy={y} r="2.2" fill="var(--ra-color-accent)" />
                <line x1={x} y1={y} x2={x} y2="170" stroke="var(--ra-color-border)" strokeDasharray="2 3" strokeWidth="0.6" />
                <text x={x + 6} y={y - 6} style={{ fontFamily: "var(--ra-font-mono)", fontSize: "10px", fill: "var(--ra-color-heading)" }}>{pct}</text>
                <text x={x} y="184" textAnchor="middle" style={{ fontFamily: "var(--ra-font-mono)", fontSize: "9px", fill: "var(--ra-color-muted)" }}>{k === 0 ? "0" : `${k}×t½`}</text>
              </g>
            );
          })}
          {/* y axis hairline label */}
          <text x="32" y="24" textAnchor="end" style={{ fontFamily: "var(--ra-font-mono)", fontSize: "9px", fill: "var(--ra-color-muted)" }}>剩余</text>
        </svg>
      </div>

      {/* 下 45%：标题 + 横线 + 副题 */}
      <div
        style={{
          position: "absolute",
          left: "var(--ra-space-6)",
          right: "var(--ra-space-6)",
          bottom: "var(--ra-space-6)",
          display: "grid",
          gap: "var(--ra-space-3)",
        }}
      >
        <div style={{ height: "1px", background: "var(--ra-color-accent)", width: "32%" }} />
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--ra-font-heading)",
            fontWeight: "var(--ra-weight-h2)",
            fontSize: "clamp(1.75rem, 6.2vw, 2.6rem)",
            lineHeight: 1.08,
            color: "var(--ra-color-heading)",
            letterSpacing: "var(--ra-tracking-tight)",
          }}
        >
          咖啡因与睡眠
        </h1>
        <p
          style={{
            margin: 0,
            fontFamily: "var(--ra-font-body)",
            fontSize: "var(--ra-text-base)",
            lineHeight: 1.45,
            color: "var(--ra-color-muted)",
            maxWidth: "32rem",
          }}
        >
          一份关于半衰期的笔记 —— 一杯下午的咖啡，深夜还剩多少？
        </p>
      </div>
    </section>
  );
}

export function CaffeineHalfLife() {
  return (
    <>
      <CaffeineHalfLifeCover />
      <Article toc width="wide">
      <Hero
        eyebrow="数据笔记 · 药代动力学"
        title="咖啡因与睡眠：一份关于半衰期的笔记"
        subtitle="一杯下午的咖啡，为什么深夜还在影响你——答案藏在一个叫半衰期的数字里"
        meta={[
          { label: "作者", value: "ReActicle 编辑部" },
          { label: "日期", value: "2026-06-08" },
          { label: "篇幅", value: "约 12 分钟" },
        ]}
      />

      <Raw title="一份剂量随时间的衰减——横轴以半衰期计">
        <DecayCurve />
      </Raw>

      <Lead>
        你大概有过这样的夜晚：明明很累，躺下却毫无睡意。如果那天下午喝过一杯咖啡，凶手很可能就是它。
        咖啡因不会在喝完那一刻就消失，它在体内的退场遵循一条平滑而固执的曲线。读懂这条曲线，只需要一个量：
        半衰期。这份笔记用几张图、一道公式和一小段代码，把它讲清楚。
      </Lead>

      <Section index="01" title="咖啡因去了哪里">
        <p>
          咖啡因进入血液后，主要由肝脏里的酶逐步代谢掉。它的清除遵循一阶动力学——通俗地说，单位时间内被清掉的
          不是固定的毫克数，而是固定的比例。于是无论你喝了多少，每过一个半衰期，体内的量就减半：从 100% 到 50%，
          再到 25%，再到 12.5%，像上面那条曲线一样，越来越慢地趋近于零，却始终留着一点尾巴。
        </p>
        <p>
          对大多数健康成年人，咖啡因的半衰期约为 5 小时（个体差异很大，常见区间是 3 到 7 小时）。把它写成公式，
          就是一条标准的指数衰减——下面这道是这份笔记唯一需要的数学，块级排出来，方便你随时回看：
        </p>
        <Formula
          block
          tex="C(t) = C_0 \left(\tfrac{1}{2}\right)^{\,t / t_{1/2}} = C_0\, e^{-k t}, \qquad k = \dfrac{\ln 2}{t_{1/2}}"
          caption="C₀ 是入口剂量，t 是经过的小时数，t½ 是半衰期；两种写法等价。"
        />
        <p>
          公式里没有任何玄机：把时间 <code>t</code> 除以半衰期 <code>t½</code>，得到的就是"过了几个半衰期"，
          再让初始剂量按这个次数对折。半衰期越长，对折得越慢，尾巴拖得越久。这也解释了为什么"我下午只喝了一杯"
          常常不足以让人安心——一杯的绝对量不小，而对折需要时间。
        </p>
        <Aside tone="principle" label="一句话的核心">
          关键从来不是"喝了多少"，而是"到睡觉时还剩多少"。前者是入口剂量，后者由半衰期和时间共同决定。
        </Aside>
      </Section>

      <Section index="02" title="一杯，到底有多少">
        <p>
          要谈"还剩多少"，得先知道"进来多少"。日常饮品的咖啡因含量差得很远，且常被低估：一杯滴滤咖啡轻松接近
          100 mg，而一份浓缩反而更少；茶并不像传说中那样温和；连黑巧克力也带着可观的一点。下面这张表是一处真正
          适合用表格的地方——二维、可对照、数字对齐：
        </p>
        <Table
          caption="常见饮品的咖啡因含量（典型值，单位 mg）"
          source="数据为常见膳食参考的近似值，实际因品牌、冲泡与杯量而异。"
          columns={[
            { key: "drink", label: "饮品 / 份量", width: "16rem" },
            { key: "mg", label: "咖啡因", align: "right" },
            { key: "note", label: "说明" },
          ]}
          rows={[
            { drink: "滴滤咖啡（240 ml）", mg: "95", note: "最常见的那一杯" },
            { drink: "浓缩咖啡（单份）", mg: "63", note: "量小但浓" },
            { drink: "速溶咖啡（一杯）", mg: "62", note: "与浓缩相近" },
            { drink: "能量饮料（355 ml）", mg: "80", note: "常另加糖与牛磺酸" },
            { drink: "红茶（240 ml）", mg: "47", note: "比想象中高" },
            { drink: "绿茶（240 ml）", mg: "28", note: "较温和" },
            { drink: "可乐（330 ml）", mg: "34", note: "一听" },
            { drink: "黑巧克力（30 g）", mg: "12", note: "睡前零食也算数" },
          ]}
        />
        <p>
          同样的数字，画成长短一目了然的细条会更直观。下面这排 bar 由 Raw 现画，只用一条发丝基线加一段主色，
          没有填色块、没有图标——这正是 Data-Ink 的取舍：每一滴墨水都在承载信息。
        </p>
        <Raw title="每份饮品的咖啡因（越长越多）">
          <DrinkBars />
        </Raw>
      </Section>

      <Section index="03" title="把它画到睡前">
        <p>
          现在把入口剂量和半衰期合起来，看真正要紧的那一刻：你躺下的时候。研究反复指出，临近睡眠的咖啡因会显著
          推迟入睡、压缩深睡——有一项常被引用的实验发现，即便在睡前 6 小时摄入，也足以让当晚总睡眠时间减少一个
          多小时。所以下面这张图标出了一条"睡前 6 小时"的敏感窗，并把就寝固定在 23:00。
        </p>
        <p>
          这块 Raw 是可交互的：拖动三个滑块——剂量、饮用时间、你自己的半衰期——曲线会实时重算，并在就寝那条
          竖线上标出此刻体内仍残留多少。试着把"下午三点一杯"往后挪两小时，看尾巴怎么抬高：
        </p>
        <Raw title="拖动滑块，看就寝时还剩多少">
          <ResidualCalculator />
        </Raw>
        <p>
          默认那组数字值得记住：下午三点 200 mg，半衰期 5 小时，到晚上十一点经过了 8 小时，也就是 1.6 个半衰期，
          体内仍有约 66 mg——相当于又喝了大半杯咖啡躺下。把饮用时间提前到中午，残留会明显回落；而如果你恰好是
          代谢慢的人，同样一杯能让你在床上多清醒很久。
        </p>
      </Section>

      <Section index="04" title="为什么每个人不一样">
        <p>
          半衰期不是一个对所有人成立的常数。它取决于肝脏代谢咖啡因的那条通路（主要是 CYP1A2 酶）的活跃程度，
          而这条通路受基因、生活习惯和生理状态显著影响。同样一杯咖啡，落在不同的人身上，退场速度可以差出好几倍。
        </p>
        <p>
          下面这张图把几种典型情况排在同一根时间轴上对比——基线用主色标出，其余用墨色。差距一眼可见：吸烟会
          加速代谢、把半衰期压到 3 到 4 小时；而口服避孕药会抑制那条酶，让半衰期翻倍；妊娠晚期更可达 15 小时
          上下。它们用的不是装饰色，而是同一套数据墨水：
        </p>
        <Raw title="不同人群的咖啡因半衰期（基线为主色）">
          <HalfLifeLollipop />
        </Raw>
        <p>
          这些只是均值附近的代表值，真实的你还会落在自己的位置上。极端的例子是新生儿——肝脏尚未发育成熟，
          半衰期可长达 80 小时以上，这也是为什么哺乳期摄入需要格外谨慎。换句话说，"一杯咖啡撑多久"这个问题，
          答案高度因人而异，而知道自己大概偏快还是偏慢，比记住任何一个平均值都有用。
        </p>
        <Aside tone="note" label="提醒">
          这份笔记讨论的是普遍的药代动力学规律，不是医疗建议。对咖啡因敏感、孕期或正在服药，请以医生意见为准。
        </Aside>
      </Section>

      <Section index="05" title="把它算清楚，只要三行">
        <p>
          这条曲线最让人安心的一点是：它完全可以预测。既然清除遵循固定的对折规律，那么"几小时后还剩多少"就是
          一行算式。把上面那道公式翻译成代码，核心只有一句，剩下都是举例：
        </p>
        <CodeBlock
          language="javascript"
          title="residual-caffeine.js"
          code={residualCode}
        />
        <p>
          注意第二、三个例子：同样是下午三点的 200 mg，到就寝时，半衰期 10 小时的人还剩 115 mg、半衰期 3.5 小时
          的人只剩 41 mg。同一杯咖啡，因人而异地变成了"几乎没睡"和"基本无碍"两种夜晚。这正是把半衰期当成个人
          参数、而不是统一常数的意义。
        </p>
      </Section>

      <Conclusion
        takeaways={[
          "咖啡因按固定比例衰减，每过一个半衰期减半；普通成人约 5 小时。",
          "真正决定睡眠的是就寝时的残留量，而非入口剂量。",
          "半衰期因人而异（吸烟、避孕药、妊娠、基因），先了解自己偏快还是偏慢。",
        ]}
      >
        一杯下午的咖啡，本质上是一个关于今晚的决定。你不必戒掉它，只需要把那条衰减曲线放进脑子里：算一算到睡觉时
        还剩多少，再决定这一杯什么时候喝、要不要喝。数字不会替你失眠，但它能让你少一点意外。
      </Conclusion>
      <Raw title="">
        <footer
          style={{
            marginTop: "var(--ra-space-7, 3rem)",
            paddingTop: "var(--ra-space-4, 1rem)",
            borderTop: "1px solid var(--ra-color-border, currentColor)",
            color: "var(--ra-color-muted, inherit)",
            fontSize: "var(--ra-text-xs, 0.78rem)",
            textAlign: "center",
            letterSpacing: "0.02em",
            opacity: 0.85,
          }}
        >
          Made with{" "}
          <a
            href="https://github.com/ConardLi/garden-skills"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "inherit",
              textDecoration: "underline",
              textUnderlineOffset: "0.2em",
            }}
          >
            beautiful-article
          </a>{" "}
          · tufte theme
        </footer>
      </Raw>
    </Article>
    </>
  );
}
