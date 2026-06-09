import { MissingField } from "../internal/MissingField";
import "./structured.css";

export interface AudioProps {
  /** URL of a real audio file, e.g. mp3/ogg/wav. Required. */
  src?: string;
  /** Accessible media title. Required — surfaced if missing. */
  title?: string;
  /** A caption shown beneath the audio. Optional. */
  caption?: string;
  /** Source / attribution / credit. Optional. */
  credit?: string;
  /** Constrain display width, e.g. "80%" or "520px". Optional. */
  width?: string;
  /** Show browser playback controls. Defaults to true. */
  controls?: boolean;
  /** Hint how much media the browser should preload. Defaults to "metadata". */
  preload?: "none" | "metadata" | "auto";
  /** Autoplay the audio. Use sparingly. */
  autoPlay?: boolean;
  /** Loop playback. Optional. */
  loop?: boolean;
}

/**
 * A captioned audio embed for interviews, clips and narration. It follows the
 * same authoring contract as Image: real media URL, explicit title, optional
 * caption and source.
 */
export function Audio({
  src,
  title,
  caption,
  credit,
  width,
  controls = true,
  preload = "metadata",
  autoPlay,
  loop,
}: AudioProps) {
  const validSrc = src != null && src !== "";
  const titleMissing = title == null || title === "";
  const label = titleMissing ? caption ?? "音频" : title;

  return (
    <figure className="ra-media ra-audio">
      <div
        className="ra-media__frame ra-audio__frame"
        style={width ? { maxWidth: width } : undefined}
      >
        {validSrc ? (
          <audio
            className="ra-audio__player"
            src={src}
            controls={controls}
            preload={preload}
            autoPlay={autoPlay}
            loop={loop}
            aria-label={label}
          />
        ) : (
          <div className="ra-media__placeholder">
            <MissingField label="音频地址 src" />
          </div>
        )}
      </div>
      {validSrc && titleMissing ? (
        <div className="ra-media__missing">
          <MissingField label="媒体标题 title" />
        </div>
      ) : null}
      {caption || credit ? (
        <figcaption className="ra-media__caption">
          {caption ? <span className="ra-media__text">{caption}</span> : null}
          {credit ? <span className="ra-media__credit">{credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
