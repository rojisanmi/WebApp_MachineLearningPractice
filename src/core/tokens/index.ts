/**
 * Design Tokens — Main Export
 * Generates CSS Custom Properties from all token modules
 * Import this in your global CSS @layer tokens
 */

import { colorTokens } from './colors.css.ts';
import { spacingTokens } from './spacing.css.ts';
import { typographyTokens } from './typography.css.ts';
import { shadowTokens } from './shadows.css.ts';
import { transitionTokens } from './transitions.css.ts';
import { breakpointTokens } from './breakpoints.css.ts';
import { borderRadiusTokens } from './border-radius.css.ts';
import { zIndexTokens } from './z-index.css.ts';

/**
 * Flattens nested token objects into CSS custom property entries
 * e.g., { color: { primary: { main: '#000' } } } → { '--color-primary-main': '#000' }
 */
function flattenTokens(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const cssKey = prefix ? `${prefix}-${key}` : key;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenTokens(value as Record<string, unknown>, cssKey));
    } else if (Array.isArray(value)) {
      // For arrays, create indexed properties
      value.forEach((v, i) => {
        result[`${cssKey}-${i}`] = String(v);
      });
    } else {
      result[`--${cssKey}`] = String(value);
    }
  }

  return result;
}

/** Generate all CSS custom properties */
const allTokens = {
  ...flattenTokens(colorTokens, 'color'),
  ...flattenTokens(spacingTokens, 'space'),
  ...flattenTokens(typographyTokens.fontSize, 'text'),
  ...flattenTokens(typographyTokens.lineHeight, 'leading'),
  ...flattenTokens(typographyTokens.fontWeight, 'font-weight'),
  ...flattenTokens(typographyTokens.letterSpacing, 'tracking'),
  ...flattenTokens(shadowTokens, 'shadow'),
  ...flattenTokens(transitionTokens.duration, 'duration'),
  ...flattenTokens(transitionTokens.easing, 'ease'),
  ...flattenTokens(transitionTokens.transition, 'transition'),
  ...flattenTokens(borderRadiusTokens, 'radius'),
  ...flattenTokens(zIndexTokens, 'z'),
  // Font families as individual properties
  '--font-sans': typographyTokens.fontFamily.sans,
  '--font-mono': typographyTokens.fontFamily.mono,
  '--font-display': typographyTokens.fontFamily.display,
  // Breakpoints as individual properties (for container queries)
  '--bp-sm': breakpointTokens.sm,
  '--bp-md': breakpointTokens.md,
  '--bp-lg': breakpointTokens.lg,
  '--bp-xl': breakpointTokens.xl,
  '--bp-2xl': breakpointTokens['2xl'],
};

/** CSS Custom Properties string for injection */
export const cssCustomProperties = Object.entries(allTokens)
  .map(([key, value]) => `  ${key}: ${value};`)
  .join('\n');

/** Complete :root block for light theme */
export const lightThemeCSS = `:root {\n${cssCustomProperties}\n}`;

/** Dark theme overrides (only colors that change) */
const darkColorOverrides = {
  'color-bg-primary': '#0f172a',
  'color-bg-secondary': '#1e293b',
  'color-bg-tertiary': '#334155',
  'color-bg-inverse': '#f8fafc',

  'color-fg-primary': '#f8fafc',
  'color-fg-secondary': '#e2e8f0',
  'color-fg-muted': '#94a3b8',
  'color-fg-inverse': '#0f172a',
  'color-fg-on-brand': '#0f172a',
  'color-fg-on-danger': '#0f172a',

  'color-border-default': '#334155',
  'color-border-strong': '#475569',
  'color-border-focus': '#60a5fa',
  'color-border-error': '#f87171',

  'color-brand-primary': '#3b82f6',
  'color-brand-primary-hover': '#60a5fa',
  'color-brand-primary-subtle': 'rgba(59, 130, 246, 0.15)',
  'color-brand-secondary': '#14b8a6',
  'color-brand-secondary-hover': '#2dd4bf',
  'color-brand-secondary-subtle': 'rgba(20, 184, 166, 0.15)',

  'color-status-success': '#22c55e',
  'color-status-success-subtle': 'rgba(34, 197, 94, 0.15)',
  'color-status-warning': '#eab308',
  'color-status-warning-subtle': 'rgba(234, 179, 8, 0.15)',
  'color-status-danger': '#ef4444',
  'color-status-danger-subtle': 'rgba(239, 68, 68, 0.15)',
  'color-status-info': '#3b82f6',
  'color-status-info-subtle': 'rgba(59, 130, 246, 0.15)',

  // Visualization palette for dark
  'viz-0': '#60a5fa',
  'viz-1': '#f97316',
  'viz-2': '#34d399',
  'viz-3': '#f472b6',
  'viz-4': '#fb923c',
  'viz-5': '#93c5fd',
  'viz-6': '#fde047',
  'viz-7': '#f8fafc',
};

const darkCSS = Object.entries(darkColorOverrides)
  .map(([key, value]) => `  ${key}: ${value};`)
  .join('\n');

export const darkThemeCSS = `[data-theme="dark"] {\n${darkCSS}\n}`;

/** Combined CSS for both themes */
export const allThemesCSS = `${lightThemeCSS}\n\n${darkThemeCSS}`;

// Export tokens for TS usage
export {
  colorTokens,
  spacingTokens,
  typographyTokens,
  shadowTokens,
  transitionTokens,
  breakpointTokens,
  borderRadiusTokens,
  zIndexTokens,
};

// Type for all tokens
export type AllTokens = typeof allTokens;