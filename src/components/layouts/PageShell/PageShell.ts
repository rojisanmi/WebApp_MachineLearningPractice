/**
 * PageShell — Root layout wrapper for all pages
 * Provides: theme provider, skip link, topbar outlet, main outlet, footer
 */

import { html } from '../../core/utils/dom.ts';
import { createStyleSheet, adoptStyleSheet } from '../../core/utils/dom.ts';

const styleSheet = createStyleSheet(`
  :host {
    display: block;
    min-height: 100vh;
    background-color: var(--color-bg-primary);
  }

  .page-shell {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
  }

  .skip-link {
    position: absolute;
    top: -100%;
    left: var(--space-4);
    padding: var(--space-2) var(--space-4);
    background: var(--color-brand-primary);
    color: var(--color-fg-on-brand);
    border-radius: var(--radius-md);
    z-index: var(--z-max);
    font-weight: var(--font-weight-medium);
    transition: top var(--transition-fast);
  }

  .skip-link:focus {
    top: var(--space-4);
  }

  main {
    width: min(var(--container-max), 100% - var(--space-8));
    margin: 0 auto;
    padding: var(--space-6) var(--space-4);
  }

  @media (min-width: 768px) {
    main {
      padding: var(--space-8) var(--space-6);
    }
  }

  footer {
    padding: var(--space-6) var(--space-4);
    text-align: center;
    color: var(--color-fg-muted);
    font-size: var(--text-sm);
    border-top: 1px solid var(--color-border-default);
    background-color: var(--color-bg-secondary);
  }
`);

const template = document.createElement('template');
template.innerHTML = `
  <a href="#main-content" class="skip-link">Lewati ke konten utama</a>
  <div class="page-shell">
    <header id="topbar-outlet"></header>
    <main id="main-content" role="main"></main>
    <footer id="footer-outlet">
      <p>© 2026 ML Lab — Visualisasi. Eksperimen. Paham.</p>
    </footer>
  </div>
`;

export class MlPageShell extends HTMLElement {
  #topbarOutlet: HTMLElement | null = null;
  #mainOutlet: HTMLElement | null = null;
  #footerOutlet: HTMLElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.shadowRoot!.adoptedStyleSheets = [styleSheet];
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.#topbarOutlet = this.shadowRoot!.getElementById('topbar-outlet')!;
    this.#mainOutlet = this.shadowRoot!.getElementById('main-content')!;
    this.#footerOutlet = this.shadowRoot!.getElementById('footer-outlet')!;
  }

  /** Set topbar content */
  setTopbar(element: HTMLElement | string): void {
    if (this.#topbarOutlet) {
      if (typeof element === 'string') {
        this.#topbarOutlet.innerHTML = element;
      } else {
        this.#topbarOutlet.innerHTML = '';
        this.#topbarOutlet.appendChild(element);
      }
    }
  }

  /** Set main content */
  setMain(element: HTMLElement | string): void {
    if (this.#mainOutlet) {
      if (typeof element === 'string') {
        this.#mainOutlet.innerHTML = element;
      } else {
        this.#mainOutlet.innerHTML = '';
        this.#mainOutlet.appendChild(element);
      }
    }
  }

  /** Set footer content */
  setFooter(element: HTMLElement | string): void {
    if (this.#footerOutlet) {
      if (typeof element === 'string') {
        this.#footerOutlet.innerHTML = element;
      } else {
        this.#footerOutlet.innerHTML = '';
        this.#footerOutlet.appendChild(element);
      }
    }
  }
}

customElements.define('ml-page-shell', MlPageShell);

declare global {
  interface HTMLElementTagNameMap {
    'ml-page-shell': MlPageShell;
  }
}