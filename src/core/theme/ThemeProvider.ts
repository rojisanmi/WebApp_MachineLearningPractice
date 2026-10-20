/**
 * Theme Provider — Web Component wrapper for ThemeEngine
 * Provides declarative theme control and context for child components
 */

import { themeEngine, type ThemeMode, type ResolvedTheme } from './ThemeEngine.ts';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: contents;
    }
  </style>
  <slot></slot>
`;

export class MlThemeProvider extends HTMLElement {
  #unsubscribe: (() => void) | null = null;

  static observedAttributes = ['mode'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // Sync with engine
    this.#unsubscribe = themeEngine.subscribe((resolved) => {
      this.#updateAttribute(resolved);
    });

    // Set initial attribute
    this.#updateAttribute(themeEngine.resolved);

    // Apply mode from attribute if present
    if (this.hasAttribute('mode')) {
      themeEngine.setMode(this.getAttribute('mode') as ThemeMode);
    }
  }

  disconnectedCallback() {
    this.#unsubscribe?.();
    this.#unsubscribe = null;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'mode' && oldValue !== newValue) {
      themeEngine.setMode(newValue as ThemeMode);
    }
  }

  /** Get current mode */
  get mode(): ThemeMode {
    return themeEngine.mode;
  }

  /** Set mode */
  set mode(value: ThemeMode) {
    this.setAttribute('mode', value);
  }

  /** Get resolved theme */
  get resolved(): ResolvedTheme {
    return themeEngine.resolved;
  }

  /** Toggle theme */
  toggle(): void {
    themeEngine.toggle();
  }

  /** Cycle through modes */
  cycle(): void {
    themeEngine.cycle();
  }

  #updateAttribute(resolved: ResolvedTheme): void {
    this.setAttribute('resolved', resolved);
    this.style.setProperty('--theme-resolved', resolved);
  }
}

customElements.define('ml-theme-provider', MlThemeProvider);

/** Theme Toggle Button Component */
const toggleTemplate = document.createElement('template');
toggleTemplate.innerHTML = `
  <style>
    :host {
      display: inline-flex;
    }

    .theme-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);
      width: 40px;
      height: 40px;
      border: 1px solid var(--color-border-default);
      border-radius: var(--radius-button);
      background: var(--color-bg-secondary);
      color: var(--color-fg-primary);
      cursor: pointer;
      transition: var(--transition-colors), var(--transition-transform);
    }

    .theme-toggle:hover:not(:disabled) {
      background: var(--color-bg-tertiary);
      border-color: var(--color-border-strong);
      transform: scale(1.02);
    }

    .theme-toggle:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .theme-toggle:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .theme-toggle__icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    .theme-toggle__label {
      display: none;
    }

    @media (min-width: 480px) {
      .theme-toggle--with-label .theme-toggle__label {
        display: inline;
        font-size: var(--text-sm);
        font-weight: var(--font-weight-medium);
      }
    }
  </style>
  <button
    class="theme-toggle"
    aria-label="Ubah tema"
    title="Ubah tema (Light/Dark/Auto)"
    type="button"
  >
    <span class="theme-toggle__icon" aria-hidden="true"></span>
    <span class="theme-toggle__label"></span>
  </button>
`;

export class MlThemeToggle extends HTMLElement {
  #button: HTMLButtonElement | null = null;
  #unsubscribe: (() => void) | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.appendChild(toggleTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.#button = this.shadowRoot!.querySelector('.theme-toggle')!;
    this.#button.addEventListener('click', this.#handleClick);

    // Subscribe to theme changes
    this.#unsubscribe = themeEngine.subscribe((resolved) => {
      this.#updateIcon(resolved);
    });

    // Initial icon
    this.#updateIcon(themeEngine.resolved);

    // Check if we should show label
    if (this.hasAttribute('show-label')) {
      this.#button.classList.add('theme-toggle--with-label');
    }
  }

  disconnectedCallback() {
    this.#button?.removeEventListener('click', this.#handleClick);
    this.#unsubscribe?.();
  }

  #handleClick = (): void => {
    if (this.hasAttribute('cycle')) {
      themeEngine.cycle();
    } else {
      themeEngine.toggle();
    }
  };

  #updateIcon(resolved: ResolvedTheme): void {
    if (!this.#button) return;

    const iconEl = this.#button.querySelector('.theme-toggle__icon')!;
    const labelEl = this.#button.querySelector('.theme-toggle__label')!;

    let icon = '';
    let label = '';
    let title = '';

    if (themeEngine.mode === 'auto') {
      icon = resolved === 'dark' ? '🌙' : '☀️';
      label = resolved === 'dark' ? 'Gelap (Auto)' : 'Terang (Auto)';
      title = `Tema: ${label}. Klik untuk beralih ke ${resolved === 'dark' ? 'terang' : 'gelap'}.`;
    } else {
      icon = resolved === 'dark' ? '🌙' : '☀️';
      label = resolved === 'dark' ? 'Gelap' : 'Terang';
      title = `Tema: ${label}. Klik untuk beralih ke ${resolved === 'dark' ? 'terang' : 'gelap'}.`;
    }

    iconEl.textContent = icon;
    labelEl.textContent = label;
    this.#button.title = title;
    this.#button.setAttribute('aria-label', title);
  }
}

customElements.define('ml-theme-toggle', MlThemeToggle);

declare global {
  interface HTMLElementTagNameMap {
    'ml-theme-provider': MlThemeProvider;
    'ml-theme-toggle': MlThemeToggle;
  }
}