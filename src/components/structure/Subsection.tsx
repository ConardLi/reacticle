import { useContext, useId, type ReactNode } from "react";
import { fieldOr } from "../internal/MissingField";
import {
  HeadingDepthContext,
  MAX_HEADING_LEVEL,
  headingAnchorId,
} from "./headingDepth";
import "./structure.css";

export interface SubsectionProps {
  /** Subsection heading. Required. */
  title?: string;
  /** Optional ordinal shown before the title, e.g. "5.1". */
  index?: string;
  /** Optional anchor id for navigation. */
  id?: string;
  /**
   * Nesting depth — 2 renders an h3, 3 renders an h4. Resolved automatically
   * from how deeply the Subsection is nested; pass to override.
   */
  level?: 2 | 3;
  children: ReactNode;
}

/** A nested heading inside a Section (level 2 → h3, level 3 → h4). */
export function Subsection({
  title,
  index,
  id,
  level,
  children,
}: SubsectionProps) {
  const parentDepth = useContext(HeadingDepthContext);
  const resolved = (level ??
    Math.min(parentDepth + 1, MAX_HEADING_LEVEL)) as 2 | 3;
  const fallback = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const anchorId = headingAnchorId("sub", id, index, title, fallback);
  const Heading = resolved >= 3 ? "h4" : "h3";
  return (
    <section
      className={`ra-subsection ra-subsection--l${resolved}`}
      id={anchorId}
      data-ra-toc=""
      data-ra-level={resolved}
      {...(index ? { "data-ra-index": index } : {})}
      {...(title ? { "data-ra-title": title } : {})}
    >
      <header className="ra-subsection__head">
        {index ? <span className="ra-subsection__index">{index}</span> : null}
        <Heading className="ra-subsection__title">
          {fieldOr(title, "小节标题")}
        </Heading>
      </header>
      <div className="ra-subsection__body">
        <HeadingDepthContext.Provider value={resolved}>
          {children}
        </HeadingDepthContext.Provider>
      </div>
    </section>
  );
}
