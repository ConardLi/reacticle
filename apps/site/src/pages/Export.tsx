import {
  ThemeProvider,
  Article,
  ExportBar,
  ActionList,
  Decision,
  Aside,
  Table,
} from "reacticle";
import { CodeBlock } from "../components/CodeBlock";
import type { TocEntry } from "../components/OnThisPage";
import { DEFAULT_THEME } from "../lib/site";

export const exportToc: TocEntry[] = [
  { id: "shapes", label: "两种产物形态" },
  { id: "exportbar", label: "ExportBar 组件" },
  { id: "pdf", label: "导出 PDF（打印）" },
  { id: "prompt", label: "复制为 Prompt" },
  { id: "actions", label: "复制为 Action Items" },
  { id: "single-html", label: "单文件 HTML 报告" },
];

const EXPORTBAR_USAGE = `import { ExportBar, ActionList, Decision } from "reacticle";

<ExportBar
  decision={{
    question: "我们要不要把审计日志改成异步落库？",
    options: ["保持同步", "异步 + 重试", "走消息队列"],
    recommended: "异步 + 重试",
    rationale: "P95 改善 8x，失败窗口可由重试覆盖。",
  }}
  actionItems={[
    { task: "下周一前完成异步链路灰度", owner: "@alex", due: "2026-06-15" },
    { task: "补充失败重试观测仪表盘", owner: "@mei", status: "进行中" },
  ]}
/>`;

const PROMPT_OUTPUT = `问题: 我们要不要把审计日志改成异步落库？
候选方案: 保持同步 / 异步 + 重试 / 走消息队列
推荐方案: 异步 + 重试
理由: P95 改善 8x，失败窗口可由重试覆盖。`;

const ACTIONS_OUTPUT = `- [ ] 下周一前完成异步链路灰度 (负责人: @alex, 截止: 2026-06-15)
- [ ] 补充失败重试观测仪表盘 (负责人: @mei, 状态: 进行中)`;

const PRINT_CSS = `/* ReActicle 内置：导出 PDF 时自动隐藏工具栏 */
@media print {
  .no-print { display: none !important; }
  /* 长文打印分页：避免段落跨页断裂 */
  h1, h2, h3 { break-after: avoid; }
  table, figure, .ra-decision, .ra-risk { break-inside: avoid; }
}`;

const SINGLE_HTML = `npm run build:report
# → dist-report/report.html
#   - 所有 CSS 内联
#   - 所有 JS 内联（含 React、KaTeX、Prism）
#   - 断网可开、可邮件附件、可塞进 GitHub release`;

export function ExportPage() {
  const theme = DEFAULT_THEME;
  return (
    <>
      <div className="page-head">
        <span className="kicker">分发</span>
        <h1>导出与分发</h1>
        <p>
          ReActicle 文章不只在浏览器里好看——它要能被打印成 PDF、塞进邮件、复制成
          Prompt 喂回 AI、转成 Action Items 同步到任务系统。
        </p>
      </div>

      <div className="prose">
        <h2 className="anchor" id="shapes">
          两种产物形态
        </h2>
        <ThemeProvider theme={theme}>
          <Table
            caption="同一篇文章的两条分发链路"
            columns={[
              { key: "shape", label: "形态", width: "12rem" },
              { key: "use", label: "适合场景" },
              { key: "cmd", label: "构建命令" },
            ]}
            rows={[
              {
                shape: "站点页面",
                use: "团队内部知识库、目录式浏览、长期演进",
                cmd: "npm run build:site → dist/site",
              },
              {
                shape: "单文件 HTML",
                use: "一篇即一份产物，邮件 / Slack / Release 附件分发",
                cmd: "npm run build:report → dist-report/report.html",
              },
            ]}
          />
        </ThemeProvider>

        <h2 className="anchor" id="exportbar">
          <code className="inline">ExportBar</code> 组件
        </h2>
        <p>
          在文章里放一个 <code className="inline">ExportBar</code>，它会渲染
          一条<b>非打印</b>的悬浮工具栏，提供三个一键动作：
        </p>
        <ul>
          <li>
            <b>导出 PDF</b>：直接调浏览器打印，配套 <code className="inline">@media print</code> 自动隐藏自身。
          </li>
          <li>
            <b>复制为 Prompt</b>：把 <code className="inline">Decision</code> 序列化成可喂回 AI 的提示。
          </li>
          <li>
            <b>复制为 Action Items</b>：把 <code className="inline">ActionList</code> 序列化成 markdown checklist。
          </li>
        </ul>
        <CodeBlock code={EXPORTBAR_USAGE} />
        <div className="preview">
          <div className="preview__bar">
            <span className="preview__dot" aria-hidden="true" />
            <span className="preview__name">ExportBar 实例</span>
            <span className="preview__semantic">真实组件渲染</span>
          </div>
          <div className="preview__stage">
            <ThemeProvider theme={theme}>
              <Article>
                <ExportBar
                  decision={{
                    question: "我们要不要把审计日志改成异步落库？",
                    options: ["保持同步", "异步 + 重试", "走消息队列"],
                    recommended: "异步 + 重试",
                    rationale: "P95 改善 8x，失败窗口可由重试覆盖。",
                  }}
                  actionItems={[
                    { task: "下周一前完成异步链路灰度", owner: "@alex", due: "2026-06-15" },
                    { task: "补充失败重试观测仪表盘", owner: "@mei", status: "进行中" },
                  ]}
                />
              </Article>
            </ThemeProvider>
          </div>
        </div>

        <h2 className="anchor" id="pdf">
          导出 PDF（浏览器打印）
        </h2>
        <p>
          ReActicle 不依赖 headless Chrome。点 ExportBar 上的"导出 PDF"等价于
          <code className="inline">window.print()</code>——浏览器自带的打印对话框
          就是 PDF 导出器。组件库自带必要的 <code className="inline">@media print</code> 样式：
        </p>
        <CodeBlock lang="css" code={PRINT_CSS} />
        <ThemeProvider theme={theme}>
          <Aside tone="warning" label="自定义 Raw 要补打印样式">
            如果你在 <a href="#/raw">Raw</a> 里加了交互 / 动画，要确保它在静态打印
            状态下仍然可读。把所有"运行起来才有意义"的元素加上
            <code className="inline">.no-print</code> 类即可。
          </Aside>
        </ThemeProvider>

        <h2 className="anchor" id="prompt">
          复制为 Prompt
        </h2>
        <p>
          <code className="inline">decisionToPrompt</code> 把一个{" "}
          <code className="inline">Decision</code> 节点序列化成多行文本，便于
          直接粘回 AI 让它继续推演：
        </p>
        <CodeBlock lang="text" code={PROMPT_OUTPUT} />
        <p>
          这是文章 ↔ AI 的<b>反向通道</b>：用户在文章里看到一个决策，可以一键把它
          重新喂给模型，让模型基于这个决策延伸思考、找漏洞或写实施计划。
        </p>

        <h2 className="anchor" id="actions">
          复制为 Action Items
        </h2>
        <p>
          <code className="inline">actionItemsToMarkdown</code> 把{" "}
          <code className="inline">ActionList</code> 序列化成 Markdown checklist，
          便于直接粘进 Issue / 任务管理器：
        </p>
        <CodeBlock lang="markdown" code={ACTIONS_OUTPUT} />
        <div className="preview">
          <div className="preview__bar">
            <span className="preview__dot" aria-hidden="true" />
            <span className="preview__name">原始 ActionList</span>
            <span className="preview__semantic">真实组件渲染</span>
          </div>
          <div className="preview__stage">
            <ThemeProvider theme={theme}>
              <Article>
                <ActionList
                  items={[
                    { task: "下周一前完成异步链路灰度", owner: "@alex", due: "2026-06-15" },
                    { task: "补充失败重试观测仪表盘", owner: "@mei", status: "进行中" },
                  ]}
                />
              </Article>
            </ThemeProvider>
          </div>
        </div>
        <p>
          也可以单独调用 <code className="inline">copyToClipboard(text)</code> 与
          <code className="inline">decisionToPrompt(decision)</code> /{" "}
          <code className="inline">actionItemsToMarkdown(items)</code> 自己组合，
          用在 ExportBar 之外的位置。
        </p>
        <ThemeProvider theme={theme}>
          <Decision
            question="把决策导出为 Prompt 这件事，应该放在协议层吗？"
            options={["放在协议层", "放在每篇文章里", "完全交给宿主"]}
            recommended="放在协议层"
            rationale="文章是高密度决策载体；把决策 → Prompt 通道做成协议级原语，AI 与人就能共享同一份决策表示。"
          />
        </ThemeProvider>

        <h2 className="anchor" id="single-html">
          单文件 HTML 报告
        </h2>
        <p>
          单文件 HTML 是 ReActicle 的"<b>归档</b>形态"：CSS / JS 全部内联，断网可开，
          可作为邮件附件 / GitHub release / 知识库快照分发。
        </p>
        <CodeBlock lang="bash" code={SINGLE_HTML} />
        <ThemeProvider theme={theme}>
          <Aside tone="capability" label="为什么这件事重要">
            对一篇决策性长文来说，"今天读 / 半年后读结果一样"是关键属性。单文件 HTML
            是写作产物里最朴素也最长寿的形态——它不依赖任何 SaaS、不会因为后端关停而失效。
          </Aside>
        </ThemeProvider>
      </div>
    </>
  );
}
