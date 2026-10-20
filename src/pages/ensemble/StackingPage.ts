/**
 * Stacking Page — Placeholder
 */

import { html } from '../../core/utils/dom.ts';

const template = document.createElement('template');
template.innerHTML = `
  <ml-page-shell>
    <ml-module-layout slot="topbar"></ml-module-layout>
  </ml-page-shell>
`;

export class MlStackingPage extends HTMLElement {
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
      'Ensemble Learning / Stacking',
      'Stacking (Stacked Generalization)',
      'Kombinasikan multiple base models dengan meta-learner. Base models level-0 memprediksi, meta-model level-1 belajar kombinasi optimal prediksi mereka.'
    );

    (this.#moduleLayout as any).setCanvasAspectRatio(4 / 3);

    (this.#moduleLayout as any).setToolbar([
      { label: 'Latih Base Models', variant: 'primary', icon: '🔧', onClick: () => console.log('Train Base') },
      { label: 'Latih Meta-Model', variant: 'secondary', icon: '🧠', onClick: () => console.log('Train Meta') },
      { label: 'Evaluasi', variant: 'ghost', icon: '📊', onClick: () => console.log('Evaluate') },
    ]);

    (this.#moduleLayout as any).addPanel({
      title: 'Arsitektur Stacking',
      description: 'Konfigurasi level-0 dan level-1',
      content: html`
        <div style="font-size: var(--text-sm); color: var(--color-fg-secondary); line-height: var(--leading-relaxed);">
          <h4 style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-2); color: var(--color-fg-primary);">Level-0 (Base Models):</h4>
          <ul style="margin-left: var(--space-6); margin-bottom: var(--space-4);">
            <li style="margin-bottom: var(--space-1;">Logistic Regression</li>
            <li style="margin-bottom: var(--space-1;">Random Forest</li>
            <li style="margin-bottom: var(--space-1;">SVM (RBF Kernel)</li>
            <li style="margin-bottom: var(--space-1;">Gradient Boosting</li>
          </ul>
          <h4 style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-2); color: var(--color-fg-primary);">Level-1 (Meta-Learner):</h4>
          <ul style="margin-left: var(--space-6); margin-bottom: var(--space-4);">
            <li style="margin-bottom: var(--space-1;">Logistic Regression (default)</li>
            <li style="margin-bottom: var(--space-1;">Neural Network (optional)</li>
          </ul>
          <h4 style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-2); color: var(--color-fg-primary);">Cross-Validation:</h4>
          <p>Gunakan k-fold CV (default k=5) untuk generate out-of-fold predictions sebagai input meta-learner. Mencegah data leakage.</p>
        </div>
      `,
    });

    (this.#moduleLayout as any).addPanel({
      title: 'Code Example',
      description: 'Implementasi sederhana dengan scikit-learn',
      content: html`
        <pre style="font-size: var(--text-xs); line-height: var(--leading-relaxed);"><code>from sklearn.ensemble import StackingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.model_selection import cross_val_predict

# Base models
estimators = [
    ('lr', LogisticRegression()),
    ('rf', RandomForestClassifier(n_estimators=100)),
    ('svm', SVC(probability=True)),
]

# Stacking classifier
stack = StackingClassifier(
    estimators=estimators,
    final_estimator=LogisticRegression(),
    cv=5,  # k-fold untuk out-of-fold predictions
    n_jobs=-1
)

# Train
stack.fit(X_train, y_train)

# Predict
y_pred = stack.predict(X_test)
y_proba = stack.predict_proba(X_test)</code></pre>
      `,
    });
  }
}

customElements.define('ml-stacking-page', MlStackingPage);

declare global {
  interface HTMLElementTagNameMap {
    'ml-stacking-page': MlStackingPage;
  }
}