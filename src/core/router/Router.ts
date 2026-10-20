/**
 * Lightweight Router — Hash-based routing for static hosting (GitHub Pages)
 * Supports: /, /clustering, /clustering/kmeans, /exercises/ahc, etc.
 */

export interface Route {
  path: string;           // '/clustering/:module?'
  component: string;      // Web Component tag: 'ml-clustering-page'
  layout: string;         // 'ml-dashboard-layout' | 'ml-module-layout' | 'ml-exercise-layout'
  meta?: {
    title: string;
    description?: string;
    requiresAuth?: boolean;
  };
}

export interface RouteMatch {
  route: Route;
  params: Record<string, string>;
  path: string;
}

const routes: Route[] = [
  { path: '/', component: 'ml-dashboard-page', layout: 'ml-dashboard-layout', meta: { title: 'Dashboard — ML Lab' } },
  { path: '/clustering', component: 'ml-clustering-overview', layout: 'ml-module-layout', meta: { title: 'Clustering — ML Lab' } },
  { path: '/clustering/kmeans', component: 'ml-kmeans-page', layout: 'ml-module-layout', meta: { title: 'K-Means — ML Lab' } },
  { path: '/clustering/dbscan', component: 'ml-dbscan-page', layout: 'ml-module-layout', meta: { title: 'DBSCAN — ML Lab' } },
  { path: '/clustering/agglomerative', component: 'ml-agglomerative-page', layout: 'ml-module-layout', meta: { title: 'Agglomerative — ML Lab' } },
  { path: '/clustering/evaluation', component: 'ml-evaluation-page', layout: 'ml-module-layout', meta: { title: 'Evaluasi — ML Lab' } },
  { path: '/reinforcement/qlearning', component: 'ml-qlearning-page', layout: 'ml-module-layout', meta: { title: 'Q-Learning — ML Lab' } },
  { path: '/ensemble/adaboost', component: 'ml-adaboost-page', layout: 'ml-module-layout', meta: { title: 'AdaBoost — ML Lab' } },
  { path: '/ensemble/stacking', component: 'ml-stacking-page', layout: 'ml-module-layout', meta: { title: 'Stacking — ML Lab' } },
  { path: '/exercises', component: 'ml-exercises-page', layout: 'ml-exercise-layout', meta: { title: 'Latihan — ML Lab' } },
  { path: '/exercises/ahc', component: 'ml-ahc-exercise-page', layout: 'ml-exercise-layout', meta: { title: 'AHC Exercise — ML Lab' } },
  { path: '/exercises/kmeans', component: 'ml-kmeans-exercise-page', layout: 'ml-exercise-layout', meta: { title: 'K-Means Exercise — ML Lab' } },
];

/** Convert route path pattern to regex */
function pathToRegex(path: string): { regex: RegExp; paramNames: string[] } {
  const paramNames: string[] = [];
  const regexStr = path
    .replace(/\/:/g, '/(?<')  // named capture groups
    .replace(/\?/g, ')?')     // optional
    .replace(/\*/g, '.*')     // wildcard
    .replace(/\//g, '\\/');
  return {
    regex: new RegExp(`^${regexStr}$`),
    paramNames,
  };
}

/** Match path against routes */
export function matchRoute(pathname: string): RouteMatch | null {
  // Normalize: remove leading/trailing slashes, decode
  const normalized = pathname.replace(/^\/+/, '/').replace(/\/+$/, '') || '/';

  for (const route of routes) {
    const { regex, paramNames } = pathToRegex(route.path);
    const match = normalized.match(regex);
    if (match) {
      const params: Record<string, string> = {};
      if (match.groups) {
        Object.assign(params, match.groups);
      }
      return { route, params, path: normalized };
    }
  }
  return null;
}

/** Navigate to path */
export function navigate(path: string, replace = false): void {
  const hash = `#${path}`;
  if (replace) {
    history.replaceState(null, '', hash);
  } else {
    history.pushState(null, '', hash);
  }
  window.dispatchEvent(new HashChangeEvent('hashchange'));
}

/** Get current path from hash */
export function getCurrentPath(): string {
  const hash = location.hash.slice(1);
  return hash || '/';
}

/** Router class for SPA navigation */
export class Router {
  #currentMatch: RouteMatch | null = null;
  #listeners: Set<(match: RouteMatch | null) => void> = new Set();
  #notFoundHandler: (() => void) | null = null;

  constructor() {
    window.addEventListener('hashchange', this.#handleHashChange);
    window.addEventListener('popstate', this.#handleHashChange);
    // Initial match
    this.#handleHashChange();
  }

  #handleHashChange = (): void => {
    const match = matchRoute(getCurrentPath());
    this.#currentMatch = match;
    this.#listeners.forEach(listener => {
      try {
        listener(match);
      } catch (err) {
        console.error('[Router] Listener error:', err);
      }
    });

    if (!match && this.#notFoundHandler) {
      this.#notFoundHandler();
    }
  };

  /** Subscribe to route changes */
  subscribe(listener: (match: RouteMatch | null) => void): () => void {
    this.#listeners.add(listener);
    listener(this.#currentMatch); // Call immediately
    return () => this.#listeners.delete(listener);
  }

  /** Set 404 handler */
  setNotFoundHandler(handler: () => void): void {
    this.#notFoundHandler = handler;
  }

  /** Navigate programmatically */
  go(path: string, replace = false): void {
    navigate(path, replace);
  }

  /** Get current match */
  getCurrent(): RouteMatch | null {
    return this.#currentMatch;
  }

  /** Get all routes */
  getRoutes(): Route[] {
    return [...routes];
  }

  /** Destroy router */
  destroy(): void {
    window.removeEventListener('hashchange', this.#handleHashChange);
    window.removeEventListener('popstate', this.#handleHashChange);
    this.#listeners.clear();
  }
}

/** Singleton instance */
export const router = new Router();

/** Link component for declarative navigation */
const linkTemplate = document.createElement('template');
linkTemplate.innerHTML = `
  <style>
    :host {
      display: inline;
    }
    a {
      color: var(--color-brand-primary);
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: border-color var(--transition-fast);
    }
    a:hover {
      border-color: var(--color-brand-primary);
    }
    a:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
      border-radius: 2px;
    }
    a[aria-current="page"] {
      font-weight: var(--font-weight-semibold);
      border-color: var(--color-brand-primary);
      pointer-events: none;
    }
  </style>
  <a href="#/" aria-current="page"><slot></slot></a>
`;

export class MlLink extends HTMLElement {
  #anchor: HTMLAnchorElement | null = null;

  static observedAttributes = ['href', 'replace'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.appendChild(linkTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.#anchor = this.shadowRoot!.querySelector('a')!;
    this.#updateHref();
    this.#anchor.addEventListener('click', this.#handleClick);
  }

  disconnectedCallback() {
    this.#anchor?.removeEventListener('click', this.#handleClick);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'href' && oldValue !== newValue) {
      this.#updateHref();
    }
  }

  #updateHref(): void {
    if (!this.#anchor) return;
    const href = this.getAttribute('href') || '/';
    this.#anchor.href = `#${href}`;
    // Update aria-current
    const currentPath = getCurrentPath();
    this.#anchor.setAttribute('aria-current', currentPath === href ? 'page' : 'false');
  }

  #handleClick = (e: MouseEvent): void => {
    // Let browser handle normal navigation
    // But we can prevent default for special cases
    if (this.hasAttribute('replace')) {
      e.preventDefault();
      router.go(this.getAttribute('href') || '/', true);
    }
  };
}

customElements.define('ml-link', MlLink);

declare global {
  interface HTMLElementTagNameMap {
    'ml-link': MlLink;
  }
}