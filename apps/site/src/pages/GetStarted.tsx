import { CodeBlock } from "../components/CodeBlock";
import type { TocEntry } from "../components/OnThisPage";

export const startToc: TocEntry[] = [
  { id: "install", label: "安装" },
  { id: "skeleton", label: "最小骨架" },
  { id: "build", label: "构建与导出" },
  { id: "gaps", label: "缺失即可见" },
];

export function GetStartedPage() {
  return (
    <>
      <div className="page-head">
        <span className="kicker">开始使用</span>
        <h1>开始使用</h1>
        <p>
          从唯一的公共入口 <code className="inline">reacticle</code> 导入组件，
          包在一个 <code className="inline">ThemeProvider</code> 与
          <code className="inline">Article</code> 里——剩下的交给协议。
        </p>
      </div>

      <div className="prose">
        <h2 className="anchor" id="install">
          安装
        </h2>
        <p>作为依赖安装组件库，React 18 作为 peer 依赖。</p>
        <CodeBlock lang="bash" code={`npm install reacticle`} />
        <p>本仓库内开发时，直接启动统一站点（文档 + 组件 + Gallery 同一个应用）。</p>
        <CodeBlock
          lang="bash"
          code={`npm install\nnpm run dev        # 统一站点：文档 · 组件参考 · Gallery`}
        />

        <h2 className="anchor" id="skeleton">
          最小骨架
        </h2>
        <p>
          始终先包一层 <code className="inline">ThemeProvider</code>，再放一个
          <code className="inline">Article</code>；正文段落用 children，复杂结构
          用结构化 props 组件。
        </p>
        <CodeBlock
          code={`import { ThemeProvider, Article, Hero, Lead, Section, Summary } from "reacticle";

export function Report() {
  return (
    <ThemeProvider theme="tufte">
      <Article toc>
        <Hero title="标题" subtitle="副标题"
          meta={[{ label: "日期", value: "2026-06-06" }]} />
        <Lead>导语，框定主题。</Lead>
        <Summary points={["要点一", "要点二"]} />
        <Section index="01" title="第一节">
          <p>正文段落用 children；复杂结构用结构化 props 组件。</p>
        </Section>
      </Article>
    </ThemeProvider>
  );
}`}
        />

        <h2 className="anchor" id="build">
          构建与导出
        </h2>
        <p>
          组件、文档与 Gallery 在同一个站点里。需要把某篇报告分发为
          <b> 自包含单页 HTML</b>（CSS/JS 内联、断网可开）时，用 report 构建。
        </p>
        <CodeBlock
          lang="bash"
          code={`npm run build:site     # 构建统一站点 → dist/site
npm run build:report   # 自包含单页报告 → dist-report/report.html
npm run build          # 依次构建组件库与站点`}
        />
        <div className="callout">
          <div className="callout__label">导出能力</div>
          <p>
            通过 <code className="inline">ExportBar</code> 可一键导出 PDF（浏览器
            打印）、复制为 Prompt、复制为 Action Items。打印时工具栏自动隐藏。
          </p>
        </div>

        <h2 className="anchor" id="gaps">
          缺失即可见
        </h2>
        <p>
          ReActicle 没有单独的校验层。完整性由组件自身保证：当你漏填必填字段，
          组件不会悄悄吞掉，而是在最终 HTML 里渲染一个明显的{" "}
          <code className="inline">⚠ 未指定xxx</code> 标记，让缺口在 review 时一眼可见。
        </p>
        <div className="callout">
          <div className="callout__label">原则</div>
          <p>永远不要为了填满版面而编造内容——把缺口暴露出来，比假装完整更诚实。</p>
        </div>
      </div>
    </>
  );
}
