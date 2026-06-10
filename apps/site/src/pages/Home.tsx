import {
  ThemeProvider,
  THEME_LABELS,
  Article,
  Hero,
  Lead,
  Section,
  Aside,
  Summary,
} from "reacticle";
import { CodeBlock } from "../components/CodeBlock";
import { catalog } from "../data/catalog";
import { DEFAULT_THEME } from "../lib/site";

const QUICKSTART = `import { ThemeProvider, Article, Hero, Section, Summary } from "reacticle";

export function Report() {
  return (
    <ThemeProvider theme="tufte">
      <Article toc>
        <Hero title="季度可靠性回顾" subtitle="由语义组件渲染" />
        <Summary points={["三个要点……"]} />
        <Section index="01" title="背景">
          <p>AI 只表达语义，主题负责视觉。</p>
        </Section>
      </Article>
    </ThemeProvider>
  );
}`;

const PRINCIPLES = [
  {
    n: "01",
    title: "结构稳，表达活",
    body: "语义组件撑起结构主体、保证不丢内容；Raw 自由层广泛承载交互、动画与定制可视化。",
  },
  {
    n: "02",
    title: "表达语义，而非布局",
    body: "说“这是一段旁注 / 风险 / 决策”，绝不说“蓝色卡片、24px 边距”。",
  },
  {
    n: "03",
    title: "Props 即协议",
    body: "缺失的必填字段会被显式标成 ⚠ 未指定，让信息缺口可见，绝不悄悄编造。",
  },
  {
    n: "04",
    title: "主题，而非样式",
    body: "作者只挑一个主题，组件只引用 --ra-* token，视觉表达完全交给主题。",
  },
];

const componentCount = catalog.reduce(
  (sum, c) => sum + c.components.length,
  0
);

export function HomePage() {
  // Home is theme-independent: it always renders in the fixed default theme.
  const theme = DEFAULT_THEME;
  return (
    <>
      <section className="hero">
        <div className="hero__grid">
          <div>
            <span className="hero__badge">
              <b>协议</b> · AI 时代的 HTML 文章
            </span>
            <h1>
              让 AI 写<em>语义</em>，
              <br />
              而不是写 HTML。
            </h1>
            <div className="hero__rule" />
            <p className="hero__lede">
              ReActicle 是一套 React 文章协议。AI 不再反复手写 HTML 与 CSS，而是组合
              一小组<b>受限、语义化</b>的组件，由组件库与主题渲染出
              <b>稳定、漂亮、可交互、自包含</b>的 HTML 文章与报告。
            </p>
            <div className="hero__cta">
              <a className="btn btn--primary" href="#/start">
                开始使用 →
              </a>
              <a className="btn btn--ghost" href="#/components">
                浏览组件
              </a>
              <a className="btn btn--ghost" href="#/gallery">
                看效果演示
              </a>
            </div>
            <p className="hero__pair">
              想让 AI Agent 端到端地写文章？搭配独立 Skill{" "}
              <a
                href="https://github.com/ConardLi/garden-skills"
                target="_blank"
                rel="noreferrer noopener"
              >
                beautiful-article
              </a>{" "}
              使用 → 也可以查看{" "}
              <a href="#/skill">集成说明</a>。
            </p>
          </div>

          <div className="hero__artifact">
            <div className="hero__artifact-bar">
              <span className="preview__dot" aria-hidden="true" />
              report.html · {THEME_LABELS[theme]} · 实时渲染
            </div>
            <div className="hero__artifact-body">
              <ThemeProvider theme={theme}>
                <Article>
                  <Hero
                    eyebrow="技术方案评审"
                    title="AI 时代的 HTML 文章协议"
                    subtitle="由 ReActicle 语义组件渲染的真实片段"
                    meta={[{ label: "主题", value: THEME_LABELS[theme] }]}
                  />
                  <Lead>
                    Markdown 让人类写作变轻，ReActicle 让 AI 生成 HTML 变得可控。
                  </Lead>
                  <Summary
                    points={[
                      "HTML 比 Markdown 更适合 AI 输出高信息密度的报告。",
                      "用语义组件约束表达，由主题统一视觉。",
                    ]}
                  />
                  <Section index="01" title="核心主张">
                    <Aside tone="principle" label="核心判断">
                      组件约束结构，主题约束视觉，二者共同降低漂移。
                    </Aside>
                  </Section>
                </Article>
              </ThemeProvider>
            </div>
          </div>
        </div>
      </section>

      <div className="stats">
        <div className="stat">
          <div className="stat__num">{componentCount}</div>
          <div className="stat__label">语义组件</div>
        </div>
        <div className="stat">
          <div className="stat__num">{catalog.length}</div>
          <div className="stat__label">组件分类</div>
        </div>
        <div className="stat">
          <div className="stat__num">1</div>
          <div className="stat__label">公共入口</div>
        </div>
        <div className="stat">
          <div className="stat__num">0</div>
          <div className="stat__label">运行时依赖</div>
        </div>
      </div>

      <section className="home-section" id="why">
        <div className="home-section__head">
          <span className="kicker">为什么</span>
          <h2>Markdown 之于人类，ReActicle 之于 AI</h2>
          <p>
            直接让 AI 写 HTML 太自由：输出发散、token 浪费、质量不可控。把表达收敛成
            语义组件，AI 只需要表达判断、旁注、对比、风险与行动。
          </p>
        </div>
        <div className="analogy">
          <div className="analogy__col">
            <h4>裸 HTML / Markdown</h4>
            <p>
              AI 反复手写 <b>&lt;div&gt;</b>、class 与样式，结构发散、难审阅，每次
              都在重复造轮子。
            </p>
          </div>
          <div className="analogy__arrow" aria-hidden="true">
            →
          </div>
          <div className="analogy__col analogy__col--to">
            <h4>ReActicle 协议</h4>
            <p>
              AI 写 <b>&lt;Aside&gt;</b>、<b>&lt;Decision&gt;</b>、
              <b>&lt;RiskList&gt;</b>，库与主题负责把它渲染得稳定又漂亮。
            </p>
          </div>
        </div>
      </section>

      <section className="home-section" id="principles">
        <div className="home-section__head">
          <span className="kicker">设计哲学</span>
          <h2>四条贯穿始终的原则</h2>
        </div>
        <div className="principles">
          {PRINCIPLES.map((p) => (
            <div className="principle" key={p.n}>
              <div className="principle__n">{p.n}</div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section" id="quickstart">
        <div className="home-section__head">
          <span className="kicker">三十秒上手</span>
          <h2>装上，挑个主题，开始写</h2>
          <p>从唯一的 reacticle 公共入口导入组件，包在 ThemeProvider 里即可。</p>
        </div>
        <div style={{ maxWidth: "46rem" }}>
          <CodeBlock code={QUICKSTART} />
          <div className="hero__cta">
            <a className="btn btn--primary" href="#/start">
              完整安装指南 →
            </a>
          </div>
        </div>
      </section>

      <section className="home-section" id="catalog" style={{ borderBottom: "none" }}>
        <div className="home-section__head">
          <span className="kicker">组件目录</span>
          <h2>{componentCount} 个组件，{catalog.length} 个分类</h2>
          <p>每个组件都有真实 live 预览、属性表与可复制代码。</p>
        </div>
        <div className="cat-grid">
          {catalog.map((cat) => (
            <a className="cat" key={cat.id} href={`#/components#${cat.id}`}>
              <div className="cat__name">{cat.title}</div>
              <div className="cat__list">
                {cat.components.map((c) => c.name).join(" · ")}
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
