import { MissingField } from "../internal/MissingField";
import "./insight.css";

export interface SummaryProps {
  /** The key points the reader should walk away with. Required, non-empty. */
  points?: string[];
  /** Optional custom heading; defaults to "摘要". */
  title?: string;
}

/** Executive summary / key takeaways box. */
export function Summary({ points, title = "摘要" }: SummaryProps) {
  const hasPoints = points != null && points.length > 0;
  return (
    <div className="ra-card ra-summary">
      <span className="ra-card__label">{title}</span>
      {hasPoints ? (
        <ul className="ra-summary__list">
          {points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      ) : (
        <MissingField label="摘要要点" />
      )}
    </div>
  );
}
