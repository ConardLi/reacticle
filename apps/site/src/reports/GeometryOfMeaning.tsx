import { useState } from "react";
import {
  Article,
  Hero,
  Lead,
  Section,
  Subsection,
  Aside,
  Table,
  Quote,
  Detail,
  Conclusion,
  Raw,
} from "reacticle";

/*
 * A `bayer` (Bauhaus) teaching explainer on the visual grammar of shape, colour
 * and grid. The body teaches; interactive Raw specimens make it constructive —
 * a Kandinsky shape↔colour match, a primary trio, a grid playground — all drawn
 * in --ra-* tokens plus the theme's primaries (--by-red/blue/yellow). Exactly
 * one Table; identity carried by circles, primaries and a strict grid.
 */

const PRIMARIES = [
  { key: "yellow", label: "黄", varName: "--by-yellow", ink: "#100f0c" },
  { key: "red", label: "红", varName: "--by-red", ink: "#ffffff" },
  { key: "blue", label: "蓝", varName: "--by-blue", ink: "#ffffff" },
] as const;

const SHAPES = [
  { key: "triangle", label: "三角", canonical: "yellow", note: "尖锐、向上、有方向" },
  { key: "square", label: "方", canonical: "red", note: "稳定、沉重、扎根" },
  { key: "circle", label: "圆", canonical: "blue", note: "完整、内敛、安静" },
] as const;

/* §match — assign a primary to each shape, then reveal Kandinsky's canonical. */
function ShapeColorMatch() {
  const [pick, setPick] = useState<Record<string, number>>({
    triangle: 0,
    square: 0,
    circle: 0,
  });
  const [revealed, setRevealed] = useState(false);

  function Shape({ kind, color }: { kind: string; color: string }) {
    const common = { width: 64, height: 64 } as const;
    if (kind === "circle")
      return (
        <span
          aria-hidden="true"
          style={{ ...common, background: color, borderRadius: "999px", display: "block" }}
        />
      );
    if (kind === "square")
      return <span aria-hidden="true" style={{ ...common, background: color, display: "block" }} />;
    // triangle via borders
    return (
      <span
        aria-hidden="true"
        style={{
          width: 0,
          height: 0,
          borderLeft: "32px solid transparent",
          borderRight: "32px solid transparent",
          borderBottom: `64px solid ${color}`,
          display: "block",
        }}
      />
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--ra-space-5)" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "var(--ra-space-4)",
        }}
      >
        {SHAPES.map((s) => {
          const p = PRIMARIES[pick[s.key] ?? 0]!;
          const correct = revealed && p.key === s.canonical;
          const wrong = revealed && p.key !== s.canonical;
          return (
            <div
              key={s.key}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--ra-space-3)",
                padding: "var(--ra-space-4)",
                border: `2px solid ${
                  correct
                    ? "var(--by-blue)"
                    : wrong
                      ? "var(--ra-color-border-strong)"
                      : "var(--ra-color-border)"
                }`,
                background: "var(--ra-color-bg)",
              }}
            >
              <div style={{ height: 64, display: "flex", alignItems: "center" }}>
                <Shape kind={s.key} color={`var(${p.varName})`} />
              </div>
              <span style={{ fontWeight: "var(--ra-weight-bold)" }}>{s.label}</span>
              <button
                type="button"
                onClick={() =>
                  setPick((prev) => ({
                    ...prev,
                    [s.key]: ((prev[s.key] ?? 0) + 1) % PRIMARIES.length,
                  }))
                }
                style={{
                  appearance: "none",
                  cursor: "pointer",
                  fontFamily: "var(--ra-font-label)",
                  fontWeight: "var(--ra-weight-bold)",
                  fontSize: "var(--ra-text-sm)",
                  color: "var(--ra-color-heading)",
                  background: "transparent",
                  border: "2px solid var(--ra-color-heading)",
                  padding: "0.3em 0.9em",
                }}
              >
                配 {p.label} 色 ↺
              </button>
              {revealed ? (
                <span
                  style={{
                    fontSize: "var(--ra-text-xs)",
                    color: correct ? "var(--by-blue)" : "var(--ra-color-muted)",
                  }}
                >
                  {correct ? "✓ 与康定斯基一致" : `他选了「${labelOf(s.canonical)}」`}
                </span>
              ) : (
                <span style={{ fontSize: "var(--ra-text-xs)", color: "var(--ra-color-faint)" }}>
                  {s.note}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => setRevealed((r) => !r)}
        style={{
          alignSelf: "flex-start",
          appearance: "none",
          cursor: "pointer",
          fontFamily: "var(--ra-font-label)",
          fontWeight: "var(--ra-weight-bold)",
          color: "var(--ra-color-accent-contrast)",
          background: "var(--ra-color-accent)",
          border: "none",
          padding: "0.5em 1.2em",
        }}
      >
        {revealed ? "再试一次" : "对照康定斯基的答案"}
      </button>
    </div>
  );
}

function labelOf(key: string): string {
  return PRIMARIES.find((p) => p.key === key)?.label ?? key;
}

/* §grid — drag the column count; watch a composition re-flow on the grid. */
function GridPlayground() {
  const [cols, setCols] = useState(3);
  const blocks = [
    { span: 2, c: "--by-red" },
    { span: 1, c: "--by-blue" },
    { span: 1, c: "--by-yellow" },
    { span: 2, c: "--by-blue" },
    { span: 1, c: "--by-yellow" },
    { span: 1, c: "--by-red" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--ra-space-4)" }}>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--ra-space-3)",
          fontSize: "var(--ra-text-sm)",
        }}
      >
        <span style={{ flex: "none", fontWeight: "var(--ra-weight-bold)" }}>列数</span>
        <input
          type="range"
          min={2}
          max={6}
          value={cols}
          onChange={(e) => setCols(Number(e.target.value))}
          aria-label="网格列数"
          style={{ flex: 1, accentColor: "var(--by-blue)" }}
        />
        <span style={{ flex: "none", fontFamily: "var(--ra-font-mono)" }}>{cols}</span>
      </label>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: "4px",
          border: "2px solid var(--ra-color-heading)",
          padding: "4px",
        }}
      >
        {blocks.map((b, i) => (
          <span
            key={i}
            style={{
              gridColumn: `span ${Math.min(b.span, cols)}`,
              height: "44px",
              background: `var(${b.c})`,
            }}
          />
        ))}
      </div>
      <p style={{ margin: 0, fontSize: "var(--ra-text-sm)", color: "var(--ra-color-muted)" }}>
        同一组色块，只是换了网格的列数，秩序就完全不同。网格不是牢笼，而是让随意变成构成的那把尺。
      </p>
    </div>
  );
}

/* §cover — full-bleed Bauhaus collage: three primaries × three shapes × a strict
 * grid, anchored by the masthead tricolor bar and three big characters「形 色 格」.
 * Template D (满屏拼贴). Per cover.md: percent / inset / grid / flex only — no
 * absolute pixel positions — so PDF page (~3:4.2) and screen (3:4) both stay
 * composed without overflow. */
function GeometryOfMeaningCover() {
  return (
    <section
      className="ra-cover"
      aria-label="文章封面"
      data-ra-cover=""
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "min(100%, 48rem, calc((100vh - 8rem) * 3 / 4))",
        margin: "0 auto var(--ra-space-7, 3rem) auto",
        aspectRatio: "3 / 4",
        overflow: "hidden",
        background: "transparent",
        color: "var(--ra-color-fg, inherit)",
        borderRadius: "var(--ra-radius-md, 0)",
        border: "1px solid var(--ra-color-border, currentColor)",
        isolation: "isolate",
      }}
    >
      {/* L0 — fine constructive grid bleeding under everything */}
      <svg
        viewBox="0 0 300 400"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          color: "var(--ra-color-border-strong, var(--ra-color-border))",
          opacity: 0.55,
          zIndex: 0,
        }}
      >
        <defs>
          <pattern
            id="gom-cover-grid"
            width="25"
            height="25"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 25 0 L 0 0 0 25"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.4"
            />
          </pattern>
        </defs>
        <rect width="300" height="400" fill="url(#gom-cover-grid)" />
      </svg>

      {/* L1 — three primary shapes in a Bauhaus collage. Sized & placed by the
       *      same 300×400 viewBox so the composition reflows with the box. */}
      <svg
        viewBox="0 0 300 400"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        {/* Yellow triangle — top-left, points down-right; Kandinsky's 形 = 黄. */}
        <polygon
          points="20,68 198,68 20,246"
          fill="var(--by-yellow, var(--ra-color-accent-soft))"
        />
        {/* Red square — middle-right; Kandinsky's 形 = 红. */}
        <rect
          x="178"
          y="146"
          width="106"
          height="106"
          fill="var(--by-red, var(--ra-color-risk))"
        />
        {/* Blue circle — bottom-left; Kandinsky's 形 = 蓝. */}
        <circle
          cx="92"
          cy="328"
          r="64"
          fill="var(--by-blue, var(--ra-color-accent))"
        />
        {/* Hard heading rule under the masthead */}
        <line
          x1="20"
          y1="56"
          x2="280"
          y2="56"
          stroke="var(--ra-color-heading)"
          strokeWidth="0.8"
        />
        {/* Bottom rule above the colophon strip */}
        <line
          x1="20"
          y1="370"
          x2="280"
          y2="370"
          stroke="var(--ra-color-heading)"
          strokeWidth="0.8"
        />
      </svg>

      {/* L2 — Bauhaus tricolor masthead bar (mirrors .ra-hero's signature). */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2%",
          background:
            "linear-gradient(90deg, var(--by-red, var(--ra-color-risk)) 0 33.333%, var(--by-yellow, var(--ra-color-accent-soft)) 33.333% 66.666%, var(--by-blue, var(--ra-color-accent)) 66.666% 100%)",
          zIndex: 2,
        }}
      />

      {/* L3 — text & character layer. Grid: header row, central composition,
       *      footer row — all proportional, no absolute pixels. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          padding: "5.5% 6%",
          gap: "var(--ra-space-3)",
        }}
      >
        {/* HEADER: yellow-block kicker (Bauhaus lowercase) on the left,
         *         monospaced index code on the right. */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "var(--ra-space-4)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--ra-font-label)",
              fontSize: "var(--ra-text-xs)",
              fontWeight: "var(--ra-weight-bold)",
              textTransform: "lowercase",
              letterSpacing: "var(--ra-tracking-wide)",
              color: "var(--ra-color-heading)",
              background: "var(--by-yellow, var(--ra-color-accent-soft))",
              padding: "0.25em 0.7em",
            }}
          >
            bayer · explainer
          </span>
          <span
            style={{
              fontFamily: "var(--ra-font-mono)",
              fontSize: "var(--ra-text-xs)",
              letterSpacing: "0.18em",
              color: "var(--ra-color-heading)",
              alignSelf: "center",
            }}
          >
            cover / 03 — 04
          </span>
        </div>

        {/* CENTER: three giant characters in a strict 3-row grid; each row
         *         pairs a character with the shape it canonically belongs to.
         *         Characters live in *empty* corners so they don't fight the
         *         color blocks underneath. */}
        <div
          style={{
            display: "grid",
            gridTemplateRows: "1fr 1fr 1fr",
            alignItems: "center",
          }}
        >
          {/* Row 1 — 形 / triangle (the triangle is in the upper-left corner of
           *          the canvas, so set "形" to the upper-RIGHT to balance). */}
          <CoverGlyph
            char="形"
            tag="triangle"
            primary="yellow"
            justify="end"
          />
          {/* Row 2 — 色 / square (square sits middle-right; put "色" left). */}
          <CoverGlyph
            char="色"
            tag="square"
            primary="red"
            justify="start"
          />
          {/* Row 3 — 格 / circle (circle is in the lower-left; put "格" right). */}
          <CoverGlyph
            char="格"
            tag="circle"
            primary="blue"
            justify="end"
          />
        </div>

        {/* FOOTER: subtitle + tricolor pip cluster — different wording from
         *         Hero's title/subtitle so the cover acts as hook, not echo. */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "var(--ra-space-4)",
          }}
        >
          <p
            style={{
              margin: 0,
              maxWidth: "70%",
              fontFamily: "var(--ra-font-label)",
              fontSize: "var(--ra-text-sm)",
              lineHeight: "var(--ra-leading-snug)",
              color: "var(--ra-color-heading)",
              fontWeight: "var(--ra-weight-medium)",
            }}
          >
            <strong style={{ fontWeight: "var(--ra-weight-bold)" }}>
              三种形状 · 三种原色 · 一张网格。
            </strong>
            <span
              style={{
                display: "block",
                color: "var(--ra-color-muted)",
                fontWeight: "var(--ra-weight-normal)",
                marginTop: "0.3em",
              }}
            >
              一份给入门设计者的视觉语法手册。
            </span>
          </p>
          {/* Tricolor pip cluster — three filled dots echo the Bauhaus
           *  primaries and the section circle motif. */}
          <span
            aria-hidden="true"
            style={{
              display: "inline-flex",
              gap: "0.4em",
              alignItems: "center",
              flex: "none",
            }}
          >
            <CoverPip color="var(--by-red, var(--ra-color-risk))" />
            <CoverPip color="var(--by-yellow, var(--ra-color-accent-soft))" />
            <CoverPip color="var(--by-blue, var(--ra-color-accent))" />
          </span>
        </div>
      </div>
    </section>
  );
}

/* §cover — one giant character + a small lowercase tag, justified left or
 * right depending on which side of the row the underlying color block lives.
 * No absolute positioning: the row is a flex line; the cover collage and the
 * text agree only on which corner is "free", not on absolute pixels. */
function CoverGlyph({
  char,
  tag,
  primary,
  justify,
}: {
  char: string;
  tag: string;
  primary: "red" | "yellow" | "blue";
  justify: "start" | "end";
}) {
  const accentVar =
    primary === "red"
      ? "var(--by-red, var(--ra-color-risk))"
      : primary === "yellow"
        ? "var(--by-yellow, var(--ra-color-accent-soft))"
        : "var(--by-blue, var(--ra-color-accent))";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: justify === "start" ? "flex-start" : "flex-end",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: justify === "start" ? "flex-start" : "flex-end",
          gap: "0.1em",
        }}
      >
        <span
          style={{
            fontFamily: "var(--ra-font-heading)",
            fontWeight: "var(--ra-weight-bold)",
            fontSize: "clamp(3rem, min(13vh, 18vw), 7.2rem)",
            lineHeight: 0.85,
            letterSpacing: "-0.03em",
            color: "var(--ra-color-heading)",
          }}
        >
          {char}
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35em",
            fontFamily: "var(--ra-font-label)",
            fontSize: "var(--ra-text-xs)",
            fontWeight: "var(--ra-weight-bold)",
            textTransform: "lowercase",
            letterSpacing: "var(--ra-tracking-wide)",
            color: "var(--ra-color-muted)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: "0.55em",
              height: "0.55em",
              background: accentVar,
              display: "inline-block",
              borderRadius: tag === "circle" ? "999px" : 0,
              clipPath:
                tag === "triangle"
                  ? "polygon(50% 0, 100% 100%, 0 100%)"
                  : undefined,
            }}
          />
          {tag}
        </span>
      </div>
    </div>
  );
}

function CoverPip({ color }: { color: string }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: "0.55rem",
        height: "0.55rem",
        background: color,
        borderRadius: "999px",
        display: "inline-block",
      }}
    />
  );
}

/** bayer · 教学 */
export function GeometryOfMeaning() {
  return (
    <>
      <GeometryOfMeaningCover />
      <Article toc width="regular">
      <Hero
        eyebrow="visual basics"
        title="形、色、网格：看得懂的视觉语法"
        subtitle="包豪斯留给我们的不是一种风格，而是一套语法——形状有性格，颜色有重量，网格让随意变成构成。"
        meta={[
          { label: "适合", value: "刚入门的设计者" },
          { label: "读完", value: "约 10 分钟" },
        ]}
      />

      <Lead>
        很多人以为设计是天赋，是「好看」的玄学。但包豪斯一百年前就把它当成一门可以教的语法来对待：基本形
        各有性格，三原色各有重量，而网格，是把一堆零件组织成秩序的语法规则。把这三件事搞懂，你未必能立刻
        做出杰作，但你会第一次知道，自己每一个决定是<strong>为什么</strong>。
      </Lead>

      <Section index="01" title="形状是有性格的">
        <p>
          圆、方、三角，是一切复杂图形的字母表。它们不只是几何，还携带情绪：三角尖锐、有方向、像在前进；
          方稳定、沉重、像扎了根；圆完整、内敛、像在休息。这不是主观臆断——你看到一个三角形，身体先于头脑
          就感到了它的指向。
        </p>
        <Quote who="包豪斯的一句信条">
          先问这个形状想做什么，再问它好不好看。
        </Quote>
        <p>
          这就是为什么警示标志是三角（它在喊「注意，前方」），印章和地基是方（它在说「稳，别动」），而徽章与
          表盘偏爱圆（它在说「完整，自洽」）。形状先替你说话，文字才补充细节。
        </p>
      </Section>

      <Section index="02" title="康定斯基的那道著名问题">
        <p>
          1923 年，包豪斯做过一个著名的小调查：如果只能给圆、方、三角各配一种原色，你会怎么配？康定斯基
          给出的答案是——三角配黄、方配红、圆配蓝。他相信形状的性格与颜色的性格之间，存在天然的呼应。
        </p>
        <p>先别看答案。你自己来配配看，再对照他的选择：</p>
        <Raw title="给每个形状配一种原色，再对照康定斯基">
          <ShapeColorMatch />
        </Raw>
        <p>
          你不一定要同意他——这不是物理定律，而是一种关于「锐利对应高亮、稳重对应温暖、安静对应冷静」的
          直觉。重要的不是答对，而是你开始<strong>有意识地</strong>把形与色当成可以搭配的两套性格，而不是
          随手抓来的装饰。
        </p>
        <Aside tone="principle" label="一个原则">
          形与色不是分开选的。一个尖锐的三角配上冷静的蓝，会互相打架；让它们的性格彼此呼应，画面才会「对」。
        </Aside>
      </Section>

      <Section index="03" title="三原色，各有各的活儿">
        <p>
          红、蓝、黄是色彩的字母表。在包豪斯的用法里，它们很少为了「漂亮」而存在，而是各自承担一种角色：
          一个负责结构、一个负责警示、一个负责高亮。下面这张表是把这套分工说清楚——也正是本主题自己的用色逻辑。
        </p>
        <Table
          caption="三原色的性格与分工（也是本主题的用色逻辑）"
          columns={[
            { key: "c", label: "颜色", width: "7rem" },
            { key: "feel", label: "性格" },
            { key: "job", label: "适合的活儿" },
          ]}
          rows={[
            { c: "蓝", feel: "冷静、可信、退后", job: "结构色：链接、编号、骨架——本主题的章节圆就是蓝" },
            { c: "红", feel: "紧迫、热烈、前进", job: "警示与强调：风险、不可错过的提示" },
            { c: "黄", feel: "明亮、跳脱、轻盈", job: "高亮：荧光块、重点底色——绝不当小字色（看不清）" },
          ]}
        />
        <Subsection index="3.1" title="为什么黄不能当文字">
          <p>
            黄在白底上几乎读不出来——它太亮，对比不够。所以在这套语法里，黄永远是<strong>填充</strong>，
            而不是<strong>文字</strong>：它做高亮块、做强调底，但链接和正文交给冷静可读的蓝与黑。这不是审美
            洁癖，是可读性的硬约束。
          </p>
        </Subsection>
      </Section>

      <Section index="04" title="网格：让随意变成构成">
        <p>
          有了形和色，最后一件事是把它们摆在哪里。答案不是「凭感觉」，而是网格。网格是一套看不见的栏与行，
          它不限制你的创意，反而把零散的元素对齐成一种秩序——同样一堆色块，落在不同的网格上，会读出完全
          不同的节奏。
        </p>
        <Raw title="拖动列数：同一组色块，秩序随网格而变">
          <GridPlayground />
        </Raw>
        <p>
          这就是包豪斯最实用的遗产：先定网格，再放元素。当每样东西都对齐到同一套栏行，画面自然就「整」了——
          哪怕你用的还是那几个最朴素的形和最基本的色。
        </p>
        <Detail summary="网格会不会让设计变得死板？">
          <p style={{ margin: 0 }}>
            恰恰相反。网格管的是对齐与节奏，不是创意。正因为底层有秩序，你才敢在上面大胆地打破——跨栏、留白、
            错位都成了有意识的选择，而不是失控。先有规矩，破规矩才有力量。
          </p>
        </Detail>
        <Detail summary="这些原则只适用于平面设计吗？">
          <p style={{ margin: 0 }}>
            不。形状的性格、颜色的分工、网格的秩序，同样适用于幻灯片、网页、海报，甚至一份排得清楚的文档。
            它们是关于「如何组织视觉信息」的通用语法，载体只是换了纸。
          </p>
        </Detail>
      </Section>

      <Conclusion
        title="一句话收束"
        takeaways={[
          "形状有性格：三角进取、方稳重、圆安静——先问它想做什么。",
          "三原色各有分工：蓝做结构、红做警示、黄做高亮（黄不当文字）。",
          "形与色要性格呼应，不是各选各的。",
          "先定网格再放元素：网格让随意变成构成，也让破格有了力量。",
        ]}
      >
        包豪斯真正教的不是某种「包豪斯风」，而是一种把视觉拆成零件、再有意识地组装回去的能力。当你下一次
        觉得某个画面「说不上来哪里不对」，试着回到这三件事：形对不对、色配不配、有没有落在网格上。多数时候，
        答案就在其中。
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
          · bayer theme
        </footer>
      </Raw>
    </Article>
    </>
  );
}
