import { MissingField } from "../internal/MissingField";
import "./decision.css";

export interface TradeoffProps {
  /** What is being weighed. Required. */
  subject?: string;
  /** Points in favour. Required, non-empty. */
  pros?: string[];
  /** Points against. Required, non-empty. */
  cons?: string[];
  /** Optional bottom-line verdict. */
  verdict?: string;
}

/** A two-column weighing of one option's upsides against its downsides. */
export function Tradeoff({ subject, pros, cons, verdict }: TradeoffProps) {
  const hasPros = pros != null && pros.length > 0;
  const hasCons = cons != null && cons.length > 0;
  return (
    <div className="ra-tradeoff">
      <div className="ra-tradeoff__head">
        <span className="ra-card__label">权衡</span>
        {subject ? <span className="ra-tradeoff__subject">{subject}</span> : null}
      </div>
      <div className="ra-tradeoff__cols">
        <div className="ra-tradeoff__col">
          <div className="ra-tradeoff__col-label ra-tradeoff__col-label--pro">利</div>
          {hasPros ? (
            <ul className="ra-tradeoff__list">
              {pros.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          ) : (
            <MissingField label="有利点" />
          )}
        </div>
        <div className="ra-tradeoff__col">
          <div className="ra-tradeoff__col-label ra-tradeoff__col-label--con">弊</div>
          {hasCons ? (
            <ul className="ra-tradeoff__list">
              {cons.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          ) : (
            <MissingField label="不利点" />
          )}
        </div>
      </div>
      {verdict ? (
        <div className="ra-tradeoff__verdict">
          <span className="ra-tradeoff__verdict-label">结论</span>
          {verdict}
        </div>
      ) : null}
    </div>
  );
}
