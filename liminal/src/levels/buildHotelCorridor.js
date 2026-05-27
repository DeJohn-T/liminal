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
