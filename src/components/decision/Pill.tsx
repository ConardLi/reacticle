import "./decision.css";

export type Level = "high" | "medium" | "low";

const LEVEL_LABELS: Record<Level, string> = {
  high: "高",
  medium: "中",
  low: "低",
};

export interface PillProps {
  prefix: string;
  level: Level;
}

/** A small colored pill describing a level (high / medium / low). */
export function Pill({ prefix, level }: PillProps) {
  return (
    <span className={`ra-pill ra-pill--${level}`}>
      {prefix}：{LEVEL_LABELS[level]}
    </span>
  );
}
