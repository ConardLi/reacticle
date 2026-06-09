import { useEffect, useState } from "react";
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
 * An `andy` (Headspace) wellness explainer on box breathing. The body carries
 * the calm, plain-language science; several Raw specimens make it felt rather
 * than just read — a nervous-system seesaw, an inhale/exhale comparison, a literal
 * box-path square, an interactive breathing pacer (the signature move), and a soft
 * gallery of moments. Everything is drawn in --ra-* tokens (with the theme's
 * --hs-orange signature), so it stays soft, rounded and warm, and switches with
 * the theme. Exactly one real Table; the mood is unhurried, nothing shouts.
 */

const CYCLE = [
  { name: "吸气", secs: 4 },
  { name: "屏息", secs: 4 },
  { name: "呼气", secs: 4 },
  { name: "屏息", secs: 4 },
] as const;
const TOTAL = CYCLE.reduce((a, p) => a + p.secs, 0);

/** §why — inhale tips toward alertness, exhale toward calm. */
function NervousSeesaw() {
  const ends = [
    { label: "吸气", role: "交感 · 微微提神", align: "flex-start" as const },
    { label: "呼气", role: "副交感 · 慢下来", align: "flex-end" as const },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--ra-space-4)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "var(--ra-space-4)",
        }}
      >
        {ends.map((e) => (
          <div
            key={e.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: e.align === "flex-start" ? "flex-start" : "flex-end",
              gap: "0.3em",
            }}
          >
            <span
              style={{
                padding: "0.3em 0.9em",
                borderRadius: "var(--ra-radius-full)",
                background: "var(--hs-orange-soft)",
                color: "var(--ra-color-accent-strong)",
                fontFamily: "var(--ra-font-heading)",
                fontWeight: "var(--ra-weight-bold)",
                fontSize: "var(--ra-text-sm)",
              }}
            >
              {e.label}
            </span>
            <span
              style={{ fontSize: "var(--ra-text-sm)", color: "var(--ra-color-muted)" }}
            >
              {e.role}
            </span>
          </div>
        ))}
      </div>
      {/* the beam: a soft bar tipped gently toward calm (exhale longer) */}
      <div
        style={{
          position: "relative",
          height: "10px",
          borderRadius: "var(--ra-radius-full)",
          background:
            "linear-gradient(90deg, var(--ra-color-surface-2), var(--hs-orange))",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "12%",
            top: "-7px",
            width: "24px",
            height: "24px",
            borderRadius: "var(--ra-radius-full)",
            background: "var(--ra-color-bg)",
            border: "3px solid var(--hs-orange)",
            boxShadow: "var(--ra-shadow-sm)",
          }}
        />
      </div>
      <p
        style={{
          margin: 0,
          fontSize: "var(--ra-text-sm)",
          color: "var(--ra-color-muted)",
          lineHeight: "var(--ra-leading-normal)",
        }}
      >
        吸气时身体略微调动；呼气时副交感神经接管，心率放缓。把呼气拉得比吸气更长、更慢，就是在把这根杆子，
        温柔地往“平静”那头压。
      </p>
    </div>
  );
}

/** §why — two soft bars: a longer exhale than inhale is the whole trick. */
function ExhaleBar() {
  const items = [
    { label: "吸气", secs: 4, strong: false },
    { label: "呼气", secs: 6, strong: true },
  ];
  const max = 6;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--ra-space-4)",
      }}
    >
      {items.map((it) => (
        <div
          key={it.label}
          style={{
            display: "grid",
            gridTemplateColumns: "3.5rem 1fr",
            alignItems: "center",
            gap: "var(--ra-space-3)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--ra-font-heading)",
              fontWeight: "var(--ra-weight-bold)",
              color: "var(--ra-color-heading)",
            }}
          >
            {it.label}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.7em" }}>
            <span
              style={{
                display: "block",
                height: "22px",
                width: `${(it.secs / max) * 100}%`,
                borderRadius: "var(--ra-radius-full)",
                background: it.strong
                  ? "var(--hs-orange)"
                  : "var(--hs-orange-soft)",
                boxShadow: it.strong ? "var(--ra-shadow-sm)" : "none",
              }}
            />
            <span
              style={{
                fontFamily: "var(--ra-font-mono)",
                fontSize: "var(--ra-text-sm)",
                color: "var(--ra-color-muted)",
              }}
            >
              {it.secs}s
            </span>
          </span>
        </div>
      ))}
      <p
        style={{
          margin: 0,
          fontSize: "var(--ra-text-sm)",
          color: "var(--ra-color-muted)",
          lineHeight: "var(--ra-leading-normal)",
        }}
      >
        哪怕只记住一件事，就记这个：让呼气比吸气长一点。比例不必精确，“慢慢吐得更久”就够了。
      </p>
    </div>
  );
}

/** §box — a literal square: four edges, four counts, walked clockwise. */
function BoxPath() {
  const edges = [
    { label: "吸气", style: { top: "-0.9em", left: "50%", transform: "translateX(-50%)" } },
    { label: "屏息", style: { top: "50%", right: "-0.9em", transform: "translateY(-50%)" } },
    { label: "呼气", style: { bottom: "-0.9em", left: "50%", transform: "translateX(-50%)" } },
    { label: "屏息", style: { top: "50%", left: "-0.9em", transform: "translateY(-50%)" } },
  ];
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "var(--ra-space-5) 0" }}>
      <div
        style={{
          position: "relative",
          width: "min(240px, 70%)",
          aspectRatio: "1 / 1",
          borderRadius: "var(--ra-radius-lg)",
          border: "3px solid var(--hs-orange)",
          background: "var(--hs-orange-soft)",
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.1em",
            color: "var(--ra-color-accent-strong)",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--ra-font-heading)",
              fontWeight: "var(--ra-weight-bold)",
              fontSize: "var(--ra-text-lg)",
            }}
          >
            4 · 4 · 4 · 4
          </span>
          <span style={{ fontSize: "var(--ra-text-xs)", color: "var(--ra-color-muted)" }}>
            顺时针走一圈
          </span>
        </span>
        {edges.map((e, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              padding: "0.25em 0.8em",
              borderRadius: "var(--ra-radius-full)",
              background: "var(--ra-color-bg)",
              border: "2px solid var(--hs-orange)",
              color: "var(--ra-color-heading)",
              fontFamily: "var(--ra-font-heading)",
              fontWeight: "var(--ra-weight-bold)",
              fontSize: "var(--ra-text-sm)",
              whiteSpace: "nowrap",
              boxShadow: "var(--ra-shadow-sm)",
              ...e.style,
            }}
          >
            {e.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/** §box — a circle that breathes with you on a 4·4·4·4 box rhythm. */
function BreathingPacer() {
  const [running, setRunning] = useState(false);
  const [t, setT] = useState(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setT((prev) => +((prev + 0.1) % TOTAL).toFixed(1));
    }, 100);
    return () => clearInterval(id);
  }, [running]);

  const phaseIndex = Math.min(Math.floor(t / 4), 3);
  const local = t - phaseIndex * 4;
  const progress = local / 4;
  const phase = CYCLE[phaseIndex]!;
  const remaining = Math.max(1, Math.ceil(4 - local));

  // 0.55 (emptied) ↔ 1 (full); hold phases sit at their endpoints.
  const scale =
    phaseIndex === 0
      ? 0.55 + 0.45 * progress
      : phaseIndex === 1
        ? 1
        : phaseIndex === 2
          ? 1 - 0.45 * progress
          : 0.55;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--ra-space-5)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "220px",
          height: "220px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* a soft track ring */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "var(--ra-radius-full)",
            border: "2px solid var(--ra-color-border)",
          }}
        />
        {/* the breathing disc */}
        <span
          aria-hidden="true"
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "var(--ra-radius-full)",
            background: "var(--hs-orange)",
            boxShadow: "var(--ra-shadow-md)",
            transform: `scale(${scale})`,
            transition: "transform 100ms linear",
            display: "block",
          }}
        />
        {/* the live phase label, centered */}
        <span
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.15em",
            color: "var(--ra-color-heading)",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--ra-font-heading)",
              fontSize: "var(--ra-text-xl)",
              fontWeight: "var(--ra-weight-bold)",
            }}
          >
            {running ? phase.name : "准备好了吗"}
          </span>
          {running ? (
            <span
              style={{
                fontFamily: "var(--ra-font-mono)",
                fontSize: "var(--ra-text-base)",
                color: "var(--ra-color-heading)",
              }}
            >
              {remaining}
            </span>
          ) : null}
        </span>
      </div>

      <button
        type="button"
        onClick={() => {
          if (running) {
            setRunning(false);
          } else {
            setT(0);
            setRunning(true);
          }
        }}
        aria-pressed={running}
        style={{
          padding: "0.6em 1.6em",
          fontFamily: "var(--ra-font-heading)",
          fontSize: "var(--ra-text-base)",
          fontWeight: "var(--ra-weight-bold)",
          color: running ? "var(--ra-color-accent-strong)" : "#ffffff",
          background: running ? "var(--hs-orange-soft)" : "var(--hs-orange)",
          border: "none",
          borderRadius: "var(--ra-radius-full)",
          boxShadow: running ? "none" : "var(--ra-shadow-sm)",
          cursor: "pointer",
          transition: "background var(--ra-transition)",
        }}
      >
        {running ? "停下来" : "跟着呼吸一轮"}
      </button>
      <p
        style={{
          margin: 0,
          maxWidth: "26rem",
          textAlign: "center",
          fontSize: "var(--ra-text-sm)",
          color: "var(--ra-color-muted)",
          lineHeight: "var(--ra-leading-normal)",
        }}
      >
        圆扩大时慢慢吸气，停住时轻轻屏息，缩小时缓缓呼气。不用追上它——让它陪着你就好。
      </p>
    </div>
  );
}

/** §day — soft rounded cards: good moments to slip in a round of breathing. */
function DayMoments() {
  const moments = [
    { when: "开会 / 上台之前", why: "把“紧张”重新解读成“专注”，手不抖了" },
    { when: "收到一条让你火大的消息", why: "在按下回复之前，给冲动留出一个缺口" },
    { when: "躺下却睡不着时", why: "拉长呼气，帮身体从清醒切到困倦" },
    { when: "从一件事切换到下一件", why: "清空上一段的残留，给注意力一个干净的开头" },
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "var(--ra-space-4)",
      }}
    >
      {moments.map((m, i) => (
        <div
          key={m.when}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--ra-space-2)",
            padding: "var(--ra-space-4) var(--ra-space-5)",
            borderRadius: "var(--ra-radius-lg)",
            background: "var(--ra-color-surface)",
            boxShadow: "var(--ra-shadow-sm)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: "2em",
              height: "2em",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "var(--ra-radius-full)",
              background: "var(--hs-orange-soft)",
              color: "var(--ra-color-accent-strong)",
              fontFamily: "var(--ra-font-heading)",
              fontWeight: "var(--ra-weight-bold)",
            }}
          >
            {i + 1}
          </span>
          <span
            style={{
              fontFamily: "var(--ra-font-heading)",
              fontWeight: "var(--ra-weight-bold)",
              color: "var(--ra-color-heading)",
            }}
          >
            {m.when}
          </span>
          <span style={{ fontSize: "var(--ra-text-sm)", color: "var(--ra-color-muted)" }}>
            {m.why}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Cover · 极简框（模板 E） · andy
 *  视觉主体：一个被柔光晕染的同心圆 + 4 个对角呼吸刻度（吸·屏·呼·屏），
 *  中央写 4·4·4·4，呼应正文盒式呼吸；标题"盒呼吸"刻意短，区别于 Hero 长题。
 *  全部 --ra-* token + --hs-orange（andy 签名），3:4 外壳保持不动。 */
function SlowBreathingCover() {
  const phases: Array<{
    label: string;
    cx: number;
    cy: number;
    tx: number;
    ty: number;
  }> = [
    { label: "吸", cx: 200, cy: 32, tx: 200, ty: 38 },
    { label: "屏", cx: 368, cy: 200, tx: 368, ty: 206 },
    { label: "呼", cx: 200, cy: 368, tx: 200, ty: 374 },
    { label: "屏", cx: 32, cy: 200, tx: 32, ty: 206 },
  ];
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
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          padding:
            "var(--ra-space-6, 2.2rem) var(--ra-space-7, 3.2rem) var(--ra-space-7, 3.2rem) var(--ra-space-7, 3.2rem)",
          gap: "var(--ra-space-4, 1.15rem)",
        }}
      >
        {/* 顶栏：左 pill / 右 主题刻字 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "var(--ra-space-3, 0.85rem)",
          }}
        >
          <span
            style={{
              padding: "0.38em 1em",
              borderRadius: "var(--ra-radius-full, 999px)",
              background: "var(--hs-orange-soft, var(--ra-color-accent-soft))",
              color: "var(--ra-color-accent-strong, var(--ra-color-accent))",
              fontFamily: "var(--ra-font-heading, inherit)",
              fontSize: "var(--ra-text-xs, 0.76rem)",
              fontWeight: "var(--ra-weight-bold, 700)",
              letterSpacing: "var(--ra-tracking-caps, 0.04em)",
            }}
          >
            练习 · 呼吸
          </span>
          <span
            style={{
              fontFamily: "var(--ra-font-heading, inherit)",
              fontSize: "var(--ra-text-xs, 0.76rem)",
              color: "var(--ra-color-muted, inherit)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Andy · 静谧
          </span>
        </div>

        {/* 中段：呼吸圆 */}
        <div
          style={{
            display: "grid",
            placeItems: "center",
            minHeight: 0,
          }}
        >
          <svg
            viewBox="0 0 400 400"
            preserveAspectRatio="xMidYMid meet"
            width="100%"
            aria-hidden="true"
            style={{
              display: "block",
              width: "100%",
              maxWidth: "min(100%, 22rem)",
              height: "auto",
            }}
          >
            <defs>
              <radialGradient
                id="sb-cover-glow"
                cx="50%"
                cy="50%"
                r="55%"
              >
                <stop
                  offset="0%"
                  stopColor="var(--hs-orange, var(--ra-color-accent))"
                  stopOpacity="0.32"
                />
                <stop
                  offset="55%"
                  stopColor="var(--hs-orange, var(--ra-color-accent))"
                  stopOpacity="0.1"
                />
                <stop
                  offset="100%"
                  stopColor="var(--hs-orange, var(--ra-color-accent))"
                  stopOpacity="0"
                />
              </radialGradient>
            </defs>

            {/* 柔晕填色 */}
            <circle cx="200" cy="200" r="155" fill="url(#sb-cover-glow)" />

            {/* 外圈虚线轨道 —— 暗示"绕一圈四边形" */}
            <circle
              cx="200"
              cy="200"
              r="150"
              fill="none"
              stroke="var(--ra-color-border-strong, var(--ra-color-border))"
              strokeWidth="0.9"
              strokeDasharray="2 5"
            />

            {/* 4 个同心环 = 4 拍 */}
            {[55, 82, 108, 134].map((r, i) => (
              <circle
                key={r}
                cx="200"
                cy="200"
                r={r}
                fill="none"
                stroke="var(--hs-orange, var(--ra-color-accent))"
                strokeOpacity={0.22 + i * 0.07}
                strokeWidth={i === 3 ? 1.6 : 0.9}
              />
            ))}

            {/* 中心读秒 */}
            <text
              x="200"
              y="198"
              textAnchor="middle"
              style={{
                fontFamily: "var(--ra-font-heading, inherit)",
                fontWeight: 700,
                fontSize: "30px",
                fill: "var(--ra-color-accent-strong, var(--ra-color-accent))",
                letterSpacing: "0.08em",
              }}
            >
              4·4·4·4
            </text>
            <text
              x="200"
              y="222"
              textAnchor="middle"
              style={{
                fontFamily: "var(--ra-font-heading, inherit)",
                fontWeight: 600,
                fontSize: "10px",
                fill: "var(--ra-color-muted, currentColor)",
                letterSpacing: "0.36em",
                textTransform: "uppercase",
              }}
            >
              seconds each
            </text>

            {/* 4 个对角刻度：吸 / 屏 / 呼 / 屏 */}
            {phases.map((p, i) => (
              <g key={`${p.label}-${i}`}>
                <circle
                  cx={p.cx}
                  cy={p.cy}
                  r="20"
                  fill="var(--hs-orange-soft, var(--ra-color-accent-soft))"
                />
                <text
                  x={p.tx}
                  y={p.ty}
                  textAnchor="middle"
                  style={{
                    fontFamily: "var(--ra-font-heading, inherit)",
                    fontWeight: 700,
                    fontSize: "16px",
                    fill: "var(--ra-color-accent-strong, var(--ra-color-accent))",
                  }}
                >
                  {p.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* 底部：标题 + 副题（≠ Hero 文字） */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--ra-space-2, 0.5rem)",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--ra-font-heading, inherit)",
              fontSize:
                "clamp(2rem, 6.4vw, var(--ra-text-4xl, 2.9rem))",
              fontWeight: "var(--ra-weight-bold, 700)",
              color: "var(--ra-color-heading, var(--ra-color-fg, inherit))",
              lineHeight: 1.05,
              letterSpacing: "0.32em",
              paddingLeft: "0.32em",
            }}
          >
            盒呼吸
          </h1>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--ra-font-body, inherit)",
              fontSize: "var(--ra-text-sm, 0.86rem)",
              color: "var(--ra-color-muted, inherit)",
              lineHeight: 1.55,
              maxWidth: "28ch",
            }}
          >
            四拍一循环 · 一分钟把自己放慢
          </p>
        </div>
      </div>
    </section>
  );
}

/** andy · 练习 */
export function SlowBreathing() {
  return (
    <>
      <SlowBreathingCover />
      <Article toc width="regular">
      <Hero
        eyebrow="练习 · 呼吸"
        title="把呼吸放慢：盒式呼吸与平静的神经科学"
        subtitle="紧张时，呼吸是少数你能立刻握住的开关。这篇用最朴素的话讲清它为什么有用，带你做一轮，再聊聊身体里到底发生了什么。"
        meta={[
          { label: "练习", value: "盒式呼吸 4·4·4·4" },
          { label: "需要", value: "一分钟、一张椅子" },
        ]}
      />

      <Lead>
        心跳、血压、消化这些事，平时都不归你管——它们交给自主神经系统自动运行。但有一个出口，是它和你共享的：
        呼吸。你既可以让它自己进行，也可以主动接管。正是这个小小的“共享方向盘”，让“刻意把呼吸放慢”成为一件
        在生理上真实有效、而非心理安慰的事。我们慢慢来。
      </Lead>

      <Section index="01" title="为什么慢呼吸能让你平静">
        <p>
          自主神经系统有两套相反的模式：交感神经负责“动起来”，副交感神经负责“缓下来”。紧张焦虑时，前者占上风——
          心跳加快、呼吸变浅。而呼吸的节奏，恰好能反过来影响这套系统：<strong>吸气时偏向兴奋，呼气时偏向平静</strong>。
          所以让呼气更长、更慢，等于在轻轻提示身体：现在是安全的，可以放松了。
        </p>
        <Raw title="呼吸这根杆子：往“平静”那头压一压">
          <NervousSeesaw />
        </Raw>
        <p>
          这也解释了一个很多人忽略的细节：真正起作用的，不是“深呼吸”，而是“长呼气”。所以如果你只想记住一件事，
          那就记住——<strong>吐气要比吸气更久一点</strong>。
        </p>
        <Raw title="关键不在吸得多，而在吐得久">
          <ExhaleBar />
        </Raw>
        <Aside tone="note" label="一个小提醒">
          这不是要你“控制”身体，而是借一个你本来就能动的开关，温和地引导它。做不到完美的节奏完全没关系——方向对了
          就有用。
        </Aside>
      </Section>

      <Section index="02" title="盒式呼吸：四拍一循环">
        <p>
          盒式呼吸（box breathing）是最好上手的一种：吸气、屏息、呼气、屏息，各四拍，像沿着一个正方形的四条边走一圈。
          它简单到可以闭着眼做，又足够规律，能很快把注意力从纷乱的念头收回到身体上。
        </p>
        <Raw title="盒式呼吸：沿着四条边，各走四拍">
          <BoxPath />
        </Raw>
        <p>先别急着记动作——跟着下面这个圆做一轮就好：它扩大时吸气，缩小时呼气。</p>
        <Raw title="呼吸引导：跟着圆，走一圈四边形">
          <BreathingPacer />
        </Raw>
        <Table
          caption="一个循环的四拍（各约 4 秒）"
          columns={[
            { key: "step", label: "这一拍", width: "8rem" },
            { key: "do", label: "做什么" },
            { key: "why", label: "在发生什么" },
          ]}
          rows={[
            { step: "吸气", do: "用鼻子缓缓吸满，肚子先鼓起来", why: "把空气送到肺底，膈肌下沉" },
            { step: "屏息", do: "轻轻停住，不要憋得难受", why: "给身体一个短暂的平衡点" },
            { step: "呼气", do: "用嘴或鼻慢慢吐尽，比吸气更慢", why: "副交感神经接管，心率下降" },
            { step: "屏息", do: "再停一拍，准备下一轮", why: "让节奏稳定成一个回路" },
          ]}
        />
        <Subsection index="2.1" title="如果四拍太勉强">
          <p>
            四秒不是圣旨。觉得憋气难受，就从三拍开始，甚至只做“吸气 4、呼气 6”、省掉屏息也完全可以——
            <strong>呼气比吸气长</strong>，才是关键。等身体习惯了，再慢慢把节奏拉长。舒服，永远比标准重要。
          </p>
          <Quote who="几乎所有冥想老师都会说的一句话">
            如果你发现自己走神了，那不是失败——注意到走神、再回到呼吸，这一来一回，本身就是练习。
          </Quote>
        </Subsection>
      </Section>

      <Section index="03" title="它在身体里到底发生了什么">
        <p>
          你不需要懂这一节也能做练习——但知道“为什么有效”，往往能让人更愿意坚持。下面用最朴素的话，把几条关键的
          机制讲清楚。
        </p>
        <Subsection index="3.1" title="一条叫迷走神经的“刹车线”">
          <p>
            从脑干一路连到心脏和内脏的迷走神经，是副交感神经里最主要的一条。它就像身体的刹车：活跃起来，心率就放缓、
            肌肉就松弛。缓慢而绵长的呼气，正好能加强它的信号——所以“长呼气”不是玄学，而是在<strong>给这根刹车线加力</strong>。
          </p>
        </Subsection>
        <Subsection index="3.2" title="慌乱时，呼吸先乱">
          <p>
            紧张时身体会不自觉地变成又快又浅的胸式呼吸，这本身又会把“我很危险”的信号反馈给大脑，形成一个越绷越紧的
            循环。主动把呼吸放慢、放沉到腹部，等于从外部掐断这个循环——你没法直接命令心跳慢下来，但你可以先让呼吸慢下来，
            心跳会跟着走。
          </p>
        </Subsection>
        <Subsection index="3.3" title="为什么别吸得太猛">
          <p>
            很多人一听“深呼吸”就拼命猛吸，反而容易头晕——那通常是吸得过快、过满导致的轻微过度换气。真正有用的是
            <strong>慢而稳</strong>，而不是<strong>多而猛</strong>。把每一拍都放轻一点，让气流细水长流，效果反而更好。
          </p>
        </Subsection>
      </Section>

      <Section index="04" title="把它放进一天里">
        <p>
          这套练习最大的好处是“随身携带”：不需要 App、不需要垫子，几次呼吸就能做。与其攒到“专门冥想的时间”，不如
          把它塞进一天的缝隙里——尤其是那些你能感到自己正在绷紧的瞬间。
        </p>
        <Raw title="几个适合插入一轮呼吸的时刻">
          <DayMoments />
        </Raw>
        <Aside tone="principle" label="把门槛降到最低">
          目标不是“每天冥想二十分钟”，而是“想起来就做三次呼吸”。能长期坚持的小练习，胜过坚持不了的大计划——
          频率，比时长重要得多。
        </Aside>
      </Section>

      <Section index="05" title="几个常见的小疑问">
        <p>第一次认真对待呼吸的人，常会冒出这些问题。需要时再展开看：</p>
        <Detail summary="做的时候头有点晕，正常吗？">
          <p style={{ margin: 0 }}>
            通常是吸得太猛、太满造成的轻微过度换气。把每一拍都放轻、放缓，尤其别刻意吸到极限。如果还是晕，就停下来
            正常呼吸——身体的反馈永远优先于练习的节奏。
          </p>
        </Detail>
        <Detail summary="一定要鼻子吸、嘴巴呼吗？">
          <p style={{ margin: 0 }}>
            鼻吸更利于过滤和放慢气流，是个不错的默认，但不是硬性规定。鼻子不通的时候，用嘴一样可以。比“用哪里呼吸”
            更重要的，是“呼吸是否够慢、够稳”。
          </p>
        </Detail>
        <Detail summary="多久能见效？">
          <p style={{ margin: 0 }}>
            放慢呼吸对身体的即时影响（心率、紧张感）往往一两轮内就能感觉到；而它对长期情绪调节的帮助，则像任何练习
            一样需要时间累积。把它当成一个随时可用的工具，而不是一剂速效药。
          </p>
        </Detail>
      </Section>

      <Conclusion
        title="慢慢来"
        takeaways={[
          "呼吸是自主神经系统少数能被你主动接管的开关。",
          "呼气比吸气更长、更慢，就是在给迷走神经这条“刹车线”加力。",
          "盒式呼吸 4·4·4·4 最好上手；憋得难受就缩短，舒服优先。",
          "慢而稳，胜过多而猛——别拼命猛吸，让气流细水长流。",
          "把“想起来就做三次”塞进一天的缝隙，频率胜过时长。",
        ]}
      >
        你不需要清空大脑，也不需要盘腿坐很久。下一次感到紧绷的时候，就试着把注意力放回呼吸，让那个圆陪你扩大、
        缩小，走完一圈四边形。仅仅是这一分钟，往往就足够让肩膀松下来一点点——而这，已经是很好的开始了。
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
          · andy theme
        </footer>
      </Raw>
      </Article>
    </>
  );
}
