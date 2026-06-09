import {
  Article,
  Hero,
  Lead,
  Section,
  Subsection,
  Aside,
  Quote,
  Table,
  Formula,
  CodeBlock,
  Conclusion,
  Raw,
} from "reacticle";

/*
 * A `knuth` academic preprint on linear-attention via kernel feature maps.
 * Computer-Modern serif, numbered sections, equation- and figure-forward. The
 * body is formal prose; Formula carries the derivations, Tables the complexity
 * and results, an Aside states a proposition. Every Raw is a numbered Figure
 * drawn on the paper in --ra-* tokens — a complexity curve, a dense attention
 * matrix, a measured runtime plot — never a marketing visual, so it reads like
 * a journal page and switches with the theme.
 */

/* ---- bespoke Raw figures for this preprint, used nowhere else ---- */

/** Figure 1 — quadratic vs. linear cost as a function of sequence length. */
function ComplexityCurve() {
  const w = 380;
  const h = 180;
  const ml = 36;
  const mr = 16;
  const mt = 16;
  const mb = 30;
  const plotW = w - ml - mr;
  const plotH = h - mt - mb;
  const N = 1;
  const X = (n: number) => ml + (n / N) * plotW;
  const Y = (v: number) => mt + (1 - v) * plotH;
  const quad: string[] = [];
  const lin: string[] = [];
  for (let n = 0; n <= N; n += 0.02) {
    quad.push(`${X(n).toFixed(1)},${Y(n * n).toFixed(1)}`);
    lin.push(`${X(n).toFixed(1)},${Y(n * 0.45).toFixed(1)}`);
  }
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: "block" }} role="img" aria-label="二次与线性复杂度随序列长度的增长">
      <line x1={ml} y1={mt} x2={ml} y2={mt + plotH} stroke="var(--ra-color-border-strong)" />
      <line x1={ml} y1={mt + plotH} x2={ml + plotW} y2={mt + plotH} stroke="var(--ra-color-border-strong)" />
      <polyline points={quad.join(" ")} fill="none" stroke="var(--ra-color-risk)" strokeWidth="1.6" />
      <polyline points={lin.join(" ")} fill="none" stroke="var(--ra-color-accent)" strokeWidth="1.6" />
      <text x={X(0.82)} y={Y(0.72)} style={{ fontFamily: "var(--ra-font-mono)", fontSize: "10px", fill: "var(--ra-color-risk)" }}>O(n²d)</text>
      <text x={X(0.82)} y={Y(0.42)} style={{ fontFamily: "var(--ra-font-mono)", fontSize: "10px", fill: "var(--ra-color-accent)" }}>O(nd²)</text>
      <text x={ml + plotW / 2} y={mt + plotH + 22} textAnchor="middle" style={{ fontFamily: "var(--ra-font-label)", fontSize: "10px", fill: "var(--ra-color-muted)" }}>序列长度 n →</text>
      <text x={ml - 6} y={mt + 8} textAnchor="end" style={{ fontFamily: "var(--ra-font-label)", fontSize: "10px", fill: "var(--ra-color-muted)" }}>成本</text>
    </svg>
  );
}

/** Figure 2 — a dense softmax attention matrix (each cell an attention weight). */
function AttentionMatrix() {
  const n = 12;
  const cell = 16;
  const gap = 2;
  const ml = 8;
  const mt = 8;
  // a plausible attention pattern: diagonal-dominant with some long-range mass
  const weight = (i: number, j: number) => {
    const local = Math.exp(-Math.abs(i - j) / 2.2);
    const sink = j === 0 ? 0.5 : 0; // attention sink at first token
    return Math.min(1, local + sink);
  };
  const size = ml * 2 + n * (cell + gap);
  return (
    <svg viewBox={`0 0 ${size + 30} ${size + 10}`} width="100%" style={{ display: "block", maxWidth: "320px", margin: "0 auto" }} role="img" aria-label="稠密的 softmax 注意力权重矩阵">
      {Array.from({ length: n }).map((_, i) =>
        Array.from({ length: n }).map((_, j) => {
          if (j > i) return null; // causal mask
          const x = ml + j * (cell + gap);
          const y = mt + i * (cell + gap);
          return (
            <rect key={`${i}-${j}`} x={x} y={y} width={cell} height={cell} fill="var(--ra-color-accent)" opacity={0.12 + 0.88 * weight(i, j)} />
          );
        })
      )}
      <text x={ml} y={size + 4} style={{ fontFamily: "var(--ra-font-label)", fontSize: "10px", fill: "var(--ra-color-muted)" }}>键 j →</text>
      <text x={size + 4} y={mt + 10} style={{ fontFamily: "var(--ra-font-label)", fontSize: "10px", fill: "var(--ra-color-muted)" }} transform={`rotate(90 ${size + 4} ${mt + 10})`}>查询 i →</text>
    </svg>
  );
}

/** Figure 3 — measured forward-pass runtime, quadratic vs. linear. */
function RuntimePlot() {
  const data = [
    { n: "512", quad: 6, lin: 9 },
    { n: "1k", quad: 22, lin: 18 },
    { n: "2k", quad: 86, lin: 37 },
    { n: "4k", quad: 340, lin: 74 },
    { n: "8k", quad: 1360, lin: 150 },
  ];
  const w = 380;
  const h = 180;
  const ml = 40;
  const mr = 16;
  const mt = 14;
  const mb = 28;
  const plotW = w - ml - mr;
  const plotH = h - mt - mb;
  const max = 1360;
  const X = (i: number) => ml + (i / (data.length - 1)) * plotW;
  const Y = (v: number) => mt + (1 - Math.log10(v + 1) / Math.log10(max + 1)) * plotH;
  const q = data.map((d, i) => `${X(i).toFixed(1)},${Y(d.quad).toFixed(1)}`).join(" ");
  const l = data.map((d, i) => `${X(i).toFixed(1)},${Y(d.lin).toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: "block" }} role="img" aria-label="实测前向耗时：二次与线性注意力">
      <line x1={ml} y1={mt} x2={ml} y2={mt + plotH} stroke="var(--ra-color-border-strong)" />
      <line x1={ml} y1={mt + plotH} x2={ml + plotW} y2={mt + plotH} stroke="var(--ra-color-border-strong)" />
      <polyline points={q} fill="none" stroke="var(--ra-color-risk)" strokeWidth="1.6" />
      <polyline points={l} fill="none" stroke="var(--ra-color-accent)" strokeWidth="1.6" />
      {data.map((d, i) => (
        <g key={d.n}>
          <circle cx={X(i)} cy={Y(d.quad)} r={2.4} fill="var(--ra-color-risk)" />
          <circle cx={X(i)} cy={Y(d.lin)} r={2.4} fill="var(--ra-color-accent)" />
          <text x={X(i)} y={mt + plotH + 14} textAnchor="middle" style={{ fontFamily: "var(--ra-font-mono)", fontSize: "9px", fill: "var(--ra-color-faint)" }}>{d.n}</text>
        </g>
      ))}
      <text x={X(3.1)} y={Y(340) - 6} style={{ fontFamily: "var(--ra-font-mono)", fontSize: "9px", fill: "var(--ra-color-risk)" }}>softmax</text>
      <text x={X(3.1)} y={Y(74) + 12} style={{ fontFamily: "var(--ra-font-mono)", fontSize: "9px", fill: "var(--ra-color-accent)" }}>linear</text>
      <text x={ml - 6} y={mt + 6} textAnchor="end" style={{ fontFamily: "var(--ra-font-label)", fontSize: "9px", fill: "var(--ra-color-muted)" }}>ms(log)</text>
    </svg>
  );
}

const algoCode = `# 线性注意力前向：先聚合 KV，再对每个查询投影
# 复杂度 O(n d^2)，显存 O(d^2)，且可流式增量更新
def linear_attention(Q, K, V, phi):
    # Q, K: [n, d]   V: [n, d]
    Kp = phi(K)                 # [n, d]   特征映射
    S  = Kp.T @ V               # [d, d]   ← 全局聚合，只算一次
    Z  = Kp.sum(axis=0)         # [d]      ← 归一化项
    Qp = phi(Q)                 # [n, d]
    num = Qp @ S                # [n, d]
    den = Qp @ Z                # [n]
    return num / den[:, None]   # [n, d]`;

/* ---- cover · arXiv 预印本风：n×n 注意力 ≈ d×d 状态 ---- */

/** Cover —— 上字下图（模板 A）：arXiv 文头 + 大字标题 + 一张"压缩了一个 n"的图版。 */
function LinearAttentionCover() {
  const N = 12; // n in the dense attention matrix
  // a plausible causal attention pattern: diagonal-dominant with an attention sink
  const attnW = (i: number, j: number) => {
    if (j > i) return 0;
    const local = Math.exp(-Math.abs(i - j) / 2.4);
    const sink = j === 0 ? 0.45 : 0;
    return Math.min(1, local + sink);
  };

  // Dense n×n grid coords (viewBox 600×360 below)
  const Lcell = 13;
  const Lgap = 1;
  const Lstep = Lcell + Lgap;
  const Lx0 = 56;
  const Ly0 = 52;
  const Lspan = N * Lstep - Lgap;

  // d×d state grid (d = 3 cells, deliberately tiny next to n×n)
  const Scell = 26;
  const Sgap = 2;
  const Sstep = Scell + Sgap;
  const Sx0 = 384;
  const Sy0 = 108;
  const Sspan = 3 * Sstep - Sgap;

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
          display: "flex",
          flexDirection: "column",
          padding: "var(--ra-space-6, 2rem) var(--ra-space-7, 3rem)",
          fontFamily: "var(--ra-font-body)",
          color: "var(--ra-color-text, var(--ra-color-fg, inherit))",
        }}
      >
        {/* ── arXiv-style top line + hairline rule ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontFamily: "var(--ra-font-mono)",
            fontSize: "var(--ra-text-xs, 0.74rem)",
            color: "var(--ra-color-muted)",
            letterSpacing: "0.02em",
            paddingBottom: "var(--ra-space-3, 0.75rem)",
            borderBottom:
              "1px solid var(--ra-color-border-strong, currentColor)",
          }}
        >
          <span>arXiv:2606.0001v1 [cs.LG]</span>
          <span>2026 · 06 · 08</span>
        </div>

        {/* ── Title block (top ~1/3) ── */}
        <div
          style={{
            paddingTop: "var(--ra-space-6, 2rem)",
            paddingBottom: "var(--ra-space-5, 1.5rem)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--ra-font-mono)",
              fontSize: "var(--ra-text-xs, 0.74rem)",
              color: "var(--ra-color-muted)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "var(--ra-space-3, 0.75rem)",
            }}
          >
            preprint · note
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--ra-font-heading, var(--ra-font-body))",
              fontWeight: "var(--ra-weight-bold, 700)",
              fontSize: "clamp(1.6rem, 6vw, var(--ra-text-4xl, 2.4rem))",
              lineHeight: "var(--ra-leading-tight, 1.2)",
              color: "var(--ra-color-heading, inherit)",
            }}
          >
            线性化自注意力
          </h1>
          <p
            style={{
              margin: "var(--ra-space-3, 0.75rem) auto 0",
              fontFamily: "var(--ra-font-body)",
              fontSize: "var(--ra-text-base, 1.02rem)",
              color: "var(--ra-color-muted)",
              maxWidth: "26rem",
              lineHeight: "var(--ra-leading-snug, 1.4)",
            }}
          >
            核结合律 · 一行从二次到线性
          </p>
        </div>

        {/* ── Visual section (bottom ~2/3) ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: 0,
            gap: "var(--ra-space-3, 0.75rem)",
          }}
        >
          <svg
            viewBox="0 0 600 360"
            width="100%"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="稠密的 n×n 注意力矩阵被压缩为一个与序列长度无关的 d×d 聚合状态"
            style={{ display: "block" }}
          >
            {/* Left label */}
            <text
              x={Lx0 + Lspan / 2}
              y={32}
              textAnchor="middle"
              style={{
                fontFamily: "var(--ra-font-body)",
                fontSize: "13px",
                fontWeight: 700,
                fill: "var(--ra-color-heading)",
              }}
            >
              softmax 注意力
            </text>

            {/* Dense n×n attention matrix */}
            {Array.from({ length: N }).map((_, i) =>
              Array.from({ length: N }).map((_, j) => (
                <rect
                  key={`L-${i}-${j}`}
                  x={Lx0 + j * Lstep}
                  y={Ly0 + i * Lstep}
                  width={Lcell}
                  height={Lcell}
                  fill="var(--ra-color-accent)"
                  opacity={0.08 + 0.88 * attnW(i, j)}
                />
              )),
            )}

            {/* Matrix brackets (left) */}
            <path
              d={`M ${Lx0 - 6} ${Ly0 - 4} L ${Lx0 - 12} ${Ly0 - 4} L ${Lx0 - 12} ${Ly0 + Lspan + 4} L ${Lx0 - 6} ${Ly0 + Lspan + 4}`}
              fill="none"
              stroke="var(--ra-color-heading)"
              strokeWidth="1.2"
            />
            <path
              d={`M ${Lx0 + Lspan + 6} ${Ly0 - 4} L ${Lx0 + Lspan + 12} ${Ly0 - 4} L ${Lx0 + Lspan + 12} ${Ly0 + Lspan + 4} L ${Lx0 + Lspan + 6} ${Ly0 + Lspan + 4}`}
              fill="none"
              stroke="var(--ra-color-heading)"
              strokeWidth="1.2"
            />

            {/* Left dimension annotation */}
            <text
              x={Lx0 + Lspan / 2}
              y={Ly0 + Lspan + 28}
              textAnchor="middle"
              style={{
                fontFamily: "var(--ra-font-mono)",
                fontSize: "12px",
                fill: "var(--ra-color-muted)",
              }}
            >
              n × n  ·  Θ(n²) 显存
            </text>

            {/* ≈ */}
            <text
              x={(Lx0 + Lspan + 12 + Sx0 - 12) / 2}
              y={Ly0 + Lspan / 2 + 14}
              textAnchor="middle"
              style={{
                fontFamily: "var(--ra-font-body)",
                fontSize: "40px",
                fontWeight: 400,
                fill: "var(--ra-color-heading)",
              }}
            >
              ≈
            </text>

            {/* Right label */}
            <text
              x={Sx0 + Sspan / 2}
              y={32}
              textAnchor="middle"
              style={{
                fontFamily: "var(--ra-font-body)",
                fontSize: "13px",
                fontWeight: 700,
                fill: "var(--ra-color-heading)",
              }}
            >
              聚合状态 S
            </text>

            {/* d×d compressed state matrix */}
            {Array.from({ length: 3 }).map((_, i) =>
              Array.from({ length: 3 }).map((_, j) => {
                const v = 0.42 + 0.34 * Math.sin((i * 1.3 + j * 2.1) + 0.3);
                return (
                  <rect
                    key={`S-${i}-${j}`}
                    x={Sx0 + j * Sstep}
                    y={Sy0 + i * Sstep}
                    width={Scell}
                    height={Scell}
                    fill="var(--ra-color-accent)"
                    opacity={Math.max(0.18, Math.min(0.92, v))}
                  />
                );
              }),
            )}

            {/* Matrix brackets (right) */}
            <path
              d={`M ${Sx0 - 5} ${Sy0 - 4} L ${Sx0 - 10} ${Sy0 - 4} L ${Sx0 - 10} ${Sy0 + Sspan + 4} L ${Sx0 - 5} ${Sy0 + Sspan + 4}`}
              fill="none"
              stroke="var(--ra-color-heading)"
              strokeWidth="1.2"
            />
            <path
              d={`M ${Sx0 + Sspan + 5} ${Sy0 - 4} L ${Sx0 + Sspan + 10} ${Sy0 - 4} L ${Sx0 + Sspan + 10} ${Sy0 + Sspan + 4} L ${Sx0 + Sspan + 5} ${Sy0 + Sspan + 4}`}
              fill="none"
              stroke="var(--ra-color-heading)"
              strokeWidth="1.2"
            />

            {/* Right dimension annotation */}
            <text
              x={Sx0 + Sspan / 2}
              y={Sy0 + Sspan + 22}
              textAnchor="middle"
              style={{
                fontFamily: "var(--ra-font-mono)",
                fontSize: "12px",
                fill: "var(--ra-color-muted)",
              }}
            >
              d × d  ·  与 n 无关
            </text>
            <text
              x={Sx0 + Sspan / 2}
              y={Sy0 + Sspan + 40}
              textAnchor="middle"
              style={{
                fontFamily: "var(--ra-font-body)",
                fontSize: "11px",
                fill: "var(--ra-color-faint)",
              }}
            >
              S = Σⱼ φ(kⱼ) vⱼᵀ
            </text>

            {/* hairline divider above the cost line */}
            <line
              x1={120}
              y1={296}
              x2={480}
              y2={296}
              stroke="var(--ra-color-border-strong)"
              strokeWidth="0.8"
            />

            {/* cost: O(n²d) → O(nd²) */}
            <text
              x={200}
              y={326}
              textAnchor="middle"
              style={{
                fontFamily: "var(--ra-font-mono)",
                fontSize: "18px",
                fill: "var(--ra-color-risk)",
              }}
            >
              O(n²d)
            </text>
            <text
              x={300}
              y={326}
              textAnchor="middle"
              style={{
                fontFamily: "var(--ra-font-body)",
                fontSize: "22px",
                fontWeight: 400,
                fill: "var(--ra-color-heading)",
              }}
            >
              ⟶
            </text>
            <text
              x={400}
              y={326}
              textAnchor="middle"
              style={{
                fontFamily: "var(--ra-font-mono)",
                fontSize: "18px",
                fill: "var(--ra-color-accent)",
              }}
            >
              O(nd²)
            </text>
          </svg>

          {/* Figure caption */}
          <div
            style={{
              fontFamily: "var(--ra-font-label)",
              fontSize: "var(--ra-text-xs, 0.74rem)",
              color: "var(--ra-color-muted)",
              textAlign: "center",
              letterSpacing: "0.02em",
              lineHeight: 1.4,
              padding: "0 var(--ra-space-3, 0.75rem)",
            }}
          >
            <span
              style={{
                fontWeight: "var(--ra-weight-bold, 700)",
                color: "var(--ra-color-heading)",
              }}
            >
              Figure.
            </span>{" "}
            把 n×n 的注意力矩阵替换为一个与序列长度无关的 d×d 聚合状态。
          </div>
        </div>
      </div>
    </section>
  );
}

/** knuth · 预印本 */
export function LinearAttention() {
  return (
    <>
      <LinearAttentionCover />
      <Article toc width="regular">
      <Hero
        eyebrow="预印本 · 机器学习"
        title="以核特征映射线性化自注意力：一个复杂度视角"
        subtitle="把 softmax 注意力重写为核相似度，便能用结合律将二次复杂度降到线性——本文给出推导、算法与数值验证"
        meta={[
          { label: "分类", value: "cs.LG" },
          { label: "日期", value: "2026-06-08" },
          { label: "预印", value: "v1 · 草稿" },
        ]}
      />

      <Lead>
        摘要——自注意力是 Transformer 的核心，但其对序列长度 n 的二次复杂度 O(n²d) 限制了长序列的应用。本文从核
        方法的视角重述注意力：将 softmax 相似度替换为一个非负特征映射 φ 的内积 φ(q)⊤φ(k)，使分子与分母都可借助
        矩阵乘法的结合律先行聚合，从而把复杂度降至关于 n 线性的 O(nd²)，显存降至与序列长度无关的 O(d²)，并天然
        支持自回归推理的常数显存增量更新。我们给出形式化推导、一个 O(nd²) 的前向算法，并在 512–8k 长度上以实测
        前向耗时验证其线性增长。
      </Lead>

      <Section index="1" title="引言">
        <p>
          自 Transformer 提出以来，自注意力机制已成为序列建模的事实标准。给定查询、键、值矩阵 Q、K、V ∈ ℝ^{"{n×d}"}，
          标准的缩放点积注意力定义为
        </p>
        <Formula
          block
          tex="\mathrm{Attn}(Q,K,V) = \mathrm{softmax}\!\left(\frac{QK^{\top}}{\sqrt{d}}\right) V ."
          caption="式 (1)：缩放点积注意力。softmax 沿键的维度逐行归一化。"
        />
        <p>
          其表达力的代价在于，括号内的 QK⊤ 是一个 n×n 的矩阵：它的构造与 softmax 归一化都需要 Θ(n²) 的时间与显存。
          当 n 从数百增长到数千乃至更长，这一项迅速主导整体开销（图 1）。本文关注的问题是：能否在不显式构造该
          n×n 矩阵的前提下，得到一个在 n 上线性的注意力。
        </p>
        <Raw title="图 1：二次与线性成本随序列长度 n 的增长">
          <ComplexityCurve />
        </Raw>
        <p>
          直观上，softmax 注意力之所以"贵"，是因为它先对所有查询–键对计算两两相似度、再归一化。若能把相似度写成
          某种<strong>可分解</strong>的形式，使其对键的求和能与查询解耦，便可借助矩阵乘法的结合律改变计算顺序，避开那个
          n×n 中间量。这正是核视角给出的钥匙。
        </p>
      </Section>

      <Section index="2" title="标准自注意力的复杂度">
        <p>
          先把开销算清楚。把式 (1) 按非归一化的形式逐行展开，第 i 个输出为
        </p>
        <Formula
          block
          tex="o_i = \frac{\sum_{j=1}^{n} \mathrm{sim}(q_i, k_j)\, v_j}{\sum_{j=1}^{n} \mathrm{sim}(q_i, k_j)}, \qquad \mathrm{sim}(q,k) = \exp\!\Big(\tfrac{q^{\top}k}{\sqrt{d}}\Big)."
          caption="式 (2)：把注意力写成相似度加权平均。softmax 对应指数相似度。"
        />
        <p>
          对每一个查询 i，分子与分母都要遍历全部 n 个键，于是总计为 Θ(n²) 次相似度运算、每次 O(d)，即 O(n²d)。
          注意这里的瓶颈不是某个常数因子，而是 sim 把 q 与 k 纠缠在指数里——求和号无法穿过它把 k 单独提出来，
          因此对每个查询都不得不重新扫一遍所有键。下表对照了两种注意力的渐近开销：
        </p>
        <Table
          caption="表 1：两种注意力的渐近复杂度（n 为序列长度，d 为特征维度）"
          source="自回归推理时的显存指每步缓存的状态大小。"
          columns={[
            { key: "kind", label: "方法", width: "12rem" },
            { key: "time", label: "时间", align: "right" },
            { key: "mem", label: "显存", align: "right" },
            { key: "ar", label: "自回归每步显存", align: "right" },
          ]}
          rows={[
            { kind: "softmax 注意力", time: "O(n²d)", mem: "O(n²)", ar: "O(nd)" },
            { kind: "线性注意力（本文）", time: "O(nd²)", mem: "O(d²)", ar: "O(d²)" },
          ]}
        />
        <p>
          这种稠密性可以直接看出来。图 2 画出了一个典型的（因果掩码下）softmax 注意力权重矩阵：颜色越深，权重越大。
          除了对角线附近的局部聚焦，首个 token 上还常出现一条"注意力汇"（attention sink）。无论模式如何，整个下三角
          都被填满——这 Θ(n²) 个权重，正是我们想要绕开的。
        </p>
        <Raw title="图 2：一个稠密的因果 softmax 注意力矩阵（深色为大权重）">
          <AttentionMatrix />
        </Raw>
      </Section>

      <Section index="3" title="核视角下的线性化">
        <p>
          核心想法是：把式 (2) 中纠缠的指数相似度，替换为一个特征映射 φ : ℝ^d → ℝ^d 的内积，
        </p>
        <Formula
          block
          tex="\mathrm{sim}(q,k) \;\approx\; \phi(q)^{\top}\phi(k), \qquad \phi(x) = \mathrm{elu}(x) + 1 \;>\; 0 ."
          caption="式 (3)：以非负特征映射的内积近似相似度核。φ 取逐元素 elu+1 以保证正性。"
        />
        <p>
          φ 的非负性保证了注意力权重仍为正、归一化仍有良定义。把式 (3) 代入式 (2)，关键的一步是利用内积对求和的
          线性性，把对键的求和移到与查询无关的位置：
        </p>
        <Formula
          block
          tex="o_i = \frac{\sum_{j} \big(\phi(q_i)^{\top}\phi(k_j)\big) v_j}{\sum_{j} \phi(q_i)^{\top}\phi(k_j)} = \frac{\phi(q_i)^{\top} \big(\sum_{j} \phi(k_j)\, v_j^{\top}\big)}{\phi(q_i)^{\top} \big(\sum_{j} \phi(k_j)\big)}."
          caption="式 (4)：把 φ(q_i)⊤ 提到求和号外，对键的聚合便与查询解耦。"
        />
        <p>
          式 (4) 右端的两个括号——矩阵 <code>S = Σ_j φ(k_j) v_j⊤ ∈ ℝ^{"{d×d}"}</code> 与向量
          <code>z = Σ_j φ(k_j) ∈ ℝ^d</code>——都<strong>不依赖于查询下标 i</strong>，因此只需计算一次。随后每个查询只是与这两个
          已聚合的量做一次投影。这就是从"每个查询都扫一遍键"到"先聚合一次、再逐查询投影"的转变。
        </p>
        <Aside tone="principle" label="命题 1（复杂度）">
          在特征映射式 (3) 下，按式 (4) 计算全部 n 个输出的时间复杂度为 O(nd²)，与序列长度 n 成线性；存储聚合量
          S、z 的显存为 O(d²)，与 n 无关。
        </Aside>
        <Subsection index="3.1" title="证明梗概">
          <p>
            构造 S 需对 n 个键各做一次 d×d 的外积累加，计 O(nd²)；构造 z 计 O(nd)。给定 S、z，每个查询 i 的分子是一次
            φ(q_i)⊤S 的 1×d 与 d×d 乘法，计 O(d²)，分母是一次 O(d) 内积；n 个查询合计 O(nd²)。三项相加仍为 O(nd²)。
            存储 S 需 O(d²)、z 需 O(d)，与 n 无关。∎
          </p>
        </Subsection>
        <Subsection index="3.2" title="自回归的增量形式">
          <p>
            在因果（自回归）设定下，第 i 个输出只允许看见 j ≤ i 的键值。此时聚合量可写成前缀和 S_i = S_{"{i-1}"} + φ(k_i)v_i⊤，
            z_i = z_{"{i-1}"} + φ(k_i)。于是推理可逐步进行，每步只维护一个 d×d 的状态 S 与一个 d 维的 z——显存为常数
            O(d²)，与已生成的长度无关。这与 softmax 注意力每步 O(nd) 的 KV 缓存形成鲜明对比（表 1 末列）。
          </p>
        </Subsection>
      </Section>

      <Section index="4" title="算法">
        <p>
          把式 (4) 直接翻译成代码，全部要点只有三步：以 φ 映射键、聚合出 S 与 z、再对每个查询投影并归一化。下面是
          非因果（双向）情形的参考实现，复杂度 O(nd²)：
        </p>
        <CodeBlock language="python" title="linear_attention.py" code={algoCode} />
        <p>
          值得强调的是 <code>S = Kp.T @ V</code> 这一行：它把对键的全部信息压缩进一个与 n 无关的 d×d 矩阵，是整个方法
          得以线性的关键。相较之下，softmax 注意力必须显式实例化 <code>Q @ K.T</code> 这个 n×n 矩阵——正是后者让长序列
          的显存难以为继。
        </p>
      </Section>

      <Section index="5" title="数值验证">
        <p>
          我们在固定特征维度 d = 64 下，测量两种注意力前向传播的耗时随序列长度的变化。图 3 以对数纵轴画出结果：
          softmax 注意力（红）在 n 翻倍时耗时约增四倍，呈清晰的二次增长；而线性注意力（蓝）近似随 n 线性增长，
          在 n = 8k 时已快出约一个数量级。
        </p>
        <Raw title="图 3：实测前向耗时随序列长度的增长（纵轴对数）">
          <RuntimePlot />
        </Raw>
        <Table
          caption="表 2：前向耗时实测（d = 64，单位 ms，数值为示意）"
          source="同一硬件、同一精度下的相对趋势；绝对值随实现与设备而异。"
          columns={[
            { key: "n", label: "序列长度 n", align: "right" },
            { key: "soft", label: "softmax", align: "right" },
            { key: "lin", label: "linear", align: "right" },
            { key: "speed", label: "加速比", align: "right" },
          ]}
          rows={[
            { n: "512", soft: "6", lin: "9", speed: "0.7×" },
            { n: "1024", soft: "22", lin: "18", speed: "1.2×" },
            { n: "2048", soft: "86", lin: "37", speed: "2.3×" },
            { n: "4096", soft: "340", lin: "74", speed: "4.6×" },
            { n: "8192", soft: "1360", lin: "150", speed: "9.1×" },
          ]}
        />
        <p>
          注意在最短的 n = 512 处，线性注意力反而略慢：O(nd²) 中的 d² 常数因子在短序列上还未被 n 的优势摊薄。两条
          曲线的交叉点出现在 n ≈ 1k 附近——这与"渐近更优不等于处处更快"的一般规律一致，也提示该方法的收益主要
          兑现于长序列。
        </p>
      </Section>

      <Section index="6" title="讨论与局限">
        <p>
          线性化并非没有代价。式 (3) 用一个有限维特征映射近似 softmax 核，其表达力严格弱于原始的指数相似度；在需要
          极尖锐、近乎独热的注意力分布的任务上，这一近似可能损失精度。如何设计或学习更好的 φ（例如随机特征、
          可学习核），是一条活跃的研究线。
        </p>
        <Quote who="Katharopoulos 等" source="《Transformers are RNNs》, 2020">
          一旦把注意力写成核的形式，自回归 Transformer 便等价于一个具有线性时间、常数显存的循环网络。
        </Quote>
        <p>
          这一等价也揭示了方法的本质张力：把注意力压缩进一个固定大小的 d×d 状态，意味着它和 RNN 一样，要把任意长
          的历史塞进有限的记忆里。因此线性注意力在超长依赖上的表现，最终受限于状态容量 d²，而非序列长度——这既是
          它常数显存的来源，也是它表达力的天花板。
        </p>
        <Aside tone="note" label="可复现性">
          本文图表数值为说明性示意，用于展示复杂度的定性趋势；精确数字取决于具体实现、精度与硬件。式 (1)–(4) 的推导
          不依赖于这些数值。
        </Aside>
      </Section>

      <Conclusion
        title="结论"
        takeaways={[
          "把 softmax 相似度替换为非负特征映射的内积 φ(q)⊤φ(k)，即可用结合律避开 n×n 中间矩阵。",
          "由此得到的注意力时间复杂度为 O(nd²)、显存 O(d²)，并支持自回归的常数显存增量更新。",
          "收益主要兑现于长序列；代价是有限维 φ 的表达力弱于指数核，且长依赖受状态容量 d² 限制。",
        ]}
      >
        自注意力的二次开销，根源在于 softmax 把查询与键纠缠进一个不可分解的相似度里。核视角的贡献，是用一个可分解
        的内积近似它，从而让"对键求和"这一步得以与查询解耦、提前完成。代价与收益都来自同一处：把历史压进一个固定
        的 d×d 状态——它换来了关于序列长度的线性，也划定了表达力的边界。在长序列日益重要的今天，这一权衡值得被
        反复审视。
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
          · knuth theme
        </footer>
      </Raw>
    </Article>
    </>
  );
}
