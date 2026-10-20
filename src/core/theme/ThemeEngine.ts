/**
 * Theme Engine — Light/Dark/Auto theme management
 * - Persists to localStorage
 * - Syncs across tabs
 * - Dispatches CustomEvent for framework integration
 */

type ThemeMode = 'light' | 'dark' | 'auto';
type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'ml-lab-theme-mode';
const MEDIA_QUERY = '(prefers-color-scheme: dark)';

/**
 * Resolves 'auto' to actual theme based on system preference
 */
function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode === 'auto') {
    return window.matchMedia(MEDIA_QUERY).matches ? 'dark' : 'light';
  }
  return mode;
}

/**
 * Applies theme to document element
 */
function applyTheme(resolved: ResolvedTheme): void {
  document.documentElement.dataset.theme = resolved;
}

/**
 * Gets stored theme mode or defaults to 'auto'
 */
function getStoredMode(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'auto') {
      return stored;
    }
  } catch {
    // localStorage unavailable (private browsing, etc.)
  }
  return 'auto';
}

/**
 * Stores theme mode
 */
function setStoredMode(mode: ThemeMode): void {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // Ignore quota exceeded, private browsing, etc.
  }
}

/**
 * Theme Engine — Singleton
 */
export class ThemeEngine {
  #mode: ThemeMode = 'auto';
  #resolved: ResolvedTheme = 'light';
  #listeners: Set<(resolved: ResolvedTheme) => void> = new Set();
  #mediaQueryListener: MediaQueryListEventListener | null = null;

  constructor() {
    // Initialize from storage
    this.#mode = getStoredMode();
    this.#resolved = resolveTheme(this.#mode);
    applyTheme(this.#resolved);

    // Listen for system theme changes (only relevant in 'auto' mode)
    this.#mediaQueryListener = (e: MediaQueryListEvent) => {
      if (this.#mode === 'auto') {
        const newResolved = e.matches ? 'dark' : 'light';
        this.#setResolved(newResolved);
      }
    };

    const mediaQuery = window.matchMedia(MEDIA_QUERY);
    mediaQuery.addEventListener?.('change', this.#mediaQueryListener);

    // Listen for storage changes (sync across tabs)
    window.addEventListener('storage', (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        this.setMode(e.newValue as ThemeMode);
      }
    });
  }

  /** Current theme mode (light|dark|auto) */
  get mode(): ThemeMode {
    return this.#mode;
  }

  /** Currently resolved theme (light|dark) */
  get resolved(): ResolvedTheme {
    return this.#resolved;
  }

  /** Whether dark theme is currently active */
  get isDark(): boolean {
    return this.#resolved === 'dark';
  }

  /** Set theme mode and persist */
  setMode(mode: ThemeMode): void {
    if (mode !== 'light' && mode !== 'dark' && mode !== 'auto') {
      console.warn(`[ThemeEngine] Invalid mode: ${mode}`);
      return;
    }

    this.#mode = mode;
    setStoredMode(mode);

    const newResolved = resolveTheme(mode);
    this.#setResolved(newResolved);
  }

  /** Toggle between light and dark (skips auto) */
  toggle(): void {
    const newMode = this.#resolved === 'dark' ? 'light' : 'dark';
    this.setMode(newMode);
  }

  /** Cycle through all three modes */
  cycle(): void {
    const modes: ThemeMode[] = ['light', 'dark', 'auto'];
    const currentIndex = modes.indexOf(this.#mode);
    const nextIndex = (currentIndex + 1) % modes.length;
    this.setMode(modes[nextIndex]);
  }

  /** Subscribe to theme changes */
  subscribe(listener: (resolved: ResolvedTheme) => void): () => void {
    this.#listeners.add(listener);
    // Call immediately with current value
    listener(this.#resolved);
    return () => this.#listeners.delete(listener);
  }

  /** Internal: update resolved theme and notify listeners */
  #setResolved(resolved: ResolvedTheme): void {
    if (resolved === this.#resolved) return;

    this.#resolved = resolved;
    applyTheme(resolved);

    // Notify all listeners
    this.#listeners.forEach(listener => {
      try {
        listener(resolved);
      } catch (err) {
        console.error('[ThemeEngine] Listener error:', err);
      }
    });

    // Dispatch custom event for framework integration
    window.dispatchEvent(new CustomEvent('themechange', {
      detail: { mode: this.#mode, resolved },
    }));
  }

  /** Cleanup (for testing or unmount) */
  destroy(): void {
    if (this.#mediaQueryListener) {
      window.matchMedia(MEDIA_QUERY).removeEventListener('change', this.#mediaQueryListener);
    }
    this.#listeners.clear();
  }
}

/** Singleton instance */
export const themeEngine = new ThemeEngine();

/** React/Vue/Svelte compatible hook (if needed) */
export function useTheme(): { mode: ThemeMode; resolved: ResolvedTheme; setMode: (mode: ThemeMode) => void; toggle: () => void } {
  return {
    mode: themeEngine.mode,
    resolved: themeEngine.resolved,
    setMode: themeEngine.setMode.bind(themeEngine),
    toggle: themeEngine.toggle.bind(themeEngine),
  };
}