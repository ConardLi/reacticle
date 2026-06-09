import type { ReactNode } from "react";
import "./index.css";

export const THEMES = [
  "tufte",
  "press",
  "shannon",
  "vignelli",
  "knuth",
  "freddie",
  "andy",
  "bodoni",
  "bayer",
  "fuller",
  "sottsass",
] as const;

export type ThemeName = (typeof THEMES)[number];

export const THEME_LABELS: Record<ThemeName, string> = {
  tufte: "Tufte · Data-Ink",
  press: "Press · 书卷",
  shannon: "Shannon · 工程暗色",
  vignelli: "Vignelli · 瑞士",
  knuth: "Knuth · 学术",
  freddie: "Freddie · 暖黄",
  andy: "Andy · 静谧",
  bodoni: "Bodoni · 报刊",
  bayer: "Bayer · 包豪斯",
  fuller: "Fuller · 蓝图",
  sottsass: "Sottsass · 孟菲斯",
};

export interface ThemeProviderProps {
  /** Which visual theme to apply. AI/authors only pick a theme, never styles. */
  theme?: ThemeName;
  children: ReactNode;
  className?: string;
}

/**
 * Establishes the ReActicle styling root. Sets `data-theme` so every nested
 * component resolves its `var(--ra-*)` tokens against the chosen theme.
 */
export function ThemeProvider({
  theme = "tufte",
  children,
  className,
}: ThemeProviderProps) {
  return (
    <div
      className={className ? `ra-root ${className}` : "ra-root"}
      data-theme={theme}
    >
      {children}
    </div>
  );
}
