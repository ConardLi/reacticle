import { MissingField, fieldOr } from "../internal/MissingField";
import "./technical.css";

export type DiffLineType = "add" | "del" | "ctx";

export interface DiffLine {
  /** add (+), del (-), or ctx (unchanged context). Defaults to ctx. */
  type?: DiffLineType;
  /** The line content (without the +/- marker). Required. */
  text?: string;
}

export interface DiffNote {
  /** Optional anchor the note refers to, e.g. a line or symbol. */
  ref?: string;
  /** The review comment. Required. */
  text?: string;
}

export interface DiffReviewProps {
  /** File the change applies to. Recommended. */
  file?: string;
  /** Optional title for the change. */
  title?: string;
  /** The diff lines. Required, non-empty. */
  lines?: DiffLine[];
  /** Optional review notes attached to the change. */
  notes?: DiffNote[];
}

const MARK: Record<DiffLineType, string> = { add: "+", del: "-", ctx: " " };

/**
 * A reviewable code change: a rendered diff plus structured review notes.
 * Diff rendering is a signature advantage of HTML over Markdown for agent work
 * reports and technical reviews.
 */
export function DiffReview({ file, title, lines, notes }: DiffReviewProps) {
  return (
    <div className="ra-diff">
      <div className="ra-diff__head">
        <span className="ra-diff__label">{title ?? "变更审阅"}</span>
        {file ? <span className="ra-diff__file">{file}</span> : null}
      </div>
      {lines && lines.length > 0 ? (
        <pre className="ra-diff__code">
          {lines.map((ln, i) => {
            const type = ln.type ?? "ctx";
            return (
              <span className={`ra-diff__line ra-diff__line--${type}`} key={i}>
                <span className="ra-diff__gutter">{MARK[type]}</span>
                <span className="ra-diff__text">{ln.text ?? ""}</span>
                {"\n"}
              </span>
            );
          })}
        </pre>
      ) : (
        <div className="ra-diff__missing">
          <MissingField label="变更内容" />
        </div>
      )}
      {notes && notes.length > 0 ? (
        <ul className="ra-diff__notes">
          {notes.map((n, i) => (
            <li className="ra-diff__note" key={i}>
              {n.ref ? <span className="ra-diff__ref">{n.ref}</span> : null}
              <span className="ra-diff__note-text">{fieldOr(n.text, "审阅意见")}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
