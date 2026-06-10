# ReActicle

![ReActicle banner](./public/img/banner.jpeg)

> **AI 时代的 HTML 文章协议** — 让 AI 不再手写裸 HTML，而是用一套受限、语义化的 React 组件契约，生成稳定、漂亮、可交互、自包含的 HTML 文章与报告。

[English](./README.md) · [GitHub](https://github.com/ConardLi/reacticle) · [npm 包](https://www.npmjs.com/package/reacticle) · [配套 Skill：`beautiful-article`](https://github.com/ConardLi/garden-skills)

<p align="left">
  <a href="https://www.npmjs.com/package/reacticle"><img src="https://img.shields.io/npm/v/reacticle.svg?color=111&labelColor=555" alt="npm version"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-111?labelColor=555" alt="MIT"></a>
  <img src="https://img.shields.io/badge/react-%5E18.3-111?labelColor=555" alt="React 18">
  <img src="https://img.shields.io/badge/themes-11-111?labelColor=555" alt="11 themes">
</p>

---

## 为什么需要 ReActicle

Markdown 让**人类**写长文变得轻量；ReActicle 让 **AI** 生成长文变得可控。

当 AI Agent 要落地一篇长文 —— 调研笔记、事故复盘、上手教程、视觉随笔 —— 让它自由手写 HTML / CSS 是注定要输的：主题漂移、版式破碎、AI 味、不知不觉跑成网页应用。ReActicle 把这个面替换成一组小而 prose-first 的语义组件 + 一个独一无二的逃生通道（`<Raw>`），全部架在 token 化的主题系统之上。

最终产出的 HTML 文章具备：

- **稳定** —— Agent 只组合组件，结构与排版由库本身保证。
- **美感** —— 每套主题都是一份编辑级的设计系统，不是配色替换。
- **一致** —— `Raw` 可写任意 HTML / SVG / CSS / React，但**必须用 `--ra-*` 主题 token**。换主题，所有 Raw 同步切换。
- **自包含** —— 生成单文件 HTML，CSS / JS 全部内联，断网可开，作为文件分享。
- **适合 AI 写作** —— 每套主题都附带一份 Markdown *authoring profile*，Agent 写之前先读。**主题是契约，不是样式表**。

> Markdown 让人类写作轻盈，ReActicle 让 AI 写作可控。

---

## 与 `beautiful-article` Skill 的搭配

ReActicle 是**运行时的组件协议**，它**不**规定编辑流程 —— 那部分被独立成一个面向 AI Agent 的 Skill：[`beautiful-article`](https://github.com/ConardLi/garden-skills)，是端到端使用 ReActicle 的推荐方式。

```
┌──────────────────────────────────────────────────────────┐
│ beautiful-article  （AI Agent Skill · 方法论 + 协作 harness）│
│   Source → Plan → Build → Review → Repair → Deliver      │
│   硬 checkpoint · 按 Section 派 sub-agent · 主题选择器        │
└─────────────────────────┬────────────────────────────────┘
                          │  组合
                          ▼
┌──────────────────────────────────────────────────────────┐
│ reacticle  （本仓库 · npm 包）                              │
│   组件 · 主题 · ThemeProvider · Raw · Export 工具            │
└──────────────────────────────────────────────────────────┘
```

| 层 | 它干什么 | 在哪里 |
|---|---|---|
| `beautiful-article` Skill | 告诉 Agent **怎么**从任意素材（URL / PDF / DOCX / Markdown / 文本）规划、写作、审阅、交付一篇文章。6 个有编号的 phase、3 个硬 checkpoint、主题选择器、sub-agent 评审 | [`ConardLi/garden-skills`](https://github.com/ConardLi/garden-skills) |
| `reacticle`（本仓库） | Skill 最终编译到的组件协议：结构、观点、媒体、决策、技术、交互组件，以及 `Raw` 自由层，全部架在 token 化主题之上 | 本仓库 · npm `reacticle` |

两者**可以独立使用**：Skill 之所以好用是因为它有 ReActicle 这套底，ReActicle 自己也是一个能直接用的 React 库。但搭配在一起会非常顺手。

---

## 项目亮点

- **一个 npm 包，一组组件。** 唯一公共入口（`reacticle`），无子模块路径、无插件安装。
- **11 套编辑级主题。** 从 Tufte / Stripe Press 的密集长文，到 Bayer / Vignelli / Sottsass 的海报式编辑，再到 Knuth / Shannon 的技术出版风。每套主题既是 CSS token 包，也是一份 Markdown 契约。
- **Prose-first 组件。** `Article`, `Hero`, `Lead`, `Section`, `Subsection`, `Summary`, `Aside`, `Quote`, `Table`, `Image`, `Video`, `Audio`, `Formula`, `CodeBlock`, `DiffReview`, `RiskList`, `Decision`, `ActionList`, `Checkpoint`, `Tradeoff`, `Incident`, `Detail`, `Tabs`, `TOC`, `Conclusion`, `Raw`。
- **`Raw` 自由层 —— 但有约束。** Raw 里可以写任意 HTML / SVG / CSS / React，但**必须使用 `--ra-*` 主题 token**。换主题时所有 Raw 一处切换。
- **自包含构建。** Vite + `vite-plugin-singlefile` 生成单文件 HTML，CSS / JS 全内联 —— 断网可开、作为文件分享、可直接打印 PDF。
- **为 AI 写作而设计。** 每个主题目录都附带 `<theme>.md`，告诉 Agent 用什么照片、什么代码风格、什么 Raw 套路，以及**反模式**。
- **Editorial Console 文档站。** `apps/site` 把文档、组件 live 参考与 Gallery 合并成一个应用，本身完全用 ReActicle 写成。

---

## 文档

完整的开发与写作文档都在官方文档站 —— **<https://rearticle.mmh1.top/>**。README 只放介绍，其余教程一律去文档站。

| 类别 | 页面 | 内容 |
| --- | --- | --- |
| **入门** | [开始使用](https://rearticle.mmh1.top/#/start) | 安装、最小骨架、构建与导出、缺失即可见 UX |
| **主题** | [主题契约](https://rearticle.mmh1.top/#/theming) | `--ra-*` token 系统 · 主题为何是 `.css` + `.md` 双产物 · 如何新增主题 |
| **写作** | [Raw 自由层守则](https://rearticle.mmh1.top/#/raw) | 何时该上 `<Raw>`、token 契约、反模式与提交前检查 |
| | [导出与分发](https://rearticle.mmh1.top/#/export) | `ExportBar`、PDF / 单文件 HTML、`actionItemsToMarkdown` / `decisionToPrompt` |
| | [写作配方](https://rearticle.mmh1.top/#/recipes) | 事故复盘、规格、随笔、解释文、决策、数学、Raw 交互的骨架代码 |
| | [Markdown 迁移](https://rearticle.mmh1.top/#/markdown) | Markdown ↔ ReActicle 一对一映射表 |
| **协作** | [与 Skill 集成](https://rearticle.mmh1.top/#/skill) | 与 `beautiful-article` Skill 的搭配（Source → Plan → Build → Review → Repair → Deliver） |
| **参考** | [组件清单](https://rearticle.mmh1.top/#/components) | 每个组件：live 预览 + 属性表 + 可复制代码 |
| | [主题图册](https://rearticle.mmh1.top/#/gallery) | 每个主题一篇示范长文 |
| **工程** | [架构](https://rearticle.mmh1.top/#/architecture) | 工程边界、依赖原则、单文件构建 |
| | [贡献指南](https://rearticle.mmh1.top/#/contributing) | 新增组件 / 主题 / Gallery 条目的 PR 检查清单 |
| **答疑** | [FAQ](https://rearticle.mmh1.top/#/faq) | 概念、Raw、导出、缺失字段、安装、ReActicle 与邻居们的对比 |

---

## [作品展示](https://mmh1.top/#/ai-article) —— 用 ReActicle + `beautiful-article` 写出来的文章

下面是真实的长文，每一篇都是 AI Agent 跑 [`beautiful-article`](https://github.com/ConardLi/garden-skills) Skill、以 ReActicle 为组件协议端到端生成的。点封面进入 live 单文件 HTML。

<table>
<tr>
<td width="50%" valign="top" align="center">
<a href="https://mmh1.top/#/ai-article/tools">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/tools.webp" alt="Agent Tools 设计的最佳实践" width="320">
<br><b>Agent Tools 设计的最佳实践</b>
</a>
<br><sub>主题 · Freddie · 长文 · 21 min</sub>
<br><sup>Anthropic 工程团队关于 Tools 的五条原则，与一套评测驱动的方法。</sup>
</td>
<td width="50%" valign="top" align="center">
<a href="https://mmh1.top/#/ai-article/skill">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/skill.webp" alt="Agent Skill 是如何进化的？" width="320">
<br><b>Agent Skill 是如何进化的？</b>
</a>
<br><sub>主题 · Freddie · 解释文 · 8 min</sub>
<br><sup>把 Skill 文档当成被训练的对象，而不是被复制粘贴的 prompt。</sup>
</td>
</tr>
<tr>
<td width="50%" valign="top" align="center">
<a href="https://mmh1.top/#/ai-article/harness">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/harness.webp" alt="Agent Harness 的解剖图" width="320">
<br><b>Agent Harness 的解剖图</b>
</a>
<br><sub>主题 · Vignelli · 长文 · 12 min</sub>
<br><sup>智能在模型里；让智能变得有用的，是它周围的那套系统。</sup>
</td>
<td width="50%" valign="top" align="center">
<a href="https://mmh1.top/#/ai-article/prompt-cache">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/prompt-cache.webp" alt="提示词缓存对 Agent 有多重要？" width="320">
<br><b>提示词缓存对 Agent 有多重要？</b>
</a>
<br><sub>主题 · Bayer · 长文 · 15 min</sub>
<br><sup>缓存命中率是 Agent 的 SLO，Claude Code 团队的反直觉经验。</sup>
</td>
</tr>
<tr>
<td width="50%" valign="top" align="center">
<a href="https://mmh1.top/#/ai-article/context">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/context.webp" alt="面向 Agent 的高效上下文工程" width="320">
<br><b>面向 Agent 的高效上下文工程</b>
</a>
<br><sub>主题 · Tufte · 长文 · 16 min</sub>
<br><sup>本文探讨如何高效地筛选与管理驱动 AI Agent 运转的上下文。</sup>
</td>
<td width="50%" valign="top" align="center">
<a href="https://mmh1.top/#/ai-article/transformer">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/transformer.webp" alt="Attention Is All You Need" width="320">
<br><b>Attention Is All You Need</b>
</a>
<br><sub>主题 · Tufte · 长文 · 30 min</sub>
<br><sup>一篇重塑现代 AI 的论文，逐层拆给你看。</sup>
</td>
</tr>
<tr>
<td width="50%" valign="top" align="center">
<a href="https://mmh1.top/#/ai-article/agent-eval">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/agent-eval.webp" alt="把 AI Agent 的评测讲清楚" width="320">
<br><b>把 AI Agent 的评测讲清楚</b>
</a>
<br><sub>主题 · Tufte · 长文 · 25 min</sub>
<br><sup>让 Agent 有用的那些能力，恰恰让它难以评测 —— 一份来自 Anthropic 的指南。</sup>
</td>
<td width="50%" valign="top" align="center">
<a href="https://mmh1.top/#/ai-article/agent-loop-codex">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/agent-loop-codex.webp" alt="Codex 的 Agent Loop 是怎么做的？" width="320">
<br><b>Codex 的 Agent Loop 是怎么做的？</b>
</a>
<br><sub>主题 · Sottsass · 长文 · 18 min</sub>
<br><sup>OpenAI 官方分享：在 Responses API 之上，一条对话是如何被反复"展开"的。</sup>
</td>
</tr>
</table>

---

## [主题图册](https://rearticle.mmh1.top/#/gallery) —— 每个主题一篇示范长文

> 11 套主题，每套都是一份完整编辑系统。完整的主题契约（`.css` token 包 + `.md` authoring profile、反模式、代码 / 媒体风格）见 [Theming](https://rearticle.mmh1.top/#/theming)。

每套主题都附带一篇**示范长文**，从排版、摄影、代码、公式到 Raw 自由块全部贯彻该主题人格。点封面进入 live 单文件 HTML。

<table>
<tr>
<td width="33%" valign="top" align="center">
<a href="https://rearticle.mmh1.top/#/gallery/caffeine-half-life">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/theam-tufte.webp" alt="Tufte · Data-Ink" width="260">
<br><b>Tufte</b> · Data-Ink
</a>
<br><sub>咖啡因与睡眠 · 数据笔记</sub>
<br><sup>Edward Tufte 数据墨水，证据优先，发丝级图表与最朴素的版式。</sup>
</td>
<td width="33%" valign="top" align="center">
<a href="https://rearticle.mmh1.top/#/gallery/movable-type">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/theam-press.webp" alt="Press · 书卷" width="260">
<br><b>Press</b> · 书卷
</a>
<br><sub>活字之后 · 随笔</sub>
<br><sup>Stripe Press 式书卷长读物：会落定的标题、氧化血红首字母、纯正文之美。</sup>
</td>
<td width="33%" valign="top" align="center">
<a href="https://rearticle.mmh1.top/#/gallery/pool-exhaustion">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/theam-shannon.webp" alt="Shannon · 工程暗色" width="260">
<br><b>Shannon</b> · 工程暗色
</a>
<br><sub>连接池耗尽 · 故障复盘</sub>
<br><sup>贝尔实验室技术论文血统，暗底黄金信号、回压依赖、夜间作战气质。</sup>
</td>
</tr>
<tr>
<td width="33%" valign="top" align="center">
<a href="https://rearticle.mmh1.top/#/gallery/orbit-spec">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/theam-vignelli.webp" alt="Vignelli · 瑞士" width="260">
<br><b>Vignelli</b> · 瑞士网格
</a>
<br><sub>Orbit 设计系统规格 · 规格</sub>
<br><sup>Massimo Vignelli 网格至上、grotesque 字族、瑞士红只承载结构。</sup>
</td>
<td width="33%" valign="top" align="center">
<a href="https://rearticle.mmh1.top/#/gallery/linear-attention">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/knuth.png" alt="Knuth · 学术" width="260">
<br><b>Knuth</b> · 学术
</a>
<br><sub>线性化自注意力 · 预印本</sub>
<br><sup>Donald Knuth / Computer Modern，编号小节、命题与证明、arXiv 草稿气质。</sup>
</td>
<td width="33%" valign="top" align="center">
<a href="https://rearticle.mmh1.top/#/gallery/first-newsletter">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/theam-freddie.webp" alt="Freddie · 暖黄" width="260">
<br><b>Freddie</b> · 暖黄
</a>
<br><sub>第一封 Newsletter · 上手指南</sub>
<br><sup>Mailchimp Freddie 黑字荧光，亲和插画 + 不端着的产品上手语气。</sup>
</td>
</tr>
<tr>
<td width="33%" valign="top" align="center">
<a href="https://rearticle.mmh1.top/#/gallery/slow-breathing">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/theam-andy.webp" alt="Andy · 静谧" width="260">
<br><b>Andy</b> · 静谧
</a>
<br><sub>把呼吸放慢 · 练习</sub>
<br><sup>柔软圆润、呼吸-神经跷跷板，让人慢下来的练习气质。</sup>
</td>
<td width="33%" valign="top" align="center">
<a href="https://rearticle.mmh1.top/#/gallery/front-page">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/theam-bodoni.webp" alt="Bodoni · 报刊" width="260">
<br><b>Bodoni</b> · 报刊
</a>
<br><sub>头版的消亡 · 特稿</sub>
<br><sup>高对比 Didone 报刊气质，黑白大报、对折线之上的分量。</sup>
</td>
<td width="33%" valign="top" align="center">
<a href="https://rearticle.mmh1.top/#/gallery/geometry-of-meaning">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/theam-bayer.webp" alt="Bayer · 包豪斯" width="260">
<br><b>Bayer</b> · 包豪斯
</a>
<br><sub>形、色、网格 · 教学</sub>
<br><sup>Herbert Bayer 包豪斯三原色几何，形有性格、色有重量。</sup>
</td>
</tr>
<tr>
<td width="33%" valign="top" align="center">
<a href="https://rearticle.mmh1.top/#/gallery/rate-limiter-spec">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/theam-fuller.webp" alt="Fuller · 蓝图" width="260">
<br><b>Fuller</b> · 蓝图
</a>
<br><sub>限流器设计规格 · 系统设计</sub>
<br><sup>Buckminster Fuller 工程蓝图，方格纸拓扑、令牌桶模拟，可照着实现。</sup>
</td>
<td width="33%" valign="top" align="center">
<a href="https://rearticle.mmh1.top/#/gallery/color-clash">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/theam-sottsass.webp" alt="Sottsass · 孟菲斯" width="260">
<br><b>Sottsass</b> · 孟菲斯
</a>
<br><sub>撞色不翻车 · 设计随笔</sub>
<br><sup>Memphis 80s 撞色，黑描边、硬投影、轻微旋转的不正经语法。</sup>
</td>
<td width="33%" valign="top" align="center">
&nbsp;
</td>
</tr>
</table>

> 在线图册（支持主题切换、搜索与过滤）：<https://rearticle.mmh1.top/#/gallery>。

---

## 什么时候**不**该用 ReActicle

- 你要做的是网页应用 / dashboard / 表单密集型产品 / 通用 landing page —— 去用 UI kit，不要用文章协议。
- 你需要一个 CMS 风格的编辑器 —— ReActicle 是**输出**协议，不是编辑界面。
- 你只需要渲染一段 Markdown —— 那是 Markdown 该做的事。

ReActicle 适合**当交付物本身就是那篇 HTML 长文**的场景，尤其是当 AI Agent 在写它。

---

## 致谢

- 组件词汇受到 Edward Tufte、Stripe Press、Pentagram、Vignelli、Bayer、Sottsass、Bucky Fuller、Donald Knuth 与贝尔实验室技术论文传统的塑造。
- AI 写作方法论以独立 Skill 形式发布：[`beautiful-article`](https://github.com/ConardLi/garden-skills)。

---

## 许可证

[MIT](./LICENSE)
