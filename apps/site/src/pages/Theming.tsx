import { useState } from "react";
import {
  ThemeProvider,
  THEMES,
  THEME_LABELS,
  Article,
  Hero,
  Section,
  Aside,
  type ThemeName,
} from "reacticle";
import { CodeBlock } from "../components/CodeBlock";
import type { TocEntry } from "../components/OnThisPage";
import { DEFAULT_THEME } from "../lib/site";

export const themingToc: TocEntry[] = [
  { id: "contract", label: "Token 契约" },
  { id: "themes", label: "内置主题" },
  { id: "taste", label: "生成风格" },
  { id: "live", label: "实时效果" },
  { id: "add", label: "新增一套主题" },
];

interface ThemeNote {
  name: string;
  label: string;
  blurb: string;
  code: string;
  image: string;
  raw: string;
  swatches: { token: string; value: string }[];
}

const BUILT_IN: ThemeNote[] = [
  {
    name: "tufte",
    label: "Tufte · Data-Ink",
    blurb:
      "Edward Tufte / 最大化数据墨水。暖纸底、老式衬线、发丝级参考线与边注，去掉卡片、填色、阴影、圆角——每一滴墨水都承载信息。面向分析报告与数据驱动写作。",
    code:
      "代码像工程证据：浅纸面、发丝线、退后的行号，Prism token 从青灰 / 暖红 / 低饱和绿派生。",
    image:
      "配图像图版或证据：真实数据图、裁切截图、细线示意、低饱和摄影；拒绝 stock hero、3D、渐变氛围图。",
    raw:
      "Raw 像手画小图：内联 SVG、sparkline、坐标轴、slopegraph、微交互；少填充、少动效、无卡片和装饰背景。",
    swatches: [
      { token: "纸", value: "#fbfaf6" },
      { token: "墨", value: "#1b1b1a" },
      { token: "结构", value: "#3e4a5c" },
      { token: "警示", value: "#a6300e" },
    ],
  },
  {
    name: "press",
    label: "Press · 书卷",
    blurb:
      "Stripe Press / 人文出版派。沿用同一套结构纪律，但更亮的奶油纸、更大的字号、更松的行距、一个浓郁的氧化血红主色用得更放得开——把报告当成一本被设计过的书来读。",
    code:
      "代码像技术书页：奶油 code surface、更从容的行距，氧化血红承载结构，风险红只给真正警示。",
    image:
      "配图像出版物插图：暖色摄影、精修截图、手稿 / 笔记、低饱和 editorial illustration；拒绝冷蓝 SaaS stock 和炫技 3D。",
    raw:
      "Raw 像文章内插图：分栏示意、温暖信息图、轻柔切换、留白更足；避免营销 hero、玻璃拟态和仪表盘大屏。",
    swatches: [
      { token: "纸", value: "#fbf7ee" },
      { token: "墨", value: "#211e18" },
      { token: "主色", value: "#7b1e22" },
      { token: "警示", value: "#c23a1e" },
    ],
  },
  {
    name: "shannon",
    label: "Shannon · 工程暗色",
    blurb:
      "Claude Shannon / 暗色工程证据。tufte 的夜间工程版——温暖石墨暗底、暖白墨、唯一一束琥珀信号色，等宽体被刻意抬升。完整继承 data-ink 纪律，面向故障复盘、系统设计、基准测试与技术 / AI 解释。非纯黑、无霓虹、无发光。",
    code:
      "代码是暗底第一公民但仍是工程证据：暗纸轻 surface、暗发丝线、退后的行号，Prism token 从琥珀 / 风险红橙 / 低饱和绿派生。",
    image:
      "配图像仪表读数或工程证据：监控图 / 火焰图 / trace、终端截图、暗底数据可视化；拒绝赛博霓虹 hero、3D 图标、粒子背景。",
    raw:
      "Raw 像暗底手绘仪表小图：内联 SVG、时序 / 火焰图、可拖阈值线、mono 标注、终端状态条；少填充、无发光、无玻璃拟态。",
    swatches: [
      { token: "暗纸", value: "#1a1916" },
      { token: "墨", value: "#e8e4d8" },
      { token: "信号", value: "#e0a73e" },
      { token: "警示", value: "#e2614a" },
    ],
  },
  {
    name: "vignelli",
    label: "Vignelli · 瑞士",
    blurb:
      "Massimo Vignelli / 瑞士国际主义。唯一的 sans 正文 + 冷中性主题：冷中性纸、一个 grotesque 字族靠字号建立层级、发丝网格线、一抹瑞士红、等宽体承载元数据。面向产品文档、技术规格、changelog、SDK / API 与 AI 工具文档。",
    code:
      "代码像排版严谨的技术规格：冷纸浅 surface、发丝线、克制行号，Prism token 从瑞士红 / 风险深红 / 绿派生。",
    image:
      "配图像系统文档图示：裁净 chrome 的界面截图、信息图 / 流程图 / 网格示意、图标系统说明；拒绝紫粉渐变 hero 与 3D 图标。",
    raw:
      "Raw 像按网格设计的文档插图：网格示意、流程 / 状态图、规格对照、mono 标注 SVG；强网格、无左边框卡、无 Tailwind 默认味。",
    swatches: [
      { token: "纸", value: "#f6f7f8" },
      { token: "墨", value: "#1a1c1e" },
      { token: "主色", value: "#d6201f" },
      { token: "警示", value: "#9e1410" },
    ],
  },
  {
    name: "knuth",
    label: "Knuth · 学术",
    blurb:
      "Donald Knuth / 学术预印本。给报告穿上期刊 / arXiv 的外衣：Computer Modern 衬线、编号小节、图 / 表 / 公式编号、两端对齐、引用密集、公式优先。与 tufte 的随笔式边注分明——这是读一篇正式论文。面向科研写作、文献综述、白皮书。",
    code:
      "代码像专著里的代码清单：浅纸 surface、发丝线、从容退后的行号，Prism token 从学术蓝 / 风险红 / 绿派生。",
    image:
      "配图像论文图版：数据 / 实验结果图、示意 / 架构图、表格、低饱和摄影，每张配 Figure N. 题注；拒绝 stock hero、3D 与渐变。",
    raw:
      "Raw 像论文里亲手排的 Figure：函数曲线 / 推导示意、定理结构图、带编号题注的图版；克制留白、学术蓝结构线、无装饰动效。",
    swatches: [
      { token: "纸", value: "#fcfcfa" },
      { token: "墨", value: "#1a1a18" },
      { token: "主色", value: "#34507e" },
      { token: "警示", value: "#9a2d1e" },
    ],
  },
  {
    name: "freddie",
    label: "Freddie · 暖黄",
    blurb:
      "Mailchimp / 温暖人文派。纯白纸、近黑 Peppercorn 墨，Cavendish 明黄只作荧光笔——黑字荧光链接、略歪的黄色贴纸章节号、黄底 callout。俏皮柔和的 Fraunces 衬线标题压在干净的 Hanken grotesque 正文上，适度圆角、一丝回弹。机灵、亲切，专业但不端着。面向产品介绍、上手指南、功能解释与 FAQ。",
    code:
      "代码像友好的代码片段：暖浅 surface、发丝线、适度圆角，Prism token 从墨色 / 暖红 / 绿派生——黄只作 highlight，不当语法色。",
    image:
      "配图像 Mailchimp 式友好插图：精修产品截图、温暖摄影、scruffy 手绘、带人物的配图；强调用黄色块，拒绝紫粉冷渐变与 3D 图标。",
    raw:
      "Raw 像带手作感的产品说明图：步骤 / 流程图、带黄 highlight 的标注、友好小数据图、可点开 FAQ；黑 / 白 / 黄三色、适度圆角、一丝回弹。",
    swatches: [
      { token: "纸", value: "#ffffff" },
      { token: "墨", value: "#241c15" },
      { token: "明黄", value: "#ffe01b" },
      { token: "警示", value: "#c63d1a" },
    ],
  },
  {
    name: "andy",
    label: "Andy · 静谧",
    blurb:
      "Headspace / 温暖人文派。暖奶油纸、友好南瓜橙、暖灰墨，通体圆体（Quicksand + Nunito）。七套里唯一同时用大圆角 + 柔和暖阴影：圆圈章节号、枕头式 callout、柔软引用与结语面板。平缓略慢的动效，大留白，治愈系。面向健康 / 心理 / 生活方式、引导式教程与温柔安抚。",
    code:
      "代码像友好 App 文档里的代码卡片：暖桃 surface、大圆角、极轻阴影，Prism token 从加深橙 / 红 / 绿派生，绝不用冷硬终端。",
    image:
      "配图像 Headspace 式插画：圆润吉祥物 / blob、暖色生活摄影、暖橙柔和渐变、圆角友好图标；低饱和柔和，拒绝冷蓝 stock 与硬边几何。",
    raw:
      "Raw 像柔软圆润的插图：圆角步骤卡、呼吸 / 进度动画、圆形数据图、温柔问答、imperfect-circle 装饰；暖橙系、大圆角、柔阴影、平缓动效。",
    swatches: [
      { token: "奶油", value: "#fff7ef" },
      { token: "墨", value: "#2a2420" },
      { token: "南瓜橙", value: "#ff7e1d" },
      { token: "友好蓝", value: "#3d83cc" },
    ],
  },
  {
    name: "bodoni",
    label: "Bodoni · 报刊",
    blurb:
      "Giambattista Bodoni / 印刷殿堂派。纯白纸、真黑墨、发丝栏线，极端粗细对比的 Playfair Display 刊头大字压在从容老式衬线正文上。识别度来自印刷惯例——刊头粗细双线、真正的首字下沉、小型大写导语、栏线分节、居中铅字抽言——颜色几乎只留给风险。冷峻、戏剧、权威。面向宣言、深度特稿与有分量的长评。",
    code:
      "代码像书页里克制的代码清单：暖浅 surface、发丝线、无圆角无暗窗，Prism token 从墨色 / 暖编辑红 / 低饱和绿派生，不彩虹。",
    image:
      "配图像大报 / 时装刊图版：黑白或低饱和摄影、高质感人像 / 静物、单色信息图、版画质感；果断留白、可满版，慎用一抹编辑红，拒绝彩色 SaaS hero 与 3D。",
    raw:
      "Raw 像版面里亲手排的图版或抽言：黑白数据 / 折线图、版式抽言、时间线、对照栏、刊头式标题块；发丝线 + 黑白 + 大字 Didone，几乎不填色、无圆角无阴影。",
    swatches: [
      { token: "纸", value: "#fdfdfb" },
      { token: "墨", value: "#0a0908" },
      { token: "结构", value: "#0a0908" },
      { token: "风险", value: "#9c1421" },
    ],
  },
  {
    name: "bayer",
    label: "Bayer · 包豪斯",
    blurb:
      "Herbert Bayer / 包豪斯构成主义。暖纸、近黑墨，三原色（红 / 蓝 / 黄）当结构色而非装饰：蓝色实心圆里的章节数字、红黄蓝三色刊头条、小写无衬线导语、黄底原则块、硬边方块。几何无衬线（Josefin + Poppins）。响亮但有纪律。面向教学科普、产品介绍与品牌叙事。",
    code:
      "代码像构成主义文档的代码块：暖浅 surface、发丝线、无圆角，Prism token 标签 / 函数走蓝、关键字走红、字符串走绿——黄只作高亮块，不当语法色。",
    image:
      "配图像包豪斯海报：几何构成插画、原色海报、强对比黑白 / 原色摄影、网格与圆方三角示意；强网格、果断留白、原色块面，拒绝紫粉冷渐变与 3D。",
    raw:
      "Raw 像一页构成主义信息图：几何流程图、圆 / 方 / 三角构成、原色柱状 / 比例图、带蓝圆编号的步骤；强网格、硬边、三色 + 黑白、圆形点睛，无圆角矩形卡。",
    swatches: [
      { token: "纸", value: "#f4f0e6" },
      { token: "墨", value: "#100f0c" },
      { token: "蓝", value: "#1f49c0" },
      { token: "黄", value: "#ffce1f" },
    ],
  },
  {
    name: "fuller",
    label: "Fuller · 蓝图",
    blurb:
      "Buckminster Fuller / 工程制图。深蓝图底、青白墨、一束制图青，外加淡淡方格网。识别度来自绘图板——方格纸上的标题块 Hero、等宽尺寸标注、虚线标注分节、青色发丝线、点划下划线。是 Shannon 暖琥珀终端的冷色对位：同为暗底，气质是制图桌而非命令行。面向规格、系统设计、架构与 RFC。",
    code:
      "代码是暗底第一公民但仍是工程文档：暗面板 surface、暗青发丝线、退后的 mono 行号，Prism token 从青 / 风险橙 / 薄荷绿派生；无圆角、无发光、不彩虹。",
    image:
      "配图像工程图纸 / 蓝晒图 / CAD：线框 / 结构 / 拓扑图、尺寸标注、暗底数据可视化；以线为主、青色描边、可叠网格，风险用暖橙点睛，拒绝霓虹赛博 hero 与暖色生活照。",
    raw:
      "Raw 像图纸上亲手画的标注：线框 / 拓扑 / 时序图、带尺寸线的标注、方格纸坐标、等宽数据表；青发丝线 + 等宽标注 + 可叠方格，暗面板、无发光、无圆角。",
    swatches: [
      { token: "蓝图底", value: "#213749" },
      { token: "墨", value: "#eef3f7" },
      { token: "制图青", value: "#79c2d0" },
      { token: "风险", value: "#eda06a" },
    ],
  },
  {
    name: "sottsass",
    label: "Sottsass · 孟菲斯",
    blurb:
      "Ettore Sottsass / 后现代孟菲斯（米兰 1981）。暖奶油纸、黑墨，故意撞色的粉彩（艳粉 / 青绿 / 阳光黄 / 钴蓝）。识别度来自 80s 游戏感——无模糊硬投影、轻微旋转、圆角彩色药丸、波浪下划线、几何彩屑。钴蓝做可读结构，粉青黄是大胆填充。响亮欢快但仍可读。面向好玩的科普、设计 / 文化写作与发布稿。",
    code:
      "代码像潮流杂志的代码卡片：暖浅 surface + 黑边 + 适度圆角、可有硬投影，Prism token 标签 / 函数走钴蓝、关键字走红玫、字符串走青；撞色在边框 / 高亮，不在语法色彩虹。",
    image:
      "配图像孟菲斯海报：几何彩屑插画、撞色海报、波纹 / 水磨石纹理、硬投影拼贴；大胆撞色、可旋转 / 不对称、黑描边 + 硬投影，拒绝柔光渐变、霓虹与 3D。",
    raw:
      "Raw 像孟菲斯海报式图解：硬投影卡片、撞色几何图、彩屑 / 波纹装饰、旋转标签、明快比例 / 步骤图；黑描边 + 偏移硬投影 + 撞色 + 混合圆角，带回弹动效，可读小字与链接走钴蓝。",
    swatches: [
      { token: "奶油", value: "#fcf7ef" },
      { token: "钴蓝", value: "#2c54e0" },
      { token: "艳粉", value: "#ff5d9e" },
      { token: "青绿", value: "#18c2bf" },
    ],
  },
];

const TOKENS = `:root {
  /* 组件只允许引用这些 --ra-* 变量，从不硬编码 */
  --ra-color-bg: #fbfaf6;     /* 暖纸底色 */
  --ra-color-text: #1b1b1a;   /* 墨色正文 */
  --ra-color-accent: #3e4a5c; /* 青灰：结构色 */
  --ra-color-risk: #a6300e;   /* 暖红：仅承载含义 */
  --ra-font-body: Georgia, "Songti SC", serif;
  --ra-radius-md: 0;          /* Tufte：无圆角 */
  --ra-shadow-md: none;       /* Tufte：无阴影 */
}`;

const ADD = `// 1. 新增 src/theme/themes/<name>/<name>.css，只覆盖需要变化的 --ra-* 变量
// 2. 新增 <name>.md，写清代码与公式风格 / 媒体风格 / Raw 自由层风格
// 3. 在 theme/index.css import 它
// 4. 在 ThemeProvider 注册 THEMES 与 THEME_LABELS
export const THEMES = ["tufte", "press", "<name>"] as const;`;

export function ThemingPage() {
  // 指南 is theme-independent from the global system, so this page demos themes
  // through its own local switcher rather than the (now components-only) top bar.
  const [theme, setTheme] = useState<ThemeName>(DEFAULT_THEME);
  return (
    <>
      <div className="page-head">
        <span className="kicker">主题系统</span>
        <h1>主题契约</h1>
        <p>
          主题属于组件库。组件只消费 <code className="inline">--ra-*</code>{" "}
          token，作者只挑一个主题、从不写样式——视觉表达完全由主题掌控。
        </p>
      </div>

      <div className="prose">
        <h2 className="anchor" id="contract">
          Token 契约
        </h2>
        <p>
          所有可调项都收敛到 <code className="inline">--ra-*</code> 变量，作为主题与
          组件之间的唯一契约。组件从不硬编码颜色、间距或字体。
        </p>
        <CodeBlock lang="css" code={TOKENS} />

        <h2 className="anchor" id="themes">
          内置主题
        </h2>
        <p>
          目前内置十一套主题，共享同一套组件解剖，仅以 <code className="inline">--ra-*</code>{" "}
          的取值区分气质。下方<b>实时效果</b>里的切换按钮可即时重渲染预览。
        </p>
        <div className="theme-cards">
          {BUILT_IN.map((t) => (
            <div
              className="theme-card"
              key={t.name}
              data-active={theme === t.name}
            >
              <div className="theme-card__head">
                <span className="theme-card__name mono">{t.label}</span>
                {theme === t.name ? (
                  <span className="theme-card__live mono">当前</span>
                ) : null}
              </div>
              <div className="theme-card__swatches">
                {t.swatches.map((s) => (
                  <span className="theme-card__swatch" key={s.token}>
                    <i style={{ background: s.value }} aria-hidden="true" />
                    {s.token}
                  </span>
                ))}
              </div>
              <p>{t.blurb}</p>
            </div>
          ))}
        </div>

        <h2 className="anchor" id="taste">
          生成风格契约
        </h2>
        <p>
          主题还约束 AI 最容易自由发挥的两处：文章媒体与{" "}
          <code className="inline">Raw</code>。新增主题的 md 文件必须写清代码、
          媒体和 Raw 的风格边界，AI authoring 时先读主题 md，再决定素材与自定义代码。
        </p>
        <div className="theme-cards theme-cards--taste">
          {BUILT_IN.map((t) => (
            <div className="theme-card" key={`${t.name}-taste`}>
              <div className="theme-card__head">
                <span className="theme-card__name mono">{t.label}</span>
              </div>
              <p>
                <b>代码：</b>
                {t.code}
              </p>
              <p>
                <b>配图：</b>
                {t.image}
              </p>
              <p>
                <b>Raw：</b>
                {t.raw}
              </p>
            </div>
          ))}
        </div>

        <h2 className="anchor" id="live">
          实时效果
        </h2>
        <p>
          下面是<b>{THEME_LABELS[theme]}</b>下的真实组件渲染——用预览右上角的按钮切换主题，
          这里会立即跟随：
        </p>
        <div className="preview">
          <div className="preview__bar">
            <span className="preview__dot" aria-hidden="true" />
            <span className="preview__name">{THEME_LABELS[theme]}</span>
            <span className="preview__semantic">真实组件渲染</span>
            <div
              className="modeswitch"
              role="group"
              aria-label="切换预览主题"
              style={{ marginLeft: "auto" }}
            >
              {THEMES.map((t) => (
                <button
                  key={t}
                  data-active={theme === t}
                  onClick={() => setTheme(t)}
                  aria-pressed={theme === t}
                  title={THEME_LABELS[t]}
                >
                  {THEME_LABELS[t].split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
          <div className="preview__stage">
            <ThemeProvider theme={theme}>
              <Article>
                <Hero
                  eyebrow="主题预览"
                  title="同一篇文章，两种气质"
                  subtitle="以线代框，直接强调，主题只换 token"
                />
                <Section index="01" title="判断">
                  <Aside tone="principle" label="主题原则">
                    去掉图表垃圾后，论点与证据才是主角；主题只换 token，不改组件解剖。
                  </Aside>
                </Section>
              </Article>
            </ThemeProvider>
          </div>
        </div>

        <h2 className="anchor" id="add">
          新增一套主题
        </h2>
        <p>新增主题只动主题层，绝不触碰任何组件代码：</p>
        <CodeBlock code={ADD} />
        <p>
          随后在 Gallery 为它配一篇风格契合的样例文章，至少验证一处 Image /
          Video / Audio 和一处 Raw，再在本页补一段主题说明即可。
        </p>
      </div>
    </>
  );
}
