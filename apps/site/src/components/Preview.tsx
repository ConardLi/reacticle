import { useState, type ReactNode } from "react";
import { ThemeProvider } from "reacticle";
import { CodeBlock } from "./CodeBlock";
import { useSiteTheme } from "../lib/site";

export interface PropRow {
  name: string;
  type: string;
  required?: boolean;
  desc: string;
}

export interface PreviewProps {
  name: string;
  semantic: string;
  demo: ReactNode;
  code: string;
  props?: PropRow[];
}

type Tab = "preview" | "code" | "props";

/**
 * A hairline frame around a real, live reacticle component. The stage hosts an
 * actual ThemeProvider bound to the globally-selected theme, so every demo
 * re-renders the moment the reader switches themes in the top nav.
 */
export function Preview({ name, semantic, demo, code, props }: PreviewProps) {
  const [tab, setTab] = useState<Tab>("preview");
  const theme = useSiteTheme();

  return (
    <div className="preview anchor" id={`c-${name}`}>
      <div className="preview__bar">
        <span className="preview__dot" aria-hidden="true" />
        <span className="preview__name">{name}</span>
        <span className="preview__semantic">{semantic}</span>
        <div className="preview__tools" role="tablist">
          <button
            className="preview__tool"
            data-active={tab === "preview"}
            onClick={() => setTab("preview")}
          >
            预览
          </button>
          <button
            className="preview__tool"
            data-active={tab === "code"}
            onClick={() => setTab("code")}
          >
            代码
          </button>
          {props && props.length > 0 ? (
            <button
              className="preview__tool"
              data-active={tab === "props"}
              onClick={() => setTab("props")}
            >
              属性
            </button>
          ) : null}
        </div>
      </div>

      {tab === "preview" ? (
        <div className="preview__stage">
          <ThemeProvider theme={theme}>{demo}</ThemeProvider>
        </div>
      ) : null}

      {tab === "code" ? <CodeBlock code={code} inset /> : null}

      {tab === "props" && props ? (
        <table className="props">
          <thead>
            <tr>
              <th>属性</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            {props.map((p) => (
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
      ) : null}
    </div>
  );
}
