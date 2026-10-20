/**
 * K-Means Page — Placeholder for migration from existing clustering/K-means.html
 */

import { html } from '../../core/utils/dom.ts';

const template = document.createElement('template');
template.innerHTML = `
  <ml-page-shell>
    <ml-module-layout slot="topbar"></ml-module-layout>
  </ml-page-shell>
`;

export class MlKMeansPage extends HTMLElement {
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
      'Clustering / K-Means',
      'K-Means Clustering',
      'Visualisasi interaktif algoritma K-Means. Tambahkan titik data, atur jumlah cluster (K), dan lihat proses iteratif pembentukan cluster secara real-time.'
    );

    (this.#moduleLayout as any).setCanvasAspectRatio(1);

    // Toolbar
    (this.#moduleLayout as any).setToolbar([
      { label: 'Step', variant: 'primary', icon: '⏭', onClick: () => console.log('Step') },
      { label: 'Auto', variant: 'secondary', icon: '▶', onClick: () => console.log('Auto') },
      { label: 'Reset', variant: 'ghost', icon: '↻', onClick: () => console.log('Reset') },
      { label: 'Export', variant: 'ghost', icon: '⬇', onClick: () => console.log('Export') },
    ]);

    // Panels
    (this.#moduleLayout as any).addPanel({
      title: 'Kontrol K-Means',
      description: 'Atur parameter dan jalankan simulasi',
      content: html`
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          <div>
            <label>Jumlah Cluster (K)</label>
            <ml-input type="number" min="1" max="10" value="3" style="width: 80px;"></ml-input>
          </div>
          <div>
            <label>Inisialisasi Centroid</label>
            <ml-select style="width: 100%;">
              <option value="random">Random</option>
              <option value="kmeans++">K-Means++</option>
              <option value="manual">Manual (Klik Canvas)</option>
            </ml-select>
          </div>
          <div>
            <label>Kecepatan Animasi</label>
            <ml-range min="1" max="10" value="5" style="width: 100%;"></ml-range>
          </div>
          <hr style="border-color: var(--color-border-default);">
          <div style="display: flex; flex-direction: column; gap: var(--space-2);">
            <ml-button variant="primary" style="width: 100%;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              Jalankan Step
            </ml-button>
            <ml-button variant="secondary" style="width: 100%;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="2"></rect><line x1="6" y1="10" x2="18" y2="10"></line></svg>
              Auto Run
            </ml-button>
            <ml-button variant="ghost" style="width: 100%;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M17 1v4M17 21v-4M1 17h4M21 17h-4"></path></svg>
              Reset Semua
            </ml-button>
          </div>
        </div>
      `,
    });

    (this.#moduleLayout as any).addPanel({
      title: 'Teori: K-Means Algorithm',
      description: 'Langkah-langkah algoritma K-Means',
      content: html`
        <div style="font-size: var(--text-sm); color: var(--color-fg-secondary); line-height: var(--leading-relaxed);">
          <ol style="margin-left: var(--space-6); margin-bottom: var(--space-4);">
            <li style="margin-bottom: var(--space-2);"><strong>Inisialisasi:</strong> Pilih K centroid awal (random atau K-Means++)</li>
            <li style="margin-bottom: var(--space-2);"><strong>Assignment:</strong> Setiap titik data dikaitkan ke centroid terdekat (Euclidean distance)</li>
            <li style="margin-bottom: var(--space-2);"><strong>Update:</strong> Hitung ulang centroid sebagai mean dari titik dalam cluster</li>
            <li style="margin-bottom: var(--space-2);"><strong>Repeat:</strong> Ulangi Assignment & Update hingga konvergen (centroid tidak bergerak signifikan)</li>
          </ol>
          <p><strong>Kompleksitas:</strong> O(n × k × i × d) — n=data, k=cluster, i=iterasi, d=dimensi</p>
          <p><strong>Kelemahan:</strong> Sensitif inisialisasi, asumsikan cluster berbentuk bola, butuh K diketahui</p>
        </div>
      `,
    });

    (this.#moduleLayout as any).addPanel({
      title: 'Perhitungan Iterasi Saat Ini',
      description: 'Detail perhitungan step yang sedang berjalan',
      content: html`
        <div style="font-size: var(--text-sm); color: var(--color-fg-muted); text-align: center; padding: var(--space-8);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto var(--space-4); opacity: 0.5;" aria-hidden="true">
            <path d="M9 11l3 3L22 4"></path>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
          <p>Klik <strong>Jalankan Step</strong> untuk memulai perhitungan.</p>
          <p>Detail jarak, assignment, dan update centroid akan muncul di sini.</p>
        </div>
      `,
    });

    (this.#moduleLayout as any).addPanel({
      title: 'Metrik Evaluasi',
      description: 'Kualitas clustering real-time',
      content: html`
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-3);">
          <div style="padding: var(--space-3); background: var(--color-bg-secondary); border-radius: var(--radius-lg); text-align: center;">
            <div style="font-size: var(--text-2xl); font-weight: var(--font-weight-bold); color: var(--color-brand-primary);" id="metric-iter">0</div>
            <div style="font-size: var(--text-xs); color: var(--color-fg-muted);">Iterasi</div>
          </div>
          <div style="padding: var(--space-3); background: var(--color-bg-secondary); border-radius: var(--radius-lg); text-align: center;">
            <div style="font-size: var(--text-2xl); font-weight: var(--font-weight-bold); color: var(--color-brand-primary);" id="metric-k">3</div>
            <div style="font-size: var(--text-xs); color: var(--color-fg-muted);">Cluster (K)</div>
          </div>
          <div style="padding: var(--space-3); background: var(--color-bg-secondary); border-radius: var(--radius-lg); text-align: center;">
            <div style="font-size: var(--text-2xl); font-weight: var(--font-weight-bold); color: var(--color-brand-primary);" id="metric-sse">0.00</div>
            <div style="font-size: var(--text-xs); color: var(--color-fg-muted);">SSE</div>
          </div>
          <div style="padding: var(--space-3); background: var(--color-bg-secondary); border-radius: var(--radius-lg); text-align: center;">
            <div style="font-size: var(--text-2xl); font-weight: var(--font-weight-bold); color: var(--color-brand-primary);" id="metric-sil">0.00</div>
            <div style="font-size: var(--text-xs); color: var(--color-fg-muted);">Silhouette</div>
          </div>
        </div>
      `,
    });
  }
}

customElements.define('ml-kmeans-page', MlKMeansPage);

declare global {
  interface HTMLElementTagNameMap {
    'ml-kmeans-page': MlKMeansPage;
  }
}