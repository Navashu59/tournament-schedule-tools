# 12 Team Round Robin

## Tool Intro
Generate a balanced 12-team round robin schedule instantly. No signup needed. Every team plays each other once. Export to CSV, print, or copy the schedule.

## How To Use It
1. Enter your 12 team names.
2. Choose your season start date.
3. Set number of courts or venues (optional).
4. Click "Generate Schedule."
5. Export, print, or copy the result.

## Example
Teams: Lions, Tigers, Bears, Wolves, Eagles, Hawks, Foxes, Owls, Rams, Bulls, Pumas, Vipers.  
Season: 11 weeks, 1 match per team per week.  
Output: Week 1 – Lions vs Tigers, Bears vs Wolves, Eagles vs Hawks, Foxes vs Owls, Rams vs Bulls, Pumas vs Vipers. Each week rotates matchups until all teams have played each other.

## What The Results Mean
- **Total matches:** 66 (12 teams × 11 rounds ÷ 2).
- **Rounds:** 11 rounds if even teams; 12 rounds if odd (one team gets a bye each round).
- **Fairness:** Each team plays every other team exactly once. Home/away balance is automatic in a single round robin.
- **Byes:** With 12 teams, no byes. With 11 teams, one bye per round.

## Common Mistakes
- **Adding a 13th team mid-season:** Regenerate the schedule from scratch.
- **Forgetting to set venue capacity:** If you have 2 courts, you can only schedule 2 matches per time slot.
- **Assuming double round robin:** This tool generates a single round robin. For home-and-away, run it twice.

## Common Questions

**How do you make a round robin schedule?**  
List all teams. Pair them round by round using a fixed rotation algorithm. This tool does it for you.

**How many games are in a round robin?**  
For 12 teams: 66 games (n × (n-1) / 2).

**What happens with an odd number of teams?**  
One team gets a bye each round. The schedule still ensures every team plays each other once.

**How do you avoid repeat matchups?**  
The algorithm ensures each pair meets exactly once. No manual checking needed.

**How do you assign courts or time slots?**  
Enter your available courts/venues when generating. The tool assigns matches to slots automatically.

## Related Tools
- [8 Team Round Robin](/8-team-round-robin/)
- [16 Team Round Robin](/16-team-round-robin/)
- [Double Round Robin Generator](/double-round-robin/)
