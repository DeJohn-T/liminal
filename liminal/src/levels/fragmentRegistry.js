// src/levels/fragmentRegistry.js
import { buildHallway, buildHallwayCorrupted, buildHallwayImpossible } from './buildHallway';
import { buildMall, buildMallCorrupted, buildMallImpossible } from './buildMall';
import { buildStreet, buildStreetCorrupted, buildStreetImpossible } from './buildStreet';
import { buildNurseryHall, buildNurseryHallCorrupted, buildNurseryHallImpossible } from './buildNurseryHall';
import { buildWetKitchen, buildWetKitchenCorrupted, buildWetKitchenImpossible } from './buildWetKitchen';
import { buildRedBedroom, buildRedBedroomCorrupted, buildRedBedroomImpossible } from './buildRedBedroom';
import { buildEndlessStairs, buildEndlessStairsCorrupted, buildEndlessStairsImpossible } from './buildEndlessStairs';
import { buildConcreteTunnel, buildConcreteTunnelCorrupted, buildConcreteTunnelImpossible } from './buildConcreteTunnel';
import { buildHotelCorridor, buildHotelCorridorCorrupted, buildHotelCorridorImpossible } from './buildHotelCorridor';

export const FRAGMENTS = {
  hallway: {
    id: 'hallway',
    name: 'The Hallway',
    startPosition: [0, 1.7, 1],
    fog: { color: '#d4cdb8', near: 5, far: 22 },
    background: '#c8c4b0',
    ambient: { color: '#ffffee', intensity: 0.12 },
    lights: [
      { type: 'point', color: '#ffffc0', intensity: 4, distance: 12, position: [0, 2.8, -6],  flicker: true,  flickerSpeed: 0.07, shadows: true  },
      { type: 'point', color: '#ffffc0', intensity: 4, distance: 12, position: [0, 2.8, -18], flicker: false, shadows: false },
      { type: 'point', color: '#ffffc0', intensity: 3, distance: 10, position: [0, 2.8, -30], flicker: true,  flickerSpeed: 0.18, shadows: false },
    ],
    sanityDrain: 0.7,
    vignetteBase: 0.35,
    transition: { position: [0, 1.7, -40], radius: 3.5 },
    variants: {
      normal:     buildHallway,
      corrupted:  buildHallwayCorrupted,
      impossible: buildHallwayImpossible,
    },
  },

  mall: {
    id: 'mall',
    name: 'The Mall',
    startPosition: [0, 1.7, 1],
    fog: { color: '#0e0d18', near: 8, far: 38 },
    background: '#080810',
    ambient: { color: '#1a2060', intensity: 0.06 },
    lights: [
      { type: 'point', color: '#3050ff', intensity: 3,   distance: 22, position: [0,  4.5, -12], flicker: false, shadows: true  },
      { type: 'point', color: '#ff3030', intensity: 1.5, distance: 12, position: [-8, 3.5, -22], flicker: true,  flickerSpeed: 0.28, shadows: false },
      { type: 'point', color: '#2040ff', intensity: 2,   distance: 15, position: [8,  3.5, -35], flicker: true,  flickerSpeed: 0.05, shadows: false },
    ],
    sanityDrain: 1.4,
    vignetteBase: 0.45,
    transition: { position: [0, 1.7, -47], radius: 3.5 },
    variants: {
      normal:     buildMall,
      corrupted:  buildMallCorrupted,
      impossible: buildMallImpossible,
    },
  },

  street: {
    id: 'street',
    name: 'The Street',
    startPosition: [0, 1.7, 1],
    fog: { color: '#1c1a14', near: 6, far: 28 },
    background: '#14120e',
    ambient: { color: '#ff8820', intensity: 0.04 },
    lights: [
      { type: 'point', color: '#ff9940', intensity: 5, distance: 16, position: [-5, 5, -8],  flicker: false, shadows: true  },
      { type: 'point', color: '#ff9940', intensity: 5, distance: 16, position: [5,  5, -22], flicker: true,  flickerSpeed: 0.04, shadows: false },
      { type: 'point', color: '#ff9940', intensity: 4, distance: 14, position: [-5, 5, -36], flicker: false, shadows: false },
    ],
    sanityDrain: 2.0,
    vignetteBase: 0.5,
    transition: { position: [0, 1.7, -50], radius: 3.5 },
    variants: {
      normal:     buildStreet,
      corrupted:  buildStreetCorrupted,
      impossible: buildStreetImpossible,
    },
  },

  nurseryHall: {
    id: 'nurseryHall',
    name: 'NurseryHall',
    startPosition: [0, 1.7, 1],
    fog: { color: '#e8d0d8', near: 4, far: 16 },
    background: '#e0c8d0',
    ambient: { color: '#ffe0e8', intensity: 0.08 },
    lights: [
      { type: 'point', color: '#fff5e0', intensity: 3.5, distance: 10, position: [0, 2.0, -10], flicker: true,  flickerSpeed: 0.22, shadows: true  },
      { type: 'point', color: '#fff5e0', intensity: 3.0, distance: 10, position: [0, 2.0, -35], flicker: false, shadows: false },
    ],
    sanityDrain: 1.8,
    vignetteBase: 0.42,
    transition: { position: [0, 1.7, -55], radius: 3.5 },
    variants: {
      normal:     buildNurseryHall,
      corrupted:  buildNurseryHallCorrupted,
      impossible: buildNurseryHallImpossible,
    },
  },

  wetKitchen: {
    id: 'wetKitchen',
    name: 'WetKitchen',
    startPosition: [0, 1.7, 1],
    fog: { color: '#0c120c', near: 5, far: 25 },
    background: '#080e08',
    ambient: { color: '#304030', intensity: 0.05 },
    lights: [
      { type: 'point', color: '#b0ffb8', intensity: 2.5, distance: 18, position: [0,  3.0, -10], flicker: false, shadows: true  },
      { type: 'point', color: '#b0ffb8', intensity: 2.0, distance: 15, position: [-3, 3.0, -28], flicker: true,  flickerSpeed: 0.15, shadows: false },
      { type: 'point', color: '#b0ffb8', intensity: 1.5, distance: 12, position: [3,  3.0, -40], flicker: true,  flickerSpeed: 0.08, shadows: false },
    ],
    sanityDrain: 1.5,
    vignetteBase: 0.40,
    transition: { position: [0, 1.7, -44], radius: 3.5 },
    variants: {
      normal:     buildWetKitchen,
      corrupted:  buildWetKitchenCorrupted,
      impossible: buildWetKitchenImpossible,
    },
  },

  redBedroom: {
    id: 'redBedroom',
    name: 'RedBedroom',
    startPosition: [0, 1.7, 1],
    fog: { color: '#1a0202', near: 2, far: 9 },
    background: '#120002',
    ambient: { color: '#400008', intensity: 0.04 },
    lights: [
      { type: 'point', color: '#ff1010', intensity: 5, distance: 12, position: [0, 1.4, -5], flicker: true, flickerSpeed: 0.06, shadows: true },
    ],
    sanityDrain: 2.5,
    vignetteBase: 0.55,
    transition: { position: [0, 1.7, -10], radius: 3.0 },
    variants: {
      normal:     buildRedBedroom,
      corrupted:  buildRedBedroomCorrupted,
      impossible: buildRedBedroomImpossible,
    },
  },

  endlessStairs: {
    id: 'endlessStairs',
    name: 'EndlessStairs',
    startPosition: [0, 1.7, 1],
    fog: { color: '#141414', near: 3, far: 14 },
    background: '#0a0a0a',
    ambient: { color: '#200800', intensity: 0.03 },
    lights: [
      { type: 'point', color: '#ff3300', intensity: 1.5, distance: 8, position: [0, 2.0, -3],  flicker: true,  flickerSpeed: 0.3,  shadows: false },
      { type: 'point', color: '#ff3300', intensity: 1.2, distance: 8, position: [0, 8.0, -8],  flicker: true,  flickerSpeed: 0.2,  shadows: false },
      { type: 'point', color: '#ff3300', intensity: 1.0, distance: 8, position: [0, 16.0, -13], flicker: false, shadows: false },
    ],
    sanityDrain: 1.2,
    vignetteBase: 0.38,
    transition: { position: [0, 1.7, -55], radius: 3.5 },
    variants: {
      normal:     buildEndlessStairs,
      corrupted:  buildEndlessStairsCorrupted,
      impossible: buildEndlessStairsImpossible,
    },
  },

  concreteTunnel: {
    id: 'concreteTunnel',
    name: 'ConcreteTunnel',
    startPosition: [0, 1.7, 1],
    fog: { color: '#101010', near: 3, far: 18 },
    background: '#080808',
    ambient: { color: '#180800', intensity: 0.03 },
    lights: [
      { type: 'point', color: '#ff6600', intensity: 2.0, distance: 10, position: [0, 2.5, -8],  flicker: true,  flickerSpeed: 0.25, shadows: true  },
      { type: 'point', color: '#ff6600', intensity: 1.8, distance: 10, position: [0, 2.5, -20], flicker: false, shadows: false },
      { type: 'point', color: '#ff6600', intensity: 1.5, distance: 10, position: [0, 2.5, -33], flicker: true,  flickerSpeed: 0.4,  shadows: false },
      { type: 'point', color: '#ff6600', intensity: 1.5, distance: 10, position: [0, 2.5, -46], flicker: true,  flickerSpeed: 0.12, shadows: false },
    ],
    sanityDrain: 1.6,
    vignetteBase: 0.45,
    transition: { position: [0, 1.7, -51], radius: 3.5 },
    variants: {
      normal:     buildConcreteTunnel,
      corrupted:  buildConcreteTunnelCorrupted,
      impossible: buildConcreteTunnelImpossible,
    },
  },

  hotelCorridor: {
    id: 'hotelCorridor',
    name: 'HotelCorridor',
    startPosition: [0, 1.7, 1],
    fog: { color: '#2a2018', near: 6, far: 22 },
    background: '#201810',
    ambient: { color: '#604828', intensity: 0.06 },
    lights: [
      { type: 'point', color: '#ffc060', intensity: 1.8, distance: 8, position: [-2.2, 2.1, -8],  flicker: false, shadows: true  },
      { type: 'point', color: '#ffc060', intensity: 1.5, distance: 8, position: [2.2,  2.1, -16], flicker: false, shadows: false },
      { type: 'point', color: '#ffc060', intensity: 1.8, distance: 8, position: [-2.2, 2.1, -28], flicker: false, shadows: false },
      { type: 'point', color: '#ffc060', intensity: 1.5, distance: 8, position: [2.2,  2.1, -40], flicker: true,  flickerSpeed: 0.05, shadows: false },
      { type: 'point', color: '#ffc060', intensity: 1.2, distance: 8, position: [-2.2, 2.1, -52], flicker: false, shadows: false },
      { type: 'point', color: '#ffc060', intensity: 1.0, distance: 8, position: [2.2,  2.1, -64], flicker: false, shadows: false },
    ],
    sanityDrain: 1.0,
    vignetteBase: 0.35,
    transition: { position: [0, 1.7, -66], radius: 3.5 },
    variants: {
      normal:     buildHotelCorridor,
      corrupted:  buildHotelCorridorCorrupted,
      impossible: buildHotelCorridorImpossible,
    },
  },
};
