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
 * A `sottsass` (Memphis) playful guide to clashing colours on purpose. The body
 * is light and opinionated; interactive Raw specimens lean into the theme —
 * flat offset shadows, tilts, clashing pairs — all in --ra-* tokens (+ the
 * theme's --st-* clash palette). Exactly one Table (do / don't). Loud but the
 * running text stays calm and readable (cobalt ink does the work).
 */

const SWATCHES = [
  { name: "艳粉", hex: "#ff5d9e" },
  { name: "青绿", hex: "#18c2bf" },
  { name: "阳光黄", hex: "#ffd23f" },
  { name: "钴蓝", hex: "#2c54e0" },
  { name: "珊瑚", hex: "#ff7a59" },
  { name: "奶油", hex: "#fcf7ef" },
  { name: "墨黑", hex: "#0e0c0a" },
];

function luminance(hex: string): number {
  const n = hex.replace("#", "");
  const r = parseInt(n.slice(0, 2), 16) / 255;
  const g = parseInt(n.slice(2, 4), 16) / 255;
  const b = parseInt(n.slice(4, 6), 16) / 255;
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function contrast(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/* §clash — pick a fill and an ink; clash freely, but check it can be read. */
function ClashTester() {
  const [bg, setBg] = useState(2); // yellow
  const [fg, setFg] = useState(6); // black
  const bgHex = SWATCHES[bg]!.hex;
  const fgHex = SWATCHES[fg]!.hex;
  const ratio = contrast(bgHex, fgHex);
  const readable = ratio >= 4.5;
  const ok = ratio >= 3 && ratio < 4.5;

  function Picker({ value, onPick, label }: { value: number; onPick: (i: number) => void; label: string }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ fontFamily: "var(--ra-font-label)", fontSize: "var(--ra-text-xs)", fontWeight: 700 }}>
          {label}
        </span>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {SWATCHES.map((s, i) => (
            <button
              key={s.hex}
              type="button"
              aria-label={s.name}
              onClick={() => onPick(i)}
              style={{
                width: "26px",
                height: "26px",
                background: s.hex,
                cursor: "pointer",
                borderRadius: "6px",
                border: i === value ? "3px solid var(--ra-color-heading)" : "1px solid var(--ra-color-border-strong)",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--ra-space-5)" }}>
      <div
        style={{
          background: bgHex,
          color: fgHex,
          border: "3px solid var(--ra-color-heading)",
          borderRadius: "14px",
          boxShadow: "7px 7px 0 var(--ra-color-heading)",
          padding: "var(--ra-space-6) var(--ra-space-5)",
          textAlign: "center",
          transform: "rotate(-1.5deg)",
        }}
      >
        <div style={{ fontFamily: "var(--ra-font-heading)", fontWeight: 700, fontSize: "var(--ra-text-2xl)" }}>
          大胆撞，别糊
        </div>
        <div style={{ marginTop: "6px", fontSize: "var(--ra-text-sm)" }}>
          这行字现在的对比度是 {ratio.toFixed(1)} : 1
        </div>
      </div>
      <div style={{ display: "flex", gap: "var(--ra-space-6)", flexWrap: "wrap" }}>
        <Picker value={bg} onPick={setBg} label="底色（尽管艳）" />
        <Picker value={fg} onPick={setFg} label="字色（要能读）" />
      </div>
      <div
        style={{
          fontFamily: "var(--ra-font-label)",
          fontWeight: 700,
          color: readable
            ? "var(--ra-color-success)"
            : ok
              ? "var(--ra-color-heading)"
              : "var(--ra-color-risk)",
        }}
      >
        {readable && "✓ 读得很清楚，放心撞"}
        {ok && "△ 勉强能读，大字标题可以，正文别用"}
        {!readable && !ok && "✕ 糊成一团——撞色没问题，但这两个不能叠在一起当字"}
      </div>
    </div>
  );
}

/* §shelf — ready-made Memphis pairings as flat-shadow cards. */
function PaletteShelf() {
  const sets = [
    { a: "#ff5d9e", b: "#18c2bf", c: "#ffd23f", name: "粉 · 青 · 黄" },
    { a: "#2c54e0", b: "#ff7a59", c: "#ffd23f", name: "蓝 · 珊瑚 · 黄" },
    { a: "#18c2bf", b: "#ff5d9e", c: "#0e0c0a", name: "青 · 粉 · 黑" },
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "var(--ra-space-5)",
      }}
    >
      {sets.map((s, i) => (
        <div
          key={s.name}
          style={{
            border: "3px solid var(--ra-color-heading)",
            borderRadius: "12px",
            boxShadow: "5px 5px 0 var(--ra-color-heading)",
            overflow: "hidden",
            transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)`,
          }}
        >
          <div style={{ display: "flex", height: "56px" }}>
            <span style={{ flex: 2, background: s.a }} />
            <span style={{ flex: 1, background: s.b }} />
            <span style={{ flex: 1, background: s.c }} />
          </div>
          <div
            style={{
              padding: "8px 10px",
              fontFamily: "var(--ra-font-label)",
              fontSize: "var(--ra-text-sm)",
              fontWeight: 700,
              background: "var(--ra-color-bg)",
              borderTop: "3px solid var(--ra-color-heading)",
            }}
          >
            {s.name}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------------- *
 * Cover —— Template D (full Memphis collage). Text ≠ Hero: hook is "撞 / 得 /
 * 对" as three poster glyph-cards; Hero anchors with "撞色不翻车". Pure --ra-*
 * tokens for ink / borders / radii; --st-* pastels (defined under
 * [data-theme="sottsass"]) used with --ra-* fallbacks so the cover never
 * breaks if rendered under a different theme.
 * ------------------------------------------------------------------------- */
function CoverGlyph({
  char,
  bg,
  fg,
  rotate,
}: {
  char: string;
  bg: string;
  fg: string;
  rotate: string;
}) {
  return (
    <div
      style={{
        width: "clamp(3.5rem, 14vw, 6.6rem)",
        aspectRatio: "1 / 1",
        display: "grid",
        placeItems: "center",
        background: bg,
        color: fg,
        border: "4px solid var(--ra-color-heading)",
        borderRadius: "var(--ra-radius-md)",
        boxShadow: "var(--ra-shadow-lg)",
        transform: `rotate(${rotate})`,
        fontFamily: "var(--ra-font-heading)",
        fontWeight: "var(--ra-weight-bold)",
        fontSize: "clamp(2.2rem, 9vw, 4.2rem)",
        lineHeight: 1,
        letterSpacing: "var(--ra-tracking-tighter)",
      }}
    >
      {char}
    </div>
  );
}

function ColorClashCover() {
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
      {/* Background collage —— Memphis 撞色块 + 彩屑 + 波纹 / 锯齿。SVG viewBox
       *  让 3:4（屏幕）和 ~3:4.1（A4 PDF）都自适应、不错位。 */}
      <svg
        viewBox="0 0 1200 1600"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        {/* Teal slab, top-right, tilted */}
        <g transform="translate(700 90) rotate(-5)">
          <rect
            width="560"
            height="360"
            fill="var(--st-teal, var(--ra-color-success))"
            stroke="var(--ra-color-heading)"
            strokeWidth="6"
          />
        </g>

        {/* Yellow square, mid-left, tilted other way */}
        <g transform="translate(70 420) rotate(-7)">
          <rect
            width="300"
            height="300"
            fill="var(--st-yellow, var(--ra-color-warn-soft))"
            stroke="var(--ra-color-heading)"
            strokeWidth="6"
          />
        </g>

        {/* Cobalt stripe across upper-mid, tilted +8° */}
        <g transform="translate(560 720) rotate(8)">
          <rect
            width="620"
            height="100"
            fill="var(--ra-color-accent)"
            stroke="var(--ra-color-heading)"
            strokeWidth="6"
          />
        </g>

        {/* Pink slab, bottom-left, lightly tilted */}
        <g transform="translate(-60 1140) rotate(3)">
          <rect
            width="700"
            height="420"
            fill="var(--st-pink, var(--ra-color-risk))"
            stroke="var(--ra-color-heading)"
            strokeWidth="6"
          />
        </g>

        {/* Decorative wavy underline, lower right */}
        <path
          d="M 660 1340 Q 720 1296 780 1340 T 900 1340 T 1020 1340 T 1140 1340"
          fill="none"
          stroke="var(--ra-color-heading)"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Zigzag (Z-shape Memphis confetti), upper-mid-left */}
        <path
          d="M 100 360 L 160 320 L 220 360 L 280 320 L 340 360 L 400 320 L 460 360"
          fill="none"
          stroke="var(--ra-color-accent)"
          strokeWidth="6"
          strokeLinejoin="miter"
        />

        {/* Polka dots */}
        <circle
          cx="110"
          cy="170"
          r="24"
          fill="var(--st-pink, var(--ra-color-risk))"
          stroke="var(--ra-color-heading)"
          strokeWidth="4"
        />
        <circle
          cx="1090"
          cy="560"
          r="34"
          fill="var(--st-pink, var(--ra-color-risk))"
          stroke="var(--ra-color-heading)"
          strokeWidth="4"
        />
        <circle
          cx="260"
          cy="980"
          r="20"
          fill="var(--st-yellow, var(--ra-color-warn-soft))"
          stroke="var(--ra-color-heading)"
          strokeWidth="4"
        />
        <circle
          cx="990"
          cy="1420"
          r="22"
          fill="var(--ra-color-accent)"
          stroke="var(--ra-color-heading)"
          strokeWidth="4"
        />
        <circle
          cx="1130"
          cy="1180"
          r="16"
          fill="var(--st-teal, var(--ra-color-success))"
          stroke="var(--ra-color-heading)"
          strokeWidth="4"
        />

        {/* Triangles */}
        <polygon
          points="970,60 1040,60 1005,128"
          fill="var(--st-yellow, var(--ra-color-warn-soft))"
          stroke="var(--ra-color-heading)"
          strokeWidth="4"
        />
        <polygon
          points="60,780 130,780 95,848"
          fill="var(--ra-color-accent)"
          stroke="var(--ra-color-heading)"
          strokeWidth="4"
        />

        {/* Open ring, mid */}
        <circle
          cx="430"
          cy="540"
          r="46"
          fill="none"
          stroke="var(--ra-color-heading)"
          strokeWidth="6"
        />
      </svg>

      {/* Text + glyph layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          padding:
            "var(--ra-space-6, 2rem) var(--ra-space-6, 2rem) var(--ra-space-5, 1.5rem)",
          gap: "var(--ra-space-4, 1rem)",
        }}
      >
        {/* Top row: tilted Memphis pill labels */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "var(--ra-space-3, 0.75rem)",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--ra-font-label)",
              fontSize: "var(--ra-text-xs)",
              letterSpacing: "var(--ra-tracking-caps)",
              fontWeight: "var(--ra-weight-bold)",
              color: "var(--ra-color-heading)",
              background: "var(--ra-color-bg)",
              border: "2px solid var(--ra-color-heading)",
              borderRadius: "var(--ra-radius-full)",
              padding: "0.32em 0.95em",
              transform: "rotate(-2.5deg)",
              boxShadow: "3px 3px 0 var(--ra-color-heading)",
              textTransform: "uppercase",
            }}
          >
            Cover · No.03
          </span>
          <span
            style={{
              fontFamily: "var(--ra-font-label)",
              fontSize: "var(--ra-text-xs)",
              letterSpacing: "var(--ra-tracking-caps)",
              fontWeight: "var(--ra-weight-bold)",
              color: "var(--ra-color-accent-contrast)",
              background: "var(--ra-color-accent)",
              border: "2px solid var(--ra-color-heading)",
              borderRadius: "var(--ra-radius-full)",
              padding: "0.32em 0.95em",
              transform: "rotate(2deg)",
              boxShadow: "3px 3px 0 var(--ra-color-heading)",
              textTransform: "uppercase",
            }}
          >
            设计随笔 · Sottsass
          </span>
        </div>

        {/* Center: poster glyph-cards "撞 / 得 / 对" + tilted kicker card */}
        <div
          style={{
            display: "grid",
            alignContent: "center",
            justifyItems: "center",
            gap: "var(--ra-space-5, 1.5rem)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "clamp(0.5rem, 2vw, 1rem)",
              alignItems: "center",
            }}
          >
            <CoverGlyph
              char="撞"
              bg="var(--st-pink, var(--ra-color-risk))"
              fg="var(--ra-color-heading)"
              rotate="-5deg"
            />
            <CoverGlyph
              char="得"
              bg="var(--st-yellow, var(--ra-color-warn-soft))"
              fg="var(--ra-color-heading)"
              rotate="2deg"
            />
            <CoverGlyph
              char="对"
              bg="var(--ra-color-accent)"
              fg="var(--ra-color-accent-contrast)"
              rotate="-1.5deg"
            />
          </div>
          <div
            style={{
              fontFamily: "var(--ra-font-heading)",
              fontSize: "clamp(0.9rem, 2.4vw, var(--ra-text-lg))",
              fontWeight: "var(--ra-weight-bold)",
              color: "var(--ra-color-heading)",
              background: "var(--ra-color-bg)",
              border: "2px solid var(--ra-color-heading)",
              borderRadius: "var(--ra-radius-md)",
              padding: "0.45em 0.9em",
              boxShadow: "4px 4px 0 var(--ra-color-accent)",
              transform: "rotate(1.8deg)",
              letterSpacing: "var(--ra-tracking-tight)",
              textAlign: "center",
            }}
          >
            一份孟菲斯式的配色胆量练习
          </div>
        </div>

        {/* Bottom row: small wordmark + wavy-underlined CTA */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "var(--ra-space-3, 0.75rem)",
            fontFamily: "var(--ra-font-label)",
            fontSize: "var(--ra-text-xs)",
            letterSpacing: "var(--ra-tracking-caps)",
            color: "var(--ra-color-heading)",
            fontWeight: "var(--ra-weight-bold)",
            textTransform: "uppercase",
            flexWrap: "wrap",
          }}
        >
          <span>Memphis · Milano · 1981→</span>
          <span
            style={{
              textDecoration: "underline",
              textDecorationStyle: "wavy",
              textDecorationColor: "var(--st-pink, var(--ra-color-risk))",
              textDecorationThickness: "2px",
              textUnderlineOffset: "0.32em",
            }}
          >
            读得清楚才不翻车
          </span>
        </div>
      </div>
    </section>
  );
}

/** sottsass · 设计随笔 */
export function ColorClash() {
  return (
    <>
      <ColorClashCover />
      <Article toc width="regular">
      <Hero
        eyebrow="不正经指南"
        title="撞色不翻车"
        subtitle="谁说颜色要「和谐」？孟菲斯早就证明了，撞得对，才好看——这是一份关于配色胆量的练习。"
        meta={[
          { label: "类型", value: "设计随笔" },
          { label: "读完", value: "约 9 分钟" },
        ]}
      />

      <Lead>
        我们从小被教育颜色要「和谐」：同色系、低饱和、别太跳。于是世界变得很安全，也很无聊。但 1981 年，
        一群米兰设计师组成的孟菲斯小组干脆把这套规矩掀翻了：他们把粉、青、黄、蓝故意撞在一起，配上波点、
        锯齿和黑色描边——结果不是灾难，而是一种至今仍在影响潮流的、欢快得理直气壮的美学。这篇就聊聊：怎么
        撞色，才撞得对、又不翻车。
      </Lead>

      <Section index="01" title="先承认：撞色是一种胆量">
        <p>
          和谐配色是安全牌，谁都不会出错，但也谁都记不住。撞色是另一条路：它<strong>主动制造冲突</strong>，靠
          冲突抓住眼睛。孟菲斯的厉害之处，不是乱撞，而是撞得有控制——它知道哪里该吵、哪里该让，所以热闹而
          不刺眼。
        </p>
        <Quote who="孟菲斯的精神">
          好品味让人安心，但坏品味让人记住。
        </Quote>
        <p>
          所以这份指南的第一条不是技巧，而是态度：别怕颜色打架。打架不可怕，糊成一团才可怕。下面我们就把
          「敢撞」和「能读」这两件事分开来谈。
        </p>
      </Section>

      <Section index="02" title="撞色的唯一硬规矩：读得出来">
        <p>
          撞色可以任性，但有一条铁律不能破：<strong>叠在一起当文字的两个颜色，必须有足够对比</strong>。粉底配
          青字、黄底配白字，看着很潮，但谁也读不出来。撞色是给眼睛的，文字是给大脑的——别让前者毁了后者。
        </p>
        <Raw title="动手撞撞看：底色随便艳，但这行字得读得出来">
          <ClashTester />
        </Raw>
        <p>
          试几下你就会发现规律：<strong>黑配任何亮色</strong>都安全，<strong>钴蓝配奶油</strong>稳，而两个高饱和
          亮色叠在一起当字，几乎必糊。这就是为什么本主题的正文和链接永远用沉得下去的钴蓝与墨黑——把撞色的
          热闹留给色块，把可读性交给冷静的字。
        </p>
        <Aside tone="warning" label="最容易翻车的地方">
          不是色块撞色块，而是<strong>亮色当字、亮色当底</strong>。色块尽管撞，正文请用墨黑或钴蓝——这是撞色不
          翻车的第一道保险。
        </Aside>
      </Section>

      <Section index="03" title="三个让撞色显贵的小动作">
        <p>
          同样是撞色，有人撞出廉价感，有人撞出设计感。差别往往在几个不起眼的小动作上。
        </p>
        <Subsection index="3.1" title="给一切加黑描边">
          <p>
            黑色描边是孟菲斯的万能胶。再吵的颜色，外面包一圈黑边，立刻就「收」住了——边框把每块颜色框成一个
            有意为之的元素，而不是一摊溢出来的色。本页所有卡片、章节号、callout 都有这圈黑边，就是这个道理。
          </p>
        </Subsection>
        <Subsection index="3.2" title="用硬投影，别用柔光">
          <p>
            普通设计用模糊柔光的阴影显高级；孟菲斯反着来，用<strong>无模糊的偏移硬投影</strong>（比如往右下方
            直接错开一块纯色）。它平、它假、它复古，正是 80 年代的味道。柔光让东西「浮起来」，硬投影让东西
            「贴上去」——后者更欢快、更有印刷感。
          </p>
        </Subsection>
        <Subsection index="3.3" title="敢让它歪一点">
          <p>
            把一个色块、一个标签轻轻转个两三度，画面立刻活了。完美的水平垂直是「正经」，轻微的旋转是「好玩」。
            别转太多，转一点点，就够它从「排版」变成「态度」。
          </p>
        </Subsection>
        <Raw title="现成的孟菲斯配色，照抄不犯法">
          <PaletteShelf />
        </Raw>
      </Section>

      <Section index="04" title="什么时候别撞色">
        <p>
          撞色很爽，但它有脾气，不是哪儿都合适。下面这张表是这份指南唯一的「正经」清单：什么场合放手撞，
          什么场合收着点。
        </p>
        <Table
          caption="撞色的「该」与「不该」"
          columns={[
            { key: "scene", label: "场合", width: "11rem" },
            { key: "do", label: "建议" },
          ]}
          rows={[
            { scene: "海报 / 封面 / 活动页", do: "放手撞——这是撞色的主场，越响越好" },
            { scene: "品牌点睛 / 强调块", do: "撞，但控制数量，一两处即可" },
            { scene: "正文 / 长段文字", do: "别撞，用墨黑或钴蓝，撞色留给周边色块" },
            { scene: "数据 / 严肃报告", do: "收着——这时候该换个冷静的主题，不是这一套" },
          ]}
        />
        <Detail summary="撞色会不会显得不专业？">
          <p style={{ margin: 0 }}>
            看场合。对一份财报，会；对一张活动海报、一个潮流品牌、一篇好玩的科普，恰恰相反——安全配色才显得
            没想法。专业不等于无聊，关键是「这套调性配不配得上内容」。撞色是一种选择，不是一种错误。
          </p>
        </Detail>
        <Detail summary="撞色和「花」是一回事吗？">
          <p style={{ margin: 0 }}>
            不是。「花」是没有重点、什么都想要；撞色是有控制的冲突——通常是两到三个主色彼此对抗，其余克制。
            孟菲斯看着热闹，其实色板很克制，靠的是少数几个颜色反复地、坚定地撞。
          </p>
        </Detail>
      </Section>

      <Conclusion
        title="撞色备忘"
        takeaways={[
          "撞色是胆量：别怕颜色打架，怕的是糊成一团。",
          "唯一硬规矩：当字的两色要有对比，正文交给墨黑 / 钴蓝。",
          "三个显贵小动作：黑描边、硬投影（不柔光）、轻微旋转。",
          "分场合：海报放手撞，正文收着点，严肃报告干脆换主题。",
        ]}
      >
        颜色和谐是一种安全，撞色是一种态度。孟菲斯留给我们的，不是某几组配色，而是一种「敢撞、且撞得有
        控制」的底气。下次当你觉得画面太乖、太忘得掉，不妨挑两个吵架的颜色，给它们包上黑边、错开一道硬影、
        轻轻转个角——只要那行字还读得清楚，你就没翻车。
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
          · sottsass theme
        </footer>
      </Raw>
    </Article>
    </>
  );
}
