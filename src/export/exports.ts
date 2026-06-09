import type { ActionItem } from "../components/decision/ActionList";
import type { DecisionProps } from "../components/decision/Decision";

/** Render action items as a copy-pastable markdown checklist. */
export function actionItemsToMarkdown(items: ActionItem[]): string {
  if (items.length === 0) return "(无行动项)";
  return items
    .map((it) => {
      const task = it.task ?? "未指定行动项";
      const owner = it.owner ?? "未指定负责人";
      const parts = [`负责人: ${owner}`];
      if (it.due) parts.push(`截止: ${it.due}`);
      if (it.status) parts.push(`状态: ${it.status}`);
      return `- [ ] ${task} (${parts.join(", ")})`;
    })
    .join("\n");
}

/** Render a decision as a prompt block suitable for feeding back to an AI. */
export function decisionToPrompt(decision: DecisionProps): string {
  const lines: string[] = [];
  lines.push(`问题: ${decision.question ?? "未指定问题"}`);
  if (decision.options?.length) {
    lines.push(`候选方案: ${decision.options.join(" / ")}`);
  }
  if (decision.criteria?.length) {
    lines.push(`判断标准: ${decision.criteria.join(" / ")}`);
  }
  lines.push(`推荐方案: ${decision.recommended ?? "未指定推荐方案"}`);
  lines.push(`理由: ${decision.rationale ?? "未指定理由"}`);
  return lines.join("\n");
}

/** Copy text to clipboard with a synchronous fallback for file:// contexts. */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to legacy path
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}
