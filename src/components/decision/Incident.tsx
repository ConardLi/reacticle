import { fieldOr } from "../internal/MissingField";
import { Pill, type Level } from "./Pill";
import "./decision.css";

export interface IncidentEvent {
  /** When this happened. Required. */
  when?: string;
  /** What happened. Required. */
  what?: string;
}

export interface IncidentProps {
  /** Short title of the incident. Required. */
  title?: string;
  /** Severity level. Required. */
  severity?: Level;
  /** Observed impact. Required. */
  impact?: string;
  /** Root cause, once known. Optional but recommended. */
  rootCause?: string;
  /** How it was (or will be) resolved. Optional but recommended. */
  resolution?: string;
  /** Optional chronology of the incident. */
  timeline?: IncidentEvent[];
  /** Current status, e.g. "已恢复". Optional. */
  status?: string;
}

/** A fault / security incident write-up for ops and security reports. */
export function Incident({
  title,
  severity,
  impact,
  rootCause,
  resolution,
  timeline,
  status,
}: IncidentProps) {
  return (
    <div className="ra-incident">
      <div className="ra-incident__head">
        <span className="ra-incident__label">事件 · Incident</span>
        {severity ? <Pill prefix="严重度" level={severity} /> : null}
        {status ? <span className="ra-incident__status">{status}</span> : null}
      </div>
      <div className="ra-incident__title">{fieldOr(title, "事件标题")}</div>

      <div className="ra-incident__field">
        <span className="ra-incident__field-label">影响</span>
        <span>{fieldOr(impact, "影响范围")}</span>
      </div>
      {rootCause ? (
        <div className="ra-incident__field">
          <span className="ra-incident__field-label">根因</span>
          <span>{rootCause}</span>
        </div>
      ) : null}
      {resolution ? (
        <div className="ra-incident__field">
          <span className="ra-incident__field-label">处置</span>
          <span>{resolution}</span>
        </div>
      ) : null}

      {timeline && timeline.length > 0 ? (
        <ul className="ra-incident__timeline">
          {timeline.map((e, i) => (
            <li key={i}>
              <span className="ra-incident__when">{fieldOr(e.when, "时间")}</span>
              <span>{fieldOr(e.what, "动作")}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
