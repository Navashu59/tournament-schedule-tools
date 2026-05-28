# Round Robin Schedule Maker

You have 8 teams, 2 courts, and 3 hours to run a tournament. You need a schedule that tells you exactly which team plays whom, on which court, at what time, and who sits out each round. This tool generates that complete schedule—not just matchups.

## How To Use It

1. **Enter teams** – Type or paste team names, one per line. Use the real team names so the printed schedule is ready to share.
2. **Set venues** – Enter the number of courts or playing fields available. Default is 1.
3. **Set time per round** – Enter minutes per match (e.g., 30). The tool calculates total time.
4. **Select start time** – Choose when the first round begins (e.g., 9:00 AM).
5. **Click "Generate Schedule"** – The tool produces a full grid with rounds, courts, times, and byes.

**Fair byes**: When you have an odd number of teams, one team sits out each round. The tool rotates the bye so no team sits twice before all others have sat once.

## Example

**Input**: 5 teams (Red, Blue, Green, Yellow, Orange), 2 courts, 30-minute rounds, start 10:00 AM.

**Output**:

| Round | Time     | Court 1      | Court 2      | Bye     |
|-------|----------|--------------|--------------|---------|
| 1     | 10:00 AM | Red vs Blue  | Green vs Yellow | Orange  |
| 2     | 10:30 AM | Red vs Green | Blue vs Orange | Yellow  |
| 3     | 11:00 AM | Red vs Yellow| Green vs Orange | Blue    |
| 4     | 11:30 AM | Red vs Orange| Yellow vs Blue | Green   |
| 5     | 12:00 PM | Green vs Blue| Yellow vs Orange | Red     |

Each team plays 4 matches. Every team gets exactly one bye round.

## What The Results Mean

- **Round** – One complete set of matches where every team either plays or has a bye.
- **Court/venue** – The specific location where a match happens. If you have 2 courts, 2 matches happen simultaneously.
- **Time** – When the round starts. All matches in a round start at the same time.
- **Bye** – The team that does not play this round. Only appears with odd team counts.

**Total rounds**: For N teams, you get N-1 rounds (if N is even) or N rounds (if N is odd). Each team plays N-1 matches.

**Total time**: Rounds × minutes per round. Example: 5 rounds × 30 minutes = 2.5 hours.

## Common Mistakes

- **Using an even number of teams but expecting byes** – Byes only happen with odd team counts. With even teams, every team plays every round.
- **Forgetting venue limits** – If a round has more matches than available courts, some matches need later time slots. Always match the generated court assignments to your actual space.
- **Ignoring the bye rotation** – The tool rotates byes fairly. Do not manually reassign byes or you will create unfair rest periods.
- **Printing without checking time** – The schedule includes start times. Verify your first round time matches your actual start.

## Common Questions

**How many rounds do I need for 12 teams?**  
11 rounds if 12 teams (even). 12 rounds if 13 teams (odd). Each team plays 11 matches.

**What if I have more teams than courts?**  
The tool schedules as many matches per round as you have courts. Extra teams wait for later rounds. For example, 10 teams with 2 courts = 5 rounds (each round has 2 matches, 4 teams play, 0 byes).

**Can I export the schedule?**  
Yes. Use the **Print** button for a clean paper copy. Use **CSV export** to open in Excel or Google Sheets. CSV includes round, time, court, team 1, team 2, and bye (if any).

**Is the schedule fair for all teams?**  
Yes. The tool uses a standard circle method (Berger tables) that ensures every team plays every other team exactly once. Byes rotate evenly. No team gets two byes before another gets one.

**What if I need to add or remove a team after generating?**  
Regenerate the schedule. The tool recalculates all matchups and byes from scratch. Do not manually edit the output—it will break the round-robin balance.

**Can I set custom match durations per round?**  
Yes. Enter minutes per round in the "Time per round" field. All rounds use the same duration. If you need variable times (e.g., finals longer), generate the schedule and adjust manually after export.
