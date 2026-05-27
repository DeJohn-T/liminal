import * as THREE from 'three';
import { FirstPersonController } from './FirstPersonController';
import { DimensionManager }      from './DimensionManager';
import { SanitySystem }          from './SanitySystem';

export class Game {
  constructor(canvas, { onSanity, onLevel, onTransition }) {
    this.canvas = canvas;
    this.onSanity     = onSanity;
    this.onLevel      = onLevel;
    this.onTransition = onTransition;

    this.scene    = new THREE.Scene();
    this.camera   = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.05, 200);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.clock    = new THREE.Clock();
    this.running  = false;

    // Transition state
    this._transitioning = false;
    this._transitionFog = null;

    this._init();
  }

  _init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;

    this.controller = new FirstPersonController(this.camera, this.renderer.domElement);
    this.levels     = new DimensionManager(this.scene);
    this.sanity     = new SanitySystem();

    this.levels.loadFragment('hallway', 'normal', this.camera);
    this.onLevel?.(this.levels.config.name);

    window.addEventListener('resize', this._onResize.bind(this));
  }

  start() {
    this.running = true;
    this._loop();
  }

  stop() {
    this.running = false;
  }

  _loop() {
    if (!this.running) return;
    requestAnimationFrame(this._loop.bind(this));

    const delta = Math.min(this.clock.getDelta(), 0.05); // cap delta

    // Update controller (movement + collision)
    this.controller.update(delta, this.levels.getCollidables());

    // Update lights (flicker, etc.)
    this.levels.update();

    // Sanity
    if (!this._transitioning) {
      this.sanity.update(delta, this.levels.config.sanityDrain);
      this.onSanity?.(this.sanity.value, this.sanity.insanity);
    }

    // Check for level transition
    if (!this._transitioning) {
      const next = this.levels.checkTransition(this.camera.position);
      if (next !== null) this._startTransition();
    } else {
      this._tickTransition(delta);
    }

    // Apply sanity fog mod (fog near/far drifts slightly with insanity)
    if (!this._transitioning && this.scene.fog) {
      const ins = this.sanity.insanity;
      const baseFar = this.levels.config.fog.far;
      this.scene.fog.far = baseFar - ins * (baseFar * 0.25); // fog closes in
    }

    this.renderer.render(this.scene, this.camera);
  }

  _startTransition() {
    this._transitioning = true;
    this._transitionProgress = 0;
    this._transitionPhase = 'out';
    this.onTransition?.('out');
  }

  _tickTransition(delta) {
    const SPEED = 1.5; // seconds to fade out / in
    this._transitionProgress += delta * SPEED;

    if (this._transitionPhase === 'out') {
      // Rapidly close fog
      if (this.scene.fog) this.scene.fog.far = Math.max(0.5, this.scene.fog.far - delta * 30);

      if (this._transitionProgress >= 1) {
        // Swap level at peak of transition
        this.levels.loadNext(this.sanity.insanity, this.camera);
        this.onLevel?.(this.levels.config.name);
        this._transitionPhase = 'in';
        this._transitionProgress = 0;
        this.onTransition?.('in');
      }
    } else {
      // Fog opens back up in new level
      const targetFar = this.levels.config.fog.far;
      if (this.scene.fog) {
        this.scene.fog.far += delta * 20;
        if (this.scene.fog.far >= targetFar) {
          this.scene.fog.far = targetFar;
          this._transitioning = false;
          this.onTransition?.(null);
        }
      } else {
        this._transitioning = false;
      }
    }
  }

  _onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  dispose() {
    this.running = false;
    this.controller.dispose();
    this.renderer.dispose();
    window.removeEventListener('resize', this._onResize.bind(this));
  }
}
