import type { ReactNode } from "react";
import { MissingField } from "../internal/MissingField";
import "./structure.css";

export interface ConclusionProps {
  /** Heading for the closing section; defaults to "结论". */
  title?: string;
  /** The closing prose — the article's last word. */
  children?: ReactNode;
  /** Optional final takeaways, listed under the prose. */
  takeaways?: string[];
}

/**
 * A formal closing section. An article that opens with Hero / Lead / Summary
 * should also close deliberately; Conclusion gives that ending a fixed shape.
 */
export function Conclusion({ title = "结论", children, takeaways }: ConclusionProps) {
  const hasTakeaways = takeaways != null && takeaways.length > 0;
  const empty = !children && !hasTakeaways;
  return (
    <section className="ra-conclusion">
      <div className="ra-conclusion__label">{title}</div>
      {children ? <div className="ra-conclusion__body">{children}</div> : null}
      {hasTakeaways ? (
        <ul className="ra-conclusion__takeaways">
          {takeaways.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      ) : null}
      {empty ? <MissingField label="结论内容" /> : null}
    </section>
  );
}
