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
