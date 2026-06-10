import { ThemeProvider, Aside, Table, Decision } from "reacticle";
import { CodeBlock } from "../components/CodeBlock";
import type { TocEntry } from "../components/OnThisPage";
import { DEFAULT_THEME } from "../lib/site";

export const skillToc: TocEntry[] = [
  { id: "what", label: "Skill 是什么" },
  { id: "pair", label: "ReActicle × beautiful-article" },
  { id: "flow", label: "六阶段写作流" },
  { id: "demo", label: "端到端示例" },
  { id: "tokens", label: "省 token 的关键" },
  { id: "install", label: "安装 Skill" },
];

const SOURCE_PROMPT = `请把以下源材料生成一篇 ReActicle 文章：

源材料：
- 一篇英文论文 PDF：attention-is-all-you-need.pdf
- 我希望读者是技术从业者，不是研究人员
- 需要保留全部论点，但语言要更轻
- 主题选择：knuth（学术） 或 press（书卷），让你判断`;

const PLAN = `// Skill 在 plan 阶段输出（伪代码）

theme: "press"   // 比 knuth 更适合"译给从业者"语气
sections:
  - hero: "Attention Is All You Need：从论文到工程直觉"
  - lead: 用一句话点题：自注意力为什么改变了一切
  - section "01 背景": 序列建模简史 → Aside.principle
  - section "02 核心机制": 自注意力 → Formula + Raw（QK^T 演示）
  - section "03 工程影响": Decision + Tradeoff
  - conclusion: 给从业者的三个判断

// 双确认：先把这个 plan 给用户看，确认后才进入 build。`;

const BUILD = `import { ThemeProvider, Article, Hero, Lead, Section, Aside,
  Formula, Decision, Conclusion, Raw } from "reacticle";

export function AttentionArticle() {
  return (
    <ThemeProvider theme="press">
      <Article toc>
        <Hero
          title="Attention Is All You Need：从论文到工程直觉"
          subtitle="把 2017 年的核心论文，翻译给今天的工程师"
          meta={[
            { label: "原文", value: "Vaswani et al., 2017" },
            { label: "主题", value: "Press · 书卷" },
          ]}
        />
        <Lead>自注意力把"序列上下文"从 RNN 的循环里解放出来——这是一切的起点。</Lead>
        {/* … 由 Skill 按 plan 逐节生成，每节都对应一个语义组件 */}
      </Article>
    </ThemeProvider>
  );
}`;

const REVIEW = `# Skill 自审产物（review.md）

✅ 主题命中：press 长读物，标题已经"落定"
✅ 结构：Hero / Lead / 03 个 Section / Conclusion 完整
⚠ 风险：第 02 节的 QK^T 用了 Raw，但未引用 --ra-* token
   → 修复阶段会改用 var(--ra-color-accent)
✅ Formula：行内 / 块级公式各一处，KaTeX 渲染正常
✅ Action items：无（这是一篇解释文，不需要决策导出）

下一步：自动进入 repair，修复上面 ⚠ 标注。`;

export function SkillIntegrationPage() {
  const theme = DEFAULT_THEME;
  return (
    <>
      <div className="page-head">
        <span className="kicker">协作</span>
        <h1>与 beautiful-article Skill 集成</h1>
        <p>
          ReActicle 是组件协议，<b>beautiful-article</b> 是教 AI 怎么用这套协议
          写文章的 Skill。两者搭配使用，AI 才能稳定产出高质量长文。
        </p>
      </div>

      <div className="prose">
        <h2 className="anchor" id="what">
          Skill 是什么
        </h2>
        <p>
          <b>beautiful-article</b> 是一个 Anthropic Claude Skill：一份给 AI 看的"
          编辑 + 设计师指引"，告诉 AI 在拿到任意源材料后，怎么按 ReActicle 协议
          一步步生成<b>单文件 HTML 文章</b>。它发布在{" "}
          <a href="https://github.com/ConardLi/garden-skills" target="_blank" rel="noreferrer">
            ConardLi/garden-skills
          </a>
          ，可独立装载到任何支持 Claude Skills 的环境。
        </p>
        <ThemeProvider theme={theme}>
          <Aside tone="principle" label="分层关系">
            <b>ReActicle</b> = 组件协议 / 运行时 / 主题 token。
            <br />
            <b>beautiful-article</b> = 把"源材料 → ReActicle 文章"这条流程<b>编入 AI 工作记忆</b>的 Skill。
            <br />
            两者解耦：你可以只用 ReActicle 手写文章；也可以让 Skill 调用 ReActicle 自动产出。
          </Aside>
        </ThemeProvider>

        <h2 className="anchor" id="pair">
          ReActicle × beautiful-article
        </h2>
        <ThemeProvider theme={theme}>
          <Table
            caption="同一件事的两个层"
            columns={[
              { key: "concern", label: "关心的事", width: "12rem" },
              { key: "ra", label: "ReActicle 负责" },
              { key: "skill", label: "beautiful-article 负责" },
            ]}
            rows={[
              { concern: "结构与语义", ra: "提供受限组件 / props 契约", skill: "决定一篇文用哪些组件、什么顺序" },
              { concern: "视觉表达", ra: "11 套主题 + token 系统", skill: "根据源材料选最贴近的主题" },
              { concern: "Raw 自由层", ra: "提供 Raw 容器 + token 约束", skill: "判断什么时候用 Raw、写什么 Raw" },
              { concern: "缺失即可见", ra: "组件渲染 ⚠ 未指定", skill: "把缺口写进 review.md，提示用户补全" },
              { concern: "导出", ra: "ExportBar + 单文件 HTML 构建", skill: "选 PDF / Prompt / Action Items" },
            ]}
          />
        </ThemeProvider>

        <h2 className="anchor" id="flow">
          六阶段写作流
        </h2>
        <p>Skill 把 AI 的写作切成六步，每一步只产出一个明确产物：</p>
        <ThemeProvider theme={theme}>
          <Table
            caption="beautiful-article 的 harness 流程"
            columns={[
              { key: "n", label: "#", width: "3rem" },
              { key: "stage", label: "阶段", width: "9rem" },
              { key: "out", label: "产物" },
              { key: "gate", label: "出口条件" },
            ]}
            rows={[
              { n: "1", stage: "Source", out: "源材料清单 + 受众假设", gate: "用户确认无误" },
              { n: "2", stage: "Plan", out: "结构大纲 + 选定主题", gate: "用户双确认" },
              { n: "3", stage: "Build", out: "完整 ReActicle JSX", gate: "通过 props 完整性" },
              { n: "4", stage: "Review", out: "review.md（自审）", gate: "无 ⚠ 阻断项" },
              { n: "5", stage: "Repair", out: "针对 review 的修复 diff", gate: "review 全部 ✅" },
              { n: "6", stage: "Deliver", out: "单文件 HTML / PDF / Prompt", gate: "导出无失败" },
            ]}
          />
        </ThemeProvider>

        <h2 className="anchor" id="demo">
          端到端示例
        </h2>
        <p>下面是一个真实的"PDF 论文 → ReActicle 文章"流程缩影：</p>

        <h3>① 用户给 Source（自然语言）</h3>
        <CodeBlock lang="text" code={SOURCE_PROMPT} />

        <h3>② Skill 输出 Plan，等待双确认</h3>
        <CodeBlock lang="text" code={PLAN} />

        <h3>③ 双确认通过后，Skill 进入 Build，生成 ReActicle JSX</h3>
        <CodeBlock code={BUILD} />

        <h3>④ Skill 自审 → 产出 review.md</h3>
        <CodeBlock lang="markdown" code={REVIEW} />

        <h3>⑤ Repair 修掉 ⚠，⑥ Deliver 出单文件 HTML</h3>
        <ThemeProvider theme={theme}>
          <Decision
            question="为什么要分六阶段、还要双确认？"
            options={[
              "AI 一次性生成长文容易漂移",
              "把决策点显式化，给用户介入机会",
            ]}
            recommended="两者皆是"
            rationale="长文是高决策密度的产物：选什么主题、用 Section 还是 Subsection、什么时候用 Raw——这些决策如果黑盒做完，用户只能整篇推翻。Skill 把决策切片，让用户在低成本节点介入。"
          />
        </ThemeProvider>

        <h2 className="anchor" id="tokens">
          省 token 的关键：渐进式加载
        </h2>
        <p>
          组件库目前有 26+ 个组件，全部参考贴进上下文会浪费大量 token。Skill 采取
          <b>渐进式加载</b>：
        </p>
        <ol>
          <li>初始化时只加载 <b>组件名 + 一句话用途</b> 的索引（约 1k token）。</li>
          <li>Plan 阶段决定要用哪些组件，再按需加载这几个组件的 <b>props 契约 + 示例</b>。</li>
          <li>主题文档同理：先索引，再按选定主题加载完整 md。</li>
        </ol>
        <ThemeProvider theme={theme}>
          <Aside tone="capability" label="结果">
            常见长文场景 Skill 上下文占用 &lt; 8k token，相比"全部塞进 system prompt"省下 5–10×。
          </Aside>
        </ThemeProvider>

        <h2 className="anchor" id="install">
          安装 Skill
        </h2>
        <p>
          访问{" "}
          <a href="https://github.com/ConardLi/garden-skills" target="_blank" rel="noreferrer">
            ConardLi/garden-skills
          </a>{" "}
          仓库，找到 <code className="inline">skills/beautiful-article</code> 目录，
          按宿主环境（Claude Desktop / Code / API）的 Skill 加载方式装载即可。
        </p>
        <ThemeProvider theme={theme}>
          <Aside tone="note" label="不用 Skill 也行">
            ReActicle 本身完全独立。如果你只想手写文章，按{" "}
            <a href="#/start">开始使用</a> 装组件库即可，不需要 Skill。
          </Aside>
        </ThemeProvider>
      </div>
    </>
  );
}
