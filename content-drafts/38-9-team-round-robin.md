# 9 Team Round Robin

You have nine teams and need a schedule where every team plays every other team exactly once. This page walks you through how to generate a balanced 9-team round robin using our tool, including how byes, court limits, and time slots affect your tournament timeline.

## How To Use It

1. **Enter team names** – Type or paste your nine team names into the input field (one per line). If you leave the field blank, the tool will label them Team 1 through Team 9.
2. **Set court/venue count** – Choose how many courts, fields, or stations you have available (1 to 9). This determines how many matches happen simultaneously.
3. **Set time per match** – Enter the duration of a single match (e.g., 30 minutes).
4. **Set break between matches** – Add any buffer time between rounds (e.g., 5 minutes for court changeover).
5. **Click "Generate Schedule"** – The tool will create a full round robin schedule with balanced byes and time slots.

## Example

For a 9-team round robin with **2 courts** and **30-minute matches** (no break):

- **Round 1:** Court 1: Team 1 vs Team 2; Court 2: Team 3 vs Team 4; **Bye:** Teams 5,6,7,8,9
- **Round 2:** Court 1: Team 5 vs Team 6; Court 2: Team 7 vs Team 8; **Bye:** Teams 1,2,3,4,9
- ...continues through 9 rounds.

Total time: 9 rounds × 30 minutes = **4.5 hours** (plus any breaks between rounds).

## What The Results Mean

- **9 rounds are required** – With an odd number of teams (9), one team sits out each round. To play all 36 matches (9 teams × 8 opponents / 2), you need exactly 9 rounds.
- **Byes are balanced** – Every team gets exactly one bye round. No team plays twice while another rests.
- **Court limit affects total time** – With 1 court, you play 1 match per round (9 matches total). With 4 courts, you play 4 matches per round, but some rounds will have fewer matches because 9 teams produce 4.5 matches per round on average. The tool automatically adjusts.
- **Time slots** – Each round starts at a specific time. The tool calculates start times based on your match duration and break settings.

## Common Mistakes

- **Forgetting that 9 teams = 9 rounds** – Some users expect 8 rounds. Because one team has a bye each round, you need 9 rounds to complete all pairings.
- **Overloading courts** – If you have 5+ courts, you will still have some rounds with only 4 matches (since 9 teams produce 4.5 matches per round). The tool handles this automatically.
- **Ignoring bye fairness** – Our tool ensures every team gets exactly one bye. Manually creating schedules often leads to uneven rest periods.
- **Not accounting for court availability** – If you have only 2 courts but schedule 4 matches per round, you'll need to adjust. Always set your actual court count.

## Common Questions

**Why does a 9-team round robin need 9 rounds?**  
Each team must play 8 matches (one against each opponent). Since only 4 matches can happen per round (8 teams play, 1 sits out), you need 9 rounds to complete all 36 matches.

**Can I export the schedule?**  
Yes. Use the **Print** button for a clean paper copy, or click **CSV** to download the schedule as a spreadsheet file.

**How do byes work?**  
In each round, one team does not play. The tool rotates the bye so every team gets exactly one rest round. This is the most balanced approach for odd-numbered tournaments.

**What if I have fewer than 4 courts?**  
The tool will schedule only as many matches per round as you have courts. For example, with 2 courts, each round will have 2 matches and 5 byes. The total number of rounds stays at 9, but the event takes longer.

**Is the schedule fair for all teams?**  
Yes. The tool uses a standard cyclic rotation algorithm that ensures each team plays an equal number of matches, gets one bye, and faces opponents in a balanced order (no team plays twice in a row unless unavoidable due to court limits).
