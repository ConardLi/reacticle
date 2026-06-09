import type { ReactNode } from "react";
import { MissingField } from "../internal/MissingField";
import "./insight.css";

export interface QuoteProps {
  /** The quoted text. Required. */
  children?: ReactNode;
  /** Who said it. Optional. */
  who?: string;
  /** Where it is from — work, document, link label. Optional. */
  source?: string;
}

/** A pulled quotation, optionally attributed. */
export function Quote({ children, who, source }: QuoteProps) {
  const attribution = [who, source].filter(Boolean).join("，");
  return (
    <figure className="ra-quote">
      <blockquote className="ra-quote__text">
        {children ? children : <MissingField label="引文" />}
      </blockquote>
      {attribution ? (
        <figcaption className="ra-quote__by">{attribution}</figcaption>
      ) : null}
    </figure>
  );
}
