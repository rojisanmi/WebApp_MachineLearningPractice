/**
 * Transition & Animation Tokens
 */

export const transitionTokens = {
  /** Durations */
  duration: {
    instant: '0ms',
    fast: '100ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },

  /** Easing functions */
  easing: {
    linear: 'linear',
    out: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    in: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    'in-out': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  /** Common transition combinations */
  transition: {
    fast: 'var(--duration-fast) var(--ease-out)',
    normal: 'var(--duration-normal) var(--ease-out)',
    slow: 'var(--duration-slow) var(--ease-out)',
    all: 'all var(--duration-normal) var(--ease-out)',
    colors: 'background-color var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out)',
    transform: 'transform var(--duration-fast) var(--ease-out)',
    shadow: 'box-shadow var(--duration-fast) var(--ease-out)',
  },
} as const;

export type TransitionTokens = typeof transitionTokens;