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
  add(objects, floor);

  // Ceiling
  add(objects, mesh(new THREE.BoxGeometry(W, 0.1, L), ceilMat, [0, H + 0.05, origin]));

  // Walls
  const lWall = mesh(new THREE.BoxGeometry(0.15, H, L), wallMat, [-W / 2, H / 2, origin]);
  lWall.receiveShadow = true;
  add(objects, lWall);
  collidables.push(lWall);

  const rWall = mesh(new THREE.BoxGeometry(0.15, H, L), wallMat, [W / 2, H / 2, origin]);
  rWall.receiveShadow = true;
  add(objects, rWall);
  collidables.push(rWall);

  const bWall = mesh(new THREE.BoxGeometry(W, H, 0.15), wallMat, [0, H / 2, 2.1]);
  add(objects, bWall);
  collidables.push(bWall);

  // Counters (left and right)
  const counterL = mesh(new THREE.BoxGeometry(1.8, 0.9, L), counterMat, [-W / 2 + 0.9, 0.45, origin]);
  add(objects, counterL);
  collidables.push(counterL);

  const counterR = mesh(new THREE.BoxGeometry(1.8, 0.9, L), counterMat, [W / 2 - 0.9, 0.45, origin]);
  add(objects, counterR);
  collidables.push(counterR);

  // Overhead cabinets
  const cabL = mesh(new THREE.BoxGeometry(1.5, 0.65, L), cabinetMat, [-W / 2 + 0.75, 2.6, origin]);
  add(objects, cabL);
  collidables.push(cabL);

  const cabR = mesh(new THREE.BoxGeometry(1.5, 0.65, L), cabinetMat, [W / 2 - 0.75, 2.6, origin]);
  add(objects, cabR);
  collidables.push(cabR);

  // Sink on left counter at z=-12
  add(objects, mesh(new THREE.BoxGeometry(1.2, 0.14, 0.7), counterMat, [-W / 2 + 0.9, 0.97, -12]));
  add(objects, mesh(new THREE.BoxGeometry(1.0, 0.12, 0.5), sinkMat,    [-W / 2 + 0.9, 1.03, -12]));

  // Conduit pipes along ceiling
  [-1.5, -0.5, 0.5, 1.5].forEach(x => {
    add(objects, mesh(new THREE.BoxGeometry(0.1, 0.1, L), conduitMat, [x, H - 0.05, origin]));
  });

  // Fallen chair at z=-22
  add(objects, mesh(new THREE.BoxGeometry(0.55, 0.06, 0.55), chairMat, [0, 0.46, -22]));
  add(objects, mesh(new THREE.BoxGeometry(0.55, 0.46, 0.06), chairMat, [0, 0.22, -21.75]));
  [[-0.22, -21.72], [0.22, -21.72], [-0.22, -22.22], [0.22, -22.22]].forEach(([lx, lz]) => {
    add(objects, mesh(new THREE.BoxGeometry(0.06, 0.46, 0.06), chairMat, [lx, 0.22, lz]));
  });

  // Drip marks on walls
  [[-12, -W / 2 + 0.08], [-28, W / 2 - 0.08], [-35, -W / 2 + 0.08],
   [-18, W / 2 - 0.08],  [-42, -W / 2 + 0.08], [-8, W / 2 - 0.08]].forEach(([z, x]) => {
    add(objects, mesh(new THREE.BoxGeometry(0.06, 1.4, 0.04), dripMat, [x, 1.5, z]));
  });

  // Light fixtures
  [-8, -18, -30, -42].forEach(z => {
    add(objects, mesh(new THREE.BoxGeometry(0.3, 0.06, 1.8), fixtureMat, [0, H - 0.03, z]));
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

function add(arr, obj) { arr.push(obj); }
