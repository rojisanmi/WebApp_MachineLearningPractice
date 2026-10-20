/**
 * Math Utilities — Common mathematical operations for ML visualizations
 */

/** Clamp value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** Linear interpolation */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Inverse lerp: get t from value between a and b */
export function invLerp(a: number, b: number, value: number): number {
  if (a === b) return 0;
  return clamp((value - a) / (b - a), 0, 1);
}

/** Map value from one range to another */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  clampResult = true
): number {
  const t = invLerp(inMin, inMax, value);
  const result = lerp(outMin, outMax, t);
  return clampResult ? clamp(result, Math.min(outMin, outMax), Math.max(outMin, outMax)) : result;
}

/** Round to decimal places */
export function round(value: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/** Round to significant figures */
export function roundSigFigs(value: number, sigFigs = 3): number {
  if (value === 0) return 0;
  const magnitude = Math.floor(Math.log10(Math.abs(value)));
  const factor = 10 ** (sigFigs - magnitude - 1);
  return Math.round(value * factor) / factor;
}

/** Format number for display */
export function formatNumber(value: number, options: {
  decimals?: number;
  sigFigs?: number;
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
  locale?: string;
} = {}): string {
  const { decimals = 2, sigFigs, notation = 'standard', locale = 'id-ID' } = options;

  if (sigFigs) {
    return roundSigFigs(value, sigFigs).toLocaleString(locale);
  }

  if (notation === 'scientific') {
    return value.toExponential(decimals);
  }

  if (notation === 'compact') {
    return new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: decimals }).format(value);
  }

  return value.toLocaleString(locale, { minimumFractionDigits: 0, maximumFractionDigits: decimals });
}

/** Distance between two points */
export function distance(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.hypot(dx, dy);
}

/** Euclidean distance squared (faster, no sqrt) */
export function distanceSq(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return dx * dx + dy * dy;
}

/** Angle between two points (radians, -PI to PI) */
export function angle(x1: number, y1: number, x2: number, y2: number): number {
  return Math.atan2(y2 - y1, x2 - x1);
}

/** Point at distance and angle from origin */
export function polarToCartesian(cx: number, cy: number, radius: number, angleRad: number): { x: number; y: number } {
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

/** Rotate point around center */
export function rotatePoint(
  x: number,
  y: number,
  cx: number,
  cy: number,
  angleRad: number
): { x: number; y: number } {
  const dx = x - cx;
  const dy = y - cy;
  const cos = Math.cos(angleRad);
  const sin = Math.sin(angleRad);
  return {
    x: cx + dx * cos - dy * sin,
    y: cy + dx * sin + dy * cos,
  };
}

/** Linear regression (least squares) */
export function linearRegression(points: Array<{ x: number; y: number }>): { slope: number; intercept: number; r2: number } {
  const n = points.length;
  if (n < 2) return { slope: 0, intercept: 0, r2: 0 };

  const sumX = points.reduce((s, p) => s + p.x, 0);
  const sumY = points.reduce((s, p) => s + p.y, 0);
  const sumXY = points.reduce((s, p) => s + p.x * p.y, 0);
  const sumXX = points.reduce((s, p) => s + p.x * p.x, 0);
  const sumYY = points.reduce((s, p) => s + p.y * p.y, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // R-squared
  const yMean = sumY / n;
  const ssTot = points.reduce((s, p) => s + (p.y - yMean) ** 2, 0);
  const ssRes = points.reduce((s, p) => s + (p.y - (slope * p.x + intercept)) ** 2, 0);
  const r2 = ssTot === 0 ? 1 : 1 - ssRes / ssTot;

  return { slope, intercept, r2 };
}

/** Mean */
export function mean(values: number[]): number {
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
}

/** Standard deviation */
export function stdDev(values: number[]): number {
  if (values.length < 2) return 0;
  const m = mean(values);
  const variance = values.reduce((s, v) => s + (v - m) ** 2, 0) / (values.length - 1);
  return Math.sqrt(variance);
}

/** Variance */
export function variance(values: number[]): number {
  return stdDev(values) ** 2;
}

/** Min/Max */
export function minMax(values: number[]): { min: number; max: number } | null {
  if (values.length === 0) return null;
  let min = values[0];
  let max = values[0];
  for (let i = 1; i < values.length; i++) {
    if (values[i] < min) min = values[i];
    if (values[i] > max) max = values[i];
  }
  return { min, max };
}

/** Normalize array to 0-1 range */
export function normalize(values: number[]): number[] {
  const mm = minMax(values);
  if (!mm || mm.min === mm.max) return values.map(() => 0.5);
  return values.map(v => (v - mm.min) / (mm.max - mm.min));
}

/** Softmax */
export function softmax(values: number[]): number[] {
  const max = Math.max(...values);
  const exps = values.map(v => Math.exp(v - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map(v => v / sum);
}

/** Sigmoid */
export function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

/** Random integer in range [min, max] */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Random float in range [min, max) */
export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/** Random item from array */
export function randomChoice<T>(array: T[]): T {
  return array[randomInt(0, array.length - 1)];
}

/** Shuffle array in place (Fisher-Yates) */
export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/** Generate unique ID */
export function uid(prefix = ''): string {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 9)}`;
}

/** Deep clone */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/** Debounce */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => fn(...args), delay);
  };
}

/** Throttle */
export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}