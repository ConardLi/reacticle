import { MissingField, fieldOr } from "../internal/MissingField";
import "./decision.css";

export interface DecisionProps {
  /** The question / problem being decided. Required. */
  question?: string;
  /** Candidate options considered. Required, non-empty. */
  options?: string[];
  /** The criteria used to judge between options. Optional but recommended. */
  criteria?: string[];
  /** The recommended option. Required. */
  recommended?: string;
  /** Rationale for the recommendation. Required. */
  rationale?: string;
}

/** A decision record: question, options, criteria, recommendation, rationale. */
export function Decision({
  question,
  options,
  criteria,
  recommended,
  rationale,
}: DecisionProps) {
  return (
    <div className="ra-decision">
      <span className="ra-decision__label">决策</span>

      <div>
        <div className="ra-decision__field-label">问题</div>
        <div className="ra-decision__question">{fieldOr(question, "决策问题")}</div>
      </div>

      <div>
        <div className="ra-decision__field-label">候选方案</div>
        {options && options.length > 0 ? (
          <ul className="ra-decision__options">
            {options.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        ) : (
          <MissingField label="候选方案" />
        )}
      </div>

      {criteria && criteria.length > 0 ? (
        <div>
          <div className="ra-decision__field-label">判断标准</div>
          <ul className="ra-decision__options">
            {criteria.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="ra-decision__recommended">
        <div className="ra-decision__field-label">推荐方案</div>
        <div>{fieldOr(recommended, "推荐方案")}</div>
        <div className="ra-decision__field-label ra-decision__field-label--spaced">
          理由
        </div>
        <div>{fieldOr(rationale, "推荐理由")}</div>
      </div>
    </div>
  );
}
