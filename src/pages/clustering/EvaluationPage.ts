/**
 * Evaluation Page — Placeholder for SSE, Silhouette, Elbow, Hopkins
 */

import { html } from '../../core/utils/dom.ts';

const template = document.createElement('template');
template.innerHTML = `
  <ml-page-shell>
    <ml-module-layout slot="topbar"></ml-module-layout>
  </ml-page-shell>
`;

export class MlEvaluationPage extends HTMLElement {
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
      'Clustering / Evaluasi',
      'Evaluasi Kualitas Cluster',
      'Ukur seberapa baik clustering dengan SSE, Silhouette Coefficient, Elbow Method, dan Hopkins Statistic. Bandingkan hasil untuk K yang berbeda.'
    );

    (this.#moduleLayout as any).setCanvasAspectRatio(4 / 3);

    (this.#moduleLayout as any).setToolbar([
      { label: 'Hitung Semua', variant: 'primary', icon: '📊', onClick: () => console.log('Calculate All') },
      { label: 'Reset', variant: 'ghost', icon: '↻', onClick: () => console.log('Reset') },
    ]);

    (this.#moduleLayout as any).addPanel({
      title: 'Metode Evaluasi',
      description: 'Pilih metode dan parameter',
      content: html`
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          <div>
            <label>Metode</label>
            <ml-select style="width: 100%;">
              <option value="sse">Sum of Squared Errors (SSE)</option>
              <option value="silhouette">Silhouette Coefficient</option>
              <option value="elbow">Elbow Method</option>
              <option value="hopkins">Hopkins Statistic</option>
            </ml-select>
          </div>
          <div>
            <label>Range K (min - max)</label>
            <div style="display: flex; gap: var(--space-2);">
              <ml-input type="number" min="1" max="20" value="2" placeholder="Min K" style="width: 80px;"></ml-input>
              <span style="align-self: center;">–</span>
              <ml-input type="number" min="1" max="20" value="10" placeholder="Max K" style="width: 80px;"></ml-input>
            </div>
          </div>
          <hr style="border-color: var(--color-border-default);">
          <div style="display: flex; flex-direction: column; gap: var(--space-2);">
            <ml-button variant="primary" style="width: 100%;">Hitung</ml-button>
            <ml-button variant="ghost" style="width: 100%;">Reset</ml-button>
          </div>
        </div>
      `,
    });

    (this.#moduleLayout as any).addPanel({
      title: 'Ringkasan Metode',
      description: 'Kapan menggunakan metode mana',
      content: html`
        <div style="font-size: var(--text-sm); color: var(--color-fg-secondary); line-height: var(--leading-relaxed);">
          <div style="margin-bottom: var(--space-4); padding: var(--space-3); background: var(--color-bg-secondary); border-radius: var(--radius-lg); border-left: 4px solid var(--color-brand-primary);">
            <strong>SSE (Sum of Squared Errors)</strong>
            <p style="margin-top: var(--space-1);">Total kuadrat jarak titik ke centroid. Semakin kecil semakin baik. Gunakan untuk Elbow Method.</p>
          </div>
          <div style="margin-bottom: var(--space-4); padding: var(--space-3); background: var(--color-bg-secondary); border-radius: var(--radius-lg); border-left: 4px solid var(--color-status-success);">
            <strong>Silhouette Coefficient</strong>
            <p style="margin-top: var(--space-1);">Range [-1, 1]. Mendekati 1 = cluster terpisah baik. Rata-rata semua titik. Bandingkan K berbeda.</p>
          </div>
          <div style="margin-bottom: var(--space-4); padding: var(--space-3); background: var(--color-bg-secondary); border-radius: var(--radius-lg); border-left: 4px solid var(--color-status-warning);">
            <strong>Elbow Method</strong>
            <p style="margin-top: var(--space-1);">Plot SSE vs K. Cari "siku" (elbow) di mana penurunan SSE melambat. K di titik siku = K optimal.</p>
          </div>
          <div style="margin-bottom: var(--space-4); padding: var(--space-3); background: var(--color-bg-secondary); border-radius: var(--radius-lg); border-left: 4px solid var(--color-status-info);">
            <strong>Hopkins Statistic</strong>
            <p style="margin-top: var(--space-1);">Uji kecenderungan clustering. H > 0.75 = data clusterable. H ≈ 0.5 = random. H < 0.5 = uniform.</p>
          </div>
        </div>
      `,
    });

    (this.#moduleLayout as any).addPanel({
      title: 'Hasil Perhitungan',
      description: 'Tabel dan grafik evaluasi',
      content: html`
        <div style="font-size: var(--text-sm); color: var(--color-fg-muted); text-align: center; padding: var(--space-8);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto var(--space-4); opacity: 0.5;" aria-hidden="true">
            <line x1="18" y1="20" x2="6" y2="20"></line>
            <line x1="12" y1="20" x2="12" y2="10"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
            <line x1="18" y1="20" x2="18" y2="4"></line>
          </svg>
          <p>Pilih metode dan klik <strong>Hitung</strong> untuk melihat hasil.</p>
          <p>Grafik SSE vs K, Silhouette vs K, dan tabel detail akan muncul di sini.</p>
        </div>
      `,
    });
  }
}

customElements.define('ml-evaluation-page', MlEvaluationPage);

declare global {
  interface HTMLElementTagNameMap {
    'ml-evaluation-page': MlEvaluationPage;
  }
}