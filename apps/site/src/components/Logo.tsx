/** Monospace wordmark with a blinking vermillion caret — the site's mark. */
export function Logo() {
  return (
    <a className="logo" href="#/" aria-label="ReActicle 首页">
      ReActicle
      <span className="logo__caret" aria-hidden="true" />
    </a>
  );
}
