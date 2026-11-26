# Super Dan Kart — v2 build specification
## Goal
Replace the overhead main race view with an original 16-bit-inspired, behind-the-kart perspective renderer, using the supplied split-screen retro racing screenshot as the visual reference. Preserve the current five tracks, six competitors, race physics, garage ownership, cosmetics, three-lap rules, rewards, personal bests, and online record APIs.
## Deliverables
- A low-resolution Canvas 2D race viewport (256 × 176 logical pixels), scaled with nearest-neighbor CSS.
- A rotating, perspective-projected ground plane sampled from the actual existing course geometry. Road edges, center markings and track texture must move with player position and heading, not scroll independently.
- Depth-sorted sprites for opponents, chips, hazards, boost pads, and course-specific scenery. Rear-view kart silhouettes reflect the selected vehicle's color and class; the player's equipped Dan artwork is composited into the driver sprite.
- An always-visible live overhead minimap, with all six racers drawn at their actual track positions, using the same source route as the main renderer.
- Retro in-viewport HUD (lap, position, timer, chips and boost charge), countdown and feedback; compact map and touch controls below. Keep keyboard support, pause and exit.
## Architecture
Existing kart.js owns simulation, course spline, pickups, input, rewards, and record persistence. New kart-retro.js provides a self-contained rendering module. Build a deterministic textured map per course at startup, rotate it into a camera-space buffer each frame, and sample one horizontal strip per screen row using perspective depth. Project sprite positions via the same camera basis; cull behind-camera or off-screen objects and painter-sort by forward distance. Use an offscreen in-memory canvas, not a remote texture or external game asset. Reuse existing car catalog and Dan artwork; fall back to original overhead view if Canvas 2D cannot initialize.
## Integration
Expose a narrow renderer API for drawing the current simulation snapshot; retain original localStorage key, rewards and Supabase record schema. Use requestAnimationFrame already owned by kart.js; no second racing clock. Keep the existing race state across normal UI rerenders. Stop or pause on navigation and visibility changes. Increment service-worker cache and include renderer for offline use.
## Acceptance criteria
1. All five circuits display coherent curves and theme-specific horizon/scenery; foreground road width changes naturally with perspective.
2. Opponents and pickups scale and move as the player closes in; visible pickup state agrees with actual collection rules.
3. Map dots and projected positions derive from the same race state. Player marker is distinct; countdown, lap, rank and boost remain readable.
4. All 39 owned vehicle choices remain playable; unowned vehicles remain unavailable. Existing 93 appearances remain usable.
5. Three-lap races complete on every track; reward paid once, best time saved and online publication unchanged.
6. Touch and keyboard controls, pause, restart, exit, and offline cache continue working. Use automated simulation and renderer math checks; actual iPhone visual/input testing is a separate acceptance step.
## Scope boundaries
This release is a renderer and presentation upgrade, not a new physics engine. Auto-acceleration and racing-line steering remain. Online competition is asynchronous, not live multiplayer. No copied sprites, music, or commercial game assets.
