import * as THREE from 'three';

export function buildStreet() {
  const objects = [];
  const collidables = [];

  const W = 12;   // road width
  const H = 12;   // void height (open sky feel but wrong)
  const L = 55;

  const roadMat     = new THREE.MeshStandardMaterial({ color: '#1a1814', roughness: 0.95 });
  const sidewalkMat = new THREE.MeshStandardMaterial({ color: '#2a2620', roughness: 0.9 });
  const buildingMat = new THREE.MeshStandardMaterial({ color: '#111010', roughness: 0.85 });
  const windowMat   = new THREE.MeshStandardMaterial({
    color: '#ff9920',
    emissive: '#ff7700',
    emissiveIntensity: 0.3,
    transparent: true,
    opacity: 0.6,
  });
  const poleMat     = new THREE.MeshStandardMaterial({ color: '#1c1c1c', roughness: 0.7, metalness: 0.5 });
  const lampMat     = new THREE.MeshStandardMaterial({
    color: '#ffcc66',
    emissive: '#ff9930',
    emissiveIntensity: 1.5,
  });

  const origin = -L / 2 + 2;

  // Road
  const road = new THREE.Mesh(new THREE.BoxGeometry(W, 0.08, L), roadMat);
  road.position.set(0, -0.04, origin);
  road.receiveShadow = true;
  objects.push(road);

  // Sidewalks
  [-1, 1].forEach(side => {
    const sw = new THREE.Mesh(new THREE.BoxGeometry(5, 0.15, L), sidewalkMat);
    sw.position.set(side * (W / 2 + 2.5), 0.075, origin);
    sw.receiveShadow = true;
    objects.push(sw);

    // Building facades along sidewalk
    const facade = new THREE.Mesh(new THREE.BoxGeometry(0.4, H, L), buildingMat);
    facade.position.set(side * (W / 2 + 5.2), H / 2, origin);
    facade.castShadow = true;
    objects.push(facade);
    collidables.push(facade);

    // Windows (rows of slightly glowing orange rects — wrong time of day)
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 7; col++) {
        const winOn = Math.random() > 0.3;
        if (!winOn) continue;
        const win = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.6, 0.8), windowMat);
        win.position.set(
          side * (W / 2 + 5.0),
          1.5 + row * 2.2,
          -5 - col * 6.5
        );
        objects.push(win);
      }
    }
  });

  // Streetlights (alternate sides)
  [-1, 1].forEach(side => {
    [-6, -20, -36].forEach(z => {
      // Pole
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 5.5, 8), poleMat);
      pole.position.set(side * (W / 2 + 0.8), 2.75, z);
      objects.push(pole);
      collidables.push(pole);

      // Arm
      const arm = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.08, 0.08), poleMat);
      arm.position.set(side * (W / 2 + 0.2), 5.5, z);
      objects.push(arm);

      // Lamp head
      const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.2, 0.4), lampMat);
      lamp.position.set(side * (W / 2 - 0.4), 5.4, z);
      objects.push(lamp);
    });
  });

  // Curbs
  [-1, 1].forEach(side => {
    const curb = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.12, L), buildingMat);
    curb.position.set(side * (W / 2 + 0.075), 0.06, origin);
    objects.push(curb);
    collidables.push(curb);
  });

  // Back wall (invisible boundary)
  const bWall = new THREE.Mesh(new THREE.BoxGeometry(W + 12, H, 0.2), buildingMat);
  bWall.position.set(0, H / 2, 2.2);
  objects.push(bWall);
  collidables.push(bWall);

  return { objects, collidables };
}

export function buildStreetCorrupted()  { return buildStreet(); }
export function buildStreetImpossible() { return buildStreet(); }
