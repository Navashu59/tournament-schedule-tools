# Tool Intro

Set up a single-elimination bracket that prints cleanly. Enter teams or players, pick a start time, and get a ready-to-print schedule. No signup needed.

# How To Use It

1. Enter team or player names (one per line).
2. Set the match duration and start time.
3. Add courts or venues if needed.
4. Click "Generate Bracket."
5. Use the print view or export as CSV.

# Example

You have 7 teams for a Saturday tournament. Enter all 7 names. The tool adds one bye (a free pass) so the bracket fills to 8 slots. Team 1 gets the bye. The first round has 3 matches. The second round has 2 matches (one is the bye team vs. a winner). The final has 1 match.

# What The Results Mean

The bracket shows each round, match time, and assigned court. Byes appear as empty slots. The print view removes navigation so it fits on one page. CSV export gives you the same data in a spreadsheet.

# Common Mistakes

- **Odd number of teams**: The tool adds byes automatically. You don't need to remove a team.
- **Forgetting time slots**: Without them, matches show "TBD." Add start times to keep the schedule on track.
- **Not using print view**: The regular page has extra elements. Use the print button for a clean bracket.

# Common Questions

**How do you make a tournament bracket?**  
Enter team names, set match duration, and generate. The tool creates a single-elimination bracket with rounds and times.

**How do you seed a bracket?**  
List teams in order of strength (1 = strongest). The tool places them so the strongest meet in the final. For 8 teams: 1 vs. 8, 4 vs. 5, 3 vs. 6, 2 vs. 7.

**What is a bye?**  
A free pass to the next round. Needed when the number of teams isn't a power of 2 (e.g., 7 teams needs 1 bye).

**How many games are in a single elimination bracket?**  
N - 1, where N is the number of teams. For 8 teams: 7 games. For 16 teams: 15 games.

**What is the difference between single and double elimination?**  
Single elimination: lose once, you're out. Double elimination: lose once, you drop to a losers' bracket; lose twice, you're out.

# Related Tools

- [Round Robin Generator](/round-robin-generator/) – every team plays every other team.
- [Double Elimination Bracket](/double-elimination-bracket/) – two-loss elimination.
- [Team Scheduler](/team-scheduler/) – assign teams to courts and time slots.
