// src/game/DimensionManager.js
import * as THREE from 'three';
import { FRAGMENTS } from '../levels/fragmentRegistry';

export class DimensionManager {
  constructor(scene) {
    this.scene = scene;
    this._currentConfig = null;
    this._objects = [];
    this._collidables = [];
    this._flickerLights = [];
    this._lastType = null;
    this._history = [];
  }

  get config() { return this._currentConfig; }

  // Explicit load — used for the initial spawn and any forced entry.
  loadFragment(type, variant, camera) {
    this._clearScene();
    this._lastType = type;
    this._history.push(type);

    const cfg = FRAGMENTS[type];
    this._currentConfig = cfg;

    if (camera) camera.position.set(...cfg.startPosition);

    const { objects, collidables } = cfg.variants[variant]();
    objects.forEach(o => { this.scene.add(o); this._objects.push(o); });
    this._collidables = collidables;

    this._setupLights(cfg);
    this.scene.fog        = new THREE.Fog(cfg.fog.color, cfg.fog.near, cfg.fog.far);
    this.scene.background = new THREE.Color(cfg.background);
  }

  // Insanity-driven load — used on every transition after the first.
  loadNext(insanity, camera) {
    const { type, variant } = this._selectNext(insanity);
    this.loadFragment(type, variant, camera);
  }

  _selectNext(insanity) {
    const types = Object.keys(FRAGMENTS);

    // At high insanity the same space can repeat — that's the horror.
    const pool = insanity < 0.7
      ? types.filter(t => t !== this._lastType)
      : types;
    const candidates = pool.length > 0 ? pool : types;

    const type = candidates[Math.floor(Math.random() * candidates.length)];

    // Variant thresholds
    let variant = 'normal';
    if (insanity >= 0.85) {
      variant = Math.random() < 0.5 ? 'corrupted' : 'impossible';
    } else if (insanity >= 0.4) {
      // Linearly ramps from 0% corrupted at 0.4 → 20% corrupted at 0.85
      const corruptChance = ((insanity - 0.4) / 0.45) * 0.2;
      if (Math.random() < corruptChance) variant = 'corrupted';
    }

    return { type, variant };
  }

  _setupLights(cfg) {
    const ambient = new THREE.AmbientLight(cfg.ambient.color, cfg.ambient.intensity);
    this.scene.add(ambient);
    this._objects.push(ambient);

    cfg.lights.forEach(lc => {
      let light;
      if (lc.type === 'point') {
        light = new THREE.PointLight(lc.color, lc.intensity, lc.distance ?? 20);
      } else if (lc.type === 'spot') {
        light = new THREE.SpotLight(lc.color, lc.intensity);
        light.angle    = lc.angle   ?? Math.PI / 6;
        light.penumbra = lc.penumbra ?? 0.3;
      } else {
        light = new THREE.DirectionalLight(lc.color, lc.intensity);
      }

      light.position.set(...lc.position);
      light.castShadow = lc.shadows ?? false;

      if (light.castShadow) {
        light.shadow.mapSize.set(512, 512);
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far  = lc.distance ?? 20;
      }

      this.scene.add(light);
      this._objects.push(light);

      if (lc.flicker) {
        this._flickerLights.push({ light, base: lc.intensity, speed: lc.flickerSpeed ?? 0.1 });
      }
    });
  }

  _clearScene() {
    this._objects.forEach(obj => {
      this.scene.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
        else obj.material.dispose();
      }
      if (obj.shadow?.map) obj.shadow.map.dispose();
    });
    this._objects      = [];
    this._collidables  = [];
    this._flickerLights = [];
  }

  // Returns true when the player is inside the transition trigger, null otherwise.
  checkTransition(position) {
    const t = this._currentConfig?.transition;
    if (!t) return null;
    const dist = new THREE.Vector3(...t.position).distanceTo(position);
    return dist < t.radius ? true : null;
  }

  update() {
    this._flickerLights.forEach(({ light, base, speed }) => {
      light.intensity = base + (Math.random() - 0.5) * speed * base * 2;
    });
  }

  getCollidables() { return this._collidables; }
}
