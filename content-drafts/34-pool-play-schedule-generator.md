# Pool Play Schedule Generator

You have 12 teams, three courts, and four hours before bracket play starts. Every team needs to play at least three games, but you can't have one team playing twice while another sits idle. That's the problem this tool solves.

Pool play divides teams into smaller round-robin groups. Each team plays every other team in its pool exactly once. The schedule generator creates a balanced set of matches so you can move directly to playoffs or elimination rounds.

## How To Use It

1. **Enter total teams** (4 to 48). The tool automatically calculates pool sizes.
2. **Select pool size** (3, 4, 5, or 6 teams per pool). Uneven pools? Choose "Auto-balance" to distribute teams evenly.
3. **Set courts or venues** (1 to 12). The tool assigns matches to available courts.
4. **Set time slots** (optional). Enter match duration and total time available. The tool generates start times.
5. **Click "Generate Schedule"**. Results appear in a table below.

**Output options:** Print directly or download as CSV. The CSV includes pool name, match number, home team, away team, court, and time slot.

## Example

**Input:** 16 teams, 4 pools of 4, 2 courts, 3-hour window, 30-minute matches.

**Output:**
- Pool A: Teams 1-4. Match 1: Team 1 vs Team 2 (Court 1, 9:00 AM). Match 2: Team 3 vs Team 4 (Court 2, 9:00 AM). Match 3: Team 1 vs Team 3 (Court 1, 9:30 AM). And so on until every team in Pool A has played three matches.
- Pools B, C, D follow the same pattern, staggered across courts and times.

## What The Results Mean

- **Byes:** In odd-numbered pools (3 or 5 teams), one team sits out each round. The tool marks these as "BYE" and adjusts the schedule so no team has consecutive byes.
- **Fairness:** The tool uses a cyclic algorithm. Each team gets equal rest between matches, and no team plays more than one match per round.
- **Playoff handoff:** The final column shows "Playoff seed" based on pool standings (wins, then point differential). The schedule ends with enough buffer time for bracket seeding.

## Common Mistakes

- **Forgetting byes in odd pools.** A 3-team pool has one bye per round. The tool handles this, but you must account for the extra round in your total time.
- **Overloading courts.** If you have 6 teams in one pool and 2 courts, expect 5 rounds. The tool warns you if time is insufficient.
- **Ignoring time slots.** Without setting match duration, the tool assumes continuous play. Always enter your actual time window.
- **Mixing pool sizes manually.** Let the tool auto-balance unless you have a specific reason for uneven pools (e.g., 5-team and 4-team pools).

## Common Questions

**What if I have an odd number of teams?**  
The tool creates pools of 3 or 5. A 3-team pool has 3 matches per team (2 games, 1 bye). A 5-team pool has 5 matches per team (4 games, 1 bye). The schedule remains balanced.

**How does the tool ensure fairness?**  
It uses a round-robin algorithm that rotates teams so each team plays the same number of matches, with equal rest intervals. Court assignments rotate to avoid home-court advantage.

**Can I export to CSV?**  
Yes. Click "Download CSV" for a file with columns: Pool, Match#, Home, Away, Court, Time. Open in any spreadsheet app.

**What happens after pool play?**  
The tool outputs standings (wins, losses, point differential). Use these to seed your bracket. The schedule includes a 15-minute buffer after the last match for seeding.

**Does it work for single-elimination after pools?**  
Yes. The schedule ends with a "Playoff seed" column. Copy these seeds into your bracket tool. The tool does not generate bracket matches.
