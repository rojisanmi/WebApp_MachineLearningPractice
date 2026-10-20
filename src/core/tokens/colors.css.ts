/**
 * Color Tokens — Single source of truth for all colors
 * Used by both CSS (via custom properties) and TypeScript (via this file)
 */

export const colorTokens = {
  /** Semantic background colors */
  bg: {
    primary: 'var(--color-bg-primary)',
    secondary: 'var(--color-bg-secondary)',
    tertiary: 'var(--color-bg-tertiary)',
    inverse: 'var(--color-bg-inverse)',
  },

  /** Semantic foreground/text colors */
  fg: {
    primary: 'var(--color-fg-primary)',
    secondary: 'var(--color-fg-secondary)',
    muted: 'var(--color-fg-muted)',
    inverse: 'var(--color-fg-inverse)',
    onBrand: 'var(--color-fg-on-brand)',
    onDanger: 'var(--color-fg-on-danger)',
  },

  /** Border colors */
  border: {
    default: 'var(--color-border-default)',
    strong: 'var(--color-border-strong)',
    focus: 'var(--color-border-focus)',
    error: 'var(--color-border-error)',
  },

  /** Brand colors */
  brand: {
    primary: 'var(--color-brand-primary)',
    primaryHover: 'var(--color-brand-primary-hover)',
    primarySubtle: 'var(--color-brand-primary-subtle)',
    secondary: 'var(--color-brand-secondary)',
    secondaryHover: 'var(--color-brand-secondary-hover)',
    secondarySubtle: 'var(--color-brand-secondary-subtle)',
  },

  /** Status colors */
  status: {
    success: 'var(--color-status-success)',
    successSubtle: 'var(--color-status-success-subtle)',
    warning: 'var(--color-status-warning)',
    warningSubtle: 'var(--color-status-warning-subtle)',
    danger: 'var(--color-status-danger)',
    dangerSubtle: 'var(--color-status-danger-subtle)',
    info: 'var(--color-status-info)',
    infoSubtle: 'var(--color-status-info-subtle)',
  },

  /** Raw palette for illustrations/charts (not for UI chrome) */
  palette: {
    blue: {
      50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
      400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
      800: '#1e40af', 900: '#1e3a8f', 950: '#172554',
    },
    teal: {
      50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4',
      400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e',
      800: '#115e59', 900: '#134e4a', 950: '#042f2e',
    },
    amber: {
      50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d',
      400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309',
      800: '#92400e', 900: '#78350f', 950: '#451a03',
    },
    slate: {
      50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1',
      400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155',
      800: '#1e293b', 900: '#0f172a', 950: '#020617',
    },
    red: {
      50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5',
      400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c',
      800: '#991b1b', 900: '#7f1d1d', 950: '#450a0a',
    },
    green: {
      50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac',
      400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d',
      800: '#166534', 900: '#14532d', 950: '#052e16',
    },
  },

  /** Visualization categorical palette (colorblind-safe: Wong/Okabe-Ito) */
  viz: {
    categorical: [
      '#0072B2', // Blue
      '#D55E00', // Vermillion
      '#009E73', // Bluish Green
      '#CC79A7', // Reddish Purple
      '#E69F00', // Orange
      '#56B4E9', // Sky Blue
      '#F0E442', // Yellow
      '#000000', // Black
    ],
    sequential: [
      '#f7fbff', '#deebf7', '#c6dbef', '#9ecae1',
      '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b',
    ],
    diverging: {
      negative: '#67001f',
      neutral: '#f7f7f7',
      positive: '#053061',
    },
  },
} as const;

export type ColorTokens = typeof colorTokens;