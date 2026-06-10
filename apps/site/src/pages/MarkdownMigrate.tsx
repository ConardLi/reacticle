import { ThemeProvider, Aside, Table } from "reacticle";
import type { TocEntry } from "../components/OnThisPage";
import { DEFAULT_THEME } from "../lib/site";

export const markdownToc: TocEntry[] = [
  { id: "structure", label: "文档结构" },
  { id: "inline", label: "行内文本" },
  { id: "lists", label: "列表" },
  { id: "callout", label: "引用与提示" },
  { id: "code", label: "代码" },
  { id: "tables", label: "表格与结构化" },
  { id: "media", label: "图片与媒体" },
  { id: "ext", label: "扩展语法" },
  { id: "links", label: "链接体系" },
];

export function MarkdownMigratePage() {
  const theme = DEFAULT_THEME;
  return (
    <>
      <div className="page-head">
        <span className="kicker">迁移</span>
        <h1>Markdown → ReActicle 映射</h1>
        <p>
          一对一对照表，方便从 Markdown 迁移过来：左边是 Markdown 写法，右边是
          ReActicle 等价表达，外加一句"什么时候应该升级到更强的语义组件"。
        </p>
      </div>

      <div className="prose">
        <ThemeProvider theme={theme}>
          <Aside tone="principle" label="原则">
            Markdown 的<b>基础排版</b>能力 ReActicle 都能稳定表达；Markdown 常被
            滥用来表达的<b>结构化内容</b>，ReActicle 用语义组件增强；Markdown 做
            不到的<b>长尾交互</b>交给 Raw。
          </Aside>
        </ThemeProvider>

        <h2 className="anchor" id="structure">
          文档结构
        </h2>
        <ThemeProvider theme={theme}>
          <Table
            columns={[
              { key: "md", label: "Markdown", width: "12rem" },
              { key: "ra", label: "ReActicle" },
              { key: "note", label: "建议" },
            ]}
            rows={[
              { md: "# Title", ra: "Hero title", note: "标题永远走 Hero" },
              { md: "副标题段落", ra: "Hero subtitle / Lead", note: "短副标题用 subtitle，开篇导语用 Lead" },
              { md: "YAML front matter", ra: "Hero meta", note: "作者 / 日期 / 版本走 meta，不解析 YAML" },
              { md: "## Section", ra: "<Section index='01' title='…'>", note: "主结构走 Section，带编号" },
              { md: "### / #### Section", ra: "<Subsection title='…'>", note: "最多嵌套 2–3 层" },
              { md: "段落 / 普通文本", ra: "<p> children", note: "Section / Subsection 内允许 <p>" },
              { md: "[TOC] / 插件目录", ra: "<Article toc>", note: "目录从 Section / Subsection 自动派生" },
              { md: "---  分隔线", ra: "Section / Conclusion", note: "不新增 Divider；用结构表达分隔" },
              { md: "结尾总结", ra: "<Conclusion>", note: "长文结尾留 Conclusion" },
            ]}
          />
        </ThemeProvider>

        <h2 className="anchor" id="inline">
          行内文本
        </h2>
        <ThemeProvider theme={theme}>
          <Table
            columns={[
              { key: "md", label: "Markdown", width: "12rem" },
              { key: "ra", label: "ReActicle" },
              { key: "note", label: "建议" },
            ]}
            rows={[
              { md: "**bold**", ra: "<strong> / <b>", note: "允许" },
              { md: "*italic*", ra: "（不支持）", note: "协议级禁用斜体，所有主题一致" },
              { md: "~~strike~~", ra: "<del>", note: "允许" },
              { md: "`code`", ra: "<code>", note: "允许，主题已覆盖样式" },
              { md: "[text](url)", ra: "<a href=\"\">", note: "允许，外链建议加 rel='noreferrer'" },
              { md: "硬换行 / <br>", ra: "<br />", note: "允许但不鼓励滥用" },
              { md: "上 / 下标", ra: "<sup> / <sub>", note: "技术 / 学术场景允许" },
              { md: "==mark==", ra: "<mark>", note: "可用，主题样式已覆盖" },
            ]}
          />
        </ThemeProvider>

        <h2 className="anchor" id="lists">
          列表
        </h2>
        <ThemeProvider theme={theme}>
          <Table
            columns={[
              { key: "md", label: "Markdown", width: "12rem" },
              { key: "ra", label: "ReActicle" },
              { key: "note", label: "建议" },
            ]}
            rows={[
              { md: "- item", ra: "<ul><li>", note: "允许" },
              { md: "1. item", ra: "<ol><li>", note: "允许" },
              { md: "嵌套列表", ra: "嵌套 <ul> / <ol>", note: "建议控制深度 ≤ 2" },
              { md: "- [ ] task", ra: "<ActionList items=[…]>", note: "升级：行动项必须有 owner" },
              { md: "摘要要点", ra: "<Summary points=[…]>", note: "升级：开头 / 章节总结" },
              { md: "1. 2. 3. 步骤", ra: "<ol> 或 <Raw> 流程图", note: "普通步骤用 ol；视觉流程用 Raw" },
            ]}
          />
        </ThemeProvider>

        <h2 className="anchor" id="callout">
          引用与提示
        </h2>
        <ThemeProvider theme={theme}>
          <Table
            columns={[
              { key: "md", label: "Markdown", width: "12rem" },
              { key: "ra", label: "ReActicle" },
              { key: "note", label: "建议" },
            ]}
            rows={[
              { md: "> quote", ra: "<Quote source=… who=…>", note: "升级：必须标注来源" },
              { md: ":::note 提示", ra: "<Aside tone='note'>", note: "替代 Markdown 提示扩展" },
              { md: ":::warning 警告", ra: "<Aside tone='warning'>", note: "升级：协议级 tone" },
              { md: "（无）", ra: "<Aside tone='principle'>", note: "原则 / 核心判断" },
              { md: "（无）", ra: "<Aside tone='capability'>", note: "能力 / 功能说明" },
              { md: "[^1] 脚注", ra: "（暂无独立组件）", note: "建议用 <Quote> 或文末链接列表替代" },
            ]}
          />
        </ThemeProvider>

        <h2 className="anchor" id="code">
          代码
        </h2>
        <ThemeProvider theme={theme}>
          <Table
            columns={[
              { key: "md", label: "Markdown", width: "12rem" },
              { key: "ra", label: "ReActicle" },
              { key: "note", label: "建议" },
            ]}
            rows={[
              { md: "`x`", ra: "<code>", note: "行内代码" },
              { md: "三反引号围栏", ra: "<CodeBlock code=… language=…>", note: "Prism 高亮，自带复制" },
              { md: "围栏 + diff", ra: "<DiffReview lines=[…] notes=[…]>", note: "升级：可挂行内评论" },
              { md: "围栏 + tsx", ra: "<HighlightedCode code=… language='tsx'>", note: "Prism 高亮的轻量替代" },
            ]}
          />
        </ThemeProvider>

        <h2 className="anchor" id="tables">
          表格与结构化数据
        </h2>
        <ThemeProvider theme={theme}>
          <Table
            columns={[
              { key: "md", label: "Markdown", width: "12rem" },
              { key: "ra", label: "ReActicle" },
              { key: "note", label: "建议" },
            ]}
            rows={[
              { md: "pipe table", ra: "<Table columns rows>", note: "通用二维数据" },
              { md: "对比表（Markdown 表格）", ra: "<Table>", note: "对比也是二维信息，统一" },
              { md: "风险表", ra: "<RiskList risks=[…]>", note: "升级：含 impact / likelihood / owner" },
              { md: "决策矩阵", ra: "<Decision> / <Tradeoff>", note: "升级：决策记录 / 利弊权衡" },
              { md: "时间线 / 步骤表", ra: "<Table> 或 <Incident>", note: "事故时间线用 Incident" },
              { md: "指标 / KPI 表", ra: "<Table> 或 <Raw>", note: "强视觉指标用 Raw" },
            ]}
          />
        </ThemeProvider>

        <h2 className="anchor" id="media">
          图片与媒体
        </h2>
        <ThemeProvider theme={theme}>
          <Table
            columns={[
              { key: "md", label: "Markdown", width: "12rem" },
              { key: "ra", label: "ReActicle" },
              { key: "note", label: "建议" },
            ]}
            rows={[
              { md: "![alt](src)", ra: "<Image src alt caption credit>", note: "升级：caption / credit 必填" },
              { md: "<video> HTML", ra: "<Video src caption>", note: "普通视频走 Video" },
              { md: "<audio> HTML", ra: "<Audio src caption>", note: "普通音频走 Audio" },
              { md: "[![alt](src)](url)", ra: "<a><Image /></a>", note: "组合即可" },
              { md: "Mermaid 围栏", ra: "<Raw>{/* 内联 SVG */}</Raw>", note: "不组件化，由 Raw 承担" },
              { md: "SVG 图", ra: "<Raw>{/* 内联 SVG */}</Raw>", note: "Raw + 主题 token" },
            ]}
          />
        </ThemeProvider>

        <h2 className="anchor" id="ext">
          扩展语法
        </h2>
        <ThemeProvider theme={theme}>
          <Table
            columns={[
              { key: "md", label: "Markdown", width: "12rem" },
              { key: "ra", label: "ReActicle" },
              { key: "note", label: "建议" },
            ]}
            rows={[
              { md: "details / summary", ra: "<Detail summary>…</Detail>", note: "保留" },
              { md: "tabs 扩展", ra: "<Tabs items=[…]>", note: "保留" },
              { md: "$x^2$ / $$…$$", ra: "<Formula>{…}</Formula>", note: "KaTeX 渲染，行内 / 块级" },
              { md: "原生 <div>", ra: "正文禁用，仅 Raw 允许", note: "策略不同：正文收敛，Raw 放开" },
              { md: "iframe", ra: "<Raw><iframe …/></Raw>", note: "Raw 承担" },
            ]}
          />
        </ThemeProvider>

        <h2 className="anchor" id="links">
          链接体系
        </h2>
        <ThemeProvider theme={theme}>
          <Table
            columns={[
              { key: "md", label: "Markdown", width: "12rem" },
              { key: "ra", label: "ReActicle" },
              { key: "note", label: "建议" },
            ]}
            rows={[
              { md: "[x](url)", ra: "<a>", note: "内联链接" },
              { md: "[x](#anchor)", ra: "<Section id> + <a href='#id'>", note: "锚点链接" },
              { md: "标题自动 slug", ra: "<Article toc>", note: "目录从 Section / Subsection 派生" },
              { md: "[x][id] 引用式", ra: "（暂无）", note: "用文末链接列表替代" },
            ]}
          />
        </ThemeProvider>

        <ThemeProvider theme={theme}>
          <Aside tone="capability" label="一句话总结">
            <b>Markdown 的基础语法 ReActicle 都能稳定表达。</b> 从 Markdown 迁移
            过来时：保留正文里的 <code>p / a / strong / code / ul / ol</code>，
            把<b>结构化内容</b>升级为 Section / Aside / Decision / RiskList /
            Table，把<b>视觉装饰</b>挪到 Raw。
          </Aside>
        </ThemeProvider>
      </div>
    </>
  );
}
