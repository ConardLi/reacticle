import { Preview } from "../components/Preview";
import { findComponent, componentNeighbors, slugOf } from "../data/catalog";
import type { TocEntry } from "../components/OnThisPage";

/** Per-component right-rail TOC: adds a "案例" anchor only when examples exist. */
export function componentDetailTocFor(slug: string): TocEntry[] {
  const comp = findComponent(slug);
  const hasExamples = comp?.examples != null && comp.examples.length > 0;
  return [
    { id: "demo", label: "预览" },
    ...(hasExamples ? [{ id: "examples", label: "案例" }] : []),
    { id: "usage", label: "用法" },
    { id: "api", label: "属性" },
  ];
}

function NotFound({ slug }: { slug: string }) {
  return (
    <div className="page-head">
      <span className="kicker">组件</span>
      <h1>未找到组件</h1>
      <p>
        没有名为 <code className="inline">{slug}</code> 的组件。返回{" "}
        <a href="#/components">组件总览</a>。
      </p>
    </div>
  );
}

export function ComponentDetailPage({ slug }: { slug: string }) {
  const comp = findComponent(slug);
  if (!comp) return <NotFound slug={slug} />;

  const { prev, next } = componentNeighbors(slug);

  return (
    <>
      <nav className="breadcrumb" aria-label="面包屑">
        <a href="#/components">组件</a>
        <span aria-hidden="true">/</span>
        <a href={`#/components#${comp.categoryId}`}>{comp.categoryTitle}</a>
        <span aria-hidden="true">/</span>
        <span className="breadcrumb__current">{comp.name}</span>
      </nav>

      <div className="page-head">
        <span className="kicker">{comp.categoryTitle}</span>
        <h1>{comp.name}</h1>
        <p>{comp.semantic}</p>
      </div>

      <h2 className="detail-h anchor" id="demo">
        预览
      </h2>
      <Preview
        name={comp.name}
        semantic={comp.semantic}
        demo={comp.demo}
        code={comp.code}
        props={comp.props}
      />

      {comp.examples && comp.examples.length > 0 ? (
        <>
          <h2 className="detail-h anchor" id="examples">
            案例
          </h2>
          <p className="prose" style={{ color: "var(--rd-muted)" }}>
            {comp.examples.length} 个可运行的案例，覆盖交互、动画、SVG、原生 HTML
            与主题感知——逐个体现这套方案相对 Markdown 的表达力。
          </p>
          <div className="examples">
            {comp.examples.map((ex) => (
              <div className="examples__item" key={ex.title}>
                <Preview
                  name={ex.title}
                  semantic={ex.blurb ?? ""}
                  demo={ex.demo}
                  code={ex.code}
                />
              </div>
            ))}
          </div>
        </>
      ) : null}

      <h2 className="detail-h anchor" id="usage">
        用法
      </h2>
      <p className="prose" style={{ color: "var(--rd-muted)" }}>
        从公共入口 <code className="inline">reacticle</code> 导入，缺失的必填字段会在
        渲染结果里显式标出。
      </p>

      {comp.props && comp.props.length > 0 ? (
        <>
          <h2 className="detail-h anchor" id="api">
            属性
          </h2>
          <table className="props">
            <thead>
              <tr>
                <th>属性</th>
                <th>类型</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              {comp.props.map((p) => (
                <tr key={p.name}>
                  <td>
                    {p.name}
                    {p.required ? <span className="req">必填</span> : null}
                  </td>
                  <td>
                    <span className="type">{p.type}</span>
                  </td>
                  <td>{p.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}

      <nav className="prevnext" aria-label="组件翻页">
        {prev ? (
          <a className="prevnext__link" href={`#/components/${slugOf(prev.name)}`}>
            <span className="prevnext__dir">← 上一个</span>
            <span className="prevnext__name">{prev.name}</span>
          </a>
        ) : (
          <span />
        )}
        {next ? (
          <a
            className="prevnext__link prevnext__link--next"
            href={`#/components/${slugOf(next.name)}`}
          >
            <span className="prevnext__dir">下一个 →</span>
            <span className="prevnext__name">{next.name}</span>
          </a>
        ) : (
          <span />
        )}
      </nav>
    </>
  );
}
