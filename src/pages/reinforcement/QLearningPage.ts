/**
 * Q-Learning Page — Placeholder
 */

import { html } from '../../core/utils/dom.ts';

const template = document.createElement('template');
template.innerHTML = `
  <ml-page-shell>
    <ml-module-layout slot="topbar"></ml-module-layout>
  </ml-page-shell>
`;

export class MlQLearningPage extends HTMLElement {
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
      { href: 'reinforcement/qlearning', label: 'Q-Learning', icon: '🤖', section: 'Reinforcement Learning' },
    ]);

    (this.#moduleLayout as any).setHeader(
      'Reinforcement Learning / Q-Learning',
      'Q-Learning Playground',
      'Grid World environment untuk belajar Q-Learning. Atur α (learning rate), γ (discount), ε (exploration). Lihat Q-table update real-time dan agent belajar jalan terpendek.'
    );

    (this.#moduleLayout as any).setCanvasAspectRatio(1);

    (this.#moduleLayout as any).setToolbar([
      { label: 'Step', variant: 'primary', icon: '⏭', onClick: () => console.log('Step') },
      { label: 'Train (100 ep)', variant: 'secondary', icon: '🏃', onClick: () => console.log('Train') },
      { label: 'Reset Q-Table', variant: 'ghost', icon: '↻', onClick: () => console.log('Reset') },
      { label: 'Mode: Soal/Jawaban', variant: 'ghost', icon: '🔄', onClick: () => console.log('Toggle Mode') },
    ]);

    (this.#moduleLayout as any).addPanel({
      title: 'Parameter Q-Learning',
      description: 'Hyperparameter algoritma',
      content: html`
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          <div>
            <label>α (Learning Rate)</label>
            <ml-range min="0.01" max="1" step="0.01" value="0.1" style="width: 100%;"></ml-range>
          </div>
          <div>
            <label>γ (Discount Factor)</label>
            <ml-range min="0" max="1" step="0.01" value="0.9" style="width: 100%;"></ml-range>
          </div>
          <div>
            <label>ε (Exploration Rate)</label>
            <ml-range min="0" max="1" step="0.01" value="0.1" style="width: 100%;"></ml-range>
          </div>
          <div>
            <label>Episodes per Train</label>
            <ml-input type="number" min="1" max="10000" value="100" style="width: 100px;"></ml-input>
          </div>
          <hr style="border-color: var(--color-border-default);">
          <div style="display: flex; flex-direction: column; gap: var(--space-2);">
            <ml-button variant="primary" style="width: 100%;">Step Episode</ml-button>
            <ml-button variant="secondary" style="width: 100%;">Train 100 Episodes</ml-button>
            <ml-button variant="ghost" style="width: 100%;">Reset Q-Table</ml-button>
          </div>
        </div>
      `,
    });

    (this.#moduleLayout as any).addPanel({
      title: 'Q-Table (Live)',
      description: 'Nilai Q(s,a) per state-action',
      content: html`
        <div style="font-size: var(--text-xs); overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-family: var(--font-mono);">
            <thead>
              <tr style="background: var(--color-bg-secondary);">
                <th style="padding: var(--space-2); text-align: left; border-bottom: 2px solid var(--color-border-default);">State</th>
                <th style="padding: var(--space-2); text-align: center; border-bottom: 2px solid var(--color-border-default);">↑</th>
                <th style="padding: var(--space-2); text-align: center; border-bottom: 2px solid var(--color-border-default);">→</th>
                <th style="padding: var(--space-2); text-align: center; border-bottom: 2px solid var(--color-border-default);">↓</th>
                <th style="padding: var(--space-2); text-align: center; border-bottom: 2px solid var(--color-border-default);">←</th>
              </tr>
            </thead>
            <tbody id="q-table-body">
              <tr><td colspan="5" style="padding: var(--space-4); text-align: center; color: var(--color-fg-muted);">Q-Table akan muncul setelah inisialisasi</td></tr>
            </tbody>
          </table>
        </div>
      `,
    });

    (this.#moduleLayout as any).addPanel({
      title: 'Teori: Q-Learning',
      description: 'Off-policy Temporal Difference Learning',
      content: html`
        <div style="font-size: var(--text-sm); color: var(--color-fg-secondary); line-height: var(--leading-relaxed);">
          <h4 style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-2); color: var(--color-fg-primary);">Update Rule:</h4>
          <div style="background: var(--color-bg-inverse); color: var(--color-fg-inverse); padding: var(--space-3); border-radius: var(--radius-md); font-family: var(--font-mono); font-size: var(--text-sm); overflow-x: auto; margin-bottom: var(--space-4);">
            Q(s,a) ← Q(s,a) + α [r + γ max Q(s',a') - Q(s,a)]
          </div>
          <ul style="margin-left: var(--space-6); margin-bottom: var(--space-4);">
            <li style="margin-bottom: var(--space-1;"><strong>α (alpha):</strong> Learning rate — seberapa cepat update nilai baru</li>
            <li style="margin-bottom: var(--space-1;"><strong>γ (gamma):</strong> Discount factor — pentingnya reward masa depan</li>
            <li style="margin-bottom: var(--space-1;"><strong>ε (epsilon):</strong> Exploration rate — probabilitas aksi random</li>
            <li style="margin-bottom: var(--space-1;"><strong>r:</strong> Reward immediate</li>
            <li style="margin-bottom: var(--space-1;"><strong>max Q(s',a'):</strong> Estimasi nilai optimal dari state berikutnya</li>
          </ul>
          <h4 style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-2); color: var(--color-fg-primary);">Eksplorasi vs Eksploitasi:</h4>
          <p>ε-greedy: dengan probabilitas ε pilih aksi random (explore), dengan 1-ε pilih aksi dengan Q tertinggi (exploit).</p>
        </div>
      `,
    });
  }
}

customElements.define('ml-qlearning-page', MlQLearningPage);

declare global {
  interface HTMLElementTagNameMap {
    'ml-qlearning-page': MlQLearningPage;
  }
}