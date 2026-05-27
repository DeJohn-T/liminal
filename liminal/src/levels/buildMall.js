import * as THREE from 'three';

export function buildMall() {
  const objects = [];
  const collidables = [];

  const W = 22;
  const H = 5.5;
  const L = 52;

  const wallMat    = new THREE.MeshStandardMaterial({ color: '#12101e', roughness: 0.9 });
  const floorMat   = new THREE.MeshStandardMaterial({ color: '#1e1c2e', roughness: 0.2, metalness: 0.3 });
  const ceilMat    = new THREE.MeshStandardMaterial({ color: '#0a0910', roughness: 1.0 });
  const pillarMat  = new THREE.MeshStandardMaterial({ color: '#0e0c18', roughness: 0.7 });
  const benchMat   = new THREE.MeshStandardMaterial({ color: '#1a1530', roughness: 0.6 });
  const storeMat   = new THREE.MeshStandardMaterial({ color: '#16142a', roughness: 0.8 });
  const glassMat   = new THREE.MeshStandardMaterial({
    color: '#2030ff',
    transparent: true,
    opacity: 0.07,
    roughness: 0.0,
    metalness: 0.9,
  });

  const origin = -L / 2 + 2;

  // Floor
  const floor = new THREE.Mesh(new THREE.BoxGeometry(W, 0.1, L), floorMat);
  floor.position.set(0, -0.05, origin);
  floor.receiveShadow = true;
  objects.push(floor);

  // Ceiling
  objects.push(p(new THREE.BoxGeometry(W, 0.1, L), ceilMat, [0, H + 0.05, origin]));

  // Walls
  [[-W / 2, 0], [W / 2, 0]].forEach(([x]) => {
    const w = p(new THREE.BoxGeometry(0.2, H, L), wallMat, [x, H / 2, origin]);
    objects.push(w);
    collidables.push(w);
  });

  // Back wall
  const bw = p(new THREE.BoxGeometry(W, H, 0.2), wallMat, [0, H / 2, 2.1]);
  objects.push(bw);
  collidables.push(bw);

  // Pillars
  [[-7, -10], [7, -10], [-7, -26], [7, -26], [-7, -40], [7, -40]].forEach(([x, z]) => {
    const pillar = p(new THREE.BoxGeometry(0.8, H, 0.8), pillarMat, [x, H / 2, z]);
    pillar.castShadow = true;
    objects.push(pillar);
    collidables.push(pillar);
  });

  // Store fronts (left and right sides)
  [-14, -28, -42].forEach(z => {
    [-1, 1].forEach(side => {
      const x = side * (W / 2 - 2);
      // Store back wall
      objects.push(p(new THREE.BoxGeometry(4, H - 0.5, 0.15), storeMat, [x, (H - 0.5) / 2, z]));
      // Store side walls
      objects.push(p(new THREE.BoxGeometry(0.15, H - 0.5, 6), storeMat, [x + side * 2, (H - 0.5) / 2, z]));
      // Glass front
      objects.push(p(new THREE.BoxGeometry(3.5, H - 1, 0.05), glassMat, [x, (H - 1) / 2 + 0.5, z + side * 0.1]));
    });
  });

  // Center benches
  [-15, -30].forEach(z => {
    const bench = p(new THREE.BoxGeometry(4, 0.45, 1.2), benchMat, [0, 0.225, z]);
    bench.castShadow = true;
    objects.push(bench);
    collidables.push(bench);
    // Bench legs
    [[-1.5, 0.4], [1.5, 0.4], [-1.5, -0.4], [1.5, -0.4]].forEach(([bx, bz]) => {
      objects.push(p(new THREE.BoxGeometry(0.1, 0.4, 0.1), benchMat, [bx, 0.2, z + bz]));
    });
  });

  // Escalator shape (static, decorative)
  const steps = 12;
  for (let i = 0; i < steps; i++) {
    const step = p(
      new THREE.BoxGeometry(3, 0.15, 0.5),
      storeMat,
      [0, 0.15 + i * 0.35, -44 - i * 0.4]
    );
    objects.push(step);
  }

  return { objects, collidables };
}

function p(geo, mat, [x, y, z]) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  return m;
}

export function buildMallCorrupted()  { return buildMall(); }
export function buildMallImpossible() { return buildMall(); }
