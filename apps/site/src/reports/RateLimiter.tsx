import { useState, type CSSProperties } from "react";
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
  CodeBlock,
  Conclusion,
  Raw,
} from "reacticle";

/*
 * A `fuller` (blueprint) system-design spec for a rate limiter. The body reads
 * like a drafting-table document; interactive Raw specimens are drawn as
 * blueprint figures in --ra-* tokens (+ --fl-cyan): a token-bucket simulator, a
 * topology diagram on graph paper, a fixed-window burst figure. Exactly one
 * Table (the algorithm trade-off). Cool, precise, mono-annotated.
 */

/* §bucket — a hands-on token bucket: refill ticks add tokens, requests spend. */
function TokenBucket() {
  const CAP = 10;
  const [tokens, setTokens] = useState(6);
  const [rate, setRate] = useState(2);
  const [last, setLast] = useState<"refill" | "ok" | "deny" | null>(null);

  const pips = Array.from({ length: CAP });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--ra-space-4)" }}>
      <div style={{ display: "flex", gap: "var(--ra-space-5)", alignItems: "flex-end" }}>
        {/* the bucket */}
        <div
          style={{
            width: "84px",
            border: "1px solid var(--ra-color-accent)",
            borderTop: "none",
            display: "flex",
            flexDirection: "column-reverse",
            gap: "3px",
            padding: "3px",
          }}
          aria-label={`令牌桶：${tokens} / ${CAP}`}
        >
          {pips.map((_, i) => (
            <span
              key={i}
              style={{
                height: "12px",
                background: i < tokens ? "var(--fl-cyan)" : "transparent",
                border: "1px solid var(--ra-color-border-strong)",
              }}
            />
          ))}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--ra-space-3)" }}>
          <div
            style={{
              fontFamily: "var(--ra-font-mono)",
              fontSize: "var(--ra-text-sm)",
              color: "var(--ra-color-muted)",
            }}
          >
            tokens = {tokens} / {CAP}　|　refill = +{rate}/tick
          </div>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--ra-space-3)",
              fontFamily: "var(--ra-font-mono)",
              fontSize: "var(--ra-text-sm)",
            }}
          >
            rate
            <input
              type="range"
              min={1}
              max={5}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              aria-label="每个 tick 补充的令牌数"
              style={{ flex: 1, accentColor: "var(--fl-cyan)" }}
            />
          </label>
          <div style={{ display: "flex", gap: "var(--ra-space-3)", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => {
                setTokens((t) => Math.min(CAP, t + rate));
                setLast("refill");
              }}
              style={btn("ghost")}
            >
              tick ▸ 补令牌
            </button>
            <button
              type="button"
              onClick={() => {
                setTokens((t) => {
                  if (t > 0) {
                    setLast("ok");
                    return t - 1;
                  }
                  setLast("deny");
                  return t;
                });
              }}
              style={btn("solid")}
            >
              request ▸ 取 1
            </button>
          </div>
          <div
            style={{
              fontFamily: "var(--ra-font-mono)",
              fontSize: "var(--ra-text-sm)",
              color:
                last === "deny"
                  ? "var(--ra-color-risk)"
                  : last === "ok"
                    ? "var(--ra-color-success)"
                    : "var(--ra-color-muted)",
              minHeight: "1.4em",
            }}
          >
            {last === "refill" && "↻ 已补充令牌（上限封顶）"}
            {last === "ok" && "200 OK — 桶里有令牌，放行"}
            {last === "deny" && "429 Too Many Requests — 桶空，拒绝"}
            {last === null && "桶里有令牌就放行，没令牌就拒绝。"}
          </div>
        </div>
      </div>
      <p style={{ margin: 0, fontSize: "var(--ra-text-sm)", color: "var(--ra-color-muted)" }}>
        桶的容量决定能容忍多大的<strong>突发</strong>，补充速率决定<strong>长期均速</strong>。两个旋钮，覆盖
        了限流的几乎全部需求。
      </p>
    </div>
  );
}

function btn(kind: "solid" | "ghost"): CSSProperties {
  return {
    appearance: "none",
    cursor: "pointer",
    fontFamily: "var(--ra-font-mono)",
    fontSize: "var(--ra-text-sm)",
    letterSpacing: "0.04em",
    padding: "0.4em 0.9em",
    border: "1px solid var(--ra-color-accent)",
    color: kind === "solid" ? "var(--ra-color-accent-contrast)" : "var(--ra-color-accent)",
    background: kind === "solid" ? "var(--ra-color-accent)" : "transparent",
  };
}

/* §topology — a blueprint placement diagram with dimension labels. */
function Topology() {
  const C = "var(--fl-cyan)";
  const ink = "var(--ra-color-heading)";
  function Box({ x, label }: { x: number; label: string }) {
    return (
      <g>
        <rect x={x} y={36} width={92} height={40} fill="none" stroke={C} strokeWidth="1.2" />
        <text
          x={x + 46}
          y={60}
          textAnchor="middle"
          fontFamily="var(--ra-font-mono)"
          fontSize="11"
          fill={ink}
        >
          {label}
        </text>
      </g>
    );
  }
  function Arrow({ x }: { x: number }) {
    return (
      <g stroke={C} strokeWidth="1.2" fill={C}>
        <line x1={x} y1={56} x2={x + 26} y2={56} />
        <polygon points={`${x + 26},56 ${x + 20},53 ${x + 20},59`} />
      </g>
    );
  }
  return (
    <div style={{ overflowX: "auto" }}>
      <svg viewBox="0 0 460 110" width="100%" role="img" aria-label="客户端经限流器到后端服务的部署拓扑">
        <Box x={10} label="client" />
        <Arrow x={102} />
        <Box x={134} label="限流器" />
        <Arrow x={226} />
        <Box x={258} label="service" />
        {/* a counter store hung off the limiter */}
        <line x1={180} y1={76} x2={180} y2={96} stroke={C} strokeDasharray="3 3" />
        <rect x={134} y={96} width={92} height={0} />
        <text x={180} y={106} textAnchor="middle" fontFamily="var(--ra-font-mono)" fontSize="10" fill="var(--ra-color-muted)">
          ↑ 计数存储（Redis）
        </text>
        {/* dimension tick over the limiter */}
        <line x1={134} y1={24} x2={226} y2={24} stroke="var(--ra-color-border-strong)" />
        <line x1={134} y1={20} x2={134} y2={28} stroke="var(--ra-color-border-strong)" />
        <line x1={226} y1={20} x2={226} y2={28} stroke="var(--ra-color-border-strong)" />
        <text x={180} y={18} textAnchor="middle" fontFamily="var(--ra-font-mono)" fontSize="10" fill={C}>
          边缘 / 网关层
        </text>
      </svg>
    </div>
  );
}

/* §burst — the fixed-window edge problem: 2× burst across a boundary. */
function FixedWindowBurst() {
  const C = "var(--fl-cyan)";
  const risk = "var(--ra-color-risk)";
  return (
    <div style={{ overflowX: "auto" }}>
      <svg viewBox="0 0 460 120" width="100%" role="img" aria-label="固定窗口在窗口边界处可能产生两倍突发">
        {/* two windows */}
        <line x1={20} y1={90} x2={440} y2={90} stroke="var(--ra-color-border-strong)" />
        <line x1={230} y1={20} x2={230} y2={98} stroke={C} strokeDasharray="4 4" />
        <text x={125} y={112} textAnchor="middle" fontFamily="var(--ra-font-mono)" fontSize="10" fill="var(--ra-color-muted)">窗口 1（上限 5）</text>
        <text x={335} y={112} textAnchor="middle" fontFamily="var(--ra-font-mono)" fontSize="10" fill="var(--ra-color-muted)">窗口 2（上限 5）</text>
        {/* burst at end of window 1 */}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={`a${i}`} x={150 + i * 14} y={50} width={10} height={40} fill={risk} />
        ))}
        {/* burst at start of window 2 */}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={`b${i}`} x={236 + i * 14} y={50} width={10} height={40} fill={risk} />
        ))}
        <text x={230} y={40} textAnchor="middle" fontFamily="var(--ra-font-mono)" fontSize="11" fill={risk}>
          边界处 10 次 / 瞬间
        </text>
      </svg>
    </div>
  );
}

const PSEUDO = `# 令牌桶：每次请求时按时间惰性补充
def allow(key, now):
    b = store.get(key) or Bucket(tokens=CAP, ts=now)
    # 惰性补充：根据流逝时间补令牌，无需后台定时器
    elapsed = now - b.ts
    b.tokens = min(CAP, b.tokens + elapsed * RATE)
    b.ts = now
    if b.tokens >= 1:
        b.tokens -= 1
        store.set(key, b)
        return True          # 200 OK
    store.set(key, b)
    return False             # 429 Too Many Requests`;

/* §cover — a drafting title block on graph paper + a token-bucket cross-section. */
function RateLimiterSpecCover() {
  const cyan = "var(--ra-color-accent)";
  const ink = "var(--ra-color-heading)";
  const dim = "var(--ra-color-muted)";
  const border = "var(--ra-color-border-strong)";
  const borderSoft = "var(--ra-color-border)";

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
      {/* layer 0 — blueprint graph paper */}
      <svg
        viewBox="0 0 600 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          color: "var(--ra-color-border, currentColor)",
          opacity: 0.55,
          zIndex: 0,
        }}
      >
        <defs>
          <pattern id="rl-cover-grid-fine" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <pattern id="rl-cover-grid-bold" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.9" />
          </pattern>
        </defs>
        <rect width="600" height="800" fill="url(#rl-cover-grid-fine)" />
        <rect width="600" height="800" fill="url(#rl-cover-grid-bold)" opacity="0.75" />
      </svg>

      {/* layer 1 — content (drafting title block + cross-section figure) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          padding: "var(--ra-space-5)",
          display: "grid",
          gridTemplateRows: "auto 1fr",
          gap: "var(--ra-space-4)",
        }}
      >
        {/* §title-block */}
        <div
          style={{
            border: `1px solid ${border}`,
            borderTop: `2px solid ${cyan}`,
            background: "var(--ra-color-surface)",
          }}
        >
          {/* metadata strip — DWG / SHEET / SCALE / REV */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              borderBottom: `1px solid ${border}`,
              fontFamily: "var(--ra-font-mono)",
              fontSize: "var(--ra-text-xs)",
            }}
          >
            {[
              ["DWG NO.", "RL-001"],
              ["SHEET", "01 / 01"],
              ["SCALE", "1 : 1"],
              ["REV", "A"],
            ].map(([k, v], i) => (
              <div
                key={k}
                style={{
                  padding: "var(--ra-space-2) var(--ra-space-3)",
                  borderRight: i < 3 ? `1px solid ${border}` : "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  minWidth: 0,
                }}
              >
                <span style={{ color: cyan, letterSpacing: "0.14em" }}>{k}</span>
                <span style={{ color: ink, whiteSpace: "nowrap" }}>{v}</span>
              </div>
            ))}
          </div>

          {/* title body */}
          <div style={{ padding: "var(--ra-space-4) var(--ra-space-4) var(--ra-space-5)" }}>
            <div
              style={{
                fontFamily: "var(--ra-font-mono)",
                fontSize: "var(--ra-text-xs)",
                letterSpacing: "0.22em",
                color: cyan,
                marginBottom: "var(--ra-space-2)",
              }}
            >
              SYSTEM DESIGN · TOKEN BUCKET
            </div>
            <h1
              style={{
                margin: 0,
                fontFamily: "var(--ra-font-mono)",
                fontWeight: 600,
                color: ink,
                fontSize: "clamp(1.4rem, 6.4vw, 2.4rem)",
                lineHeight: 1.04,
                letterSpacing: "0.03em",
              }}
            >
              RATE&nbsp;LIMITER
            </h1>
            <div
              style={{
                marginTop: "var(--ra-space-3)",
                fontSize: "var(--ra-text-sm)",
                color: dim,
                fontFamily: "var(--ra-font-mono)",
                letterSpacing: "0.06em",
              }}
            >
              容量 · 速率 · 拓扑 · 边界
            </div>
          </div>
        </div>

        {/* §figure — token bucket cross-section */}
        <div
          style={{
            border: `1px solid ${border}`,
            position: "relative",
            overflow: "hidden",
            background: "transparent",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "var(--ra-space-3)",
              left: "var(--ra-space-3)",
              fontFamily: "var(--ra-font-mono)",
              fontSize: "var(--ra-text-xs)",
              color: cyan,
              letterSpacing: "0.14em",
              zIndex: 2,
            }}
          >
            FIG. 01 · CROSS SECTION
          </div>
          <div
            style={{
              position: "absolute",
              top: "var(--ra-space-3)",
              right: "var(--ra-space-3)",
              fontFamily: "var(--ra-font-mono)",
              fontSize: "var(--ra-text-xs)",
              color: dim,
              letterSpacing: "0.14em",
              zIndex: 2,
            }}
          >
            UNIT · TOKENS
          </div>

          <svg
            viewBox="0 0 600 620"
            preserveAspectRatio="xMidYMid meet"
            width="100%"
            height="100%"
            style={{ position: "absolute", inset: 0, display: "block" }}
            role="img"
            aria-label="令牌桶剖面图：令牌以恒定速率从顶部掉入桶中，请求从底部出口取走令牌，桶满即溢出被拒绝"
          >
            {/* incoming token stream */}
            <line
              x1="300"
              y1="70"
              x2="300"
              y2="240"
              stroke={cyan}
              strokeWidth="0.8"
              strokeDasharray="3 5"
            />
            {[80, 130, 180, 225].map((cy, i) => (
              <circle
                key={cy}
                cx="300"
                cy={cy}
                r="8"
                fill={i === 3 ? cyan : "none"}
                stroke={cyan}
                strokeWidth="1.4"
              />
            ))}
            {/* RATE dimension, right of stream */}
            <line x1="356" y1="80" x2="356" y2="225" stroke={borderSoft} strokeWidth="1" />
            <line x1="352" y1="80" x2="360" y2="80" stroke={borderSoft} strokeWidth="1" />
            <line x1="352" y1="225" x2="360" y2="225" stroke={borderSoft} strokeWidth="1" />
            <text x="368" y="148" fontFamily="var(--ra-font-mono)" fontSize="13" fill={cyan} letterSpacing="0.1em">
              RATE
            </text>
            <text x="368" y="166" fontFamily="var(--ra-font-mono)" fontSize="11" fill={dim}>
              tokens / sec
            </text>

            {/* bucket walls */}
            <line x1="200" y1="260" x2="200" y2="500" stroke={cyan} strokeWidth="1.6" />
            <line x1="400" y1="260" x2="400" y2="500" stroke={cyan} strokeWidth="1.6" />
            <line x1="200" y1="500" x2="275" y2="500" stroke={cyan} strokeWidth="1.6" />
            <line x1="325" y1="500" x2="400" y2="500" stroke={cyan} strokeWidth="1.6" />
            {/* open top — small inward ticks suggest "open" */}
            <line x1="200" y1="260" x2="215" y2="260" stroke={cyan} strokeWidth="1.6" />
            <line x1="385" y1="260" x2="400" y2="260" stroke={cyan} strokeWidth="1.6" />
            {/* outlet */}
            <line x1="275" y1="500" x2="275" y2="545" stroke={cyan} strokeWidth="1.6" />
            <line x1="325" y1="500" x2="325" y2="545" stroke={cyan} strokeWidth="1.6" />

            {/* token pips inside (filled lower portion) */}
            {[0, 1, 2, 3, 4].flatMap((row) =>
              [0, 1, 2, 3, 4].map((col) => (
                <circle
                  key={`p-${row}-${col}`}
                  cx={220 + col * 40}
                  cy={480 - row * 32}
                  r="9"
                  fill={cyan}
                  opacity={0.82}
                />
              )),
            )}

            {/* CAP dimension, left of bucket */}
            <line x1="170" y1="260" x2="170" y2="500" stroke={borderSoft} strokeWidth="1" />
            <line x1="166" y1="260" x2="174" y2="260" stroke={borderSoft} strokeWidth="1" />
            <line x1="166" y1="500" x2="174" y2="500" stroke={borderSoft} strokeWidth="1" />
            <text
              x="158"
              y="378"
              fontFamily="var(--ra-font-mono)"
              fontSize="13"
              fill={cyan}
              textAnchor="end"
              letterSpacing="0.1em"
            >
              CAP
            </text>
            <text
              x="158"
              y="396"
              fontFamily="var(--ra-font-mono)"
              fontSize="11"
              fill={dim}
              textAnchor="end"
            >
              = N
            </text>

            {/* overflow callout (top-right of bucket — 429 deny) */}
            <line
              x1="400"
              y1="285"
              x2="478"
              y2="285"
              stroke="var(--ra-color-risk)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <text
              x="482"
              y="282"
              fontFamily="var(--ra-font-mono)"
              fontSize="11"
              fill="var(--ra-color-risk)"
              letterSpacing="0.08em"
            >
              429
            </text>
            <text x="482" y="296" fontFamily="var(--ra-font-mono)" fontSize="10" fill={dim}>
              deny
            </text>

            {/* outflow */}
            <line x1="300" y1="545" x2="300" y2="585" stroke={cyan} strokeWidth="1.6" />
            <polygon points="300,592 294,580 306,580" fill={cyan} />
            <text
              x="320"
              y="572"
              fontFamily="var(--ra-font-mono)"
              fontSize="12"
              fill="var(--ra-color-success)"
              letterSpacing="0.08em"
            >
              200 OK
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}

/** fuller · 系统设计 */
export function RateLimiterSpec() {
  return (
    <>
      <RateLimiterSpecCover />
      <Article toc width="regular">
      <Hero
        eyebrow="SPEC · RL-001"
        title="限流器设计规格"
        subtitle="从需求、算法选型，到接口契约与边界条件——一份可以直接照着实现的限流器设计文档。"
        meta={[
          { label: "版本", value: "v1 · draft" },
          { label: "层级", value: "边缘 / 网关" },
          { label: "状态", value: "评审中" },
        ]}
      />

      <Lead>
        限流器是一个看似简单、实则到处是边界的小系统：它要在不拖慢正常请求的前提下，挡住突发与滥用，还要在
        多副本部署下保持一致。本规格把需求拆清，给出算法选型的依据，定义对外接口，并逐一列出那些「实现时一定
        会踩」的边界条件——目标是让任何工程师照着它就能实现，而不必重新发明。
      </Lead>

      <Section index="01" title="需求与目标">
        <p>
          先把要解决的问题钉死。限流器的职责只有一句话：<strong>对某个主体（用户 / IP / API Key）在单位时间内的
          请求数设上限，超出则拒绝</strong>。围绕这句话，有几条非功能要求同样重要：
        </p>
        <Subsection index="1.1" title="功能需求">
          <p>
            按 key 限流；支持「长期均速」与「短时突发」两个独立旋钮；超限返回 429 并带上 <code>Retry-After</code>；
            限流维度可配置（按用户、按接口、按租户）。
          </p>
        </Subsection>
        <Subsection index="1.2" title="非功能需求">
          <p>
            判定延迟应远小于一次后端调用（目标 P99 &lt; 1ms）；限流器自身不能成为单点；在多副本下对同一 key 的
            计数需大体一致；存储开销与 key 的数量成线性、与时间无关。
          </p>
        </Subsection>
        <Aside tone="principle" label="设计立场">
          限流器是<strong>边缘组件</strong>：它必须比它所保护的服务更快、更稳。任何让它变慢或变脆的「聪明」设计，
          都违背了它存在的理由。
        </Aside>
      </Section>

      <Section index="02" title="部署位置">
        <p>
          限流器放在调用链的最前面——网关 / 边缘层，在请求进入业务服务之前就做判定。计数状态外置到一个低延迟
          存储（如 Redis），使多个限流器副本共享同一份计数。
        </p>
        <Raw title="图 1：部署拓扑（计数状态外置以支持多副本）">
          <Topology />
        </Raw>
        <p>
          把状态外置是这套设计能水平扩展的关键：限流器副本本身无状态，可随意增减；一致性问题收敛到那个共享
          存储上，用原子操作解决。
        </p>
      </Section>

      <Section index="03" title="算法选型">
        <p>
          限流有四种常见算法，差别主要在「对突发的处理」和「存储 / 计算成本」上。下表是选型依据——这是本规格
          唯一的一张对照表，请据此决策。
        </p>
        <Table
          caption="表 1：四种限流算法的权衡"
          source="精度指对「滑动的真实速率」的逼近程度；成本指每 key 的存储与计算。"
          columns={[
            { key: "algo", label: "算法", width: "10rem" },
            { key: "burst", label: "突发处理" },
            { key: "cost", label: "成本" },
            { key: "acc", label: "精度" },
          ]}
          rows={[
            { algo: "固定窗口", burst: "边界可双倍突发", cost: "极低（一个计数）", acc: "粗" },
            { algo: "滑动日志", burst: "精确，无边界问题", cost: "高（存每次时间戳）", acc: "最精确" },
            { algo: "滑动窗口计数", burst: "近似平滑边界", cost: "低", acc: "好" },
            { algo: "令牌桶", burst: "天然支持可控突发", cost: "低（两个数）", acc: "好" },
          ]}
        />
        <p>
          固定窗口最简单，但有一个经典缺陷：在两个窗口的交界处，瞬间可以放过两倍的额度。这往往是压垮后端的
          真实原因。
        </p>
        <Raw title="图 2：固定窗口的边界双倍突发问题">
          <FixedWindowBurst />
        </Raw>
        <Aside tone="capability" label="选型结论">
          默认选<strong>令牌桶</strong>：它用「容量 + 补充速率」两个数，同时表达均速与突发，存储成本低、语义清晰，
          且能用惰性补充避免后台定时器。需要严格精确时才升级到滑动日志。
        </Aside>
      </Section>

      <Section index="04" title="算法：令牌桶">
        <p>
          令牌桶的心智模型很物理：一个能装 <code>CAP</code> 个令牌的桶，以 <code>RATE</code> 个/秒的速度往里滴；
          每个请求取走一个令牌，取得到就放行，取不到就拒绝。桶满即溢出——这就限制了突发的上限。
        </p>
        <Raw title="图 3：动手玩一玩——tick 补令牌，request 取令牌">
          <TokenBucket />
        </Raw>
        <p>
          实现上有一个关键技巧：<strong>惰性补充</strong>。不要起一个后台定时器去给每个桶滴令牌（那会随 key 数量
          爆炸），而是在每次请求到来时，按「距上次的流逝时间 × 速率」一次性补足。这样状态只有两个数：当前令牌数
          与上次更新时间。
        </p>
        <CodeBlock language="python" code={PSEUDO} />
        <p>
          注意整段逻辑必须<strong>原子</strong>执行：读取、补充、扣减、写回不能被并发请求穿插。在 Redis 上用一段
          Lua 脚本或 <code>INCR</code> 配合过期即可保证。
        </p>
      </Section>

      <Section index="05" title="边界条件与失败模式">
        <p>
          限流器的难，全在边界。规格必须把这些点写明，否则每个实现都会以不同的方式出错。
        </p>
        <Detail summary="存储挂了怎么办：fail-open 还是 fail-closed？">
          <p style={{ margin: 0 }}>
            这是必须显式决定的策略。<strong>fail-open</strong>（存储不可用时放行）保护可用性，但放弃了限流保护；
            <strong>fail-closed</strong>（一律拒绝）保护后端，但会放大故障。多数面向公网的网关选 fail-open 并加本地
            降级计数，对内部高危接口选 fail-closed。规格里必须按接口标注。
          </p>
        </Detail>
        <Detail summary="多副本下计数会不会算重 / 算漏？">
          <p style={{ margin: 0 }}>
            会，只要不是原子操作。所有「读-改-写」必须收敛到共享存储的单个原子命令上（Lua 脚本 / INCR）。限流器
            副本之间不互相同步，一致性只由存储保证——这正是把状态外置的意义。
          </p>
        </Detail>
        <Detail summary="时钟漂移会破坏惰性补充吗？">
          <p style={{ margin: 0 }}>
            会。惰性补充依赖「流逝时间」，应统一以存储侧的时间为准（如 Redis 的 <code>TIME</code>），而不是各副本
            各自的本地时钟，否则节点间漂移会让补充速率忽快忽慢。
          </p>
        </Detail>
        <Quote who="一条用血换来的运维经验">
          没写明 fail-open 还是 fail-closed 的限流器，会在你最不希望的那个深夜，替你做出错误的选择。
        </Quote>
      </Section>

      <Section index="06" title="对外接口">
        <p>
          限流器对调用方暴露的契约要稳定且可观测。每次判定都应返回足够的信息，让调用方能正确退避：
        </p>
        <p>
          放行返回 <code>200</code>；拒绝返回 <code>429</code>，并带 <code>Retry-After</code>（秒）与
          <code>X-RateLimit-Remaining</code>（剩余令牌）。所有判定都打点：key、决策、剩余额度、耗时——限流器
          自身的可观测性，和它的正确性一样重要。
        </p>
      </Section>

      <Conclusion
        title="规格要点"
        takeaways={[
          "限流器是边缘组件：必须比被保护的服务更快、更稳、可水平扩展。",
          "默认算法用令牌桶：容量 + 速率两个旋钮，覆盖突发与均速。",
          "用惰性补充代替后台定时器；判定逻辑必须原子执行。",
          "显式声明 fail-open / fail-closed，并以共享存储的时间为准。",
        ]}
      >
        一个好的限流器规格，价值不在于它描述了多精巧的算法，而在于它把每一个边界都钉在了纸上——让实现者不必
        在深夜里替这些选择临场拍板。照着这份规格，令牌桶、惰性补充、原子判定、显式降级策略，就是一套可以直接
        落地的方案。
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
          · fuller theme
        </footer>
      </Raw>
      </Article>
    </>
  );
}
