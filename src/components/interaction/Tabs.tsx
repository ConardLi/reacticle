import { useId, useState, type ReactNode } from "react";
import { MissingField } from "../internal/MissingField";
import "./interaction.css";

export interface TabItem {
  /** Tab label. Required. */
  label: string;
  /** Tab panel content. Required. */
  content: ReactNode;
}

export interface TabsProps {
  /** The views to switch between. Required, non-empty. */
  tabs?: TabItem[];
  /** Index of the initially active tab. Defaults to 0. */
  initial?: number;
}

/**
 * Multiple views of the same artifact behind one set of tabs — the direct
 * realisation of "One Artifact, Multiple Views".
 */
export function Tabs({ tabs, initial = 0 }: TabsProps) {
  const baseId = useId();
  const [active, setActive] = useState(initial);
  if (tabs == null || tabs.length === 0) {
    return <MissingField label="标签页" />;
  }
  const activeIndex = Math.min(Math.max(active, 0), tabs.length - 1);
  const current = tabs[activeIndex]!;
  return (
    <div className="ra-tabs">
      <div className="ra-tabs__list" role="tablist">
        {tabs.map((t, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            id={`${baseId}-tab-${i}`}
            aria-selected={i === activeIndex}
            className={
              "ra-tabs__tab" + (i === activeIndex ? " ra-tabs__tab--active" : "")
            }
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="ra-tabs__panel" role="tabpanel">
        {current.content}
      </div>
    </div>
  );
}
