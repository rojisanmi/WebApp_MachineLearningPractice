/**
 * DOM Utilities — Safe, typed helpers for common DOM operations
 */

/**
 * Tagged template literal for creating HTML strings with auto-escaping
 * Usage: html`<div class=${cls}>${content}</div>`
 */
export function html(strings: TemplateStringsArray, ...values: unknown[]): string {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      const value = values[i];
      if (value == null) {
        result += '';
      } else if (Array.isArray(value)) {
        result += value.map(v => String(v)).join('');
      } else if (typeof value === 'object') {
        // Assume it's a trusted HTML string from another html`` call
        result += String(value);
      } else {
        result += escapeHtml(String(value));
      }
    }
  }
  return result;
}

/** Escape HTML special characters */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}

/** Create element from HTML string */
export function createElement(htmlString: string): HTMLElement {
  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();
  return template.content.firstElementChild as HTMLElement;
}

/** Create multiple elements from HTML string */
export function createElements(htmlString: string): HTMLElement[] {
  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();
  return Array.from(template.content.children) as HTMLElement[];
}

/** Safe querySelector with type narrowing */
export function query<T extends Element>(selector: string, parent: ParentNode = document): T | null {
  return parent.querySelector<T>(selector);
}

/** Safe querySelectorAll with type narrowing */
export function queryAll<T extends Element>(selector: string, parent: ParentNode = document): T[] {
  return Array.from(parent.querySelectorAll<T>(selector));
}

/** Get element by ID with type narrowing */
export function byId<T extends HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

/** Add event listener with automatic cleanup */
export function on<K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  type: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void,
  options?: AddEventListenerOptions
): () => void {
  element.addEventListener(type, listener, options);
  return () => element.removeEventListener(type, listener, options);
}

/** Delegate event to children matching selector */
export function delegate<K extends keyof HTMLElementEventMap>(
  parent: HTMLElement,
  selector: string,
  type: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K], target: HTMLElement) => void,
  options?: AddEventListenerOptions
): () => void {
  const handler = (ev: Event) => {
    const target = ev.target as HTMLElement;
    const match = target.closest(selector);
    if (match && parent.contains(match)) {
      listener.call(match, ev as HTMLElementEventMap[K], match);
    }
  };
  parent.addEventListener(type, handler, options);
  return () => parent.removeEventListener(type, handler, options);
}

/** Dispatch custom event with detail */
export function dispatch<T>(element: HTMLElement, type: string, detail: T): boolean {
  return element.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
}

/** Wait for next animation frame */
export function nextFrame(): Promise<number> {
  return new Promise(resolve => requestAnimationFrame(resolve));
}

/** Wait for multiple animation frames */
export function waitFrames(count: number): Promise<void> {
  return new Promise(resolve => {
    let frames = 0;
    function tick() {
      frames++;
      if (frames >= count) {
        resolve();
      } else {
        requestAnimationFrame(tick);
      }
    }
    requestAnimationFrame(tick);
  });
}

/** Check if element is visible in viewport */
export function isInViewport(element: HTMLElement, threshold = 0): boolean {
  const rect = element.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const vw = window.innerWidth || document.documentElement.clientWidth;
  return (
    rect.bottom >= threshold &&
    rect.right >= threshold &&
    rect.top <= vh - threshold &&
    rect.left <= vw - threshold
  );
}

/** Get element's computed style value as number (pixels) */
export function getStyleValue(element: HTMLElement, property: string): number {
  const value = getComputedStyle(element).getPropertyValue(property);
  return parseFloat(value) || 0;
}

/** Set CSS custom property on element */
export function setCssVar(element: HTMLElement, name: string, value: string | number): void {
  element.style.setProperty(name, String(value));
}

/** Get CSS custom property from element (or inherited) */
export function getCssVar(element: HTMLElement, name: string): string {
  return getComputedStyle(element).getPropertyValue(name).trim();
}

/** Toggle class with optional force */
export function toggleClass(element: HTMLElement, className: string, force?: boolean): boolean {
  return element.classList.toggle(className, force);
}

/** Add multiple classes */
export function addClasses(element: HTMLElement, ...classes: string[]): void {
  element.classList.add(...classes);
}

/** Remove multiple classes */
export function removeClasses(element: HTMLElement, ...classes: string[]): void {
  element.classList.remove(...classes);
}

/** Check if element has any of the classes */
export function hasAnyClass(element: HTMLElement, ...classes: string[]): boolean {
  return classes.some(cls => element.classList.contains(cls));
}

/** Get all focusable children */
export function getFocusableChildren(container: HTMLElement): HTMLElement[] {
  const selector = [
    'button:not([disabled])',
    'a[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(', ');
  return Array.from(container.querySelectorAll<HTMLElement>(selector));
}

/** Trap focus within container */
export function trapFocus(container: HTMLElement): () => void {
  const focusable = getFocusableChildren(container);
  if (focusable.length === 0) return () => {};

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  const handleTab = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  container.addEventListener('keydown', handleTab);
  first.focus();

  return () => container.removeEventListener('keydown', handleTab);
}

/** Create a stylesheet for Shadow DOM */
export function createStyleSheet(css: string): CSSStyleSheet {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);
  return sheet;
}

/** Adopt stylesheet in Shadow Root */
export function adoptStyleSheet(shadowRoot: ShadowRoot, sheet: CSSStyleSheet): void {
  shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, sheet];
}