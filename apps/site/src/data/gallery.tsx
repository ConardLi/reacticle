import type { ComponentType } from "react";
import type { ThemeName } from "reacticle";
import { CaffeineHalfLife } from "../reports/CaffeineHalfLife";
import { MovableType } from "../reports/MovableType";
import { PoolExhaustion } from "../reports/PoolExhaustion";
import { OrbitSpec } from "../reports/OrbitSpec";
import { LinearAttention } from "../reports/LinearAttention";
import { FirstNewsletter } from "../reports/FirstNewsletter";
import { SlowBreathing } from "../reports/SlowBreathing";
import { FrontPage } from "../reports/FrontPage";
import { GeometryOfMeaning } from "../reports/GeometryOfMeaning";
import { RateLimiterSpec } from "../reports/RateLimiter";
import { ColorClash } from "../reports/ColorClash";

/**
 * The gallery is a small, curated set of specimen articles — one per theme,
 * each a long read authored to fit that theme's character (no cross-theme
 * switching). Every entry carries the metadata the index needs to stay
 * browsable: a slug for routing, a kind for filtering, and a date for ordering.
 * The index renders only this metadata — never live articles — so it stays fast.
 */
export interface GalleryEntry {
  /** URL slug, e.g. #/gallery/<slug>. Must be unique. */
  slug: string;
  title: string;
  /** Article kind, used as a filter facet, e.g. 分析报告 / 随笔 / 教程. */
  kind: string;
  theme: ThemeName;
  themeLabel: string;
  /** One-paragraph teaser shown on the index card. */
  blurb: string;
  /** ISO date; the index sorts newest first. */
  date: string;
  render: ComponentType;
}

/** A stable accent per theme, used to tint index cards without a live render. */
export const THEME_ACCENT: Record<ThemeName, string> = {
  tufte: "#3e4a5c",
  press: "#7b1e22",
  shannon: "#e0a73e",
  vignelli: "#d6201f",
  knuth: "#34507e",
  freddie: "#f2ca00",
  andy: "#ff7e1d",
  bodoni: "#0a0908",
  bayer: "#1f49c0",
  fuller: "#79c2d0",
  sottsass: "#ff5d9e",
};

const ENTRIES: GalleryEntry[] = [
  {
    slug: "caffeine-half-life",
    title: "咖啡因与睡眠：一份关于半衰期的笔记",
    kind: "数据笔记",
    theme: "tufte",
    themeLabel: "Tufte · Data-Ink",
    date: "2026-06-08",
    blurb:
      "一篇以证据与数字为主角的长读：指数衰减公式、咖啡因含量表、一段算清残留的代码，配上为每个论点现画的发丝级衰减曲线、可拖动的睡前残留计算器与半衰期对比图。Tufte 的数据墨水，正合它的气质。",
    render: CaffeineHalfLife,
  },
  {
    slug: "movable-type",
    title: "活字之后",
    kind: "随笔",
    theme: "press",
    themeLabel: "Press · 书卷",
    date: "2026-06-08",
    blurb:
      "从泥板、卷轴、抄本、活字到屏幕与机器，一篇关于文字载体如何重塑思想的出版式长文。几乎全是正文，仅以引文与洞察点睛，辅以会落定的标题、氧化血红首字母、卷轴与抄本对照图和一条载体时间轴。Press 把它排成一本会动的小书。",
    render: MovableType,
  },
  {
    slug: "pool-exhaustion",
    title: "连接池耗尽：一次结算级联故障复盘",
    kind: "故障复盘",
    theme: "shannon",
    themeLabel: "Shannon · 工程暗色",
    date: "2026-06-07",
    blurb:
      "一行加在数据库查询之后的外部调用，如何在晚高峰把整条结算链路拖进 37 分钟的黑暗。用利特尔法则解释连接池为何崩溃，配上暗底黄金信号图、可拖动的饱和度仪表与回压依赖图，辅以 Incident、DiffReview、RiskList 与一条决策记录。Shannon 的工程暗色，正合这场夜间作战。",
    render: PoolExhaustion,
  },
  {
    slug: "orbit-spec",
    title: "Orbit 设计系统 · 基础规范",
    kind: "规格",
    theme: "vignelli",
    themeLabel: "Vignelli · 瑞士",
    date: "2026-06-06",
    blurb:
      "间距、字号、色彩、栅格与组件状态——一套以网格为唯一真理的基础层契约。冷中性纸、grotesque 字族靠字号建立层级、瑞士红只承载结构，配上 8pt 间距阶梯、字号样张、可拖动的响应式栅格与按钮状态矩阵，token 用三端代码并排落地。Vignelli 的瑞士网格，正合一份系统规格。",
    render: OrbitSpec,
  },
  {
    slug: "linear-attention",
    title: "以核特征映射线性化自注意力：一个复杂度视角",
    kind: "预印本",
    theme: "knuth",
    themeLabel: "Knuth · 学术",
    date: "2026-06-05",
    blurb:
      "把 softmax 注意力重写为核相似度，便能用结合律将二次复杂度降到线性。一篇公式优先的学术预印本：编号小节、式 (1)–(4) 的推导、命题与证明梗概、O(nd²) 参考算法，配上复杂度曲线、稠密注意力矩阵与实测耗时三张编号图版。Knuth 的学术衬线，正合一篇 arXiv 草稿。",
    render: LinearAttention,
  },
  {
    slug: "first-newsletter",
    title: "第一封 Newsletter：一份不端着的上手指南",
    kind: "上手指南",
    theme: "freddie",
    themeLabel: "Freddie · 暖黄",
    date: "2026-06-04",
    blurb:
      "没人天生会写邮件。把“发出去也没人理”拆成主题行、内容、时机、看数字几个能动手的小判断，配上照着收件箱说实话的主题行体检、会层层打折的发送漏斗，辅以 do/don't 对照、指标脾气表与几条 FAQ。Freddie 的黑字荧光，正合一篇不端着的产品上手指南。",
    render: FirstNewsletter,
  },
  {
    slug: "slow-breathing",
    title: "把呼吸放慢：盒式呼吸与平静的神经科学",
    kind: "练习",
    theme: "andy",
    themeLabel: "Andy · 静谧",
    date: "2026-06-03",
    blurb:
      "紧张时，呼吸是少数你能立刻握住的开关。用最朴素的话讲清慢呼吸为何在生理上真有用，再带你跟着一个会扩缩的圆做一轮盒式呼吸，配上呼吸-神经的跷跷板、四拍循环表与一天里的使用时刻。Andy 的柔软圆润，正合一篇让人慢下来的呼吸练习。",
    render: SlowBreathing,
  },
  {
    slug: "front-page",
    title: "头版的消亡",
    kind: "特稿",
    theme: "bodoni",
    themeLabel: "Bodoni · 报刊",
    date: "2026-06-02",
    blurb:
      "曾经一座城市的早晨由同一张纸定义：报纸的头版替所有人判断「今天什么最重要」。当无限版面取消了对折线、把排序外包给停留时长，我们失去的不只是纸，还有共同的议题。一篇有分量的媒介特稿，配上头版解剖、发丝级发行量曲线与一张载体得失对照。Bodoni 的黑白 Didone，正合一份大报特稿。",
    render: FrontPage,
  },
  {
    slug: "geometry-of-meaning",
    title: "形、色、网格：看得懂的视觉语法",
    kind: "教学",
    theme: "bayer",
    themeLabel: "Bayer · 包豪斯",
    date: "2026-06-01",
    blurb:
      "设计不是玄学，是一门可以教的语法：形状有性格、颜色有重量、网格让随意变成构成。从三角进取、方稳重、圆安静，到康定斯基那道著名的形色配对，再到三原色的分工，配上可点选的形色匹配、可拖动的网格构成与一张用色逻辑表。Bayer 的三原色几何，正合一篇包豪斯入门。",
    render: GeometryOfMeaning,
  },
  {
    slug: "rate-limiter-spec",
    title: "限流器设计规格",
    kind: "系统设计",
    theme: "fuller",
    themeLabel: "Fuller · 蓝图",
    date: "2026-05-31",
    blurb:
      "从需求、部署位置、算法选型，到接口契约与每一个会踩的边界条件——一份可以直接照着实现的限流器设计文档。用令牌桶讲清突发与均速，配上可动手的令牌桶模拟、方格纸上的部署拓扑、固定窗口的双倍突发图与一张算法权衡表。Fuller 的工程蓝图，正合一份系统规格。",
    render: RateLimiterSpec,
  },
  {
    slug: "color-clash",
    title: "撞色不翻车",
    kind: "设计随笔",
    theme: "sottsass",
    themeLabel: "Sottsass · 孟菲斯",
    date: "2026-05-30",
    blurb:
      "谁说颜色要「和谐」？孟菲斯早就证明撞得对才好看。一份关于配色胆量的练习：先承认撞色是态度，再讲唯一硬规矩——当字的两色要读得出来，最后是黑描边、硬投影、轻微旋转三个显贵小动作，配上可动手的撞色 / 对比测试、现成配色卡与一张该撞 / 不该撞清单。Sottsass 的 80s 撞色，正合一篇不正经的配色指南。",
    render: ColorClash,
  },
];

/** Entries sorted newest-first, the order the index and reader navigation use. */
export const galleryEntries: GalleryEntry[] = [...ENTRIES].sort((a, b) =>
  b.date < a.date ? -1 : b.date > a.date ? 1 : 0
);

/** Distinct kinds, in first-appearance order, for the filter chips. */
export const galleryKinds: string[] = Array.from(
  new Set(galleryEntries.map((e) => e.kind))
);

export function findGalleryEntry(slug: string): GalleryEntry | undefined {
  return galleryEntries.find((e) => e.slug === slug);
}

/** Previous / next entry in display order, for in-reader navigation. */
export function galleryNeighbors(slug: string): {
  prev: GalleryEntry | null;
  next: GalleryEntry | null;
} {
  const i = galleryEntries.findIndex((e) => e.slug === slug);
  if (i < 0) return { prev: null, next: null };
  return {
    prev: i > 0 ? galleryEntries[i - 1]! : null,
    next: i < galleryEntries.length - 1 ? galleryEntries[i + 1]! : null,
  };
}
