# New Fragment Rooms Design

**Date:** 2026-05-27
**Status:** Approved

## Goal

Add 6 new fragment types to the liminal space pool, expanding from 3 rooms (hallway, mall, street) to 9. Each room should feel big, unsettling, and detailed — built entirely with Three.js BoxGeometry/CylinderGeometry and MeshStandardMaterial.

## Architecture

Each fragment follows the existing pattern:
- One builder file: `src/levels/build<Name>.js` exporting `build<Name>`, `build<Name>Corrupted`, `build<Name>Impossible`
- Corrupted and impossible are stubs (`return build<Name>()`) — mutations are a future pass
- One entry in `src/levels/fragmentRegistry.js` under a new key
- No changes to DimensionManager or Game.js — the registry is the only integration point

## Rooms

---

### 1. NurseryHall

**File:** `src/levels/buildNurseryHall.js`
**Registry key:** `nurseryHall`

**Dimensions:** W:3, H:2.2, L:60

**Materials:**
- Floor: `#3a6b35` (grass green), roughness 0.9
- Walls: `#f5c6d0` (pale pink), roughness 0.95
- Ceiling: `#f8f0f0` (off-white), roughness 0.85
- Water stain patches: `#d4bfc0` (slightly darker pink), roughness 1.0
- Picture frames: `#8b7355` (wood brown), roughness 0.8
- Chair: `#6b4f2a` (dark wood), roughness 0.9
- Small door: `#c8a882` (light wood), roughness 0.85
- Fixture: emissive `#fff8e0`, emissiveIntensity 1.0

**Geometry:**
- Floor, ceiling, left wall, right wall, back wall (behind player)
- Ceiling water stain patches: 4 flat boxes (0.4×0.02×0.6) at random ceiling positions
- Light fixtures: 2 ceiling-mounted strips at z=-10 and z=-35 (one will flicker)
- Picture frames: 6 thin boxes on alternating walls at z=-8, -18, -28, -38 (3 per side)
- Small chair: seat (0.5×0.06×0.5 at y=0.45), backrest (0.5×0.5×0.06), 4 legs — placed at z=-28, center
- Small door mid-hallway: frame + door panel, height 1.4 (too small), at z=-30 on left wall
- Collidables: walls, back wall, small door frame

**Config:**
```js
{
  name: 'NurseryHall',
  startPosition: [0, 1.7, 1],
  fog: { color: '#e8d0d8', near: 4, far: 16 },
  background: '#e0c8d0',
  ambient: { color: '#ffe0e8', intensity: 0.08 },
  lights: [
    { type: 'point', color: '#fff5e0', intensity: 3.5, distance: 10, position: [0, 2.0, -10], flicker: true, flickerSpeed: 0.22, shadows: true },
    { type: 'point', color: '#fff5e0', intensity: 3.0, distance: 10, position: [0, 2.0, -35], flicker: false, shadows: false },
  ],
  sanityDrain: 1.8,
  vignetteBase: 0.42,
  transition: { position: [0, 1.7, -55], radius: 3.5 },
}
```

---

### 2. WetKitchen

**File:** `src/levels/buildWetKitchen.js`
**Registry key:** `wetKitchen`

**Dimensions:** W:12, H:3.2, L:48

**Materials:**
- Floor: `#080a08` (near-black), metalness 1.0, roughness 0.0 — mirror-wet
- Walls: `#d8d4c8` (institutional cream), roughness 0.92
- Ceiling: `#ccc8bc` (stained white), roughness 0.88
- Counters: `#a0a090` (stainless gray), roughness 0.3, metalness 0.6
- Cabinets: `#c8c4b0`, roughness 0.85
- Conduit pipes: `#505050` (dark metal), roughness 0.4, metalness 0.8
- Sink: same as counters
- Chair (fallen): `#6b5a40`, roughness 0.9
- Drip marks: `#1a1c18` (dark wet), roughness 1.0
- Fixtures: emissive `#c8ffcc` (sickly green-white), emissiveIntensity 0.8

**Geometry:**
- Floor, ceiling, left wall, right wall, back wall
- Counter left: 2×0.9×L (running full length on left side), at x=-W/2+1
- Counter right: same on right side
- Overhead cabinets left: 1.5×0.6×L at x=-W/2+0.75, y=2.6
- Overhead cabinets right: same
- Sink: 1.2×0.15×0.7 box on left counter at z=-12, with inner void suggestion (raised rim geometry)
- 3 conduit pipes along ceiling: thin boxes (0.12×0.12×L) at x=-2, 0, 2, y=3.15
- Fallen chair: seat box + 4 legs, rotated 90° (lying on its side), at z=-22 center
- Drip mark strips: 6 thin dark patches (0.06×1.2×0.06) on walls at various z positions
- Light fixtures: 4 tube-style boxes on ceiling at z=-8, -18, -30, -42
- Collidables: walls, back wall, counters, cabinets, sink

**Config:**
```js
{
  name: 'WetKitchen',
  startPosition: [0, 1.7, 1],
  fog: { color: '#0c120c', near: 5, far: 25 },
  background: '#080e08',
  ambient: { color: '#304030', intensity: 0.05 },
  lights: [
    { type: 'point', color: '#b0ffb8', intensity: 2.5, distance: 18, position: [0, 3.0, -10], flicker: false, shadows: true },
    { type: 'point', color: '#b0ffb8', intensity: 2.0, distance: 15, position: [-3, 3.0, -28], flicker: true, flickerSpeed: 0.15, shadows: false },
    { type: 'point', color: '#b0ffb8', intensity: 1.5, distance: 12, position: [3, 3.0, -40], flicker: true, flickerSpeed: 0.08, shadows: false },
  ],
  sanityDrain: 1.5,
  vignetteBase: 0.40,
  transition: { position: [0, 1.7, -44], radius: 3.5 },
}
```

---

### 3. RedBedroom

**File:** `src/levels/buildRedBedroom.js`
**Registry key:** `redBedroom`

**Dimensions:** W:8, H:2.8, L:14

**Materials:**
- Floor: `#2a1f14` (dark wood), roughness 0.9
- Walls: `#d4c8a8` (faded cream wallpaper), roughness 0.95
- Ceiling: `#c8bca0`, roughness 0.9
- Bed frame: `#1a1210` (near-black wood), roughness 0.85
- Mattress: `#d0c0b0` (dirty white), roughness 1.0
- Pillow: `#e0d8c8`, roughness 1.0
- Dresser/wardrobe: `#2a1f14`, roughness 0.85
- Drawer face: `#3a2a1a`, roughness 0.8
- Window frame: `#1a1210`
- Window void: `#000000` (absolute black)
- Lamp body: `#c0a060`, roughness 0.6
- Nightstand: `#2a1f14`, roughness 0.85
- Mirror: `#c0c8c0`, roughness 0.0, metalness 1.0 (reflective)

**Geometry:**
- Floor, ceiling, 4 walls (no open ends — room is fully enclosed)
- Bed: frame (box), mattress on top, 2 pillows, 4 legs — against far-left wall
- Dresser: main body + 3 drawer faces, top drawer slightly open (+z offset) — right wall
- Wardrobe: tall box (0.8×2.2×0.6) + 2 door panels, left door ajar — left wall
- Nightstand: small box next to bed
- Lamp: cylinder base + shade box on nightstand (off — no light emitted from it)
- Window: frame box on far wall, inner black void box (absolute black, no light)
- Mirror: flat reflective panel on right wall
- Door: far-right wall, player enters through it
- Collidables: all 4 walls, bed frame, dresser, wardrobe

**Config:**
```js
{
  name: 'RedBedroom',
  startPosition: [0, 1.7, 1],
  fog: { color: '#1a0202', near: 2, far: 9 },
  background: '#120002',
  ambient: { color: '#400008', intensity: 0.04 },
  lights: [
    { type: 'point', color: '#ff1010', intensity: 5, distance: 12, position: [0, 1.4, -5], flicker: true, flickerSpeed: 0.06, shadows: true },
  ],
  sanityDrain: 2.5,
  vignetteBase: 0.55,
  transition: { position: [0, 1.7, -10], radius: 3.0 },
}
```

---

### 4. EndlessStairs

**File:** `src/levels/buildEndlessStairs.js`
**Registry key:** `endlessStairs`

**Dimensions:** W:5, H:30 (void above fog), L:20 (footprint), stairs climb to y≈24

**Materials:**
- Steps/floor/walls: `#2e2e2e` (rough concrete), roughness 1.0
- Ceiling: none (open void at top)
- Handrail: `#1a1a1a` (dark metal), roughness 0.4, metalness 0.7
- Emergency strips: emissive `#ff2200`, emissiveIntensity 2.0
- Graffiti patch: `#8b0000` (dark red), roughness 1.0
- Door frame: `#3a3230`, roughness 0.9

**Geometry:**
- Ground floor (landing): W×0.1×L box at y=0
- Left wall and right wall full height
- Back wall at z=2
- 80 steps: each BoxGeometry(W-0.2, 0.28, 0.75), y = 0.14 + i×0.28, z = -1.5 - i×0.7
- Each step spans W-0.2 (nearly full width, gap for handrail)
- Landings: 3 wider platforms at step 20, 40, 60 (wider z extent)
- Handrail: thin boxes (0.08×0.08) running alongside steps on right side
- Emergency strip lights: thin emissive boxes (W×0.04×0.04) on left wall every 5 steps at ankle height
- Graffiti: 0.6×0.4×0.04 box on left wall at step 15 height
- Door frame at step 35 height on right wall (frame only, no door, opens to wall)
- Collidables: walls, back wall, each step (player walks up them via collision)

**Config:**
```js
{
  name: 'EndlessStairs',
  startPosition: [0, 1.7, 1],
  fog: { color: '#141414', near: 3, far: 14 },
  background: '#0a0a0a',
  ambient: { color: '#200800', intensity: 0.03 },
  lights: [
    { type: 'point', color: '#ff3300', intensity: 1.5, distance: 8, position: [0, 2.0, -3], flicker: true, flickerSpeed: 0.3, shadows: false },
    { type: 'point', color: '#ff3300', intensity: 1.2, distance: 8, position: [0, 8.0, -8], flicker: true, flickerSpeed: 0.2, shadows: false },
    { type: 'point', color: '#ff3300', intensity: 1.0, distance: 8, position: [0, 16.0, -13], flicker: false, shadows: false },
  ],
  sanityDrain: 1.2,
  vignetteBase: 0.38,
  transition: { position: [0, 1.7, -16], radius: 3.5 },
}
```

> **Note:** The transition trigger is on the ground floor at z=-16 (back of the footprint). The player never reaches the top — they loop out before that.

---

### 5. ConcreteTunnel

**File:** `src/levels/buildConcreteTunnel.js`
**Registry key:** `concreteTunnel`

**Dimensions:** W:2.8, H:3, L:55

**Materials:**
- Floor: `#1c1c1a` (wet dark concrete), roughness 0.85, metalness 0.1
- Walls/ceiling: `#252520` (rough concrete), roughness 1.0
- Conduit pipes: `#303028`, roughness 0.5, metalness 0.6
- Grate frames: `#282820`, roughness 0.6, metalness 0.4
- Gate/fence: `#202018`, roughness 0.7, metalness 0.5
- Warning patches: `#c84000` (orange-red), roughness 1.0
- Damage marks: `#0a0a08` (black), roughness 1.0
- Emergency strips: emissive `#ff6600`, emissiveIntensity 1.8

**Geometry:**
- Floor, ceiling, left wall, right wall, back wall
- 4 conduit pipes along ceiling full length: thin boxes (0.1×0.1×L) at x=-0.8, -0.3, 0.3, 0.8
- Ventilation grates (left wall): 5 groups of 4 small boxes forming grid pattern at z=-10, -20, -30, -40, -50
- Chain-link gate: full-height crossing bars at z=-25 (collidable, but with a 0.8-wide gap on right side player can pass through)
- Junction opening (blocked): a doorway shape cut into right wall at z=-35 with a solid box filling it (hinting at another tunnel)
- Warning sign patches: 4 flat colored boxes on walls at various positions
- Water damage strips: thin dark boxes on ceiling and upper walls
- Emergency strip lights: thin emissive boxes on wall at y=0.15, every 8 units
- Collidables: walls, ceiling (for crouching feel), gate, junction block

**Config:**
```js
{
  name: 'ConcreteTunnel',
  startPosition: [0, 1.7, 1],
  fog: { color: '#101010', near: 3, far: 18 },
  background: '#080808',
  ambient: { color: '#180800', intensity: 0.03 },
  lights: [
    { type: 'point', color: '#ff6600', intensity: 2.0, distance: 10, position: [0, 2.5, -8],  flicker: true,  flickerSpeed: 0.25, shadows: true },
    { type: 'point', color: '#ff6600', intensity: 1.8, distance: 10, position: [0, 2.5, -20], flicker: false, shadows: false },
    { type: 'point', color: '#ff6600', intensity: 1.5, distance: 10, position: [0, 2.5, -33], flicker: true,  flickerSpeed: 0.4,  shadows: false },
    { type: 'point', color: '#ff6600', intensity: 1.5, distance: 10, position: [0, 2.5, -46], flicker: true,  flickerSpeed: 0.12, shadows: false },
  ],
  sanityDrain: 1.6,
  vignetteBase: 0.45,
  transition: { position: [0, 1.7, -51], radius: 3.5 },
}
```

---

### 6. HotelCorridor

**File:** `src/levels/buildHotelCorridor.js`
**Registry key:** `hotelCorridor`

**Dimensions:** W:6, H:2.4, L:70

**Materials:**
- Floor: `#3a1a1a` (dark maroon carpet), roughness 1.0
- Carpet stripe: `#4a2020` (slightly lighter), roughness 1.0 (thin strips for pattern)
- Walls: `#d4cbb8` (faded cream), roughness 0.92
- Chair rail: `#b8b0a0`, roughness 0.88
- Ceiling: `#ccc8bc`, roughness 0.9
- Doors: `#8b7355` (wood), roughness 0.85
- Door frames: `#c0b898`, roughness 0.9
- Sconce body: `#c8b880`, roughness 0.6
- Sconce emissive (live): emissive `#ffc060`, emissiveIntensity 0.9
- Sconce (dead): `#504030`, emissiveIntensity 0
- Service cart: `#808080`, roughness 0.4, metalness 0.5
- Exit sign: emissive `#00ff44`, emissiveIntensity 2.0
- Ajar door light strip: emissive `#ff1010`, emissiveIntensity 1.5
- Mirror: `#c8c8c8`, roughness 0.0, metalness 1.0

**Geometry:**
- Floor, ceiling, left wall, right wall, back wall (behind player), far wall (mirror end)
- Carpet stripe pattern: 8 thin flat boxes (0.08×0.01×L) running full length at x=-2, -1.3, -0.7, 0, 0.7, 1.3, 2, evenly spaced
- Chair rail: two thin horizontal strips (W×0.06×0.04) at y=0.9 on left and right walls, full length
- Doors: 17 total, alternating left/right every 4 units from z=-4 to z=-68
  - Door panels: 0.9×2.0×0.08, flush with wall
  - Door frames: slightly larger box behind each door
  - One door at z=-32 (left side) slightly ajar: offset 0.15 in z, red emissive strip in gap
- Wall sconces: every 4 units between doors at y=1.8
  - Even-indexed: live (warm emissive)
  - Odd-indexed: dead (no emission)
- Service cart: box (0.6×0.9×0.4) + 2 shelf boxes + 4 wheel cylinders at z=-36, center
- Exit sign: flat emissive box (0.6×0.25×0.04) at far end above transition, y=2.2
- Mirror: flat reflective panel covering full far wall
- Collidables: walls, all door frames, service cart

**Config:**
```js
{
  name: 'HotelCorridor',
  startPosition: [0, 1.7, 1],
  fog: { color: '#2a2018', near: 6, far: 22 },
  background: '#201810',
  ambient: { color: '#604828', intensity: 0.06 },
  lights: [
    { type: 'point', color: '#ffc060', intensity: 1.8, distance: 8,  position: [-2.2, 2.1, -8],  flicker: false, shadows: true  },
    { type: 'point', color: '#ffc060', intensity: 1.5, distance: 8,  position: [2.2,  2.1, -16], flicker: false, shadows: false },
    { type: 'point', color: '#ffc060', intensity: 1.8, distance: 8,  position: [-2.2, 2.1, -28], flicker: false, shadows: false },
    { type: 'point', color: '#ffc060', intensity: 1.5, distance: 8,  position: [2.2,  2.1, -40], flicker: true,  flickerSpeed: 0.05, shadows: false },
    { type: 'point', color: '#ffc060', intensity: 1.2, distance: 8,  position: [-2.2, 2.1, -52], flicker: false, shadows: false },
    { type: 'point', color: '#ffc060', intensity: 1.0, distance: 8,  position: [2.2,  2.1, -64], flicker: false, shadows: false },
  ],
  sanityDrain: 1.0,
  vignetteBase: 0.35,
  transition: { position: [0, 1.7, -66], radius: 3.5 },
}
```

---

## Integration

Each new fragment is added to `fragmentRegistry.js` with its config and `variants: { normal: build<Name>, corrupted: build<Name>Corrupted, impossible: build<Name>Impossible }`. Stub exports added to each builder file.

No changes needed to `DimensionManager`, `Game.js`, or `App.jsx`.

## Out of Scope

- Corrupted/impossible variants (stubs only — future pass)
- Audio
- Animated geometry
- Texture maps
