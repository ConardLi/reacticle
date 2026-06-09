// ReActicle — public component library entry.
// Authors / AI import from here and never write raw HTML or styles.

// Theme
export {
  ThemeProvider,
  THEMES,
  THEME_LABELS,
  type ThemeName,
  type ThemeProviderProps,
} from "./theme/ThemeProvider";

// Structure
export {
  Article,
  type ArticleProps,
  type ArticleWidth,
} from "./components/structure/Article";
export { Hero, type HeroProps, type HeroMeta } from "./components/structure/Hero";
export { Lead, type LeadProps } from "./components/structure/Lead";
export { Section, type SectionProps } from "./components/structure/Section";
export {
  Subsection,
  type SubsectionProps,
} from "./components/structure/Subsection";
export { TOC, type TOCProps, type TocItem } from "./components/structure/TOC";
export {
  Conclusion,
  type ConclusionProps,
} from "./components/structure/Conclusion";

// Point-making
export { Summary, type SummaryProps } from "./components/insight/Summary";
export {
  Aside,
  type AsideProps,
  type AsideTone,
} from "./components/insight/Aside";
export { Quote, type QuoteProps } from "./components/insight/Quote";

// Media + data
export {
  Table,
  type TableProps,
  type TableColumn,
  type TableRow,
  type TableAlign,
} from "./components/structured/Table";
export { Image, type ImageProps } from "./components/structured/Image";
export { Video, type VideoProps } from "./components/structured/Video";
export { Audio, type AudioProps } from "./components/structured/Audio";

// Decision
export {
  RiskList,
  type RiskListProps,
  type RiskItem,
} from "./components/decision/RiskList";
export { Decision, type DecisionProps } from "./components/decision/Decision";
export {
  ActionList,
  type ActionListProps,
  type ActionItem,
} from "./components/decision/ActionList";
export {
  Checkpoint,
  type CheckpointProps,
} from "./components/decision/Checkpoint";
export {
  Tradeoff,
  type TradeoffProps,
} from "./components/decision/Tradeoff";
export {
  Incident,
  type IncidentProps,
  type IncidentEvent,
} from "./components/decision/Incident";
export { type Level } from "./components/decision/Pill";

// Technical
export { CodeBlock, type CodeBlockProps } from "./components/technical/CodeBlock";
export { Formula, type FormulaProps } from "./components/technical/Formula";
export {
  HighlightedCode,
  type HighlightedCodeProps,
} from "./components/technical/HighlightedCode";
export {
  DiffReview,
  type DiffReviewProps,
  type DiffLine,
  type DiffLineType,
  type DiffNote,
} from "./components/technical/DiffReview";

// Interaction
export { Detail, type DetailProps } from "./components/interaction/Detail";
export {
  Tabs,
  type TabsProps,
  type TabItem,
} from "./components/interaction/Tabs";

// Free expression — bespoke HTML / React: interactivity, animation, custom visuals
export { Raw, type RawProps } from "./components/free/Raw";

// Internal (exposed for completeness UX)
export { MissingField } from "./components/internal/MissingField";

// Exports (PDF via print, copy as prompt / action items)
export { ExportBar, type ExportBarProps } from "./export/ExportBar";
export {
  actionItemsToMarkdown,
  decisionToPrompt,
  copyToClipboard,
} from "./export/exports";
