/**
 * K-Means Exercise Page
 */

import { html } from '../../core/utils/dom.ts';

const template = document.createElement('template');
template.innerHTML = `
  <ml-page-shell>
    <ml-exercise-layout slot="topbar"></ml-exercise-layout>
  </ml-page-shell>
`;

export class MlKMeansExercisePage extends HTMLElement {
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

    const config = {
      id: 'kmeans-exercise',
      title: 'K-Means Exercise - Clustering Practice',
      deadline: new Date('2026-06-07T23:59:00+07:00'),
      questions: [
        {
          id: 'q1',
          number: 1,
          title: 'Inisialisasi Centroid',
          instruction: 'Diberikan dataset 10 titik 2D. Inisialisasi 3 centroid dengan metode: (a) Random, (b) K-Means++. Bandingkan posisi awal centroid.',
          status: 'completed' as const,
        },
        {
          id: 'q2',
          number: 2,
          title: 'Iterasi 1: Assignment Step',
          instruction: 'Hitung jarak Euclidean tiap titik ke 3 centroid. Assign tiap titik ke cluster terdekat. Tampilkan tabel assignment.',
          status: 'active' as const,
        },
        {
          id: 'q3',
          number: 3,
          title: 'Iterasi 1: Update Step',
          instruction: 'Hitung centroid baru sebagai mean dari tiap cluster. Berapa perpindahan centroid dari posisi awal?',
          status: 'pending' as const,
        },
        {
          id: 'q4',
          number: 4,
          title: 'Konvergensi',
          instruction: 'Lakukan iterasi hingga konvergen (centroid tidak bergerak > 0.01). Berapa total iterasi? Berapa SSE final?',
          status: 'pending' as const,
        },
        {
          id: 'q5',
          number: 5,
          title: 'Evaluasi & Perbandingan',
          instruction: 'Hitung Silhouette Coefficient untuk hasil clustering. Coba K=2 dan K=4, bandingkan SSE dan Silhouette. K berapa yang optimal?',
          status: 'pending' as const,
        },
      ],
    };

    (this.#exerciseLayout as any).setConfig(config);
  }
}

customElements.define('ml-kmeans-exercise-page', MlKMeansExercisePage);

declare global {
  interface HTMLElementTagNameMap {
    'ml-kmeans-exercise-page': MlKMeansExercisePage;
  }
}