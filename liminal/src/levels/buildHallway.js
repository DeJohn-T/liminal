import * as THREE from 'three';

export function buildHallway() {
  const objects = [];
  const collidables = [];

  const W = 4;    // width
  const H = 3;    // height
  const L = 46;   // length

  const wallMat  = new THREE.MeshStandardMaterial({ color: '#e8e0c4', roughness: 0.95 });
  const floorMat = new THREE.MeshStandardMaterial({ color: '#7a6e5c', roughness: 1.0 });
  const ceilMat  = new THREE.MeshStandardMaterial({ color: '#f0ece0', roughness: 0.85 });
  const fixtureMat = new THREE.MeshStandardMaterial({
    color: '#ffffee',
    emissive: '#ffffc0',
    emissiveIntensity: 1.2,
  });
  const doorMat  = new THREE.MeshStandardMaterial({ color: '#5c4f3d', roughness: 0.8 });
  const doorFrameMat = new THREE.MeshStandardMaterial({ color: '#d0c8b0', roughness: 0.9 });

  const origin = -L / 2 + 2; // z center of room

  // Floor
  const floor = mesh(new THREE.BoxGeometry(W, 0.1, L), floorMat, [0, -0.05, origin]);
  floor.receiveShadow = true;
  add(objects, floor);

  // Ceiling
  add(objects, mesh(new THREE.BoxGeometry(W, 0.1, L), ceilMat, [0, H + 0.05, origin]));

  // Left wall
  const lWall = mesh(new THREE.BoxGeometry(0.15, H, L), wallMat, [-W / 2, H / 2, origin]);
  lWall.receiveShadow = true;
  add(objects, lWall);
  collidables.push(lWall);

  // Right wall
  const rWall = mesh(new THREE.BoxGeometry(0.15, H, L), wallMat, [W / 2, H / 2, origin]);
  rWall.receiveShadow = true;
  add(objects, rWall);
  collidables.push(rWall);

  // Back wall (behind player)
  const bWall = mesh(new THREE.BoxGeometry(W, H, 0.15), wallMat, [0, H / 2, 2.1]);
  add(objects, bWall);
  collidables.push(bWall);

  // Fluorescent light fixtures
  [-5, -14, -24, -34].forEach(z => {
    add(objects, mesh(new THREE.BoxGeometry(0.35, 0.06, 1.6), fixtureMat, [0, H - 0.03, z]));
  });

  // Doors (left and right, decorative — no opening)
  [-9, -20, -31].forEach(z => {
    [-1, 1].forEach(side => {
      const x = side * (W / 2 - 0.07);
      // Frame (visual only — not collidable, wall handles boundary)
      const frame = mesh(new THREE.BoxGeometry(0.12, 2.3, 1.1), doorFrameMat, [x, 1.15, z]);
      add(objects, frame);
      // Door panel
      const door = mesh(new THREE.BoxGeometry(0.1, 2.1, 0.9), doorMat, [x, 1.05, z]);
      add(objects, door);
    });
  });

  // Baseboard trim
  const baseboardMat = new THREE.MeshStandardMaterial({ color: '#c8c0a8', roughness: 0.9 });
  [-1, 1].forEach(side => {
    const b = mesh(new THREE.BoxGeometry(0.08, 0.15, L), baseboardMat, [side * (W / 2 - 0.04), 0.075, origin]);
    add(objects, b);
  });

  return { objects, collidables };
}

function mesh(geo, mat, [x, y, z]) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}

function add(arr, obj) {
  arr.push(obj);
}

export function buildHallwayCorrupted()  { return buildHallway(); }
export function buildHallwayImpossible() { return buildHallway(); }
