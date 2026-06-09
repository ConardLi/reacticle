import { MissingField, fieldOr } from "../internal/MissingField";
import { Pill, type Level } from "./Pill";
import "./decision.css";

export interface RiskItem {
  /** Name of the risk. Required. */
  name?: string;
  /** Impact severity. Required. */
  impact?: Level;
  /** Likelihood of occurrence. Required. */
  likelihood?: Level;
  /** Mitigation action. Required — a risk without mitigation is incomplete. */
  mitigation?: string;
  /** Who owns this risk. Required. */
  owner?: string;
  /** Optional current status. */
  status?: string;
}

export interface RiskListProps {
  /** The risks. Required, non-empty. */
  risks?: RiskItem[];
}

/** A list of risks, each with impact, likelihood, mitigation and owner. */
export function RiskList({ risks }: RiskListProps) {
  if (risks == null || risks.length === 0) {
    return <MissingField label="风险项" />;
  }
  return (
    <div className="ra-risklist">
      {risks.map((r, i) => (
        <div className="ra-risk" key={i}>
          <div className="ra-risk__head">
            <span className="ra-risk__name">{fieldOr(r.name, "风险名称")}</span>
            <span className="ra-risk__levels">
              {r.impact ? <Pill prefix="影响" level={r.impact} /> : <MissingField label="影响程度" />}
              {r.likelihood ? (
                <Pill prefix="可能性" level={r.likelihood} />
              ) : (
                <MissingField label="发生可能性" />
              )}
            </span>
          </div>
          <div className="ra-risk__row">
            <strong>缓解动作：</strong>
            {fieldOr(r.mitigation, "缓解动作")}
          </div>
          <div className="ra-risk__row">
            <strong>负责人：</strong>
            {fieldOr(r.owner, "负责人")}
            {r.status ? (
              <>
                {"　"}
                <strong>状态：</strong>
                {r.status}
              </>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
