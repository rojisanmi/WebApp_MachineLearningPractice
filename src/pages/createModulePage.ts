/**
 * Placeholder Page Component Factory
 * Generates a basic module page structure
 */

import { html } from '../../core/utils/dom.ts';

interface ModulePageConfig {
  tag: string;
  title: string;
  description: string;
  meta: string;
  icon: string;
  navItems: Array<{ href: string; label: string; icon?: string; section?: string }>;
}

export function createModulePage(config: ModulePageConfig): string {
  const className = config.tag.replace('ml-', '').replace(/-page$/, '').replace(/-/g, '');
  const pascalName = className.charAt(0).toUpperCase() + className.slice(1);

  return `/**
 * ${config.title} Page
 */

import { html } from '../../../core/utils/dom.ts';

const template = document.createElement('template');
template.innerHTML = \`
  <ml-page-shell>
    <ml-module-layout slot="topbar"></ml-module-layout>
  </ml-page-shell>
\`;

export class ${pascalName}Page extends HTMLElement {
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

    // Set navigation
    const navItems = ${JSON.stringify(config.navItems, null, 2)};
    (this.#moduleLayout as any).setNavigation(navItems);

    // Set header
    (this.#moduleLayout as any).setHeader(
      '${config.meta}',
      '${config.title}',
      '${config.description}'
    );

    // Set canvas aspect ratio
    (this.#moduleLayout as any).setCanvasAspectRatio(1);

    // Add placeholder panels
    (this.#moduleLayout as any).addPanel({
      title: 'Kontrol',
      description: 'Parameter dan aksi utama',
      content: \`
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          <ml-button variant="primary" style="width: 100%;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            Jalankan Simulasi
          </ml-button>
          <ml-button variant="secondary" style="width: 100%;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M17 1v4M17 21v-4M1 17h4M21 17h-4"></path></svg>
            Reset
          </ml-button>
          <ml-button variant="ghost" style="width: 100%;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
            Export PNG
          </ml-button>
        </div>
      \`
    });

    (this.#moduleLayout as any).addPanel({
      title: 'Teori Singkat',
      description: 'Konsep kunci untuk referensi cepat',
      content: \`
        <div style="font-size: var(--text-sm); color: var(--color-fg-secondary); line-height: var(--leading-relaxed);">
          <p><strong>${config.title}</strong> adalah ${config.description.toLowerCase()}.</p>
          <p>Panel ini akan berisi penjelasan teori, rumus, dan referensi visual yang relevan.</p>
        </div>
      \`
    });

    (this.#moduleLayout as any).addPanel({
      title: 'Perhitungan',
      description: 'Step-by-step calculation (jika tersedia)',
      content: \`
        <div style="font-size: var(--text-sm); color: var(--color-fg-muted); text-align: center; padding: var(--space-8);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto var(--space-4); opacity: 0.5;" aria-hidden="true">
            <path d="M9 11l3 3L22 4"></path>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
          <p>Panel perhitungan akan muncul di sini saat simulasi berjalan.</p>
        </div>
      \`
    });

    (this.#moduleLayout as any).addPanel({
      title: 'Metrik',
      description: 'Evaluasi real-time',
      content: \`
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-3);">
          <div style="padding: var(--space-3); background: var(--color-bg-secondary); border-radius: var(--radius-lg); text-align: center;">
            <div style="font-size: var(--text-2xl); font-weight: var(--font-weight-bold); color: var(--color-brand-primary);">0</div>
            <div style="font-size: var(--text-xs); color: var(--color-fg-muted);">Iterasi</div>
          </div>
          <div style="padding: var(--space-3); background: var(--color-bg-secondary); border-radius: var(--radius-lg); text-align: center;">
            <div style="font-size: var(--text-2xl); font-weight: var(--font-weight-bold); color: var(--color-brand-primary);">0</div>
            <div style="font-size: var(--text-xs); color: var(--color-fg-muted);">Cluster</div>
          </div>
          <div style="padding: var(--space-3); background: var(--color-bg-secondary); border-radius: var(--radius-lg); text-align: center;">
            <div style="font-size: var(--text-2xl); font-weight: var(--font-weight-bold); color: var(--color-brand-primary);">0.00</div>
            <div style="font-size: var(--text-xs); color: var(--color-fg-muted);">SSE</div>
          </div>
          <div style="padding: var(--space-3); background: var(--color-bg-secondary); border-radius: var(--radius-lg); text-align: center;">
            <div style="font-size: var(--text-2xl); font-weight: var(--font-weight-bold); color: var(--color-brand-primary);">0.00</div>
            <div style="font-size: var(--text-xs); color: var(--color-fg-muted);">Silhouette</div>
          </div>
        </div>
      \`
    });
  }
}

customElements.define('${config.tag}', ${pascalName}Page);

declare global {
  interface HTMLElementTagNameMap {
    '${config.tag}': ${pascalName}Page;
  }
}
`;
}

// Export factory for use in build script
export { createModulePage };