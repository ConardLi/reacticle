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
 * A `freddie` (Mailchimp) tutorial: a friendly, slightly irreverent onboarding
 * guide to sending a first newsletter. The body is the protagonist — warm,
 * human prose — punctuated by several interactive Raw specimens (a deliverability
 * funnel, a subject-line check-up, a good/bad gallery, an email anatomy, a CTA
 * dilution slider, a send-time heat grid). Everything is drawn in --ra-* tokens
 * plus the theme's yellow signature (--mc-yellow), so it stays on-brand and
 * switches with the theme. Exactly one real Table, the rest is prose + Raw.
 */

/* ---- bespoke Raw specimens for this guide ---- */

/** §funnel — the brutal arithmetic of a send, as shrinking yellow bars. */
function SendFunnel() {
  const stages = [
    { name: "发出去", n: 1000, note: "你的列表" },
    { name: "送达", n: 980, note: "没被退信 / 拦截" },
    { name: "打开", n: 412, note: "主题行的功劳" },
    { name: "点了链接", n: 86, note: "内容的功劳" },
  ];
  const max = stages[0]!.n;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--ra-space-3)",
      }}
    >
      {stages.map((s) => (
        <div
          key={s.name}
          style={{
            display: "grid",
            gridTemplateColumns: "5.5rem 1fr",
            alignItems: "center",
            gap: "var(--ra-space-3)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--ra-font-label)",
              fontSize: "var(--ra-text-sm)",
              color: "var(--ra-color-muted)",
              textAlign: "right",
            }}
          >
            {s.name}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.6em" }}>
            <span
              style={{
                display: "block",
                height: "26px",
                width: `${(s.n / max) * 100}%`,
                minWidth: "2.5rem",
                background: "var(--mc-yellow)",
                border: "1px solid var(--ra-color-heading)",
                borderRadius: "var(--ra-radius-sm)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--ra-font-mono)",
                fontSize: "var(--ra-text-sm)",
                color: "var(--ra-color-heading)",
                fontWeight: "var(--ra-weight-bold)",
              }}
            >
              {s.n}
            </span>
            <span
              style={{
                fontSize: "var(--ra-text-xs)",
                color: "var(--ra-color-faint)",
              }}
            >
              {s.note}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

/** §subject — type a subject line, get an honest, friendly check-up. */
function SubjectLineTester() {
  const [text, setText] = useState("本周更新：三件你大概会想知道的小事");
  const len = [...text].length;
  const caps = text.replace(/[^A-Za-z]/g, "");
  const capsRatio = caps.length
    ? caps.replace(/[^A-Z]/g, "").length / caps.length
    : 0;
  const bangs = (text.match(/[!！]/g) || []).length;
  const checks = [
    {
      ok: len > 0 && len <= 40,
      good: `长度 ${len} 字 · 手机上基本能完整显示`,
      bad:
        len === 0
          ? "还没写呢 —— 主题行是收件人唯一先看到的东西"
          : `长度 ${len} 字 · 偏长，手机收件箱大概会从中间截断`,
    },
    {
      ok: capsRatio < 0.5,
      good: "大小写正常 · 读起来像个人写的",
      bad: "一堆大写字母 · 像在喊，也更容易被当成垃圾邮件",
    },
    {
      ok: bangs <= 1,
      good: bangs === 1 ? "一个感叹号 · 还行，有点精神" : "没有感叹号 · 冷静、可信",
      bad: `${bangs} 个感叹号 · 用力过猛，热情会贬值`,
    },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--ra-space-4)",
      }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="把你的主题行敲进来试试…"
        aria-label="主题行输入"
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "0.7em 0.9em",
          fontFamily: "var(--ra-font-body)",
          fontSize: "var(--ra-text-base)",
          color: "var(--ra-color-heading)",
          background: "var(--ra-color-bg)",
          border: "2px solid var(--ra-color-heading)",
          borderRadius: "var(--ra-radius-md)",
        }}
      />
      {/* a mock inbox row — what the subject actually looks like in the wild */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "var(--ra-space-3)",
          padding: "var(--ra-space-3) var(--ra-space-4)",
          border: "1px solid var(--ra-color-border)",
          borderRadius: "var(--ra-radius-md)",
          background: "var(--ra-color-surface)",
        }}
      >
        <span
          style={{
            fontWeight: "var(--ra-weight-bold)",
            color: "var(--ra-color-heading)",
            flex: "none",
          }}
        >
          你的品牌
        </span>
        <span
          style={{
            color: "var(--ra-color-text)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {text || "（空主题行）"}
        </span>
        <span
          style={{
            marginLeft: "auto",
            flex: "none",
            fontFamily: "var(--ra-font-mono)",
            fontSize: "var(--ra-text-xs)",
            color: "var(--ra-color-faint)",
          }}
        >
          现在
        </span>
      </div>
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "var(--ra-space-2)",
        }}
      >
        {checks.map((c, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.6em",
              fontSize: "var(--ra-text-sm)",
              color: "var(--ra-color-text)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                flex: "none",
                width: "1.4em",
                height: "1.4em",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "var(--ra-radius-full)",
                background: c.ok ? "var(--mc-yellow)" : "transparent",
                border: c.ok
                  ? "1px solid var(--ra-color-heading)"
                  : "1px solid var(--ra-color-border-strong)",
                color: "var(--ra-color-heading)",
                fontWeight: "var(--ra-weight-bold)",
                fontSize: "0.8em",
              }}
            >
              {c.ok ? "✓" : "·"}
            </span>
            <span>{c.ok ? c.good : c.bad}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** §subject — a side-by-side gallery of subject lines that work vs. don't. */
function SubjectGallery() {
  const cols = [
    {
      tone: "good" as const,
      head: "会被点开",
      items: [
        ["具体", "3 个改动让构建快了一半"],
        ["像人说话", "我们搞砸了，跟你说一声"],
        ["接着上次", "你上周收藏的那篇，更新了"],
      ],
    },
    {
      tone: "bad" as const,
      head: "会被划过",
      items: [
        ["空泛", "本周资讯速递"],
        ["像公文", "关于服务变更的重要通知"],
        ["用力过猛", "🔥 不要错过！！！"],
      ],
    },
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "var(--ra-space-4)",
      }}
    >
      {cols.map((c) => {
        const good = c.tone === "good";
        return (
          <div
            key={c.head}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--ra-space-3)",
              padding: "var(--ra-space-4)",
              borderRadius: "var(--ra-radius-md)",
              border: good
                ? "1px solid var(--ra-color-heading)"
                : "1px dashed var(--ra-color-border-strong)",
              background: good ? "var(--ra-color-accent-soft)" : "transparent",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4em",
                fontFamily: "var(--ra-font-label)",
                fontSize: "var(--ra-text-xs)",
                letterSpacing: "var(--ra-tracking-caps)",
                textTransform: "uppercase",
                fontWeight: "var(--ra-weight-bold)",
                color: good ? "var(--ra-color-heading)" : "var(--ra-color-faint)",
              }}
            >
              {good ? "✓" : "✕"} {c.head}
            </span>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "var(--ra-space-3)",
              }}
            >
              {c.items.map(([tag, line]) => (
                <li
                  key={line}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.2em",
                  }}
                >
                  <span
                    style={{
                      fontSize: "var(--ra-text-xs)",
                      color: "var(--ra-color-faint)",
                    }}
                  >
                    {tag}
                  </span>
                  <span
                    style={{
                      color: good ? "var(--ra-color-heading)" : "var(--ra-color-muted)",
                      textDecoration: good ? "none" : "line-through",
                      textDecorationColor: "var(--ra-color-border-strong)",
                    }}
                  >
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/** §content — anatomy of an email that does exactly one job. */
function EmailAnatomy() {
  const parts = [
    { label: "发件人", body: "一个你认得的名字", note: "先建立信任" },
    { label: "主题行", body: "一句话说清这是什么", note: "决定打不打开" },
    { label: "正文", body: "一件事，讲明白就停笔", note: "克制住「再补一点」的冲动" },
    { label: "行动", body: "唯一的那个按钮", note: "只留一个", cta: true },
  ];
  return (
    <div
      style={{
        maxWidth: "30rem",
        margin: "0 auto",
        border: "1px solid var(--ra-color-border-strong)",
        borderRadius: "var(--ra-radius-lg)",
        overflow: "hidden",
      }}
    >
      {parts.map((p, i) => (
        <div
          key={p.label}
          style={{
            display: "grid",
            gridTemplateColumns: "4.5rem 1fr",
            gap: "var(--ra-space-3)",
            alignItems: "center",
            padding: "var(--ra-space-3) var(--ra-space-4)",
            borderTop: i === 0 ? "none" : "1px solid var(--ra-color-border)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--ra-font-label)",
              fontSize: "var(--ra-text-xs)",
              letterSpacing: "var(--ra-tracking-wide)",
              textTransform: "uppercase",
              color: "var(--ra-color-faint)",
            }}
          >
            {p.label}
          </span>
          <span
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              gap: "0.5em 0.8em",
            }}
          >
            {p.cta ? (
              <span
                style={{
                  display: "inline-block",
                  padding: "0.45em 1em",
                  background: "var(--mc-yellow)",
                  color: "var(--ra-color-heading)",
                  fontWeight: "var(--ra-weight-bold)",
                  border: "1px solid var(--ra-color-heading)",
                  borderRadius: "var(--ra-radius-md)",
                }}
              >
                {p.body}
              </span>
            ) : (
              <span style={{ color: "var(--ra-color-heading)" }}>{p.body}</span>
            )}
            <span
              style={{
                fontSize: "var(--ra-text-xs)",
                color: "var(--ra-color-muted)",
              }}
            >
              ← {p.note}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

/** §content — drag up the number of CTAs and watch each one's share collapse. */
function CtaDilution() {
  const [n, setN] = useState(4);
  const share = Math.round(100 / n);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--ra-space-4)",
      }}
    >
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--ra-space-3)",
          fontSize: "var(--ra-text-sm)",
          color: "var(--ra-color-text)",
        }}
      >
        <span style={{ flex: "none" }}>按钮数量</span>
        <input
          type="range"
          min={1}
          max={5}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          aria-label="按钮数量"
          style={{ flex: 1, accentColor: "var(--ra-color-heading)" }}
        />
        <span
          style={{
            flex: "none",
            fontFamily: "var(--ra-font-mono)",
            fontWeight: "var(--ra-weight-bold)",
            color: "var(--ra-color-heading)",
          }}
        >
          {n}
        </span>
      </label>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--ra-space-2)",
        }}
      >
        {Array.from({ length: n }).map((_, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.2em",
              padding: "0.5em 0.9em",
              borderRadius: "var(--ra-radius-md)",
              border: "1px solid var(--ra-color-heading)",
              background: i === 0 ? "var(--mc-yellow)" : "var(--ra-color-surface)",
              color: "var(--ra-color-heading)",
              opacity: i === 0 ? 1 : 0.55,
            }}
          >
            <span style={{ fontWeight: "var(--ra-weight-bold)" }}>
              {i === 0 ? "主行动" : "次要"}
            </span>
            <span
              style={{
                fontFamily: "var(--ra-font-mono)",
                fontSize: "var(--ra-text-xs)",
              }}
            >
              ~{share}%
            </span>
          </span>
        ))}
      </div>
      <p
        style={{
          margin: 0,
          fontSize: "var(--ra-text-sm)",
          color: "var(--ra-color-muted)",
        }}
      >
        {n === 1
          ? "一个按钮，全部注意力都落在它身上。这就是你想要的样子。"
          : `注意力被平摊了：每个按钮平均只剩 ~${share}%，连最重要的那个也被拖累。`}
      </p>
    </div>
  );
}

/** §timing — a week × daypart heat grid; warmer = a better default window. */
function SendTimeGrid() {
  const days = ["一", "二", "三", "四", "五", "六", "日"];
  const rows: { slot: string; heat: number[] }[] = [
    { slot: "上午", heat: [3, 2, 3, 2, 2, 1, 1] },
    { slot: "午后", heat: [2, 2, 2, 2, 1, 1, 1] },
    { slot: "傍晚", heat: [2, 2, 2, 3, 2, 2, 2] },
    { slot: "深夜", heat: [0, 0, 0, 0, 0, 0, 0] },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--ra-space-2)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3rem repeat(7, 1fr)",
          gap: "4px",
          alignItems: "center",
        }}
      >
        <span />
        {days.map((d) => (
          <span
            key={d}
            style={{
              textAlign: "center",
              fontFamily: "var(--ra-font-label)",
              fontSize: "var(--ra-text-xs)",
              color: "var(--ra-color-faint)",
            }}
          >
            {d}
          </span>
        ))}
        {rows.map((r) => (
          <RowCells key={r.slot} slot={r.slot} heat={r.heat} />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5em",
          fontSize: "var(--ra-text-xs)",
          color: "var(--ra-color-faint)",
        }}
      >
        <span>较冷清</span>
        {[0, 1, 2, 3].map((v) => (
          <span
            key={v}
            aria-hidden="true"
            style={{
              width: "1.1em",
              height: "1.1em",
              borderRadius: "var(--ra-radius-sm)",
              border: "1px solid var(--ra-color-border)",
              background: `color-mix(in srgb, var(--mc-yellow) ${v * 30}%, var(--ra-color-surface))`,
            }}
          />
        ))}
        <span>更值得一试</span>
      </div>
    </div>
  );
}

function RowCells({ slot, heat }: { slot: string; heat: number[] }) {
  return (
    <>
      <span
        style={{
          fontFamily: "var(--ra-font-label)",
          fontSize: "var(--ra-text-xs)",
          color: "var(--ra-color-muted)",
        }}
      >
        {slot}
      </span>
      {heat.map((v, i) => (
        <span
          key={i}
          title={`${slot} · 强度 ${v}`}
          style={{
            height: "1.8rem",
            borderRadius: "var(--ra-radius-sm)",
            border: "1px solid var(--ra-color-border)",
            background: `color-mix(in srgb, var(--mc-yellow) ${v * 30}%, var(--ra-color-surface))`,
          }}
        />
      ))}
    </>
  );
}

/* ============================================================================
 * Cover — Template B (大字盖图) · 一个手作感的暖黄信封 + 超大 Fraunces 标题。
 * 视觉主体：一只略微歪斜的大信封（开了封口，露出一截黄色信纸），盖着一枚 “@”
 * 蜡封、左下角是 “NO. 01 · FIRST EDITION” 邮戳，正面有手写体的收件人地址；
 * 下方压一行特别大的 “你好，第一次。”（“第一次” 自带 freddie 的荧光笔抹色）。
 *
 * 内部全部用 % / em / inset / grid 撑起，SVG 用 viewBox + width="100%"，
 * 不写任何 px 坐标，所以屏幕 3:4 → A4 / Letter 整页时不会错位。
 * ============================================================================ */
function FirstNewsletterCover() {
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
      {/* ── Layer 0 · 极淡的暖色点阵底，像一张 Mailchimp 的便签纸 ── */}
      <svg
        viewBox="0 0 1200 1600"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          color: "var(--ra-color-border, currentColor)",
          opacity: 0.7,
          zIndex: 0,
        }}
      >
        <defs>
          <pattern
            id="fn-cover-dots"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.4" fill="currentColor" opacity="0.55" />
          </pattern>
        </defs>
        <rect width="1200" height="1600" fill="url(#fn-cover-dots)" />
      </svg>

      {/* ── Layer 1 · 主视觉：一只手作感的大信封 ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          padding:
            "var(--ra-space-6, 2rem) var(--ra-space-6, 2rem) var(--ra-space-7, 3rem) var(--ra-space-6, 2rem)",
        }}
      >
        {/* 顶 · 小标签条 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--ra-space-3, 0.75rem)",
            fontFamily: "var(--ra-font-label)",
            fontSize: "var(--ra-text-xs)",
            letterSpacing: "var(--ra-tracking-caps, 0.08em)",
            textTransform: "uppercase",
            color: "var(--ra-color-muted, inherit)",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5em",
              padding: "0.18em 0.55em",
              background: "var(--mc-yellow)",
              color: "var(--ra-color-heading)",
              borderRadius: "var(--ra-radius-sm)",
              fontWeight: "var(--ra-weight-bold)",
              transform: "rotate(-2deg)",
              letterSpacing: "var(--ra-tracking-wide, 0.02em)",
            }}
          >
            上手指南 · No. 01
          </span>
          <span style={{ fontWeight: "var(--ra-weight-medium)" }}>
            Freddie · 暖黄
          </span>
        </div>

        {/* 中 · 信封（占据中部主区域） */}
        <div
          style={{
            position: "relative",
            display: "grid",
            placeItems: "center",
            padding: "var(--ra-space-5, 1.5rem) 0",
          }}
        >
          <svg
            viewBox="0 0 800 560"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            style={{
              width: "100%",
              maxWidth: "92%",
              height: "auto",
              display: "block",
              transform: "rotate(-3.2deg)",
              filter: "drop-shadow(0 1px 0 var(--ra-color-border))",
            }}
          >
            {/* 信封主体 */}
            <g>
              {/* 信封背面 / 信纸（先画在下面，露出一截） */}
              <g transform="translate(60 90)">
                <rect
                  x="0"
                  y="0"
                  width="680"
                  height="440"
                  rx="14"
                  fill="var(--mc-yellow)"
                  stroke="var(--ra-color-heading)"
                  strokeWidth="3"
                />
                {/* 信纸上的几行手写感横线 */}
                {[80, 130, 180, 230, 280].map((y) => (
                  <line
                    key={y}
                    x1="60"
                    y1={y}
                    x2={y === 280 ? 360 : 600}
                    y2={y}
                    stroke="var(--ra-color-heading)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.55"
                  />
                ))}
                {/* 信纸右下角小签名 */}
                <path
                  d="M 480 360 q 30 -18 60 0 t 60 0"
                  fill="none"
                  stroke="var(--ra-color-heading)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </g>

              {/* 信封正面（白纸） */}
              <rect
                x="40"
                y="120"
                width="720"
                height="400"
                rx="14"
                fill="var(--ra-color-bg)"
                stroke="var(--ra-color-heading)"
                strokeWidth="4"
              />

              {/* 收件人地址 — 手写感的横线 + “TO:” 标签 */}
              <g transform="translate(80 200)">
                <text
                  x="0"
                  y="0"
                  fontFamily="var(--ra-font-label)"
                  fontSize="20"
                  fontWeight="700"
                  letterSpacing="3"
                  fill="var(--ra-color-muted)"
                >
                  TO:
                </text>
                <line
                  x1="60"
                  y1="-4"
                  x2="540"
                  y2="-4"
                  stroke="var(--ra-color-heading)"
                  strokeWidth="3"
                  opacity="0.85"
                />
                <text
                  x="60"
                  y="40"
                  fontFamily="var(--ra-font-heading)"
                  fontSize="32"
                  fontWeight="700"
                  fill="var(--ra-color-heading)"
                >
                  你的第一位订阅者
                </text>
                <line
                  x1="0"
                  y1="80"
                  x2="540"
                  y2="80"
                  stroke="var(--ra-color-border-strong)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                <line
                  x1="0"
                  y1="120"
                  x2="380"
                  y2="120"
                  stroke="var(--ra-color-border-strong)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
              </g>

              {/* 左下角 · 邮戳：NO.01 FIRST EDITION */}
              <g transform="translate(110 430) rotate(-8)">
                <rect
                  x="-6"
                  y="-26"
                  width="200"
                  height="56"
                  rx="6"
                  fill="none"
                  stroke="var(--ra-color-heading)"
                  strokeWidth="3"
                  opacity="0.85"
                />
                <text
                  x="94"
                  y="-6"
                  textAnchor="middle"
                  fontFamily="var(--ra-font-label)"
                  fontSize="16"
                  fontWeight="700"
                  letterSpacing="2"
                  fill="var(--ra-color-heading)"
                >
                  FIRST EDITION
                </text>
                <text
                  x="94"
                  y="18"
                  textAnchor="middle"
                  fontFamily="var(--ra-font-mono)"
                  fontSize="14"
                  fontWeight="700"
                  letterSpacing="3"
                  fill="var(--ra-color-heading)"
                >
                  NO. 01 · 2026
                </text>
              </g>

              {/* 右下角 · 邮票位 */}
              <g transform="translate(620 380)">
                <rect
                  x="0"
                  y="0"
                  width="120"
                  height="120"
                  rx="4"
                  fill="var(--ra-color-bg)"
                  stroke="var(--ra-color-heading)"
                  strokeWidth="3"
                  strokeDasharray="4 4"
                />
                <text
                  x="60"
                  y="58"
                  textAnchor="middle"
                  fontFamily="var(--ra-font-heading)"
                  fontSize="44"
                  fontWeight="800"
                  fill="var(--ra-color-heading)"
                >
                  1
                </text>
                <text
                  x="60"
                  y="86"
                  textAnchor="middle"
                  fontFamily="var(--ra-font-label)"
                  fontSize="12"
                  fontWeight="700"
                  letterSpacing="2"
                  fill="var(--ra-color-muted)"
                >
                  HELLO
                </text>
              </g>

              {/* 翻起来的封口三角（盖在正面上方） */}
              <path
                d="M 40 120 L 400 -10 L 760 120 Z"
                fill="var(--mc-yellow)"
                stroke="var(--ra-color-heading)"
                strokeWidth="4"
                strokeLinejoin="round"
                transform="translate(0 30) rotate(-12 400 60)"
              />

              {/* "@" 蜡封 · 圆形印章压在封口中央偏下 */}
              <g transform="translate(400 140)">
                <circle
                  cx="0"
                  cy="0"
                  r="48"
                  fill="var(--ra-color-heading)"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="40"
                  fill="none"
                  stroke="var(--mc-yellow)"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />
                <text
                  x="0"
                  y="14"
                  textAnchor="middle"
                  fontFamily="var(--ra-font-heading)"
                  fontSize="48"
                  fontWeight="800"
                  fill="var(--mc-yellow)"
                >
                  @
                </text>
              </g>

              {/* 一支手绘箭头 —— 从蜡封戳向标题 */}
              <g transform="translate(560 70)">
                <path
                  d="M 0 0 q 60 40 30 110"
                  fill="none"
                  stroke="var(--ra-color-heading)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M 24 102 L 30 118 L 42 108"
                  fill="none"
                  stroke="var(--ra-color-heading)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text
                  x="-6"
                  y="-8"
                  fontFamily="var(--ra-font-heading)"
                  fontSize="20"
                  fontStyle="normal"
                  fontWeight="700"
                  fill="var(--ra-color-heading)"
                >
                  封好了，就按发送
                </text>
              </g>
            </g>
          </svg>
        </div>

        {/* 底 · 超大 Fraunces 标题（盖图） */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "var(--ra-space-2, 0.5rem)",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--ra-font-heading)",
              fontVariationSettings: '"SOFT" 50, "WONK" 1',
              fontWeight: "var(--ra-weight-bold, 700)",
              fontSize: "clamp(2.6rem, 11vw, 5.6rem)",
              lineHeight: 0.95,
              letterSpacing: "var(--ra-tracking-tighter, -0.02em)",
              color: "var(--ra-color-heading)",
            }}
          >
            <span style={{ display: "block" }}>你好，</span>
            <span
              style={{
                display: "inline-block",
                padding: "0 0.12em",
                background:
                  "linear-gradient(transparent 56%, var(--mc-yellow) 56%)",
              }}
            >
              第一次。
            </span>
          </h1>
          <p
            style={{
              margin: 0,
              maxWidth: "82%",
              fontFamily: "var(--ra-font-body)",
              fontSize: "clamp(0.95rem, 2vw, var(--ra-text-lg))",
              lineHeight: 1.35,
              color: "var(--ra-color-muted)",
              fontWeight: "var(--ra-weight-medium)",
            }}
          >
            把 “发出去也没人理” 拆成 几个 能动手 的 小判断 ——
            <span style={{ color: "var(--ra-color-heading)" }}>
              {" "}主题行 · 内容 · 时机 · 看数字。
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/** freddie · 上手指南 */
export function FirstNewsletter() {
  return (
    <>
      <FirstNewsletterCover />
      <Article toc width="regular">
      <Hero
        eyebrow="上手指南 · Newsletter"
        title="第一封 Newsletter：一份不端着的上手指南"
        subtitle="没人天生会写邮件。这篇把“发出去也没人理”拆成几个能动手解决的小问题——主题行、内容、时机、看数字，外加怎么把它做成一个不靠意志力的习惯。"
        meta={[
          { label: "适合", value: "第一次做邮件的人" },
          { label: "读完", value: "约 11 分钟" },
        ]}
      />

      <Lead>
        你大概也收到过那种邮件：标题在喊、正文塞了五件事、底部还有八个按钮，然后你一个都没点。做 Newsletter
        最容易犯的错，不是文笔不好，而是<strong>太想一次说完</strong>。这篇不谈玄学，也不灌“涨粉秘籍”——我们就把一封邮件
        从被看到、被打开、到被点击，一段一段拆开，每一段都给你一个能立刻动手的小判断；最后再聊聊怎么把这件事坚持下去。
      </Lead>

      <Section index="01" title="先认清一个残酷的漏斗">
        <p>
          在纠结措辞之前，先看清你在跟什么较劲。一封邮件发出去，会经过一连串“打折”：能送达的比发出的少，
          会打开的比送达的少，真去点链接的又少一截。下面这个漏斗是个示意——数字会因行业、列表质量差很多，
          但<strong>形状</strong>到哪儿都一样：每往下一层，都在大幅缩水。
        </p>
        <Raw title="一次发送的漏斗：每一层都在打折">
          <SendFunnel />
        </Raw>
        <p>
          看懂这个形状，你就知道力气该花在哪：决定“打开”那一层的，几乎只有<strong>主题行</strong>；决定“点击”
          那一层的，是<strong>内容本身</strong>。剩下的花哨功能，大多在和这两件事抢注意力。这篇接下来的顺序，
          就是顺着漏斗从上往下走。
        </p>
        <Aside tone="principle" label="一个心法">
          一封邮件只干一件事。你想让读者读完之后做什么？把那件事想清楚，其它全是干扰项，能砍就砍。
        </Aside>
      </Section>

      <Section index="02" title="主题行：唯一被先看到的东西">
        <p>
          收件人决定要不要打开时，手里的信息少得可怜：一个发件人名字、一行被截断的主题、可能还有半句预览。
          所以主题行不是“标题”，它是<strong>一句话的电梯游说</strong>。把你的主题行敲进下面这个小体检里，
          它会照着收件箱里的真实样子给你三条诚实的反馈：
        </p>
        <Raw title="主题行体检：照着收件箱的样子给你说实话">
          <SubjectLineTester />
        </Raw>
        <p>
          它检查的就是最常翻车的三件事：太长会被截、全大写像在喊、感叹号一多就显得用力过猛。这些不是铁律，
          而是默认值——你当然可以为了风格故意打破，但得知道自己在打破什么。把抽象的“好主题行”落到具体例子上，
          差别会更直观：
        </p>
        <Raw title="同一件事，两种写法">
          <SubjectGallery />
        </Raw>
        <p>
          左边那些不是因为“技巧高”，而是因为它们<strong>具体、像人话、只承诺一件事</strong>。右边那些的通病也一样：
          想讨好所有人，结果谁都没被打动。
        </p>
        <Aside tone="warning" label="别耍小聪明">
          用“Re:”假装是回复、用“⚠️ 账户异常”制造恐慌——这类标题骗得到一次打开，却赔掉长期信任，还可能直接进
          垃圾箱。短期好看的数字，常常是长期信誉的预支。
        </Aside>
      </Section>

      <Section index="03" title="内容：一封邮件，一个任务">
        <p>
          打开之后，读者的耐心以秒计。这时最该做的不是“多给点价值”，而是<strong>少给点选择</strong>。一封好邮件
          的结构往往很笨，笨得可靠——它长这样：
        </p>
        <Raw title="一封只干一件事的邮件，长什么样">
          <EmailAnatomy />
        </Raw>
        <p>
          每一层都在为那个唯一的按钮服务：发件人换来信任，主题行换来打开，正文把一件事讲清楚，然后——不要犹豫——
          只给一个出口。
        </p>
        <Subsection index="3.1" title="把“一个行动”当成纪律">
          <p>
            每多一个按钮，每个按钮被点的概率就被稀释一次。下面这个小滑块能让你亲手感受这种稀释：拖动它，看每个按钮
            分到的注意力是怎么塌下去的。
          </p>
          <Raw title="按钮越多，每个越没人点">
            <CtaDilution />
          </Raw>
          <p>
            与其给“了解更多 / 立即购买 / 关注我们 / 加入社群”四个并列选项，不如只留最重要的那一个，其余降级成正文里
            的一句普通链接。选择越少，转化越高——这反直觉，但屡试不爽。
          </p>
          <Quote who="一条被反复验证的经验">
            如果一封邮件让读者需要“决定先点哪个”，那它其实已经输了一半。
          </Quote>
        </Subsection>
        <Subsection index="3.2" title="像写给一个人，而不是一群人">
          <p>
            “各位用户”是写给名单的，“你”是写给人的。把群发的腔调换成一对一的口吻，邮件会立刻不一样——这也是
            为什么很多做得好的 Newsletter 读起来像朋友发来的消息，而不是公司发来的通告。写之前可以先想象一个具体的
            收件人：他为什么订阅你？他现在最想知道什么？写给他一个人，反而所有人都更爱读。
          </p>
        </Subsection>
      </Section>

      <Section index="04" title="时机：什么时候按下发送">
        <p>
          发送时间有影响，但远没有“内容”重要——别为了纠结几点发而拖到内容都凉了。下面这张“热力图”是常被引用的
          <strong>起点</strong>，不是定律：颜色越深，通常越值得一试；但真正靠谱的时间，永远是你自己测出来的。
        </p>
        <Raw title="一周里的发送窗口：深色更值得一试（仅供起步参考）">
          <SendTimeGrid />
        </Raw>
        <p>
          注意最底下那一行：深夜几乎永远是更糟的选择，除非你的人群确实昼伏夜出。其余时段的差别，往往小到不值得你
          反复纠结——把那点纠结的精力，留给内容本身。
        </p>
        <Aside tone="note" label="顺带一提">
          频率比单次时机更影响长期留存。稳定的“每周三上午”，几乎总是好过“想起来才发一次”的随缘更新——可预期本身
          就是一种尊重。
        </Aside>
      </Section>

      <Section index="05" title="看数字，但别上头">
        <p>
          发完别急着盯打开率傻乐，也别因为一次低谷就慌。先搞清楚每个数字到底在说什么、又不能说明什么。下面这张表
          是全文唯一一张表——因为它确实是张表：把几个常看的指标摊开，顺便附上“它骗不了你的地方”。
        </p>
        <Table
          caption="常看的几个指标，以及它们的脾气"
          columns={[
            { key: "m", label: "指标", width: "9rem" },
            { key: "mean", label: "在说什么" },
            { key: "trap", label: "别被它骗" },
          ]}
          rows={[
            {
              m: "打开率",
              mean: "主题行 + 发件人是否值得点开",
              trap: "受隐私保护、预加载影响，越来越虚高",
            },
            {
              m: "点击率",
              mean: "内容是否真的让人想行动",
              trap: "比打开率诚实得多，更值得盯",
            },
            {
              m: "退订率",
              mean: "你是不是发太多 / 跑题了",
              trap: "小幅退订是健康的——名单在自我提纯",
            },
            {
              m: "回信 / 回复",
              mean: "几乎没人量化，却最接近“真感情”",
              trap: "一封真诚回信，胜过一百次匿名打开",
            },
          ]}
        />
        <p>几个第一次做邮件的人最常问的小问题，放在这儿随手展开：</p>
        <Detail summary="列表很小（比如只有 50 个人），值得发吗？">
          <p style={{ margin: 0 }}>
            值得，而且正是最好的练习期。50 个愿意留邮箱的人，比 5000 个买来的地址金贵得多。小列表还有个奢侈的好处：
            你几乎可以给每个人回信，这种连接在列表变大后就再难复制了。
          </p>
        </Detail>
        <Detail summary="打开率一直在掉，是不是我写得不好？">
          <p style={{ margin: 0 }}>
            不一定。近年的邮箱隐私机制让打开率整体失真，趋势比绝对值更可信。与其盯着打开率焦虑，不如看点击率和回复——
            那才是“内容有没有打动人”的诚实信号。
          </p>
        </Detail>
        <Detail summary="多久发一次才合适？">
          <p style={{ margin: 0 }}>
            能稳定持续的频率，就是合适的频率。每周一次很好，每月一次也完全可以；最差的是忽冷忽热。先承诺一个你扛得住
            的节奏，再谈优化。
          </p>
        </Detail>
      </Section>

      <Section index="06" title="把它做成一个不靠意志力的习惯">
        <p>
          做 Newsletter 真正的难点，从来不是写一封，而是写第五十封。前几封靠新鲜感就能撑过去，但热情会退潮——
          能接住你的，只有一套不依赖心情的<strong>流程</strong>。
        </p>
        <Subsection index="6.1" title="留一个永远在收东西的素材箱">
          <p>
            灵感不会在你坐下来写的那一刻准时到。平时随手把看到的好链接、读者的一句提问、自己冒出来的念头都丢进同一个
            地方——备忘录、文档、随便什么。等到要写时，你面对的不是空白页，而是一堆可以挑的原料。空白页才是真正的敌人。
          </p>
        </Subsection>
        <Subsection index="6.2" title="把一封邮件拆成可重复的几步">
          <p>
            把“写邮件”这件大事，拆成几个小到不吓人的动作：定一个主题、列三个要点、写出来、改一遍、检查那个唯一的按钮、
            发送。流程化之后，你每次只需要执行，而不必每次都重新发明该怎么做。
          </p>
        </Subsection>
        <Aside tone="capability" label="可以放心做的事">
          允许自己发一封“不够完美”的邮件。已发送的、还行的一封，价值远高于你脑子里那封永远在打磨、永远没发出去的杰作。
          坚持下去的人，靠的不是每封都惊艳，而是每封都准时。
        </Aside>
      </Section>

      <Conclusion
        title="一句话收尾"
        takeaways={[
          "看清漏斗：打开靠主题行，点击靠内容，其余多是干扰。",
          "一封邮件只干一件事；像写给一个人，而不是一群人。",
          "时机和频率求“稳定可预期”，胜过求“最优时刻”。",
          "盯点击率和回复，别被失真的打开率牵着走。",
          "用流程而不是意志力，把第一封变成第五十封。",
        ]}
      >
        做 Newsletter 没有秘籍，只有一堆能反复练习的小判断。你不需要第一封就完美——你只需要发出第一封，然后诚实地
        看它表现如何、改一点、再发下一封。能把这件事稳定做下去的人，最后都赢了；而这件事的门槛，低到只是“现在就开始”。
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
          · freddie theme
        </footer>
      </Raw>
      </Article>
    </>
  );
}
