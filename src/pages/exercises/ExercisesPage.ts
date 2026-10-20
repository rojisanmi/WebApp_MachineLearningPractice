/**
 * Exercises Overview Page
 */

import { html } from '../../core/utils/dom.ts';

const template = document.createElement('template');
template.innerHTML = `
  <ml-page-shell>
    <ml-exercise-layout slot="topbar"></ml-exercise-layout>
  </ml-page-shell>
`;

export class MlExercisesPage extends HTMLElement {
  #pageShell: HTMLElement | null = null;
  #exerciseLayout: HTMLElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.#pageShell = this.shadowRoot!.querySelector('ml-page-shell')!;
    this.#exerciseLayout = this.shadowRoot!.querySelector('ml-exercise-layout')!;
    this.#setupLayout();
  }

  #setupLayout(): void {
    if (!this.#exerciseLayout) return;

    // Set config for exercises overview (no specific exercise selected)
    const config = {
      id: 'exercises-overview',
      title: 'Latihan Terstruktur',
      deadline: new Date('2026-06-07T23:59:00+07:00'),
      questions: [
        {
          id: 'ahc',
          number: 1,
          title: 'Agglomerative Hierarchical Clustering',
          instruction: 'Lengkapi perhitungan jarak Euclidean, buat proximity matrix, dan lakukan merging hingga 3 cluster. Gambar dendrogram hasilnya.',
          status: 'completed' as const,
        },
        {
          id: 'kmeans',
          number: 2,
          title: 'K-Means Clustering Exercise',
          instruction: 'Diberikan dataset 2D, tentukan K=3. Hitung iterasi K-Means hingga konvergen. Bandingkan inisialisasi random vs K-Means++.',
          status: 'active' as const,
        },
        {
          id: 'dbscan',
          number: 3,
          title: 'DBSCAN Parameter Tuning',
          instruction: 'Cari eps dan minPts optimal untuk dataset yang diberikan. Identifikasi core, border, dan noise points.',
          status: 'pending' as const,
        },
        {
          id: 'evaluation',
          number: 4,
          title: 'Cluster Evaluation',
          instruction: 'Hitung SSE, Silhouette, dan Elbow Method untuk K=2 sampai K=8. Tentukan K optimal dan berikan justifikasi.',
          status: 'pending' as const,
        },
        {
          id: 'qlearning',
          number: 5,
          title: 'Q-Learning Grid World',
          instruction: 'Implementasikan Q-Learning untuk menyelesaikan Grid World 5x5 dengan obstacle. Target: konvergen < 500 episode.',
          status: 'pending' as const,
        },
      ],
    };

    (this.#exerciseLayout as any).setConfig(config);
  }
}

customElements.define('ml-exercises-page', MlExercisesPage);

declare global {
  interface HTMLElementTagNameMap {
    'ml-exercises-page': MlExercisesPage;
  }
}