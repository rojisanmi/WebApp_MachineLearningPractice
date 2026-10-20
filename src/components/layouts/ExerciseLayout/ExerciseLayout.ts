/**
 * ExerciseLayout — Layout for structured exercises
 * Progress header, question content, sidebar with question list
 */

import { html } from '../../core/utils/dom.ts';
import { createStyleSheet } from '../../core/utils/dom.ts';

const styleSheet = createStyleSheet(`
  :host {
    display: block;
  }

  .exercise-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  @media (min-width: 1024px) {
    .exercise-layout {
      grid-template-columns: 1fr 320px;
    }
  }

  /* Progress Header */
  .exercise-header {
    position: sticky;
    top: calc(var(--space-6) + 60px);
    z-index: var(--z-sticky);
    background: var(--color-bg-primary);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-xl);
    padding: var(--space-4) var(--space-6);
    box-shadow: var(--shadow-sm);
  }

  @media (min-width: 1024px) {
    .exercise-header {
      grid-column: 1 / -1;
    }
  }

  .exercise-header__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    margin-bottom: var(--space-4);
    flex-wrap: wrap;
  }

  .exercise-header__title {
    font-size: var(--text-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-fg-primary);
  }

  .exercise-header__deadline {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    font-weight: var(--font-weight-medium);
  }

  .exercise-header__deadline--normal {
    background: var(--color-status-success-subtle);
    color: var(--color-status-success);
  }

  .exercise-header__deadline--warning {
    background: var(--color-status-warning-subtle);
    color: var(--color-status-warning);
  }

  .exercise-header__deadline--danger {
    background: var(--color-status-danger-subtle);
    color: var(--color-status-danger);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  .exercise-progress {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  .exercise-progress__bar {
    flex: 1;
    height: 8px;
    background: var(--color-bg-tertiary);
    border-radius: var(--radius-full);
    overflow: hidden;
  }

  .exercise-progress__fill {
    height: 100%;
    background: var(--color-brand-primary);
    border-radius: var(--radius-full);
    transition: width var(--duration-slow) var(--ease-out);
  }

  .exercise-progress__text {
    font-size: var(--text-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-brand-primary);
    min-width: 5ch;
    text-align: right;
  }

  /* Main Content */
  .exercise-main {
    min-width: 0;
  }

  .question-card {
    background: var(--color-bg-primary);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
    box-shadow: var(--shadow-sm);
  }

  .question-card__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
    flex-wrap: wrap;
  }

  .question-card__number {
    font-size: var(--text-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-brand-primary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .question-card__title {
    font-size: var(--text-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-fg-primary);
  }

  .question-card__status {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: var(--font-weight-semibold);
    flex-shrink: 0;
  }

  .question-card__status--pending {
    background: var(--color-bg-tertiary);
    color: var(--color-fg-muted);
  }

  .question-card__status--active {
    background: var(--color-brand-primary-subtle);
    color: var(--color-brand-primary);
  }

  .question-card__status--completed {
    background: var(--color-status-success-subtle);
    color: var(--color-status-success);
  }

  .question-card__instruction {
    font-size: var(--text-base);
    color: var(--color-fg-secondary);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-6);
    padding: var(--space-4);
    background: var(--color-bg-secondary);
    border-radius: var(--radius-lg);
    border-left: 4px solid var(--color-brand-primary);
  }

  .question-card__workspace {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
    margin-bottom: var(--space-6);
  }

  @media (min-width: 768px) {
    .question-card__workspace {
      grid-template-columns: 1fr 1fr;
    }
  }

  .question-card__canvas-area {
    min-width: 0;
  }

  .question-card__input-area {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .question-card__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    padding-top: var(--space-4);
    border-top: 1px solid var(--color-border-default);
  }

  /* Sidebar - Question List */
  .exercise-sidebar {
    position: sticky;
    top: calc(var(--space-6) + 60px + 140px); /* header + progress */
    height: fit-content;
    max-height: calc(100vh - var(--space-6) - 200px);
    overflow-y: auto;
  }

  .question-list {
    background: var(--color-bg-primary);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-xl);
    padding: var(--space-4);
    box-shadow: var(--shadow-sm);
  }

  .question-list__title {
    font-size: var(--text-sm);
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-fg-muted);
    margin-bottom: var(--space-3);
    padding-bottom: var(--space-3);
    border-bottom: 1px solid var(--color-border-default);
  }

  .question-list__item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: background var(--transition-fast);
    margin-bottom: var(--space-1);
  }

  .question-list__item:hover {
    background: var(--color-bg-tertiary);
  }

  .question-list__item--active {
    background: var(--color-brand-primary-subtle);
  }

  .question-list__item--completed .question-list__icon {
    background: var(--color-status-success);
    color: var(--color-fg-on-brand);
  }

  .question-list__item--active .question-list__icon {
    background: var(--color-brand-primary);
    color: var(--color-fg-on-brand);
  }

  .question-list__icon {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    background: var(--color-bg-tertiary);
    color: var(--color-fg-muted);
    font-size: var(--text-sm);
    font-weight: var(--font-weight-bold);
    flex-shrink: 0;
  }

  .question-list__info {
    flex: 1;
    min-width: 0;
  }

  .question-list__label {
    font-size: var(--text-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-fg-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .question-list__meta {
    font-size: var(--text-xs);
    color: var(--color-fg-muted);
  }
`);

const template = document.createElement('template');
template.innerHTML = `
  <div class="exercise-layout">
    <header class="exercise-header" id="exercise-header">
      <div class="exercise-header__top">
        <h1 class="exercise-header__title" id="exercise-title"></h1>
        <div class="exercise-header__deadline exercise-header__deadline--normal" id="exercise-deadline">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span id="deadline-text">Memuat...</span>
        </div>
      </div>
      <div class="exercise-progress">
        <div class="exercise-progress__bar">
          <div class="exercise-progress__fill" id="progress-fill" style="width: 0%"></div>
        </div>
        <span class="exercise-progress__text" id="progress-text">0%</span>
      </div>
    </header>

    <main class="exercise-main" id="exercise-main">
      <!-- Question card injected here -->
    </main>

    <aside class="exercise-sidebar" aria-label="Daftar soal">
      <div class="question-list" id="question-list">
        <h2 class="question-list__title">Daftar Soal</h2>
        <div id="question-items"></div>
      </div>
    </aside>
  </div>
`;

interface ExerciseConfig {
  id: string;
  title: string;
  deadline?: Date;
  questions: Array<{
    id: string;
    number: number;
    title: string;
    instruction: string;
    canvasComponent?: string; // web component tag
    inputComponent?: string;
    status: 'pending' | 'active' | 'completed';
  }>;
}

export class MlExerciseLayout extends HTMLElement {
  #config: ExerciseConfig | null = null;
  #currentQuestionIndex = 0;

  #exerciseTitle: HTMLElement | null = null;
  #deadlineEl: HTMLElement | null = null;
  #deadlineText: HTMLElement | null = null;
  #progressFill: HTMLElement | null = null;
  #progressText: HTMLElement | null = null;
  #exerciseMain: HTMLElement | null = null;
  #questionItems: HTMLElement | null = null;

  #deadlineInterval: number | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.adoptedStyleSheets = [styleSheet];
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.#exerciseTitle = this.shadowRoot!.getElementById('exercise-title')!;
    this.#deadlineEl = this.shadowRoot!.getElementById('exercise-deadline')!;
    this.#deadlineText = this.shadowRoot!.getElementById('deadline-text')!;
    this.#progressFill = this.shadowRoot!.getElementById('progress-fill')!;
    this.#progressText = this.shadowRoot!.getElementById('progress-text')!;
    this.#exerciseMain = this.shadowRoot!.getElementById('exercise-main')!;
    this.#questionItems = this.shadowRoot!.getElementById('question-items')!;
  }

  /** Set exercise configuration */
  setConfig(config: ExerciseConfig): void {
    this.#config = config;
    this.#currentQuestionIndex = config.questions.findIndex(q => q.status === 'active') ?? 0;
    this.#render();
    this.#startDeadlineTimer();
  }

  #render(): void {
    if (!this.#config) return;

    // Header
    this.#exerciseTitle!.textContent = this.#config.title;
    this.#updateDeadline();

    // Progress
    const completed = this.#config.questions.filter(q => q.status === 'completed').length;
    const progress = Math.round((completed / this.#config.questions.length) * 100);
    this.#progressFill!.style.width = `${progress}%`;
    this.#progressText!.textContent = `${progress}%`;

    // Question list
    this.#questionItems!.innerHTML = this.#config.questions.map((q, i) => html`
      <button
        class="question-list__item ${q.status === 'completed' ? 'question-list__item--completed' : ''} ${i === this.#currentQuestionIndex ? 'question-list__item--active' : ''}"
        data-index="${i}"
        aria-current="${i === this.#currentQuestionIndex ? 'true' : 'false'}"
      >
        <span class="question-list__icon">${q.number}</span>
        <div class="question-list__info">
          <div class="question-list__label">${q.title}</div>
          <div class="question-list__meta">
            ${q.status === 'completed' ? '✓ Selesai' : q.status === 'active' ? '▸ Sedang dikerjakan' : 'Belum dimulai'}
          </div>
        </div>
      </button>
    `).join('');

    // Bind click events
    this.#questionItems!.querySelectorAll('button').forEach((btn, i) => {
      btn.addEventListener('click', () => this.#goToQuestion(i));
    });

    // Render current question
    this.#renderQuestion(this.#currentQuestionIndex);
  }

  #renderQuestion(index: number): void {
    if (!this.#config || !this.#exerciseMain) return;
    const q = this.#config.questions[index];

    this.#exerciseMain.innerHTML = html`
      <article class="question-card">
        <header class="question-card__header">
          <div>
            <p class="question-card__number">Soal ${q.number}</p>
            <h2 class="question-card__title">${q.title}</h2>
          </div>
          <span class="question-card__status question-card__status--${q.status}">
            ${q.status === 'completed' ? '✓ Selesai' : q.status === 'active' ? '▸ Aktif' : '⏳ Belum dimulai'}
          </span>
        </header>

        <div class="question-card__instruction">${q.instruction}</div>

        <div class="question-card__workspace">
          <div class="question-card__canvas-area">
            ${q.canvasComponent ? html`<${q.canvasComponent}></${q.canvasComponent}>` : '<div class="canvas-wrapper" style="aspect-ratio: 1; background: var(--color-bg-secondary);"></div>'}
          </div>
          <div class="question-card__input-area">
            ${q.inputComponent ? html`<${q.inputComponent}></${q.inputComponent}>` : '<div style="padding: var(--space-4); background: var(--color-bg-secondary); border-radius: var(--radius-lg); color: var(--color-fg-muted);">Panel input jawaban akan di sini</div>'}
          </div>
        </div>

        <div class="question-card__actions">
          <ml-button variant="secondary" @click=${() => this.#checkAnswer()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Cek Jawaban
          </ml-button>
          <ml-button variant="ghost" @click=${() => this.#showHint()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            Petunjuk
          </ml-button>
          <ml-button variant="ghost" @click=${() => this.#saveDraft()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            Simpan Draft
          </ml-button>
        </div>
      </article>
    `;

    // Update question list active state
    this.#questionItems!.querySelectorAll('button').forEach((btn, i) => {
      btn.classList.toggle('question-list__item--active', i === index);
      btn.setAttribute('aria-current', i === index ? 'true' : 'false');
    });
  }

  #goToQuestion(index: number): void {
    this.#currentQuestionIndex = index;
    this.#renderQuestion(index);
  }

  #checkAnswer(): void {
    // TODO: Implement answer checking
    console.log('Check answer for question', this.#currentQuestionIndex);
    // Mark as completed, update progress, etc.
  }

  #showHint(): void {
    // TODO: Show hint modal
    console.log('Show hint for question', this.#currentQuestionIndex);
  }

  #saveDraft(): void {
    // TODO: Save draft to localStorage
    console.log('Save draft for question', this.#currentQuestionIndex);
  }

  #updateDeadline(): void {
    if (!this.#config?.deadline) {
      this.#deadlineText!.textContent = 'Tidak ada deadline';
      this.#deadlineEl!.className = 'exercise-header__deadline exercise-header__deadline--normal';
      return;
    }

    const now = new Date();
    const diff = this.#config.deadline.getTime() - now.getTime();

    if (diff <= 0) {
      this.#deadlineText!.textContent = 'Deadline telah lewat';
      this.#deadlineEl!.className = 'exercise-header__deadline exercise-header__deadline--danger';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    let text = '';
    if (days > 0) text += `${days} hari `;
    if (hours > 0) text += `${hours} jam `;
    text += `${minutes} menit`;

    this.#deadlineText!.textContent = text;

    if (diff < 1000 * 60 * 60) { // < 1 hour
      this.#deadlineEl!.className = 'exercise-header__deadline exercise-header__deadline--danger';
    } else if (diff < 1000 * 60 * 60 * 24) { // < 1 day
      this.#deadlineEl!.className = 'exercise-header__deadline exercise-header__deadline--warning';
    } else {
      this.#deadlineEl!.className = 'exercise-header__deadline exercise-header__deadline--normal';
    }
  }

  #startDeadlineTimer(): void {
    this.#deadlineInterval = window.setInterval(() => this.#updateDeadline(), 30000); // every 30s
  }

  disconnectedCallback() {
    if (this.#deadlineInterval) {
      clearInterval(this.#deadlineInterval);
    }
  }
}

customElements.define('ml-exercise-layout', MlExerciseLayout);

declare global {
  interface HTMLElementTagNameMap {
    'ml-exercise-layout': MlExerciseLayout;
  }
}