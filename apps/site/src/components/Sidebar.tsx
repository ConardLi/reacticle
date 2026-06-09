import type { Route, Section } from "../lib/site";
import { catalog, slugOf } from "../data/catalog";

export interface SidebarProps {
  section: Section;
  route: Route;
  param: string | null;
  open: boolean;
  onNavigate: () => void;
}

/** Guide section: every doc that is not a component reference. */
const GUIDE_LINKS: { label: string; href: string; route: Route }[] = [
  { label: "开始使用", href: "#/start", route: "start" },
  { label: "主题契约", href: "#/theming", route: "theming" },
  { label: "工程架构", href: "#/architecture", route: "architecture" },
];

export function Sidebar({
  section,
  route,
  param,
  open,
  onNavigate,
}: SidebarProps) {
  if (section === "guide") {
    return (
      <aside className="sidebar" data-open={open} aria-label="指南导航">
        <div className="sidebar__group">
          <div className="sidebar__title">指南</div>
          {GUIDE_LINKS.map((l) => (
            <a
              key={l.route}
              className="sidebar__link"
              href={l.href}
              data-active={route === l.route}
              onClick={onNavigate}
            >
              {l.label}
            </a>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="sidebar" data-open={open} aria-label="组件导航">
      <div className="sidebar__group">
        <div className="sidebar__title">组件</div>
        <a
          className="sidebar__link"
          href="#/components"
          data-active={route === "components"}
          onClick={onNavigate}
        >
          总览
        </a>
        {catalog.map((cat) => (
          <div className="sidebar__cat" key={cat.id}>
            <div className="sidebar__catname">{cat.title}</div>
            {cat.components.map((c) => {
              const slug = slugOf(c.name);
              return (
                <a
                  key={c.name}
                  className="sidebar__link sidebar__link--sub"
                  href={`#/components/${slug}`}
                  data-active={route === "component" && param === slug}
                  onClick={onNavigate}
                >
                  {c.name}
                </a>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
}
