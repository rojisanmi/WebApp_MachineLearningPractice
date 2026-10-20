/**
 * AHC Exercise Page
 */

import { html } from '../../core/utils/dom.ts';

const template = document.createElement('template');
template.innerHTML = `
  <ml-page-shell>
    <ml-exercise-layout slot="topbar"></ml-exercise-layout>
  </ml-page-shell>
`;

export class MlAHCExercisePage extends HTMLElement {
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
      id: 'ahc-exercise',
      title: 'AHC Exercise - Agglomerative Hierarchical Clustering',
      deadline: new Date('2026-06-07T23:59:00+07:00'),
      questions: [
        {
          id: 'q1',
          number: 1,
          title: 'Perhitungan Jarak Euclidean',
          instruction: 'Diberikan 6 titik data 2D. Hitung matriks jarak Euclidean lengkap (6x6). Tampilkan dengan 4 angka di belakang koma.',
          status: 'completed' as const,
        },
        {
          id: 'q2',
          number: 2,
          title: 'Single Linkage - Merge Pertama',
          instruction: 'Berdasarkan matriks jarak, tentukan pasangan cluster yang digabungkan pertama kali menggunakan Single Linkage. Berikan jarak merge-nya.',
          status: 'completed' as const,
        },
        {
          id: 'q3',
          number: 3,
          title: 'Complete Linkage - Merge Kedua',
          instruction: 'Setelah merge pertama, hitung ulang matriks jarak menggunakan Complete Linkage. Tentukan merge kedua dan jaraknya.',
          status: 'active' as const,
        },
        {
          id: 'q4',
          number: 4,
          title: 'Dendrogram & Cut Height',
          instruction: 'Gambar dendrogram lengkap untuk Single dan Complete Linkage. Tentukan cut height untuk mendapat 3 cluster. Berikan anggota tiap cluster.',
          status: 'pending' as const,
        },
        {
          id: 'q5',
          number: 5,
          title: 'Analisis Perbandingan',
          instruction: 'Bandingkan hasil clustering Single vs Complete Linkage. Kapan Single Linkage lebih baik? Kapan Complete Linkage lebih baik? Berikan contoh kasus nyata.',
          status: 'pending' as const,
        },
      ],
    };

    (this.#exerciseLayout as any).setConfig(config);
  }
}

customElements.define('ml-ahc-exercise-page', MlAHCExercisePage);

declare global {
  interface HTMLElementTagNameMap {
    'ml-ahc-exercise-page': MlAHCExercisePage;
  }
}