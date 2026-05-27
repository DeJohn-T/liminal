# New Fragment Rooms Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 6 new fragment types (NurseryHall, WetKitchen, RedBedroom, EndlessStairs, ConcreteTunnel, HotelCorridor) to the liminal space pool, bringing the total from 3 to 9.

**Architecture:** Each fragment follows the existing pattern: one builder file exporting `build<Name>`, `build<Name>Corrupted`, `build<Name>Impossible`; one entry added to `fragmentRegistry.js`. No changes to DimensionManager or Game.js.

**Tech Stack:** Three.js 0.169, React 18, Vite 5

---

## File Map

| Action | File |
|--------|------|
| Create | `src/levels/buildNurseryHall.js` |
| Create | `src/levels/buildWetKitchen.js` |
| Create | `src/levels/buildRedBedroom.js` |
| Create | `src/levels/buildEndlessStairs.js` |
| Create | `src/levels/buildConcreteTunnel.js` |
| Create | `src/levels/buildHotelCorridor.js` |
| Modify | `src/levels/fragmentRegistry.js` (6 new imports + 6 new entries) |

---

### Task 1: NurseryHall

**Files:**
- Create: `src/levels/buildNurseryHall.js`
- Modify: `src/levels/fragmentRegistry.js`

- [ ] **Step 1: Create the builder file**

```js
// src/levels/buildNurseryHall.js
import * as THREE from 'three';

export function buildNurseryHall() {
  const objects    = [];
  const collidables = [];

  const W = 3;
  const H = 2.2;
  const L = 60;
  const origin = -L / 2 + 2;

  const floorMat   = new THREE.MeshStandardMaterial({ color: '#3a6b35', roughness: 0.9 });
  const wallMat    = new THREE.MeshStandardMaterial({ color: '#f5c6d0', roughness: 0.95 });
  const ceilMat    = new THREE.MeshStandardMaterial({ color: '#f8f0f0', roughness: 0.85 });
  const stainMat   = new THREE.MeshStandardMaterial({ color: '#d4bfc0', roughness: 1.0 });
  const frameMat   = new THREE.MeshStandardMaterial({ color: '#8b7355', roughness: 0.8 });
  const chairMat   = new THREE.MeshStandardMaterial({ color: '#6b4f2a', roughness: 0.9 });
  const doorMat    = new THREE.MeshStandardMaterial({ color: '#c8a882', roughness: 0.85 });
  const doorFrameMat = new THREE.MeshStandardMaterial({ color: '#d0c8b0', roughness: 0.9 });
  const fixtureMat = new THREE.MeshStandardMaterial({
    color: '#fffce0', emissive: '#fff8e0', emissiveIntensity: 1.0,
  });

  // Floor
  const floor = mesh(new THREE.BoxGeometry(W, 0.1, L), floorMat, [0, -0.05, origin]);
  floor.receiveShadow = true;
  add(objects, floor);

  // Ceiling
  add(objects, mesh(new THREE.BoxGeometry(W, 0.1, L), ceilMat, [0, H + 0.05, origin]));

  // Ceiling water stains
  [[-0.3, -8], [0.4, -22], [-0.2, -38], [0.1, -50]].forEach(([x, z]) => {
    add(objects, mesh(new THREE.BoxGeometry(0.5, 0.02, 0.7), stainMat, [x, H - 0.02, z]));
  });

  // Left wall
  const lWall = mesh(new THREE.BoxGeometry(0.12, H, L), wallMat, [-W / 2, H / 2, origin]);
  lWall.receiveShadow = true;
  add(objects, lWall);
  collidables.push(lWall);

  // Right wall
  const rWall = mesh(new THREE.BoxGeometry(0.12, H, L), wallMat, [W / 2, H / 2, origin]);
  rWall.receiveShadow = true;
  add(objects, rWall);
  collidables.push(rWall);

  // Back wall
  const bWall = mesh(new THREE.BoxGeometry(W, H, 0.12), wallMat, [0, H / 2, 2.1]);
  add(objects, bWall);
  collidables.push(bWall);

  // Light fixtures
  [-10, -35].forEach(z => {
    add(objects, mesh(new THREE.BoxGeometry(0.25, 0.05, 1.2), fixtureMat, [0, H - 0.025, z]));
  });

  // Picture frames (alternating walls)
  [-8, -18, -38].forEach(z => {
    add(objects, mesh(new THREE.BoxGeometry(0.04, 0.55, 0.42), frameMat, [-W / 2 + 0.02, H / 2 + 0.1, z]));
    add(objects, mesh(new THREE.BoxGeometry(0.04, 0.55, 0.42), frameMat, [W / 2 - 0.02, H / 2 + 0.1, z - 5]));
  });

  // Small chair at z=-28, facing away
  add(objects, mesh(new THREE.BoxGeometry(0.5, 0.06, 0.5), chairMat,  [0, 0.45,  -28]));
  add(objects, mesh(new THREE.BoxGeometry(0.5, 0.5,  0.06), chairMat, [0, 0.73,  -28.22]));
  [[-0.2, -27.75], [0.2, -27.75], [-0.2, -28.25], [0.2, -28.25]].forEach(([lx, lz]) => {
    add(objects, mesh(new THREE.BoxGeometry(0.06, 0.45, 0.06), chairMat, [lx, 0.225, lz]));
  });

  // Small door at z=-30, left wall (height 1.4 — too small)
  const frame = mesh(new THREE.BoxGeometry(0.12, 1.55, 0.85), doorFrameMat, [-W / 2 + 0.06, 0.775, -30]);
  add(objects, frame);
  collidables.push(frame);
  add(objects, mesh(new THREE.BoxGeometry(0.1, 1.4, 0.7), doorMat, [-W / 2 + 0.05, 0.7, -30]));

  return { objects, collidables };
}

export function buildNurseryHallCorrupted()  { return buildNurseryHall(); }
export function buildNurseryHallImpossible() { return buildNurseryHall(); }

function mesh(geo, mat, [x, y, z]) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}

function add(arr, obj) { arr.push(obj); }
```

- [ ] **Step 2: Add import to fragmentRegistry.js**

Open `src/levels/fragmentRegistry.js`. After the last existing import line (the buildStreet line), add:

```js
import { buildNurseryHall, buildNurseryHallCorrupted, buildNurseryHallImpossible } from './buildNurseryHall';
```

- [ ] **Step 3: Add fragment entry to FRAGMENTS in fragmentRegistry.js**

Inside the `FRAGMENTS` object, after the `street` entry (before the closing `};`), add:

```js
  nurseryHall: {
    id: 'nurseryHall',
    name: 'NurseryHall',
    startPosition: [0, 1.7, 1],
    fog: { color: '#e8d0d8', near: 4, far: 16 },
    background: '#e0c8d0',
    ambient: { color: '#ffe0e8', intensity: 0.08 },
    lights: [
      { type: 'point', color: '#fff5e0', intensity: 3.5, distance: 10, position: [0, 2.0, -10], flicker: true,  flickerSpeed: 0.22, shadows: true  },
      { type: 'point', color: '#fff5e0', intensity: 3.0, distance: 10, position: [0, 2.0, -35], flicker: false, shadows: false },
    ],
    sanityDrain: 1.8,
    vignetteBase: 0.42,
    transition: { position: [0, 1.7, -55], radius: 3.5 },
    variants: {
      normal:     buildNurseryHall,
      corrupted:  buildNurseryHallCorrupted,
      impossible: buildNurseryHallImpossible,
    },
  },
```

- [ ] **Step 4: Commit**

```bash
git add src/levels/buildNurseryHall.js src/levels/fragmentRegistry.js
git commit -m "feat: add NurseryHall fragment"
```

---

### Task 2: WetKitchen

**Files:**
- Create: `src/levels/buildWetKitchen.js`
- Modify: `src/levels/fragmentRegistry.js`

- [ ] **Step 1: Create the builder file**

```js
// src/levels/buildWetKitchen.js
import * as THREE from 'three';

export function buildWetKitchen() {
  const objects    = [];
  const collidables = [];

  const W = 12;
  const H = 3.2;
  const L = 48;
  const origin = -L / 2 + 2;

  const floorMat   = new THREE.MeshStandardMaterial({ color: '#080a08', metalness: 1.0, roughness: 0.0 });
  const wallMat    = new THREE.MeshStandardMaterial({ color: '#d8d4c8', roughness: 0.92 });
  const ceilMat    = new THREE.MeshStandardMaterial({ color: '#ccc8bc', roughness: 0.88 });
  const counterMat = new THREE.MeshStandardMaterial({ color: '#a0a090', roughness: 0.3, metalness: 0.6 });
  const cabinetMat = new THREE.MeshStandardMaterial({ color: '#c8c4b0', roughness: 0.85 });
  const conduitMat = new THREE.MeshStandardMaterial({ color: '#505050', roughness: 0.4, metalness: 0.8 });
  const sinkMat    = new THREE.MeshStandardMaterial({ color: '#707068', roughness: 0.3, metalness: 0.7 });
  const chairMat   = new THREE.MeshStandardMaterial({ color: '#6b5a40', roughness: 0.9 });
  const dripMat    = new THREE.MeshStandardMaterial({ color: '#1a1c18', roughness: 1.0 });
  const fixtureMat = new THREE.MeshStandardMaterial({
    color: '#c0f0c4', emissive: '#c8ffcc', emissiveIntensity: 0.8,
  });

  // Floor (mirror-wet)
  const floor = mesh(new THREE.BoxGeometry(W, 0.1, L), floorMat, [0, -0.05, origin]);
  floor.receiveShadow = true;
  objects.push(floor);

  // Ceiling
  objects.push(mesh(new THREE.BoxGeometry(W, 0.1, L), ceilMat, [0, H + 0.05, origin]));

  // Walls
  const lWall = mesh(new THREE.BoxGeometry(0.15, H, L), wallMat, [-W / 2, H / 2, origin]);
  lWall.receiveShadow = true;
  objects.push(lWall);
  collidables.push(lWall);

  const rWall = mesh(new THREE.BoxGeometry(0.15, H, L), wallMat, [W / 2, H / 2, origin]);
  rWall.receiveShadow = true;
  objects.push(rWall);
  collidables.push(rWall);

  const bWall = mesh(new THREE.BoxGeometry(W, H, 0.15), wallMat, [0, H / 2, 2.1]);
  objects.push(bWall);
  collidables.push(bWall);

  // Counters (left and right)
  const counterL = mesh(new THREE.BoxGeometry(1.8, 0.9, L), counterMat, [-W / 2 + 0.9, 0.45, origin]);
  objects.push(counterL);
  collidables.push(counterL);

  const counterR = mesh(new THREE.BoxGeometry(1.8, 0.9, L), counterMat, [W / 2 - 0.9, 0.45, origin]);
  objects.push(counterR);
  collidables.push(counterR);

  // Overhead cabinets
  const cabL = mesh(new THREE.BoxGeometry(1.5, 0.65, L), cabinetMat, [-W / 2 + 0.75, 2.6, origin]);
  objects.push(cabL);
  collidables.push(cabL);

  const cabR = mesh(new THREE.BoxGeometry(1.5, 0.65, L), cabinetMat, [W / 2 - 0.75, 2.6, origin]);
  objects.push(cabR);
  collidables.push(cabR);

  // Sink on left counter at z=-12
  objects.push(mesh(new THREE.BoxGeometry(1.2, 0.14, 0.7), counterMat, [-W / 2 + 0.9, 0.97, -12]));
  objects.push(mesh(new THREE.BoxGeometry(1.0, 0.12, 0.5), sinkMat,    [-W / 2 + 0.9, 1.03, -12]));

  // Conduit pipes along ceiling
  [-1.5, -0.5, 0.5, 1.5].forEach(x => {
    objects.push(mesh(new THREE.BoxGeometry(0.1, 0.1, L), conduitMat, [x, H - 0.05, origin]));
  });

  // Fallen chair at z=-22
  objects.push(mesh(new THREE.BoxGeometry(0.55, 0.06, 0.55), chairMat, [0, 0.46, -22]));
  objects.push(mesh(new THREE.BoxGeometry(0.55, 0.46, 0.06), chairMat, [0, 0.22, -21.75]));
  [[-0.22, -21.72], [0.22, -21.72], [-0.22, -22.22], [0.22, -22.22]].forEach(([lx, lz]) => {
    objects.push(mesh(new THREE.BoxGeometry(0.06, 0.46, 0.06), chairMat, [lx, 0.22, lz]));
  });

  // Drip marks on walls
  [[-12, -W / 2 + 0.08], [-28, W / 2 - 0.08], [-35, -W / 2 + 0.08],
   [-18, W / 2 - 0.08],  [-42, -W / 2 + 0.08], [-8, W / 2 - 0.08]].forEach(([z, x]) => {
    objects.push(mesh(new THREE.BoxGeometry(0.06, 1.4, 0.04), dripMat, [x, 1.5, z]));
  });

  // Light fixtures
  [-8, -18, -30, -42].forEach(z => {
    objects.push(mesh(new THREE.BoxGeometry(0.3, 0.06, 1.8), fixtureMat, [0, H - 0.03, z]));
  });

  return { objects, collidables };
}

export function buildWetKitchenCorrupted()  { return buildWetKitchen(); }
export function buildWetKitchenImpossible() { return buildWetKitchen(); }

function mesh(geo, mat, [x, y, z]) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}
```

- [ ] **Step 2: Add import to fragmentRegistry.js**

After the nurseryHall import line, add:

```js
import { buildWetKitchen, buildWetKitchenCorrupted, buildWetKitchenImpossible } from './buildWetKitchen';
```

- [ ] **Step 3: Add fragment entry**

After the `nurseryHall` entry, add:

```js
  wetKitchen: {
    id: 'wetKitchen',
    name: 'WetKitchen',
    startPosition: [0, 1.7, 1],
    fog: { color: '#0c120c', near: 5, far: 25 },
    background: '#080e08',
    ambient: { color: '#304030', intensity: 0.05 },
    lights: [
      { type: 'point', color: '#b0ffb8', intensity: 2.5, distance: 18, position: [0,  3.0, -10], flicker: false, shadows: true  },
      { type: 'point', color: '#b0ffb8', intensity: 2.0, distance: 15, position: [-3, 3.0, -28], flicker: true,  flickerSpeed: 0.15, shadows: false },
      { type: 'point', color: '#b0ffb8', intensity: 1.5, distance: 12, position: [3,  3.0, -40], flicker: true,  flickerSpeed: 0.08, shadows: false },
    ],
    sanityDrain: 1.5,
    vignetteBase: 0.40,
    transition: { position: [0, 1.7, -44], radius: 3.5 },
    variants: {
      normal:     buildWetKitchen,
      corrupted:  buildWetKitchenCorrupted,
      impossible: buildWetKitchenImpossible,
    },
  },
```

- [ ] **Step 4: Commit**

```bash
git add src/levels/buildWetKitchen.js src/levels/fragmentRegistry.js
git commit -m "feat: add WetKitchen fragment"
```

---

### Task 3: RedBedroom

**Files:**
- Create: `src/levels/buildRedBedroom.js`
- Modify: `src/levels/fragmentRegistry.js`

- [ ] **Step 1: Create the builder file**

```js
// src/levels/buildRedBedroom.js
import * as THREE from 'three';

export function buildRedBedroom() {
  const objects    = [];
  const collidables = [];

  const W = 8;
  const H = 2.8;
  const L = 14;
  const origin = -L / 2 + 2; // = -5

  const floorMat    = new THREE.MeshStandardMaterial({ color: '#2a1f14', roughness: 0.9 });
  const wallMat     = new THREE.MeshStandardMaterial({ color: '#d4c8a8', roughness: 0.95 });
  const ceilMat     = new THREE.MeshStandardMaterial({ color: '#c8bca0', roughness: 0.9 });
  const woodDarkMat = new THREE.MeshStandardMaterial({ color: '#1a1210', roughness: 0.85 });
  const mattressMat = new THREE.MeshStandardMaterial({ color: '#d0c0b0', roughness: 1.0 });
  const pillowMat   = new THREE.MeshStandardMaterial({ color: '#e0d8c8', roughness: 1.0 });
  const drawerMat   = new THREE.MeshStandardMaterial({ color: '#3a2a1a', roughness: 0.8 });
  const voidMat     = new THREE.MeshStandardMaterial({ color: '#000000' });
  const mirrorMat   = new THREE.MeshStandardMaterial({ color: '#c0c8c0', roughness: 0.0, metalness: 1.0 });
  const lampMat     = new THREE.MeshStandardMaterial({ color: '#c0a060', roughness: 0.6 });

  // Floor
  const floor = mesh(new THREE.BoxGeometry(W, 0.1, L), floorMat, [0, -0.05, origin]);
  floor.receiveShadow = true;
  objects.push(floor);

  // Ceiling
  objects.push(mesh(new THREE.BoxGeometry(W, 0.1, L), ceilMat, [0, H + 0.05, origin]));

  // 4 walls (fully enclosed room)
  const lWall = mesh(new THREE.BoxGeometry(0.12, H, L), wallMat, [-W / 2, H / 2, origin]);
  objects.push(lWall); collidables.push(lWall);

  const rWall = mesh(new THREE.BoxGeometry(0.12, H, L), wallMat, [W / 2, H / 2, origin]);
  objects.push(rWall); collidables.push(rWall);

  const bWall = mesh(new THREE.BoxGeometry(W, H, 0.12), wallMat, [0, H / 2, 2.1]);
  objects.push(bWall); collidables.push(bWall);

  const farZ = origin - L / 2 + 0.06; // = -11.94
  const fWall = mesh(new THREE.BoxGeometry(W, H, 0.12), wallMat, [0, H / 2, farZ]);
  objects.push(fWall); collidables.push(fWall);

  // Bed against left wall, far end
  const bedZ = origin - 1; // = -6
  const bedFrame = mesh(new THREE.BoxGeometry(1.6, 0.45, 2.2), woodDarkMat, [-W / 2 + 1.0, 0.225, bedZ]);
  objects.push(bedFrame); collidables.push(bedFrame);
  objects.push(mesh(new THREE.BoxGeometry(1.4, 0.22, 1.9), mattressMat, [-W / 2 + 1.0, 0.56,  bedZ]));
  objects.push(mesh(new THREE.BoxGeometry(0.55, 0.18, 0.52), pillowMat, [-W / 2 + 0.72, 0.74, bedZ + 0.7]));
  objects.push(mesh(new THREE.BoxGeometry(0.55, 0.18, 0.52), pillowMat, [-W / 2 + 1.28, 0.74, bedZ + 0.7]));
  // Headboard
  objects.push(mesh(new THREE.BoxGeometry(1.6, 0.7, 0.1), woodDarkMat, [-W / 2 + 1.0, 0.8, bedZ + 1.1]));

  // Dresser on right wall
  const dresser = mesh(new THREE.BoxGeometry(1.2, 1.1, 0.55), woodDarkMat, [W / 2 - 0.75, 0.55, -1]);
  objects.push(dresser); collidables.push(dresser);
  objects.push(mesh(new THREE.BoxGeometry(1.0, 0.22, 0.05), drawerMat, [W / 2 - 0.75, 0.94, -0.65])); // top drawer open
  objects.push(mesh(new THREE.BoxGeometry(1.0, 0.22, 0.05), drawerMat, [W / 2 - 0.75, 0.70, -0.72]));
  objects.push(mesh(new THREE.BoxGeometry(1.0, 0.22, 0.05), drawerMat, [W / 2 - 0.75, 0.46, -0.72]));

  // Wardrobe on left wall
  const wardrobe = mesh(new THREE.BoxGeometry(1.0, 2.2, 0.6), woodDarkMat, [-W / 2 + 0.62, 1.1, -2]);
  objects.push(wardrobe); collidables.push(wardrobe);
  objects.push(mesh(new THREE.BoxGeometry(0.44, 2.0, 0.06), drawerMat, [-W / 2 + 0.35, 1.0, -1.67])); // ajar
  objects.push(mesh(new THREE.BoxGeometry(0.44, 2.0, 0.06), drawerMat, [-W / 2 + 0.87, 1.0, -1.72])); // closed

  // Nightstand
  const nightstand = mesh(new THREE.BoxGeometry(0.5, 0.55, 0.45), woodDarkMat, [-W / 2 + 1.0, 0.275, bedZ - 1.4]);
  objects.push(nightstand); collidables.push(nightstand);

  // Lamp on nightstand (off — no light emitted)
  objects.push(mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.2, 8), lampMat, [-W / 2 + 1.0, 0.65, bedZ - 1.4]));
  objects.push(mesh(new THREE.BoxGeometry(0.25, 0.22, 0.25), lampMat,        [-W / 2 + 1.0, 0.86, bedZ - 1.4]));

  // Window on far wall — absolute void
  objects.push(mesh(new THREE.BoxGeometry(1.4, 1.2, 0.15), woodDarkMat, [W / 2 - 1.5, 1.5, farZ + 0.08]));
  objects.push(mesh(new THREE.BoxGeometry(1.1, 0.95, 0.04), voidMat,    [W / 2 - 1.5, 1.5, farZ + 0.04]));

  // Mirror on right wall
  objects.push(mesh(new THREE.BoxGeometry(0.04, 1.2, 0.7), mirrorMat, [W / 2 - 0.02, 1.5, -4]));

  return { objects, collidables };
}

export function buildRedBedroomCorrupted()  { return buildRedBedroom(); }
export function buildRedBedroomImpossible() { return buildRedBedroom(); }

function mesh(geo, mat, [x, y, z]) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}
```

- [ ] **Step 2: Add import to fragmentRegistry.js**

```js
import { buildRedBedroom, buildRedBedroomCorrupted, buildRedBedroomImpossible } from './buildRedBedroom';
```

- [ ] **Step 3: Add fragment entry**

```js
  redBedroom: {
    id: 'redBedroom',
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
    variants: {
      normal:     buildRedBedroom,
      corrupted:  buildRedBedroomCorrupted,
      impossible: buildRedBedroomImpossible,
    },
  },
```

- [ ] **Step 4: Commit**

```bash
git add src/levels/buildRedBedroom.js src/levels/fragmentRegistry.js
git commit -m "feat: add RedBedroom fragment"
```

---

### Task 4: EndlessStairs

**Files:**
- Create: `src/levels/buildEndlessStairs.js`
- Modify: `src/levels/fragmentRegistry.js`

- [ ] **Step 1: Create the builder file**

> Note: The collision system is horizontal (x/z) only. Stairs are visual geometry built against both walls — the player walks the flat floor while the stairs rise alongside them into the fog above.

```js
// src/levels/buildEndlessStairs.js
import * as THREE from 'three';

export function buildEndlessStairs() {
  const objects    = [];
  const collidables = [];

  const W = 5;
  const L = 60;
  const origin = -L / 2 + 2; // = -28

  const concreteMat  = new THREE.MeshStandardMaterial({ color: '#2e2e2e', roughness: 1.0 });
  const handrailMat  = new THREE.MeshStandardMaterial({ color: '#1a1a1a', roughness: 0.4, metalness: 0.7 });
  const emergencyMat = new THREE.MeshStandardMaterial({ color: '#ff2200', emissive: '#ff2200', emissiveIntensity: 2.0 });
  const graffitiMat  = new THREE.MeshStandardMaterial({ color: '#8b0000', roughness: 1.0 });
  const frameMat     = new THREE.MeshStandardMaterial({ color: '#3a3230', roughness: 0.9 });

  // Flat floor (player walks here)
  const floor = mesh(new THREE.BoxGeometry(W, 0.1, L), concreteMat, [0, -0.05, origin]);
  floor.receiveShadow = true;
  objects.push(floor);

  // Walls (very tall — stairs rise into void above)
  const lWall = mesh(new THREE.BoxGeometry(0.15, 30, L), concreteMat, [-W / 2, 15, origin]);
  objects.push(lWall); collidables.push(lWall);

  const rWall = mesh(new THREE.BoxGeometry(0.15, 30, L), concreteMat, [W / 2, 15, origin]);
  objects.push(rWall); collidables.push(rWall);

  const bWall = mesh(new THREE.BoxGeometry(W, 30, 0.15), concreteMat, [0, 15, 2.1]);
  objects.push(bWall); collidables.push(bWall);

  // Stairs LEFT — 50 steps built against left wall, rising as player moves forward
  for (let i = 0; i < 50; i++) {
    objects.push(mesh(
      new THREE.BoxGeometry(1.2, 0.28, 0.75),
      concreteMat,
      [-W / 2 + 0.6, 0.14 + i * 0.28, -1 + i * -1.1]
    ));
  }

  // Stairs RIGHT (mirrored)
  for (let i = 0; i < 50; i++) {
    objects.push(mesh(
      new THREE.BoxGeometry(1.2, 0.28, 0.75),
      concreteMat,
      [W / 2 - 0.6, 0.14 + i * 0.28, -1 + i * -1.1]
    ));
  }

  // Landing slabs at step 15, 30, 45
  [15, 30, 45].forEach(i => {
    objects.push(mesh(
      new THREE.BoxGeometry(W - 0.3, 0.2, 1.5),
      concreteMat,
      [0, 0.14 + i * 0.28 + 0.14, -1 + i * -1.1]
    ));
  });

  // Handrails (approximated as long angled boxes)
  objects.push(mesh(new THREE.BoxGeometry(0.06, 0.06, L * 0.88), handrailMat, [-W / 2 + 1.35, 8, origin + 4]));
  objects.push(mesh(new THREE.BoxGeometry(0.06, 0.06, L * 0.88), handrailMat, [W / 2 - 1.35,  8, origin + 4]));

  // Emergency strip lights on both walls every 6 units
  for (let z = -4; z > origin; z -= 6) {
    objects.push(mesh(new THREE.BoxGeometry(0.06, 0.04, 0.8), emergencyMat, [-W / 2 + 0.04, 0.15, z]));
    objects.push(mesh(new THREE.BoxGeometry(0.06, 0.04, 0.8), emergencyMat, [W / 2 - 0.04,  0.15, z]));
  }

  // Graffiti patch on left wall
  objects.push(mesh(new THREE.BoxGeometry(0.04, 0.4, 0.6), graffitiMat, [-W / 2 + 0.08, 1.4, -22]));

  // Door frame (no door) on right wall
  objects.push(mesh(new THREE.BoxGeometry(0.12, 2.1, 1.05), frameMat, [W / 2 - 0.06, 1.05, -35]));

  return { objects, collidables };
}

export function buildEndlessStairsCorrupted()  { return buildEndlessStairs(); }
export function buildEndlessStairsImpossible() { return buildEndlessStairs(); }

function mesh(geo, mat, [x, y, z]) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}
```

- [ ] **Step 2: Add import to fragmentRegistry.js**

```js
import { buildEndlessStairs, buildEndlessStairsCorrupted, buildEndlessStairsImpossible } from './buildEndlessStairs';
```

- [ ] **Step 3: Add fragment entry**

```js
  endlessStairs: {
    id: 'endlessStairs',
    name: 'EndlessStairs',
    startPosition: [0, 1.7, 1],
    fog: { color: '#141414', near: 3, far: 14 },
    background: '#0a0a0a',
    ambient: { color: '#200800', intensity: 0.03 },
    lights: [
      { type: 'point', color: '#ff3300', intensity: 1.5, distance: 8, position: [0, 2.0, -3],  flicker: true,  flickerSpeed: 0.3,  shadows: false },
      { type: 'point', color: '#ff3300', intensity: 1.2, distance: 8, position: [0, 8.0, -8],  flicker: true,  flickerSpeed: 0.2,  shadows: false },
      { type: 'point', color: '#ff3300', intensity: 1.0, distance: 8, position: [0, 16.0, -13], flicker: false, shadows: false },
    ],
    sanityDrain: 1.2,
    vignetteBase: 0.38,
    transition: { position: [0, 1.7, -55], radius: 3.5 },
    variants: {
      normal:     buildEndlessStairs,
      corrupted:  buildEndlessStairsCorrupted,
      impossible: buildEndlessStairsImpossible,
    },
  },
```

- [ ] **Step 4: Commit**

```bash
git add src/levels/buildEndlessStairs.js src/levels/fragmentRegistry.js
git commit -m "feat: add EndlessStairs fragment"
```

---

### Task 5: ConcreteTunnel

**Files:**
- Create: `src/levels/buildConcreteTunnel.js`
- Modify: `src/levels/fragmentRegistry.js`

- [ ] **Step 1: Create the builder file**

```js
// src/levels/buildConcreteTunnel.js
import * as THREE from 'three';

export function buildConcreteTunnel() {
  const objects    = [];
  const collidables = [];

  const W = 2.8;
  const H = 3;
  const L = 55;
  const origin = -L / 2 + 2; // = -25.5

  const floorMat   = new THREE.MeshStandardMaterial({ color: '#1c1c1a', roughness: 0.85, metalness: 0.1 });
  const wallMat    = new THREE.MeshStandardMaterial({ color: '#252520', roughness: 1.0 });
  const conduitMat = new THREE.MeshStandardMaterial({ color: '#303028', roughness: 0.5, metalness: 0.6 });
  const gateMat    = new THREE.MeshStandardMaterial({ color: '#202018', roughness: 0.7, metalness: 0.5 });
  const warnMat    = new THREE.MeshStandardMaterial({ color: '#c84000', roughness: 1.0 });
  const damageMat  = new THREE.MeshStandardMaterial({ color: '#0a0a08', roughness: 1.0 });
  const stripMat   = new THREE.MeshStandardMaterial({ color: '#ff6600', emissive: '#ff6600', emissiveIntensity: 1.8 });

  // Floor
  const floor = mesh(new THREE.BoxGeometry(W, 0.1, L), floorMat, [0, -0.05, origin]);
  floor.receiveShadow = true;
  objects.push(floor);

  // Ceiling
  objects.push(mesh(new THREE.BoxGeometry(W, 0.12, L), wallMat, [0, H + 0.06, origin]));

  // Walls
  const lWall = mesh(new THREE.BoxGeometry(0.12, H, L), wallMat, [-W / 2, H / 2, origin]);
  objects.push(lWall); collidables.push(lWall);

  const rWall = mesh(new THREE.BoxGeometry(0.12, H, L), wallMat, [W / 2, H / 2, origin]);
  objects.push(rWall); collidables.push(rWall);

  const bWall = mesh(new THREE.BoxGeometry(W, H, 0.12), wallMat, [0, H / 2, 2.1]);
  objects.push(bWall); collidables.push(bWall);

  // 4 conduit pipes on ceiling
  [-0.8, -0.3, 0.3, 0.8].forEach(x => {
    objects.push(mesh(new THREE.BoxGeometry(0.1, 0.1, L), conduitMat, [x, H - 0.05, origin]));
  });

  // Ventilation grates on left wall — 5 groups of 4 small boxes
  [-10, -20, -30, -40, -50].forEach(z => {
    [[0.55, 1.8], [0.55, 1.3], [1.1, 1.8], [1.1, 1.3]].forEach(([dz, y]) => {
      objects.push(mesh(new THREE.BoxGeometry(0.04, 0.22, 0.18), conduitMat, [-W / 2 + 0.02, y, z + dz]));
    });
  });

  // Chain-link gate at z=-25 — leaves 0.8-wide gap on right side
  const gateL = mesh(new THREE.BoxGeometry(0.08, H, 1.0), gateMat, [-W / 2 + 0.5, H / 2, -25]);
  objects.push(gateL); collidables.push(gateL);

  const gateR = mesh(new THREE.BoxGeometry(0.08, H, 0.9), gateMat, [W / 2 - 0.45, H / 2, -25]);
  objects.push(gateR); collidables.push(gateR);

  // Blocked junction at z=-35, right wall
  const junctionBlock = mesh(new THREE.BoxGeometry(0.12, H, 1.2), wallMat, [W / 2 - 0.06, H / 2, -35]);
  objects.push(junctionBlock); collidables.push(junctionBlock);

  // Warning sign patches on walls
  [[-8, -W / 2 + 0.06], [-18, W / 2 - 0.06], [-42, -W / 2 + 0.06], [-50, W / 2 - 0.06]].forEach(([z, x]) => {
    objects.push(mesh(new THREE.BoxGeometry(0.04, 0.4, 0.6), warnMat, [x, 1.6, z]));
  });

  // Water damage strips
  [[-5, -W / 2 + 0.06, 1.8], [-15, W / 2 - 0.06, 2.2], [-33, -W / 2 + 0.06, 2.5], [-44, W / 2 - 0.06, 1.5]].forEach(([z, x, y]) => {
    objects.push(mesh(new THREE.BoxGeometry(0.04, 0.9, 0.05), damageMat, [x, y, z]));
  });

  // Emergency strip lights every 8 units
  for (let z = -4; z > origin; z -= 8) {
    objects.push(mesh(new THREE.BoxGeometry(0.05, 0.04, 0.7), stripMat, [-W / 2 + 0.03, 0.15, z]));
    objects.push(mesh(new THREE.BoxGeometry(0.05, 0.04, 0.7), stripMat, [W / 2 - 0.03,  0.15, z]));
  }

  return { objects, collidables };
}

export function buildConcreteTunnelCorrupted()  { return buildConcreteTunnel(); }
export function buildConcreteTunnelImpossible() { return buildConcreteTunnel(); }

function mesh(geo, mat, [x, y, z]) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}
```

- [ ] **Step 2: Add import to fragmentRegistry.js**

```js
import { buildConcreteTunnel, buildConcreteTunnelCorrupted, buildConcreteTunnelImpossible } from './buildConcreteTunnel';
```

- [ ] **Step 3: Add fragment entry**

```js
  concreteTunnel: {
    id: 'concreteTunnel',
    name: 'ConcreteTunnel',
    startPosition: [0, 1.7, 1],
    fog: { color: '#101010', near: 3, far: 18 },
    background: '#080808',
    ambient: { color: '#180800', intensity: 0.03 },
    lights: [
      { type: 'point', color: '#ff6600', intensity: 2.0, distance: 10, position: [0, 2.5, -8],  flicker: true,  flickerSpeed: 0.25, shadows: true  },
      { type: 'point', color: '#ff6600', intensity: 1.8, distance: 10, position: [0, 2.5, -20], flicker: false, shadows: false },
      { type: 'point', color: '#ff6600', intensity: 1.5, distance: 10, position: [0, 2.5, -33], flicker: true,  flickerSpeed: 0.4,  shadows: false },
      { type: 'point', color: '#ff6600', intensity: 1.5, distance: 10, position: [0, 2.5, -46], flicker: true,  flickerSpeed: 0.12, shadows: false },
    ],
    sanityDrain: 1.6,
    vignetteBase: 0.45,
    transition: { position: [0, 1.7, -51], radius: 3.5 },
    variants: {
      normal:     buildConcreteTunnel,
      corrupted:  buildConcreteTunnelCorrupted,
      impossible: buildConcreteTunnelImpossible,
    },
  },
```

- [ ] **Step 4: Commit**

```bash
git add src/levels/buildConcreteTunnel.js src/levels/fragmentRegistry.js
git commit -m "feat: add ConcreteTunnel fragment"
```

---

### Task 6: HotelCorridor

**Files:**
- Create: `src/levels/buildHotelCorridor.js`
- Modify: `src/levels/fragmentRegistry.js`

- [ ] **Step 1: Create the builder file**

```js
// src/levels/buildHotelCorridor.js
import * as THREE from 'three';

export function buildHotelCorridor() {
  const objects    = [];
  const collidables = [];

  const W = 6;
  const H = 2.4;
  const L = 70;
  const origin = -L / 2 + 2; // = -33

  const carpetMat    = new THREE.MeshStandardMaterial({ color: '#3a1a1a', roughness: 1.0 });
  const stripeMat    = new THREE.MeshStandardMaterial({ color: '#4a2020', roughness: 1.0 });
  const wallMat      = new THREE.MeshStandardMaterial({ color: '#d4cbb8', roughness: 0.92 });
  const railMat      = new THREE.MeshStandardMaterial({ color: '#b8b0a0', roughness: 0.88 });
  const ceilMat      = new THREE.MeshStandardMaterial({ color: '#ccc8bc', roughness: 0.9 });
  const doorMat      = new THREE.MeshStandardMaterial({ color: '#8b7355', roughness: 0.85 });
  const doorFrameMat = new THREE.MeshStandardMaterial({ color: '#c0b898', roughness: 0.9 });
  const sconceOnMat  = new THREE.MeshStandardMaterial({ color: '#d4a84e', emissive: '#ffc060', emissiveIntensity: 0.9 });
  const sconceOffMat = new THREE.MeshStandardMaterial({ color: '#504030', roughness: 0.7 });
  const cartMat      = new THREE.MeshStandardMaterial({ color: '#808080', roughness: 0.4, metalness: 0.5 });
  const exitMat      = new THREE.MeshStandardMaterial({ color: '#00ff44', emissive: '#00ff44', emissiveIntensity: 2.0 });
  const ajarMat      = new THREE.MeshStandardMaterial({ color: '#ff1010', emissive: '#ff1010', emissiveIntensity: 1.5 });
  const mirrorMat    = new THREE.MeshStandardMaterial({ color: '#c8c8c8', roughness: 0.0, metalness: 1.0 });

  // Floor (dark maroon carpet)
  const floor = mesh(new THREE.BoxGeometry(W, 0.08, L), carpetMat, [0, -0.04, origin]);
  floor.receiveShadow = true;
  objects.push(floor);

  // Carpet stripe pattern
  [-2, -1.3, -0.7, 0, 0.7, 1.3, 2].forEach(x => {
    objects.push(mesh(new THREE.BoxGeometry(0.08, 0.01, L), stripeMat, [x, 0.005, origin]));
  });

  // Ceiling
  objects.push(mesh(new THREE.BoxGeometry(W, 0.1, L), ceilMat, [0, H + 0.05, origin]));

  // Walls
  const lWall = mesh(new THREE.BoxGeometry(0.12, H, L), wallMat, [-W / 2, H / 2, origin]);
  objects.push(lWall); collidables.push(lWall);

  const rWall = mesh(new THREE.BoxGeometry(0.12, H, L), wallMat, [W / 2, H / 2, origin]);
  objects.push(rWall); collidables.push(rWall);

  const bWall = mesh(new THREE.BoxGeometry(W, H, 0.12), wallMat, [0, H / 2, 2.1]);
  objects.push(bWall); collidables.push(bWall);

  // Chair rails on both walls
  objects.push(mesh(new THREE.BoxGeometry(0.04, 0.06, L), railMat, [-W / 2 + 0.02, 0.9, origin]));
  objects.push(mesh(new THREE.BoxGeometry(0.04, 0.06, L), railMat, [W / 2 - 0.02,  0.9, origin]));

  // Far wall (full mirror — also the collider)
  const farZ = origin - L / 2 + 0.06; // = -67.94
  const farWallMirror = mesh(new THREE.BoxGeometry(W, H, 0.12), mirrorMat, [0, H / 2, farZ]);
  objects.push(farWallMirror);
  collidables.push(farWallMirror);

  // Exit sign above far end
  objects.push(mesh(new THREE.BoxGeometry(0.6, 0.25, 0.04), exitMat, [0, H - 0.15, farZ + 0.06]));

  // 17 doors alternating left/right every 4 units from z=-4 to z=-68
  for (let i = 0; i < 17; i++) {
    const z    = -4 - i * 4;
    const side = i % 2 === 0 ? -1 : 1;
    const x    = side * (W / 2 - 0.06);

    const frame = mesh(new THREE.BoxGeometry(0.12, 2.1, 1.1), doorFrameMat, [x, 1.05, z]);
    objects.push(frame); collidables.push(frame);

    if (i === 8) {
      // Ajar door at i=8 (z=-36) with red light strip in gap
      objects.push(mesh(new THREE.BoxGeometry(0.1, 2.0, 0.88), doorMat,  [x, 1.0, z + 0.18]));
      objects.push(mesh(new THREE.BoxGeometry(0.04, 2.0, 0.04), ajarMat, [x, 1.0, z + 0.74]));
    } else {
      objects.push(mesh(new THREE.BoxGeometry(0.1, 2.0, 0.88), doorMat, [x, 1.0, z]));
    }
  }

  // Wall sconces between doors (every 3rd is dead)
  for (let i = 0; i < 17; i++) {
    const z    = -6 - i * 4;
    const side = i % 2 === 0 ? -1 : 1;
    const x    = side * (W / 2 - 0.06);
    const mat  = i % 3 === 1 ? sconceOffMat : sconceOnMat;
    objects.push(mesh(new THREE.BoxGeometry(0.08, 0.18, 0.22), mat, [x, H - 0.3, z]));
  }

  // Service cart at z=-36
  const cartBody = mesh(new THREE.BoxGeometry(0.6, 0.85, 0.42), cartMat, [0, 0.425, -36]);
  objects.push(cartBody);
  collidables.push(cartBody);
  objects.push(mesh(new THREE.BoxGeometry(0.55, 0.04, 0.38), cartMat, [0, 0.6,   -36]));
  objects.push(mesh(new THREE.BoxGeometry(0.55, 0.04, 0.38), cartMat, [0, 0.3,   -36]));
  [[-0.25, -35.82], [0.25, -35.82], [-0.25, -36.18], [0.25, -36.18]].forEach(([cx, cz]) => {
    objects.push(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.06, 8), cartMat, [cx, 0.03, cz]));
  });

  return { objects, collidables };
}

export function buildHotelCorridorCorrupted()  { return buildHotelCorridor(); }
export function buildHotelCorridorImpossible() { return buildHotelCorridor(); }

function mesh(geo, mat, [x, y, z]) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}
```

- [ ] **Step 2: Add import to fragmentRegistry.js**

```js
import { buildHotelCorridor, buildHotelCorridorCorrupted, buildHotelCorridorImpossible } from './buildHotelCorridor';
```

- [ ] **Step 3: Add fragment entry**

```js
  hotelCorridor: {
    id: 'hotelCorridor',
    name: 'HotelCorridor',
    startPosition: [0, 1.7, 1],
    fog: { color: '#2a2018', near: 6, far: 22 },
    background: '#201810',
    ambient: { color: '#604828', intensity: 0.06 },
    lights: [
      { type: 'point', color: '#ffc060', intensity: 1.8, distance: 8, position: [-2.2, 2.1, -8],  flicker: false, shadows: true  },
      { type: 'point', color: '#ffc060', intensity: 1.5, distance: 8, position: [2.2,  2.1, -16], flicker: false, shadows: false },
      { type: 'point', color: '#ffc060', intensity: 1.8, distance: 8, position: [-2.2, 2.1, -28], flicker: false, shadows: false },
      { type: 'point', color: '#ffc060', intensity: 1.5, distance: 8, position: [2.2,  2.1, -40], flicker: true,  flickerSpeed: 0.05, shadows: false },
      { type: 'point', color: '#ffc060', intensity: 1.2, distance: 8, position: [-2.2, 2.1, -52], flicker: false, shadows: false },
      { type: 'point', color: '#ffc060', intensity: 1.0, distance: 8, position: [2.2,  2.1, -64], flicker: false, shadows: false },
    ],
    sanityDrain: 1.0,
    vignetteBase: 0.35,
    transition: { position: [0, 1.7, -66], radius: 3.5 },
    variants: {
      normal:     buildHotelCorridor,
      corrupted:  buildHotelCorridorCorrupted,
      impossible: buildHotelCorridorImpossible,
    },
  },
```

- [ ] **Step 4: Commit**

```bash
git add src/levels/buildHotelCorridor.js src/levels/fragmentRegistry.js
git commit -m "feat: add HotelCorridor fragment"
```

---

### Task 7: Smoke Test

**Files:** none

- [ ] **Step 1: Verify build is clean**

```bash
npx vite build 2>&1 | tail -5
```

Expected: `✓ built in ...ms` with no errors. Any import errors mean a builder file has a typo in an export name — check against the import line in fragmentRegistry.js.

- [ ] **Step 2: Verify dev server is running**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:5174
```

Expected: `200`

- [ ] **Step 3: Verify all 9 fragments are registered**

In browser console at `http://localhost:5174`, open DevTools and run:

```js
// Vite exposes modules — paste this to check registry
fetch('/src/levels/fragmentRegistry.js').then(r => r.text()).then(t => console.log(t.match(/^\s+\w+:/gm)))
```

Expected: 9 fragment keys logged. (Or just count manually by reading the file — either works.)

- [ ] **Step 4: Walk through 3 different fragments in-game**

Open `http://localhost:5174`, click to enter, walk to the transition trigger at the end of The Hallway. Confirm:
- Transition fires (fog fade)
- A new fragment loads (not always The Hallway)
- No console errors
- Player spawns at the start of the new room

- [ ] **Step 5: Push**

```bash
git push origin main
```

- [ ] **Step 6: Final commit if anything was missed**

```bash
git status
# If clean: nothing to do
```
