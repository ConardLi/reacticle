import type { ReactNode } from "react";
import { MissingField } from "../internal/MissingField";
import "./structured.css";

export type TableAlign = "left" | "center" | "right";

export interface TableColumn {
  /** Stable key used to read each row value. Required. */
  key: string;
  /** Header label. Defaults to key. */
  label?: string;
  /** Cell alignment. Defaults to left. */
  align?: TableAlign;
  /** Optional CSS width, e.g. "8rem" or "24%". */
  width?: string;
}

export type TableRow = Record<string, ReactNode>;

export interface TableProps {
  /** Optional table caption shown above the table. */
  caption?: string;
  /** Optional source / attribution shown below the table. */
  source?: string;
  /** Column definitions. Required, non-empty. */
  columns?: TableColumn[];
  /** Row data keyed by column key. Required, non-empty. */
  rows?: TableRow[];
}

function cellOr(value: ReactNode, label: string) {
  if (value == null || value === "") return <MissingField label={label} />;
  return value;
}

/** Generic two-dimensional information: markdown tables, specs, comparisons. */
export function Table({ caption, source, columns, rows }: TableProps) {
  const hasData =
    columns != null &&
    columns.length > 0 &&
    rows != null &&
    rows.length > 0;

  return (
    <figure className="ra-table">
      {caption ? <figcaption className="ra-table__caption">{caption}</figcaption> : null}
      {hasData ? (
        <div className="ra-table__scroll">
          <table className="ra-table__table">
            <colgroup>
              {columns.map((col) => (
                <col key={col.key} style={col.width ? { width: col.width } : undefined} />
              ))}
            </colgroup>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th className={`ra-table__cell--${col.align ?? "left"}`} key={col.key}>
                    {col.label ?? col.key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col) => (
                    <td className={`ra-table__cell--${col.align ?? "left"}`} key={col.key}>
                      {cellOr(row[col.key], col.label ?? col.key)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="ra-table__missing">
          <MissingField label="表格列与行" />
        </div>
      )}
      {source ? <div className="ra-table__source">{source}</div> : null}
    </figure>
  );
}
