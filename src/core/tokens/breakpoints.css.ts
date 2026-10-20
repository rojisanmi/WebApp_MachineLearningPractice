/**
 * Breakpoint Tokens
 */

export const breakpointTokens = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',

  /** Media query strings for JS usage */
  mediaQuery: {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
  },

  /** Container query breakpoints for components */
  container: {
    card: '400px',
    panel: '600px',
    sidebar: '280px',
  },
} as const;

export type BreakpointTokens = typeof breakpointTokens;