/**
 * Copyright 2025 luckyshearer
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `ddd-steps-list-item`
 * 
 * @demo index.html
 * @element ddd-steps-list-item
 */
export class DddStepsListItem extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "ddd-steps-list-item";
  }

  constructor() {
    super();
    this.step = 0;
    this.title = "";

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
      title: { type: String, reflect: true }
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        position: relative;
        margin-bottom: var(--ddd-spacing-4, 20px);
        padding-left: var(--ddd-spacing-16, 60px);
        color: var(--ddd-theme-default-text, #000);
        font-family: var(--ddd-font-primary, sans-serif);
      }

      /* :host(:last-child) {
        margin-bottom: 0;
      } */

      .circle {
        position: absolute;
        left: 0;
        top: 0;
        width: var(--ddd-icon-size-xl, 50px);
        height: var(--ddd-icon-size-xl, 50px);
        border-radius: 50%;
        background-color: var(--ddd-theme-default-beaverBlue, #1E407C);
        color: var(--ddd-theme-default-white, #fff);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: var(--ddd-font-weight-bold, bold);
        font-size: var(--ddd-font-size-m, 18px);
      }

      /* .step-content{
        flex: 1;
        padding-top: var(--ddd-spacing-1, 4px);
      } */

      h3 {
        margin-top: 0;
        margin-bottom: var(--ddd-spacing-2, 8px);
        color: var(--ddd-theme-default-beaverBlue, #1E407C);
        font-size: var(--ddd-font-size-1, 1.25rem);
      }

      /* ul{
        padding-left: var(--ddd-spacing-5, 20px);
        margin-top: var(--ddd-spacing-2, 8px);
        margin-bottom: var(--ddd-spacing-2, 8px);
      }

      li{
        margin-bottom: var(--ddd-spacing-1, 4px);
      }

      :host([ddd-primary]) .circle {
        background-color: var(--ddd-primary-color, #1E407C);
      }

      :host([ddd-primary]) h3 {
        color: var(--ddd-primary-color, #1E407C);
      } */

    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <div class="circle">${this.step}</div>
    <div class="step-content">
      ${this.title ? html`<h3>${this.title}</h3>` : ''}
      <slot></slot>
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