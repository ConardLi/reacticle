import type { Route, Section } from "../lib/site";
import { catalog, slugOf } from "../data/catalog";

export interface SidebarProps {
  section: Section;
  route: Route;
  param: string | null;
  open: boolean;
  onNavigate: () => void;
}

interface GuideLink {
  label: string;
  href: string;
  route: Route;
}
interface GuideGroup {
  title: string;
  items: GuideLink[];
}

/** Guide section grouped: 入门 / 写作 / 协作 / 工程。 */
const GUIDE_GROUPS: GuideGroup[] = [
  {
    title: "入门",
    items: [
      { label: "开始使用", href: "#/start", route: "start" },
      { label: "主题契约", href: "#/theming", route: "theming" },
    ],
  },
  {
    title: "写作",
    items: [
      { label: "Raw 自由层守则", href: "#/raw", route: "raw" },
      { label: "导出与分发", href: "#/export", route: "export" },
      { label: "写作配方", href: "#/recipes", route: "recipes" },
      { label: "Markdown 迁移", href: "#/markdown", route: "markdown" },
    ],
  },
  {
    title: "协作",
    items: [
      { label: "与 Skill 集成", href: "#/skill", route: "skill" },
      { label: "FAQ", href: "#/faq", route: "faq" },
    ],
  },
  {
    title: "工程",
    items: [
      { label: "工程架构", href: "#/architecture", route: "architecture" },
      { label: "贡献指南", href: "#/contributing", route: "contributing" },
    ],
  },
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
        {GUIDE_GROUPS.map((g) => (
          <div className="sidebar__group" key={g.title}>
            <div className="sidebar__title">{g.title}</div>
            {g.items.map((l) => (
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
        ))}
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
