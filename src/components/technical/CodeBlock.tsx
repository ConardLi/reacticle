import { useState } from "react";
import { copyToClipboard } from "../../export/exports";
import { MissingField } from "../internal/MissingField";
import { HighlightedCode } from "./HighlightedCode";
import "./technical.css";

export interface CodeBlockProps {
  /** The code snippet. Required. */
  code?: string;
  /** Language label, e.g. "tsx", "bash", "json". Defaults to "tsx". */
  language?: string;
  /** Optional short title. */
  title?: string;
  /** Show line numbers. Defaults to true. */
  showLineNumbers?: boolean;
  /** Show a copy button. Defaults to true. */
  copyable?: boolean;
}

/** Plain code presentation: Prism highlight, language label and optional copy. */
export function CodeBlock({
  code,
  language = "tsx",
  title,
  showLineNumbers = true,
  copyable = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const hasCode = code != null && code !== "";
  const lang = language.trim().toLowerCase();

  const onCopy = async () => {
    if (!hasCode) return;
    const ok = await copyToClipboard(code);
    setCopied(ok);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="ra-codeblock">
      <div className="ra-codeblock__bar">
        <span className="ra-codeblock__lang">{title ?? lang}</span>
        {copyable ? (
          <button className="ra-codeblock__copy" type="button" onClick={onCopy}>
            {copied ? "已复制" : "复制"}
          </button>
        ) : null}
      </div>
      {hasCode ? (
        <pre className="ra-codeblock__code">
          <HighlightedCode
            code={code}
            language={lang}
            showLineNumbers={showLineNumbers}
          />
        </pre>
      ) : (
        <div className="ra-codeblock__missing">
          <MissingField label="代码内容" />
        </div>
      )}
    </div>
  );
}
