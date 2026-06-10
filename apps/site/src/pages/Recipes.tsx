import { ThemeProvider, Aside, Table } from "reacticle";
import { CodeBlock } from "../components/CodeBlock";
import type { TocEntry } from "../components/OnThisPage";
import { DEFAULT_THEME } from "../lib/site";

export const recipesToc: TocEntry[] = [
  { id: "incident", label: "故障复盘" },
  { id: "spec", label: "技术规格" },
  { id: "essay", label: "随笔 / 长读物" },
  { id: "explainer", label: "解释文 / 技术科普" },
  { id: "decision", label: "决策记录" },
  { id: "math", label: "嵌入数学公式" },
  { id: "raw-interactive", label: "嵌入可交互 Raw" },
];

const INCIDENT = `<ThemeProvider theme="shannon">
  <Article toc>
    <Hero
      title="2026-05-20 连接池耗尽事故"
      subtitle="一次只持续 47 分钟、却让我们重新画依赖图的事故"
      meta={[
        { label: "影响等级", value: "P1" },
        { label: "持续", value: "00:14 – 01:01 UTC" },
      ]}
    />
    <Lead>本文复盘一次连接池耗尽事故，重点不是事故本身，而是它暴露的隐性依赖。</Lead>

    <Incident
      events={[
        { time: "00:14", desc: "下游 RDS 告警：active 99 / 100", tone: "alarm" },
        { time: "00:16", desc: "网关 5xx 上升到 12%", tone: "alarm" },
        { time: "00:32", desc: "扩容失败：连接被消费速度无法跟上", tone: "warn" },
        { time: "00:51", desc: "限流生效，5xx 回落", tone: "info" },
        { time: "01:01", desc: "连接池恢复，事故结束", tone: "ok" },
      ]}
    />

    <Section index="01" title="时间线之外，发生了什么">
      <RiskList risks={[ /* … 三条延伸风险 */ ]} />
    </Section>

    <Section index="02" title="后续行动">
      <DiffReview /* … 关键 diff，附评论 */ />
      <Decision
        question="是否把审计日志改为异步落库？"
        options={["保持同步", "异步 + 重试", "走消息队列"]}
        recommended="异步 + 重试"
        rationale="P95 改善 8x，失败窗口可由重试覆盖。"
      />
      <ActionList items={[ /* … 行动项，含 owner / due */ ]} />
    </Section>

    <Conclusion>留下的不是教训，是依赖图上的两条新边。</Conclusion>
    <ExportBar decision={…} actionItems={…} />
  </Article>
</ThemeProvider>`;

const SPEC = `<ThemeProvider theme="vignelli">
  <Article toc>
    <Hero
      title="Orbit 设计系统规格 · v2"
      subtitle="网格、字号、颜色 token 的形式化定义"
      meta={[
        { label: "版本", value: "v2.0" },
        { label: "状态", value: "Approved" },
      ]}
    />
    <Lead>本规格描述 Orbit 设计系统第二版的 token 契约，所有产品端必须遵守。</Lead>

    <Section index="01" title="Token 契约">
      <Table
        caption="核心颜色 token"
        columns={[
          { key: "name", label: "Token", width: "12rem" },
          { key: "value", label: "值" },
          { key: "use", label: "用途" },
        ]}
        rows={[ /* … */ ]}
      />
    </Section>

    <Section index="02" title="变更摘要">
      <Tabs items={[
        { label: "新增", content: <ul>…</ul> },
        { label: "废弃", content: <ul>…</ul> },
        { label: "破坏性", content: <ul>…</ul> },
      ]} />
    </Section>

    <Section index="03" title="迁移指引">
      <Checkpoint
        question="升级到 v2 前，逐项确认"
        options={["所有调用方已切到新 token？", "测试覆盖率 > 80%？", "回滚预案已准备？"]}
      />
    </Section>
  </Article>
</ThemeProvider>`;

const ESSAY = `<ThemeProvider theme="press">
  <Article>
    <Hero
      title="活字之后，我们用什么排版"
      subtitle="一篇关于排版工具进化的随笔"
    />
    <Lead>从铅字到 LaTeX，再到今天的语义组件——排版工具一直在收敛。</Lead>

    <Section index="01" title="活字时代的纪律">
      <p>……</p>
      <Quote source="Robert Bringhurst" who="The Elements of Typographic Style">
        排版的目标，不是引人注目，而是让阅读消失。
      </Quote>
    </Section>

    <Section index="02" title="数字时代的失序">
      <Aside tone="principle" label="判断">
        当工具自由度无穷大，作者就必须自己定义纪律。
      </Aside>
    </Section>

    <Conclusion>语义组件是这个时代的"活字"——不是字体，而是字模。</Conclusion>
  </Article>
</ThemeProvider>`;

const EXPLAINER = `<ThemeProvider theme="knuth">
  <Article toc>
    <Hero
      title="Attention Is All You Need：从论文到工程直觉"
      subtitle="把 2017 年的核心论文，翻译给今天的工程师"
    />
    <Lead>自注意力把"序列上下文"从 RNN 的循环里解放出来——这是一切的起点。</Lead>

    <Section index="01" title="Self-Attention 的形式">
      <p>给定查询 Q、键 K、值 V：</p>
      <Formula display>{\`
        \\\\text{Attention}(Q, K, V) = \\\\text{softmax}\\\\left(\\\\frac{Q K^T}{\\\\sqrt{d_k}}\\\\right) V
      \`}</Formula>
      <p>分母 √d_k 抑制点积膨胀；softmax 把分数归一为概率。</p>
    </Section>

    <Section index="02" title="为什么是这个公式">
      <Aside tone="capability" label="直觉">
        Q·Kᵀ 在算"我对谁感兴趣"，softmax 把它变成注意力分布，再乘 V 得到加权值。
      </Aside>
    </Section>
  </Article>
</ThemeProvider>`;

const DECISION = `<Decision
  question="数据库选择：PostgreSQL 还是 SQLite？"
  options={["PostgreSQL", "SQLite", "暂不下结论"]}
  criteria={[
    "并发读写 > 100 QPS",
    "需要复杂查询 / JSON 索引",
    "运维成本 < 1 人日 / 周",
  ]}
  recommended="PostgreSQL"
  rationale="并发与 JSON 查询无法妥协；运维通过托管服务可控。"
/>`;

const MATH = `import { Formula } from "reacticle";

{/* 行内：用代码字面量 */}
<p>能量守恒 <Formula>{"E = mc^2"}</Formula> 是最著名的物理等式之一。</p>

{/* 块级：display={true} 居中编号呈现 */}
<Formula display>{\`
  \\\\frac{\\\\partial f}{\\\\partial x_i} = \\\\lim_{h \\\\to 0}
  \\\\frac{f(x_1, \\\\dots, x_i + h, \\\\dots) - f(x_1, \\\\dots, x_i, \\\\dots)}{h}
\`}</Formula>`;

const RAW_INTERACTIVE = `import { Raw } from "reacticle";
import { useState } from "react";

function CaffeineHalfLife() {
  const [hours, setHours] = useState(5);
  const remaining = Math.round(100 * Math.pow(0.5, hours / 5));
  return (
    <div className="caf-demo">
      <input
        type="range" min="0" max="24" value={hours}
        onChange={(e) => setHours(Number(e.target.value))}
      />
      <span className="caf-demo__num mono">
        {hours}h 后剩余 {remaining}%
      </span>
    </div>
  );
}

<Raw>
  <CaffeineHalfLife />
</Raw>`;

export function RecipesPage() {
  const theme = DEFAULT_THEME;
  return (
    <>
      <div className="page-head">
        <span className="kicker">写作配方</span>
        <h1>写作配方</h1>
        <p>
          按场景查的"组件食谱"——给定一种文章类型，告诉你该用哪些 ReActicle 组件、
          以什么顺序组合、配哪个主题。
        </p>
      </div>

      <div className="prose">
        <ThemeProvider theme={theme}>
          <Aside tone="note" label="使用方式">
            每个配方是一段<b>骨架代码</b>，把缺口（<code className="inline">…</code>）填上你的真实素材即可。
            主题选择仅是建议，所有配方都可以切到任意 11 套主题。
          </Aside>
        </ThemeProvider>

        <h2 className="anchor" id="incident">
          故障复盘
        </h2>
        <p>
          时间线 + 风险延伸 + 关键 diff + 决策 + 行动项 + 导出。推荐主题：{" "}
          <b>Shannon · 工程暗色</b>（夜间作战气质）或 <b>Tufte · Data-Ink</b>（证据优先）。
        </p>
        <CodeBlock code={INCIDENT} />

        <h2 className="anchor" id="spec">
          技术规格
        </h2>
        <p>
          编号小节 + Token 表 + Tabs 切换变更 + Checkpoint 升级清单。推荐主题：{" "}
          <b>Vignelli · 瑞士网格</b>（规范文档骨子里的纪律感）。
        </p>
        <CodeBlock code={SPEC} />

        <h2 className="anchor" id="essay">
          随笔 / 长读物
        </h2>
        <p>
          不依赖结构化组件，靠 Hero / Lead / Quote / Aside 撑起气质。推荐主题：{" "}
          <b>Press · 书卷</b> 或 <b>Bodoni · 报刊</b>。
        </p>
        <CodeBlock code={ESSAY} />

        <h2 className="anchor" id="explainer">
          解释文 / 技术科普
        </h2>
        <p>
          公式 + 直觉 Aside + 步骤 Section。推荐主题：<b>Knuth · 学术</b>（编号小节、Computer Modern 字体）
          或 <b>Tufte · Data-Ink</b>。
        </p>
        <CodeBlock code={EXPLAINER} />

        <h2 className="anchor" id="decision">
          决策记录（独立）
        </h2>
        <p>
          有时一篇文章就是一次决策——围绕 <code className="inline">Decision</code> 组件写。
        </p>
        <CodeBlock code={DECISION} />
        <ThemeProvider theme={theme}>
          <Table
            caption="近义组件辨析"
            columns={[
              { key: "comp", label: "组件", width: "12rem" },
              { key: "use", label: "适合表达" },
            ]}
            rows={[
              { comp: "Decision", use: "已下结论的决策记录（含推荐方案 + 理由）" },
              { comp: "Tradeoff", use: "单方案的利弊权衡（pros + cons + verdict）" },
              { comp: "Checkpoint", use: "需要人工确认的检查点（不下结论）" },
              { comp: "RiskList", use: "已识别风险的清单（含 owner / mitigation）" },
            ]}
          />
        </ThemeProvider>

        <h2 className="anchor" id="math">
          嵌入数学公式（KaTeX）
        </h2>
        <p>
          <code className="inline">Formula</code> 内置 KaTeX，行内 / 块级两种模式，
          所有 11 套主题都对公式样式做了校正：
        </p>
        <CodeBlock code={MATH} />

        <h2 className="anchor" id="raw-interactive">
          嵌入可交互 Raw
        </h2>
        <p>
          可拖动滑块、可点开的微图示等"轻交互"用 <code className="inline">Raw</code>{" "}
          包住任意 React 子树。注意所有自定义样式都要走主题 token——详见{" "}
          <a href="#/raw">Raw 自由层守则</a>。
        </p>
        <CodeBlock code={RAW_INTERACTIVE} />
        <ThemeProvider theme={theme}>
          <Aside tone="warning" label="导出 PDF 时怎么办">
            可交互的 Raw 在打印态退化为静态。如果你的交互"必须运行起来才有意义"，
            请同时给一个静态对照（截图 / 表格 / 默认值），保证打印 / 离线读者也能理解。
          </Aside>
        </ThemeProvider>
      </div>
    </>
  );
}
