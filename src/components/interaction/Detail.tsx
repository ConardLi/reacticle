import type { ReactNode } from "react";
import { fieldOr } from "../internal/MissingField";
import "./interaction.css";

export interface DetailProps {
  /** The always-visible summary line. Required. */
  summary?: string;
  /** Hidden detail, revealed on expand. Required. */
  children?: ReactNode;
  /** Whether it starts expanded. */
  open?: boolean;
}

/**
 * A collapsible detail. Built on native <details>, so it works in the exported
 * single-page HTML even without a JS runtime — long reports can hide depth and
 * let the reader pull it in on demand (Human-in-the-loop by design).
 */
export function Detail({ summary, children, open }: DetailProps) {
  return (
    <details className="ra-detail" open={open}>
      <summary className="ra-detail__summary">{fieldOr(summary, "摘要行")}</summary>
      <div className="ra-detail__body">{children}</div>
    </details>
  );
}
