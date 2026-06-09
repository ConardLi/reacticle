import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";

export interface HighlightedCodeProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

const LANGUAGE_ALIASES: Record<string, string> = {
  html: "markup",
  js: "javascript",
  jsx: "jsx",
  shell: "bash",
  sh: "bash",
  ts: "typescript",
  tsx: "tsx",
};

function normalizeLanguage(language?: string): string {
  const normalized = (language ?? "tsx").trim().toLowerCase();
  return LANGUAGE_ALIASES[normalized] ?? normalized;
}

function highlightLine(line: string, language: string): string {
  const grammar = Prism.languages[language];
  if (!grammar) return Prism.util.encode(line || " ").toString();
  return Prism.highlight(line || " ", grammar, language);
}

/** Shared Prism-backed code renderer for the docs chrome and protocol components. */
export function HighlightedCode({
  code,
  language = "tsx",
  showLineNumbers = true,
}: HighlightedCodeProps) {
  const lang = normalizeLanguage(language);
  const lines = code.replace(/\n$/, "").split("\n");

  return (
    <code className={`ra-code language-${lang}`} data-language={lang}>
      {lines.map((line, index) => (
        <span className="ra-code__line" key={index}>
          {showLineNumbers ? (
            <span className="ra-code__line-no" aria-hidden="true">
              {index + 1}
            </span>
          ) : null}
          <span
            className="ra-code__line-code"
            dangerouslySetInnerHTML={{ __html: highlightLine(line, lang) }}
          />
        </span>
      ))}
    </code>
  );
}
