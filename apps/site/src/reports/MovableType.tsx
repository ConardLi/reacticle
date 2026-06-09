import type { ReactNode } from "react";
import {
  Article,
  Hero,
  Lead,
  Section,
  Aside,
  Quote,
  Conclusion,
  Raw,
} from "reacticle";

/*
 * A `press` editorial long read — almost entirely prose, the way a book is. A
 * few pulled quotes and one aside carry the emphasis; Raw is used freely but
 * always as a designed page-insert: an engraved title that settles in, an
 * inked drop cap, a scroll-versus-codex diagram, a timeline of writing's
 * changing medium, and a closing ornament. Each Raw block is hand-drawn for
 * the paragraph beside it, in --ra-* tokens, so it stays warm, restrained, and
 * book-like — never a shared widget, never a marketing hero.
 */

/* ---- bespoke Raw pieces for this essay, used nowhere else ---- */

/** §opening — a title that settles in, with a rule that draws out from center. */
function EngravedTitle({ text }: { text: string }) {
  return (
    <div style={{ textAlign: "center", padding: "var(--ra-space-5) 0 var(--ra-space-3)" }}>
      <style>{`@keyframes mt-settle{from{opacity:0;letter-spacing:.4em}to{opacity:1;letter-spacing:.04em}}@keyframes mt-rule{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
      <div
        style={{
          fontFamily: "var(--ra-font-body)",
          fontSize: "var(--ra-text-3xl)",
          color: "var(--ra-color-heading)",
          animation: "mt-settle .9s ease both",
        }}
      >
        {text}
      </div>
      <div
        style={{
          height: "2px",
          width: "180px",
          margin: "var(--ra-space-3) auto 0",
          background: "var(--ra-color-accent)",
          transform: "scaleX(0)",
          animation: "mt-rule 1s .5s ease forwards",
        }}
      />
    </div>
  );
}

/** §clay — an inked oxide-red drop cap for the essay's first paragraph. */
function DropCap({ cap, children }: { cap: string; children: ReactNode }) {
  return (
    <p style={{ margin: 0 }}>
      <span
        style={{
          float: "left",
          fontFamily: "var(--ra-font-body)",
          fontWeight: "var(--ra-weight-bold)",
          // drop-cap scale derived from a type token so it grows with the theme
          fontSize: "calc(var(--ra-text-4xl) * 1.5)",
          lineHeight: 0.8,
          paddingRight: "var(--ra-space-3)",
          marginTop: "var(--ra-space-1)",
          color: "var(--ra-color-accent)",
        }}
      >
        {cap}
      </span>
      {children}
    </p>
  );
}

/** §codex — a warm editorial diagram: the scroll unrolls, the codex is paged. */
function ScrollVsCodex() {
  return (
    <svg viewBox="0 0 560 200" width="100%" style={{ display: "block" }} role="img" aria-label="卷轴与抄本的对照：线性展开与随机翻阅">
      {/* scroll — a continuous strip with rollers */}
      <g transform="translate(24 70)">
        <rect x="0" y="0" width="220" height="56" fill="var(--ra-color-surface)" stroke="var(--ra-color-border-strong)" />
        <rect x="-12" y="-8" width="12" height="72" rx="6" fill="var(--ra-color-accent-soft)" stroke="var(--ra-color-accent)" />
        <rect x="220" y="-8" width="12" height="72" rx="6" fill="var(--ra-color-accent-soft)" stroke="var(--ra-color-accent)" />
        <g stroke="var(--ra-color-border)">
          <line x1="16" y1="14" x2="204" y2="14" />
          <line x1="16" y1="24" x2="204" y2="24" />
          <line x1="16" y1="34" x2="204" y2="34" />
          <line x1="16" y1="44" x2="176" y2="44" />
        </g>
        <text x="110" y="-18" textAnchor="middle" style={{ fontFamily: "var(--ra-font-label)", fontSize: "11px", fill: "var(--ra-color-accent)" }}>卷轴 · 线性展开</text>
        <text x="110" y="84" textAnchor="middle" style={{ fontFamily: "var(--ra-font-label)", fontSize: "10px", fill: "var(--ra-color-muted)" }}>只能从头读到尾</text>
      </g>
      {/* codex — stacked pages with a bookmark tab */}
      <g transform="translate(330 50)">
        {[18, 12, 6, 0].map((d, i) => (
          <rect key={d} x={d} y={d} width="150" height="96" fill="var(--ra-color-surface)" stroke={i === 3 ? "var(--ra-color-border-strong)" : "var(--ra-color-border)"} />
        ))}
        <g stroke="var(--ra-color-border)">
          <line x1="14" y1="18" x2="130" y2="18" />
          <line x1="14" y1="30" x2="130" y2="30" />
          <line x1="14" y1="42" x2="108" y2="42" />
        </g>
        <rect x="118" y="-6" width="16" height="34" fill="var(--ra-color-accent)" />
        <text x="75" y="-18" textAnchor="middle" style={{ fontFamily: "var(--ra-font-label)", fontSize: "11px", fill: "var(--ra-color-accent)" }}>抄本 · 随机翻阅</text>
        <text x="75" y="124" textAnchor="middle" style={{ fontFamily: "var(--ra-font-label)", fontSize: "10px", fill: "var(--ra-color-muted)" }}>翻到任意一页，前后比对</text>
      </g>
    </svg>
  );
}

/** §screen — a timeline of writing's medium, each era a verb. */
function MediumTimeline() {
  const eras = [
    { year: "前 3200", name: "泥板", verb: "按压" },
    { year: "前 2000", name: "卷轴", verb: "展开" },
    { year: "100", name: "抄本", verb: "翻阅" },
    { year: "1450", name: "活字", verb: "复制" },
    { year: "1990", name: "屏幕", verb: "滚动" },
    { year: "今天", name: "机器", verb: "生成" },
  ];
  const w = 560;
  const ml = 24;
  const mr = 24;
  const y = 56;
  const step = (w - ml - mr) / (eras.length - 1);
  return (
    <svg viewBox={`0 0 ${w} 110`} width="100%" style={{ display: "block" }} role="img" aria-label="文字载体的时间轴">
      <line x1={ml} y1={y} x2={w - mr} y2={y} stroke="var(--ra-color-accent)" strokeWidth="1.4" />
      {eras.map((e, i) => {
        const x = ml + i * step;
        const last = i === eras.length - 1;
        return (
          <g key={e.name}>
            <circle cx={x} cy={y} r={last ? 5 : 3.4} fill={last ? "var(--ra-color-accent)" : "var(--ra-color-surface)"} stroke="var(--ra-color-accent)" strokeWidth="1.4" />
            <text x={x} y={y - 26} textAnchor="middle" style={{ fontFamily: "var(--ra-font-body)", fontSize: "15px", fill: "var(--ra-color-heading)" }}>{e.name}</text>
            <text x={x} y={y - 12} textAnchor="middle" style={{ fontFamily: "var(--ra-font-mono)", fontSize: "9px", fill: "var(--ra-color-faint)" }}>{e.year}</text>
            <text x={x} y={y + 22} textAnchor="middle" style={{ fontFamily: "var(--ra-font-label)", fontSize: "11px", fill: "var(--ra-color-accent)" }}>{e.verb}</text>
          </g>
        );
      })}
    </svg>
  );
}

/** §between sections — a small one-off flourish. */
function Ornament() {
  return (
    <svg viewBox="0 0 240 16" width="200" height="16" style={{ display: "block", margin: "0 auto" }} aria-hidden="true">
      <line x1="20" y1="8" x2="104" y2="8" stroke="var(--ra-color-border-strong)" strokeWidth="1" />
      <line x1="136" y1="8" x2="220" y2="8" stroke="var(--ra-color-border-strong)" strokeWidth="1" />
      <path d="M120 2 L126 8 L120 14 L114 8 Z" fill="var(--ra-color-accent)" />
    </svg>
  );
}

/**
 * Cover —— a book-style 3:4 cover, made of a 4×4 grid of "movable-type" blocks
 * that spell the history of writing media (clay/reed → paper/scroll → movable
 * type → screen), with the title settled at the bottom like a book spine label.
 * Pure CSS + theme tokens, no SVG, no images.
 */
function MovableTypeCover() {
  const blocks = [
    "泥", "苇", "莎", "草",
    "纸", "卷", "抄", "本",
    "活", "字", "印", "刷",
    "机", "器", "屏", "幕",
  ];
  return (
    <section
      className="ra-cover"
      aria-label="封面 · 活字之后"
      data-ra-cover=""
      style={{
        position: "relative",
        width: "100%",
        // 一屏看全：宽度同时受 48rem 上限 + 视口反推 (100vh-8rem)*3/4 约束（8rem
        // 给 site nav / 容器边距留呼吸）；3:4 比例由 aspect-ratio 保证；打印 CSS
        // 会另行覆写为铺满整页。
        maxWidth: "min(100%, 48rem, calc((100vh - 8rem) * 3 / 4))",
        margin: "0 auto var(--ra-space-7, 3rem)",
        aspectRatio: "3 / 4",
        overflow: "hidden",
        background: "transparent",
        color: "var(--ra-color-heading)",
        border: "1px solid var(--ra-color-border)",
        isolation: "isolate",
      }}
    >
      {/* kicker — runs across the top like a book's chapter mark */}
      <div
        style={{
          position: "absolute",
          top: "var(--ra-space-5, 1.25rem)",
          left: "var(--ra-space-6, 1.5rem)",
          right: "var(--ra-space-6, 1.5rem)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "var(--ra-font-body)",
          fontSize: "var(--ra-text-xs)",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "var(--ra-color-muted)",
        }}
      >
        <span>RE · ACTICLE</span>
        <span>书 卷 · 二〇二六</span>
      </div>

      {/* movable-type matrix — 60% of the cover, the "image" of this cover */}
      <div
        style={{
          position: "absolute",
          top: "16%",
          bottom: "34%",
          left: "var(--ra-space-6, 1.5rem)",
          right: "var(--ra-space-6, 1.5rem)",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(4, 1fr)",
          gap: "0.5rem",
        }}
      >
        {blocks.map((ch, i) => {
          const wobble =
            i % 4 === 0 ? "-0.5deg" : i % 5 === 0 ? "0.4deg" : i % 7 === 0 ? "-0.2deg" : "0deg";
          return (
            <div
              key={i}
              style={{
                display: "grid",
                placeItems: "center",
                background: "var(--ra-color-surface)",
                border: "1px solid var(--ra-color-border)",
                color: "var(--ra-color-heading)",
                fontFamily: "var(--ra-font-body)",
                fontSize: "clamp(1.1rem, 4.8vw, 2.6rem)",
                fontWeight: "var(--ra-weight-bold, 700)",
                lineHeight: 1,
                // wood-block feel: inset bottom shadow + tiny drop shadow
                boxShadow:
                  "inset 0 -3px 0 rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.08)",
                transform: `rotate(${wobble})`,
              }}
            >
              {ch}
            </div>
          );
        })}
      </div>

      {/* title block — bottom third, like a spine label */}
      <div
        style={{
          position: "absolute",
          left: "var(--ra-space-6, 1.5rem)",
          right: "var(--ra-space-6, 1.5rem)",
          bottom: "var(--ra-space-6, 1.5rem)",
          display: "grid",
          gap: "var(--ra-space-3, 0.75rem)",
        }}
      >
        <div
          style={{
            height: "2px",
            width: "min(60%, 14rem)",
            background: "var(--ra-color-accent)",
          }}
        />
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--ra-font-body)",
            fontSize: "clamp(2.2rem, 9.5vw, 4.6rem)",
            fontWeight: "var(--ra-weight-bold, 700)",
            lineHeight: 0.95,
            letterSpacing: "0.05em",
            color: "var(--ra-color-heading)",
          }}
        >
          活字之后
        </h1>
        <p
          style={{
            margin: 0,
            fontFamily: "var(--ra-font-body)",
            fontStyle: "italic",
            fontSize: "var(--ra-text-sm)",
            lineHeight: 1.4,
            color: "var(--ra-color-muted)",
            maxWidth: "32rem",
          }}
        >
          从泥板到屏幕 · 文字载体的每一次更替，都在悄悄重写我们思考的形状
        </p>
      </div>
    </section>
  );
}

/** press · 随笔 */
export function MovableType() {
  return (
    <>
      <MovableTypeCover />
      <Article toc>
      <Hero
        eyebrow="随笔 · 书卷"
        title="活字之后"
        subtitle="从泥板到屏幕，文字载体的每一次更替，都在悄悄重写我们思考的形状"
        meta={[
          { label: "作者", value: "ReActicle 编辑部" },
          { label: "栏目", value: "书卷" },
          { label: "篇幅", value: "约 14 分钟" },
        ]}
      />

      <Raw title="为这篇随笔现写的标题">
        <EngravedTitle text="文字住在哪里" />
      </Raw>

      <Lead>
        我们习惯把写作当成一件透明的事：思想在前，文字在后，载体只是个中立的容器。可只要把时间拉长，就会发现
        事情恰好相反——每一种新的载体，都不只是换了个地方放字，它会改变我们写什么、怎么读，甚至怎么想。从一块
        湿润的泥板，到一卷展开的莎草纸，到一本可以翻阅的书，再到今天这块发光的屏幕，文字的居所一变再变，而它
        每搬一次家，思想的形状就跟着挪动一寸。
      </Lead>

      <Section index="01" title="泥与苇：最初的刻痕">
        <Raw>
          <DropCap cap="最">
            早的文字，是按出来的。五千多年前的两河流域，账房先生用削尖的芦苇杆，在一块湿泥板上压出一个个楔形的
            印记，记下谁交了几头羊、几斗麦。写完晾干或一烧，便成了不会更改的凭证。文字最初登场，不是为了抒情，
            而是为了记账——它要解决的，是人脑记不住、口说无凭的麻烦。
          </DropCap>
        </Raw>
        <p>
          泥板这种载体，几乎决定了那时文字的一切性格。它沉、它小、它写起来费力，于是字必须精简，内容必须实用。
          没有人会在泥板上写长篇大论，因为载体本身就在劝你少写。读它也不轻松：你得认得那些抽象的楔形符号，
          还得是被允许识字的少数人。书写在那个年代，是一种权力，而不是一种习惯。
        </p>
        <p>
          但泥板也给了文字一样了不起的东西——持久。说出口的话随风散去，压进泥里的账目却能熬过帝国。人类第一次
          发现，思想可以脱离说话的人而独立存在，可以被搬运、被保存、被几百年后的陌生人重新读起。这是一切的开端：
          载体决定了思想能走多远。
        </p>
      </Section>

      <Section index="02" title="卷起来的世界">
        <p>
          后来文字搬到了更轻的地方。埃及人把莎草的茎压平、拼接成长长的纸面，卷在木轴上；希腊人和罗马人沿用了它。
          比起泥板，莎草纸轻盈得近乎奢侈，于是文字终于可以铺张起来——史诗、哲学、戏剧、书信，都被一卷卷收了进去。
          写作第一次容得下"长"。
        </p>
        <p>
          可卷轴有一个今天的我们几乎无法忍受的限制：它只能线性地读。要找到中间某一段，你得把前面统统展开，读完
          再慢慢卷回去。没有页码，没有目录，更没有"翻到第几页"。读者只能顺着作者铺设的顺序往前走，想回头比对
          前文，得付出很大的力气。载体在这里悄悄立了规矩：思想必须是一条线。
        </p>
        <Quote who="一句关于阅读的老话">
          卷轴请你跟着它走，书却允许你与它争辩。
        </Quote>
        <p>
          于是那个时代的写作，天然偏爱可以一路听下去的形式：吟诵的史诗、连贯的论说、首尾相接的叙事。不是古人
          不懂得结构化的思考，而是他们手里的载体，不鼓励你跳来跳去。形式追随媒介，由来已久。
        </p>
      </Section>

      <Section index="03" title="书的发明">
        <p>
          真正的转折，是一个今天看来朴素到不起眼的发明：把书页裁成一张张，叠起来，沿一边装订——抄本，也就是
          书的雏形。它在头几个世纪里慢慢取代了卷轴，带来的不是一点便利，而是一种全新的阅读方式：随机访问。
          你可以直接翻到任意一页，可以在两处之间反复横跳，可以用手指夹住一页、回头去看另一页。
        </p>
        <Raw title="同样的文字，两种取用方式">
          <ScrollVsCodex />
        </Raw>
        <p>
          这个看似机械的改变，重塑了整个学问的样子。有了页码，才有了引用；有了能随手翻阅的结构，才有了目录、
          索引、脚注、旁批。学者第一次可以把一本书摊在桌上，与另一本对照着读，在空白处写下反驳。阅读从被动的
          接收，变成了主动的检索与对话。书不再只是装思想的盒子，它本身成了一种思考的工具。
        </p>
        <Aside tone="principle" label="核心判断">
          载体一旦允许"随时回头、随处比对"，思想就不必再是一条直线，而可以是一张可以反复进出的网。
        </Aside>
        <Raw>
          <Ornament />
        </Raw>
      </Section>

      <Section index="04" title="一次可以复制的革命">
        <p>
          抄本解决了"怎么读"，却没解决"有多少"。在很长的时间里，每一本书都得靠手一字一句地抄，慢、贵、且容易
          抄错。知识被锁在少数修道院和藏书楼里，能读书的人，先得是能接触到书的人。直到十五世纪中叶，谷登堡把
          活字、油墨与压印机凑到一起——在他之前，毕昇早已在东方试过泥活字——文字迎来了它最剧烈的一次搬家：
          从"抄"变成"印"。
        </p>
        <p>
          可以复制，意味着可以便宜，可以普及，也意味着可以统一。同一本书，成百上千份一模一样地流向各地，文本
          第一次有了"标准版本"。识字不再是特权，阅读开始成为寻常人家的事；思想可以在几个月里传遍一个大陆，
          而不是几十年。后来的宗教改革、科学革命、报纸与公共舆论，都站在这台机器投下的长长影子里。
        </p>
        <Quote who="马歇尔·麦克卢汉" source="《理解媒介》">
          媒介即讯息——我们如何承载内容，往往比内容本身影响更深。
        </Quote>
        <p>
          值得玩味的是，印刷也带来了它自己的代价。文本一旦被大量复制、固定成铅字，就变得权威而难以更改；读者
          从可以在抄本边缘随手涂写的参与者，渐渐退回到一个安静的接收者。每一次载体的进步，都在某处悄悄收走一点
          别的东西——这几乎是一条规律。
        </p>
      </Section>

      <Section index="05" title="页面消失之后">
        <p>
          然后是屏幕。文字搬进了一块会发光的玻璃，又一次彻底换了性格。超链接让它不再有固定的先后，一段话可以
          通向无数别的段落；无限滚动让"页"这个概念慢慢溶解，我们不再翻页，只是往下、再往下。书写工具也跟着
          轻量化：Markdown 用几个符号就把排版从作者肩上卸下，井号变标题，星号变强调，少到可以盲打。
        </p>
        <Raw title="文字的居所，与它带来的动作">
          <MediumTimeline />
        </Raw>
        <p>
          把这条时间轴连起来看，会发现一个有趣的节奏：每一种载体都对应一个动词。泥板是按压，卷轴是展开，抄本是
          翻阅，活字是复制，屏幕是滚动。我们与文字相处的姿势，一直在被载体重新定义。屏幕让一切变得更快、更轻、
          更易得，却也让阅读变得更浅——我们滚动得越来越多，停留得越来越少。
        </p>
        <p>
          更微妙的是，到了屏幕这一代，许多文字其实不再是写给人读的。它们是中间产物：写给搜索引擎、写给排版系统、
          写给另一段程序去解析。Markdown 的轻快之所以够用，正因为很多时候，最终读它的并不是人的眼睛。载体又一次
          走到了一个临界点上。
        </p>
      </Section>

      <Section index="06" title="当执笔的换成机器">
        <p>
          于是我们站在了下一次搬家的门口。这一回变的不是文字住在哪里，而是谁在执笔——越来越多的文章，初稿出自
          机器之手。这件事重新打开了那个最古老的问题：当作者不再是人，一篇文章，到底应该长什么样？
        </p>
        <p>
          答案大概率不会是"让机器把字按进泥板"，也不该是"让它把纯文本一路滚到底"。机器擅长的是稳定与结构，
          它可以毫不费力地交出一篇有层次、可检索、能交互的长文——这恰恰是卷轴给不了、抄本梦寐以求、而屏幕一度
          为了轻快而舍弃的东西。换句话说，新的执笔者，或许正适合把"随机翻阅"与"长篇铺张"这两样好处，第一次
          同时握在手里。
        </p>
        <p>
          历史给的提示很清楚：每一次载体更替，真正的赢家都不是更炫的技术，而是更懂得"如何安放思想"的那一方。
          泥板教会我们持久，卷轴教会我们铺张，抄本教会我们检索，活字教会我们普及。轮到机器执笔，要守住的也无非
          还是这件老事——让一篇文章，依然值得被人认真读完。
        </p>
      </Section>

      <Conclusion title="结语">
        文字从不只是住在它的载体里，它被载体塑形。泥板让它持久，卷轴让它成线，书让它成网，活字让它普及，屏幕
        让它轻快——每一次搬家，都既是一次解放，也是一次取舍。如今它又要换一个执笔人，我们能做的，是别只顾着惊叹
        新居所的明亮，而忘了去问那个穿越了五千年的问题：这一次，我们想让思想，活成什么形状。
      </Conclusion>
      <Raw title="">
        <footer
          style={{
            marginTop: "var(--ra-space-7, 3rem)",
            paddingTop: "var(--ra-space-4, 1rem)",
            borderTop: "1px solid var(--ra-color-border, currentColor)",
            color: "var(--ra-color-muted, inherit)",
            fontSize: "var(--ra-text-xs, 0.78rem)",
            textAlign: "center",
            letterSpacing: "0.02em",
            opacity: 0.85,
          }}
        >
          Made with{" "}
          <a
            href="https://github.com/ConardLi/garden-skills"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "inherit",
              textDecoration: "underline",
              textUnderlineOffset: "0.2em",
            }}
          >
            beautiful-article
          </a>{" "}
          · press theme
        </footer>
      </Raw>
    </Article>
    </>
  );
}
