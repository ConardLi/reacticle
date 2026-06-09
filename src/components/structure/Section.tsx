import { useId, type ReactNode } from "react";
import { fieldOr } from "../internal/MissingField";
import { HeadingDepthContext, headingAnchorId } from "./headingDepth";
import "./structure.css";

export interface SectionProps {
  /** Section heading. Required. */
  title?: string;
  /** Optional ordinal shown before the title, e.g. "01". */
  index?: string;
  /** Optional anchor id for navigation. */
  id?: string;
  children: ReactNode;
}

/** A first-level section of the article. */
export function Section({ title, index, id, children }: SectionProps) {
  const fallback = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const anchorId = headingAnchorId("section", id, index, title, fallback);
  return (
    <section
      className="ra-section"
      id={anchorId}
      data-ra-toc=""
      data-ra-level="1"
      {...(index ? { "data-ra-index": index } : {})}
      {...(title ? { "data-ra-title": title } : {})}
    >
      <header className="ra-section__head">
        {index ? <span className="ra-section__index">{index}</span> : null}
        <h2 className="ra-section__title">{fieldOr(title, "章节标题")}</h2>
      </header>
      <div className="ra-section__body">
        <HeadingDepthContext.Provider value={1}>
          {children}
        </HeadingDepthContext.Provider>
      </div>
    </section>
  );
}
