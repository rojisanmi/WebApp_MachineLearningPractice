/**
 * Border Radius Tokens
 */

export const borderRadiusTokens = {
  none: '0',
  xs: '0.125rem',   // 2px
  sm: '0.25rem',    // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',   // pill

  /** Component-specific */
  card: 'var(--radius-xl)',
  button: 'var(--radius-md)',
  input: 'var(--radius-md)',
  modal: 'var(--radius-2xl)',
  badge: 'var(--radius-full)',
} as const;

export type BorderRadiusTokens = typeof borderRadiusTokens;