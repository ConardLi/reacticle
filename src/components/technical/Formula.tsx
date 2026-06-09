import { useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import { MissingField } from "../internal/MissingField";
import "./technical.css";

export interface FormulaProps {
  /** TeX math source. Required. */
  tex?: string;
  /** Render as display math. Defaults to false. */
  block?: boolean;
  /** Optional caption for block formulas. Ignored for inline formulas. */
  caption?: string;
}

function renderFormula(tex: string, block: boolean) {
  return katex.renderToString(tex, {
    displayMode: block,
    output: "htmlAndMathml",
    throwOnError: false,
    strict: "ignore",
    errorColor: "#a6300e",
    trust: false,
  });
}

/** TeX formula rendering for technical and research long-form writing. */
export function Formula({ tex, block = false, caption }: FormulaProps) {
  const hasTex = tex != null && tex !== "";
  const html = useMemo(
    () => (hasTex ? renderFormula(tex, block) : ""),
    [block, hasTex, tex]
  );

  const math = hasTex ? (
    <span
      className="ra-formula__math"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : (
    <MissingField label="公式 tex" />
  );

  if (!block) {
    return <span className="ra-formula ra-formula--inline">{math}</span>;
  }

  return (
    <figure className="ra-formula ra-formula--block">
      <div className="ra-formula__body">{math}</div>
      {caption ? (
        <figcaption className="ra-formula__caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
