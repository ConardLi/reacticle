import type { ReactNode } from "react";
import "./structure.css";

export interface LeadProps {
  /** Opening standfirst / introduction paragraph. */
  children: ReactNode;
}

/** Opening lead paragraph that frames the article. */
export function Lead({ children }: LeadProps) {
  return <p className="ra-lead">{children}</p>;
}
