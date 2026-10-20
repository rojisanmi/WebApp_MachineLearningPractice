/**
 * Spacing Tokens — 4px base unit scale
 */

export const spacingTokens = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  7: '1.75rem',   // 28px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px

  /** Component-specific semantic spacing */
  cardPadding: 'var(--space-6)',
  cardGap: 'var(--space-4)',
  sectionGap: 'var(--space-10)',
  pagePadding: 'var(--space-6)',
  containerMax: '80rem', // 1280px
} as const;

export type SpacingTokens = typeof spacingTokens;