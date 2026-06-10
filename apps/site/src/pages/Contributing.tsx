import { ThemeProvider, Aside, Checkpoint, Table } from "reacticle";
import { CodeBlock } from "../components/CodeBlock";
import type { TocEntry } from "../components/OnThisPage";
import { DEFAULT_THEME } from "../lib/site";

export const contributingToc: TocEntry[] = [
  { id: "ways", label: "贡献方式" },
  { id: "setup", label: "本地开发" },
  { id: "new-component", label: "新增组件" },
  { id: "new-theme", label: "新增主题" },
  { id: "new-gallery", label: "新增 Gallery 文章" },
  { id: "pr", label: "PR checklist" },
];

const SETUP = `git clone https://github.com/ConardLi/reacticle.git
cd reacticle
npm install
npm run dev          # 本地启动统一站点（文档 + 组件 + Gallery）

# 其他常用脚本
npm run build:lib    # 组件库产物
npm run build:site   # 站点产物
npm run build:report # 自包含单页报告
npm run typecheck
npm run lint`;

const NEW_COMPONENT = `// 1. 在 src/components/<category>/<Name>.tsx 创建组件
//    - 所有视觉只引用 --ra-* token，绝不硬编码颜色
//    - 必填字段缺失时，使用 <MissingField label="…" /> 暴露缺口
//    - 配套 .css 与组件同目录

// 2. 在 src/index.ts 导出
export { Name, type NameProps } from "./components/<category>/Name";

// 3. 在 apps/site/src/data/catalog.tsx 注册
//    - props 表格条目
//    - 至少一组真实 live 示例

// 4. 检查所有 11 套主题下的渲染都不翻车
//    - 切到 shannon / fuller 等暗主题时，token 是否仍然 work
//    - 切到 sottsass / freddie 等高对比主题时，是否过载

// 5. 跑 npm run build && npm run typecheck`;

const NEW_THEME = `// 1. 创建 src/theme/themes/<name>/<name>.css
//    - 只覆盖需要变化的 --ra-* 变量
//    - 不要新增 .my-theme-foo 类，组件层不感知主题

// 2. 创建 src/theme/themes/<name>/<name>.md
//    - 描述代码风格、配图风格、Raw 风格
//    - 这份 md 是给 AI 看的，决定 Skill 能否产出贴合主题的素材

// 3. 在 src/theme/index.css 引入
@import "./themes/<name>/<name>.css";

// 4. 在 src/theme/ThemeProvider.tsx 注册
export const THEMES = [..., "<name>"] as const;
export const THEME_LABELS = { ..., "<name>": "<Display Label>" };

// 5. 给主题配一篇 Gallery 示范长文（见下一节）`;

const NEW_GALLERY = `// 1. 在 apps/site/src/reports/<Name>.tsx 写一篇示范文章
//    - 长度足够：覆盖 Hero / Lead / Section / Aside / Table / Decision …
//    - 至少包含一处 Image / Video / Audio
//    - 至少包含一处 Raw（验证 Raw 在该主题下不翻车）

// 2. 在 apps/site/src/data/gallery.tsx 注册
{
  slug: "<slug>",
  theme: "<theme-name>",
  title: "...",
  kind: "...",
  lead: "...",
  Component: <Name />,
}

// 3. 同步主题 README / 主题图册封面（GitHub raw CDN）
//    https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/theam-<name>.webp`;

export function ContributingPage() {
  const theme = DEFAULT_THEME;
  return (
    <>
      <div className="page-head">
        <span className="kicker">协作</span>
        <h1>贡献指南</h1>
        <p>
          ReActicle 是开源协议项目，欢迎 issue / PR / 主题贡献。本页给出一条最短的
          贡献路径——从 fork 到合并的 checklist。
        </p>
      </div>

      <div className="prose">
        <h2 className="anchor" id="ways">
          贡献方式
        </h2>
        <ThemeProvider theme={theme}>
          <Table
            caption="不同类型的贡献"
            columns={[
              { key: "kind", label: "类型", width: "10rem" },
              { key: "what", label: "内容" },
              { key: "scope", label: "影响面" },
            ]}
            rows={[
              { kind: "文档改进", what: "修错字、补 FAQ、写配方", scope: "小" },
              { kind: "新增主题", what: "贡献一套新的视觉语言", scope: "中" },
              { kind: "新增 Gallery", what: "为某主题贡献一篇示范长文", scope: "中" },
              { kind: "新增组件", what: "扩展语义组件库（需慎重）", scope: "大" },
              { kind: "Bug fix", what: "修组件 / 主题 / 站点 bug", scope: "看大小" },
            ]}
          />
        </ThemeProvider>

        <h2 className="anchor" id="setup">
          本地开发
        </h2>
        <CodeBlock lang="bash" code={SETUP} />

        <h2 className="anchor" id="new-component">
          新增一个组件
        </h2>
        <p>
          先问自己一个问题：<b>能不能用 Raw 表达？</b>能用 Raw 就别新增组件——
          组件库膨胀的代价是每套主题都得维护它。新组件应该是某个<b>反复出现的语义</b>，
          且无法用现有组件组合表达。
        </p>
        <ThemeProvider theme={theme}>
          <Aside tone="warning" label="慎重">
            新增组件意味着 11 套主题都要为它写样式。除非这个语义在三类以上文章里
            稳定复现，否则更推荐用 Raw 写一次。
          </Aside>
        </ThemeProvider>
        <CodeBlock code={NEW_COMPONENT} />

        <h2 className="anchor" id="new-theme">
          新增一套主题
        </h2>
        <p>
          这是最受欢迎的贡献类型。你不需要修任何组件代码，只动主题层即可：
        </p>
        <CodeBlock code={NEW_THEME} />
        <ThemeProvider theme={theme}>
          <Aside tone="principle" label="主题不只是 CSS">
            新增主题最容易被忽略的是 <b>md 文件</b>。组件库里的样式只决定视觉骨架，
            而 AI 要选什么<b>素材</b>（配图、Raw、代码风格）取决于这份 md。
            没有 md，AI 用你的主题写文章就会漂。
          </Aside>
        </ThemeProvider>

        <h2 className="anchor" id="new-gallery">
          新增 Gallery 示范文章
        </h2>
        <p>
          每套主题都需要至少一篇 Gallery 示范——这是主题的"试金石"，证明它能扛住
          长文。新增主题时一并提交一篇即可：
        </p>
        <CodeBlock code={NEW_GALLERY} />

        <h2 className="anchor" id="pr">
          PR 提交前 checklist
        </h2>
        <ThemeProvider theme={theme}>
          <Checkpoint
            question="提交 PR 前逐项确认"
            options={[
              "npm run typecheck 通过",
              "npm run lint 通过",
              "npm run build 全套通过",
              "新增 / 修改组件：在所有 11 套主题下肉眼检查未翻车",
              "新增 / 修改主题：md 文件已写明 Code / Image / Raw 风格",
              "新增 Gallery：至少包含 Image / Video / Audio 与 Raw 各一处",
              "PR 描述里说明动机（why），而不只是修改（what）",
            ]}
          />
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          <Aside tone="note" label="不确定怎么写">
            可以先发一个 <i>draft PR</i> 或开 Issue 描述你的想法，维护者会帮你把
            归属（库 / 文档 / Gallery）和实现路径理清。
          </Aside>
        </ThemeProvider>
      </div>
    </>
  );
}
