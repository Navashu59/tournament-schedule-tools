# Engine Spec

## Core Data Structures

- Participant: id, name, seed
- Match: round, slot, home, away, bye, court, time
- Schedule: mode, participants, rounds, matches, warnings, fairness

## Single Elimination

- Accept any participant count >= 2
- Calculate next power of two
- Add byes for missing slots
- Support random seed and manual seed
- Generate rounds until final

## Round Robin

- Use circle method
- If odd count, add dummy bye participant
- Each participant plays every other participant once
- Assign courts by match order and court count
- Assign time slots by round and match length
- Calculate games per team and byes

## League Schedule

- Start from round robin schedule
- Add home/away labels
- Add week/round labels
- Export as fixture list

## Fairness Summary

- games per participant
- byes per participant
- home/away count
- court usage count
- warnings for impossible constraints

## Exports

- copy text
- CSV download
- print CSS

## Deferred

- full double elimination
- Swiss system
- persistent share links
- accounts
- live scoring
