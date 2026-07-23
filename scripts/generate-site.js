const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const siteOrigin = (process.env.SITE_ORIGIN || "https://example.com").replace(/\/$/, "");
const siteName = "Tournament Schedule Tools";
const gaMeasurementId = process.env.GA_MEASUREMENT_ID || "G-FRBEHZZ2T5";
const pages = JSON.parse(fs.readFileSync(path.join(root, "planning", "page-map.json"), "utf8")).pages;
const validLocalUrls = new Set(["/", "/tools/", "/guides/", ...pages.map((page) => page.url)]);
const hrefAliases = new Map([
  ["/schedule-maker/", "/tournament-schedule-maker/"],
  ["/tools/tournament-schedule-generator/", "/tournament-schedule-maker/"],
  ["/tools/round-robin-generator/", "/round-robin-generator/"],
  ["/tools/tournament-bracket/", "/tournament-bracket-maker/"],
  ["/double-elimination-bracket/", "/double-elimination-bracket-generator/"],
  ["/tools/double-elimination-bracket/", "/double-elimination-bracket-generator/"],
  ["/tools/single-elimination-bracket/", "/single-elimination-bracket-generator/"],
  ["/league-fixture-maker/", "/league-schedule-maker/"],
  ["/tools/league-standings/", "/league-schedule-maker/"],
  ["/team-generator/", "/round-robin-generator/"],
  ["/team-scheduler/", "/round-robin-generator/"],
  ["/seating-chart-maker/", "/classroom-tournament-bracket/"]
]);

const trustPages = [
  {
    url: "/about/",
    title: "About",
    description: "Tournament Schedule Tools helps organizers make fair brackets, round robin schedules, fixtures, and printable match lists without spreadsheet errors.",
    body: [
      "Tournament Schedule Tools is built for people who have to run real events: teachers, office organizers, coaches, club admins, PE staff, and casual tournament hosts.",
      "The site focuses on practical scheduling problems: byes, odd participant counts, court limits, match order, print views, and clean exports. Every core page starts with a usable tool before adding explanations.",
      "The project is intentionally narrow. It does not try to be a full league-management platform with registrations, payments, or standings accounts. Its job is to help an organizer turn a list of teams into a schedule that can be reviewed and shared.",
      "Generated schedules should still be checked before a real event. Venue rules, tie-breakers, eligibility, late arrivals, and sport-specific rules can change what a final schedule should look like."
    ]
  },
  {
    url: "/how-it-works/",
    title: "How It Works",
    description: "Learn how the bracket, round robin, fixture, court assignment, and fairness checks work.",
    body: [
      "Round robin schedules use a rotation method so each participant faces every other participant once. Odd participant counts receive a bye each round.",
      "Single elimination brackets expand to the next power of two, then assign byes where needed. Time slots and courts are assigned from the match order so the schedule can be copied, printed, or exported.",
      "Double elimination pages create a practical winners-bracket outline plus losers-bracket planning rows. Formal double-elimination events may still need custom rules for bracket resets, finals format, and seeding.",
      "Fairness checks count games, byes, court use, and home or away balance where the format supports it. These checks help organizers spot problems; they do not replace final review."
    ]
  },
  {
    url: "/privacy/",
    title: "Privacy Policy",
    description: "Privacy notes for Tournament Schedule Tools.",
    body: [
      "The scheduling tools run in your browser. Participant names you enter are used to generate the schedule on the page and are not required to create an account.",
      "The site uses Google Analytics and basic hosting logs to understand aggregate page performance, device types, referrers, and popular tools. Analytics is not used to collect sensitive tournament data or participant lists."
    ]
  },
  {
    url: "/terms/",
    title: "Terms",
    description: "Terms of use for Tournament Schedule Tools.",
    body: [
      "Use the tools for planning and organizing events. Always review generated schedules before publishing them for a real tournament.",
      "The site provides scheduling help as-is. Event organizers remain responsible for rules, eligibility, venue safety, and final match decisions."
    ]
  },
  {
    url: "/contact/",
    title: "Contact",
    description: "Contact Tournament Schedule Tools for corrections, feature ideas, and site feedback.",
    body: [
      "Use this page after launch to report corrections, bug reports, missing formats, and requests for sport-specific schedule pages.",
      "Helpful reports include the page URL, number of teams, selected format, court count, start time, match length, and what looked wrong in the generated schedule.",
      "Recommended contact inbox: replace this placeholder after the domain is finalized."
    ]
  }
];

function ensureCleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(urlPath, html) {
  const dir = path.join(publicDir, urlPath.replace(/^\//, ""));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
}

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function slugToDraft(page) {
  const fileSlug = page.url.replace(/^\//, "").replace(/\/$/, "").replace(/\//g, "-");
  return path.join(root, "content-drafts", `${String(page.rank).padStart(2, "0")}-${fileSlug}.md`);
}

function stripRelated(markdown) {
  return markdown.split(/\n## Related Tools|\n### Related Tools/)[0].trim();
}

function renderInline(text) {
  return esc(text)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => `<a href="${esc(normalizeHref(href))}">${label}</a>`);
}

function normalizeHref(href) {
  if (!href.startsWith("/")) return href;
  const clean = href.endsWith("/") ? href : `${href}/`;
  if (validLocalUrls.has(clean)) return clean;
  if (hrefAliases.has(clean)) return hrefAliases.get(clean);
  return "/tools/";
}

function markdownToHtml(markdown) {
  const lines = stripRelated(markdown).split(/\r?\n/);
  const out = [];
  let list = null;
  let para = [];

  function flushPara() {
    if (!para.length) return;
    out.push(`<p>${renderInline(para.join(" "))}</p>`);
    para = [];
  }

  function closeList() {
    if (!list) return;
    out.push(`</${list}>`);
    list = null;
  }

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushPara();
      closeList();
      continue;
    }
    if (line.startsWith("# ")) continue;
    if (line.startsWith("### ")) {
      flushPara();
      closeList();
      out.push(`<h3>${renderInline(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith("## ")) {
      flushPara();
      closeList();
      out.push(`<h2>${renderInline(line.slice(3))}</h2>`);
      continue;
    }
    const ordered = line.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      flushPara();
      if (list !== "ol") {
        closeList();
        list = "ol";
        out.push("<ol>");
      }
      out.push(`<li>${renderInline(ordered[1])}</li>`);
      continue;
    }
    if (line.startsWith("- ")) {
      flushPara();
      if (list !== "ul") {
        closeList();
        list = "ul";
        out.push("<ul>");
      }
      out.push(`<li>${renderInline(line.slice(2))}</li>`);
      continue;
    }
    closeList();
    para.push(line.replace(/\s{2,}$/, ""));
  }
  flushPara();
  closeList();
  return out.join("\n");
}

function pageDescription(page) {
  if (page.url === "/guides/third-place-playoff/") {
    return "What a third-place playoff is, who plays, when to schedule the bronze-medal match, and when a consolation bracket is the better choice.";
  }
  const base = {
    tool: `Use this ${page.keyword} to create fair matchups, byes, court assignments, time slots, print views, and CSV exports.`,
    guide: `${page.title}: a practical guide for planning fair tournaments, brackets, round robins, byes, and schedules.`
  };
  return (page.page_type === "guide" ? base.guide : base.tool).slice(0, 158);
}

function userProblemText(value) {
  return String(value || "")
    .replace(/^Users need to /, "Use this when you need to ")
    .replace(/^Users need /, "Use this when you need ")
    .replace(/^Users want /, "Use this when you want ")
    .replace(/^Tournament organizers need /, "Use this when organizers need ")
    .replace(/^Pickleball organizers need /, "Use this when pickleball organizers need ")
    .replace(/^Cornhole event organizers need /, "Use this when cornhole organizers need ")
    .replace(/^Ping pong organizers need /, "Use this when ping pong organizers need ")
    .replace(/^Esports organizers need /, "Use this when esports organizers need ");
}

function pagePath(page) {
  return page.url;
}

function canonical(url) {
  return `${siteOrigin}${url}`;
}

function sampleRowsFor(page) {
  const countMatch = String(page.slug || "").match(/^(\d+)-team/);
  const teams = defaultParticipants(page);
  const count = countMatch ? Number(countMatch[1]) : Math.min(8, teams.length);
  const sampleTeams = teams.slice(0, Math.max(4, Math.min(count, 8)));
  const mode = (page.tool_modes || ["single_elimination"])[0];
  if (mode === "round_robin" || page.cluster === "size") {
    const rotation = roundRobinReferenceRows(sampleTeams);
    return {
      label: `${sampleTeams.length}-team round robin preview`,
      note: countMatch
        ? `This fixed reference contains all ${count * (count - 1) / 2} matchups. The live tool regenerates it with your names, courts, start time, and match length.`
        : "The live tool will regenerate this table with your teams, courts, start time, and match length.",
      metrics: [
        ["Rounds", rotation.rounds],
        ["Games", rotation.rows.filter((row) => row[2] !== "BYE").length],
        ["Courts", 2],
        ["Byes", rotation.rows.filter((row) => row[2] === "BYE").length]
      ],
      rows: rotation.rows
    };
  }
  if (mode === "double_elimination") {
    return {
      label: "Double elimination preview",
      note: "The live tool creates winners-bracket rows plus losers-bracket planning rows for review.",
      metrics: [["Entrants", sampleTeams.length], ["Minimum losses", 2], ["Courts", 2], ["Export", "CSV"]],
      rows: [
        ["Winners R1", sampleTeams[0], sampleTeams.at(-1), "Court 1", "09:00"],
        ["Winners R1", sampleTeams[1], sampleTeams.at(-2), "Court 2", "09:00"],
        ["Losers R1", "Loser match 1", "Loser match 2", "Court 1", "09:30"],
        ["Winners R2", "Winner match 1", "Winner match 2", "Court 2", "09:30"]
      ]
    };
  }
  if (mode === "league_schedule") {
    return {
      label: "League fixture preview",
      note: "Use league fixtures when matches are spread across dates instead of one short bracket session.",
      metrics: [["Fixtures", 4], ["Rounds", 2], ["Venues", 2], ["Export", "CSV"]],
      rows: [
        ["Week 1", sampleTeams[0], sampleTeams[1], "Venue 1", "09:00"],
        ["Week 1", sampleTeams[2], sampleTeams[3], "Venue 2", "09:00"],
        ["Week 2", sampleTeams[0], sampleTeams[2], "Venue 1", "09:30"],
        ["Week 2", sampleTeams[1], sampleTeams[3], "Venue 2", "09:30"]
      ]
    };
  }
  return {
    label: `${sampleTeams.length}-team bracket preview`,
    note: "The live tool will place byes automatically when the entrant count does not fill the bracket cleanly.",
    metrics: [["Entrants", sampleTeams.length], ["Rounds", Math.ceil(Math.log2(sampleTeams.length))], ["Byes", Math.pow(2, Math.ceil(Math.log2(sampleTeams.length))) - sampleTeams.length], ["Export", "CSV"]],
    rows: [
      ["Round 1", sampleTeams[0], sampleTeams.at(-1), "Court 1", "09:00"],
      ["Round 1", sampleTeams[1], sampleTeams.at(-2), "Court 2", "09:00"],
      ["Semifinal", "Winner match 1", "Winner match 2", "Court 1", "09:30"],
      ["Final", "Winner semifinal 1", "Winner semifinal 2", "Court 1", "10:00"]
    ]
  };
}

function roundRobinReferenceRows(teamNames) {
  const slots = [...teamNames];
  if (slots.length % 2) slots.push("BYE");
  const rounds = slots.length - 1;
  const half = slots.length / 2;
  const rows = [];
  for (let round = 0; round < rounds; round++) {
    for (let index = 0; index < half; index++) {
      const home = slots[index];
      const away = slots[slots.length - 1 - index];
      const hasBye = home === "BYE" || away === "BYE";
      rows.push([
        `Round ${round + 1}`,
        hasBye ? (home === "BYE" ? away : home) : home,
        hasBye ? "BYE" : away,
        hasBye ? "Rest" : `Court ${index + 1}`,
        hasBye ? "-" : "09:00"
      ]);
    }
    slots.splice(1, 0, slots.pop());
  }
  return { rounds, rows };
}

function validateRoundRobinReferences() {
  for (const count of [5, 6, 7, 8, 9, 10, 12]) {
    const teams = Array.from({ length: count }, (_, index) => `Team ${index + 1}`);
    const rotation = roundRobinReferenceRows(teams);
    const games = rotation.rows.filter((row) => row[2] !== "BYE");
    const byes = rotation.rows.filter((row) => row[2] === "BYE");
    const pairs = new Set(games.map((row) => [row[1], row[2]].sort().join("|")));
    const expectedGames = count * (count - 1) / 2;
    const expectedRounds = count % 2 ? count : count - 1;
    if (games.length !== expectedGames || pairs.size !== expectedGames || rotation.rounds !== expectedRounds) {
      throw new Error(`Invalid ${count}-team round robin reference`);
    }
    if ((count % 2 && byes.length !== count) || (count % 2 === 0 && byes.length !== 0)) {
      throw new Error(`Invalid ${count}-team bye rotation`);
    }
  }
}

function sampleOutputHtml(page) {
  const sample = sampleRowsFor(page);
  return `<div class="sample-output" aria-label="${esc(sample.label)}">
    <p><strong>${esc(sample.label)}</strong> ${esc(sample.note)}</p>
    <div class="fairness-grid static-metrics">${sample.metrics.map(([label, value]) => `<div class="metric"><strong>${esc(value)}</strong><span>${esc(label)}</span></div>`).join("")}</div>
    <table><thead><tr><th>Round</th><th>Home</th><th>Away</th><th>Court</th><th>Time</th></tr></thead><tbody>${sample.rows.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table>
  </div>`;
}

function nav(currentUrl = "") {
  const items = [
    ["/", "Home"],
    ["/tools/", "Tools"],
    ["/guides/", "Guides"],
    ["/tournament-schedule-maker/", "Schedule Maker"],
    ["/round-robin-generator/", "Round Robin"],
    ["/tournament-bracket-maker/", "Bracket Maker"],
    ["/guides/how-to-make-a-fair-tournament-schedule/", "Fair Scheduling"]
  ];
  return `<nav class="site-nav" aria-label="Main navigation">${items.map(([href, label]) => `<a ${href === currentUrl ? 'aria-current="page"' : ""} href="${href}">${label}</a>`).join("")}</nav>`;
}

function header(currentUrl = "") {
  return `<header class="site-header">
    <a class="brand" href="/" aria-label="${siteName} home">
      <span class="brand-mark">TS</span>
      <span>${siteName}</span>
    </a>
    ${nav(currentUrl)}
  </header>`;
}

function footer() {
  return `<footer class="site-footer">
    <div>
      <strong>${siteName}</strong>
      <p>Fair brackets, round robins, fixtures, byes, print views, and exports for real events.</p>
    </div>
    <nav aria-label="Footer navigation">
      <a href="/about/">About</a>
      <a href="/how-it-works/">How it works</a>
      <a href="/privacy/">Privacy</a>
      <a href="/terms/">Terms</a>
      <a href="/contact/">Contact</a>
    </nav>
  </footer>`;
}

function jsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function breadcrumbSchema(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonical(item.url)
    }))
  };
}

function extractFaq(markdown) {
  const text = stripRelated(markdown);
  const faqStart = text.search(/## Common Questions|### Common Questions/i);
  if (faqStart < 0) return [];
  const lines = text.slice(faqStart).split(/\r?\n/);
  const faqs = [];
  let current = null;
  for (const raw of lines) {
    const line = raw.trim();
    const q = line.match(/^\*\*([^*?]+\?)\*\*/);
    if (q) {
      if (current) faqs.push(current);
      current = { q: q[1], a: line.replace(q[0], "").replace(/^[:\s]+/, "") };
      continue;
    }
    if (current && line && !line.startsWith("##") && !line.startsWith("###")) {
      current.a += `${current.a ? " " : ""}${line.replace(/^\-\s+/, "")}`;
    }
  }
  if (current) faqs.push(current);
  return faqs.slice(0, 6).filter((f) => f.q && f.a);
}

function schemaForPage(page, markdown) {
  const datePublished = page.date_published || "2026-05-28";
  const dateModified = page.date_modified || datePublished;
  const graph = [
    {
      "@type": "Organization",
      "@id": `${siteOrigin}/#organization`,
      name: siteName,
      url: `${siteOrigin}/`
    },
    {
      "@type": "WebSite",
      "@id": `${siteOrigin}/#website`,
      name: siteName,
      url: `${siteOrigin}/`,
      publisher: { "@id": `${siteOrigin}/#organization` }
    },
    breadcrumbSchema([
      { name: "Home", url: "/" },
      page.page_type === "guide" ? { name: "Guides", url: "/guides/" } : { name: "Tools", url: "/tools/" },
      { name: page.title, url: page.url }
    ]),
    {
      "@type": page.page_type === "guide" ? "Article" : "WebPage",
      "@id": `${canonical(page.url)}#webpage`,
      url: canonical(page.url),
      name: page.title,
      headline: page.title,
      description: pageDescription(page),
      isPartOf: { "@id": `${siteOrigin}/#website` },
      publisher: { "@id": `${siteOrigin}/#organization` },
      datePublished,
      dateModified
    }
  ];

  if (page.page_type === "tool") {
    graph.push({
      "@type": "WebApplication",
      "@id": `${canonical(page.url)}#app`,
      name: page.title,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      url: canonical(page.url),
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: ["Tournament scheduling", "Bracket generation", "Round robin scheduling", "Court assignment", "CSV export", "Print view"]
    });
  }

  const faqs = extractFaq(markdown);
  if (faqs.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonical(page.url)}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a.replace(/\*\*/g, "") }
      }))
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

function layout({ title, description, url, body, schema, currentUrl = "" }) {
  const fullTitle = title === siteName ? siteName : `${title} | ${siteName}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${canonical(url)}">
  <meta name="theme-color" content="#17463a">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${siteName}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical(url)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="stylesheet" href="/assets/styles.css">
  <script async src="https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","${gaMeasurementId}",{anonymize_ip:true});</script>
  ${jsonLd(schema)}
</head>
<body>
  ${header(currentUrl)}
  ${body}
  ${footer()}
  <script src="/assets/app.js" defer></script>
</body>
</html>`;
}

function toolHtml(page) {
  const modes = page.tool_modes || ["single_elimination"];
  const participants = defaultParticipants(page);
  return `<section class="tool-shell" data-tool data-default-mode="${esc(modes[0])}">
    <div class="tool-panel">
      <div class="field-block">
        <label for="participants-${page.slug}">Teams or players</label>
        <textarea id="participants-${page.slug}" data-participants rows="8">${participants.map(esc).join("\n")}</textarea>
      </div>
      <div class="control-grid">
        <label>Format
          <select data-mode>
            ${modes.includes("single_elimination") ? '<option value="single_elimination">Single elimination</option>' : ""}
            ${modes.includes("double_elimination") ? '<option value="double_elimination">Double elimination</option>' : ""}
            ${modes.includes("round_robin") ? '<option value="round_robin">Round robin</option>' : ""}
            ${modes.includes("league_schedule") ? '<option value="league_schedule">League fixtures</option>' : ""}
          </select>
        </label>
        <label>Courts or venues
          <input data-courts type="number" min="1" max="24" value="2">
        </label>
        <label>Start time
          <input data-start type="time" value="09:00">
        </label>
        <label>Match length
          <input data-length type="number" min="5" max="240" value="30">
        </label>
        <label>Seeding
          <select data-seeding>
            <option value="manual">Use entered order</option>
            <option value="shuffle">Randomize first</option>
          </select>
        </label>
      </div>
      <div class="actions">
        <button class="primary" data-generate type="button">Generate schedule</button>
        <button data-copy type="button">Copy</button>
        <button data-csv type="button">CSV</button>
        <button data-print type="button">Print</button>
      </div>
      <p class="tool-note" data-status>Enter one participant per line. The tool handles byes and court assignment.</p>
    </div>
    <div class="result-panel" aria-live="polite">
      <div class="result-head">
        <h2>Generated schedule</h2>
        <span data-summary-pill>Ready</span>
      </div>
      <div data-fairness class="fairness-grid"></div>
      <div data-results class="results-table">${sampleOutputHtml(page)}</div>
    </div>
  </section>`;
}

function defaultParticipants(page) {
  const match = String(page.slug || "").match(/^(\d+)-team/);
  const count = match ? Number(match[1]) : 8;
  const names = [
    "Falcons", "Lions", "Tigers", "Sharks", "Rangers", "Wolves", "Eagles", "Panthers",
    "Hawks", "Bears", "Raptors", "Comets", "Royals", "Storm", "Knights", "Spartans",
    "Raiders", "Pioneers", "Titans", "Warriors", "Blazers", "United", "City", "North",
    "South", "East", "West", "Red", "Blue", "Gold", "Green", "Silver"
  ];
  return names.slice(0, count);
}

function relatedPages(page) {
  const sameCluster = pages.filter((p) => p.url !== page.url && p.cluster === page.cluster).slice(0, 3);
  const core = pages.filter((p) => p.url !== page.url && ["core", "format"].includes(p.cluster)).slice(0, 3);
  const chosen = [...sameCluster, ...core].filter((item, index, arr) => arr.findIndex((x) => x.url === item.url) === index).slice(0, 5);
  return `<section class="link-band" aria-labelledby="related-heading">
    <h2 id="related-heading">Related planning pages</h2>
    <div class="link-grid">${chosen.map((item) => `<a href="${item.url}"><strong>${item.title}</strong><span>${esc(userProblemText(item.user_problem))}</span></a>`).join("")}</div>
  </section>`;
}

function renderPage(page) {
  const markdown = fs.readFileSync(slugToDraft(page), "utf8");
  const content = markdownToHtml(markdown);
  const intro = page.page_type === "tool"
    ? toolHtml(page)
    : `<section class="guide-summary"><p>${esc(userProblemText(page.user_problem))}</p><a class="primary-link" href="/tournament-schedule-maker/">Open the schedule maker</a></section>`;
  const body = `<main>
    <section class="hero compact">
      <div>
        <p class="eyebrow">${esc(page.cluster === page.page_type ? page.cluster : `${page.cluster} ${page.page_type}`)}</p>
        <h1>${esc(page.title)}</h1>
        <p>${esc(userProblemText(page.user_problem))}</p>
      </div>
    </section>
    ${intro}
    <article class="content-body">
      ${content}
    </article>
    ${relatedPages(page)}
  </main>`;
  return layout({
    title: page.title,
    description: pageDescription(page),
    url: page.url,
    currentUrl: page.url,
    body,
    schema: schemaForPage(page, markdown)
  });
}

function renderHome() {
  const top = pages.slice(0, 6);
  const body = `<main>
    <section class="hero">
      <div>
        <p class="eyebrow">Tournament schedule maker</p>
        <h1>Build fair brackets, round robins, and fixtures without spreadsheet cleanup.</h1>
        <p>Create matchups, handle byes, assign courts, add time slots, print the schedule, and export CSV from one browser-based tool.</p>
      </div>
    </section>
    ${toolHtml({ slug: "home", tool_modes: ["single_elimination", "round_robin", "league_schedule"] })}
    <section class="section-wrap">
      <h2>Start with the format you need</h2>
      <div class="card-grid">${top.map((page) => `<a class="page-card" href="${page.url}"><span>${esc(page.cluster)}</span><strong>${esc(page.title)}</strong><p>${esc(userProblemText(page.user_problem))}</p></a>`).join("")}</div>
    </section>
    <section class="section-wrap two-col">
      <div>
        <h2>Built for real scheduling constraints</h2>
        <p>Generic bracket tools often stop at the visual bracket. This site adds the details organizers actually need: byes, match order, venue limits, printable views, exports, and a quick fairness check.</p>
      </div>
      <ul class="check-list">
        <li>Works for odd or even participant counts</li>
        <li>Round robin rotation avoids duplicate matchups</li>
        <li>Courts and time slots are assigned automatically</li>
        <li>CSV, copy, and print controls are available on tool pages</li>
      </ul>
    </section>
    <section class="section-wrap">
      <h2>Worked schedules you can inspect before editing</h2>
      <div class="card-grid">
        <a class="page-card" href="/7-team-round-robin/"><span>7 teams</span><strong>7-team round robin schedule</strong><p>See all 21 games, seven rounds, and the rotating bye before replacing the sample names.</p></a>
        <a class="page-card" href="/double-elimination-bracket-generator/"><span>two-loss format</span><strong>Double elimination bracket generator</strong><p>Plan winners-bracket and losers-bracket paths, then check the final reset rule.</p></a>
      </div>
    </section>
  </main>`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${siteOrigin}/#organization`, name: siteName, url: `${siteOrigin}/` },
      { "@type": "WebSite", "@id": `${siteOrigin}/#website`, name: siteName, url: `${siteOrigin}/`, publisher: { "@id": `${siteOrigin}/#organization` } },
      { "@type": "WebApplication", "@id": `${siteOrigin}/#app`, name: "Tournament Schedule Maker", applicationCategory: "UtilitiesApplication", operatingSystem: "Any", url: `${siteOrigin}/`, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
      { "@type": "WebPage", "@id": `${siteOrigin}/#webpage`, url: `${siteOrigin}/`, name: siteName, description: "Create tournament brackets, round robin schedules, fixtures, byes, court assignments, print views, and CSV exports." }
    ]
  };
  return layout({
    title: "Tournament Schedule Tools",
    description: "Create fair tournament brackets, round robin schedules, league fixtures, byes, court assignments, print views, and CSV exports.",
    url: "/",
    currentUrl: "/",
    body,
    schema
  });
}

function renderToolsIndex() {
  const groups = [...new Set(pages.map((p) => p.cluster))];
  const priorityUrls = [
    "/round-robin-generator/",
    "/fixture-generator/",
    "/tournament-schedule-maker/",
    "/double-elimination-bracket-generator/",
    "/pool-play-schedule-generator/"
  ];
  const priorityPages = priorityUrls.map((url) => pages.find((p) => p.url === url)).filter(Boolean);
  const groupNotes = {
    core: "Start here when you need the main schedule workflow: generate matchups, assign venues or courts, print, copy, or export CSV.",
    format: "Use these when the tournament format is already decided and you need a bracket or schedule for that format.",
    export: "Use these pages when the output needs to be printed, copied, or edited outside the browser.",
    size: "Use fixed team-count pages when you want exact rounds, total games, and bye behavior for a specific field size.",
    sport: "Use sport-specific pages when the event has familiar organizer constraints such as courts, tables, fields, or casual bracket rules.",
    guide: "Use guides when you need to decide rules before generating the final schedule."
  };
  const body = `<main>
    <section class="hero compact">
      <div>
        <p class="eyebrow">Tools and guides</p>
        <h1>Choose the tournament scheduler that matches your event.</h1>
        <p>Start with a generator when you need a schedule now, or open a guide when you need to decide byes, match counts, seeding, or bracket format first.</p>
      </div>
    </section>
    <section class="section-wrap">
      <h2>Which tournament schedule tool should I use?</h2>
      <p>Use the round robin generator when everyone should play everyone, the fixture generator when you need a dated match list, the tournament schedule maker when you are still choosing the format, and the double elimination generator when one loss should not remove a team.</p>
      <div class="card-grid">${priorityPages.map((page) => `<a class="page-card" href="${page.url}"><span>${esc(page.keyword)}</span><strong>${esc(page.title)}</strong><p>${esc(userProblemText(page.user_problem))}</p></a>`).join("")}</div>
      <p><a href="/7-team-round-robin/">Open the complete 7-team round robin reference</a> when you need a fixed odd-team schedule with one bye per round.</p>
    </section>
    ${groups.map((group) => `<section class="section-wrap">
      <h2>${esc(group)} pages</h2>
      <p>${esc(groupNotes[group] || "Choose the page that matches the tournament job you need to solve.")}</p>
      <div class="card-grid">${pages.filter((p) => p.cluster === group).map((page) => `<a class="page-card" href="${page.url}"><span>${esc(page.page_type)}</span><strong>${esc(page.title)}</strong><p>${esc(userProblemText(page.user_problem))}</p></a>`).join("")}</div>
    </section>`).join("")}
  </main>`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", "@id": `${siteOrigin}/tools/#webpage`, url: `${siteOrigin}/tools/`, name: "Tournament tools and guides", description: "All tournament scheduling tools and planning guides." },
      breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Tools", url: "/tools/" }]),
      { "@type": "ItemList", itemListElement: pages.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: canonical(p.url), name: p.title })) }
    ]
  };
  return layout({
    title: "Tools and Guides",
    description: "Browse tournament schedule makers, bracket generators, round robin pages, fixture tools, and planning guides.",
    url: "/tools/",
    currentUrl: "/tools/",
    body,
    schema
  });
}

function renderGuidesIndex() {
  const guidePages = pages.filter((p) => p.page_type === "guide");
  const groups = [
    ["Start Here", guidePages.filter((p) => [42, 44, 30].includes(p.rank))],
    ["Brackets and Seeding", guidePages.filter((p) => [40, 28, 27, 29, 45, 41, 47].includes(p.rank))],
    ["Round Robin and Pool Play", guidePages.filter((p) => [25, 26, 46, 43, 39].includes(p.rank))]
  ];
  const body = `<main>
    <section class="hero compact">
      <div>
        <p class="eyebrow">Tournament guides</p>
        <h1>Plan the format, rules, byes, seeds, and schedule before you publish.</h1>
        <p>Use these guides when the tool output needs a tournament rule decision: format choice, seeded brackets, byes, round robin match counts, pool play, Swiss events, and double elimination finals.</p>
      </div>
    </section>
    ${groups.map(([label, items]) => `<section class="section-wrap">
      <h2>${esc(label)}</h2>
      <div class="card-grid">${items.map((page) => `<a class="page-card" href="${page.url}"><span>${esc(page.keyword)}</span><strong>${esc(page.title)}</strong><p>${esc(userProblemText(page.user_problem))}</p></a>`).join("")}</div>
    </section>`).join("")}
    <section class="section-wrap">
      <h2>Worked schedule references</h2>
      <p><a href="/7-team-round-robin/">The 7-team round robin schedule</a> shows every pairing and bye. <a href="/double-elimination-bracket-generator/">The double elimination generator</a> shows how the winners and losers paths affect match order.</p>
    </section>
  </main>`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", "@id": `${siteOrigin}/guides/#webpage`, url: `${siteOrigin}/guides/`, name: "Tournament planning guides", description: "Tournament format, bracket, seeding, bye, round robin, pool play, Swiss, and checklist guides." },
      breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Guides", url: "/guides/" }]),
      { "@type": "ItemList", itemListElement: guidePages.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: canonical(p.url), name: p.title })) }
    ]
  };
  return layout({
    title: "Tournament Planning Guides",
    description: "Read practical tournament guides for bracket seeding, byes, round robin game counts, pool play, Swiss formats, double elimination, and event checklists.",
    url: "/guides/",
    currentUrl: "/guides/",
    body,
    schema
  });
}

function renderTrustPage(page) {
  const body = `<main>
    <section class="hero compact">
      <div>
        <p class="eyebrow">Site information</p>
        <h1>${esc(page.title)}</h1>
        <p>${esc(page.description)}</p>
      </div>
    </section>
    <article class="content-body">${page.body.map((p) => `<p>${esc(p)}</p>`).join("")}</article>
  </main>`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${canonical(page.url)}#webpage`, url: canonical(page.url), name: page.title, description: page.description },
      breadcrumbSchema([{ name: "Home", url: "/" }, { name: page.title, url: page.url }])
    ]
  };
  return layout({ title: page.title, description: page.description, url: page.url, currentUrl: page.url, body, schema });
}

function writeAssets() {
  fs.mkdirSync(path.join(publicDir, "assets"), { recursive: true });
  fs.writeFileSync(path.join(publicDir, "assets", "styles.css"), styles());
  fs.writeFileSync(path.join(publicDir, "assets", "app.js"), appJs());
  fs.writeFileSync(path.join(publicDir, "favicon.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#17463a"/><path d="M14 18h36v8H14zM14 31h24v8H14zM14 44h32v6H14z" fill="#f4c95d"/></svg>`);
  fs.writeFileSync(path.join(publicDir, "site.webmanifest"), JSON.stringify({ name: siteName, short_name: "Schedule Tools", start_url: "/", display: "standalone", background_color: "#f7f4ec", theme_color: "#17463a", icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }] }, null, 2));
  fs.writeFileSync(path.join(publicDir, "_headers"), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
`);
}

function writeSupportFiles() {
  const urlEntries = [
    { url: "/", lastmod: "2026-05-28" },
    { url: "/tools/", lastmod: "2026-07-04" },
    { url: "/guides/", lastmod: "2026-07-04" },
    ...pages.map((p) => ({ url: p.url, lastmod: p.date_modified || "2026-05-28" })),
    ...trustPages.map((p) => ({ url: p.url, lastmod: "2026-05-28" }))
  ];
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.map((entry) => `  <url><loc>${canonical(entry.url)}</loc><lastmod>${entry.lastmod}</lastmod></url>`).join("\n")}
</urlset>
`);
  fs.writeFileSync(path.join(publicDir, "robots.txt"), `User-agent: *
Allow: /
Sitemap: ${siteOrigin}/sitemap.xml
`);
  if (siteOrigin === "https://tournamentscheduletools.org") {
    fs.writeFileSync(path.join(publicDir, "_redirects"), `https://www.tournamentscheduletools.org/* https://tournamentscheduletools.org/:splat 301\n`);
  }
  fs.writeFileSync(path.join(publicDir, "404.html"), layout({
    title: "Page Not Found",
    description: "The page could not be found. Open the tools index to find a tournament scheduler or guide.",
    url: "/404.html",
    body: `<main><section class="hero compact"><div><p class="eyebrow">404</p><h1>Page not found</h1><p>Open the tools index to find the bracket, round robin, fixture, or guide page you need.</p><a class="primary-link" href="/tools/">Browse tools</a></div></section></main>`,
    schema: { "@context": "https://schema.org", "@type": "WebPage", name: "Page Not Found" }
  }));
}

function styles() {
  return `:root{--ink:#18211f;--muted:#596763;--bg:#f7f4ec;--panel:#fffdf7;--line:#d9d2c1;--green:#17463a;--green-2:#236554;--gold:#f4c95d;--rust:#a64f33;--focus:#0b6bcb;--shadow:0 16px 40px rgba(24,33,31,.08)}*{box-sizing:border-box}body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--ink);background:var(--bg);line-height:1.55}a{color:inherit}button,input,select,textarea{font:inherit}button,.primary-link{border:1px solid var(--green);background:var(--panel);color:var(--green);padding:.72rem .95rem;border-radius:8px;cursor:pointer;text-decoration:none;font-weight:700;min-height:44px}button:hover,.primary-link:hover{background:#eef5f1}.primary{background:var(--green);color:white}.primary:hover{background:var(--green-2)}.site-header{position:sticky;top:0;z-index:10;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.85rem clamp(1rem,4vw,3rem);background:rgba(247,244,236,.94);border-bottom:1px solid var(--line);backdrop-filter:blur(12px)}.brand{display:flex;align-items:center;gap:.65rem;font-weight:800;text-decoration:none;white-space:nowrap}.brand-mark{display:grid;place-items:center;width:38px;height:38px;border-radius:8px;background:var(--green);color:var(--gold);font-size:.85rem}.site-nav{display:flex;gap:.25rem;align-items:center;flex-wrap:wrap;justify-content:flex-end}.site-nav a{padding:.5rem .7rem;text-decoration:none;border-radius:8px;color:var(--muted);font-weight:650;font-size:.94rem}.site-nav a:hover,.site-nav a[aria-current=page]{background:#e9e2d0;color:var(--ink)}main{min-height:70vh}.hero{padding:clamp(2rem,5vw,4.5rem) clamp(1rem,4vw,3rem) 1.2rem}.hero>div{max-width:1040px}.hero.compact{padding-bottom:.7rem}.eyebrow{margin:0 0 .7rem;text-transform:uppercase;letter-spacing:.08em;font-size:.78rem;color:var(--rust);font-weight:800}.hero h1{max-width:980px;margin:0;font-size:clamp(2.05rem,4vw,4.2rem);line-height:1.04;letter-spacing:0}.hero.compact h1{font-size:clamp(2rem,3vw,3.1rem)}.hero p:not(.eyebrow){max-width:780px;margin:.95rem 0 0;color:var(--muted);font-size:1.12rem}.tool-shell{display:grid;grid-template-columns:minmax(290px,410px) minmax(0,1fr);gap:1rem;padding:1rem clamp(1rem,4vw,3rem) 2rem;align-items:start}.tool-panel,.result-panel{background:var(--panel);border:1px solid var(--line);border-radius:8px;box-shadow:var(--shadow)}.tool-panel{padding:1rem}.field-block label,.control-grid label{display:grid;gap:.4rem;color:var(--ink);font-weight:750}.field-block textarea,.control-grid input,.control-grid select{width:100%;border:1px solid var(--line);border-radius:8px;background:white;color:var(--ink);padding:.7rem}.field-block textarea{resize:vertical;min-height:190px}.control-grid{display:grid;grid-template-columns:1fr 1fr;gap:.8rem;margin-top:.9rem}.actions{display:flex;gap:.55rem;flex-wrap:wrap;margin-top:1rem}.tool-note{color:var(--muted);margin:.85rem 0 0;font-size:.94rem}.result-panel{padding:1rem;min-height:420px;overflow:auto}.result-head{display:flex;align-items:center;justify-content:space-between;gap:1rem;border-bottom:1px solid var(--line);padding-bottom:.7rem}.result-head h2{font-size:1.18rem;margin:0}.result-head span{background:#ecf2de;color:#33420f;border:1px solid #d5e0ba;border-radius:999px;padding:.28rem .65rem;font-size:.83rem;font-weight:800;white-space:nowrap}.fairness-grid{display:grid;grid-template-columns:repeat(4,minmax(120px,1fr));gap:.65rem;margin:1rem 0}.metric{border:1px solid var(--line);background:#fbf8ef;border-radius:8px;padding:.7rem}.metric strong{display:block;font-size:1.25rem}.metric span{color:var(--muted);font-size:.86rem}.results-table table{width:100%;border-collapse:collapse;font-size:.94rem}.results-table th,.results-table td{text-align:left;border-bottom:1px solid var(--line);padding:.62rem .55rem;vertical-align:top}.results-table th{background:#eee7d4;font-size:.82rem;text-transform:uppercase;letter-spacing:.04em}.section-wrap,.content-body,.link-band,.guide-summary{max-width:1120px;margin:0 auto;padding:2rem clamp(1rem,4vw,3rem)}.content-body{background:var(--panel);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.content-body h2{margin:2rem 0 .6rem;font-size:1.55rem}.content-body h2:first-child{margin-top:0}.content-body h3{margin:1.4rem 0 .45rem;font-size:1.15rem}.content-body p,.content-body li{color:#2f3c38}.content-body li+li{margin-top:.35rem}.guide-summary{display:flex;align-items:center;justify-content:space-between;gap:1rem;background:#efe7d4;border-top:1px solid var(--line);border-bottom:1px solid var(--line);max-width:none}.guide-summary p{max-width:780px;margin:0;color:#394640}.card-grid,.link-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.9rem}.page-card,.link-grid a{display:block;text-decoration:none;background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:1rem;min-height:150px}.page-card:hover,.link-grid a:hover{border-color:#ad8f4d;box-shadow:var(--shadow)}.page-card span{display:block;color:var(--rust);font-weight:800;font-size:.78rem;text-transform:uppercase}.page-card strong,.link-grid strong{display:block;margin:.25rem 0;font-size:1.05rem}.page-card p,.link-grid span{color:var(--muted);margin:.4rem 0 0}.two-col{display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:start}.check-list{margin:0;padding-left:1.3rem}.site-footer{display:flex;justify-content:space-between;gap:1.5rem;padding:2rem clamp(1rem,4vw,3rem);border-top:1px solid var(--line);background:#e7dfcc}.site-footer p{margin:.3rem 0 0;color:var(--muted);max-width:520px}.site-footer nav{display:flex;gap:.85rem;flex-wrap:wrap;justify-content:flex-end}.site-footer a{color:var(--muted);font-weight:650}@media(max-width:900px){.tool-shell,.two-col{grid-template-columns:1fr}.card-grid,.link-grid{grid-template-columns:1fr 1fr}.fairness-grid{grid-template-columns:1fr 1fr}.site-header{align-items:flex-start;flex-direction:column}.site-nav{justify-content:flex-start}}@media(max-width:620px){.hero h1{font-size:2.05rem}.hero p:not(.eyebrow){font-size:1rem}.control-grid,.card-grid,.link-grid,.fairness-grid{grid-template-columns:1fr}.actions button{flex:1 1 130px}.results-table{overflow-x:auto}.site-footer{flex-direction:column}.guide-summary{display:block}.guide-summary .primary-link{display:inline-flex;margin-top:1rem}}@media print{.site-header,.site-footer,.tool-panel,.content-body,.link-band,.guide-summary{display:none}.tool-shell{display:block;padding:0}.result-panel{box-shadow:none;border:0}.result-panel table{font-size:12px}}`;
}

function appJs() {
  return `(() => {
  const by = (root, selector) => root.querySelector(selector);
  const all = (root, selector) => Array.from(root.querySelectorAll(selector));
  const cleanNames = (value) => value.split(/\\n+/).map((v) => v.trim()).filter(Boolean);
  const nextPow2 = (n) => 2 ** Math.ceil(Math.log2(Math.max(2, n)));
  const minutesToTime = (start, offset) => {
    const [h, m] = (start || "09:00").split(":").map(Number);
    const total = h * 60 + m + offset;
    return String(Math.floor(total / 60) % 24).padStart(2, "0") + ":" + String(total % 60).padStart(2, "0");
  };
  const shuffle = (items) => items.map((value) => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map((item) => item.value);

  function assignSlots(matches, courts, start, length) {
    return matches.map((match, index) => {
      const courtIndex = index % courts;
      const slot = Math.floor(index / courts) * length;
      return { ...match, court: "Court " + (courtIndex + 1), time: minutesToTime(start, slot) };
    });
  }

  function singleElimination(names) {
    const size = nextPow2(names.length);
    const slots = names.concat(Array(size - names.length).fill("BYE"));
    const first = [];
    for (let i = 0; i < size / 2; i++) first.push({ round: "Round 1", home: slots[i], away: slots[size - 1 - i] });
    const matches = [...first];
    let roundSize = size / 2;
    let round = 2;
    while (roundSize > 1) {
      for (let i = 0; i < roundSize / 2; i++) matches.push({ round: roundSize === 2 ? "Final" : "Round " + round, home: "Winner " + (i * 2 + 1), away: "Winner " + (i * 2 + 2) });
      roundSize = roundSize / 2;
      round += 1;
    }
    return matches;
  }

  function doubleElimination(names) {
    const winnerBracket = singleElimination(names).map((match) => ({ ...match, round: "Winners " + match.round }));
    const activeFirstRound = winnerBracket.filter((match) => match.round === "Winners Round 1" && match.away !== "BYE").length;
    const loserMatches = [];
    const loserCount = Math.max(2, activeFirstRound);
    for (let i = 0; i < loserCount; i += 2) {
      loserMatches.push({ round: "Losers Round 1", home: "Loser " + (i + 1), away: i + 2 <= loserCount ? "Loser " + (i + 2) : "BYE" });
    }
    loserMatches.push({ round: "Grand Final", home: "Winners bracket winner", away: "Losers bracket winner" });
    return winnerBracket.concat(loserMatches);
  }

  function roundRobin(names, league = false) {
    const list = names.length % 2 ? names.concat("BYE") : names.slice();
    const rounds = [];
    const n = list.length;
    let rotating = list.slice();
    for (let r = 0; r < n - 1; r++) {
      for (let i = 0; i < n / 2; i++) {
        const a = rotating[i];
        const b = rotating[n - 1 - i];
        if (a !== "BYE" && b !== "BYE") {
          const flip = league && r % 2 === 1;
          rounds.push({ round: "Round " + (r + 1), home: flip ? b : a, away: flip ? a : b });
        } else {
          rounds.push({ round: "Round " + (r + 1), home: a === "BYE" ? b : a, away: "BYE" });
        }
      }
      rotating = [rotating[0], rotating[n - 1], ...rotating.slice(1, n - 1)];
    }
    return rounds;
  }

  function fairness(matches, names) {
    const stats = Object.fromEntries(names.map((name) => [name, { games: 0, byes: 0, home: 0, away: 0, courts: {}, lastIndex: -10, backToBack: 0 }]));
    const courts = {};
    matches.forEach((match, index) => {
      courts[match.court] = (courts[match.court] || 0) + 1;
      for (const side of ["home", "away"]) {
        const name = match[side];
        if (!stats[name]) continue;
        if (match.away === "BYE" && side === "home") stats[name].byes++;
        else if (match.away !== "BYE") stats[name].games++;
        stats[name][side]++;
        stats[name].courts[match.court] = (stats[name].courts[match.court] || 0) + 1;
        if (index - stats[name].lastIndex === 1) stats[name].backToBack++;
        stats[name].lastIndex = index;
      }
    });
    const values = Object.values(stats);
    const games = values.map((s) => s.games);
    const byes = values.map((s) => s.byes);
    const backToBack = values.reduce((sum, s) => sum + s.backToBack, 0);
    return {
      metrics: [
        ["Matches", matches.filter((m) => m.away !== "BYE").length],
        ["Rounds", new Set(matches.map((m) => m.round)).size],
        ["Game spread", Math.max(...games) - Math.min(...games)],
        ["Bye spread", Math.max(...byes) - Math.min(...byes)],
        ["Back-to-back", backToBack]
      ],
      stats
    };
  }

  function renderTable(root, matches, stats) {
    const rows = matches.map((m) => "<tr><td>" + m.round + "</td><td>" + m.home + "</td><td>" + m.away + "</td><td>" + m.court + "</td><td>" + m.time + "</td></tr>").join("");
    const summary = stats ? "<h3>Participant summary</h3><table><thead><tr><th>Participant</th><th>Games</th><th>Byes</th><th>Home</th><th>Away</th><th>Back-to-back</th></tr></thead><tbody>" + Object.entries(stats).map(([name,s]) => "<tr><td>" + name + "</td><td>" + s.games + "</td><td>" + s.byes + "</td><td>" + s.home + "</td><td>" + s.away + "</td><td>" + s.backToBack + "</td></tr>").join("") + "</tbody></table>" : "";
    by(root, "[data-results]").innerHTML = "<h3>Match list</h3><table><thead><tr><th>Round</th><th>Home</th><th>Away</th><th>Court</th><th>Time</th></tr></thead><tbody>" + rows + "</tbody></table>" + summary;
  }

  function toCsv(matches) {
    return ["Round,Home,Away,Court,Time"].concat(matches.map((m) => [m.round, m.home, m.away, m.court, m.time].map((v) => '"' + String(v).replace(/"/g, '""') + '"').join(","))).join("\\n");
  }

  function generate(root) {
    let names = cleanNames(by(root, "[data-participants]").value);
    if (names.length < 2) {
      by(root, "[data-status]").textContent = "Add at least two teams or players.";
      return;
    }
    if (by(root, "[data-seeding]").value === "shuffle") names = shuffle(names);
    const mode = by(root, "[data-mode]").value;
    const courts = Math.max(1, Number(by(root, "[data-courts]").value) || 1);
    const length = Math.max(5, Number(by(root, "[data-length]").value) || 30);
    const start = by(root, "[data-start]").value || "09:00";
    const raw = mode === "single_elimination"
      ? singleElimination(names)
      : mode === "double_elimination"
        ? doubleElimination(names)
        : roundRobin(names, mode === "league_schedule");
    const matches = assignSlots(raw, courts, start, length);
    root.__matches = matches;
    const fairnessReport = fairness(matches, names);
    renderTable(root, matches, fairnessReport.stats);
    by(root, "[data-fairness]").innerHTML = fairnessReport.metrics.map(([label, value]) => "<div class='metric'><strong>" + value + "</strong><span>" + label + "</span></div>").join("");
    by(root, "[data-summary-pill]").textContent = matches.length + " rows";
    by(root, "[data-status]").textContent = "Schedule generated. Review byes, court limits, and timing before publishing.";
  }

  all(document, "[data-tool]").forEach((root) => {
    const mode = root.dataset.defaultMode;
    const select = by(root, "[data-mode]");
    if (mode && Array.from(select.options).some((opt) => opt.value === mode)) select.value = mode;
    by(root, "[data-generate]").addEventListener("click", () => generate(root));
    by(root, "[data-copy]").addEventListener("click", async () => {
      if (!root.__matches) generate(root);
      await navigator.clipboard.writeText(toCsv(root.__matches || []));
      by(root, "[data-status]").textContent = "Copied schedule as CSV text.";
    });
    by(root, "[data-csv]").addEventListener("click", () => {
      if (!root.__matches) generate(root);
      const blob = new Blob([toCsv(root.__matches || [])], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "tournament-schedule.csv";
      a.click();
      URL.revokeObjectURL(url);
    });
    by(root, "[data-print]").addEventListener("click", () => window.print());
    generate(root);
  });
})();`;
}

ensureCleanDir(publicDir);
validateRoundRobinReferences();
writeAssets();
fs.writeFileSync(path.join(publicDir, "index.html"), renderHome());
writeFile("/tools/", renderToolsIndex());
writeFile("/guides/", renderGuidesIndex());
for (const page of pages) writeFile(pagePath(page), renderPage(page));
for (const page of trustPages) writeFile(page.url, renderTrustPage(page));
writeSupportFiles();
console.log(`Generated ${pages.length + trustPages.length + 3} index pages at ${publicDir}`);
