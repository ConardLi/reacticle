import { MissingField, fieldOr } from "../internal/MissingField";
import "./decision.css";

export interface ActionItem {
  /** What needs to be done. Required. */
  task?: string;
  /** Who is responsible. Required. */
  owner?: string;
  /** When it is due. Optional. */
  due?: string;
  /** Optional status, e.g. "未开始" / "进行中" / "完成". */
  status?: string;
}

export interface ActionListProps {
  /** The action items. Required, non-empty. */
  items?: ActionItem[];
}

/** A list of next-step action items with owners and due dates. */
export function ActionList({ items }: ActionListProps) {
  if (items == null || items.length === 0) {
    return <MissingField label="行动项" />;
  }
  return (
    <div className="ra-actionlist">
      <div className="ra-actionlist__row ra-actionlist__head">
        <span>行动项</span>
        <span>负责人</span>
        <span>截止</span>
        <span>状态</span>
      </div>
      {items.map((it, i) => (
        <div className="ra-actionlist__row" key={i}>
          <span className="ra-actionlist__task">{fieldOr(it.task, "行动项")}</span>
          <span>{fieldOr(it.owner, "负责人")}</span>
          <span>{it.due ?? "—"}</span>
          <span>{it.status ?? "未开始"}</span>
        </div>
      ))}
    </div>
  );
}
