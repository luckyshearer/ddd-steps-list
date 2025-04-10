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
      }

      .circle {
        position: absolute;
        left: 0;
        top: 0;
        width: var(--ddd-icon-size-xl, 50px);
        height: var(--ddd-icon-size-xl, 50px);
        border-radius: 50%;
        background-color: var(--ddd-primary, #1E407C);
        color: var(--ddd-theme-default-white, #fff);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      }

      .line {
        position: absolute;
        top: calc(var(--ddd-icon-size-xl, 50px));
        left: calc(var(--ddd-icon-size-xl, 50px) - 25px);
        width: 0;
        height: calc(100% + var(--ddd-spacing-4, 20px));
        border-left: 1px dashed var(--ddd-theme-default-slateGray, #ccc);
      }

      :last-of-type .line {
        display: none;
      }

      h1{
        font-size: var(--ddd-font-size-xl, 24px);
        font-weight: bold;
      }


      h3 {
        margin-top: var(--ddd-spacing-2, 8px);
        margin-bottom: var(--ddd-spacing-2, 8px);
        color: var(--ddd-primary, #1E407C);
        font-size: var(--ddd-font-size-l, 18px); 
      }

      p{
        line-height: 1.5;
        margin-bottom: var(--ddd-spacing-4, 10px);
        font-size: var(--ddd-font-size-m, 16px);
      }

      ul{
        padding-left: var(--ddd-spacing-4, 16px);
        color: var(--ddd-theme-default-slateGray, #ccc);
      }

      @media (max-width: 768px) {
        .circle {
          width: var(--ddd-icon-size-l, 40px);
          height: var(--ddd-icon-size-l, 40px);
        }
        .line {
          top: calc(var(--ddd-icon-size-l, 40px));
          height: calc(100% + var(--ddd-spacing-4, 8px));
        }
      }

      @media (max-width: 480px) {
        .line {
          display: none;
        }
      }

    `];
  }

  
  render() {
    return html`
    <div class="circle">${this.step}</div>
    <div class="step-content">
      ${this.title ? html`<h3>${this.title}</h3>` : ''}
      <slot></slot>
    </div>
    <div class="line"></div>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(DddStepsListItem.tag, DddStepsListItem);