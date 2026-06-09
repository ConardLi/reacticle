import { THEMES, THEME_LABELS, type ThemeName } from "reacticle";
import { Logo } from "./Logo";
import { GitHubIcon } from "./icons";
import { REPO_URL, VERSION, type Section } from "../lib/site";

/** Compact button label (full label lives in the `title` tooltip). */
const SHORT_LABEL: Record<ThemeName, string> = {
  tufte: "Tufte",
  press: "Press",
  shannon: "Shannon",
  vignelli: "Vignelli",
  knuth: "Knuth",
  freddie: "Freddie",
  andy: "Andy",
  bodoni: "Bodoni",
  bayer: "Bayer",
  fuller: "Fuller",
  sottsass: "Sottsass",
};

const NAV: { label: string; section: Section; href: string }[] = [
  { label: "主页", section: "home", href: "#/" },
  { label: "指南", section: "guide", href: "#/start" },
  { label: "组件", section: "components", href: "#/components" },
  { label: "效果演示", section: "gallery", href: "#/gallery" },
];

export interface TopNavProps {
  section: Section;
  theme: ThemeName;
  onTheme: (t: ThemeName) => void;
  onMenu: () => void;
}

export function TopNav({ section, theme, onTheme, onMenu }: TopNavProps) {
  // Theme switching is meaningful only inside the components section; the other
  // three sections are theme-independent by design.
  const showThemeSwitch = section === "components";
  return (
    <header className="nav">
      <button className="nav__menu" onClick={onMenu} aria-label="打开导航">
        ☰
      </button>
      <Logo />
      <nav className="nav__links" aria-label="主导航">
        {NAV.map((n) => (
          <a
            key={n.section}
            className="nav__link"
            href={n.href}
            data-active={section === n.section}
          >
            {n.label}
          </a>
        ))}
      </nav>
      <div className="nav__spacer" />
      <div className="nav__right">
        <span className="eyebrow" aria-hidden="true">
          {VERSION}
        </span>
        {showThemeSwitch ? (
          <div className="modeswitch" role="group" aria-label="切换组件主题">
            {THEMES.map((t) => (
              <button
                key={t}
                data-active={theme === t}
                onClick={() => onTheme(t)}
                aria-pressed={theme === t}
                title={THEME_LABELS[t]}
              >
                {SHORT_LABEL[t]}
              </button>
            ))}
          </div>
        ) : null}
        <a
          className="nav__ghost"
          href={REPO_URL}
          target="_blank"
          rel="noreferrer noopener"
        >
          <GitHubIcon />
          GitHub
        </a>
      </div>
    </header>
  );
}
