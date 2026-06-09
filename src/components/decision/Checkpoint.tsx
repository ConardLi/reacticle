import { fieldOr } from "../internal/MissingField";
import "./decision.css";

export interface CheckpointProps {
  /** What the human needs to confirm / decide. Required. */
  question?: string;
  /** Optional choices presented to the human. */
  options?: string[];
}

/** A human-in-the-loop confirmation point. */
export function Checkpoint({ question, options }: CheckpointProps) {
  return (
    <div className="ra-checkpoint" role="note">
      <div className="ra-checkpoint__label">需要人工确认 · Checkpoint</div>
      <div className="ra-checkpoint__question">{fieldOr(question, "确认事项")}</div>
      {options && options.length > 0 ? (
        <div className="ra-checkpoint__options">
          {options.map((o, i) => (
            <span className="ra-checkpoint__option" key={i}>
              {o}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
