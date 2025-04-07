/**
 * Copyright 2025 luckyshearer
 * @license Apache-2.0, see LICENSE for full text.
 */
import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
// import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `ddd-steps-list-item`
 * 
 * @demo index.html
 * @element ddd-steps-list-item
 */
export class DddStepsListItems extends DDD {

  static get tag() {
    return "ddd-steps-list-item";
  }

  constructor() {
    super();
    this.step = 0;

    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/ddd-steps-list-item.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      step: { type: Number, reflect: true },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        margin-bottom: var(--ddd-spacing-4);
      }
      
      :host(:finalChild) {
        margin-bottom: 0;
      }

      .step {
        display: flex;
        gap: var(--ddd-spacing-2);
        align-items: flex-start;
      }

      .circle {
        width: var(--ddd-steps-list-item-circle-size, var(--ddd-icon-size-m));
        height: var(--ddd-steps-list-item-circle-size, var(--ddd-icon-size-m));
        border-radius: 50%;
        background-color: var(--ddd-theme-default-beaverBlue);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: var(--ddd-steps-list-item-circle-font-size, var(--ddd-font-size-m));
        margin-right: var(--ddd-spacing-2);
      }

      :host([ddd-primary]) .circle {
        background-color: var(--ddd-theme-default-beaverBlue);
        color: var(--ddd-theme-accent);
      }

      .step-content {
        flex: 1;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <div class="step">
      <div class="circle">${this.step}</div>
      <div class="step-content">
        <slot></slot>
      </div>
    </div>
    `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(DddStepsListItem.tag, DddStepsListItem);