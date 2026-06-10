import { ThemeProvider, Aside, Detail, Table } from "reacticle";
import { CodeBlock } from "../components/CodeBlock";
import type { TocEntry } from "../components/OnThisPage";
import { DEFAULT_THEME } from "../lib/site";

export const faqToc: TocEntry[] = [
  { id: "concept", label: "理念问题" },
  { id: "raw", label: "Raw 与主题" },
  { id: "export", label: "导出 / 打印" },
  { id: "fields", label: "缺失字段警示" },
  { id: "install", label: "安装 / 依赖" },
  { id: "compare", label: "对比" },
];

export function FAQPage() {
  const theme = DEFAULT_THEME;
  return (
    <>
      <div className="page-head">
        <span className="kicker">FAQ</span>
        <h1>FAQ</h1>
        <p>
          按场景分组的常见问题。展开任意一项即可看到答案；推荐先扫一遍标题再细读。
        </p>
      </div>

      <div className="prose">
        <h2 className="anchor" id="concept">
          理念问题
        </h2>
        <ThemeProvider theme={theme}>
          <Detail summary="ReActicle 和 Markdown 是什么关系？">
            <p>
              ReActicle 不取代 Markdown。Markdown 让<b>人类</b>写作变轻；
              ReActicle 让 <b>AI</b> 输出 HTML 变得可控。两者解决的是不同时代的不同问题。
              事实上，我们提供了一份{" "}
              <a href="#/markdown">Markdown 映射表</a>，方便从 Markdown 迁移过来。
            </p>
          </Detail>
          <Detail summary="为什么不直接让 AI 写 HTML？">
            <p>
              直接让 AI 写 HTML 太自由：每篇文章的结构都重新设计、token 浪费、
              视觉漂移、难以审阅。把表达收敛成一组语义组件，AI 只需要表达"这是判断 / 旁注 /
              风险 / 决策"，结构就稳了，视觉就交给主题。
            </p>
          </Detail>
          <Detail summary="ReActicle 是另一个 UI 库吗？">
            <p>
              不是。ReActicle 是<b>文章协议</b>：组件少、语义明确、视觉由主题控制；
              它不解决按钮 / 表单 / 输入框这类 UI 问题。需要 UI 库时请配合 shadcn /
              MUI / Ant Design 等使用，不要把 ReActicle 当 UI Kit 用。
            </p>
          </Detail>
        </ThemeProvider>

        <h2 className="anchor" id="raw">
          Raw 与主题
        </h2>
        <ThemeProvider theme={theme}>
          <Detail summary="为什么我的 Raw 切主题不变色？">
            <p>
              Raw 内的样式必须引用 <code className="inline">--ra-*</code> token，
              而不是硬编码颜色。<code className="inline">background: #3b82f6</code> 在
              所有主题下都是同一种蓝；改成{" "}
              <code className="inline">background: var(--ra-color-accent)</code> 才会随主题切换。
              详见 <a href="#/raw">Raw 自由层守则</a>。
            </p>
          </Detail>
          <Detail summary="Raw 里能用 Tailwind 吗？">
            <p>
              可以，但<b>不要用 Tailwind 的默认颜色 / 圆角 / 阴影 token</b>。把 Tailwind
              当成排版语法糖（<code className="inline">flex</code>、{" "}
              <code className="inline">grid</code>、间距 utility 没问题），但
              视觉 token 必须从 <code className="inline">--ra-*</code> 派生。
              否则你的 Raw 就被钉死在了某种主题感。
            </p>
          </Detail>
          <Detail summary="新增一套主题需要改组件代码吗？">
            <p>
              不需要。新增主题只动主题层：在{" "}
              <code className="inline">src/theme/themes/&lt;name&gt;</code> 下加 CSS +
              md，再在 <code className="inline">THEMES</code> 注册即可。组件代码永远
              不引用任何具体主题。详见 <a href="#/theming#add">新增一套主题</a>。
            </p>
          </Detail>
        </ThemeProvider>

        <h2 className="anchor" id="export">
          导出 / 打印
        </h2>
        <ThemeProvider theme={theme}>
          <Detail summary="为什么打印 PDF 时工具栏还在？">
            <p>
              ReActicle 的 <code className="inline">ExportBar</code> 默认带{" "}
              <code className="inline">.no-print</code> 类，打印时会被{" "}
              <code className="inline">@media print</code> 隐藏。如果你自定义了导出
              工具栏，记得把它们加进 <code className="inline">.no-print</code>。详见{" "}
              <a href="#/export#pdf">导出 PDF</a>。
            </p>
          </Detail>
          <Detail summary="单文件 HTML 报告有多大？">
            <p>
              一篇典型长文（含 React、Prism、KaTeX 全部内联）大约 300–500 KB。可压缩、
              可邮件附件、可作为 GitHub Release 资源分发。详见{" "}
              <a href="#/export#single-html">单文件 HTML 报告</a>。
            </p>
          </Detail>
          <Detail summary="可交互 Raw 打印出来怎么办？">
            <p>
              打印态下交互失效，组件会回退为初始 React 渲染快照。建议为关键交互
              准备静态对照（截图 / 默认值），让离线读者也能理解结论。
            </p>
          </Detail>
        </ThemeProvider>

        <h2 className="anchor" id="fields">
          缺失字段警示
        </h2>
        <ThemeProvider theme={theme}>
          <Detail summary={"为什么字段渲染成红色 \"⚠ 未指定 xxx\"？"}>
            <p>
              这是 ReActicle 的<b>缺失即可见</b>原则：必填字段未提供时，组件不会悄悄
              吞掉，而是渲染明显标记。这样在 review 时一眼可见信息缺口，不会因为
              AI 跳过字段就让漏洞滑过去。
            </p>
            <p>修复方式：把对应字段填上即可。</p>
          </Detail>
          <Detail summary="可以关掉 ⚠ 标记吗？">
            <p>
              不可以。这是协议级行为：缺什么就显式说缺什么，比假装完整更诚实。
              如果一个字段确实没必要，应该选择不需要它的更轻组件，或重新评估你
              是不是用错了组件。
            </p>
          </Detail>
        </ThemeProvider>

        <h2 className="anchor" id="install">
          安装 / 依赖
        </h2>
        <ThemeProvider theme={theme}>
          <Detail summary="支持哪些 React 版本？">
            <p>
              React 18+ 作为 peer 依赖。Vite / Next.js / Remix / 任意 React 项目均可。
            </p>
          </Detail>
          <Detail summary="为什么 0 运行时依赖？">
            <p>
              ReActicle 把字体、Prism 高亮、KaTeX 都当成{" "}
              <i>构建期</i> 资源处理，运行时只依赖 React。这让单文件 HTML 报告
              在断网 / 离线场景下仍可用。
            </p>
          </Detail>
          <Detail summary="组件库会膨胀吗？">
            <p>
              我们刻意不让组件库膨胀。每次新增组件前都会问：能不能用 Raw 表达？
              是不是已有近义组件？详见{" "}
              <a href="#/architecture#ownership">归属判断</a>。
            </p>
          </Detail>
        </ThemeProvider>

        <h2 className="anchor" id="compare">
          对比
        </h2>
        <ThemeProvider theme={theme}>
          <Table
            caption="ReActicle 和它的邻居"
            columns={[
              { key: "tool", label: "工具", width: "12rem" },
              { key: "good", label: "强项" },
              { key: "diff", label: "和 ReActicle 的差别" },
            ]}
            rows={[
              { tool: "Markdown", good: "人类写作", diff: "AI 输出长文时漂移大；缺语义组件" },
              { tool: "MDX", good: "Markdown + JSX", diff: "更自由 → 更难约束；样式仍要自管" },
              { tool: "Notion", good: "团队协作 / 数据库", diff: "闭源、不可分发为单文件 HTML" },
              { tool: "Tailwind UI / shadcn", good: "通用 UI Kit", diff: "面向应用 UI；不约束文章结构" },
              { tool: "LaTeX", good: "学术排版", diff: "门槛高、AI 写起来不友好；ReActicle 的 Knuth 主题接近其气质" },
            ]}
          />
          <Aside tone="note" label="还有问题">
            没找到答案？欢迎到{" "}
            <a href="https://github.com/ConardLi/reacticle/issues" target="_blank" rel="noreferrer">
              GitHub Issues
            </a>{" "}
            提问，或参考 <a href="#/contributing">贡献指南</a> 来改进文档。
          </Aside>
        </ThemeProvider>

        <CodeBlock
          lang="text"
          code={`# 也可以本地搜
npm run dev   # 启动文档站后用浏览器搜索（Ctrl/Cmd+F）`}
        />
      </div>
    </>
  );
}
