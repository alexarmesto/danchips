# Bugyard Baseball — build specification (v1)
## Goal
A mobile-first, original backyard baseball mini-game inside Dan Likes Chips. Inspired by the 1997 Backyard Baseball's approachable timing and placement, character abilities, playful sandlots, batter/pitcher framing and overhead field view. Do not copy its art, characters, music, branding or interface exactly.
## Modes and controls
Pickup: choose six distinct players from a 12-character roster, select one of three fields, play three innings against an AI team. Ties go to extra innings (up to six, then a draw). Home Run Derby: choose a hitter, ten pitches, maximize home runs and total hits. Batting: select contact, power, or bunt, aim left/center/right, start pitch, time swing as ball reaches the plate; take a pitch for a ball or strike. Defense: choose fastball, curve, or changeup and one of five target zones; pitch to AI, then time a fielding tap on balls in play. No simulated real-money purchases.
## Game rules
Three strikes = out, four balls = walk; two-strike foul doesn't strike out. Three outs per half-inning. Hits advance runners by base count, force walks advance only forced runners, home runs clear bases. Batting and fielding ratings alter outcomes. CPU baserunning automatic; simplified hits/outs, no steals, errors, substitutions, or double plays in v1. Teams switch between halves. Scoreboard, count, occupied bases and lineup always visible. Game ends after bottom of scheduled inning if not tied, or after six innings; home lead skips final bottom and walk-off ends game. Derby has ten completed pitches, no innings.
## Art/interaction
Original hand-drawn-style SVG environments; large foreground hitter, mound, fence, outfielders, animated ball and swing, cut to overhead field for ball-in-play and fielding timing. Touch controls accessible, responsive layouts, reduced-motion handling. Use the real Dan SVG with equipped cosmetics; original silhouettes for Frog, Toad, Ethnuffy, Baby and others. Team draft cards display batting, speed, pitching and fielding.
## Economy and data
Pickup completion: 35 crumbs + 12 per player run + 60 win bonus (30 draw) + 5 XP plus hits. Derby completion: 10 crumbs + 12 per HR + 2 per hit; 3 XP plus HR. Reward once at completed match; quitting no reward. Store local statistics under danchips-baseball-v1. Existing main-game save/cloud sync handles crumbs and XP; baseball career stats local. No leaderboard schema changes. Offline cache includes baseball.js.
## Verification
Automated tests for walk forces, hit advancement, strike/foul rules, inning transition, ties/walkoffs, rewards, draft, derby and routing. Real phone animation and input acceptance separately.
## Reference
https://megacatstudios.com/pages/backyard-baseball-97
https://www.mobygames.com/game/56578/backyard-baseball/screenshots/
https://www.gamespot.com/reviews/backyard-baseball-97-review-hit-parade/1900-6418299/
