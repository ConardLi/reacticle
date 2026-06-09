import "./MissingField.css";

export interface MissingFieldProps {
  /** Human-readable name of the field the author forgot, e.g. "负责人". */
  label: string;
}

/**
 * Renders an explicit, visible warning when a required field is missing.
 *
 * ReActicle has no separate validator (no Guard layer). Completeness is enforced
 * by the components themselves: when the author/AI omits a required field, we do
 * NOT silently swallow it — we surface it so the gap is obvious in the final HTML.
 */
export function MissingField({ label }: MissingFieldProps) {
  return (
    <span className="ra-missing" role="alert">
      未指定{label}
    </span>
  );
}

/** Returns either the value (if present) or a MissingField marker. */
export function fieldOr(value: string | undefined | null, label: string) {
  if (value == null || value === "") return <MissingField label={label} />;
  return value;
}
