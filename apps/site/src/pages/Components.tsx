import { ThemeProvider } from "reacticle";
import { catalog, slugOf } from "../data/catalog";
import type { TocEntry } from "../components/OnThisPage";
import { useSiteTheme } from "../lib/site";

export const componentsToc: TocEntry[] = catalog.map((c) => ({
  id: c.id,
  label: c.title,
}));

const totalCount = catalog.reduce((n, c) => n + c.components.length, 0);

export function ComponentsPage() {
  const theme = useSiteTheme();
  return (
    <>
      <div className="page-head">
        <span className="kicker">组件参考</span>
        <h1>组件总览</h1>
        <p>
          {totalCount} 个语义组件，分 {catalog.length} 类。每个卡片是真实组件库渲染的
          live 预览——点开进入独立的组件页，查看完整示例、属性表与可复制代码。
        </p>
      </div>

      {catalog.map((cat) => (
        <section className="anchor cat-block" id={cat.id} key={cat.id}>
          <div className="cat-block__head">
            <h2>{cat.title}</h2>
            <span className="cat-block__count mono">
              {cat.components.length} 个
            </span>
          </div>
          <p className="cat-block__blurb">{cat.blurb}</p>

          <div className="comp-grid">
            {cat.components.map((c) => (
              <a
                className="comp-card"
                key={c.name}
                href={`#/components/${slugOf(c.name)}`}
              >
                <div className="comp-card__stage" aria-hidden="true">
                  <ThemeProvider theme={theme}>{c.thumb ?? c.demo}</ThemeProvider>
                </div>
                <div className="comp-card__meta">
                  <span className="comp-card__name">{c.name}</span>
                  <span className="comp-card__semantic">{c.semantic}</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
