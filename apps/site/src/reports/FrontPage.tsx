import {
  Article,
  Hero,
  Lead,
  Section,
  Subsection,
  Aside,
  Table,
  Quote,
  Detail,
  Conclusion,
  Raw,
} from "reacticle";

/*
 * A `bodoni` (Didone broadsheet) feature essay on the death of the front page.
 * The body is the protagonist — a long, ruled, drop-capped editorial — punctuated
 * by austere black-and-white Raw specimens (a front-page schematic, a hairline
 * circulation curve) drawn only in --ra-* tokens. Exactly one Table; gravitas
 * carried by type, scale and hairline rules, never colour. No hype, no jargon.
 */

/* §fold — a front-page schematic split by the legendary fold line. */
function AboveTheFold() {
  return (
    <div
      style={{
        maxWidth: "30rem",
        margin: "0 auto",
        border: "1px solid var(--ra-color-heading)",
      }}
    >
      <div
        style={{
          borderBottom: "1px solid var(--ra-color-heading)",
          padding: "var(--ra-space-3) var(--ra-space-4)",
          textAlign: "center",
          fontFamily: "var(--ra-font-heading)",
          fontWeight: "var(--ra-weight-black)",
          fontSize: "var(--ra-text-xl)",
          letterSpacing: "0.02em",
        }}
      >
        THE DAILY
      </div>
      {/* above the fold */}
      <div style={{ padding: "var(--ra-space-4)" }}>
        <div
          style={{
            fontFamily: "var(--ra-font-heading)",
            fontWeight: "var(--ra-weight-bold)",
            fontSize: "var(--ra-text-lg)",
            lineHeight: 1.1,
            marginBottom: "var(--ra-space-2)",
          }}
        >
          头条：占满版心上半的那一件事
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "var(--ra-space-3)",
            fontSize: "var(--ra-text-xs)",
            color: "var(--ra-color-muted)",
          }}
        >
          <span>次条</span>
          <span>导读</span>
          <span>图片说明</span>
        </div>
      </div>
      {/* the fold */}
      <div
        style={{
          position: "relative",
          borderTop: "1px dashed var(--ra-color-border-strong)",
          textAlign: "center",
        }}
      >
        <span
          style={{
            position: "relative",
            top: "-0.7em",
            background: "var(--ra-color-bg)",
            padding: "0 0.6em",
            fontFamily: "var(--ra-font-label)",
            fontSize: "var(--ra-text-xs)",
            letterSpacing: "var(--ra-tracking-caps)",
            textTransform: "uppercase",
            color: "var(--ra-color-faint)",
          }}
        >
          报纸对折线 · the fold
        </span>
      </div>
      {/* below the fold */}
      <div
        style={{
          padding: "0 var(--ra-space-4) var(--ra-space-4)",
          fontSize: "var(--ra-text-xs)",
          color: "var(--ra-color-faint)",
          lineHeight: 1.6,
        }}
      >
        折线以下：要把报纸翻过来、或从报架上抽出来，才会看见的内容——次要新闻、广告、零碎。
        编辑一生都在争夺折线以上的那几寸。
      </div>
    </div>
  );
}

/* §decline — a hairline circulation curve; ink only, no fills. */
function CirculationCurve() {
  // US weekday newspaper circulation, indexed (illustrative, peak ≈ 100).
  const pts = [
    { y: 1990, v: 100 },
    { y: 1995, v: 96 },
    { y: 2000, v: 90 },
    { y: 2005, v: 84 },
    { y: 2010, v: 66 },
    { y: 2015, v: 51 },
    { y: 2020, v: 39 },
  ];
  const W = 520;
  const H = 200;
  const padL = 36;
  const padB = 26;
  const x = (i: number) => padL + (i / (pts.length - 1)) * (W - padL - 10);
  const y = (v: number) => 10 + (1 - v / 100) * (H - 10 - padB);
  const line = pts.map((p, i) => `${x(i)},${y(p.v)}`).join(" ");
  return (
    <div style={{ overflowX: "auto" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label="美国工作日报纸发行量指数自 1990 年以来的下滑曲线"
        style={{ display: "block" }}
      >
        {/* baseline */}
        <line
          x1={padL}
          y1={H - padB}
          x2={W - 10}
          y2={H - padB}
          stroke="var(--ra-color-border-strong)"
          strokeWidth="1"
        />
        {/* the curve — a hairline */}
        <polyline
          points={line}
          fill="none"
          stroke="var(--ra-color-heading)"
          strokeWidth="1.5"
        />
        {pts.map((p, i) => (
          <g key={p.y}>
            <circle cx={x(i)} cy={y(p.v)} r="2.5" fill="var(--ra-color-heading)" />
            <text
              x={x(i)}
              y={H - padB + 16}
              textAnchor="middle"
              fontSize="10"
              fontFamily="var(--ra-font-label)"
              fill="var(--ra-color-faint)"
            >
              {p.y}
            </text>
          </g>
        ))}
        <text
          x={padL}
          y={y(100) - 6}
          fontSize="10"
          fontFamily="var(--ra-font-label)"
          fill="var(--ra-color-muted)"
        >
          指数 100（1990）
        </text>
      </svg>
    </div>
  );
}

/* Cover — a stopped broadsheet. A masthead double-rule, hairline columns that
 * dissolve as they fall toward the fold, and a towering Didone obituary. */
function FrontPageCover() {
  // hairline "text-block" rows fading into the page below the fold — built
  // deterministically (no randomness) so SSR / hydration stays stable.
  const columns = [
    { x: 56, w: 92 },
    { x: 168, w: 92 },
    { x: 280, w: 92 },
    { x: 392, w: 92 },
    { x: 504, w: 60 },
  ];
  const textBlocks: { x1: number; y: number; x2: number }[] = [];
  for (let y = 150; y < 720; y += 14) {
    for (const c of columns) {
      const seed = (y * 13 + c.x * 7) % 100;
      if (seed < 14) continue;
      const w = Math.max(28, c.w - (seed % 36));
      textBlocks.push({ x1: c.x, y, x2: c.x + w });
    }
  }

  return (
    <section
      className="ra-cover"
      aria-label="文章封面"
      data-ra-cover=""
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "min(100%, 48rem, calc((100vh - 8rem) * 3 / 4))",
        margin: "0 auto var(--ra-space-7, 3rem) auto",
        aspectRatio: "3 / 4",
        overflow: "hidden",
        background: "transparent",
        color: "var(--ra-color-fg, inherit)",
        borderRadius: "var(--ra-radius-md, 0)",
        border: "1px solid var(--ra-color-border, currentColor)",
        isolation: "isolate",
      }}
    >
      {/* Decoration layer — a ghost broadsheet that dissolves below the fold. */}
      <svg
        viewBox="0 0 600 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          color: "var(--ra-color-heading)",
          zIndex: 0,
        }}
      >
        <defs>
          <linearGradient id="fp-cover-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="38%" stopColor="#fff" stopOpacity="0.95" />
            <stop offset="62%" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="86%" stopColor="#fff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="fp-cover-mask">
            <rect width="600" height="800" fill="url(#fp-cover-fade)" />
          </mask>
        </defs>

        {/* column rules — the spine of any broadsheet */}
        <g stroke="currentColor" strokeWidth="0.4" opacity="0.32">
          {[112, 224, 336, 448].map((cx) => (
            <line key={cx} x1={cx} y1="118" x2={cx} y2="720" />
          ))}
        </g>

        {/* dissolving text-block hairlines */}
        <g
          mask="url(#fp-cover-mask)"
          stroke="currentColor"
          strokeWidth="1.4"
          opacity="0.58"
          strokeLinecap="square"
        >
          {textBlocks.map((b, i) => (
            <line key={i} x1={b.x1} y1={b.y} x2={b.x2} y2={b.y} />
          ))}
        </g>

        {/* the legendary fold line */}
        <g opacity="0.5">
          <line
            x1="40"
            y1="430"
            x2="232"
            y2="430"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeDasharray="3 3"
          />
          <line
            x1="368"
            y1="430"
            x2="560"
            y2="430"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeDasharray="3 3"
          />
          <text
            x="300"
            y="434"
            textAnchor="middle"
            fontFamily="var(--ra-font-label, serif)"
            fontSize="9"
            letterSpacing="4"
            fill="currentColor"
          >
            THE FOLD
          </text>
        </g>
      </svg>

      {/* Foreground content — the masthead, the obituary, the closing rule. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          padding:
            "var(--ra-space-5, 1.5rem) var(--ra-space-6, 2rem) var(--ra-space-5, 1.5rem) var(--ra-space-6, 2rem)",
        }}
      >
        {/* Masthead — thick rule over a thin rule, classic bodoni anatomy */}
        <header
          style={{
            borderTop: "4px solid var(--ra-color-heading)",
            borderBottom: "1px solid var(--ra-color-heading)",
            paddingTop: "var(--ra-space-2)",
            paddingBottom: "var(--ra-space-2)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              fontFamily: "var(--ra-font-label)",
              fontSize: "var(--ra-text-xs)",
              letterSpacing: "var(--ra-tracking-caps)",
              textTransform: "uppercase",
              color: "var(--ra-color-muted)",
            }}
          >
            <span>Vol. I · No. ∞</span>
            <span>终刊号</span>
            <span>Final Edition</span>
          </div>
          <div
            style={{
              marginTop: "var(--ra-space-2)",
              fontFamily: "var(--ra-font-heading)",
              fontWeight: "var(--ra-weight-black)",
              fontSize: "clamp(1.4rem, 4.4vw, var(--ra-text-3xl))",
              lineHeight: 1,
              textAlign: "center",
              color: "var(--ra-color-heading)",
              letterSpacing: "0.02em",
            }}
          >
            THE FRONT PAGE
          </div>
          <div
            style={{
              marginTop: "var(--ra-space-1)",
              textAlign: "center",
              fontFamily: "var(--ra-font-body)",
              fontSize: "var(--ra-text-xs)",
              color: "var(--ra-color-faint)",
              letterSpacing: "0.04em",
            }}
          >
            一份停刊的大报 · 媒介与注意力
          </div>
        </header>

        <div style={{ flex: 1 }} />

        {/* The towering Didone obituary */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--ra-font-label)",
              fontSize: "var(--ra-text-xs)",
              letterSpacing: "var(--ra-tracking-caps)",
              textTransform: "uppercase",
              color: "var(--ra-color-muted)",
              marginBottom: "var(--ra-space-4)",
            }}
          >
            — A Requiem for Above the Fold —
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--ra-font-heading)",
              fontWeight: "var(--ra-weight-display)",
              fontSize: "clamp(3.2rem, 14vw, 7.5rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              color: "var(--ra-color-heading)",
            }}
          >
            头版
            <br />
            的消亡
          </h1>
          <div
            style={{
              marginTop: "var(--ra-space-4)",
              fontFamily: "var(--ra-font-heading)",
              fontSize: "var(--ra-text-base)",
              color: "var(--ra-color-muted)",
              maxWidth: "32rem",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.4,
            }}
          >
            当折线消失之后，
            <br />
            我们便不再共享同一个早晨。
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* Closing rules + colophon — bodoni's heavy bottom edge */}
        <footer>
          <div
            style={{
              borderTop: "1px solid var(--ra-color-heading)",
              paddingTop: "var(--ra-space-3)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: "var(--ra-space-3)",
              fontFamily: "var(--ra-font-label)",
              fontSize: "var(--ra-text-xs)",
              letterSpacing: "var(--ra-tracking-caps)",
              textTransform: "uppercase",
              color: "var(--ra-color-muted)",
            }}
          >
            <span>Bodoni · 报刊</span>
            <span>四章 · 一份讣告</span>
            <span>Re/Acticle</span>
          </div>
          <div
            style={{
              borderTop: "3px solid var(--ra-color-heading)",
              marginTop: "var(--ra-space-2)",
            }}
          />
        </footer>
      </div>
    </section>
  );
}

/** bodoni · 特稿 */
export function FrontPage() {
  return (
    <>
      <FrontPageCover />
      <Article toc width="regular">
      <Hero
        eyebrow="特稿 · 媒介"
        title="头版的消亡"
        subtitle="当新闻不再有版面，我们失去的不只是纸张，还有一种关于「什么重要」的公共判断。"
        meta={[
          { label: "栏目", value: "媒介与注意力" },
          { label: "阅读", value: "约 12 分钟" },
        ]}
      />

      <Lead>
        曾经，一座城市的早晨是被同一张纸定义的。无论你同不同意，报纸的头版替所有人做了一个判断：今天，
        这件事最重要。它把世界折叠成一个版面，把版面折叠成一条对折线，再把对折线以上最金贵的几寸，
        留给那个编辑部愿意以信誉担保的判断。如今这张纸正在消失，而随它一起消失的，是那个我们曾共享的、
        关于轻重缓急的公共坐标。
      </Lead>

      <Section index="01" title="一张纸如何替你排序世界">
        <p>
          头版是一种极其昂贵的承诺。版面是有限的，纸张是有限的，油墨与运力都是有限的——正因为一切都稀缺，
          每一个上版的决定都必须有人负责。把哪条新闻放在头条、哪条压到折线以下、哪条干脆不上，这些不是
          算法的偶然，而是一群人坐在一起、以职业声誉做出的取舍。
        </p>
        <Raw title="一张头版的解剖：编辑一生都在争夺折线以上">
          <AboveTheFold />
        </Raw>
        <p>
          这种稀缺性恰恰是它的美德。当版面有限，编辑就必须<strong>排序</strong>；当必须排序，读者就得到了
          一份关于这个世界的、被审慎权衡过的轻重表。你可以不同意那份排序，但你和你的邻居、你的对手，至少
          在争论同一份排序。共识未必来自共同的结论，而是来自共同的议题。
        </p>
        <Aside tone="principle" label="一个判断">
          稀缺不是缺陷，而是责任的来源。当展示一切的成本趋近于零，「选择展示什么」这件事，也悄悄地不再有人负责。
        </Aside>
      </Section>

      <Section index="02" title="无限版面，与判断的退场">
        <p>
          信息流没有折线。它没有头版，没有终版，没有「今天到此为止」。它的版面是无限的，于是排序的责任被
          外包给了一套以停留时长为目标的机器。机器不关心什么重要，只关心什么能让你多停留三秒——而这两件事，
          常常南辕北辙。
        </p>
        <Quote who="一位老报人">
          报纸最珍贵的，从来不是它印了什么，而是它<strong>没有</strong>印什么。
        </Quote>
        <p>
          当版面无限，每个人看到的「头版」都不一样，并且都为他量身定制。这听起来像是进步——终于摆脱了少数
          编辑的傲慢。但代价是：我们失去了那张共同的纸。我们不再为同一份排序争吵，而是各自待在各自的版面里，
          连「什么值得争吵」都不再有共识。
        </p>
        <Subsection index="2.1" title="被折叠掉的，是优先级">
          <p>
            纸的对折线强迫了一种诚实：你只有那么大地方，你必须承认有些事比另一些更重要。信息流取消了对折线，
            也就取消了这种被迫的诚实。一切都可以并列，于是一切都同等重要——而当一切同等重要时，<strong>没有
            什么是重要的</strong>。
          </p>
        </Subsection>
        <Subsection index="2.2" title="纸的消失是真实的">
          <p>
            这不是怀旧的修辞。把发行量画成一条线，下滑是触目惊心的：过去三十年，纸质日报的工作日发行量跌去
            了一大半，且仍在加速。承载头版的物质基础正在崩塌，而新的载体并不打算继承「替公众排序」这份职责。
          </p>
          <Raw title="美国工作日报纸发行量指数（示意，1990 = 100）">
            <CirculationCurve />
          </Raw>
        </Subsection>
      </Section>

      <Section index="03" title="我们到底失去了什么">
        <p>
          把不同载体摊在一起比较，会更清楚这场更替的得失。新载体在数量、速度、个性化上全面碾压旧载体；
          但在那一项最不起眼、也最难替代的能力上——「替一个共同体公开地排序」——它几乎是空白的。
        </p>
        <Table
          caption="三种载体，与它们各自照顾与牺牲的东西"
          columns={[
            { key: "m", label: "载体", width: "9rem" },
            { key: "good", label: "擅长" },
            { key: "lost", label: "代价" },
          ]}
          rows={[
            {
              m: "宽幅大报",
              good: "公开排序、可担责的判断、共同议题",
              lost: "慢、贵、版面稀缺、少数人把关",
            },
            {
              m: "电视新闻",
              good: "即时、覆盖广、仍有统一编排",
              lost: "稍纵即逝、偏重画面、深度有限",
            },
            {
              m: "信息流",
              good: "海量、极快、千人千面、零成本",
              lost: "无公开排序、无人担责、共识瓦解",
            },
          ]}
        />
        <p>
          注意最后一列：被牺牲的恰恰是头版最核心的东西。我们换来了无限与即时，却交出了「一群人愿意为今天
          的轻重缓急署名负责」这件事。这不是某个产品的疏忽，而是「无限版面」这一形态的必然。
        </p>
        <Detail summary="那回到纸上不就行了？">
          <p style={{ margin: 0 }}>
            不必，也不能。问题从来不在纸，而在纸所强制的那份纪律——稀缺、排序、署名负责。真正该被继承下来的，
            是这份纪律，而不是它的物质外壳。能在无限版面里重建出「可担责的排序」的人，才是头版真正的继任者。
          </p>
        </Detail>
        <Detail summary="个性化难道不是好事吗？">
          <p style={{ margin: 0 }}>
            对消费而言往往是；对公共生活而言未必。一个社会需要一些「无论你是谁都会看到的同一件事」，才谈得上
            共同体。完全的个性化在让每个人都舒适的同时，也悄悄拆掉了我们共享现实的最后几根横梁。
          </p>
        </Detail>
      </Section>

      <Section index="04" title="头版之后">
        <p>
          怀念头版，不是怀念铅字与油墨，而是怀念那种被公开承担的判断力。它的继任者不会再是一张纸，但它必须
          重新学会那张纸早已掌握的事：承认版面有限，承认必须排序，承认排序的人要署上自己的名字。
        </p>
        <Aside tone="capability" label="仍然可做的事">
          在你自己的领域里，做一份会被署名的「头版」：公开你的取舍，承认你略过了什么，为你的排序负责。哪怕
          版面只是一封邮件、一个栏目、一页周报——纪律比载体更值得继承。
        </Aside>
      </Section>

      <Conclusion
        title="终版"
        takeaways={[
          "头版的价值不在印了什么，而在公开地替公众排序、并为此署名负责。",
          "稀缺催生责任；无限版面取消了排序，也取消了担责。",
          "我们换来了海量与即时，交出的是共同议题与共享现实。",
          "该继承的是纸的纪律——稀缺、排序、署名——而不是纸本身。",
        ]}
      >
        总有一天，最后一张报纸会印出它的终版。但只要还有人愿意在无限的版面里说出「今天，这件事最重要，
        我为此负责」，头版就没有真正死去——它只是换了一种纸。
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
          · bodoni theme
        </footer>
      </Raw>
    </Article>
    </>
  );
}
