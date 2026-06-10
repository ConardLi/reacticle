import { useEffect, useState, type ReactNode } from "react";
import { TopNav } from "./components/TopNav";
import { Sidebar } from "./components/Sidebar";
import { OnThisPage, type TocEntry } from "./components/OnThisPage";
import { Footer } from "./components/Footer";
import {
  useRoute,
  useSiteTheme,
  setSiteTheme,
  sectionOf,
  applyChromeTheme,
  type RouteState,
} from "./lib/site";

import { HomePage } from "./pages/Home";
import { GetStartedPage, startToc } from "./pages/GetStarted";
import { ComponentsPage, componentsToc } from "./pages/Components";
import { ComponentDetailPage, componentDetailTocFor } from "./pages/ComponentDetail";
import { ThemingPage, themingToc } from "./pages/Theming";
import { ArchitecturePage, architectureToc } from "./pages/Architecture";
import { GalleryIndexPage, GalleryReaderPage } from "./pages/Gallery";
import { RawGuidePage, rawToc } from "./pages/RawGuide";
import { ExportPage, exportToc } from "./pages/Export";
import { SkillIntegrationPage, skillToc } from "./pages/SkillIntegration";
import { RecipesPage, recipesToc } from "./pages/Recipes";
import { FAQPage, faqToc } from "./pages/FAQ";
import { ContributingPage, contributingToc } from "./pages/Contributing";
import { MarkdownMigratePage, markdownToc } from "./pages/MarkdownMigrate";

interface DocsPage {
  node: ReactNode;
  toc: TocEntry[];
  /** Detail pages re-mount per slug so scroll-spy + state reset cleanly. */
  key: string;
}

function docsPage({ route, param }: RouteState): DocsPage | null {
  switch (route) {
    case "start":
      return { node: <GetStartedPage />, toc: startToc, key: "start" };
    case "components":
      return { node: <ComponentsPage />, toc: componentsToc, key: "components" };
    case "component":
      return {
        node: <ComponentDetailPage slug={param ?? ""} />,
        toc: componentDetailTocFor(param ?? ""),
        key: `component:${param}`,
      };
    case "theming":
      return { node: <ThemingPage />, toc: themingToc, key: "theming" };
    case "raw":
      return { node: <RawGuidePage />, toc: rawToc, key: "raw" };
    case "export":
      return { node: <ExportPage />, toc: exportToc, key: "export" };
    case "skill":
      return { node: <SkillIntegrationPage />, toc: skillToc, key: "skill" };
    case "recipes":
      return { node: <RecipesPage />, toc: recipesToc, key: "recipes" };
    case "faq":
      return { node: <FAQPage />, toc: faqToc, key: "faq" };
    case "contributing":
      return { node: <ContributingPage />, toc: contributingToc, key: "contributing" };
    case "markdown":
      return { node: <MarkdownMigratePage />, toc: markdownToc, key: "markdown" };
    case "architecture":
      return {
        node: <ArchitecturePage />,
        toc: architectureToc,
        key: "architecture",
      };
    default:
      return null;
  }
}

export function App() {
  const state = useRoute();
  const { route, param } = state;
  const theme = useSiteTheme();
  const section = sectionOf(route);
  const [menuOpen, setMenuOpen] = useState(false);

  // Chrome theme follows the user only inside the components section; every
  // other section is pinned to the fixed default so it stays independent.
  useEffect(() => {
    applyChromeTheme(section, theme);
  }, [section, theme]);

  const nav = (
    <TopNav
      section={section}
      theme={theme}
      onTheme={setSiteTheme}
      onMenu={() => setMenuOpen((o) => !o)}
    />
  );

  if (section === "home") {
    return (
      <div className="app">
        {nav}
        <HomePage />
        <Footer />
      </div>
    );
  }

  if (section === "gallery") {
    return (
      <div className="app">
        {nav}
        {param ? (
          <GalleryReaderPage slug={param} key={`gallery:${param}`} />
        ) : (
          <GalleryIndexPage />
        )}
        <Footer />
      </div>
    );
  }

  const page = docsPage(state)!;
  return (
    <div className="app">
      {nav}
      <div className={page.toc.length > 0 ? "docs" : "docs docs--no-toc"}>
        <Sidebar
          section={section}
          route={route}
          param={param}
          open={menuOpen}
          onNavigate={() => setMenuOpen(false)}
        />
        <main className="content" key={`main-${page.key}`}>
          {page.node}
        </main>
        {page.toc.length > 0 ? (
          <OnThisPage key={`toc-${page.key}`} entries={page.toc} />
        ) : null}
      </div>
      <Footer />
    </div>
  );
}
