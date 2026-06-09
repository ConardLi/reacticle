# ReActicle

![ReActicle banner](./public/img/banner.jpeg)

> **An HTML article protocol for the AI era** — instead of letting AI hand-write raw HTML, give it a constrained, semantic React component contract that produces stable, beautiful, interactive, self-contained HTML articles and reports.

[中文文档](./README.zh-CN.md) · [npm package](https://www.npmjs.com/package/reacticle) · [Companion skill: `beautiful-article`](https://github.com/ConardLi/garden-skills)

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

## Quick start

### Install

```bash
npm install reacticle react react-dom
```

### Use

```tsx
import {
  ThemeProvider,
  Article,
  Hero,
  Lead,
  Section,
  Summary,
  Quote,
  Raw,
} from "reacticle";
import "reacticle/styles.css";

export default function App() {
  return (
    <ThemeProvider theme="tufte">
      <Article width="regular">
        <Hero
          eyebrow="Field notes"
          title="The geometry of meaning"
          meta={{ author: "ConardLi", date: "2026-06-08" }}
        />
        <Lead>
          A short field note on how embedding spaces fold semantics into
          measurable geometry.
        </Lead>

        <Section title="What changes when we measure meaning">
          <p>
            Meaning, in this view, is not a label but a position — a vector in
            a space whose distances we can compare.
          </p>
          <Summary>
            Distance ≠ semantic distance, but a usable approximation under
            most editorial workloads.
          </Summary>
          <Quote attribution="Edward R. Tufte">
            Above all else show the data.
          </Quote>
        </Section>

        <Section title="A custom visual block">
          <Raw>
            {/* Anything goes here — SVG, HTML, React — but use theme tokens. */}
            <div
              style={{
                border: "1px solid var(--ra-rule)",
                padding: "var(--ra-space-4)",
                color: "var(--ra-fg)",
                background: "var(--ra-surface)",
                fontFamily: "var(--ra-font-display)",
              }}
            >
              Custom block · uses --ra-* tokens · rewires on theme change.
            </div>
          </Raw>
        </Section>
      </Article>
    </ThemeProvider>
  );
}
```

### Switch theme

```tsx
<ThemeProvider theme="press">  {/* try: tufte · press · bayer · bodoni · vignelli · sottsass · freddie · andy · fuller · knuth · shannon */}
  ...
</ThemeProvider>
```

Every component, every Raw block, the cover, the print stylesheet — all rewire from a single line.

---

## Working on this repo

This repo is a **single-package component library + unified site**:

- **Library** — root package `reacticle`. `src/` is the only publishable code: components, themes, exports, public entry.
- **Unified site** — `apps/site` merges docs, component live reference and Gallery into one application. One visual language, one deploy.

```bash
npm install
npm run dev          # unified site (docs · components · gallery)
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the unified site (docs / components / gallery) |
| `npm run build:lib` | Build the component library |
| `npm run build:site` | Build the unified site |
| `npm run build:report` | Build a self-contained single-file HTML report |
| `npm run build` | Build library, then site |
| `npm run preview:site` | Preview the built site |
| `npm run typecheck` | Whole-project TypeScript check |

```text
src/
  components/            semantic components
  theme/                 token contract, themes, print styles
  export/                PDF / copy / export utilities
  index.ts               the only public entry

apps/
  site/                  unified site: docs + component reference + gallery + single-file report build

docs/architecture/       engineering boundaries
```

Full architecture: [`docs/architecture/engineering-architecture.md`](./docs/architecture/engineering-architecture.md)
Coverage map vs. Markdown: [`docs/markdown-coverage-plan.md`](./docs/markdown-coverage-plan.md)

---

## Components

External consumers may only import from the package entry:

```tsx
import { ThemeProvider, Article, Hero, Section } from "reacticle";
```

| Group | Components |
| --- | --- |
| **Structure** | `Article`, `Hero`, `Lead`, `Section`, `Subsection`, `TOC`, `Conclusion` |
| **Insight** | `Summary`, `Aside`, `Quote` |
| **Media** | `Image`, `Video`, `Audio` |
| **Data** | `Table` |
| **Decision** | `RiskList`, `Decision`, `ActionList`, `Checkpoint`, `Tradeoff`, `Incident` |
| **Technical** | `CodeBlock`, `Formula`, `DiffReview`, `HighlightedCode` |
| **Interaction** | `Detail`, `Tabs` |
| **Free layer** | `Raw` |
| **Export** | `ExportBar`, `actionItemsToMarkdown`, `decisionToPrompt`, `copyToClipboard` |

---

## Themes

ReActicle ships 11 themes, each a complete editorial system:

| Theme | Personality |
| --- | --- |
| `tufte` | Edward Tufte / data-ink, evidence-first |
| `press` | Stripe Press / book-like long read |
| `bayer` | Bauhaus / Herbert Bayer geometric editorial |
| `bodoni` | High-contrast didone / fashion editorial |
| `vignelli` | Massimo Vignelli / Helvetica grid system |
| `sottsass` | Memphis / playful postmodern |
| `freddie` | Mailchimp Freddie / friendly illustrative |
| `andy` | Andy Warhol / pop screenprint |
| `fuller` | Buckminster Fuller / engineering blueprint |
| `knuth` | Donald Knuth / Computer Modern, technical-press |
| `shannon` | Bell Labs / Shannon technical paper |

Each theme is **two artifacts**:

1. `<theme>.css` — the `--ra-*` token bundle and selectors.
2. `<theme>.md` — an authoring profile the AI reads *before* writing. It must specify:
   - **Code & formula style** — how `CodeBlock` / `Formula` highlights, line numbers, math whitespace and Prism token colors match the theme.
   - **Media style** — what photography, screenshots, charts, video, audio textures the theme accepts; what it rejects.
   - **Raw layer style** — what line weight, motion, density and token usage Raw SVG / interaction / animation should adopt.
   - **Anti-patterns** — what visual moves break the theme.

This is what makes themes survive AI generation: the agent doesn't pick visuals freely — it picks visuals **the theme document allows**.

---

## The unified site (`apps/site`)

`apps/site` is the only real consumer of `reacticle`. It uses the public entry only — never internal paths. Its design language is **Editorial Console**: dual Paper / Ink modes, editorial serif + monospace UI, hairline rules, single Tufte vermillion accent. The site's own design tokens live under `--rd-*` and never collide with the library's `--ra-*`.

Sections:

- **Overview** — the protocol pitch, a live mini article, design principles, component catalog
- **Get Started** — install, minimal scaffold, build & export, missing-field UX
- **Components** — every component: live preview + props table + copyable code
- **Theming** — token contract, the Tufte case study, how to add a theme
- **Gallery** — real reports with theme switching
- **Architecture** — engineering boundaries and dependency rules

### Single-file HTML reports

```bash
npm run build:report
```

Outputs `dist-report/report.html`, all CSS and JS inlined — the report opens with no network.

---

## Engineering boundaries

1. The library does not depend on the site.
2. The site only consumes the library through the `reacticle` public entry.
3. Themes are part of the library; theme previews and theme docs live in the site.
4. Example articles belong to the site, never to the npm package.
5. Architecture docs live in `docs/architecture`, not mixed into component API docs.

---

## When *not* to use ReActicle

- You're building a web app, dashboard, form-heavy product or generic landing page — go use a UI kit, not an article protocol.
- You need a CMS-style editor — ReActicle is an *output* protocol, not an editing UI.
- You only need a single Markdown render — that's what Markdown is for.

ReActicle is for when the deliverable **is the long-form HTML article itself**, especially when an AI agent is composing it.

---

## Roadmap

- More themes (community-driven)
- Richer interaction primitives (long-form `Detail` patterns, in-article search)
- Optional published `@reacticle/themes-*` packages once the surface stabilizes
- Visual regression CI for theme integrity
- Release workflow with provenance

---

## Acknowledgements

- The component vocabulary is shaped by Edward Tufte, Stripe Press, Pentagram, Vignelli, Bayer, Sottsass, Bucky Fuller, Donald Knuth and the Bell Labs technical-paper tradition.
- The AI authoring methodology is developed and shipped as the [`beautiful-article`](https://github.com/ConardLi/garden-skills) skill.

---

## License

[MIT](./LICENSE)
