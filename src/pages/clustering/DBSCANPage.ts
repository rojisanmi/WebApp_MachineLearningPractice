/**
 * DBSCAN Page — Placeholder
 */

import { html } from '../../core/utils/dom.ts';

const template = document.createElement('template');
template.innerHTML = `
  <ml-page-shell>
    <ml-module-layout slot="topbar"></ml-module-layout>
  </ml-page-shell>
`;

export class MlDBSCANPage extends HTMLElement {
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
      'Clustering / DBSCAN',
      'DBSCAN (Density-Based Spatial Clustering)',
      'Clustering berbasis kepadatan. Temukan cluster bentuk sembarang dan deteksi noise/outlier. Parameter: eps (radius) dan minPts (minimum tetangga).'
    );

    (this.#moduleLayout as any).setCanvasAspectRatio(1);

    (this.#moduleLayout as any).setToolbar([
      { label: 'Step', variant: 'primary', icon: '⏭', onClick: () => console.log('Step') },
      { label: 'Auto', variant: 'secondary', icon: '▶', onClick: () => console.log('Auto') },
      { label: 'Reset', variant: 'ghost', icon: '↻', onClick: () => console.log('Reset') },
    ]);

    (this.#moduleLayout as any).addPanel({
      title: 'Parameter DBSCAN',
      description: 'Atur eps dan minPts',
      content: html`
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          <div>
            <label>eps (Radius)</label>
            <ml-range min="0.1" max="5" step="0.1" value="0.5" style="width: 100%;"></ml-range>
          </div>
          <div>
            <label>minPts (Min Tetangga)</label>
            <ml-input type="number" min="1" max="20" value="4" style="width: 80px;"></ml-input>
          </div>
          <hr style="border-color: var(--color-border-default);">
          <div style="display: flex; flex-direction: column; gap: var(--space-2);">
            <ml-button variant="primary" style="width: 100%;">Jalankan</ml-button>
            <ml-button variant="ghost" style="width: 100%;">Reset</ml-button>
          </div>
        </div>
      `,
    });

    (this.#moduleLayout as any).addPanel({
      title: 'Teori: DBSCAN',
      description: 'Konsep Core, Border, dan Noise points',
      content: html`
        <div style="font-size: var(--text-sm); color: var(--color-fg-secondary); line-height: var(--leading-relaxed);">
          <h4 style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-2); color: var(--color-fg-primary);">Definisi Titik:</h4>
          <ul style="margin-left: var(--space-6); margin-bottom: var(--space-4);">
            <li style="margin-bottom: var(--space-1;"><strong>Core Point:</strong> ≥ minPts tetangga dalam radius eps</li>
            <li style="margin-bottom: var(--space-1;"><strong>Border Point:</strong> < minPts tetangga, tapi dalam radius eps dari core point</li>
            <li style="margin-bottom: var(--space-1;"><strong>Noise Point:</strong> Bukan core dan tidak dalam radius core point manapun</li>
          </ul>
          <h4 style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-2); color: var(--color-fg-primary);">Algoritma:</h4>
          <ol style="margin-left: var(--space-6);">
            <li>Cari semua core points</li>
            <li>Bangun cluster dari core points yang saling terhubung</li>
            <li>Tambahkan border points ke cluster terdekat</li>
            <li>Noise points tidak masuk cluster manapun</li>
          </ol>
        </div>
      `,
    });
  }
}

customElements.define('ml-dbscan-page', MlDBSCANPage);

declare global {
  interface HTMLElementTagNameMap {
    'ml-dbscan-page': MlDBSCANPage;
  }
}