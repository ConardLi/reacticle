import { MissingField } from "../internal/MissingField";
import "./structured.css";

export interface ImageProps {
  /**
   * URL of a real (raster) image — http(s) or a project path, e.g.
   * "/photo.jpg". Image does NOT author graphics: inline SVG / data:image/svg
   * is rejected. For hand-drawn SVG, charts or diagrams, use Raw instead.
   */
  src?: string;
  /** Alt text for accessibility. Required — surfaced if missing. */
  alt?: string;
  /** A caption shown beneath the image. Optional. */
  caption?: string;
  /** Source / attribution / credit. Optional. */
  credit?: string;
  /** Constrain display width, e.g. "60%" or "420px". Optional. */
  width?: string;
  /** Reserve an aspect ratio to avoid layout shift, e.g. "16/9". Optional. */
  ratio?: string;
}

/**
 * A captioned image for embedding a real photo / raster asset by URL.
 *
 * Image deliberately does one thing: point an <img> at a real image URL, lazy-
 * load it, constrain its width, optionally reserve an aspect ratio, and keep
 * caption + credit in the protocol's consistent voice. It is NOT a drawing
 * surface — writing SVG is Raw's job, so an inline SVG src is refused and the
 * gap is surfaced rather than silently honoured.
 */
export function Image({ src, alt, caption, credit, width, ratio }: ImageProps) {
  const altMissing = alt == null || alt === "";
  const isInlineSvg = src != null && /^\s*data:image\/svg/i.test(src);
  const validSrc = src != null && src !== "" && !isInlineSvg;
  return (
    <figure className="ra-image">
      <div
        className="ra-image__frame"
        style={width ? { maxWidth: width } : undefined}
      >
        {validSrc ? (
          <img
            className="ra-image__img"
            src={src}
            alt={altMissing ? "" : alt}
            loading="lazy"
            style={ratio ? { aspectRatio: ratio } : undefined}
          />
        ) : (
          <div className="ra-image__placeholder">
            {isInlineSvg ? (
              <span className="ra-missing" role="alert">
                Image 只接受真实图片 URL —— 内联 SVG 请改用 Raw
              </span>
            ) : (
              <MissingField label="图片地址 src" />
            )}
          </div>
        )}
      </div>
      {validSrc && altMissing ? (
        <div className="ra-image__alt-missing">
          <MissingField label="替代文本 alt" />
        </div>
      ) : null}
      {caption || credit ? (
        <figcaption className="ra-image__caption">
          {caption ? <span className="ra-image__text">{caption}</span> : null}
          {credit ? <span className="ra-image__credit">{credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
