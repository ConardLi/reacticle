import { useState } from "react";
import type { ActionItem } from "../components/decision/ActionList";
import type { DecisionProps } from "../components/decision/Decision";
import {
  actionItemsToMarkdown,
  decisionToPrompt,
  copyToClipboard,
} from "./exports";
import "./ExportBar.css";

export interface ExportBarProps {
  /** Action items to expose via "复制为 Action Items". */
  actionItems?: ActionItem[];
  /** Decision to expose via "复制为 Prompt". */
  decision?: DecisionProps;
}

/**
 * A non-print toolbar offering the three MVP exports:
 * single-page HTML (already the artifact), PDF (print), and copy to prompt /
 * action items. Hidden automatically when printing (see print.css).
 */
export function ExportBar({ actionItems, decision }: ExportBarProps) {
  const [msg, setMsg] = useState("");

  const flash = (text: string) => {
    setMsg(text);
    window.setTimeout(() => setMsg(""), 1500);
  };

  const copy = async (text: string, label: string) => {
    const ok = await copyToClipboard(text);
    flash(ok ? `${label}已复制` : "复制失败");
  };

  return (
    <div className="ra-export-bar no-print">
      <span className="ra-export-bar__title">导出</span>
      <button onClick={() => window.print()}>导出 PDF（打印）</button>
      {actionItems ? (
        <button
          onClick={() => copy(actionItemsToMarkdown(actionItems), "Action Items")}
        >
          复制为 Action Items
        </button>
      ) : null}
      {decision ? (
        <button onClick={() => copy(decisionToPrompt(decision), "Prompt")}>
          复制为 Prompt
        </button>
      ) : null}
      {msg ? <span className="ra-export-bar__title">{msg}</span> : null}
    </div>
  );
}
