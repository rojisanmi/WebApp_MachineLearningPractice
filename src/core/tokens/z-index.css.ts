/**
 * Z-Index Scale Tokens
 */

export const zIndexTokens = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  'modal-backdrop': 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
  toast: 800,
  max: 9999,
} as const;

export type ZIndexTokens = typeof zIndexTokens;