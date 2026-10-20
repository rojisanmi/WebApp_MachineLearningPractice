/**
 * Typography Tokens — Font families, sizes, weights, line heights
 */

export const typographyTokens = {
  /** Font families */
  fontFamily: {
    sans: '"Inter Var", "Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono Var", "JetBrains Mono", ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
    display: '"Inter Var", "Inter", var(--font-sans)',
  },

  /** Fluid type scale using clamp() */
  fontSize: {
    '2xs': 'clamp(0.625rem, 0.6rem + 0.125vw, 0.6875rem)',  // 10-11px
    xs: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',        // 12-14px
    sm: 'clamp(0.875rem, 0.825rem + 0.25vw, 1rem)',         // 14-16px
    base: 'clamp(1rem, 0.925rem + 0.375vw, 1.125rem)',      // 16-18px
    lg: 'clamp(1.125rem, 1.025rem + 0.5vw, 1.25rem)',       // 18-20px
    xl: 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',          // 20-24px
    '2xl': 'clamp(1.5rem, 1.3rem + 1vw, 1.875rem)',         // 24-30px
    '3xl': 'clamp(1.875rem, 1.6rem + 1.375vw, 2.5rem)',     // 30-40px
    '4xl': 'clamp(2.25rem, 1.9rem + 1.75vw, 3.5rem)',       // 36-56px
    '5xl': 'clamp(3rem, 2.5rem + 2.5vw, 5rem)',             // 48-80px
  },

  /** Line heights */
  lineHeight: {
    none: '1',
    tight: '1.1',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  /** Font weights */
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  /** Letter spacing */
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  /** Semantic text styles (composable) */
  textStyle: {
    'display-lg': { size: 'var(--text-5xl)', lineHeight: 'var(--leading-tight)', weight: 'var(--font-weight-extrabold)' },
    'display-md': { size: 'var(--text-4xl)', lineHeight: 'var(--leading-tight)', weight: 'var(--font-weight-bold)' },
    'display-sm': { size: 'var(--text-3xl)', lineHeight: 'var(--leading-snug)', weight: 'var(--font-weight-bold)' },
    'heading-lg': { size: 'var(--text-2xl)', lineHeight: 'var(--leading-snug)', weight: 'var(--font-weight-semibold)' },
    'heading-md': { size: 'var(--text-xl)', lineHeight: 'var(--leading-snug)', weight: 'var(--font-weight-semibold)' },
    'heading-sm': { size: 'var(--text-lg)', lineHeight: 'var(--leading-normal)', weight: 'var(--font-weight-medium)' },
    'body-lg': { size: 'var(--text-lg)', lineHeight: 'var(--leading-relaxed)', weight: 'var(--font-weight-normal)' },
    'body-md': { size: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', weight: 'var(--font-weight-normal)' },
    'body-sm': { size: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', weight: 'var(--font-weight-normal)' },
    'label-lg': { size: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', weight: 'var(--font-weight-medium)' },
    'label-sm': { size: 'var(--text-xs)', lineHeight: 'var(--leading-normal)', weight: 'var(--font-weight-medium)' },
    caption: { size: 'var(--text-2xs)', lineHeight: 'var(--leading-normal)', weight: 'var(--font-weight-normal)' },
    'code-inline': { size: 'var(--text-sm)', lineHeight: 'var(--leading-none)', weight: 'var(--font-weight-medium)' },
    'code-block': { size: 'var(--text-sm)', lineHeight: 'var(--leading-loose)', weight: 'var(--font-weight-normal)' },
    'mono-number': { size: 'var(--text-base)', lineHeight: 'var(--leading-none)', weight: 'var(--font-weight-semibold)' },
  },
} as const;

export type TypographyTokens = typeof typographyTokens;