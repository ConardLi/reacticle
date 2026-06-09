import { useState, type ReactNode } from "react";
import {
  Article,
  Hero,
  Lead,
  Section,
  Subsection,
  Aside,
  Table,
  CodeBlock,
  Tabs,
  Detail,
  Conclusion,
  Raw,
} from "reacticle";

/*
 * A `vignelli` Swiss-grotesque foundations spec for a fictional design system
 * ("Orbit"). The body is a systematic document: prose states the rules, Tables
 * carry the token contracts, Tabs and a Detail hold per-platform usage. Every
 * Raw block is a specimen drawn on a strict grid — an 8pt spacing scale, a type
 * ramp, an interactive responsive-column demo, a component state matrix — in
 * --ra-* tokens so it stays cool, neutral and grid-true, and switches with the
 * theme. Hierarchy is built from size and rules, never from heavy weight.
 */

/* ---- bespoke Raw specimens for this spec, used nowhere else ---- */

/** §grid — the 8pt spacing scale as stacked, labelled blocks. */
function SpacingScale() {
  const steps = [
    { name: "space-1", px: 4 },
    { name: "space-2", px: 8 },
    { name: "space-3", px: 12 },
    { name: "space-4", px: 16 },
    { name: "space-5", px: 24 },
    { name: "space-6", px: 32 },
    { name: "space-7", px: 48 },
    { name: "space-8", px: 64 },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--ra-space-2)" }}>
      {steps.map((s) => (
        <div key={s.name} style={{ display: "grid", gridTemplateColumns: "7rem 1fr 3rem", alignItems: "center", gap: "var(--ra-space-3)" }}>
          <span style={{ fontFamily: "var(--ra-font-mono)", fontSize: "var(--ra-text-xs)", color: "var(--ra-color-muted)" }}>{s.name}</span>
          <span style={{ height: "12px", display: "block" }}>
            <i style={{ display: "block", height: "12px", width: `${(s.px / 64) * 100}%`, background: "var(--ra-color-accent)" }} />
          </span>
          <span style={{ fontFamily: "var(--ra-font-mono)", fontSize: "var(--ra-text-xs)", color: "var(--ra-color-faint)", textAlign: "right" }}>{s.px}</span>
        </div>
      ))}
    </div>
  );
}

/** §type — the type ramp as a specimen, each line tagged with its token. */
function TypeRamp() {
  const ramp = [
    { name: "text-4xl", px: 50, sample: "Aa 标题" },
    { name: "text-3xl", px: 39, sample: "Aa 标题" },
    { name: "text-2xl", px: 30, sample: "Aa 小标题" },
    { name: "text-xl", px: 23, sample: "Aa 引导" },
    { name: "text-lg", px: 19, sample: "Aa 正文加大" },
    { name: "text-base", px: 17, sample: "Aa 正文" },
    { name: "text-sm", px: 13, sample: "Aa 辅助" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--ra-space-3)" }}>
      {ramp.map((r) => (
        <div key={r.name} style={{ display: "flex", alignItems: "baseline", gap: "var(--ra-space-4)", borderBottom: "1px solid var(--ra-color-border)", paddingBottom: "var(--ra-space-2)" }}>
          <span style={{ width: "5.5rem", flex: "none", fontFamily: "var(--ra-font-mono)", fontSize: "var(--ra-text-xs)", color: "var(--ra-color-muted)" }}>{r.name}</span>
          <span style={{ fontSize: `${r.px}px`, lineHeight: 1.05, color: "var(--ra-color-heading)", letterSpacing: "-0.01em" }}>{r.sample}</span>
          <span style={{ marginLeft: "auto", fontFamily: "var(--ra-font-mono)", fontSize: "var(--ra-text-xs)", color: "var(--ra-color-faint)" }}>{r.px}px</span>
        </div>
      ))}
    </div>
  );
}

/** §grid-12 — interactive: drag a width, watch the 12-col grid reflow. */
function ResponsiveColumns() {
  const [width, setWidth] = useState(1280);
  const bp = width < 600 ? { name: "sm", cols: 4 } : width < 1024 ? { name: "md", cols: 8 } : { name: "lg", cols: 12 };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--ra-space-3)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--ra-space-3)", fontFamily: "var(--ra-font-mono)", fontSize: "var(--ra-text-sm)", color: "var(--ra-color-muted)" }}>
        <span>视口</span>
        <input type="range" min={360} max={1440} step={10} value={width} onChange={(e) => setWidth(+e.target.value)} style={{ flex: 1, accentColor: "var(--ra-color-accent)" }} />
        <span style={{ width: "8rem", textAlign: "right", color: "var(--ra-color-text)" }}>{width}px · {bp.name} / {bp.cols}列</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${bp.cols}, 1fr)`, gap: "6px", border: "1px solid var(--ra-color-border-strong)", padding: "8px" }}>
        {Array.from({ length: bp.cols }).map((_, i) => (
          <span key={i} style={{ height: "40px", background: "var(--ra-color-surface-2)", borderTop: `2px solid var(--ra-color-accent)` }} aria-hidden="true" />
        ))}
      </div>
      <p style={{ margin: 0, fontFamily: "var(--ra-font-label)", fontSize: "var(--ra-text-sm)", color: "var(--ra-color-muted)" }}>
        同一套内容，在 sm / md / lg 三个断点下分别落在 4 / 8 / 12 栏的网格上。栏数变化，栏宽与间距由网格统一推导，绝不手调。
      </p>
    </div>
  );
}

/** §states — a component state matrix, variants × states, on a strict grid. */
function StateMatrix() {
  const variants = ["主要", "次要", "幽灵"];
  const states = ["默认", "悬停", "按下", "禁用"];
  const cell = (variant: string, state: string): ReactNode => {
    const disabled = state === "禁用";
    const isPrimary = variant === "主要";
    const isGhost = variant === "幽灵";
    const bg = disabled
      ? "var(--ra-color-surface-2)"
      : isPrimary
        ? state === "悬停" || state === "按下"
          ? "var(--ra-color-accent-strong)"
          : "var(--ra-color-accent)"
        : "transparent";
    const fg = disabled
      ? "var(--ra-color-faint)"
      : isPrimary
        ? "var(--ra-color-accent-contrast)"
        : "var(--ra-color-text)";
    const border = isGhost && state === "默认" ? "transparent" : disabled ? "var(--ra-color-border)" : isPrimary ? "transparent" : "var(--ra-color-border-strong)";
    return (
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: "30px", padding: "0 10px", background: bg, color: fg, border: `1px solid ${border}`, fontFamily: "var(--ra-font-label)", fontSize: "var(--ra-text-sm)" }}>按钮</span>
    );
  };
  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: `5rem repeat(${states.length}, 1fr)`, gap: "8px", minWidth: "30rem" }}>
        <span aria-hidden="true" />
        {states.map((s) => (
          <span key={s} style={{ fontFamily: "var(--ra-font-mono)", fontSize: "var(--ra-text-xs)", color: "var(--ra-color-muted)", textAlign: "center" }}>{s}</span>
        ))}
        {variants.map((v) => (
          <Row key={v} v={v} states={states} cell={cell} />
        ))}
      </div>
    </div>
  );
}

function Row({ v, states, cell }: { v: string; states: string[]; cell: (v: string, s: string) => ReactNode }) {
  return (
    <>
      <span style={{ fontFamily: "var(--ra-font-mono)", fontSize: "var(--ra-text-xs)", color: "var(--ra-color-muted)", alignSelf: "center" }}>{v}</span>
      {states.map((s) => (
        <span key={s} style={{ display: "flex", justifyContent: "center" }}>{cell(v, s)}</span>
      ))}
    </>
  );
}

const cssTokens = `:root {
  --orbit-space-4: 16px;
  --orbit-color-accent: #d6201f;
  --orbit-text-base: 1.0625rem; /* 17px */
  --orbit-radius: 0;            /* Orbit 不用圆角 */
}`;

const iosTokens = `enum Orbit {
  static let space4: CGFloat = 16
  static let accent = UIColor(hex: 0xD6201F)
  static let textBase: CGFloat = 17
}`;

const androidTokens = `<resources>
  <dimen name="orbit_space_4">16dp</dimen>
  <color name="orbit_accent">#D6201F</color>
  <dimen name="orbit_text_base">17sp</dimen>
</resources>`;

/**
 * Cover —— vignelli Swiss-grotesque, Template D (满屏拼贴).
 *
 * The cover *is* the spec: instead of decorative blocks, the visual surface is
 * literally what the article contracts — a visible 12-column × 8-row Swiss
 * grid backbone, the actual --ra-space-* ladder rendered as rectangles on the
 * left, and the actual type ramp (H1 / H2 / H3 / Body, taken straight from the
 * theme tokens) on the right. A heavy red rule + ink hairline echo the Hero
 * top, a giant grotesque "Orbit" sits tight on a baseline rule in the lower
 * half, and a small accent square + 142-token caption anchor the system mark.
 * Pure --ra-* tokens, no fixed px positions; everything in % / grid / clamp so
 * PDF can stretch to a full page without breaking.
 */
function OrbitSpecCover() {
  const spacingSteps = [
    { token: "space-1", px: 4, w: 6 },
    { token: "space-2", px: 8, w: 12 },
    { token: "space-3", px: 12, w: 18 },
    { token: "space-4", px: 16, w: 25 },
    { token: "space-5", px: 24, w: 38 },
    { token: "space-6", px: 32, w: 50 },
    { token: "space-7", px: 48, w: 75 },
    { token: "space-8", px: 64, w: 100 },
  ];
  const typeRamp = [
    { token: "text-4xl", size: "var(--ra-text-4xl)", label: "H1" },
    { token: "text-2xl", size: "var(--ra-text-2xl)", label: "H2" },
    { token: "text-xl", size: "var(--ra-text-xl)", label: "H3" },
    { token: "text-base", size: "var(--ra-text-base)", label: "Body" },
  ];

  return (
    <section
      className="ra-cover"
      aria-label="封面 · Orbit 设计系统 · 基础规范"
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
      {/* L0 — 12 vertical column rules, the Swiss backbone, visible */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          opacity: 0.55,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            style={{
              borderRight:
                i === 11 ? "none" : "1px solid var(--ra-color-border)",
            }}
          />
        ))}
      </div>

      {/* L0b — 8 horizontal track rules (the 8pt stride, dashed so the
          column rules read as primary) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateRows: "repeat(8, 1fr)",
          opacity: 0.4,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            style={{
              borderBottom:
                i === 7 ? "none" : "1px dashed var(--ra-color-border)",
            }}
          />
        ))}
      </div>

      {/* L1 — top stripe: heavy red rule + ink hairline (echo of .ra-hero) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "0.55rem",
          background: "var(--ra-color-accent)",
          zIndex: 2,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "calc(0.55rem + 1px)",
          height: "1px",
          background: "var(--ra-color-heading)",
          zIndex: 2,
        }}
      />

      {/* L2 — top kicker row: spec id + theme caption */}
      <div
        style={{
          position: "absolute",
          left: "6%",
          right: "6%",
          top: "calc(0.55rem + var(--ra-space-3))",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          fontFamily: "var(--ra-font-mono)",
          fontSize: "var(--ra-text-xs)",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--ra-color-muted)",
          zIndex: 3,
        }}
      >
        <span>
          <span
            style={{
              color: "var(--ra-color-accent)",
              fontWeight: "var(--ra-weight-bold)",
            }}
          >
            R—02
          </span>
          <span style={{ marginLeft: "var(--ra-space-3)" }}>基础层契约</span>
        </span>
        <span>Vignelli · Swiss</span>
      </div>

      {/* L3 — left rail: the literal --ra-space-* ladder as black rectangles */}
      <div
        style={{
          position: "absolute",
          left: "6%",
          top: "13%",
          width: "38%",
          display: "grid",
          gap: "var(--ra-space-2)",
          zIndex: 3,
        }}
      >
        <div
          style={{
            fontFamily: "var(--ra-font-mono)",
            fontSize: "var(--ra-text-xs)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--ra-color-heading)",
            fontWeight: "var(--ra-weight-bold)",
            borderBottom: "1px solid var(--ra-color-heading)",
            paddingBottom: "var(--ra-space-1)",
          }}
        >
          §01 · 8pt 阶梯
        </div>
        {spacingSteps.map((s) => (
          <div
            key={s.token}
            style={{
              display: "grid",
              gridTemplateColumns: "2.4rem 1fr",
              alignItems: "center",
              gap: "var(--ra-space-2)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--ra-font-mono)",
                fontSize: "var(--ra-text-xs)",
                color: "var(--ra-color-muted)",
                textAlign: "right",
              }}
            >
              {s.px}
            </span>
            <span style={{ display: "block", height: "5px", position: "relative" }}>
              <i
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${s.w}%`,
                  background: "var(--ra-color-heading)",
                }}
              />
            </span>
          </div>
        ))}
      </div>

      {/* L4 — right rail: the literal type ramp, real Aa specimens at token sizes */}
      <div
        style={{
          position: "absolute",
          right: "6%",
          top: "13%",
          width: "44%",
          display: "grid",
          gap: "var(--ra-space-3)",
          zIndex: 3,
          textAlign: "right",
        }}
      >
        <div
          style={{
            fontFamily: "var(--ra-font-mono)",
            fontSize: "var(--ra-text-xs)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--ra-color-heading)",
            fontWeight: "var(--ra-weight-bold)",
            borderBottom: "1px solid var(--ra-color-heading)",
            paddingBottom: "var(--ra-space-1)",
          }}
        >
          §02 · 字号阶梯
        </div>
        {typeRamp.map((t) => (
          <div
            key={t.token}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "baseline",
              gap: "var(--ra-space-3)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--ra-font-mono)",
                fontSize: "var(--ra-text-xs)",
                color: "var(--ra-color-muted)",
                whiteSpace: "nowrap",
                letterSpacing: "0.06em",
              }}
            >
              {t.label} · {t.token}
            </span>
            <span
              style={{
                fontFamily: "var(--ra-font-heading)",
                fontWeight: "var(--ra-weight-bold)",
                fontSize: t.size,
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
                color: "var(--ra-color-heading)",
              }}
            >
              Aa
            </span>
          </div>
        ))}
      </div>

      {/* L5 — center wordmark "Orbit", giant grotesque, tight, lower half */}
      <div
        style={{
          position: "absolute",
          left: "6%",
          right: "6%",
          bottom: "21%",
          display: "grid",
          gap: "var(--ra-space-3)",
          zIndex: 4,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--ra-font-heading)",
            fontWeight: "var(--ra-weight-display, 800)",
            fontSize: "clamp(3rem, 18vw, 9rem)",
            lineHeight: 0.82,
            letterSpacing: "-0.045em",
            textTransform: "uppercase",
            color: "var(--ra-color-heading)",
          }}
        >
          Orbit
        </h1>
        <div
          aria-hidden="true"
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            alignItems: "center",
            gap: "var(--ra-space-3)",
          }}
        >
          <span
            style={{
              width: "0.7rem",
              height: "0.7rem",
              background: "var(--ra-color-accent)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              height: "1px",
              background: "var(--ra-color-heading)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--ra-font-mono)",
              fontSize: "var(--ra-text-xs)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--ra-color-muted)",
            }}
          >
            142 tokens · 1 ramp
          </span>
        </div>
      </div>

      {/* L6 — bottom gutter: subject band on a heavy black rule */}
      <div
        style={{
          position: "absolute",
          left: "6%",
          right: "6%",
          bottom: "var(--ra-space-5)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: "var(--ra-space-4)",
          paddingTop: "var(--ra-space-3)",
          borderTop: "2px solid var(--ra-color-heading)",
          zIndex: 3,
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "var(--ra-font-body)",
            fontSize: "var(--ra-text-sm)",
            fontWeight: "var(--ra-weight-bold, 700)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--ra-color-heading)",
          }}
        >
          网格 · 间距 · 字号 · 色彩 · 状态
        </p>
        <span
          style={{
            fontFamily: "var(--ra-font-mono)",
            fontSize: "var(--ra-text-xs)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--ra-color-muted)",
            whiteSpace: "nowrap",
          }}
        >
          v2.0 · Stable
        </span>
      </div>
    </section>
  );
}

/** vignelli · 规格 */
export function OrbitSpec() {
  return (
    <>
      <OrbitSpecCover />
      <Article toc width="wide">
      <Hero
        eyebrow="规格 · 设计系统"
        title="Orbit 设计系统 · 基础规范"
        subtitle="间距、字号、色彩、栅格与组件状态——一套以网格为唯一真理的基础层契约"
        meta={[
          { label: "版本", value: "v2.0" },
          { label: "状态", value: "Stable" },
          { label: "维护", value: "Design Infra" },
        ]}
      />

      <Raw title="8pt 间距阶梯：一切留白都是它的整数倍">
        <SpacingScale />
      </Raw>

      <Lead>
        Orbit 是一套面向多平台产品的基础设计系统。它不规定每个页面长什么样，而是约束更底层的东西：间距怎么取、
        字号有哪几档、色彩各自承担什么职责、栅格在不同尺寸下如何收放、组件有哪些状态。这份规范是这一切的单一
        事实来源——所有平台的实现都从这里派生，任何"凭手感"的数值都不被接受。它的气质是瑞士的：冷静、系统化、
        靠网格而非装饰说话。
      </Lead>

      <Section index="01" title="网格与间距">
        <p>
          Orbit 的全部留白建立在一个 8pt 基准网格上，并允许 4pt 作为半步用于紧凑场景。所有外边距、内边距、组件
          间隙都必须落在这个阶梯上——这保证了任意两个界面拼在一起时，纵向节奏天然对齐。上方的间距阶梯是它的
          可视化：每一档都是基准的整数倍，没有 10px、13px 这样的"中间值"。
        </p>
        <Table
          caption="间距 token（基准 8pt，半步 4pt）"
          source="所有平台共享同一套数值，仅单位随平台改变（px / pt / dp）。"
          columns={[
            { key: "token", label: "Token", width: "10rem" },
            { key: "px", label: "值", align: "right" },
            { key: "use", label: "典型用途" },
          ]}
          rows={[
            { token: "space-1", px: "4", use: "图标与文字之间的最小缝隙" },
            { token: "space-2", px: "8", use: "紧凑控件的内边距" },
            { token: "space-3", px: "12", use: "标签与输入框之间" },
            { token: "space-4", px: "16", use: "默认内容内边距、卡片内距" },
            { token: "space-5", px: "24", use: "区块之间的常规间隔" },
            { token: "space-6", px: "32", use: "小节之间" },
            { token: "space-7", px: "48", use: "页面大区块之间" },
            { token: "space-8", px: "64", use: "页眉 / 页脚的纵向呼吸" },
          ]}
        />
        <Aside tone="principle" label="规则">
          只用阶梯里的值。需要一个不在阶梯上的间距，先怀疑布局，而不是新增一个数值——阶梯之外，没有合法的留白。
        </Aside>
      </Section>

      <Section index="02" title="字号阶梯">
        <p>
          Orbit 用单一无衬线字族在一条比例约 1.25 的字号阶梯上工作。层级<strong>靠字号与留白建立，而不是靠堆字重</strong>
          ——这正是瑞士排版的纪律：少数几档分明的尺寸，远比一堆粗细更清晰。下面的字号样张是这条阶梯的实物，
          每一行都标注了它的 token 与像素值。
        </p>
        <Raw title="字号样张：从正文到大标题的完整阶梯">
          <TypeRamp />
        </Raw>
        <Table
          caption="排版 token"
          columns={[
            { key: "token", label: "Token", width: "9rem" },
            { key: "size", label: "字号", align: "right" },
            { key: "lh", label: "行高", align: "right" },
            { key: "use", label: "用途" },
          ]}
          rows={[
            { token: "text-base", size: "17px", lh: "1.6", use: "正文，阅读的默认尺寸" },
            { token: "text-sm", size: "13px", lh: "1.45", use: "辅助说明、表格、元数据" },
            { token: "text-lg", size: "19px", lh: "1.5", use: "引导段、强调正文" },
            { token: "text-2xl", size: "30px", lh: "1.2", use: "小节标题" },
            { token: "text-4xl", size: "50px", lh: "1.05", use: "页面主标题" },
          ]}
        />
      </Section>

      <Section index="03" title="色彩职责">
        <p>
          Orbit 的色彩克制到近乎吝啬：一块冷中性的纸、一套墨色文字、<strong>唯一一个品牌红</strong>，外加承载语义的
          少数功能色。颜色从不用于装饰——每一处用色都必须能回答"它在表达什么"。品牌红只用于结构与识别（链接、
          强调线、关键标识），功能色只在传达状态时出现。
        </p>
        <Table
          caption="色彩 token 与职责"
          source="对比度均满足 WCAG AA；功能色不得挪作品牌或装饰用途。"
          columns={[
            { key: "token", label: "Token", width: "10rem" },
            { key: "role", label: "职责" },
            { key: "on", label: "可叠加于" },
          ]}
          rows={[
            { token: "color-bg", role: "页面底色（冷中性纸）", on: "—" },
            { token: "color-text", role: "正文墨色", on: "bg / surface" },
            { token: "color-accent", role: "品牌红：链接、强调、结构识别", on: "bg" },
            { token: "color-risk", role: "警示 / 破坏性操作", on: "bg" },
            { token: "color-success", role: "成功 / 完成状态", on: "bg" },
            { token: "color-border", role: "发丝级网格线、分隔", on: "bg / surface" },
          ]}
        />
        <Aside tone="warning" label="反例">
          不要为了"好看"给区块加一圈品牌红描边，也不要用成功绿来强调一个普通按钮——一旦颜色脱离语义，整套系统的
          可预测性就开始瓦解。
        </Aside>
      </Section>

      <Section index="04" title="栅格与断点">
        <p>
          Orbit 采用一套可收放的列栅格：在小屏是 4 栏，中屏 8 栏，大屏 12 栏。组件以"占几栏"来描述自身宽度，
          而不是写死像素，于是同一段内容能在不同尺寸下自然重排。下面这块是可交互的——拖动视口宽度，看栅格如何
          在断点处切换列数：
        </p>
        <Raw title="响应式栅格：拖动视口，看列数在断点切换">
          <ResponsiveColumns />
        </Raw>
        <Table
          caption="断点与栅格"
          columns={[
            { key: "bp", label: "断点", width: "8rem" },
            { key: "range", label: "视口范围", align: "right" },
            { key: "cols", label: "栏数", align: "right" },
            { key: "gutter", label: "栏距", align: "right" },
          ]}
          rows={[
            { bp: "sm", range: "< 600px", cols: "4", gutter: "16px" },
            { bp: "md", range: "600–1023px", cols: "8", gutter: "24px" },
            { bp: "lg", range: "≥ 1024px", cols: "12", gutter: "24px" },
          ]}
        />
      </Section>

      <Section index="05" title="组件状态">
        <p>
          一个组件的规范，不只是它"默认长什么样"，而是它所有状态的集合。Orbit 要求每个交互组件都完整定义
          默认 / 悬停 / 按下 / 禁用（以及表单组件的聚焦与错误）。下面是按钮三种变体在四种状态下的状态矩阵——
          它本身就是一份验收清单：任何一格缺失，组件即视为未完成。
        </p>
        <Raw title="按钮状态矩阵：变体 × 状态，一格都不能缺">
          <StateMatrix />
        </Raw>
        <Subsection index="5.1" title="多平台落地">
          <p>
            同一份 token 契约在每个平台都有对应实现，数值完全一致，只是单位与语法不同。下面用三个标签页并排
            放出 Web、iOS、Android 的 token 定义——这正是"单一事实来源、多端派生"的样子：
          </p>
          <Tabs
            tabs={[
              { label: "Web (CSS)", content: <CodeBlock language="css" title="orbit.tokens.css" code={cssTokens} /> },
              { label: "iOS (Swift)", content: <CodeBlock language="swift" title="Orbit.swift" code={iosTokens} /> },
              { label: "Android (XML)", content: <CodeBlock language="xml" title="orbit_tokens.xml" code={androidTokens} /> },
            ]}
          />
        </Subsection>
      </Section>

      <Section index="06" title="命名与用法约定">
        <p>
          最后是一些容易被忽略、却决定系统能否长期维护的约定。它们不华丽，但每一条都来自一次真实的踩坑。我们把
          细则收进可展开的条目里，需要时再翻：
        </p>
        <Detail summary="为什么 token 命名用职责而非具体值（accent 而不是 red）？">
          <p style={{ margin: 0 }}>
            因为值会变，职责不会。当品牌色从红调成别的颜色时，名为 <code>color-accent</code> 的 token 只需改一处取值，
            所有引用它的地方自动跟随；而如果当初命名为 <code>color-red</code>，就会留下一个名实不符、越改越乱的烂摊子。
          </p>
        </Detail>
        <Detail summary="组件能不能直接写死一个 16px 内边距？">
          <p style={{ margin: 0 }}>
            不能。所有间距必须引用 <code>space-*</code> token。写死像素会让组件脱离网格，未来调整基准时无法统一跟随，
            也破坏了跨组件的纵向节奏对齐。
          </p>
        </Detail>
        <Detail summary="Orbit 为什么不提供圆角与阴影 token？">
          <p style={{ margin: 0 }}>
            这是一个明确的风格选择：Orbit 用网格、留白与发丝线建立秩序，而非圆角与投影。<code>radius</code> 恒为 0，
            层级由对齐和间距承载——少一组可被滥用的装饰参数，系统反而更稳。
          </p>
        </Detail>
      </Section>

      <Conclusion
        title="小结"
        takeaways={[
          "间距、字号、栅格全部建立在可枚举的阶梯上，阶梯之外没有合法值。",
          "层级靠字号与网格建立，颜色只承载语义，品牌红只用于结构与识别。",
          "组件以状态矩阵为验收标准；token 是多平台的单一事实来源。",
        ]}
      >
        一套设计系统的价值，不在于它定义了多少漂亮的组件，而在于它把多少"凭手感的决定"变成了"可被引用的规则"。
        Orbit 把间距、字号、色彩、栅格与状态都收敛成可枚举、可派生、可验收的契约——剩下的创造力，应当花在网格
        之上的内容里，而不是反复纠结一个边距该是 14 还是 16。
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
          · vignelli theme
        </footer>
      </Raw>
    </Article>
    </>
  );
}
