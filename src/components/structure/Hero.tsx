import { fieldOr } from "../internal/MissingField";
import "./structure.css";

export interface HeroMeta {
  label: string;
  value: string;
}

export interface HeroProps {
  /** Main title of the report. Required. */
  title?: string;
  /** Optional small label shown above the title. */
  eyebrow?: string;
  /** Optional one-line subtitle / standfirst. */
  subtitle?: string;
  /** Optional metadata row, e.g. author / date / version. */
  meta?: HeroMeta[];
}

/** Title block for a report or long-form article. */
export function Hero({ title, eyebrow, subtitle, meta }: HeroProps) {
  return (
    <header className="ra-hero">
      {eyebrow ? <div className="ra-hero__eyebrow">{eyebrow}</div> : null}
      <h1 className="ra-hero__title">{fieldOr(title, "标题")}</h1>
      {subtitle ? <div className="ra-hero__subtitle">{subtitle}</div> : null}
      {meta && meta.length > 0 ? (
        <div className="ra-hero__meta">
          {meta.map((m, i) => (
            <span className="ra-hero__meta-item" key={i}>
              <strong>{m.label}：</strong>
              {m.value}
            </span>
          ))}
        </div>
      ) : null}
    </header>
  );
}
