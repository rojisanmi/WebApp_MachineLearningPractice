/**
 * Agglomerative Clustering Page — Placeholder
 */

import { html } from '../../core/utils/dom.ts';

const template = document.createElement('template');
template.innerHTML = `
  <ml-page-shell>
    <ml-module-layout slot="topbar"></ml-module-layout>
  </ml-page-shell>
`;

export class MlAgglomerativePage extends HTMLElement {
  #pageShell: HTMLElement | null = null;
  #moduleLayout: HTMLElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.#pageShell = this.shadowRoot!.querySelector('ml-page-shell')!;
    this.#moduleLayout = this.shadowRoot!.querySelector('ml-module-layout')!;
    this.#setupLayout();
  }

  #setupLayout(): void {
    if (!this.#moduleLayout) return;

    (this.#moduleLayout as any).setNavigation([
      { href: 'clustering', label: 'Overview', icon: '🏠', section: 'Modul' },
      { href: 'clustering/kmeans', label: 'K-Means', icon: '🎯', section: 'Algoritma' },
      { href: 'clustering/dbscan', label: 'DBSCAN', icon: '🔍', section: 'Algoritma' },
      { href: 'clustering/agglomerative', label: 'Agglomerative', icon: '🌳', section: 'Algoritma' },
      { href: 'clustering/evaluation', label: 'Evaluasi', icon: '📏', section: 'Evaluasi' },
    ]);

    (this.#moduleLayout as any).setHeader(
      'Clustering / Agglomerative',
      'Agglomerative Hierarchical Clustering',
      'Hierarchical clustering bottom-up. Setiap titik mulai sebagai cluster sendiri, lalu digabungkan berpasangan hingga tersisa 1 cluster. Visualisasikan dengan dendrogram.'
    );

    (this.#moduleLayout as any).setCanvasAspectRatio(1);

    (this.#moduleLayout as any).setToolbar([
      { label: 'Step', variant: 'primary', icon: '⏭', onClick: () => console.log('Step') },
      { label: 'Auto', variant: 'secondary', icon: '▶', onClick: () => console.log('Auto') },
      { label: 'Reset', variant: 'ghost', icon: '↻', onClick: () => console.log('Reset') },
    ]);

    (this.#moduleLayout as any).addPanel({
      title: 'Parameter',
      description: 'Linkage method dan cut height',
      content: html`
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          <div>
            <label>Linkage Method</label>
            <ml-select style="width: 100%;">
              <option value="ward">Ward (minimize variance)</option>
              <option value="complete">Complete (max distance)</option>
              <option value="average">Average (mean distance)</option>
              <option value="single">Single (min distance)</option>
            </ml-select>
          </div>
          <div>
            <label>Cut Height (Jumlah Cluster)</label>
            <ml-range min="1" max="10" value="3" style="width: 100%;"></ml-range>
          </div>
          <hr style="border-color: var(--color-border-default);">
          <div style="display: flex; flex-direction: column; gap: var(--space-2);">
            <ml-button variant="primary" style="width: 100%;">Step Merge</ml-button>
            <ml-button variant="ghost" style="width: 100%;">Reset</ml-button>
          </div>
        </div>
      `,
    });

    (this.#moduleLayout as any).addPanel({
      title: 'Teori: Agglomerative Clustering',
      description: 'Bottom-up hierarchical clustering',
      content: html`
        <div style="font-size: var(--text-sm); color: var(--color-fg-secondary); line-height: var(--leading-relaxed);">
          <h4 style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-2); color: var(--color-fg-primary);">Proses:</h4>
          <ol style="margin-left: var(--space-6); margin-bottom: var(--space-4);">
            <li style="margin-bottom: var(--space-2;">Mulai: n cluster (1 titik per cluster)</li>
            <li style="margin-bottom: var(--space-2;">Hitung jarak antar semua pasangan cluster</li>
            <li style="margin-bottom: var(--space-2;">Gabungkan 2 cluster terdekat</li>
            <li style="margin-bottom: var(--space-2;">Ulangi hingga 1 cluster tersisa</li>
          </ol>
          <h4 style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-2); color: var(--color-fg-primary);">Linkage Methods:</h4>
          <ul style="margin-left: var(--space-6);">
            <li style="margin-bottom: var(--space-1;"><strong>Ward:</strong> Minimize within-cluster variance (default recommended)</li>
            <li style="margin-bottom: var(--space-1;"><strong>Complete:</strong> Max distance between clusters (compact clusters)</li>
            <li style="margin-bottom: var(--space-1;"><strong>Average:</strong> Mean distance (balanced)</li>
            <li style="margin-bottom: var(--space-1;"><strong>Single:</strong> Min distance (chaining effect, elongated clusters)</li>
          </ul>
          <p style="margin-top: var(--space-4);"><strong>Dendrogram:</strong> Visualisasi pohon merge. Tinggi batang = jarak merge. Potong horizontal = pilih jumlah cluster.</p>
        </div>
      `,
    });
  }
}

customElements.define('ml-agglomerative-page', MlAgglomerativePage);

declare global {
  interface HTMLElementTagNameMap {
    'ml-agglomerative-page': MlAgglomerativePage;
  }
}