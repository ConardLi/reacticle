import type { ReactNode } from "react";
import { MissingField } from "../internal/MissingField";
import "./insight.css";

export type AsideTone = "note" | "principle" | "capability" | "warning";

export interface AsideProps {
  /** Semantic tone. Theme decides the actual visual treatment. */
  tone?: AsideTone;
  /** Short label above the aside body. Defaults from tone. */
  label?: string;
  children?: ReactNode;
}

const LABELS: Record<AsideTone, string> = {
  note: "补充说明",
  principle: "原则",
  capability: "能力",
  warning: "注意",
};

/** A theme-bound aside for notes, principles, capabilities and warnings. */
export function Aside({ tone = "note", label, children }: AsideProps) {
  return (
    <aside className={`ra-card ra-aside ra-aside--${tone}`}>
      <span className="ra-card__label ra-aside__label">{label ?? LABELS[tone]}</span>
      <div className="ra-aside__body">
        {children ? children : <MissingField label="旁注内容" />}
      </div>
    </aside>
  );
}
