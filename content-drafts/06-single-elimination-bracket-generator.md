# Single Elimination Bracket Generator

## Tool Intro

Set up a knockout tournament in seconds. Enter your teams or players, and get a printable bracket with matchups, times, and venues—no signup required.

## How To Use It

1. Enter team or player names (one per line).
2. Set the number of courts or venues (optional).
3. Assign time slots for each round.
4. Click **Generate Bracket**.
5. Print, copy, or export as CSV.

## Example

**8 teams, 2 courts, 30-minute matches**

- Round 1: 4 matches (2 per court)
- Round 2: 2 matches
- Final: 1 match

The generator automatically seeds the bracket and adds byes if you have an odd number of teams.

## What The Results Mean

- **Bracket view**: Shows the full knockout tree with winners advancing.
- **Schedule**: Lists each match with court, time, and round.
- **Byes**: Empty slots for teams that skip the first round (needed when team count isn't a power of 2).
- **Fairness summary**: Explains seeding logic and why some teams get byes.

## Common Mistakes

- **Forgetting byes**: With 5 teams, 3 get byes in round 1. The generator handles this automatically.
- **Wrong match count**: A 16-team bracket has 15 total matches, not 16.
- **Overlapping times**: Set realistic match durations—don't schedule 4 matches on 1 court in 30 minutes.

## Common Questions

**How do you make a tournament bracket?**  
Enter your teams, set rounds and times, then generate. The tool creates a single elimination tree where one loss eliminates a team.

**How do you seed a bracket?**  
Enter teams in order of strength (1 = strongest). The generator places seeds so top teams meet only in later rounds.

**What is a bye?**  
A free pass to the next round. Needed when the number of teams isn't a power of 2 (e.g., 5 teams → 3 byes in round 1).

**How many games are in a single elimination bracket?**  
Total games = number of teams − 1. For 8 teams, that's 7 games.

**What is the difference between single and double elimination?**  
Single: one loss and you're out. Double: you lose twice before elimination (loser's bracket).

## Related Tools

- [Double Elimination Bracket Generator](/double-elimination-bracket-generator/)
- [Round Robin Schedule Generator](/round-robin-schedule-generator/)
- [Tournament Seeding Tool](/tournament-seeding-tool/)
