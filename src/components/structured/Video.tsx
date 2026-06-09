import { MissingField } from "../internal/MissingField";
import "./structured.css";

export interface VideoProps {
  /** URL of a real video file, e.g. mp4/webm. Required. */
  src?: string;
  /** Accessible media title. Required — surfaced if missing. */
  title?: string;
  /** Poster image shown before playback. Optional. */
  poster?: string;
  /** A caption shown beneath the video. Optional. */
  caption?: string;
  /** Source / attribution / credit. Optional. */
  credit?: string;
  /** Constrain display width, e.g. "80%" or "720px". Optional. */
  width?: string;
  /** Reserve an aspect ratio to avoid layout shift, e.g. "16/9". Optional. */
  ratio?: string;
  /** Show browser playback controls. Defaults to true. */
  controls?: boolean;
  /** Hint how much media the browser should preload. Defaults to "metadata". */
  preload?: "none" | "metadata" | "auto";
  /** Autoplay the video. Use sparingly; browsers often require muted. */
  autoPlay?: boolean;
  /** Mute the video. Recommended when autoPlay is true. */
  muted?: boolean;
  /** Loop playback. Optional. */
  loop?: boolean;
  /** Keep playback inline on mobile browsers. Defaults to true. */
  playsInline?: boolean;
}

/**
 * A captioned video embed that mirrors Image's protocol: point to real media,
 * keep caption + credit consistent, and surface missing required metadata.
 */
export function Video({
  src,
  title,
  poster,
  caption,
  credit,
  width,
  ratio,
  controls = true,
  preload = "metadata",
  autoPlay,
  muted,
  loop,
  playsInline = true,
}: VideoProps) {
  const validSrc = src != null && src !== "";
  const titleMissing = title == null || title === "";
  const label = titleMissing ? caption ?? "视频" : title;

  return (
    <figure className="ra-media ra-video">
      <div
        className="ra-media__frame"
        style={width ? { maxWidth: width } : undefined}
      >
        {validSrc ? (
          <video
            className="ra-video__player"
            src={src}
            poster={poster}
            controls={controls}
            preload={preload}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            playsInline={playsInline}
            aria-label={label}
            style={ratio ? { aspectRatio: ratio } : undefined}
          />
        ) : (
          <div className="ra-media__placeholder">
            <MissingField label="视频地址 src" />
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
