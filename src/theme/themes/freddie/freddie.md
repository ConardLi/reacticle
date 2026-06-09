# Freddie · 暖黄 / 友善（Mailchimp Cavendish Yellow）

> 流派：温暖人文派（Warm humanist） · 参照：Mailchimp（Collins 2018 rebrand、吉祥物 Freddie、Cavendish Yellow #FFE01B、Peppercorn #241C15）、Cooper Oldstyle / Means 衬线、Graphik grotesque

这是 ReActicle 的**暖白 + 明黄、机灵而有人味**的主题，面向**轻松但仍专业**的解释与叙事。它继承结构纪律——以线代框、去垃圾表格、色彩承载含义——但把气质换成 Mailchimp 式的**黑墨配荧光黄**：纯白纸、近黑 Peppercorn 墨、Cavendish 明黄只作**荧光笔 / 色块**（绝不作正文或链接文字色，黄字不可读），配一套俏皮柔和的衬线标题（Fraunces，仿 Cooper / Means）与干净的 grotesque 正文（Hanken，仿 Graphik）。

与同为暖调的 `press` 分明：`press` 是氧化血红的衬线书卷、无圆角；`freddie` 是**黄 + 黑 + 适度圆角**的双声部（衬线标题 + 无衬线正文），更跳脱、更亲切。协议级禁用斜体，本主题同样遵守。

## 适用场景

- 产品介绍、上手指南、changelog 叙事、功能解释、FAQ、营销味但不浮夸的长文。
- 面向普通用户、需要亲和力与人情味的解释型内容。
- 希望"专业但不端着"、带一点幽默与温度的写作。

## 不适用场景

- 正式学术论文（`knuth`）、冷调系统规格（`vignelli`）。
- 暗底工程现场（`shannon`）、极密集数据报告（`tufte`）。
- 需要 10 米外观看的演示幻灯片。

## 调色板

| 角色 | 取值 | 说明 |
| --- | --- | --- |
| 纸张底色 | `#FFFFFF` | 纯白，Mailchimp 的底 |
| surface / surface-2 | `#F7F4EC` / `#EFE9DA` | 暖浅灰抬升（代码 / 表头） |
| 墨色正文 | `#2C241C` | 暖近黑 |
| 标题 | `#1D160F` | 更深 Peppercorn |
| **Cavendish 明黄** | `#FFE01B`（`--mc-yellow`） | **只作荧光笔 / 色块**：贴纸章节号、链接高亮、callout 底、强调；绝不作文字色 |
| 结构 / 链接墨色（accent） | `#241C15` | accent 故意是可读墨色，保证所有默认文字用法清晰；黄由 `--mc-yellow` 承载 |
| 警示红（risk） | `#C63D1A` | soft `#F8DDD2` |
| 成功绿（success） | `#2F7D4F` | soft `#DCEFE2` |
| 参考线 | `#E7DFCE` / 强 `#D6CCB4` | 暖发丝线 |

关键约定：**accent 是墨、黄是荧光**。链接是"黑字 + 黄色荧光笔"，hover 时整条黄块填满；章节号是"黑字 + 黄色贴纸"（略微旋转）。这是 Mailchimp 识别度的来源，也避免了黄字不可读。

## 字体排印

- **标题**：Fraunces（可变字体，启用 `SOFT` / `WONK` 轴）→ 仿 Cooper Oldstyle / Means 的柔软与俏皮；回退 Georgia / Songti SC。
- **正文 / 标签**：Hanken Grotesk → 仿 Graphik 的干净中性；回退 Inter / Helvetica Neue / PingFang SC。
- **元数据 / 代码**：JetBrains Mono。
- 正文约 17px，行距 1.65（从容亲和）；标题分量由 `--ra-weight-display: 600` + 柔轴承载，不靠超粗。

## 间距与形状

- 适度友好的圆角（`6 / 10 / 16 / 22`px）——这是品牌签名，不是 slop。
- 阴影：无（保持平整，让黄色做工作）。
- 动效：一丝回弹（`cubic-bezier(0.34,1.4,0.5,1)`，180ms），俏皮但不滑稽。

## 标志性手法

- **荧光笔链接**：黑字 + 黄色 highlight，hover 时黄块从下往上填满整行。
- **贴纸章节号**：黑字嵌在黄色圆角块里，略 `rotate(-3deg)`，像手贴的邮票 / 标签（呼应 Mailchimp 的邮政血统）。
- **黄色 callout**：`Aside` 默认（note / principle）是黑边 + 黄底的圆角块；warning 转红、capability 转绿。
- **双声部排版**：柔软衬线标题压在干净 grotesque 正文之上，形成温度与可读性的对比。

## 代码与公式风格

代码像产品文档里友好的代码片段，而不是炫技 IDE 截图。

- 背景用暖浅 code surface + 发丝线 + 适度圆角；不使用暗色编辑器窗口。
- Prism token 从主题派生：标签 / 函数走墨色或暖红，关键字用 risk 红，字符串用绿；**不要把黄当语法色**（黄只作 highlight）。
- `Formula` 像正文里的友好标注：克制、对齐，可有极淡的圆角 surface。
- **禁止**：彩虹语法主题、霓虹、把黄色当正文 / 语法色、Tailwind 默认味。

## 媒体风格

媒体像 Mailchimp 风的友好插图与界面截图：温暖、有人味、略带手作感。

- 适合：精修产品截图、温暖摄影、手绘 / scruffy 风插画、流程示意、带人物的友好配图。
- 构图：留白舒展、主体清楚、可有一点点不规整的人情味；caption 简洁。
- 色彩：贴近黑 / 白 / 黄体系；强调用黄色块承载，不引入紫粉冷渐变。
- **禁止**：紫粉 SaaS hero、3D 渲染图标、廉价渐变背景、把 emoji 当图标。

## Raw 自由层风格

Raw 在 `freddie` 里应像一页友好、带手作感的产品说明插图。

- 首选：流程 / 步骤图、对比示意、带黄色 highlight 的标注、友好的小数据图、可点开的 FAQ。
- 构图：舒展留白、黑 / 黄 / 白三色、适度圆角；填色可比 tufte 多，但黄只作强调。
- 动效：允许短促、带一丝回弹的过渡；避免无限循环装饰。
- 代码：自定义 CSS / SVG / React 仍必须使用 `--ra-*`（黄用 `--mc-yellow`）；不引入冷品牌色或紫粉渐变。
- **禁止**：营销落地页 hero 套路、玻璃拟态、浮动光球、仪表盘大屏拟物。

## 反模式（本主题禁止）

- 把 Cavendish 黄当文字 / 链接 / 语法色（不可读，且破坏"黑字荧光"的识别）。
- 紫粉渐变、霓虹、Tailwind 默认审美、把 emoji / 图标当装饰。
- 过度圆角 + 大投影的卡片堆叠（那是 `andy` 的柔软领域，不是这里的俏皮）。
- 用斜体强调（协议级禁用）。

## 实现说明

- 定义在 `freddie.css`，通过根节点 `data-theme="freddie"` 激活。
- 所有取值以 `--ra-*` token 暴露；黄色签名色用主题局部变量 `--mc-yellow` / `--mc-yellow-strong`，只在主题 scoped 解剖里使用，组件不感知。
- Fraunces 为可变字体，未加载时回退 Georgia / Songti SC 仍是暖衬线气质；`SOFT` / `WONK` 轴在 `apps/site/index.html` 的字体请求里启用。
- `accent` 故意是可读墨色而非黄色——保证 Summary 序号、链接、TOC 等默认文字用法在白底上始终清晰。
