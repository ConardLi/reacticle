import { useEffect, useState, useSyncExternalStore } from "react";
import { THEMES, type ThemeName } from "reacticle";

// Single place to edit the public repo URL once it exists.
export const REPO_URL = "https://github.com/ConardLi/reacticle";
export const VERSION = "v0.2.6";

export type Route =
  | "home"
  | "start"
  | "components"
  | "component"
  | "theming"
  | "raw"
  | "export"
  | "skill"
  | "recipes"
  | "faq"
  | "contributing"
  | "markdown"
  | "gallery"
  | "architecture";

/**
 * Four top-level sections drive the whole experience. Each has its own
 * relationship to the theme system:
 * - home      独立，固定主题，不受主题系统控制
 * - guide     独立，固定主题，不受主题系统控制（指南类文档）
 * - components 可任意切换组件主题（唯一出现全局主题切换的地方）
 * - gallery   每篇文章自带主题，外部不可切换
 */
export type Section = "home" | "guide" | "components" | "gallery";

export function sectionOf(route: Route): Section {
  switch (route) {
    case "home":
      return "home";
    case "start":
    case "theming":
    case "raw":
    case "export":
    case "skill":
    case "recipes":
    case "faq":
    case "contributing":
    case "markdown":
    case "architecture":
      return "guide";
    case "components":
    case "component":
      return "components";
    case "gallery":
      return "gallery";
  }
}

export interface RouteState {
  route: Route;
  /** Component slug when route === "component". */
  param: string | null;
  /** In-page anchor after a second `#`, e.g. #/components#cat-insight. */
  anchor: string | null;
}

function parseHash(): RouteState {
  const raw = window.location.hash.replace(/^#/, "");
  const [pathPart, anchor] = raw.split("#");
  const seg = (pathPart ?? "").split("/").filter(Boolean);
  let route: Route = "home";
  let param: string | null = null;

  if (seg.length === 0) route = "home";
  else if (seg[0] === "start") route = "start";
  else if (seg[0] === "components") {
    if (seg[1]) {
      route = "component";
      param = seg[1];
    } else route = "components";
  } else if (seg[0] === "theming") route = "theming";
  else if (seg[0] === "raw") route = "raw";
  else if (seg[0] === "export") route = "export";
  else if (seg[0] === "skill") route = "skill";
  else if (seg[0] === "recipes") route = "recipes";
  else if (seg[0] === "faq") route = "faq";
  else if (seg[0] === "contributing") route = "contributing";
  else if (seg[0] === "markdown") route = "markdown";
  else if (seg[0] === "gallery") {
    route = "gallery";
    if (seg[1]) param = seg[1];
  } else if (seg[0] === "architecture") route = "architecture";

  return { route, param, anchor: anchor ?? null };
}

/** Minimal dependency-free hash router (keeps the repo at zero runtime deps). */
export function useRoute() {
  const [state, setState] = useState(parseHash);

  useEffect(() => {
    const onChange = () => {
      const next = parseHash();
      setState(next);
      // Defer so the target page has mounted before we scroll to its anchor.
      if (next.anchor) {
        requestAnimationFrame(() => {
          const el = document.getElementById(next.anchor!);
          if (el) {
            const top =
              el.getBoundingClientRect().top + window.scrollY - 84;
            window.scrollTo({ top, behavior: "smooth" });
          }
        });
      } else {
        window.scrollTo({ top: 0 });
      }
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return state;
}

/*
 * Global theme = a single axis shared by the whole experience.
 * `data-theme` on <html> drives the site chrome (--rd-*), and the same value is
 * handed to every live <ThemeProvider> so the docs and the rendered components
 * always switch in lockstep. Backed by a tiny external store so deeply-nested
 * previews re-render on change without prop-drilling or context.
 */
const THEME_KEY = "ra-theme";
/** Fixed chrome theme for theme-independent sections (home / guide / gallery). */
export const DEFAULT_THEME: ThemeName = "tufte";

function isTheme(v: string | null): v is ThemeName {
  return !!v && (THEMES as readonly string[]).includes(v);
}

function readInitialTheme(): ThemeName {
  const attr = document.documentElement.getAttribute("data-theme");
  if (isTheme(attr)) return attr;
  return DEFAULT_THEME;
}

let currentTheme: ThemeName = readInitialTheme();
const themeListeners = new Set<() => void>();

export function setSiteTheme(theme: ThemeName): void {
  if (theme === currentTheme) return;
  currentTheme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* ignore */
  }
  themeListeners.forEach((fn) => fn());
}

/**
 * The site chrome (`--rd-*`, driven by `data-theme` on <html>) only follows the
 * user-chosen theme inside the components section. Everywhere else it is pinned
 * to DEFAULT_THEME so home / guide / gallery stay visually independent of the
 * theme system.
 */
export function applyChromeTheme(section: Section, theme: ThemeName): void {
  const chrome = section === "components" ? theme : DEFAULT_THEME;
  document.documentElement.setAttribute("data-theme", chrome);
}

export function useSiteTheme(): ThemeName {
  return useSyncExternalStore(
    (onChange) => {
      themeListeners.add(onChange);
      return () => themeListeners.delete(onChange);
    },
    () => currentTheme,
    () => currentTheme
  );
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
