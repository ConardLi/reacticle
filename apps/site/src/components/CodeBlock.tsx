import { CodeBlock as ReacticleCodeBlock } from "reacticle";

export interface CodeBlockProps {
  code: string;
  lang?: string;
  inset?: boolean;
}

export function CodeBlock({ code, lang = "tsx", inset = false }: CodeBlockProps) {
  return (
    <div className={inset ? "code-shell code-shell--inset" : "code-shell"}>
      <ReacticleCodeBlock code={code} language={lang} />
    </div>
  );
}
