# ReActicle

![ReActicle banner](./public/img/banner.jpeg)

> **An HTML article protocol for the AI era** — instead of letting AI hand-write raw HTML, give it a constrained, semantic React component contract that produces stable, beautiful, interactive, self-contained HTML articles and reports.

[中文文档](./README.zh-CN.md) · [GitHub](https://github.com/ConardLi/reacticle) · [npm package](https://www.npmjs.com/package/reacticle) · [Companion skill: `beautiful-article`](https://github.com/ConardLi/garden-skills)

<p align="left">
  <a href="https://www.npmjs.com/package/reacticle"><img src="https://img.shields.io/npm/v/reacticle.svg?color=111&labelColor=555" alt="npm version"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-111?labelColor=555" alt="MIT"></a>
  <img src="https://img.shields.io/badge/react-%5E18.3-111?labelColor=555" alt="React 18">
  <img src="https://img.shields.io/badge/themes-11-111?labelColor=555" alt="11 themes">
</p>

---

## Why ReActicle

Markdown made it lightweight for **humans** to write long-form. ReActicle makes it controllable for **AI** to generate long-form HTML.

When an AI agent has to materialize a long article — a research note, a post-mortem, a tutorial, a visual essay — letting it free-write HTML and CSS is a losing game: theme drift, broken layout, AI smell, accidental web-app sprawl. ReActicle replaces that surface with a small, prose-first component vocabulary plus a single escape hatch (`<Raw>`), all wired into a token-based theme system.

The result is an HTML article that is:

- **Stable** — the agent only composes components; structure and typography are guaranteed by the library.
- **Beautiful** — every theme is an editorial-grade design system, not a color swap.
- **Coherent** — `Raw` can hold any HTML/SVG/CSS/React, but it must consume `--ra-*` theme tokens. Switch theme, all Raw blocks rewire.
- **Self-contained** — produces a single HTML file, CSS and JS inlined, openable offline, shareable as a file.
- **Fit for AI authoring** — every theme ships a Markdown *authoring profile* the agent reads before writing. Themes are contracts, not stylesheets.

> Markdown lightens human writing. ReActicle controls AI writing.

---

## How it pairs with the `beautiful-article` skill

ReActicle is the **runtime component protocol**. It does **not** prescribe the editorial workflow — that lives in a separate, AI-agent-targeted skill called [`beautiful-article`](https://github.com/ConardLi/garden-skills), which is the recommended way to use ReActicle end-to-end.

```
┌──────────────────────────────────────────────────────────┐
│ beautiful-article  (AI-agent skill / methodology + harness) │
│   Source → Plan → Build → Review → Repair → Deliver      │
│   Hard checkpoints · per-section sub-agents · theme picker  │
└─────────────────────────┬────────────────────────────────┘
                          │  composes
                          ▼
┌──────────────────────────────────────────────────────────┐
│ reacticle  (this repo · npm package)                     │
│   Components · Themes · ThemeProvider · Raw · Export     │
└──────────────────────────────────────────────────────────┘
```

| Layer | What it does | Where it lives |
|---|---|---|
| `beautiful-article` skill | Tells the agent **how** to plan, write, review and deliver an article from any source (URL / PDF / DOCX / Markdown / text). Six numbered phases, three hard checkpoints, theme picker, sub-agent reviewers. | [`ConardLi/garden-skills`](https://github.com/ConardLi/garden-skills) |
| `reacticle` (this repo) | The component protocol the skill compiles into: structure, insight, media, decision, technical, interaction and a `Raw` escape hatch — all on a token-based theme system. | This repo · npm `reacticle` |

You can use them independently: the skill works because it has ReActicle to target, and ReActicle is a perfectly usable React library on its own. They simply pair very, very well.

---

## Highlights

- **One npm package, many components.** A single import surface (`reacticle`) — no submodule paths, no plug-in installs.
- **11 editorial themes.** From Tufte / Stripe Press density to Bayer / Vignelli / Sottsass posters and Knuth / Shannon technical-press. Each theme is both a CSS token bundle and a Markdown contract.
- **Prose-first components.** `Article`, `Hero`, `Lead`, `Section`, `Subsection`, `Summary`, `Aside`, `Quote`, `Table`, `Image`, `Video`, `Audio`, `Formula`, `CodeBlock`, `DiffReview`, `RiskList`, `Decision`, `ActionList`, `Checkpoint`, `Tradeoff`, `Incident`, `Detail`, `Tabs`, `TOC`, `Conclusion`, `Raw`.
- **`Raw` escape hatch — under contract.** Any custom HTML / SVG / CSS / React is allowed inside `Raw`, but it **must** use `--ra-*` theme tokens. Switching theme rewires every Raw block in one place.
- **Self-contained build.** Vite + `vite-plugin-singlefile` produce one HTML file with all CSS and JS inlined — works offline, shareable as a file, printable to PDF.
- **Designed for AI authoring.** Each theme directory ships a `<theme>.md` profile telling the agent what photography, what code style, what Raw idioms, what *anti-patterns* belong to that theme.
- **Editorial Console docs site.** `apps/site` is a unified docs + component reference + Gallery, deployed as one app — itself written entirely in ReActicle.

---

## Documentation

The full developer & authoring docs live at the official site — **<https://rearticle.mmh1.top/>**. The README is just the pitch; everything else is there.

| Track | Page | What it covers |
| --- | --- | --- |
| **Start** | [Get started](https://rearticle.mmh1.top/#/start) | Install, minimal scaffold, build & export, missing-field UX |
| **Theming** | [Theme contracts](https://rearticle.mmh1.top/#/theming) | `--ra-*` token system · how a theme is two artifacts (`.css` + `.md`) · adding a theme |
| **Authoring** | [Raw free-layer guide](https://rearticle.mmh1.top/#/raw) | When to reach for `<Raw>`, the token contract, anti-patterns & checklists |
| | [Export & distribution](https://rearticle.mmh1.top/#/export) | `ExportBar`, PDF / single-file HTML, `actionItemsToMarkdown` / `decisionToPrompt` |
| | [Writing recipes](https://rearticle.mmh1.top/#/recipes) | Skeletons for incident, spec, essay, explainer, decision, math, raw-interactive |
| | [Markdown migration](https://rearticle.mmh1.top/#/markdown) | One-to-one mapping table from Markdown to ReActicle components |
| **Pairing** | [Skill integration](https://rearticle.mmh1.top/#/skill) | How ReActicle pairs with the `beautiful-article` skill (Source → Plan → Build → Review → Repair → Deliver) |
| **Reference** | [Components](https://rearticle.mmh1.top/#/components) | Live preview + props table + copyable code for every component |
| | [Theme Gallery](https://rearticle.mmh1.top/#/gallery) | One specimen long-form article per theme |
| **Engineering** | [Architecture](https://rearticle.mmh1.top/#/architecture) | Engineering boundaries, dependency rules, single-file build |
| | [Contributing](https://rearticle.mmh1.top/#/contributing) | PR checklist for adding a component / theme / gallery entry |
| **Help** | [FAQ](https://rearticle.mmh1.top/#/faq) | Concept, Raw, export, missing fields, install, ReActicle vs neighbors |

---

## [Showcase](https://mmh1.top/#/ai-article) — articles built with ReActicle + `beautiful-article`

Real long-form articles, each authored end-to-end by an AI agent running the [`beautiful-article`](https://github.com/ConardLi/garden-skills) skill against ReActicle. Click any cover to open the live, single-file HTML article.

<table>
<tr>
<td width="50%" valign="top" align="center">
<a href="https://mmh1.top/#/ai-article/tools">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/tools.webp" alt="Agent Tools 设计的最佳实践" width="320">
<br><b>Agent Tools 设计的最佳实践</b>
</a>
<br><sub>Theme · Freddie · 长文 · 21 min</sub>
<br><sup>Anthropic 工程团队关于 Tools 的五条原则，与一套评测驱动的方法。</sup>
</td>
<td width="50%" valign="top" align="center">
<a href="https://mmh1.top/#/ai-article/skill">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/skill.webp" alt="Agent Skill 是如何进化的？" width="320">
<br><b>Agent Skill 是如何进化的？</b>
</a>
<br><sub>Theme · Freddie · 解释文 · 8 min</sub>
<br><sup>把 Skill 文档当成被训练的对象，而不是被复制粘贴的 prompt。</sup>
</td>
</tr>
<tr>
<td width="50%" valign="top" align="center">
<a href="https://mmh1.top/#/ai-article/harness">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/harness.webp" alt="Agent Harness 的解剖图" width="320">
<br><b>Agent Harness 的解剖图</b>
</a>
<br><sub>Theme · Vignelli · 长文 · 12 min</sub>
<br><sup>智能在模型里；让智能变得有用的，是它周围的那套系统。</sup>
</td>
<td width="50%" valign="top" align="center">
<a href="https://mmh1.top/#/ai-article/prompt-cache">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/prompt-cache.webp" alt="提示词缓存对 Agent 有多重要？" width="320">
<br><b>提示词缓存对 Agent 有多重要？</b>
</a>
<br><sub>Theme · Bayer · 长文 · 15 min</sub>
<br><sup>缓存命中率是 Agent 的 SLO，Claude Code 团队的反直觉经验。</sup>
</td>
</tr>
<tr>
<td width="50%" valign="top" align="center">
<a href="https://mmh1.top/#/ai-article/context">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/context.webp" alt="面向 Agent 的高效上下文工程" width="320">
<br><b>面向 Agent 的高效上下文工程</b>
</a>
<br><sub>Theme · Tufte · 长文 · 16 min</sub>
<br><sup>本文探讨如何高效地筛选与管理驱动 AI Agent 运转的上下文。</sup>
</td>
<td width="50%" valign="top" align="center">
<a href="https://mmh1.top/#/ai-article/transformer">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/transformer.webp" alt="Attention Is All You Need" width="320">
<br><b>Attention Is All You Need</b>
</a>
<br><sub>Theme · Tufte · 长文 · 30 min</sub>
<br><sup>一篇重塑现代 AI 的论文，逐层拆给你看。</sup>
</td>
</tr>
<tr>
<td width="50%" valign="top" align="center">
<a href="https://mmh1.top/#/ai-article/agent-eval">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/agent-eval.webp" alt="把 AI Agent 的评测讲清楚" width="320">
<br><b>把 AI Agent 的评测讲清楚</b>
</a>
<br><sub>Theme · Tufte · 长文 · 25 min</sub>
<br><sup>让 Agent 有用的那些能力，恰恰让它难以评测 — 来自 Anthropic 的指南。</sup>
</td>
<td width="50%" valign="top" align="center">
<a href="https://mmh1.top/#/ai-article/agent-loop-codex">
<img src="https://raw.githubusercontent.com/ConardLi/assets/main/imgs/article/agent-loop-codex.webp" alt="Codex 的 Agent Loop 是怎么做的？" width="320">
<br><b>Codex 的 Agent Loop 是怎么做的？</b>
</a>
<br><sub>Theme · Sottsass · 长文 · 18 min</sub>
<br><sup>OpenAI 官方分享：在 Responses API 之上，一条对话是如何被反复"展开"的。</sup>
</td>
</tr>
</table>

---

## [Theme Gallery](https://rearticle.mmh1.top/#/gallery) — one specimen article per theme

> 11 themes shipped. Full theme contracts (`.css` token bundle + `.md` authoring profile, anti-patterns, code/media style) are documented at [Theming](https://rearticle.mmh1.top/#/theming).

Every theme ships with a long-form **specimen article** that lives the theme end-to-end — typography, photography, code, formulas, Raw blocks, the works. Click any cover to read the live article; click the theme name to jump to that theme's section in the docs.

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

> Browse all specimens with theme switching, search and filters at the live gallery: <https://rearticle.mmh1.top/#/gallery>.

---

## When *not* to use ReActicle

- You're building a web app, dashboard, form-heavy product or generic landing page — go use a UI kit, not an article protocol.
- You need a CMS-style editor — ReActicle is an *output* protocol, not an editing UI.
- You only need a single Markdown render — that's what Markdown is for.

ReActicle is for when the deliverable **is the long-form HTML article itself**, especially when an AI agent is composing it.

---

## Acknowledgements

- The component vocabulary is shaped by Edward Tufte, Stripe Press, Pentagram, Vignelli, Bayer, Sottsass, Bucky Fuller, Donald Knuth and the Bell Labs technical-paper tradition.
- The AI authoring methodology is developed and shipped as the [`beautiful-article`](https://github.com/ConardLi/garden-skills) skill.

---

## License

[MIT](./LICENSE)
