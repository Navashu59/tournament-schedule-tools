# 5 Team Round Robin

You need a schedule for exactly five teams where every team plays each other once, and one team sits out each round. This is a common problem for leagues with an odd number of teams—like a weekend softball tournament or a corporate dodgeball event. The tool below generates that schedule automatically, handling the bye logic so you don't accidentally double-book a matchup.

## How To Use It

1. **Enter team names** – Type each team name on its own line. Use five teams for this exact schedule pattern.
2. **Select your mode** – Use **Round Robin**. This ensures every team plays four matches total, with one bye per round.
3. **Set venue details** – Pick how many courts or fields you have (1 to 5). The tool will space out matches so no venue is double-booked.
4. **Define time slots** – Enter your start time and match duration (e.g., 30 minutes). The tool calculates when each round begins.
5. **Generate and export** – Click "Generate Schedule." You can print the schedule directly or download it as a CSV file for Excel or Google Sheets.

## Example: 5 Team Round Robin Schedule

Let's say your teams are **A, B, C, D, E**. With one bye per round, the schedule looks like this:

| Round | Match 1 | Match 2 | Bye Team |
|-------|---------|---------|----------|
| 1     | A vs B  | C vs D  | E        |
| 2     | A vs E  | B vs C  | D        |
| 3     | A vs D  | B vs E  | C        |
| 4     | A vs C  | D vs E  | B        |
| 5     | B vs D  | C vs E  | A        |

**Fairness check:** Every team plays exactly four matches, sits out exactly one round, and faces every other team exactly once. No duplicate matchups.

## What The Results Mean

- **Bye team** – The team not playing that round. They rest, scout, or prepare. Each team gets exactly one bye.
- **Matchups** – Each pair appears once. For 5 teams, there are 10 total matches (5 rounds × 2 matches per round).
- **Venue slots** – If you have 2 courts, the tool assigns Court 1 and Court 2 for each round. With 1 court, matches run sequentially (e.g., Match 1 at 9:00, Match 2 at 9:30).
- **Time slots** – The tool adds the match duration to the start time for each round. For example, if your first match starts at 9:00 AM and lasts 30 minutes, Round 2 starts at 9:30 AM.

## Common Mistakes

- **Forgetting the bye counts** – With 5 teams, you cannot have all teams playing at once. The bye is mandatory. Do not try to force a 5-team schedule into 4-team thinking.
- **Duplicating matchups** – Manually creating a schedule often leads to A vs B appearing twice. The tool prevents this.
- **Ignoring venue limits** – If you have only 1 court, the tool will still generate 2 matches per round. You must run them back-to-back, not simultaneously.
- **Misreading CSV export** – The CSV includes round numbers, matchups, and bye team. Use it to import into a league management app or print for a clipboard.

## Common Questions

**Why does one team sit out each round?**  
With an odd number of teams, you cannot pair everyone at once. The bye ensures each team gets a rest round and still plays everyone else.

**Can I change the order of matches?**  
The tool generates a standard cyclic schedule. If you need a specific order (e.g., rivalry match first), you can manually reorder the CSV after export.

**Does the schedule guarantee fairness?**  
Yes. Each team plays the same number of matches (4), gets one bye, and faces every opponent once. No team has an advantage or disadvantage.

**What if I have more than 5 teams?**  
Use the same generator with a different participant list, or open the matching 7-team, 8-team, 9-team, 10-team, or 12-team round robin page for a more specific example.
