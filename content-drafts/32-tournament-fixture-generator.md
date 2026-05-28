# Tournament Fixture Generator

You are running a tournament and need a match list that shows exactly who plays whom, when, and where. You need to share it with players, print it for venue walls, and adjust it when courts or time slots change. This tool generates a fixture list you can export, print, and edit—no login or sign-up required.

## How To Use It

1. **Enter your participants** – Type or paste player names (one per line). For team tournaments, enter team names.
2. **Choose a mode** – Select **League Schedule** (each participant plays every other participant once) or **Round Robin** (each participant plays every other participant a set number of times).
3. **Set courts and time slots** – Add the number of courts/venues available and the time slots per day (e.g., 3 courts, 4 time slots per day).
4. **Handle byes** – If you have an odd number of participants, the tool automatically adds byes (a free round for one participant). Byes are marked clearly in the fixture list.
5. **Generate fixtures** – Click the button. The tool creates a round-by-round fixture list with dates, rounds, courts, and time slots.
6. **Export or print** – Use the **Print** button for a clean, printer-friendly version. Use **CSV** to download a spreadsheet you can edit in Excel or Google Sheets.

## Example

**Input:**  
- Participants: Team A, Team B, Team C, Team D  
- Mode: League Schedule  
- Courts: 2  
- Time slots: 10:00 AM, 11:00 AM  

**Output (first round):**  
| Round | Court 1 (10:00 AM) | Court 2 (11:00 AM) |  
|-------|-------------------|-------------------|  
| 1     | Team A vs Team B  | Team C vs Team D  |  
| 2     | Team A vs Team C  | Team B vs Team D  |  
| 3     | Team A vs Team D  | Team B vs Team C  |  

Each round uses all courts and time slots. Byes appear as "BYE" in the fixture list.

## What The Results Mean

- **Round** – The sequence of matches. Each round uses all available courts and time slots.  
- **Bye** – A participant with no match in that round. The tool assigns byes evenly so no participant gets more byes than others.  
- **Court/Venue** – The physical location where the match is played. You can rename courts (e.g., Court A, Field 1, Table 3).  
- **Time slot** – The scheduled start time for the match. The tool fills all slots before moving to the next day.  
- **Fairness** – The tool balances home/away (if applicable) and avoids scheduling the same participant twice in one round.

## Common Mistakes

- **Forgetting to set courts/time slots** – Without them, the tool cannot assign matches to specific times or locations. Always enter at least one court and one time slot.  
- **Using too many participants for available slots** – If you have 10 participants but only 1 court and 1 time slot, the tournament will take many rounds. Increase courts or time slots to shorten the schedule.  
- **Not checking for byes** – With an odd number of participants, byes are unavoidable. The tool marks them clearly; do not delete them from the list.  
- **Editing the CSV incorrectly** – If you edit the CSV and re-import it, the tool may not recognize your changes. Use the CSV only for printing or sharing, not for re-importing.

## Common Questions

**How do I handle byes in the fixture list?**  
Byes appear as "BYE" in the match column. That participant does not play that round. The tool ensures no participant gets more than one bye per cycle.

**Can I change courts or time slots after generating fixtures?**  
Yes. Go back to the settings, adjust the number of courts or time slots, and regenerate. The tool recalculates the entire schedule.

**Does the tool support double round-robin?**  
Yes. Select **Round Robin** mode and set the number of rounds to 2. Each pair plays twice (once home, once away if applicable).

**Can I print the fixture list without the tool interface?**  
Yes. Click **Print** to open a clean, printer-friendly version. Use your browser’s print function (Ctrl+P or Cmd+P) to save as PDF or print.

**How do I export to CSV?**  
Click **CSV**. A file downloads with columns for Round, Court, Time Slot, Participant 1, Participant 2, and Bye (if applicable). Open it in Excel or Google Sheets to edit or share.
