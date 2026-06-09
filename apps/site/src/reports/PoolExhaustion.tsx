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
  DiffReview,
  Incident,
  RiskList,
  Decision,
  Conclusion,
  Raw,
} from "reacticle";

/*
 * A `shannon` dark-engineering postmortem of a connection-pool exhaustion
 * cascade. Prose carries the investigation; an Incident, a DiffReview, a
 * RiskList and a Decision appear only where the content genuinely is that
 * structure. Every Raw block is hand-drawn for the paragraph beside it — a
 * golden-signals readout, an interactive Little's-Law saturation meter, a
 * blast-radius dependency graph — on warm graphite, one amber signal colour,
 * a hotter red for alarm, all pulled from --ra-* tokens so it stays Data-Ink
 * on dark and switches with the theme.
 */

/* ---- bespoke Raw pieces for this postmortem, used nowhere else ---- */

/** §symptoms — p99 latency and error rate across the 47-minute window. */
function GoldenSignals() {
  const w = 380;
  const h = 168;
  const ml = 34;
  const mr = 38;
  const mt = 14;
  const mb = 26;
  const plotW = w - ml - mr;
  const plotH = h - mt - mb;
  const T = 60; // minutes shown
  const X = (t: number) => ml + (t / T) * plotW;
  const Y = (frac: number) => mt + (1 - frac) * plotH;

  // p99 latency (normalised 0..1, baseline low, spikes during outage)
  const lat = (t: number) => {
    if (t < 8) return 0.08 + 0.02 * Math.sin(t);
    if (t < 12) return 0.08 + ((t - 8) / 4) * 0.85;
    if (t < 47) return 0.9 + 0.06 * Math.sin(t * 1.3);
    if (t < 52) return 0.9 - ((t - 47) / 5) * 0.8;
    return 0.1;
  };
  // error rate (near zero, then climbs as the pool starves)
  const err = (t: number) => {
    if (t < 10) return 0.02;
    if (t < 13) return 0.02 + ((t - 10) / 3) * 0.7;
    if (t < 47) return 0.72 + 0.05 * Math.sin(t);
    if (t < 51) return 0.72 - ((t - 47) / 4) * 0.68;
    return 0.04;
  };
  const line = (f: (t: number) => number) => {
    const pts: string[] = [];
    for (let t = 0; t <= T; t += 0.5) pts.push(`${X(t).toFixed(1)},${Y(f(t)).toFixed(1)}`);
    return pts.join(" ");
  };
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: "block" }} role="img" aria-label="故障窗口内的 p99 延迟与错误率">
      {/* outage window band */}
      <rect x={X(10)} y={mt} width={X(47) - X(10)} height={plotH} fill="var(--ra-color-risk-soft)" />
      <text x={(X(10) + X(47)) / 2} y={mt + 10} textAnchor="middle" style={{ fontFamily: "var(--ra-font-label)", fontSize: "9px", fill: "var(--ra-color-risk)" }}>故障窗口 · 37 min</text>
      {/* axes */}
      <line x1={ml} y1={mt} x2={ml} y2={mt + plotH} stroke="var(--ra-color-border-strong)" />
      <line x1={ml} y1={mt + plotH} x2={ml + plotW} y2={mt + plotH} stroke="var(--ra-color-border-strong)" />
      {/* curves */}
      <polyline points={line(err)} fill="none" stroke="var(--ra-color-risk)" strokeWidth="1.6" />
      <polyline points={line(lat)} fill="none" stroke="var(--ra-color-accent)" strokeWidth="1.6" />
      {/* x ticks */}
      {[0, 15, 30, 45, 60].map((t) => (
        <text key={t} x={X(t)} y={mt + plotH + 14} textAnchor="middle" style={{ fontFamily: "var(--ra-font-mono)", fontSize: "9px", fill: "var(--ra-color-faint)" }}>{t}m</text>
      ))}
      {/* legend */}
      <g transform={`translate(${ml + 6} ${mt + 4})`}>
        <line x1="0" y1="0" x2="14" y2="0" stroke="var(--ra-color-accent)" strokeWidth="1.6" />
        <text x="18" y="3" style={{ fontFamily: "var(--ra-font-mono)", fontSize: "9px", fill: "var(--ra-color-muted)" }}>p99 延迟</text>
        <line x1="80" y1="0" x2="94" y2="0" stroke="var(--ra-color-risk)" strokeWidth="1.6" />
        <text x="98" y="3" style={{ fontFamily: "var(--ra-font-mono)", fontSize: "9px", fill: "var(--ra-color-muted)" }}>错误率</text>
      </g>
    </svg>
  );
}

/** §rootcause — the interactive core: Little's Law saturation of the pool. */
function SaturationMeter() {
  const [lambda, setLambda] = useState(120); // arrivals per second
  const [hold, setHold] = useState(0.25); // seconds a connection is held
  const [pool, setPool] = useState(20); // pool size

  const need = lambda * hold; // L = λW, required concurrent connections
  const util = need / pool;
  const saturated = need > pool;
  const c = saturated ? "var(--ra-color-risk)" : "var(--ra-color-accent)";

  const ctrl = (label: string, value: string, node: ReactNode) => (
    <label style={{ display: "grid", gridTemplateColumns: "6.5rem 1fr 4rem", alignItems: "center", gap: "var(--ra-space-3)", fontFamily: "var(--ra-font-label)", fontSize: "var(--ra-text-sm)", color: "var(--ra-color-muted)" }}>
      <span>{label}</span>
      {node}
      <span style={{ fontFamily: "var(--ra-font-mono)", color: "var(--ra-color-text)", textAlign: "right" }}>{value}</span>
    </label>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--ra-space-3)" }}>
      {/* pool occupancy as a row of connection cells */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
        {Array.from({ length: pool }).map((_, i) => {
          const filled = i < Math.min(need, pool);
          return (
            <span key={i} style={{ width: "14px", height: "18px", border: "1px solid var(--ra-color-border-strong)", background: filled ? c : "transparent" }} aria-hidden="true" />
          );
        })}
        {/* overflow / queue cells */}
        {need > pool
          ? Array.from({ length: Math.min(Math.ceil(need - pool), 24) }).map((_, i) => (
              <span key={`q${i}`} style={{ width: "14px", height: "18px", border: "1px dashed var(--ra-color-risk)", background: "var(--ra-color-risk-soft)" }} aria-hidden="true" />
            ))
          : null}
      </div>
      <div style={{ fontFamily: "var(--ra-font-mono)", fontSize: "var(--ra-text-sm)", color: "var(--ra-color-muted)" }}>
        需求并发 <span style={{ color: c }}>L = λW = {need.toFixed(0)}</span> · 池容量 {pool} · 利用率{" "}
        <span style={{ color: c }}>{Math.round(util * 100)}%</span>
      </div>
      {ctrl("到达率 λ", `${lambda}/s`, (
        <input type="range" min={20} max={400} step={10} value={lambda} onChange={(e) => setLambda(+e.target.value)} style={{ accentColor: c }} />
      ))}
      {ctrl("持有时间 W", `${hold.toFixed(2)} s`, (
        <input type="range" min={0.02} max={1} step={0.01} value={hold} onChange={(e) => setHold(+e.target.value)} style={{ accentColor: c }} />
      ))}
      {ctrl("池容量 N", `${pool}`, (
        <input type="range" min={5} max={80} step={1} value={pool} onChange={(e) => setPool(+e.target.value)} style={{ accentColor: c }} />
      ))}
      <div style={{ borderTop: "1px solid var(--ra-color-border-strong)", paddingTop: "var(--ra-space-2)", fontFamily: "var(--ra-font-label)", fontSize: "var(--ra-text-sm)", color: "var(--ra-color-muted)" }}>
        {saturated ? (
          <>需求并发已超过池容量，多出的请求开始<span style={{ fontFamily: "var(--ra-font-mono)", color: "var(--ra-color-risk)" }}> 排队等待连接</span>——等待计入持有时间，于是 W 变大、需求更高，正反馈把池彻底拖垮。</>
        ) : (
          <>需求并发仍在池容量之内，连接即取即还，<span style={{ fontFamily: "var(--ra-font-mono)", color: "var(--ra-color-accent)" }}>无排队</span>。把持有时间往右拖，看它如何越过临界点。</>
        )}
      </div>
    </div>
  );
}

/** §blast — the dependency graph, the starved hop drawn in alarm red. */
function BlastRadius() {
  const nodes = [
    { id: "client", x: 40, y: 60, label: "客户端" },
    { id: "edge", x: 150, y: 60, label: "网关" },
    { id: "checkout", x: 270, y: 60, label: "结算服务", hot: true },
    { id: "db", x: 270, y: 130, label: "订单库 (池)", dead: true },
    { id: "search", x: 400, y: 30, label: "搜索" },
    { id: "profile", x: 400, y: 90, label: "用户", hot: true },
  ];
  const at = (id: string) => nodes.find((n) => n.id === id)!;
  const edges: [string, string, boolean][] = [
    ["client", "edge", false],
    ["edge", "checkout", true],
    ["checkout", "db", true],
    ["edge", "search", false],
    ["edge", "profile", true],
  ];
  return (
    <svg viewBox="0 0 470 170" width="100%" style={{ display: "block" }} role="img" aria-label="故障影响范围依赖图">
      {edges.map(([a, b, hot], i) => {
        const p = at(a);
        const q = at(b);
        return (
          <line key={i} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={hot ? "var(--ra-color-risk)" : "var(--ra-color-border-strong)"} strokeWidth={hot ? "1.6" : "1"} strokeDasharray={hot ? "" : "3 3"} />
        );
      })}
      {nodes.map((n) => {
        const stroke = n.dead ? "var(--ra-color-risk)" : n.hot ? "var(--ra-color-accent)" : "var(--ra-color-border-strong)";
        const fill = n.dead ? "var(--ra-color-risk-soft)" : "var(--ra-color-surface)";
        return (
          <g key={n.id}>
            <rect x={n.x - 34} y={n.y - 13} width="68" height="26" fill={fill} stroke={stroke} strokeWidth="1.2" />
            <text x={n.x} y={n.y + 4} textAnchor="middle" style={{ fontFamily: "var(--ra-font-label)", fontSize: "10px", fill: n.dead ? "var(--ra-color-risk)" : "var(--ra-color-text)" }}>{n.label}</text>
          </g>
        );
      })}
      <text x={270} y={158} textAnchor="middle" style={{ fontFamily: "var(--ra-font-mono)", fontSize: "9px", fill: "var(--ra-color-risk)" }}>连接池枯竭 → 沿红色路径回压</text>
    </svg>
  );
}

const reproCode = `// orders-service：每个请求借一条连接查库，本应即取即还
async function getOrder(id) {
  const conn = await pool.acquire();      // 池里取一条连接
  const order = await conn.query(
    "SELECT * FROM orders WHERE id = $1", [id]
  );
  const items = await fetchItemsFromAPI(order.itemIds); // ← 外部调用
  return { ...order, items };
}                                          // conn 始终没有归还`;

/**
 * Cover —— shannon dark-engineering. Template A (上字下图)：上 ~38% 大字标题与
 * INCIDENT kicker，下 ~58% 是 8×4 = 32 格连接池占位 —— 由空闲（仅描边）→ 暖色微亮
 * → 暖色实心 → 危险红，分四段铺满，最末格写 "SAT" 作为饱和告警；底部两条迷你
 * sparkline 分别画 RPS 飙升与 P99 爆炸，呼应"利特尔法则下连接池被一脚踩穿"的事故
 * 主旨。所有视觉值取自 --ra-* token，内部全部 absolute + inset / % / grid，PDF 拉
 * 成整页不破。
 */
function PoolExhaustionCover() {
  const cells = Array.from({ length: 32 }).map((_, i) => {
    const row = Math.floor(i / 8);
    if (row === 0) {
      return { bg: "transparent", border: "var(--ra-color-border-strong)", opacity: 1 };
    }
    if (row === 1) {
      return { bg: "var(--ra-color-accent)", border: "var(--ra-color-border-strong)", opacity: 0.32 };
    }
    if (row === 2) {
      return { bg: "var(--ra-color-accent)", border: "var(--ra-color-accent)", opacity: 0.82 };
    }
    return { bg: "var(--ra-color-risk)", border: "var(--ra-color-risk)", opacity: 1 };
  });

  const sparkSeries: { label: string; value: string; color: string; curve: (t: number) => number }[] = [
    {
      label: "RPS",
      value: "× 3.2",
      color: "var(--ra-color-accent)",
      curve: (t) => (t < 0.4 ? 0.18 + 0.05 * Math.sin(t * 9) : 0.18 + ((t - 0.4) / 0.6) * 0.78),
    },
    {
      label: "P99",
      value: "> 2 s",
      color: "var(--ra-color-risk)",
      curve: (t) =>
        t < 0.48 ? 0.12 + 0.03 * Math.sin(t * 7) : 0.12 + Math.pow((t - 0.48) / 0.52, 1.7) * 0.84,
    },
  ];

  return (
    <section
      className="ra-cover"
      aria-label="封面 · 连接池耗尽"
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
      {/* kicker — 顶部一条工程文档式标签 */}
      <div
        style={{
          position: "absolute",
          top: "var(--ra-space-5)",
          left: "var(--ra-space-6)",
          right: "var(--ra-space-6)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "var(--ra-font-mono)",
          fontSize: "var(--ra-text-xs)",
          letterSpacing: "var(--ra-tracking-caps)",
          textTransform: "uppercase",
          color: "var(--ra-color-muted)",
        }}
      >
        <span>INCIDENT · POSTMORTEM · 37 MIN</span>
        <span style={{ color: "var(--ra-color-risk)" }}>● SEV-1</span>
      </div>

      {/* 标题块 — 上 ~38%，"片名 + 主画面"里的片名 */}
      <div
        style={{
          position: "absolute",
          top: "11%",
          left: "var(--ra-space-6)",
          right: "var(--ra-space-6)",
          display: "grid",
          gap: "var(--ra-space-3)",
        }}
      >
        <div
          style={{
            height: "2px",
            width: "min(48%, 8rem)",
            background: "var(--ra-color-risk)",
          }}
        />
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--ra-font-heading)",
            fontWeight: "var(--ra-weight-bold, 600)",
            fontSize: "clamp(2.4rem, 11vw, 4.6rem)",
            lineHeight: 1.02,
            letterSpacing: "var(--ra-tracking-tight)",
            color: "var(--ra-color-heading)",
          }}
        >
          连接池耗尽
        </h1>
        <p
          style={{
            margin: 0,
            fontFamily: "var(--ra-font-mono)",
            fontSize: "var(--ra-text-sm)",
            lineHeight: 1.45,
            letterSpacing: "var(--ra-tracking-wide)",
            color: "var(--ra-color-muted)",
            maxWidth: "32rem",
          }}
        >
          λ·W &gt; N <span style={{ color: "var(--ra-color-faint)" }}>·</span> 一行外部调用，
          <span style={{ color: "var(--ra-color-accent)" }}>25 → 250 ms</span>，把 32 条连接挤穿
        </p>
      </div>

      {/* 上下分隔线 */}
      <div
        style={{
          position: "absolute",
          top: "44%",
          left: "var(--ra-space-6)",
          right: "var(--ra-space-6)",
          height: "1px",
          background: "var(--ra-color-border)",
        }}
      />

      {/* 下半 — 32 格连接池 + 两条迷你 sparkline */}
      <div
        style={{
          position: "absolute",
          top: "47%",
          bottom: "var(--ra-space-5)",
          left: "var(--ra-space-6)",
          right: "var(--ra-space-6)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--ra-space-3)",
        }}
      >
        {/* 池标签行 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "var(--ra-font-mono)",
            fontSize: "var(--ra-text-xs)",
            letterSpacing: "var(--ra-tracking-caps)",
            textTransform: "uppercase",
            color: "var(--ra-color-muted)",
          }}
        >
          <span>POOL · 32 OF 32 BUSY</span>
          <span style={{ color: "var(--ra-color-risk)" }}>SATURATED · 21:15</span>
        </div>

        {/* 8×4 = 32 连接占位框 */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            gridTemplateRows: "repeat(4, 1fr)",
            gap: "clamp(3px, 0.6vw, 7px)",
          }}
        >
          {cells.map((c, i) => {
            const isLast = i === 31;
            return (
              <div
                key={i}
                style={{
                  position: "relative",
                  background: c.bg,
                  border: `1px solid ${c.border}`,
                  opacity: c.opacity,
                  display: "grid",
                  placeItems: "center",
                  overflow: "hidden",
                }}
                aria-hidden="true"
              >
                {isLast ? (
                  <span
                    style={{
                      fontFamily: "var(--ra-font-mono)",
                      fontSize: "clamp(0.6rem, 1.5vw, 0.95rem)",
                      fontWeight: "var(--ra-weight-bold, 600)",
                      letterSpacing: "var(--ra-tracking-wide)",
                      color: "var(--ra-color-heading)",
                    }}
                  >
                    SAT
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>

        {/* sparklines — RPS 飙升 / P99 爆炸 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--ra-space-4)",
            alignItems: "center",
          }}
        >
          {sparkSeries.map(({ label, value, color, curve }) => {
            const w = 200;
            const h = 36;
            const pts: string[] = [];
            for (let i = 0; i <= 60; i++) {
              const t = i / 60;
              const x = (i / 60) * w;
              const y = h - curve(t) * (h - 4) - 2;
              pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
            }
            return (
              <div
                key={label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  gap: "var(--ra-space-2)",
                  alignItems: "center",
                  fontFamily: "var(--ra-font-mono)",
                  fontSize: "var(--ra-text-xs)",
                  letterSpacing: "var(--ra-tracking-caps)",
                  textTransform: "uppercase",
                  color: "var(--ra-color-muted)",
                }}
              >
                <span>{label}</span>
                <svg
                  viewBox={`0 0 ${w} ${h}`}
                  preserveAspectRatio="none"
                  width="100%"
                  height="2.2em"
                  style={{ display: "block" }}
                  aria-hidden="true"
                >
                  <line
                    x1="0"
                    y1={h - 1}
                    x2={w}
                    y2={h - 1}
                    stroke="var(--ra-color-border)"
                    strokeWidth="0.6"
                  />
                  <polyline
                    points={pts.join(" ")}
                    fill="none"
                    stroke={color}
                    strokeWidth="1.6"
                  />
                </svg>
                <span style={{ color }}>{value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** shannon · 故障复盘 */
export function PoolExhaustion() {
  return (
    <>
      <PoolExhaustionCover />
      <Article toc width="wide">
      <Hero
        eyebrow="故障复盘 · SRE"
        title="连接池耗尽：一次结算级联故障复盘"
        subtitle="一次看似无害的代码改动，如何在一个流量高峰里，把整条结算链路拖进 37 分钟的黑暗"
        meta={[
          { label: "严重度", value: "SEV-1" },
          { label: "影响时长", value: "37 min" },
          { label: "日期", value: "2026-06-07" },
        ]}
      />

      <Raw title="故障窗口内的两个黄金信号：延迟先抬头，错误率随后失控">
        <GoldenSignals />
      </Raw>

      <Incident
        title="结算服务连接池耗尽导致下单失败"
        severity="high"
        status="已恢复"
        impact="结算与下单接口大面积超时，成功率从 99.95% 跌至 12%，持续约 37 分钟，估算影响订单约 4.1 万笔。"
        rootCause="一次新增的外部库存校验调用被放在数据库连接持有期内，使每条连接的平均持有时间从 25ms 涨到 250ms；在晚高峰流量下，需求并发越过连接池容量，请求开始排队，排队又进一步拉长持有时间，正反馈将连接池彻底榨干。"
        resolution="回滚该改动并临时上调池容量与获取超时；随后将外部调用移出连接持有区间，补充连接获取超时与熔断。"
        timeline={[
          { when: "20:58", what: "含库存校验的版本灰度至结算服务全量节点。" },
          { when: "21:12", what: "晚高峰到来，p99 延迟开始抬升，连接池利用率告警。" },
          { when: "21:15", what: "下单成功率跌破 50%，触发 SEV-1，拉起作战群。" },
          { when: "21:31", what: "定位到连接池 acquire 等待飙升，怀疑连接泄漏 / 持有过久。" },
          { when: "21:42", what: "回滚库存校验版本，并把池容量临时从 20 调到 60。" },
          { when: "21:49", what: "成功率恢复至 99.9%，故障窗口关闭，进入观察。" },
        ]}
      />

      <Lead>
        故障的起点往往平平无奇。这一次，是一行"顺手"加在数据库查询之后的外部调用。它在测试环境里毫无异样，
        在低峰期也安然无事——直到晚高峰的流量把它推过一个临界点。这篇复盘不止讲"发生了什么"，更想讲清楚
        那个临界点为什么存在：连接池是一个有容量的排队系统，而它的崩溃，可以用一条很短的公式提前算出来。
      </Lead>

      <Section index="01" title="现象：延迟先动，错误率随后">
        <p>
          告警最先响的是延迟。21:12 起，结算服务的 p99 在三分钟里从一百多毫秒蹿到两秒以上；又过了两三分钟，
          错误率才开始失控。这个"延迟先于错误"的次序很关键——它几乎排除了下游数据库宕机（那会立刻报错），
          而更像是某种<strong>资源在排队</strong>：请求没有失败，只是都卡在了等待上，直到等待超时才转化为错误。
        </p>
        <p>
          上面那张黄金信号图把这段过程画在了同一条时间轴上：琥珀色是 p99 延迟，红色是错误率。两条线一前一后
          地冲顶，又在回滚后几乎同时落地。在暗底上读这种图有个好处——只有真正承载信息的两条信号线在发亮，
          背景噪声被压到最低。
        </p>
        <Aside tone="principle" label="一句话的核心">
          延迟先于错误地恶化，几乎总是"排队"的指纹：某个有限容量的资源被占满了，请求在门口排队，而不是被立刻拒绝。
        </Aside>
      </Section>

      <Section index="02" title="根因：连接池是一个排队系统">
        <p>
          要理解连接池为什么会枯竭，得先把它看成一个排队系统。一个容量为 <code>N</code> 的连接池，能同时服务的
          请求数有上限。一个经典的结论——利特尔法则（Little's Law）——告诉我们，系统里平均"在途"的请求数
          <code>L</code>，等于到达率 <code>λ</code> 乘以每个请求的平均停留时间 <code>W</code>：
        </p>
        <Formula
          block
          tex="L = \lambda\,W \qquad\Longrightarrow\qquad N_{\text{pool}} \;\ge\; \lambda\,W"
          caption="若要不排队，连接池容量 N 必须不小于需求并发 L = λW。一旦 λW 越过 N，请求开始排队。"
        />
        <p>
          故障前，每条连接的持有时间 <code>W</code> 约 25ms，晚高峰到达率约 120 req/s，于是需求并发只有
          <code>120 × 0.025 ≈ 3</code> 条，远在容量 20 之内，游刃有余。改动上线后，外部库存校验把 <code>W</code>
          拉到了约 250ms——需求并发瞬间变成 <code>120 × 0.25 = 30</code>，<strong>超过了池容量</strong>。多出来的请求
          只能排队等连接，而排队的时间又算进了停留时间 <code>W</code> 里，于是 <code>W</code> 继续变大、需求继续上涨，
          形成一个把池子越拖越干的正反馈。
        </p>
        <p>
          下面这块是可交互的：拖动到达率、持有时间与池容量，看需求并发 <code>L = λW</code> 如何越过容量、连接格
          如何从琥珀填满变成红色排队。试着只把"持有时间"从 0.03 拖到 0.25，复现这次故障的临界点：
        </p>
        <Raw title="利特尔法则下的连接池饱和：拖动滑块，越过临界点">
          <SaturationMeter />
        </Raw>
      </Section>

      <Section index="03" title="那一行改动到底错在哪">
        <p>
          问题代码本身读起来人畜无害：取一条连接、查一次库、再去调一个外部接口拿库存，最后把结果拼起来返回。
          错误不在任何一句单独的逻辑，而在它们的<strong>顺序与边界</strong>——那个慢、且不可控的外部调用，被夹在了
          "借连接"和"还连接"之间。
        </p>
        <CodeBlock language="javascript" title="orders-service/getOrder.js（故障版本）" code={reproCode} />
        <p>
          连接在 <code>fetchItemsFromAPI</code> 等待期间一直被占着不放。外部接口平时 10ms、偶尔抖到几百毫秒，
          这点抖动平时无人察觉，可一旦乘上高峰的请求量，就是连接池的灭顶之灾。更糟的是，这段代码没有为
          <code>pool.acquire()</code> 设置获取超时，于是请求宁可无限排队，也不肯尽早失败——把一次本可降级的局部
          抖动，放大成了全链路雪崩。
        </p>
        <Raw title="回压沿红色路径扩散：枯竭的连接池把上游一并拖垮">
          <BlastRadius />
        </Raw>
        <p>
          影响范围也因此超出了结算本身。如上图，结算服务卡死后，网关上指向它的工作线程被大量占用，连带拖慢了
          共享同一网关线程池的"用户"等接口——这就是单点资源耗尽如何沿调用链回压、把故障半径越扩越大。
        </p>
      </Section>

      <Section index="04" title="修复：把外部调用移出连接持有区间">
        <p>
          治本的修法只有一个方向：缩短 <code>W</code>。具体到这段代码，就是把不可控的外部调用挪到连接归还<strong>之后</strong>，
          让连接只在真正查库的那几毫秒里被占用；同时补上获取超时，让系统在压力下尽早失败、而不是无限排队。
        </p>
        <DiffReview
          file="orders-service/getOrder.js"
          title="把外部调用移出连接持有区间，并加上获取超时"
          lines={[
            { type: "ctx", text: "async function getOrder(id) {" },
            { type: "del", text: "  const conn = await pool.acquire();" },
            { type: "add", text: "  const conn = await pool.acquire({ timeoutMs: 200 });" },
            { type: "ctx", text: "  const order = await conn.query(" },
            { type: "ctx", text: "    \"SELECT * FROM orders WHERE id = $1\", [id]);" },
            { type: "del", text: "  const items = await fetchItemsFromAPI(order.itemIds);" },
            { type: "del", text: "  return { ...order, items };" },
            { type: "add", text: "  conn.release();                 // 先还连接" },
            { type: "add", text: "  const items = await fetchItemsFromAPI(order.itemIds);" },
            { type: "add", text: "  return { ...order, items };     // 外部调用已在池外" },
            { type: "ctx", text: "}" },
          ]}
          notes={[
            { ref: "acquire", text: "获取超时让请求在 200ms 拿不到连接时立刻失败，可被上游降级，避免无限排队。" },
            { ref: "release", text: "连接在外部调用前归还，持有时间回到查询本身的量级（约 25ms）。" },
          ]}
        />
        <p>
          改完之后，<code>W</code> 重新回到 25ms 上下，同样的高峰到达率下需求并发只剩约 3，连接池利用率回落到 15%。
          这不是把池子调大就能解决的问题——调大池容量只是把临界点往后挪了一点，而把慢调用移出持有区间，是把
          那个正反馈从根上掐断。
        </p>
      </Section>

      <Section index="05" title="遗留风险与一个决策">
        <p>
          故障恢复不等于复盘结束。这次事件暴露的不只是一行代码，还有几处一直存在、只是没被触发的隐患。把它们
          列清楚、各自指派责任人，才算真正合上闭环。
        </p>
        <RiskList
          risks={[
            {
              name: "其它服务也可能在连接持有期内做慢调用",
              impact: "high",
              likelihood: "medium",
              mitigation: "全量审计所有 pool.acquire 调用点，建立 lint 规则禁止在持有连接时发起网络 I/O。",
              owner: "结算与基础架构组",
              status: "进行中",
            },
            {
              name: "连接池缺乏获取超时与熔断，故障会无限放大",
              impact: "high",
              likelihood: "low",
              mitigation: "为所有连接池设置默认获取超时；在结算入口加入熔断与降级路径。",
              owner: "SRE",
              status: "待排期",
            },
            {
              name: "网关共享线程池，使单服务故障外溢",
              impact: "medium",
              likelihood: "medium",
              mitigation: "为关键下游隔离独立线程池（舱壁模式），限制单点故障的传播半径。",
              owner: "网关组",
              status: "待评审",
            },
          ]}
        />
        <p>
          最值得讨论的是熔断该怎么加——加在哪一层、用什么阈值。我们把候选方案与取舍摆出来，留下一个明确的决策记录：
        </p>
        <Decision
          question="如何防止下游慢调用再次把连接池拖垮？"
          options={[
            "只调大连接池容量与超时参数",
            "在结算服务入口接入熔断 + 降级",
            "为每个下游隔离独立连接 / 线程池（舱壁）",
          ]}
          criteria={[
            "能否从根上阻断正反馈，而非推迟临界点",
            "改造成本与回归风险",
            "对故障传播半径的限制能力",
          ]}
          recommended="入口熔断 + 降级，叠加关键下游的舱壁隔离"
          rationale="单纯调大池容量只是把临界点后移，治标不治本；熔断能在持有时间异常时尽早失败并降级，舱壁则把单点故障关在一个隔间里。两者组合，既掐断正反馈，又限制传播半径，改造成本可控。"
        />
        <Aside tone="warning" label="注意">
          本复盘中的数值（到达率、持有时间、池容量）为脱敏后的代表值，用于说明机理；真实数字与告警阈值以内部监控为准。
        </Aside>
      </Section>

      <Section index="06" title="复盘里真正该记住的">
        <p>
          每一次像样的故障，都会在事后显得"理应避免"。但它之所以发生，往往不是因为谁犯了低级错误，而是因为一个
          平时安全的系统，被推到了它从未被推到过的工况。连接池这次给我们的提醒是：它不是一个可以无限借用的资源
          口袋，而是一个有容量的排队系统——而排队系统的崩溃，是有公式、可预测、能提前防住的。
        </p>
        <Table
          caption="故障前后关键指标对比"
          source="数值为脱敏后的代表值。"
          columns={[
            { key: "metric", label: "指标", width: "14rem" },
            { key: "before", label: "故障峰值", align: "right" },
            { key: "after", label: "修复后", align: "right" },
          ]}
          rows={[
            { metric: "连接持有时间 W", before: "≈ 250 ms", after: "≈ 25 ms" },
            { metric: "需求并发 L = λW", before: "≈ 30", after: "≈ 3" },
            { metric: "连接池利用率", before: "100%（排队）", after: "≈ 15%" },
            { metric: "下单成功率", before: "12%", after: "99.95%" },
            { metric: "p99 延迟", before: "> 2000 ms", after: "≈ 140 ms" },
          ]}
        />
      </Section>

      <Conclusion
        takeaways={[
          "连接池是有容量的排队系统：要不排队，必须满足 N ≥ λW。",
          "绝不要在持有数据库连接期间发起慢的、不可控的外部调用——它会撑大 W、引发正反馈。",
          "为连接获取设置超时、为入口加熔断与舱壁，把局部抖动关在隔间里，别让它变成全链路雪崩。",
        ]}
      >
        这次故障的全部教训，几乎都能收进那条短短的 <code>N ≥ λW</code> 里。改动让 W 涨了十倍，于是需求并发越过了
        池容量，剩下的只是正反馈把它收尾。把慢调用请出连接持有区间，再给系统留好尽早失败的出口——下一个晚高峰
        来临时，那条琥珀色的延迟线，就不会再有机会冲顶。
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
          · shannon theme
        </footer>
      </Raw>
      </Article>
    </>
  );
}
