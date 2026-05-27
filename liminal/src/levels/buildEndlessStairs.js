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
