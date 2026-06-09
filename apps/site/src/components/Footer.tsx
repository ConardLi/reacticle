import { REPO_URL, VERSION } from "../lib/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="logo">
            ReActicle<span className="logo__caret" aria-hidden="true" />
          </span>
          <p>
            AI 时代的 HTML 文章协议。用受限的语义化 React 组件，生成稳定、漂亮、
            可交互、自包含的 HTML 文章与报告。
          </p>
        </div>
        <div className="footer__cols">
          <div className="footer__col">
            <h4>指南</h4>
            <a href="#/start">开始使用</a>
            <a href="#/theming">主题契约</a>
            <a href="#/architecture">工程架构</a>
          </div>
          <div className="footer__col">
            <h4>组件 & 演示</h4>
            <a href="#/components">组件总览</a>
            <a href="#/components#cat-decision">决策组件</a>
            <a href="#/gallery">效果演示</a>
          </div>
          <div className="footer__col">
            <h4>项目</h4>
            <a href={REPO_URL} target="_blank" rel="noreferrer noopener">
              GitHub
            </a>
            <a href={`${REPO_URL}/issues`} target="_blank" rel="noreferrer noopener">
              Issues
            </a>
            <a href={`${REPO_URL}/blob/main/README.md`} target="_blank" rel="noreferrer noopener">
              README
            </a>
          </div>
        </div>
      </div>
      <div className="footer__base mono">
        ReActicle {VERSION} · MIT License · Constraint is the default, freedom is
        the escape hatch.
      </div>
    </footer>
  );
}
