/**
 * Shadow & Elevation Tokens
 */

export const shadowTokens = {
  xs: '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
  sm: '0 1px 3px 0 rgba(15, 23, 42, 0.08), 0 1px 2px -1px rgba(15, 23, 42, 0.08)',
  md: '0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -2px rgba(15, 23, 42, 0.1)',
  lg: '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.1)',
  xl: '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.1)',
  '2xl': '0 25px 50px -12px rgba(15, 23, 42, 0.15)',

  focus: '0 0 0 3px var(--color-brand-primary-subtle)',
  'focus-dark': '0 0 0 3px rgba(96, 165, 250, 0.4)',

  /** Elevation mapping */
  elevation: {
    0: 'none',
    1: 'var(--shadow-sm)',
    2: 'var(--shadow-md)',
    3: 'var(--shadow-lg)',
    4: 'var(--shadow-xl)',
    modal: 'var(--shadow-2xl)',
  },
} as const;

export type ShadowTokens = typeof shadowTokens;