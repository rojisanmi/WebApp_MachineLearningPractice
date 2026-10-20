/**
 * DashboardPage — Main landing page
 */

import { html } from '../../core/utils/dom.ts';

const template = document.createElement('template');
template.innerHTML = `
  <ml-page-shell>
    <ml-dashboard-layout slot="topbar"></ml-dashboard-layout>
  </ml-page-shell>
`;

export class MlDashboardPage extends HTMLElement {
  #pageShell: HTMLElement | null = null;
  #dashboardLayout: HTMLElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.#pageShell = this.shadowRoot!.querySelector('ml-page-shell')!;
    this.#dashboardLayout = this.shadowRoot!.querySelector('ml-dashboard-layout')!;

    // Check for saved progress
    this.#restoreProgress();

    // Set up announcement if any
    this.#checkAnnouncements();
  }

  #restoreProgress(): void {
    const lastModule = localStorage.getItem('ml-lab-last-module');
    const progress = JSON.parse(localStorage.getItem('ml-lab-progress') || '{}');

    if (lastModule && this.#dashboardLayout) {
      // Find module info
      const modules: Record<string, { title: string; icon: string }> = {
        '/clustering': { title: 'Clustering', icon: '📊' },
        '/reinforcement/qlearning': { title: 'Q-Learning', icon: '🤖' },
        '/ensemble/adaboost': { title: 'AdaBoost', icon: '🔀' },
        '/exercises': { title: 'Latihan Terstruktur', icon: '📝' },
      };

      const module = modules[lastModule];
      if (module) {
        const moduleProgress = progress[lastModule] || 0;
        (this.#dashboardLayout as any).updateContinueLearning(lastModule, module.title, moduleProgress);
      }
    }
  }

  #checkAnnouncements(): void {
    // Example: check if there's an upcoming deadline
    const now = new Date();
    const deadline = new Date('2026-06-07T23:59:00+07:00');
    const diffDays = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays > 0 && diffDays <= 7 && this.#dashboardLayout) {
      (this.#dashboardLayout as any).showAnnouncement(
        '⏰ Deadline Mendekat',
        `Pengumpulan latihan AHC & K-Means berakhir dalam ${diffDays} hari (${deadline.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}). Pastikan laporanmu sudah siap!`
      );
    }
  }
}

customElements.define('ml-dashboard-page', MlDashboardPage);

declare global {
  interface HTMLElementTagNameMap {
    'ml-dashboard-page': MlDashboardPage;
  }
}