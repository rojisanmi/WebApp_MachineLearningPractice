/**
 * Animation Utilities — Wrappers for Web Animations API and requestAnimationFrame
 */

/** Easing functions */
export const easings = {
  linear: (t: number) => t,
  easeIn: (t: number) => t * t,
  easeOut: (t: number) => 1 - (1 - t) * (1 - t),
  easeInOut: (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeOutElastic: (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
  easeOutBounce: (t: number) => {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) return n1 * t * t;
    if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
    if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  },
};

/** Animation options */
export interface AnimateOptions {
  duration?: number;
  easing?: keyof typeof easings | ((t: number) => number);
  delay?: number;
  fill?: 'none' | 'forwards' | 'backwards' | 'both';
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  iterations?: number | 'infinite';
}

/** Animate a numeric value with callback */
export function animateValue(
  from: number,
  to: number,
  duration: number,
  onUpdate: (value: number) => void,
  options: AnimateOptions = {}
): Promise<void> {
  const {
    easing = 'easeOutCubic',
    delay = 0,
    fill = 'forwards',
  } = options;

  const easeFn = typeof easing === 'string' ? easings[easing] : easing;
  const startTime = performance.now() + delay;

  return new Promise(resolve => {
    function tick(now: number) {
      const elapsed = now - startTime;
      if (elapsed < 0) {
        requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const eased = easeFn(progress);
      const value = from + (to - from) * eased;

      onUpdate(value);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        if (fill === 'forwards' || fill === 'both') {
          onUpdate(to);
        }
        resolve();
      }
    }

    requestAnimationFrame(tick);
  });
}

/** Animate multiple values simultaneously */
export function animateValues(
  animations: Array<{
    from: number;
    to: number;
    duration: number;
    onUpdate: (value: number) => void;
    options?: AnimateOptions;
  }>
): Promise<void> {
  return Promise.all(animations.map(a => animateValue(a.from, a.to, a.duration, a.onUpdate, a.options)));
}

/** Spring animation config */
export interface SpringConfig {
  stiffness?: number;    // 100-1000, default 170
  damping?: number;      // 10-50, default 26
  mass?: number;         // default 1
  velocity?: number;     // default 0
}

/** Spring animation (simplified) */
export function animateSpring(
  from: number,
  to: number,
  onUpdate: (value: number) => void,
  config: SpringConfig = {}
): () => void {
  const { stiffness = 170, damping = 26, mass = 1, velocity = 0 } = config;

  let current = from;
  let currentVelocity = velocity;
  let animationId: number;
  let stopped = false;

  const target = to;

  function step() {
    if (stopped) return;

    const displacement = current - target;
    const springForce = -stiffness * displacement;
    const dampingForce = -damping * currentVelocity;
    const acceleration = (springForce + dampingForce) / mass;

    currentVelocity += acceleration * (1 / 60); // assume 60fps
    current += currentVelocity * (1 / 60);

    onUpdate(current);

    const isAtRest = Math.abs(currentVelocity) < 0.01 && Math.abs(displacement) < 0.01;

    if (!isAtRest) {
      animationId = requestAnimationFrame(step);
    } else {
      onUpdate(target);
    }
  }

  animationId = requestAnimationFrame(step);

  return () => {
    stopped = true;
    cancelAnimationFrame(animationId);
  };
}

/** Stagger multiple animations */
export function stagger<T>(
  items: T[],
  callback: (item: T, index: number, delay: number) => Promise<void> | void,
  staggerDelay = 50
): Promise<void> {
  return Promise.all(items.map((item, i) =>
    new Promise(resolve => setTimeout(() => resolve(callback(item, i, i * staggerDelay)), i * staggerDelay))
  )).then(() => {});
}

/** Wait for animation frame */
export function raf(): Promise<number> {
  return new Promise(resolve => requestAnimationFrame(resolve));
}

/** Wait for multiple frames */
export function rafFrames(n: number): Promise<void> {
  return new Promise(resolve => {
    let count = 0;
    function loop() {
      count++;
      if (count >= n) resolve();
      else requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  });
}

/** Cancel animation frame safely */
export function cancelRaf(id: number): void {
  cancelAnimationFrame(id);
}