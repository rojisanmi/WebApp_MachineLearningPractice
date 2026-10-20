/**
 * AdaBoost Page — Placeholder
 */

import { html } from '../../core/utils/dom.ts';

const template = document.createElement('template');
template.innerHTML = `
  <ml-page-shell>
    <ml-module-layout slot="topbar"></ml-module-layout>
  </ml-page-shell>
`;

export class MlAdaBoostPage extends HTMLElement {
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
      { href: 'ensemble/adaboost', label: 'AdaBoost', icon: '⚖️', section: 'Ensemble Learning' },
      { href: 'ensemble/stacking', label: 'Stacking', icon: '📚', section: 'Ensemble Learning' },
    ]);

    (this.#moduleLayout as any).setHeader(
      'Ensemble Learning / AdaBoost',
      'AdaBoost (Adaptive Boosting)',
      'Visualisasi bagaimana AdaBoost menggabungkan weak learners. Lihat bobot data point berubah per iterasi, error rate menurun, dan ensemble menjadi strong learner.'
    );

    (this.#moduleLayout as any).setCanvasAspectRatio(1);

    (this.#moduleLayout as any).setToolbar([
      { label: 'Iterasi Berikutnya', variant: 'primary', icon: '⏭', onClick: () => console.log('Next Iteration') },
      { label: 'Auto Play', variant: 'secondary', icon: '▶', onClick: () => console.log('Auto Play') },
      { label: 'Reset', variant: 'ghost', icon: '↻', onClick: () => console.log('Reset') },
      { label: 'Kuis Interaktif', variant: 'ghost', icon: '❓', onClick: () => console.log('Quiz') },
    ]);

    (this.#moduleLayout as any).addPanel({
      title: 'Kontrol AdaBoost',
      description: 'Parameter ensemble',
      content: html`
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          <div>
            <label>Jumlah Iterasi (T)</label>
            <ml-range min="1" max="50" value="10" style="width: 100%;"></ml-range>
          </div>
          <div>
            <label>Weak Learner</label>
            <ml-select style="width: 100%;">
              <option value="decision-stump">Decision Stump (Depth 1)</option>
              <option value="shallow-tree">Shallow Tree (Depth 2-3)</option>
            </ml-select>
          </div>
          <hr style="border-color: var(--color-border-default);">
          <div style="display: flex; flex-direction: column; gap: var(--space-2);">
            <ml-button variant="primary" style="width: 100%;">Iterasi Berikutnya</ml-button>
            <ml-button variant="secondary" style="width: 100%;">Auto Play</ml-button>
            <ml-button variant="ghost" style="width: 100%;">Reset</ml-button>
          </div>
        </div>
      `,
    });

    (this.#moduleLayout as any).addPanel({
      title: 'Perhitungan Iterasi Ke-1',
      description: 'Detail bobot α, error ε, dan update bobot data',
      content: html`
        <div style="font-size: var(--text-sm); color: var(--color-fg-secondary); line-height: var(--leading-relaxed);">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-3); margin-bottom: var(--space-4);">
            <div style="padding: var(--space-3); background: var(--color-bg-secondary); border-radius: var(--radius-lg); text-align: center;">
              <div style="font-size: var(--text-xl); font-weight: var(--font-weight-bold); color: var(--color-brand-primary);" id="ada-error">0.00</div>
              <div style="font-size: var(--text-xs); color: var(--color-fg-muted);">Error Rate (ε)</div>
            </div>
            <div style="padding: var(--space-3); background: var(--color-bg-secondary); border-radius: var(--radius-lg); text-align: center;">
              <div style="font-size: var(--text-xl); font-weight: var(--font-weight-bold); color: var(--color-brand-primary);" id="ada-alpha">0.00</div>
              <div style="font-size: var(--text-xs); color: var(--color-fg-muted);">Bobot Learner (α)</div>
            </div>
          </div>
          <p style="margin-bottom: var(--space-3);"><strong>Rumus:</strong></p>
          <div style="background: var(--color-bg-inverse); color: var(--color-fg-inverse); padding: var(--space-3); border-radius: var(--radius-md); font-family: var(--font-mono); font-size: var(--text-sm); overflow-x: auto;">
            ε = Σ wᵢ · I(h(xᵢ) ≠ yᵢ) / Σ wᵢ<br>
            α = ½ ln((1-ε)/ε)<br>
            wᵢ ← wᵢ · exp(-α · yᵢ · h(xᵢ))  (lalu normalize)
          </div>
        </div>
      `,
    });

    (this.#moduleLayout as any).addPanel({
      title: 'Teori: AdaBoost',
      description: 'Adaptive Boosting concept',
      content: html`
        <div style="font-size: var(--text-sm); color: var(--color-fg-secondary); line-height: var(--leading-relaxed);">
          <h4 style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-2); color: var(--color-fg-primary);">Intuisi:</h4>
          <p style="margin-bottom: var(--space-4);">AdaBoost melatih weak learner berurutan. Setiap learner baru fokus pada kesalahan learner sebelumnya dengan menaikkan bobot data yang salah diklasifikasikan.</p>
          <h4 style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-2); color: var(--color-fg-primary);">Langkah-langkah:</h4>
          <ol style="margin-left: var(--space-6); margin-bottom: var(--space-4);">
            <li style="margin-bottom: var(--space-2;">Inisialisasi bobot wᵢ = 1/n untuk semua data</li>
            <li style="margin-bottom: var(--space-2;">Untuk t = 1 to T:</li>
            <li style="margin-bottom: var(--space-1); margin-left: var(--space-4);">Latih weak learner hₜ dengan bobot w</li>
            <li style="margin-bottom: var(--space-1); margin-left: var(--space-4);">Hitung error εₜ</li>
            <li style="margin-bottom: var(--space-1); margin-left: var(--space-4);">Hitung αₜ = ½ ln((1-εₜ)/εₜ)</li>
            <li style="margin-bottom: var(--space-1); margin-left: var(--space-4);">Update bobot: wᵢ ← wᵢ · exp(-αₜ · yᵢ · hₜ(xᵢ))</li>
            <li style="margin-bottom: var(--space-1); margin-left: var(--space-4);">Normalisasi bobot</li>
            <li style="margin-bottom: var(--space-2;">Final ensemble: H(x) = sign(Σ αₜ · hₜ(x))</li>
          </ol>
          <p><strong>Keunggulan:</strong> Otomatis fokus pada data sulit, jarang overfitting jika weak learner sederhana.</p>
        </div>
      `,
    });
  }
}

customElements.define('ml-adaboost-page', MlAdaBoostPage);

declare global {
  interface HTMLElementTagNameMap {
    'ml-adaboost-page': MlAdaBoostPage;
  }
}