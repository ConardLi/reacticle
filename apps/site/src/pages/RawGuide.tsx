import {
  ThemeProvider,
  Article,
  Aside,
  RiskList,
  Checkpoint,
  Table,
} from "reacticle";
import { CodeBlock } from "../components/CodeBlock";
import type { TocEntry } from "../components/OnThisPage";
import { DEFAULT_THEME } from "../lib/site";

export const rawToc: TocEntry[] = [
  { id: "what", label: "Raw 是什么" },
  { id: "when", label: "什么时候用 Raw" },
  { id: "tokens", label: "必须使用主题 token" },
  { id: "antipatterns", label: "反模式" },
  { id: "good-vs-bad", label: "好 Raw vs 差 Raw" },
  { id: "checklist", label: "提交前 checklist" },
];

const GOOD = `<Raw>
  <div className="ra-flow">
    <span className="ra-flow__node">输入</span>
    <span className="ra-flow__edge" aria-hidden="true">→</span>
    <span className="ra-flow__node">解析</span>
    <span className="ra-flow__edge" aria-hidden="true">→</span>
    <span className="ra-flow__node">输出</span>
  </div>
</Raw>

/* 配套 CSS：只引用主题 token，不写硬编码颜色 */
.ra-flow {
  display: inline-flex;
  align-items: center;
  gap: var(--ra-space-3);
  padding: var(--ra-space-3) var(--ra-space-4);
  border: 1px solid var(--ra-color-border);
  background: var(--ra-color-surface);
  border-radius: var(--ra-radius-md);
}
.ra-flow__node {
  font: var(--ra-text-mono);
  color: var(--ra-color-text);
}
.ra-flow__edge {
  color: var(--ra-color-accent);
}`;

const BAD = `<Raw>
  {/* ❌ 硬编码颜色 — 切主题不变色 */}
  <div style={{ background: "#3b82f6", color: "#fff", padding: 16 }}>
    输入 → 解析 → 输出
  </div>

  {/* ❌ 玻璃拟态 — 任何主题都不该出现 */}
  <div className="backdrop-blur bg-white/40 border border-white/20">…</div>

  {/* ❌ Tailwind 默认 token — 与主题契约脱节 */}
  <div className="rounded-2xl shadow-xl text-blue-600">…</div>

  {/* ❌ 营销 hero / 渐变光晕 / 3D 图标 */}
</Raw>`;

const TOKENS = `/* 颜色 */
--ra-color-bg          /* 页面纸面 */
--ra-color-surface     /* 卡 / 面板底色 */
--ra-color-text        /* 主文本 */
--ra-color-muted       /* 次要文本 */
--ra-color-border      /* 发丝线 */
--ra-color-accent      /* 主题主色（结构 / 重点） */
--ra-color-risk        /* 风险红，仅在真正风险时使用 */

/* 排版 */
--ra-font-body         /* 正文字族 */
--ra-font-mono         /* 等宽字族 */
--ra-text-h1 / --ra-text-h2 / --ra-text-body / --ra-text-mono

/* 节奏 */
--ra-space-1 ... --ra-space-6
--ra-radius-sm / --ra-radius-md
--ra-shadow-sm / --ra-shadow-md`;

export function RawGuidePage() {
  const theme = DEFAULT_THEME;
  return (
    <>
      <div className="page-head">
        <span className="kicker">Raw 自由层</span>
        <h1>Raw 自由层守则</h1>
        <p>
          <code className="inline">Raw</code> 是 ReActicle 的开口：当语义组件不
          够表达时，作者可以在 Raw 里写任意 JSX。但 Raw 不是免税区——它依然受主题
          token 约束。
        </p>
      </div>

      <div className="prose">
        <h2 className="anchor" id="what">
          Raw 是什么
        </h2>
        <p>
          ReActicle 的语义层是一组受限组件：<code className="inline">Section</code>、
          <code className="inline">Aside</code>、<code className="inline">Decision</code>{" "}
          ……每个都有清晰的 props 契约。<code className="inline">Raw</code> 则是
          <b>主动逃生口</b>：包住任何手写 JSX / 内联 SVG，使其在文章流里仍按主题 token
          上色。
        </p>
        <ThemeProvider theme={theme}>
          <Article>
            <Aside tone="principle" label="一句话原则">
              <b>能用语义组件就别用 Raw。</b>能用 Raw 就别离开主题 token。
            </Aside>
          </Article>
        </ThemeProvider>

        <h2 className="anchor" id="when">
          什么时候用 Raw
        </h2>
        <p>
          下面这些场景属于<b>长尾视觉与交互</b>——固化为组件会让组件库膨胀失控、
          每套主题都得维护，因此应该交给 Raw：
        </p>
        <ThemeProvider theme={theme}>
          <Table
            caption="Raw 的边界"
            columns={[
              { key: "kind", label: "判断", width: "8rem" },
              { key: "case", label: "场景" },
            ]}
            rows={[
              { kind: "✅ 适合用 Raw", case: "内联 SVG / sparkline / slopegraph" },
              { kind: "✅ 适合用 Raw", case: "Mermaid-like 流程图 / 架构图 / 调用链" },
              { kind: "✅ 适合用 Raw", case: "可拖拽 / 可滑动的微交互演示" },
              { kind: "✅ 适合用 Raw", case: "主题专属可视化（如蓝图主题的方格纸标注）" },
              { kind: "✅ 适合用 Raw", case: "iframe 嵌入（视频、演示、外部 demo）" },
              { kind: "❌ 不该用 Raw", case: "本可以用 Aside / Decision / RiskList → 用语义组件" },
              { kind: "❌ 不该用 Raw", case: "本可以用 Table 表达的二维信息 → 用 Table" },
              { kind: "❌ 不该用 Raw", case: "本可以用 CodeBlock / DiffReview → 用语义组件" },
              { kind: "❌ 不该用 Raw", case: "为了好看而加的纯装饰光晕 / glow / 渐变" },
              { kind: "❌ 不该用 Raw", case: "营销大屏 hero、玻璃拟态、3D 图标" },
            ]}
          />
        </ThemeProvider>

        <h2 className="anchor" id="tokens">
          Raw 必须使用 <code className="inline">--ra-*</code> token
        </h2>
        <p>
          Raw 的视觉自由建立在 token 之上：颜色、间距、圆角、阴影、字体——只能引用
          下表里的变量。这是<b>主题切换不翻车</b>的唯一保证。
        </p>
        <CodeBlock lang="css" code={TOKENS} />
        <ThemeProvider theme={theme}>
          <Aside tone="warning" label="为什么不能硬编码颜色">
            硬编码 <code>#3b82f6</code> 会让你的图在 tufte 主题（暖纸）下蓝得违和、
            在 shannon 主题（暗底）下亮得刺眼、在 fuller 主题（蓝图）下根本不该出现。
            主题 token 是协议层面的<b>视觉抽象</b>，跨过它就等于把你的 Raw 钉死在某一种主题。
          </Aside>
        </ThemeProvider>

        <h2 className="anchor" id="antipatterns">
          反模式
        </h2>
        <ThemeProvider theme={theme}>
          <RiskList
            risks={[
              {
                name: "在 Raw 里硬编码颜色 / 字号 / 间距",
                impact: "high",
                likelihood: "high",
                mitigation:
                  "改用 var(--ra-color-accent)、var(--ra-space-3)、var(--ra-text-h2) 等 token。",
                owner: "作者 / Reviewer",
              },
              {
                name: "玻璃拟态 / backdrop-blur / 半透明白",
                impact: "high",
                likelihood: "medium",
                mitigation:
                  "协议级反模式：暗主题下不可读，打印导出无效。用 surface + border 表达层次。",
                owner: "作者 / Reviewer",
              },
              {
                name: "Tailwind 默认 token（rounded-2xl、shadow-xl、text-blue-600）",
                impact: "medium",
                likelihood: "high",
                mitigation:
                  "脱离主题契约：用 --ra-radius-md / --ra-shadow-md / --ra-color-accent。",
                owner: "作者 / Reviewer",
              },
              {
                name: "渐变光晕、3D 图标、营销 hero",
                impact: "medium",
                likelihood: "medium",
                mitigation:
                  "ReActicle 文章不是 landing page。需要视觉重量时用主题已有的字号 / 留白。",
                owner: "作者 / Reviewer",
              },
              {
                name: "在 Raw 里再造一个 Aside / RiskList",
                impact: "medium",
                likelihood: "medium",
                mitigation:
                  "回到语义组件：每多一处自定义提示框，AI 就多一种可漂移的写法。",
                owner: "作者 / Reviewer",
              },
            ]}
          />
        </ThemeProvider>

        <h2 className="anchor" id="good-vs-bad">
          好 Raw vs 差 Raw
        </h2>
        <p>下面是同一个"流程示意"在两种写法下的对比：</p>
        <CodeBlock code={GOOD} />
        <p>而<b>差 Raw</b>会硬编码颜色、引入玻璃拟态、混用 Tailwind 默认 token：</p>
        <CodeBlock code={BAD} />

        <h2 className="anchor" id="checklist">
          提交 Raw 前的 checklist
        </h2>
        <ThemeProvider theme={theme}>
          <Checkpoint
            question="在 PR / 合并前，逐项确认"
            options={[
              "我是否先尝试过语义组件？",
              "Raw 内的颜色 / 间距 / 字号是否全部走 --ra-* token？",
              "是否在所有内置主题下切一遍仍然可读？",
              "打印 / 导出为 PDF 时是否仍可读、不依赖玻璃拟态？",
              "Raw 是否新增了一个本应组件化的语义？若是，应该新增组件而非 Raw。",
            ]}
          />
        </ThemeProvider>
      </div>
    </>
  );
}
