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
