/**
 * Math Utilities Tests
 */

import { describe, it, expect } from 'vitest';
import {
  clamp,
  lerp,
  invLerp,
  mapRange,
  distance,
  distanceSq,
  angle,
  mean,
  stdDev,
  normalize,
  softmax,
  sigmoid,
  linearRegression,
  round,
  roundSigFigs,
} from '../core/utils/math.ts';

describe('Math Utilities', () => {
  describe('clamp', () => {
    it('should clamp value within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });
  });

  describe('lerp', () => {
    it('should interpolate linearly', () => {
      expect(lerp(0, 10, 0)).toBe(0);
      expect(lerp(0, 10, 0.5)).toBe(5);
      expect(lerp(0, 10, 1)).toBe(10);
      expect(lerp(10, 0, 0.5)).toBe(5);
    });
  });

  describe('invLerp', () => {
    it('should return normalized position', () => {
      expect(invLerp(0, 10, 0)).toBe(0);
      expect(invLerp(0, 10, 5)).toBe(0.5);
      expect(invLerp(0, 10, 10)).toBe(1);
      expect(invLerp(0, 10, -5)).toBe(0); // clamped
      expect(invLerp(0, 10, 15)).toBe(1); // clamped
    });
  });

  describe('mapRange', () => {
    it('should map value from one range to another', () => {
      expect(mapRange(5, 0, 10, 0, 100)).toBe(50);
      expect(mapRange(0, -1, 1, 0, 10)).toBe(5);
    });
  });

  describe('distance', () => {
    it('should calculate Euclidean distance', () => {
      expect(distance(0, 0, 3, 4)).toBe(5);
      expect(distance(1, 1, 4, 5)).toBe(5);
    });
  });

  describe('distanceSq', () => {
    it('should calculate squared distance', () => {
      expect(distanceSq(0, 0, 3, 4)).toBe(25);
    });
  });

  describe('angle', () => {
    it('should calculate angle in radians', () => {
      expect(angle(0, 0, 1, 0)).toBe(0);
      expect(angle(0, 0, 0, 1)).toBe(Math.PI / 2);
      expect(angle(0, 0, -1, 0)).toBe(Math.PI);
      expect(angle(0, 0, 0, -1)).toBe(-Math.PI / 2);
    });
  });

  describe('mean', () => {
    it('should calculate arithmetic mean', () => {
      expect(mean([1, 2, 3, 4, 5])).toBe(3);
      expect(mean([10])).toBe(10);
      expect(mean([])).toBe(0);
    });
  });

  describe('stdDev', () => {
    it('should calculate standard deviation', () => {
      // For [1,2,3,4,5]: mean=3, variance=2.5, std=sqrt(2.5)≈1.581
      expect(stdDev([1, 2, 3, 4, 5])).toBeCloseTo(Math.sqrt(2.5), 5);
      expect(stdDev([5])).toBe(0);
    });
  });

  describe('normalize', () => {
    it('should normalize array to 0-1 range', () => {
      const result = normalize([10, 20, 30]);
      expect(result[0]).toBe(0);
      expect(result[1]).toBe(0.5);
      expect(result[2]).toBe(1);
    });

    it('should handle constant array', () => {
      const result = normalize([5, 5, 5]);
      expect(result.every(v => v === 0.5)).toBe(true);
    });
  });

  describe('softmax', () => {
    it('should produce probabilities that sum to 1', () => {
      const result = softmax([1, 2, 3]);
      const sum = result.reduce((a, b) => a + b, 0);
      expect(sum).toBeCloseTo(1, 5);
      expect(result.every(v => v > 0)).toBe(true);
    });

    it('should handle large values without overflow', () => {
      const result = softmax([1000, 2000, 3000]);
      expect(result.every(v => !isNaN(v))).toBe(true);
    });
  });

  describe('sigmoid', () => {
    it('should map to (0, 1)', () => {
      expect(sigmoid(0)).toBe(0.5);
      expect(sigmoid(10)).toBeGreaterThan(0.999);
      expect(sigmoid(-10)).toBeLessThan(0.001);
    });
  });

  describe('linearRegression', () => {
    it('should fit line to points', () => {
      // y = 2x + 1
      const points = [
        { x: 0, y: 1 },
        { x: 1, y: 3 },
        { x: 2, y: 5 },
        { x: 3, y: 7 },
      ];
      const result = linearRegression(points);
      expect(result.slope).toBeCloseTo(2, 5);
      expect(result.intercept).toBeCloseTo(1, 5);
      expect(result.r2).toBeCloseTo(1, 5);
    });
  });

  describe('round', () => {
    it('should round to specified decimals', () => {
      expect(round(1.2345, 2)).toBe(1.23);
      expect(round(1.235, 2)).toBe(1.24);
      expect(round(1.5, 0)).toBe(2);
    });
  });

  describe('roundSigFigs', () => {
    it('should round to significant figures', () => {
      expect(roundSigFigs(123.456, 3)).toBe(123);
      expect(roundSigFigs(0.00123456, 3)).toBe(0.00123);
      expect(roundSigFigs(123456, 3)).toBe(123000);
    });
  });
});