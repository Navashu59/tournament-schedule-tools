(() => {
  const by = (root, selector) => root.querySelector(selector);
  const all = (root, selector) => Array.from(root.querySelectorAll(selector));
  const cleanNames = (value) => value.split(/\n+/).map((v) => v.trim()).filter(Boolean);
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
    const stats = Object.fromEntries(names.map((name) => [name, { games: 0, byes: 0, home: 0, away: 0 }]));
    const courts = {};
    for (const match of matches) {
      courts[match.court] = (courts[match.court] || 0) + 1;
      if (stats[match.home]) {
        match.away === "BYE" ? stats[match.home].byes++ : stats[match.home].games++;
        stats[match.home].home++;
      }
      if (stats[match.away]) {
        stats[match.away].games++;
        stats[match.away].away++;
      }
    }
    const games = Object.values(stats).map((s) => s.games);
    const byes = Object.values(stats).map((s) => s.byes);
    return [
      ["Matches", matches.filter((m) => m.away !== "BYE").length],
      ["Rounds", new Set(matches.map((m) => m.round)).size],
      ["Game spread", Math.max(...games) - Math.min(...games)],
      ["Bye spread", Math.max(...byes) - Math.min(...byes)]
    ];
  }

  function renderTable(root, matches) {
    const rows = matches.map((m) => "<tr><td>" + m.round + "</td><td>" + m.home + "</td><td>" + m.away + "</td><td>" + m.court + "</td><td>" + m.time + "</td></tr>").join("");
    by(root, "[data-results]").innerHTML = "<table><thead><tr><th>Round</th><th>Home</th><th>Away</th><th>Court</th><th>Time</th></tr></thead><tbody>" + rows + "</tbody></table>";
  }

  function toCsv(matches) {
    return ["Round,Home,Away,Court,Time"].concat(matches.map((m) => [m.round, m.home, m.away, m.court, m.time].map((v) => '"' + String(v).replace(/"/g, '""') + '"').join(","))).join("\n");
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
    renderTable(root, matches);
    const metrics = fairness(matches, names);
    by(root, "[data-fairness]").innerHTML = metrics.map(([label, value]) => "<div class='metric'><strong>" + value + "</strong><span>" + label + "</span></div>").join("");
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
})();