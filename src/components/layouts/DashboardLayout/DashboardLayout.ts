/**
 * DashboardLayout — Layout for the main dashboard page
 * Single column, centered content, no sidebar
 */

import { html } from '../../core/utils/dom.ts';
import { createStyleSheet } from '../../core/utils/dom.ts';

const styleSheet = createStyleSheet(`
  :host {
    display: block;
  }

  .dashboard-layout {
    max-width: var(--container-max);
    margin: 0 auto;
    padding: var(--space-6) var(--space-4);
  }

  @media (min-width: 768px) {
    .dashboard-layout {
      padding: var(--space-10) var(--space-8);
    }
  }

  .dashboard-header {
    text-align: center;
    margin-bottom: var(--space-12);
  }

  .dashboard-badge {
    display: inline-block;
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-full);
    background: var(--color-brand-primary-subtle);
    color: var(--color-brand-primary);
    font-size: var(--text-sm);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--space-4);
  }

  .dashboard-title {
    font-size: var(--text-5xl);
    font-weight: var(--font-weight-extrabold);
    line-height: var(--leading-tight);
    color: var(--color-fg-primary);
    margin-bottom: var(--space-4);
    letter-spacing: -0.02em;
  }

  .dashboard-subtitle {
    font-size: var(--text-xl);
    color: var(--color-fg-muted);
    max-width: 60ch;
    margin: 0 auto var(--space-6);
    line-height: var(--leading-relaxed);
  }

  .dashboard-stats {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-4);
    margin-top: var(--space-6);
  }

  .stat-pill {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    color: var(--color-fg-secondary);
  }

  .stat-pill strong {
    color: var(--color-brand-primary);
    font-weight: var(--font-weight-bold);
  }

  .module-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  @media (min-width: 640px) {
    .module-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .module-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .module-card {
    display: flex;
    flex-direction: column;
    padding: var(--space-6);
    background: var(--color-bg-primary);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-sm);
    transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
  }

  .module-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-brand-primary);
  }

  .module-card__icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-brand-primary-subtle);
    border-radius: var(--radius-lg);
    margin-bottom: var(--space-4);
    color: var(--color-brand-primary);
  }

  .module-card__title {
    font-size: var(--text-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-fg-primary);
    margin-bottom: var(--space-2);
  }

  .module-card__description {
    font-size: var(--text-sm);
    color: var(--color-fg-muted);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-4);
    flex: 1;
  }

  .module-card__progress {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-bottom: var(--space-4);
    font-size: var(--text-xs);
    color: var(--color-fg-muted);
  }

  .module-card__progress-bar {
    flex: 1;
    height: 6px;
    background: var(--color-bg-tertiary);
    border-radius: var(--radius-full);
    overflow: hidden;
  }

  .module-card__progress-fill {
    height: 100%;
    background: var(--color-brand-primary);
    border-radius: var(--radius-full);
    transition: width var(--duration-slow) var(--ease-out);
  }

  .module-card__progress-text {
    font-weight: var(--font-weight-semibold);
    color: var(--color-brand-primary);
    min-width: 3ch;
    text-align: right;
  }

  .module-card__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    width: 100%;
    padding: var(--space-3) var(--space-4);
    background: var(--color-brand-primary);
    color: var(--color-fg-on-brand);
    font-weight: var(--font-weight-semibold);
    border-radius: var(--radius-md);
    border: none;
    cursor: pointer;
    transition: background var(--transition-fast), transform var(--transition-fast);
  }

  .module-card__cta:hover {
    background: var(--color-brand-primary-hover);
    transform: scale(1.01);
  }

  .module-card__cta:focus-visible {
    outline: 2px solid var(--color-border-focus);
    outline-offset: 2px;
  }

  .announcement-banner {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-4);
    background: var(--color-status-warning-subtle);
    border: 1px solid var(--color-status-warning);
    border-radius: var(--radius-lg);
    margin-bottom: var(--space-8);
  }

  .announcement-banner__icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    color: var(--color-status-warning);
  }

  .announcement-banner__content {
    flex: 1;
  }

  .announcement-banner__title {
    font-weight: var(--font-weight-semibold);
    color: var(--color-fg-primary);
    margin-bottom: var(--space-1);
  }

  .announcement-banner__text {
    font-size: var(--text-sm);
    color: var(--color-fg-secondary);
    line-height: var(--leading-relaxed);
  }

  .continue-section {
    margin-bottom: var(--space-10);
  }

  .continue-card {
    display: flex;
    align-items: center;
    gap: var(--space-6);
    padding: var(--space-6);
    background: linear-gradient(135deg, var(--color-brand-primary-subtle), var(--color-brand-secondary-subtle));
    border-radius: var(--radius-xl);
    border: 1px solid var(--color-brand-primary-subtle);
  }

  .continue-card__icon {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-brand-primary);
    border-radius: var(--radius-lg);
    color: var(--color-fg-on-brand);
    flex-shrink: 0;
  }

  .continue-card__content {
    flex: 1;
  }

  .continue-card__label {
    font-size: var(--text-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-brand-primary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: var(--space-1);
  }

  .continue-card__title {
    font-size: var(--text-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-fg-primary);
    margin-bottom: var(--space-2);
  }

  .continue-card__meta {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    font-size: var(--text-sm);
    color: var(--color-fg-secondary);
  }

  .continue-card__action {
    flex-shrink: 0;
  }
`);

const template = document.createElement('template');
template.innerHTML = `
  <div class="dashboard-layout">
    <header class="dashboard-header">
      <span class="dashboard-badge">Machine Learning Lab</span>
      <h1 class="dashboard-title">ML Lab</h1>
      <p class="dashboard-subtitle">Visualisasi. Eksperimen. Paham.</p>
      <div class="dashboard-stats" id="stats"></div>
    </header>

    <section id="announcement" class="announcement-banner" hidden></section>

    <section class="continue-section" id="continue-section" hidden>
      <div class="continue-card">
        <div class="continue-card__icon" id="continue-icon"></div>
        <div class="continue-card__content">
          <p class="continue-card__label">Lanjutkan belajar</p>
          <h2 class="continue-card__title" id="continue-title"></h2>
          <div class="continue-card__meta" id="continue-meta"></div>
        </div>
        <div class="continue-card__action">
          <button class="module-card__cta" id="continue-btn">Lanjutkan →</button>
        </div>
      </div>
    </section>

    <section aria-labelledby="modules-title">
      <h2 id="modules-title" class="sr-only">Modul Pembelajaran</h2>
      <div class="module-grid" id="module-grid"></div>
    </section>
  </div>
`;

export class MlDashboardLayout extends HTMLElement {
  #moduleGrid: HTMLElement | null = null;
  #stats: HTMLElement | null = null;
  #announcement: HTMLElement | null = null;
  #continueSection: HTMLElement | null = null;
  #continueIcon: HTMLElement | null = null;
  #continueTitle: HTMLElement | null = null;
  #continueMeta: HTMLElement | null = null;
  #continueBtn: HTMLButtonElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.adoptedStyleSheets = [styleSheet];
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.#moduleGrid = this.shadowRoot!.getElementById('module-grid')!;
    this.#stats = this.shadowRoot!.getElementById('stats')!;
    this.#announcement = this.shadowRoot!.getElementById('announcement')!;
    this.#continueSection = this.shadowRoot!.getElementById('continue-section')!;
    this.#continueIcon = this.shadowRoot!.getElementById('continue-icon')!;
    this.#continueTitle = this.shadowRoot!.getElementById('continue-title')!;
    this.#continueMeta = this.shadowRoot!.getElementById('continue-meta')!;
    this.#continueBtn = this.shadowRoot!.querySelector('#continue-btn')!;

    this.#render();
    this.#bindEvents();
  }

  #render(): void {
    // Stats
    this.#stats.innerHTML = html`
      <span class="stat-pill"><strong>4</strong> Modul</span>
      <span class="stat-pill"><strong>23</strong> Soal</span>
      <span class="stat-pill"><strong>12h</strong> Konten</span>
    `;

    // Modules
    const modules = [
      {
        id: 'clustering',
        icon: '📊',
        title: 'Clustering',
        description: 'K-Means, DBSCAN, Hierarchical, Evaluasi (SSE, Silhouette, Elbow)',
        progress: 68,
        path: '/clustering',
      },
      {
        id: 'reinforcement',
        icon: '🤖',
        title: 'Reinforcement Learning',
        description: 'Q-Learning playground, Grid World, Eksplorasi vs Eksploitasi',
        progress: 45,
        path: '/reinforcement/qlearning',
      },
      {
        id: 'ensemble',
        icon: '🔀',
        title: 'Ensemble Learning',
        description: 'AdaBoost, Stacking, Visualisasi bobot & weak learners',
        progress: 30,
        path: '/ensemble/adaboost',
      },
      {
        id: 'exercises',
        icon: '📝',
        title: 'Latihan Terstruktur',
        description: 'Soal AHC & K-Means dengan deadline & progress tracking',
        progress: 40,
        path: '/exercises',
      },
    ];

    this.#moduleGrid.innerHTML = modules.map(m => html`
      <article class="module-card">
        <div class="module-card__icon" aria-hidden="true">${m.icon}</div>
        <h3 class="module-card__title">${m.title}</h3>
        <p class="module-card__description">${m.description}</p>
        <div class="module-card__progress">
          <div class="module-card__progress-bar">
            <div class="module-card__progress-fill" style="width: ${m.progress}%"></div>
          </div>
          <span class="module-card__progress-text">${m.progress}%</span>
        </div>
        <ml-link href="${m.path}" class="module-card__cta">Mulai →</ml-link>
      </article>
    `).join('');
  }

  #bindEvents(): void {
    // Continue button
    this.#continueBtn?.addEventListener('click', () => {
      // TODO: Navigate to last visited module
      const lastModule = localStorage.getItem('ml-lab-last-module') || '/clustering';
      window.location.hash = lastModule;
    });
  }

  /** Show announcement banner */
  showAnnouncement(title: string, text: string): void {
    if (this.#announcement) {
      this.#announcement.hidden = false;
      this.#announcement.innerHTML = html`
        <svg class="announcement-banner__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <div class="announcement-banner__content">
          <p class="announcement-banner__title">${title}</p>
          <p class="announcement-banner__text">${text}</p>
        </div>
      `;
    }
  }

  /** Hide announcement banner */
  hideAnnouncement(): void {
    if (this.#announcement) {
      this.#announcement.hidden = true;
    }
  }

  /** Update continue learning section */
  updateContinueLearning(moduleId: string, moduleTitle: string, progress: number): void {
    if (this.#continueSection) {
      this.#continueSection.hidden = false;
      this.#continueIcon!.textContent = '▶';
      this.#continueTitle!.textContent = moduleTitle;
      this.#continueMeta!.innerHTML = html`
        <span>Progress: ${progress}%</span>
        <span>Terakhir dibuka: ${new Date().toLocaleDateString('id-ID')}</span>
      `;
      this.#continueBtn!.dataset.module = moduleId;
    }
  }
}

customElements.define('ml-dashboard-layout', MlDashboardLayout);

declare global {
  interface HTMLElementTagNameMap {
    'ml-dashboard-layout': MlDashboardLayout;
  }
}