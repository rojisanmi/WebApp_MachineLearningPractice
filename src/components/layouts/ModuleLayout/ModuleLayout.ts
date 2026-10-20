/**
 * ModuleLayout — Layout for module pages (Clustering, RL, Ensemble)
 * Two-column: sidebar navigation + main content area
 */

import { html } from '../../core/utils/dom.ts';
import { createStyleSheet } from '../../core/utils/dom.ts';

const styleSheet = createStyleSheet(`
  :host {
    display: block;
  }

  .module-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  @media (min-width: 1024px) {
    .module-layout {
      grid-template-columns: 280px 1fr;
      align-items: start;
    }
  }

  /* Sidebar */
  .module-sidebar {
    position: sticky;
    top: calc(var(--space-6) + 60px); /* account for topbar */
    height: fit-content;
    max-height: calc(100vh - var(--space-6) - 80px);
    overflow-y: auto;
  }

  @media (min-width: 1024px) {
    .module-sidebar {
      padding-right: var(--space-6);
      border-right: 1px solid var(--color-border-default);
    }
  }

  .module-nav {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .module-nav__section {
    margin-bottom: var(--space-4);
  }

  .module-nav__section-title {
    font-size: var(--text-xs);
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-fg-muted);
    padding: var(--space-2) var(--space-3);
    margin-bottom: var(--space-1);
  }

  .module-nav__item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    color: var(--color-fg-secondary);
    font-size: var(--text-sm);
    font-weight: var(--font-weight-medium);
    text-decoration: none;
    transition: background var(--transition-fast), color var(--transition-fast);
  }

  .module-nav__item:hover {
    background: var(--color-bg-tertiary);
    color: var(--color-fg-primary);
  }

  .module-nav__item[aria-current="page"] {
    background: var(--color-brand-primary-subtle);
    color: var(--color-brand-primary);
  }

  .module-nav__item[aria-current="page"]::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-brand-primary);
    flex-shrink: 0;
  }

  .module-nav__icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  /* Main Content */
  .module-main {
    min-width: 0; /* prevents flex overflow */
  }

  .module-header {
    margin-bottom: var(--space-8);
    padding-bottom: var(--space-6);
    border-bottom: 1px solid var(--color-border-default);
  }

  .module-header__meta {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-fg-muted);
    margin-bottom: var(--space-3);
  }

  .module-header__title {
    font-size: var(--text-3xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-fg-primary);
    margin-bottom: var(--space-2);
    line-height: var(--leading-tight);
  }

  .module-header__description {
    font-size: var(--text-lg);
    color: var(--color-fg-secondary);
    max-width: 70ch;
    line-height: var(--leading-relaxed);
  }

  .module-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  @media (min-width: 1024px) {
    .module-content {
      grid-template-columns: minmax(0, 1.5fr) minmax(320px, 0.5fr);
      align-items: start;
    }
  }

  .module-canvas-area {
    min-width: 0;
  }

  .module-side-panel {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .module-panel {
    background: var(--color-bg-primary);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
    box-shadow: var(--shadow-sm);
  }

  .module-panel__title {
    font-size: var(--text-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-fg-primary);
    margin-bottom: var(--space-4);
    padding-bottom: var(--space-3);
    border-bottom: 1px solid var(--color-border-default);
  }

  .module-panel__description {
    font-size: var(--text-sm);
    color: var(--color-fg-muted);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-4);
  }

  /* Canvas Wrapper */
  .canvas-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    background: var(--color-bg-primary);
    border: 2px solid var(--color-border-default);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    overflow: hidden;
  }

  .canvas-wrapper canvas {
    display: block;
    width: 100%;
    height: 100%;
  }

  .canvas-wrapper--full {
    aspect-ratio: 4 / 3;
  }

  .canvas-toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-top: var(--space-4);
    padding-top: var(--space-4);
    border-top: 1px solid var(--color-border-default);
  }
`);

const template = document.createElement('template');
template.innerHTML = `
  <div class="module-layout">
    <aside class="module-sidebar" aria-label="Navigasi modul">
      <nav class="module-nav" id="sidebar-nav"></nav>
    </aside>

    <main class="module-main">
      <header class="module-header">
        <div class="module-header__meta" id="header-meta"></div>
        <h1 class="module-header__title" id="header-title"></h1>
        <p class="module-header__description" id="header-description"></p>
      </header>

      <div class="module-content">
        <div class="module-canvas-area" id="canvas-area">
          <div class="canvas-wrapper" id="canvas-wrapper">
            <canvas id="main-canvas"></canvas>
          </div>
          <div class="canvas-toolbar" id="canvas-toolbar"></div>
        </div>

        <aside class="module-side-panel" id="side-panel" aria-label="Panel kontrol">
          <!-- Panels injected here -->
        </aside>
      </div>
    </main>
  </div>
`;

export class MlModuleLayout extends HTMLElement {
  #sidebarNav: HTMLElement | null = null;
  #headerMeta: HTMLElement | null = null;
  #headerTitle: HTMLElement | null = null;
  #headerDescription: HTMLElement | null = null;
  #canvasWrapper: HTMLElement | null = null;
  #canvas: HTMLCanvasElement | null = null;
  #canvasToolbar: HTMLElement | null = null;
  #sidePanel: HTMLElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.adoptedStyleSheets = [styleSheet];
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.#sidebarNav = this.shadowRoot!.getElementById('sidebar-nav')!;
    this.#headerMeta = this.shadowRoot!.getElementById('header-meta')!;
    this.#headerTitle = this.shadowRoot!.getElementById('header-title')!;
    this.#headerDescription = this.shadowRoot!.getElementById('header-description')!;
    this.#canvasWrapper = this.shadowRoot!.getElementById('canvas-wrapper')!;
    this.#canvas = this.shadowRoot!.querySelector('#main-canvas')!;
    this.#canvasToolbar = this.shadowRoot!.getElementById('canvas-toolbar')!;
    this.#sidePanel = this.shadowRoot!.getElementById('side-panel')!;
  }

  /** Set module navigation items */
  setNavigation(items: Array<{
    href: string;
    label: string;
    icon?: string;
    section?: string;
  }>): void {
    if (!this.#sidebarNav) return;

    const sections = new Map<string, Array<typeof items[0]>>();
    items.forEach(item => {
      const section = item.section || 'Utama';
      if (!sections.has(section)) sections.set(section, []);
      sections.get(section)!.push(item);
    });

    this.#sidebarNav.innerHTML = Array.from(sections.entries()).map(([sectionName, sectionItems]) => html`
      <div class="module-nav__section">
        <div class="module-nav__section-title">${sectionName}</div>
        ${sectionItems.map(item => html`
          <ml-link
            href="${item.href}"
            class="module-nav__item"
            aria-current="${location.hash === `#${item.href}` ? 'page' : 'false'}"
          >
            ${item.icon ? html`<span class="module-nav__icon" aria-hidden="true">${item.icon}</span>` : ''}
            ${item.label}
          </ml-link>
        `).join('')}
      </div>
    `).join('');
  }

  /** Set header content */
  setHeader(meta: string, title: string, description: string): void {
    this.#headerMeta!.textContent = meta;
    this.#headerTitle!.textContent = title;
    this.#headerDescription!.textContent = description;
  }

  /** Get canvas context for drawing */
  getCanvasContext(): CanvasRenderingContext2D | null {
    return this.#canvas?.getContext('2d') || null;
  }

  /** Get canvas element */
  getCanvas(): HTMLCanvasElement | null {
    return this.#canvas;
  }

  /** Set canvas aspect ratio */
  setCanvasAspectRatio(ratio: number): void {
    if (this.#canvasWrapper) {
      this.#canvasWrapper.style.aspectRatio = `${ratio}`;
    }
  }

  /** Add toolbar buttons */
  setToolbar(buttons: Array<{
    label: string;
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    icon?: string;
    onClick: () => void;
  }>): void {
    if (!this.#canvasToolbar) return;
    this.#canvasToolbar.innerHTML = buttons.map(btn => html`
      <ml-button variant="${btn.variant || 'primary'}" @click=${btn.onClick}>
        ${btn.icon ? html`<span aria-hidden="true">${btn.icon}</span>` : ''}
        ${btn.label}
      </ml-button>
    `).join('');
  }

  /** Add panel to side panel */
  addPanel(panel: {
    title: string;
    description?: string;
    content: HTMLElement | string;
  }): void {
    if (!this.#sidePanel) return;

    const panelEl = document.createElement('div');
    panelEl.className = 'module-panel';
    panelEl.innerHTML = html`
      <h2 class="module-panel__title">${panel.title}</h2>
      ${panel.description ? html`<p class="module-panel__description">${panel.description}</p>` : ''}
      <div class="module-panel__content"></div>
    `;

    const contentEl = panelEl.querySelector('.module-panel__content')!;
    if (typeof panel.content === 'string') {
      contentEl.innerHTML = panel.content;
    } else {
      contentEl.appendChild(panel.content);
    }

    this.#sidePanel.appendChild(panelEl);
  }

  /** Clear all panels */
  clearPanels(): void {
    this.#sidePanel!.innerHTML = '';
  }
}

customElements.define('ml-module-layout', MlModuleLayout);

declare global {
  interface HTMLElementTagNameMap {
    'ml-module-layout': MlModuleLayout;
  }
}