# Tournament Schedule Maker

Create brackets, round robin schedules, and league fixtures in one place. No signup needed.

## How To Use It

1. Enter team or player names (one per line).
2. Choose format: single elimination, double elimination, or round robin.
3. Set number of courts, venues, or time slots (optional).
4. Click "Generate Schedule."

Get a printable bracket, match list, and fairness summary instantly.

## Example

8 teams, single elimination. The tool generates a bracket with 7 matches across 3 rounds. Each match shows the scheduled court and time. Print it or copy the schedule as CSV.

## What The Results Mean

- **Bracket view**: Shows the path to the winner. Byes appear as empty slots for odd numbers of teams.
- **Match list**: Every game with round, court, and time.
- **Fairness summary**: For round robins, shows each team plays the same number of matches. For elimination, shows seeding logic.
- **CSV export**: Download or copy the schedule to share.

## Common Mistakes

- **Odd number of teams**: Byes are added automatically. One team sits out the first round.
- **Forgetting time slots**: Without them, the tool assigns default times. Add your own for real events.
- **Ignoring seeding**: Random seeding is default. Manually order teams to avoid top players meeting early.

## Common Questions

**How do you make a tournament bracket?**  
Enter your teams, choose single or double elimination, and click generate. The bracket appears instantly.

**How do you seed a bracket?**  
List teams in order of strength (1 = strongest). The tool places them so the top seed meets the bottom seed last.

**What is a bye?**  
A free pass to the next round. Needed when the number of teams isn't a power of 2 (e.g., 5 teams = 3 byes in round 1).

**How many games are in a single elimination bracket?**  
Number of teams minus 1. For 8 teams, that's 7 games.

**What is the difference between single and double elimination?**  
Single elimination: one loss and you're out. Double elimination: a second bracket for losers; you need two losses to be eliminated.

## Related Tools

- [Bracket Generator](/bracket-generator/)
- [Round Robin Generator](/round-robin-generator/)
- [League Fixture Maker](/league-fixture-maker/)
