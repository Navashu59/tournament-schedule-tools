# 7 Team Round Robin

You have seven teams and need a schedule where every team plays each other exactly once, with one team resting each round. This page shows you how to generate a fair 7-team round robin with rotating byes, 21 total games, and seven rounds of play.

## How To Use It

1. **Enter team names** – Type each of your seven teams into the tool. If you leave the default "Team 1" through "Team 7", the schedule will still work.
2. **Select mode** – Choose **round_robin** from the dropdown. This ensures the bye rotates evenly.
3. **Set venue details** – If you have multiple courts or fields, specify the number. The tool will assign games to available venues.
4. **Add time slots** – Enter the first start time and match length. The tool spaces games based on your slot duration.
5. **Generate** – Click to create the schedule. You'll see a table with round number, matchups, venue, and time.
6. **Export** – Use the **Print** button for a paper copy, or **CSV** to open in Excel or Google Sheets.

## Example

Suppose your teams are: Eagles, Falcons, Hawks, Owls, Ravens, Swans, and Vultures. After generating, Round 1 might look like this:

| Round | Game | Team A | Team B | Venue | Time |
|-------|------|--------|--------|-------|------|
| 1 | 1 | Eagles | Falcons | Court 1 | 9:00 AM |
| 1 | 2 | Hawks | Owls | Court 2 | 9:00 AM |
| 1 | 3 | Ravens | Swans | Court 3 | 9:00 AM |
| 1 | *Bye* | Vultures | – | – | – |

Each subsequent round, the bye moves to a different team. By Round 7, every team has had exactly one bye.

## What The Results Mean

- **21 games total** – Each of the 7 teams plays 6 games (7 teams × 6 games / 2 = 21 matchups).
- **7 rounds** – One round per week or day. In each round, 3 games happen simultaneously (if you have 3 venues) and 1 team sits out.
- **Rotating bye** – The bye shifts one position each round. No team gets two byes in a row, and no team waits longer than any other.
- **Fairness** – The schedule is balanced: every team plays the same number of games, and the bye rotation prevents any team from having an advantage or disadvantage.

## Common Mistakes

- **Forgetting the bye** – With 7 teams, you cannot schedule all teams every round. One team must rest. The tool handles this automatically.
- **Using 7 rounds for 8 teams** – A 7-team round robin needs exactly 7 rounds. If you have 8 teams, you need a different format (7 rounds would leave one team idle each round, but with 8 teams you'd have 4 games per round and no byes).
- **Ignoring venue limits** – If you only have 2 courts, the tool will schedule 2 games per round and spread the third game to a later time slot. Check your venue count before generating.
- **Not exporting before editing** – If you manually change a matchup in the printed schedule, the bye rotation breaks. Always re-generate if you need adjustments.

## Common Questions

**Why does a 7-team round robin have 21 games?**  
Each team plays every other team once. The formula is n(n-1)/2, so 7×6/2 = 21.

**How is the bye determined each round?**  
The tool uses a standard cyclic algorithm. Team 1 is fixed, and the other teams rotate positions. The team that doesn't have an opponent in a given round gets the bye.

**Can I use this for a double round robin?**  
Yes, run the tool twice. The first pass gives you one schedule. Run it again with reversed home/away to get the second half. You'll have 42 games over 14 rounds.

**What if I have more than 3 venues?**  
The tool will assign games to all available venues in each round. With 4 venues, you'll have 3 games running and 1 empty venue per round.

**Is the CSV file editable?**  
Yes. Open it in any spreadsheet software. You can reorder columns, add scores, or print custom reports. The raw data includes round number, team names, venue, and time.

**Does the schedule account for travel time?**  
No. The tool assumes all venues are at the same location. If teams travel between venues, adjust your time slots manually after export.
