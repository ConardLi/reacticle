import type { ReactNode } from "react";
import {
  Article,
  Hero,
  Lead,
  Section,
  Subsection,
  TOC,
  Conclusion,
  Summary,
  Aside,
  Quote,
  Table,
  Image,
  Video,
  Audio,
  RiskList,
  Decision,
  ActionList,
  Checkpoint,
  Tradeoff,
  Incident,
  CodeBlock,
  Formula,
  DiffReview,
  Detail,
  Tabs,
  Raw,
} from "reacticle";
import type { PropRow } from "../components/Preview";
import {
  GenerationPipeline,
  TokenEconomics,
  DensityChart,
  ThemeTokens,
  KineticHeadline,
  FeatureGrid,
  ComponentCloud,
} from "../reports/RawPieces";
import {
  LiveCounter,
  ProgressGauge,
  Sparkline,
  OrbitLoader,
} from "../reports/RawExamples";

export interface ComponentExample {
  title: string;
  blurb?: string;
  demo: ReactNode;
  code: string;
}

export interface CatalogComponent {
  name: string;
  semantic: string;
  demo: ReactNode;
  /** Optional compact variant used only for the overview thumbnail. */
  thumb?: ReactNode;
  code: string;
  props?: PropRow[];
  /** Optional extra worked examples shown on the detail page. */
  examples?: ComponentExample[];
}

export interface CatalogCategory {
  id: string;
  title: string;
  blurb: string;
  components: CatalogComponent[];
}

export interface FlatComponent extends CatalogComponent {
  slug: string;
  categoryId: string;
  categoryTitle: string;
}

/** url-safe slug for a component, e.g. "RiskList" → "risklist". */
export function slugOf(name: string): string {
  return name.toLowerCase();
}

export const catalog: CatalogCategory[] = [
  {
    id: "cat-structure",
    title: "结构",
    blurb: "搭起文章的骨架：容器、标题块、引言、章节与自动目录。",
    components: [
      {
        name: "Article",
        semantic: "文章容器 · 可自动派生目录",
        demo: (
          <Article toc>
            <Hero title="季度可靠性回顾" subtitle="一个最小文章骨架" />
            <Section index="01" title="背景">
              <p>正文段落用 children 承载。</p>
            </Section>
            <Section index="02" title="结论">
              <p>复杂结构交给结构化 props 组件。</p>
            </Section>
          </Article>
        ),
        thumb: (
          <Article>
            <Hero title="季度可靠性回顾" subtitle="最小文章骨架" />
            <Section index="01" title="背景">
              <p>正文段落用 children 承载。</p>
            </Section>
          </Article>
        ),
        code: `<Article toc>
  <Hero title="季度可靠性回顾" subtitle="一个最小文章骨架" />
  <Section index="01" title="背景">
    <p>正文段落用 children 承载。</p>
  </Section>
  <Section index="02" title="结论">
    <p>复杂结构交给结构化 props 组件。</p>
  </Section>
</Article>`,
        props: [
          {
            name: "toc",
            type: "boolean",
            desc: "从 Section / Subsection 自动派生左侧目录并带滚动高亮。",
          },
          {
            name: "children",
            type: "ReactNode",
            required: true,
            desc: "文章内容，通常是 Hero、Lead 与若干 Section。",
          },
        ],
      },
      {
        name: "Hero",
        semantic: "标题块 · 标题 / 副标题 / 元信息",
        demo: (
          <Hero
            eyebrow="技术方案评审"
            title="ReActicle 文章协议"
            subtitle="让 AI 写受约束的语义组件，而不是裸 HTML"
            meta={[
              { label: "作者", value: "协议团队" },
              { label: "日期", value: "2026-06-06" },
            ]}
          />
        ),
        code: `<Hero
  eyebrow="技术方案评审"
  title="ReActicle 文章协议"
  subtitle="让 AI 写受约束的语义组件，而不是裸 HTML"
  meta={[
    { label: "作者", value: "协议团队" },
    { label: "日期", value: "2026-06-06" },
  ]}
/>`,
        props: [
          { name: "title", type: "string", required: true, desc: "主标题。" },
          { name: "eyebrow", type: "string", desc: "标题上方的小标签。" },
          { name: "subtitle", type: "string", desc: "一行副标题 / 导语。" },
          {
            name: "meta",
            type: "{ label; value }[]",
            desc: "作者 / 日期 / 版本等元信息行。",
          },
        ],
      },
      {
        name: "Lead",
        semantic: "引言段 · 框定主题",
        demo: (
          <Lead>
            Markdown 让人类写作变轻，ReActicle 让 AI 生成 HTML 变得可控、可审阅。
          </Lead>
        ),
        code: `<Lead>
  Markdown 让人类写作变轻，ReActicle 让 AI 生成 HTML 变得可控、可审阅。
</Lead>`,
        props: [
          {
            name: "children",
            type: "ReactNode",
            required: true,
            desc: "开篇导语段落。",
          },
        ],
      },
      {
        name: "Section",
        semantic: "一级章节 · 序号 + 标题 + 正文",
        demo: (
          <Section index="01" title="背景与问题">
            <p>章节是文章的一级结构，承载序号、标题与正文。</p>
          </Section>
        ),
        code: `<Section index="01" title="背景与问题">
  <p>章节是文章的一级结构，承载序号、标题与正文。</p>
</Section>`,
        props: [
          { name: "title", type: "string", required: true, desc: "章节标题。" },
          { name: "index", type: "string", desc: '序号，例如 "01"。' },
          { name: "id", type: "string", desc: "锚点 id，用于导航。" },
          {
            name: "children",
            type: "ReactNode",
            required: true,
            desc: "章节正文内容。",
          },
        ],
      },
      {
        name: "Subsection",
        semantic: "嵌套小节 · 自动 h3 / h4",
        demo: (
          <Subsection index="1.1" title="令牌契约">
            <p>小节在章节内部继续细分，按嵌套深度渲染为 h3 或 h4。</p>
          </Subsection>
        ),
        code: `<Subsection index="1.1" title="令牌契约">
  <p>小节在章节内部继续细分，按嵌套深度渲染为 h3 或 h4。</p>
</Subsection>`,
        props: [
          { name: "title", type: "string", required: true, desc: "小节标题。" },
          { name: "index", type: "string", desc: '序号，例如 "5.1"。' },
          {
            name: "level",
            type: "2 | 3",
            desc: "嵌套深度，由 Article 自动设置；2 渲染 h3，3 渲染 h4。",
          },
        ],
      },
      {
        name: "TOC",
        semantic: "目录 · 滚动高亮",
        demo: (
          <TOC
            items={[
              { id: "s1", index: "01", title: "背景", level: 1 },
              { id: "s2", index: "02", title: "方案", level: 1 },
              { id: "s2a", index: "2.1", title: "对比", level: 2 },
            ]}
          />
        ),
        code: `<TOC
  items={[
    { id: "s1", index: "01", title: "背景", level: 1 },
    { id: "s2", index: "02", title: "方案", level: 1 },
    { id: "s2a", index: "2.1", title: "对比", level: 2 },
  ]}
/>`,
        props: [
          {
            name: "items",
            type: "TocItem[]",
            required: true,
            desc: "目录项，通常由 Article 自动派生。",
          },
          { name: "title", type: "string", desc: '列表标题，默认 "目录"。' },
        ],
      },
      {
        name: "Conclusion",
        semantic: "结论 · 收束全文",
        demo: (
          <Conclusion takeaways={["先聚焦单一长报告场景", "用组件闭环再谈扩展"]}>
            组件约束结构、主题约束视觉，二者共同把 AI 的 HTML 输出从“能写”推向“可控”。
          </Conclusion>
        ),
        code: `<Conclusion takeaways={["先聚焦单一长报告场景", "用组件闭环再谈扩展"]}>
  组件约束结构、主题约束视觉，二者共同把 AI 的 HTML 输出从“能写”推向“可控”。
</Conclusion>`,
        props: [
          { name: "title", type: "string", desc: '标题，默认 "结论"。' },
          { name: "children", type: "ReactNode", desc: "结论正文。" },
          {
            name: "takeaways",
            type: "string[]",
            desc: "可选的收尾要点，列在正文之后。",
          },
        ],
      },
    ],
  },
  {
    id: "cat-insight",
    title: "观点",
    blurb: "表达正文之外的重点：摘要、主题化旁注与直接引用。",
    components: [
      {
        name: "Summary",
        semantic: "摘要 · 关键要点",
        demo: (
          <Summary
            points={[
              "HTML 比 Markdown 更适合 AI 输出高信息密度的报告。",
              "直接写 HTML 太自由、不稳定；用语义组件约束表达。",
            ]}
          />
        ),
        code: `<Summary
  points={[
    "HTML 比 Markdown 更适合 AI 输出高信息密度的报告。",
    "直接写 HTML 太自由、不稳定；用语义组件约束表达。",
  ]}
/>`,
        props: [
          {
            name: "points",
            type: "string[]",
            required: true,
            desc: "读者应带走的关键要点。",
          },
          { name: "title", type: "string", desc: '自定义标题，默认 "摘要"。' },
        ],
      },
      {
        name: "Aside",
        semantic: "旁注块 · 原则 / 能力 / 注意",
        demo: (
          <Aside tone="capability" label="导出能力">
            通过 <code>ExportBar</code> 可一键导出 PDF、复制为 Prompt、复制为 Action
            Items。打印时工具栏自动隐藏。
          </Aside>
        ),
        code: `<Aside tone="capability" label="导出能力">
  通过 <code>ExportBar</code> 可一键导出 PDF、复制为 Prompt、复制为 Action Items。
</Aside>`,
        props: [
          {
            name: "tone",
            type: '"note" | "principle" | "capability" | "warning"',
            desc: "语义语气；主题决定实际视觉。",
          },
          {
            name: "label",
            type: "string",
            desc: "短标签；不传时按 tone 使用默认标签。",
          },
          {
            name: "children",
            type: "ReactNode",
            required: true,
            desc: "旁注正文，可包含 inline code 或链接。",
          },
        ],
      },
      {
        name: "Quote",
        semantic: "引用 · 金句",
        demo: (
          <Quote who="Claude" source="the unreasonable effectiveness of HTML">
            HTML 能承载表格、SVG、交互与空间布局，是比 Markdown 更适合复杂材料的容器。
          </Quote>
        ),
        code: `<Quote who="Claude" source="the unreasonable effectiveness of HTML">
  HTML 能承载表格、SVG、交互与空间布局，是比 Markdown 更适合复杂材料的容器。
</Quote>`,
        props: [
          {
            name: "children",
            type: "ReactNode",
            required: true,
            desc: "被引用的文字。",
          },
          { name: "who", type: "string", desc: "出处人物。" },
          { name: "source", type: "string", desc: "出处作品 / 文档。" },
        ],
      },
    ],
  },
  {
    id: "cat-media",
    title: "媒体",
    blurb: "真实图片、视频与音频。自定义图版和视觉解释交给 Raw。",
    components: [
      {
        name: "Image",
        semantic: "配图 · 真实图片（仅 URL，SVG 走 Raw）",
        demo: (
          <Image
            src="https://picsum.photos/seed/reacticle/640/360"
            alt="示意配图：随机风景照"
            caption="一张带题注的配图"
            credit="picsum.photos"
            ratio="16/9"
          />
        ),
        code: `<Image
  src="https://example.com/photo.jpg"  // 真实图片 URL；SVG 请改用 Raw
  alt="黄昏的山丘"
  caption="一张带题注的配图"
  credit="摄影：某某"
  width="80%"
  ratio="16/9"
/>`,
        props: [
          { name: "src", type: "string", required: true, desc: "真实图片 URL（jpg/png/webp…）；不接受内联 SVG，SVG 请用 Raw。" },
          { name: "alt", type: "string", required: true, desc: "替代文本；缺失会被显式标出。" },
          { name: "caption", type: "string", desc: "题注，推荐填写。" },
          { name: "credit", type: "string", desc: "来源 / 署名。" },
          { name: "width", type: "string", desc: "限制显示宽度，如 60% / 420px。" },
          { name: "ratio", type: "string", desc: "预留宽高比，如 16/9，避免布局抖动。" },
        ],
      },
      {
        name: "Video",
        semantic: "视频 · 真实媒体 URL + 题注",
        demo: (
          <Video
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            title="花朵短视频"
            caption="一段带浏览器原生控制条的视频"
            credit="MDN media examples"
            ratio="16/9"
          />
        ),
        code: `<Video
  src="https://example.com/clip.mp4"
  title="产品演示片段"
  caption="一段带浏览器原生控制条的视频"
  credit="素材来源"
  width="80%"
  ratio="16/9"
/>`,
        props: [
          { name: "src", type: "string", required: true, desc: "真实视频 URL（mp4/webm…）。" },
          { name: "title", type: "string", required: true, desc: "可访问媒体标题；缺失会被显式标出。" },
          { name: "poster", type: "string", desc: "播放前显示的封面图。" },
          { name: "caption", type: "string", desc: "题注，推荐填写。" },
          { name: "credit", type: "string", desc: "来源 / 署名。" },
          { name: "width", type: "string", desc: "限制显示宽度，如 80% / 720px。" },
          { name: "ratio", type: "string", desc: "预留宽高比，如 16/9，避免布局抖动。" },
          { name: "controls", type: "boolean", desc: "是否显示浏览器原生控制条，默认 true。" },
          { name: "preload", type: '"none" | "metadata" | "auto"', desc: '预加载策略，默认 "metadata"。' },
          { name: "autoPlay", type: "boolean", desc: "是否自动播放；谨慎使用。" },
          { name: "muted", type: "boolean", desc: "是否静音；自动播放时通常需要。" },
          { name: "loop", type: "boolean", desc: "是否循环播放。" },
          { name: "playsInline", type: "boolean", desc: "移动端是否内联播放，默认 true。" },
        ],
      },
      {
        name: "Audio",
        semantic: "音频 · 真实媒体 URL + 题注",
        demo: (
          <Audio
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
            title="T-Rex roar"
            caption="一段带浏览器原生控制条的音频"
            credit="MDN media examples"
            width="72%"
          />
        ),
        code: `<Audio
  src="https://example.com/interview.mp3"
  title="访谈摘录"
  caption="第 12 分钟关于主题系统的讨论"
  credit="访谈录音"
  width="72%"
/>`,
        props: [
          { name: "src", type: "string", required: true, desc: "真实音频 URL（mp3/ogg/wav…）。" },
          { name: "title", type: "string", required: true, desc: "可访问媒体标题；缺失会被显式标出。" },
          { name: "caption", type: "string", desc: "题注，推荐填写。" },
          { name: "credit", type: "string", desc: "来源 / 署名。" },
          { name: "width", type: "string", desc: "限制显示宽度，如 72% / 520px。" },
          { name: "controls", type: "boolean", desc: "是否显示浏览器原生控制条，默认 true。" },
          { name: "preload", type: '"none" | "metadata" | "auto"', desc: '预加载策略，默认 "metadata"。' },
          { name: "autoPlay", type: "boolean", desc: "是否自动播放；谨慎使用。" },
          { name: "loop", type: "boolean", desc: "是否循环播放。" },
        ],
      },
    ],
  },
  {
    id: "cat-data",
    title: "数据",
    blurb: "所有二维信息统一交给 Table：参数、对比、指标、计划。",
    components: [
      {
        name: "Table",
        semantic: "表格 · 通用二维信息",
        demo: (
          <Table
            caption="三种 AI 输出方式对比"
            columns={[
              { key: "mode", label: "方式", width: "8rem" },
              { key: "stability", label: "稳定性" },
              { key: "cost", label: "Token 成本" },
              { key: "interactive", label: "可交互" },
            ]}
            rows={[
              { mode: "Markdown", stability: "高", cost: "低", interactive: "无" },
              { mode: "裸 HTML", stability: "低", cost: "高", interactive: "强" },
              { mode: "ReActicle", stability: "高", cost: "低", interactive: "强" },
            ]}
          />
        ),
        thumb: (
          <Table
            columns={[
              { key: "mode", label: "方式" },
              { key: "stable", label: "稳定" },
            ]}
            rows={[
              { mode: "裸 HTML", stable: "低" },
              { mode: "ReActicle", stable: "高" },
            ]}
          />
        ),
        code: `<Table
  caption="三种 AI 输出方式对比"
  columns={[
    { key: "mode", label: "方式", width: "8rem" },
    { key: "stability", label: "稳定性" },
    { key: "cost", label: "Token 成本" },
    { key: "interactive", label: "可交互" },
  ]}
  rows={[
    { mode: "Markdown", stability: "高", cost: "低", interactive: "无" },
    { mode: "裸 HTML", stability: "低", cost: "高", interactive: "强" },
    { mode: "ReActicle", stability: "高", cost: "低", interactive: "强" },
  ]}
/>`,
        props: [
          { name: "caption", type: "string", desc: "表格题注，推荐填写。" },
          { name: "source", type: "string", desc: "来源 / 署名。" },
          {
            name: "columns",
            type: "TableColumn[]",
            required: true,
            desc: "列定义，每项含 key / label / align / width。",
          },
          {
            name: "rows",
            type: "TableRow[]",
            required: true,
            desc: "行数据，按 column key 填值。",
          },
        ],
      },
    ],
  },
  {
    id: "cat-decision",
    title: "决策",
    blurb: "把判断与执行落到纸面：风险、决策记录、行动项与人工确认点。",
    components: [
      {
        name: "RiskList",
        semantic: "风险 · 影响 / 可能性 / 缓解",
        demo: (
          <RiskList
            risks={[
              {
                name: "组件抽象覆盖不足",
                impact: "medium",
                likelihood: "medium",
                mitigation: "结构走组件，长尾表达交给 Raw 自由层。",
                owner: "组件负责人",
                status: "进行中",
              },
              {
                name: "AI 漏填结构化字段",
                impact: "high",
                likelihood: "low",
                mitigation: "缺失字段在渲染结果里显式标出。",
                owner: "协议负责人",
              },
            ]}
          />
        ),
        code: `<RiskList
  risks={[
    {
      name: "组件抽象覆盖不足",
      impact: "medium",
      likelihood: "medium",
      mitigation: "结构走组件，长尾表达交给 Raw 自由层。",
      owner: "组件负责人",
      status: "进行中",
    },
    {
      name: "AI 漏填结构化字段",
      impact: "high",
      likelihood: "low",
      mitigation: "缺失字段在渲染结果里显式标出。",
      owner: "协议负责人",
    },
  ]}
/>`,
        props: [
          {
            name: "risks",
            type: "RiskItem[]",
            required: true,
            desc: "风险项；每项含 name / impact / likelihood / mitigation / owner。",
          },
        ],
      },
      {
        name: "Decision",
        semantic: "决策记录 · 问题 / 选项 / 推荐",
        demo: (
          <Decision
            question="第一版用什么样式方案？"
            options={["CSS 变量 + 原生 CSS", "Tailwind", "CSS-in-JS"]}
            criteria={["单页内联难度", "主题切换成本", "构建复杂度"]}
            recommended="CSS 变量 + 原生 CSS"
            rationale="最易内联进单页 HTML，主题即一组变量覆盖，零额外构建负担。"
          />
        ),
        code: `<Decision
  question="第一版用什么样式方案？"
  options={["CSS 变量 + 原生 CSS", "Tailwind", "CSS-in-JS"]}
  criteria={["单页内联难度", "主题切换成本", "构建复杂度"]}
  recommended="CSS 变量 + 原生 CSS"
  rationale="最易内联进单页 HTML，主题即一组变量覆盖，零额外构建负担。"
/>`,
        props: [
          { name: "question", type: "string", required: true, desc: "被决策的问题。" },
          {
            name: "options",
            type: "string[]",
            required: true,
            desc: "候选方案。",
          },
          { name: "criteria", type: "string[]", desc: "判断标准，推荐填写。" },
          { name: "recommended", type: "string", required: true, desc: "推荐方案。" },
          { name: "rationale", type: "string", required: true, desc: "推荐理由。" },
        ],
      },
      {
        name: "ActionList",
        semantic: "行动项 · 负责人 / 截止 / 状态",
        demo: (
          <ActionList
            items={[
              { task: "完成语义组件", owner: "组件负责人", due: "M1", status: "完成" },
              { task: "打通单页构建", owner: "工程负责人", due: "M2", status: "进行中" },
              { task: "编写 Skill", owner: "协议负责人", due: "M3", status: "未开始" },
            ]}
          />
        ),
        code: `<ActionList
  items={[
    { task: "完成语义组件", owner: "组件负责人", due: "M1", status: "完成" },
    { task: "打通单页构建", owner: "工程负责人", due: "M2", status: "进行中" },
    { task: "编写 Skill", owner: "协议负责人", due: "M3", status: "未开始" },
  ]}
/>`,
        props: [
          {
            name: "items",
            type: "ActionItem[]",
            required: true,
            desc: "行动项；每项含 task / owner / due / status。",
          },
        ],
      },
      {
        name: "Checkpoint",
        semantic: "人工确认点 · human-in-the-loop",
        demo: (
          <Checkpoint
            question="是否确认第一版只聚焦 AI 长报告这一个场景？"
            options={["确认，聚焦单场景", "希望覆盖更多场景"]}
          />
        ),
        code: `<Checkpoint
  question="是否确认第一版只聚焦 AI 长报告这一个场景？"
  options={["确认，聚焦单场景", "希望覆盖更多场景"]}
/>`,
        props: [
          {
            name: "question",
            type: "string",
            required: true,
            desc: "需要人工确认 / 决定的事项。",
          },
          { name: "options", type: "string[]", desc: "可选的选项。" },
        ],
      },
      {
        name: "Tradeoff",
        semantic: "权衡 · 利 / 弊 / 结论",
        demo: (
          <Tradeoff
            subject="把视觉完全交给主题系统"
            pros={["输出稳定、不漂移", "AI 不写样式，省 token"]}
            cons={["单篇文章的视觉自由度下降", "主题需要预先设计"]}
            verdict="对 AI 批量生成的场景，稳定性收益远大于自由度损失。"
          />
        ),
        code: `<Tradeoff
  subject="把视觉完全交给主题系统"
  pros={["输出稳定、不漂移", "AI 不写样式，省 token"]}
  cons={["单篇文章的视觉自由度下降", "主题需要预先设计"]}
  verdict="对批量生成场景，稳定性收益远大于自由度损失。"
/>`,
        props: [
          { name: "subject", type: "string", required: true, desc: "被权衡的对象。" },
          { name: "pros", type: "string[]", required: true, desc: "有利点。" },
          { name: "cons", type: "string[]", required: true, desc: "不利点。" },
          { name: "verdict", type: "string", desc: "底线结论。" },
        ],
      },
      {
        name: "Incident",
        semantic: "故障 / 安全事件 · 复盘",
        demo: (
          <Incident
            title="构建产物体积异常增大"
            severity="medium"
            status="已恢复"
            impact="单页 HTML 体积上涨约 40%，分享与加载变慢。"
            rootCause="主题 CSS 未做按主题切分，所有主题被一并打包。"
            resolution="按 data-theme 拆分变量，仅内联当前主题。"
            timeline={[
              { when: "10:20", what: "监控发现产物体积超阈值。" },
              { when: "11:05", what: "定位到主题 CSS 全量打包。" },
              { when: "11:40", what: "拆分并发布，体积回落。" },
            ]}
          />
        ),
        code: `<Incident
  title="构建产物体积异常增大"
  severity="medium"
  status="已恢复"
  impact="单页 HTML 体积上涨约 40%。"
  rootCause="主题 CSS 未按主题切分。"
  resolution="按 data-theme 拆分变量，仅内联当前主题。"
  timeline={[
    { when: "10:20", what: "监控发现体积超阈值。" },
    { when: "11:40", what: "拆分并发布，体积回落。" },
  ]}
/>`,
        props: [
          { name: "title", type: "string", required: true, desc: "事件标题。" },
          {
            name: "severity",
            type: '"high" | "medium" | "low"',
            required: true,
            desc: "严重度，渲染为级别标签。",
          },
          { name: "impact", type: "string", required: true, desc: "影响范围。" },
          { name: "rootCause", type: "string", desc: "根因，推荐填写。" },
          { name: "resolution", type: "string", desc: "处置方式，推荐填写。" },
          {
            name: "timeline",
            type: "IncidentEvent[]",
            desc: "时间线，每项含 when / what。",
          },
          { name: "status", type: "string", desc: '当前状态，如 "已恢复"。' },
        ],
      },
    ],
  },
  {
    id: "cat-technical",
    title: "技术",
    blurb: "展示代码、公式与审阅 diff。解释回到正文，避免组件臃肿。",
    components: [
      {
        name: "CodeBlock",
        semantic: "代码块 · Prism 高亮 + 复制",
        demo: (
          <CodeBlock
            language="tsx"
            title="theme-provider.tsx"
            code={`<ThemeProvider theme="tufte">\n  <Article>...</Article>\n</ThemeProvider>`}
          />
        ),
        thumb: (
          <CodeBlock
            language="tsx"
            title="tsx"
            code={`<ThemeProvider theme="tufte" />`}
          />
        ),
        code: `<CodeBlock
  language="tsx"
  title="theme-provider.tsx"
  code={\`<ThemeProvider theme="tufte">
  <Article>...</Article>
</ThemeProvider>\`}
/>`,
        props: [
          { name: "code", type: "string", required: true, desc: "代码片段。" },
          { name: "language", type: "string", desc: '语言标签，例如 "tsx"。' },
          { name: "title", type: "string", desc: "短标题，通常是文件名或用途。" },
          { name: "showLineNumbers", type: "boolean", desc: "是否显示行号，默认 true。" },
          { name: "copyable", type: "boolean", desc: "是否显示复制按钮，默认 true。" },
        ],
      },
      {
        name: "Formula",
        semantic: "数学公式 · KaTeX 渲染",
        demo: (
          <div>
            <p>
              行内公式适合嵌在正文里，例如 <Formula tex="E = mc^2" />。
            </p>
            <Formula
              block
              tex={"\\int_0^1 x^2\\,dx = \\frac{1}{3}"}
              caption="一个块级公式示例"
            />
          </div>
        ),
        thumb: (
          <Formula block tex={"f(x)=\\sum_{n=0}^{\\infty} a_n x^n"} />
        ),
        code: `<p>
  行内公式：<Formula tex="E = mc^2" />
</p>
<Formula
  block
  tex={"\\\\int_0^1 x^2\\\\,dx = \\\\frac{1}{3}"}
  caption="一个块级公式示例"
/>`,
        props: [
          { name: "tex", type: "string", required: true, desc: "TeX 数学源码。" },
          { name: "block", type: "boolean", desc: "是否按块级 display math 渲染，默认 false。" },
          { name: "caption", type: "string", desc: "块级公式题注；行内公式忽略。" },
        ],
      },
      {
        name: "DiffReview",
        semantic: "变更审阅 · diff + 审阅意见",
        demo: (
          <DiffReview
            file="src/theme/index.css"
            lines={[
              { type: "ctx", text: '@import "./tokens.css";' },
              { type: "del", text: '@import "./themes/all.css";' },
              { type: "add", text: '@import "./themes/tufte/tufte.css";' },
              { type: "add", text: '@import "./themes/press/press.css";' },
            ]}
            notes={[
              { ref: "+ press", text: "新增主题按需引入，不再全量打包。" },
            ]}
          />
        ),
        code: `<DiffReview
  file="src/theme/index.css"
  lines={[
    { type: "ctx", text: '@import "./tokens.css";' },
    { type: "del", text: '@import "./themes/all.css";' },
    { type: "add", text: '@import "./themes/tufte/tufte.css";' },
  ]}
  notes={[{ ref: "+ press", text: "新增主题按需引入。" }]}
/>`,
        props: [
          { name: "file", type: "string", desc: "变更所在文件，推荐填写。" },
          { name: "title", type: "string", desc: "变更标题。" },
          {
            name: "lines",
            type: "DiffLine[]",
            required: true,
            desc: "diff 行，每项含 type(add|del|ctx) 与 text。",
          },
          {
            name: "notes",
            type: "DiffNote[]",
            desc: "审阅意见，每项含可选 ref 与 text。",
          },
        ],
      },
    ],
  },
  {
    id: "cat-interaction",
    title: "交互壳",
    blurb: "让文章不只是静态：按需展开的细节，与同一产物的多个视角。",
    components: [
      {
        name: "Detail",
        semantic: "折叠细节 · 按需展开",
        demo: (
          <Detail summary="展开：为什么不做独立校验器（Guard）？">
            完整性内建进组件本身——必填字段用类型约束，缺失字段在渲染结果里显式标出，
            不再需要一个单独的 Guard 层。
          </Detail>
        ),
        code: `<Detail summary="展开：为什么不做独立校验器？">
  完整性内建进组件本身，缺失字段在渲染结果里显式标出。
</Detail>`,
        props: [
          { name: "summary", type: "string", required: true, desc: "常驻可见的摘要行。" },
          {
            name: "children",
            type: "ReactNode",
            required: true,
            desc: "展开后显示的细节。",
          },
          { name: "open", type: "boolean", desc: "是否默认展开。" },
        ],
      },
      {
        name: "Tabs",
        semantic: "多视角 · 同一产物多形态",
        demo: (
          <Tabs
            tabs={[
              {
                label: "高管摘要",
                content: (
                  <Summary
                    points={["HTML 是 AI 输出的理想容器", "用组件约束让输出可控"]}
                  />
                ),
              },
              {
                label: "核心论证",
                content: (
                  <Aside tone="principle" label="核心原则">
                    让 AI 写受约束的语义组件，而不是裸 HTML：输出更稳定，也更省 token。
                  </Aside>
                ),
              },
            ]}
          />
        ),
        code: `<Tabs
  tabs={[
    { label: "高管摘要", content: <Summary points={[...]} /> },
    { label: "核心原则", content: <Aside tone="principle">...</Aside> },
  ]}
/>`,
        props: [
          {
            name: "tabs",
            type: "TabItem[]",
            required: true,
            desc: "各视角，每项含 label 与 content。",
          },
          { name: "initial", type: "number", desc: "初始激活的标签序号，默认 0。" },
        ],
      },
    ],
  },
  {
    id: "cat-free",
    title: "自由层",
    blurb:
      "结构主体交给语义组件，Raw 负责标新立异：交互、动画、定制可视化——Markdown 永远做不到的部分。它不丢内容，反而让死板的文章活起来，每篇文章都应该大量使用。注意：下面是「能力演示」，给你看 Raw 能做什么；真正写文章时，请为每段话现写一处 Raw（手写 SVG / 内联样式 / 一次性小组件，用主题 token 取色），而不是反复调用同几个预制控件——那会把「自由层」退化成又一个受限组件库。",
    components: [
      {
        name: "Raw",
        semantic: "创意层 · 渲染任意 React / HTML",
        demo: (
          <Raw title="Raw 里渲染的是一个带动画的 React 组件">
            <GenerationPipeline />
          </Raw>
        ),
        thumb: (
          <Raw>
            <TokenEconomics />
          </Raw>
        ),
        code: `// Raw 渲染完整 React 组件，而不只是 HTML 字符串
<Raw title="生成链路">
  <GenerationPipeline />   {/* 自定义组件：带状态 / 动画 / SVG */}
</Raw>

// 也支持原生 HTML 字符串
<Raw html="<svg>…</svg>" />`,
        props: [
          {
            name: "children",
            type: "ReactNode",
            desc: "任意 React 内容：完整组件、状态、动画、SVG、canvas——首选方式。",
          },
          { name: "html", type: "string", desc: "或直接渲染一段原生 HTML 字符串。" },
          { name: "title", type: "string", desc: "可选的说明 / 题注。" },
        ],
        examples: [
          {
            title: "渲染完整 React 组件",
            blurb: "Raw 的首选用法：直接塞进一个带状态与动画的 React 组件。",
            demo: (
              <Raw title="带流动动画的生成链路">
                <GenerationPipeline />
              </Raw>
            ),
            code: `<Raw title="带流动动画的生成链路">
  <GenerationPipeline />   {/* 一个普通 React 组件 */}
</Raw>`,
          },
          {
            title: "交互 · 实时计数器",
            blurb: "useState 在 Raw 里照常工作，点击即时更新。",
            demo: (
              <Raw>
                <LiveCounter />
              </Raw>
            ),
            code: `function LiveCounter() {
  const [n, setN] = useState(3);
  return (
    <div>
      <button onClick={() => setN(n - 1)}>−</button>
      <span>{n}</span>
      <button onClick={() => setN(n + 1)}>+</button>
    </div>
  );
}

<Raw><LiveCounter /></Raw>`,
          },
          {
            title: "交互 · 进度仪表（拖动）",
            blurb: "滑块驱动一个 SVG 圆环，stroke-dashoffset 平滑过渡。",
            demo: (
              <Raw>
                <ProgressGauge />
              </Raw>
            ),
            code: `<Raw>
  <ProgressGauge />   {/* 内部用 <input type="range"> + <svg> 圆环 */}
</Raw>`,
          },
          {
            title: "动画数据图表",
            blurb: "挂载后从零生长的分组条形图，悬停查看数值。",
            demo: (
              <Raw title="信息密度对比">
                <DensityChart />
              </Raw>
            ),
            code: `<Raw title="信息密度对比">
  <DensityChart />
</Raw>`,
          },
          {
            title: "内联 SVG · 迷你折线",
            blurb: "纯手写 SVG，由数据生成 polyline——Markdown 无能为力。",
            demo: (
              <Raw title="近十期趋势">
                <Sparkline />
              </Raw>
            ),
            code: `<Raw title="近十期趋势">
  <svg viewBox="0 0 260 60">
    <polyline points={points} stroke="var(--ra-color-accent)" />
  </svg>
</Raw>`,
          },
          {
            title: "纯 CSS 动画",
            blurb: "@keyframes 驱动的轨道 loader，尊重 reduce-motion。",
            demo: (
              <Raw>
                <OrbitLoader />
              </Raw>
            ),
            code: `<Raw>
  <OrbitLoader />   {/* 三个点用 @keyframes 旋转 */}
</Raw>`,
          },
          {
            title: "文字动画标题",
            blurb: "逐字落定的入场动画，适合长文开场。",
            demo: (
              <Raw>
                <KineticHeadline text="让文章活起来" />
              </Raw>
            ),
            code: `<Raw>
  <KineticHeadline text="让文章活起来" />
</Raw>`,
          },
          {
            title: "原生 HTML 字符串（html prop）",
            blurb: "不写组件，直接给一段 HTML——同样内联进单页产物。",
            demo: (
              <Raw
                html={`<div style="border-left:3px solid var(--ra-color-accent);padding:12px 16px;background:var(--ra-color-surface);border-radius:0 8px 8px 0;color:var(--ra-color-text)"><strong style="color:var(--ra-color-accent)">提示</strong>　这段完全由 html 字符串渲染，没有用任何 React 组件。</div>`}
              />
            ),
            code: `<Raw html={\`
  <div style="border-left:3px solid var(--ra-color-accent);padding:12px 16px">
    <strong>提示</strong> 这段完全由 html 字符串渲染。
  </div>
\`} />`,
          },
          {
            title: "读取当前主题 token",
            blurb: "Raw 内容可用 var(--ra-*)，切换主题时自动跟随。",
            demo: (
              <Raw title="当前主题色板">
                <ThemeTokens />
              </Raw>
            ),
            code: `<Raw title="当前主题色板">
  <ThemeTokens />   {/* 背景用 var(--ra-color-accent) 等令牌 */}
</Raw>`,
          },
          {
            title: "自定义布局网格",
            blurb: "任意 CSS Grid 布局 + 悬停浮起，结构组件覆盖不到的版式。",
            demo: (
              <Raw title="六类组件">
                <FeatureGrid
                  tiles={[
                    { n: "6", k: "结构", d: "Article / Section …" },
                    { n: "3", k: "观点", d: "Summary / Aside / Quote" },
                    { n: "5", k: "结构化", d: "Table / Media …" },
                    { n: "1", k: "自由", d: "Raw" },
                  ]}
                />
              </Raw>
            ),
            code: `<Raw title="六类组件">
  <FeatureGrid tiles={[…]} />   {/* 自定义 grid 布局 */}
</Raw>`,
          },
          {
            title: "标签云动画",
            blurb: "漂浮 + 悬停高亮的组件名云。",
            demo: (
              <Raw title="协议里的组件们">
                <ComponentCloud
                  names={[
                    "Article", "Aside", "Image", "Table", "Decision",
                    "Formula", "DiffReview", "Tabs", "Raw",
                  ]}
                />
              </Raw>
            ),
            code: `<Raw title="协议里的组件们">
  <ComponentCloud names={[...]} />
</Raw>`,
          },
        ],
      },
    ],
  },
];

/** Every component flattened in catalog order, carrying its category. */
export const allComponents: FlatComponent[] = catalog.flatMap((cat) =>
  cat.components.map((c) => ({
    ...c,
    slug: slugOf(c.name),
    categoryId: cat.id,
    categoryTitle: cat.title,
  }))
);

export function findComponent(slug: string): FlatComponent | undefined {
  return allComponents.find((c) => c.slug === slug);
}

/** Previous / next component in catalog order, for detail-page paging. */
export function componentNeighbors(slug: string): {
  prev: FlatComponent | null;
  next: FlatComponent | null;
} {
  const i = allComponents.findIndex((c) => c.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? allComponents[i - 1]! : null,
    next: i < allComponents.length - 1 ? allComponents[i + 1]! : null,
  };
}
