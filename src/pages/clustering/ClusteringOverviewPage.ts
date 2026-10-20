/**
 * Clustering Overview Page
 */

import { html } from '../../core/utils/dom.ts';

const template = document.createElement('template');
template.innerHTML = `
  <ml-page-shell>
    <ml-module-layout slot="topbar"></ml-module-layout>
  </ml-page-shell>
`;

export class MlClusteringOverviewPage extends HTMLElement {
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

    // Navigation
    (this.#moduleLayout as any).setNavigation([
      { href: 'clustering', label: 'Overview', icon: '🏠', section: 'Modul' },
      { href: 'clustering/kmeans', label: 'K-Means', icon: '🎯', section: 'Algoritma' },
      { href: 'clustering/dbscan', label: 'DBSCAN', icon: '🔍', section: 'Algoritma' },
      { href: 'clustering/agglomerative', label: 'Agglomerative', icon: '🌳', section: 'Algoritma' },
      { href: 'clustering/evaluation', label: 'Evaluasi', icon: '📏', section: 'Evaluasi' },
    ]);

    // Header
    (this.#moduleLayout as any).setHeader(
      'Clustering',
      'Clustering (Unsupervised Learning)',
      'Temukan pola tersembunyi dalam data tanpa label. Pelajari K-Means, DBSCAN, Hierarchical Clustering, dan metode evaluasi cluster.'
    );

    // Canvas area - show module cards instead of single canvas
    const canvasArea = this.#moduleLayout!.shadowRoot!.getElementById('canvas-area');
    const canvasWrapper = this.#moduleLayout!.shadowRoot!.getElementById('canvas-wrapper');
    if (canvasWrapper) {
      canvasWrapper.style.display = 'none';
    }

    // Custom content for overview
    if (canvasArea) {
      canvasArea.innerHTML = html`
        <div style="display: grid; grid-template-columns: 1fr; gap: var(--space-6);">
          @media (min-width: 640px) {
            grid-template-columns: repeat(2, 1fr);
          }
          @media (min-width: 1024px) {
            grid-template-columns: repeat(4, 1fr);
          }
        >
          <article class="module-card" style="display: flex; flex-direction: column; padding: var(--space-6); background: var(--color-bg-primary); border: 1px solid var(--color-border-default); border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);">
            <div style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: var(--color-brand-primary-subtle); border-radius: var(--radius-lg); margin-bottom: var(--space-4); color: var(--color-brand-primary);" aria-hidden="true">🎯</div>
            <h3 style="font-size: var(--text-lg); font-weight: var(--font-weight-semibold); color: var(--color-fg-primary); margin-bottom: var(--space-2);">K-Means Clustering</h3>
            <p style="font-size: var(--text-sm); color: var(--color-fg-muted); line-height: var(--leading-relaxed); margin-bottom: var(--space-4); flex: 1;">Partisi data ke K cluster berbasis centroid. Iteratif, cepat, cocok untuk cluster berbentuk bola.</p>
            <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-4); font-size: var(--text-xs); color: var(--color-fg-muted);">
              <div style="flex: 1; height: 6px; background: var(--color-bg-tertiary); border-radius: var(--radius-full); overflow: hidden;">
                <div style="width: 68%; height: 100%; background: var(--color-brand-primary); border-radius: var(--radius-full);"></div>
              </div>
              <span style="font-weight: var(--font-weight-semibold); color: var(--color-brand-primary); min-width: 3ch; text-align: right;">68%</span>
            </div>
            <ml-link href="/clustering/kmeans" style="display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); width: 100%; padding: var(--space-3) var(--space-4); background: var(--color-brand-primary); color: var(--color-fg-on-brand); font-weight: var(--font-weight-semibold); border-radius: var(--radius-md); border: none; cursor: pointer;">Mulai →</ml-link>
          </article>

          <article class="module-card" style="display: flex; flex-direction: column; padding: var(--space-6); background: var(--color-bg-primary); border: 1px solid var(--color-border-default); border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);">
            <div style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: var(--color-brand-primary-subtle); border-radius: var(--radius-lg); margin-bottom: var(--space-4); color: var(--color-brand-primary);" aria-hidden="true">🔍</div>
            <h3 style="font-size: var(--text-lg); font-weight: var(--font-weight-semibold); color: var(--color-fg-primary); margin-bottom: var(--space-2);">DBSCAN</h3>
            <p style="font-size: var(--text-sm); color: var(--color-fg-muted); line-height: var(--leading-relaxed); margin-bottom: var(--space-4); flex: 1;">Clustering berbasis kepadatan. Temukan cluster bentuk sembarang & deteksi noise. Parameter: eps & minPts.</p>
            <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-4); font-size: var(--text-xs); color: var(--color-fg-muted);">
              <div style="flex: 1; height: 6px; background: var(--color-bg-tertiary); border-radius: var(--radius-full); overflow: hidden;">
                <div style="width: 45%; height: 100%; background: var(--color-brand-primary); border-radius: var(--radius-full);"></div>
              </div>
              <span style="font-weight: var(--font-weight-semibold); color: var(--color-brand-primary); min-width: 3ch; text-align: right;">45%</span>
            </div>
            <ml-link href="/clustering/dbscan" style="display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); width: 100%; padding: var(--space-3) var(--space-4); background: var(--color-brand-primary); color: var(--color-fg-on-brand); font-weight: var(--font-weight-semibold); border-radius: var(--radius-md); border: none; cursor: pointer;">Mulai →</ml-link>
          </article>

          <article class="module-card" style="display: flex; flex-direction: column; padding: var(--space-6); background: var(--color-bg-primary); border: 1px solid var(--color-border-default); border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);">
            <div style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: var(--color-brand-primary-subtle); border-radius: var(--radius-lg); margin-bottom: var(--space-4); color: var(--color-brand-primary);" aria-hidden="true">🌳</div>
            <h3 style="font-size: var(--text-lg); font-weight: var(--font-weight-semibold); color: var(--color-fg-primary); margin-bottom: var(--space-2);">Agglomerative Clustering</h3>
            <p style="font-size: var(--text-sm); color: var(--color-fg-muted); line-height: var(--leading-relaxed); margin-bottom: var(--space-4); flex: 1;">Hierarchical clustering bottom-up. Visualisasikan dendrogram, bandingkan linkage (single, complete, average, ward).</p>
            <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-4); font-size: var(--text-xs); color: var(--color-fg-muted);">
              <div style="flex: 1; height: 6px; background: var(--color-bg-tertiary); border-radius: var(--radius-full); overflow: hidden;">
                <div style="width: 30%; height: 100%; background: var(--color-brand-primary); border-radius: var(--radius-full);"></div>
              </div>
              <span style="font-weight: var(--font-weight-semibold); color: var(--color-brand-primary); min-width: 3ch; text-align: right;">30%</span>
            </div>
            <ml-link href="/clustering/agglomerative" style="display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); width: 100%; padding: var(--space-3) var(--space-4); background: var(--color-brand-primary); color: var(--color-fg-on-brand); font-weight: var(--font-weight-semibold); border-radius: var(--radius-md); border: none; cursor: pointer;">Mulai →</ml-link>
          </article>

          <article class="module-card" style="display: flex; flex-direction: column; padding: var(--space-6); background: var(--color-bg-primary); border: 1px solid var(--color-border-default); border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);">
            <div style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: var(--color-brand-primary-subtle); border-radius: var(--radius-lg); margin-bottom: var(--space-4); color: var(--color-brand-primary);" aria-hidden="true">📏</div>
            <h3 style="font-size: var(--text-lg); font-weight: var(--font-weight-semibold); color: var(--color-fg-primary); margin-bottom: var(--space-2);">Evaluasi Cluster</h3>
            <p style="font-size: var(--text-sm); color: var(--color-fg-muted); line-height: var(--leading-relaxed); margin-bottom: var(--space-4); flex: 1;">SSE, Silhouette Coefficient, Elbow Method, Hopkins Statistic. Ukualitas cluster & tentukan K optimal.</p>
            <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-4); font-size: var(--text-xs); color: var(--color-fg-muted);">
              <div style="flex: 1; height: 6px; background: var(--color-bg-tertiary); border-radius: var(--radius-full); overflow: hidden;">
                <div style="width: 55%; height: 100%; background: var(--color-brand-primary); border-radius: var(--radius-full);"></div>
              </div>
              <span style="font-weight: var(--font-weight-semibold); color: var(--color-brand-primary); min-width: 3ch; text-align: right;">55%</span>
            </div>
            <ml-link href="/clustering/evaluation" style="display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); width: 100%; padding: var(--space-3) var(--space-4); background: var(--color-brand-primary); color: var(--color-fg-on-brand); font-weight: var(--font-weight-semibold); border-radius: var(--radius-md); border: none; cursor: pointer;">Mulai →</ml-link>
          </article>
        </div>
      `;
    }

    // Add theory panel
    (this.#moduleLayout as any).addPanel({
      title: 'Panduan Modul Clustering',
      description: 'Mulailah dari sini untuk memahami struktur modul',
      content: html`
        <div style="font-size: var(--text-sm); color: var(--color-fg-secondary); line-height: var(--leading-relaxed);">
          <h4 style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-2); color: var(--color-fg-primary);">Urutan Rekomendasi:</h4>
          <ol style="margin-left: var(--space-6); margin-bottom: var(--space-4);">
            <li style="margin-bottom: var(--space-2);"><strong>K-Means</strong> — Dasar partitioning clustering</li>
            <li style="margin-bottom: var(--space-2);"><strong>DBSCAN</strong> — Density-based, handle noise</li>
            <li style="margin-bottom: var(--space-2);"><strong>Agglomerative</strong> — Hierarchical, dendrogram</li>
            <li style="margin-bottom: var(--space-2);"><strong>Evaluasi</strong> — Ukur kualitas & tentukan K</li>
          </ol>
          <h4 style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-2); color: var(--color-fg-primary);">Fitur Setiap Sub-modul:</h4>
          <ul style="margin-left: var(--space-6);">
            <li style="margin-bottom: var(--space-1);">🎮 <strong>Playground Interaktif</strong> — Klik/tarik titik, lihat centroid bergerak</li>
            <li style="margin-bottom: var(--space-1);">📐 <strong>Perhitungan Step-by-step</strong> — Lihat rumus & angka tiap iterasi</li>
            <li style="margin-bottom: var(--space-1);">⚙️ <strong>Parameter Live</strong> — Ubah K, eps, linkage, lihat efek instan</li>
            <li style="margin-bottom: var(--space-1);">📊 <strong>Metrik Real-time</strong> — SSE, Silhouette, dll update otomatis</li>
          </ul>
        </div>
      `,
    });
  }
}

customElements.define('ml-clustering-overview', MlClusteringOverviewPage);

declare global {
  interface HTMLElementTagNameMap {
    'ml-clustering-overview': MlClusteringOverviewPage;
  }
}