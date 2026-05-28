# Sports Schedule Maker

You're a coach or league organizer. You have 12 teams, 4 fields, and 8 weeks to play. You need a schedule that gives every team a fair number of home games, avoids back-to-back matchups, and prints cleanly for parents. You don't want to spend hours in a spreadsheet.

This tool does it in under 60 seconds.

## How To Use It

1. **Choose your mode** – Select **League Schedule** (fixed number of weeks, teams play once per week) or **Round Robin** (every team plays every other team exactly once or twice).

2. **Enter teams** – Type or paste team names. For youth leagues, use division names (e.g., "U10 Red," "U10 Blue").

3. **Set venues and time slots** – Enter how many fields, courts, or gyms are available, then set the first start time and match length.

4. **Set schedule length** – For League mode, choose number of weeks. For Round Robin, the tool calculates the minimum number of rounds.

5. **Toggle fairness options** – Check "Balance home/away" to ensure each team gets roughly equal home games. Check "Avoid repeat matchups in consecutive weeks" for youth leagues where families dislike playing the same team twice in a row.

6. **Generate** – Click the button. Review the schedule. Adjust any matchups manually if needed.

7. **Export** – Print directly or download as CSV to share via email or upload to your league website.

## Example

**Input:**
- Mode: League Schedule
- Teams: Bears, Lions, Tigers, Wolves, Eagles, Hawks
- Venues: North Field (10 AM, 11 AM), South Field (10 AM, 11 AM)
- Weeks: 5
- Fair home/away: Yes

**Output (Week 1):**
| Time | Venue | Home | Away |
|------|-------|------|------|
| 10 AM | North Field | Bears | Lions |
| 11 AM | North Field | Tigers | Wolves |
| 10 AM | South Field | Eagles | Hawks |
| 11 AM | South Field | (bye) | (bye) |

Each week rotates venues and home/away status. Byes appear automatically when team count is odd or venue slots are limited.

## What The Results Mean

- **Bye weeks** – A team with no game that week. The tool spreads byes evenly so no team sits out twice while others play every week.
- **Venue rotation** – Each team plays at different venues over the season, not stuck on the same field every week.
- **Home/away balance** – For a 10-week season with 8 teams, each team gets 4 or 5 home games. The tool flags any imbalance so you can swap manually.
- **Repeat matchups** – In League mode, teams may play each other twice. The tool spaces these out by at least 2 weeks.

## Common Mistakes

- **Too many teams per venue** – If you have 8 teams but only 2 fields with 1 time slot each, you'll get 4 byes per week. Add more time slots or venues.
- **Forgetting to set time slots** – Without time slots, the tool assigns random times. Always define your available slots first.
- **Not checking fairness** – The default schedule may give one team 3 home games in a row. Always toggle "Balance home/away" before generating.
- **Using Round Robin for fixed-week leagues** – Round Robin forces every team to play each other, which may exceed your season length. Use League mode for fixed-week schedules.

## Common Questions

**Can I make a schedule for 7 teams with 3 venues?**  
Yes. The tool adds byes automatically. With 7 teams and 3 venues (6 time slots), one team gets a bye each week. Byes rotate so no team sits out twice before others.

**How does the tool handle doubleheaders?**  
It doesn't by default. If you need doubleheaders (e.g., two games per team per week), generate a League schedule, then manually duplicate matchups for the same week. Or run two separate schedules (one for each game slot).

**Does it work for tournaments with multiple divisions?**  
Yes. Create separate schedules per division. Use the CSV export to combine them into one master file.

**Can I edit a schedule after generating it?**  
Yes. Click any matchup to swap home/away, change the venue, or move it to a different time slot. The tool recalculates fairness after edits.

**Is there a limit on teams or venues?**  
No. The tool handles up to 100 teams and 50 venues. For larger leagues, use the CSV export to manage data offline.
