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
