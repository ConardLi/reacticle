import { ThemeProvider, Table, RiskList, Checkpoint } from "reacticle";
import { CodeBlock } from "../components/CodeBlock";
import type { TocEntry } from "../components/OnThisPage";
import { DEFAULT_THEME } from "../lib/site";

export const architectureToc: TocEntry[] = [
  { id: "faces", label: "三个产品面" },
  { id: "deps", label: "依赖原则" },
  { id: "build", label: "构建关系" },
  { id: "ownership", label: "归属判断" },
];

const DEPS = `// 允许的依赖方向
apps/site  ->  reacticle        // 站点只通过公共入口消费组件
skill      ->  documents usage  // 描述用法，无运行时 import

// 禁止的依赖方向
src        ->  apps/site         // 组件库永不反向依赖站点`;

export function ArchitecturePage() {
  // Guide pages are theme-independent: previews use the fixed default theme.
  const theme = DEFAULT_THEME;
  return (
    <>
      <div className="page-head">
        <span className="kicker">工程架构</span>
        <h1>工程架构</h1>
        <p>
          单包组件库 + 统一站点。仓库根包就是 <code className="inline">reacticle</code>，
          <code className="inline">src/</code> 是库源码，
          <code className="inline">apps/site</code> 是它唯一的真实消费者。
        </p>
      </div>

      <div className="prose">
        <h2 className="anchor" id="faces">
          三个产品面，一个站点
        </h2>
        <p>
          文档、组件参考与 Gallery 曾经是分裂的两个应用，现在合并为同一个站点：
          一套视觉语言、一次部署。组件库、文档与预览的边界依旧清晰。
        </p>
        <div className="preview">
          <div className="preview__bar">
            <span className="preview__dot" aria-hidden="true" />
            <span className="preview__name">演进路线</span>
            <span className="preview__semantic">由 Table 渲染</span>
          </div>
          <div className="preview__stage">
            <ThemeProvider theme={theme}>
              <Table
                caption="仓库里的三个产品面"
                columns={[
                  { key: "path", label: "路径", width: "8rem" },
                  { key: "role", label: "角色" },
                  { key: "note", label: "说明" },
                ]}
                rows={[
                  { path: "src", role: "组件库", note: "根包源码，只暴露 reacticle 公共入口。" },
                  { path: "apps/site", role: "统一站点", note: "文档 + 组件参考 + Gallery 合一。" },
                  { path: "skill", role: "AI 写作 Skill", note: "渐进式加载组件参考，省 token。" },
                ]}
              />
            </ThemeProvider>
          </div>
        </div>

        <h2 className="anchor" id="deps">
          依赖原则
        </h2>
        <p>组件库永远不反向依赖站点；站点只通过公共入口消费组件。</p>
        <CodeBlock code={DEPS} />
        <div className="preview">
          <div className="preview__bar">
            <span className="preview__dot" aria-hidden="true" />
            <span className="preview__name">边界风险</span>
            <span className="preview__semantic">由 RiskList 渲染</span>
          </div>
          <div className="preview__stage">
            <ThemeProvider theme={theme}>
              <RiskList
                risks={[
                  {
                    name: "站点直接引用库内部文件",
                    impact: "high",
                    likelihood: "low",
                    mitigation: "Vite alias 统一映射到 reacticle 公共入口。",
                    owner: "工程负责人",
                  },
                ]}
              />
            </ThemeProvider>
          </div>
        </div>

        <h2 className="anchor" id="build">
          构建关系
        </h2>
        <CodeBlock
          lang="bash"
          code={`npm run build:lib      # 组件库产物      → dist
npm run build:site     # 统一站点        → dist/site
npm run build:report   # 自包含单页报告  → dist-report/report.html
npm run build          # 依次构建库与站点`}
        />

        <h2 className="anchor" id="ownership">
          归属判断
        </h2>
        <p>新增能力前，先判断它属于哪一层：</p>
        <div className="preview">
          <div className="preview__bar">
            <span className="preview__dot" aria-hidden="true" />
            <span className="preview__name">归属确认</span>
            <span className="preview__semantic">由 Checkpoint 渲染</span>
          </div>
          <div className="preview__stage">
            <ThemeProvider theme={theme}>
              <Checkpoint
                question="新增能力应该先判断归属：库能力、文档解释，还是 Gallery 示例？"
                options={["库", "文档", "Gallery"]}
              />
            </ThemeProvider>
          </div>
        </div>
      </div>
    </>
  );
}
