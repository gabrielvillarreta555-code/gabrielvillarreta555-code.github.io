import { EXPRESSIONS } from './blue-state.mjs';

/** Personaje visual. La herramienta anfitriona decide cuándo cambia cada estado. */
export class BlueCharacter extends HTMLElement {
  static observedAttributes = ['expression', 'asset', 'success'];

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = new URL('./blue-character.css', import.meta.url).href;
    const figure = document.createElement('div');
    figure.className = 'character';
    figure.setAttribute('aria-hidden', 'true');
    figure.innerHTML = `<div class="aura"></div><div class="face-window"><div class="face"></div></div>
      <svg class="glasses" viewBox="0 0 120 42" fill="none" aria-hidden="true"><defs><linearGradient id="blue-lens" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d1f5ff" stop-opacity=".4"/><stop offset="1" stop-color="#157cff" stop-opacity=".12"/></linearGradient></defs><rect x="3" y="5" width="48" height="31" rx="12" fill="url(#blue-lens)" stroke="#8deaff" stroke-width="3"/><rect x="69" y="5" width="48" height="31" rx="12" fill="url(#blue-lens)" stroke="#8deaff" stroke-width="3"/><path d="M51 17c5-5 13-5 18 0M0 13h3m114 0h3" stroke="#b5f3ff" stroke-width="3" stroke-linecap="round"/><circle class="lens-glint one" cx="18" cy="15" r="3" fill="#fff"/><circle class="lens-glint two" cx="84" cy="15" r="3" fill="#fff"/></svg>
      <div class="success" aria-hidden="true">✓</div>`;
    root.append(style, figure);
  }

  connectedCallback() { this.updateVisual(); }
  attributeChangedCallback() { if (this.isConnected) this.updateVisual(); }
  updateVisual() {
    const requested = this.getAttribute('expression') || 'normal';
    const expression = EXPRESSIONS.includes(requested) ? requested : 'normal';
    this.shadowRoot.querySelector('.character').dataset.expression = expression;
    this.shadowRoot.querySelector('.character').dataset.success = String(this.hasAttribute('success'));
    const asset = this.getAttribute('asset') || new URL('../../img/blue-referencia.jpg', import.meta.url).href;
    this.shadowRoot.querySelector('.face').style.backgroundImage = `url(${JSON.stringify(asset)})`;
    this.setAttribute('role', 'img');
    this.setAttribute('aria-label', `Blue, expresión ${expression}`);
  }
}
if (!customElements.get('blue-character')) customElements.define('blue-character', BlueCharacter);
