/**
 * Copyright 2025 luckyshearer
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `ddd-steps-list`
 * 
 * @demo index.html
 * @element ddd-steps-list
 */
export class DddStepsList extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "ddd-steps-list";
  }

  constructor() {
    super();
    this.circle = "";
    this.step = "";
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/ddd-steps-list.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      dddPrimary: { type: String, reflect: true },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: flew;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        gap: 2rem;
        padding: var(---ddd-spacing-4);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--ddd-steps-list-label-font-size, var(--ddd-font-size-s));
      }

      @media (min-width: 768px) {
        :host {
          flex-direction: column;
        }
      }

      /* border radius for  circle = 50% */
    `];
  }

  firstUpdated() {
    this.validate();
  }

  validate() {
    Array.from(this.children).forEach(child => {
      if (child.tagName !== 'DDD-STEPS-LIST-ITEM') child.remove();
    }
    );
    this.querySelectorAll('ddd-steps-list-item').forEach((child, index) => {
      item.step = index + 1;
      item.primary = this.dddPrimary;
    });
  }

  updated() {
    this.validate();
  }

  // Lit render the HTML
  render() {
    return html`
<!-- <div class="wrapper">
  <h3><span>${this.t.title}:</span> ${this.title}</h3> -->
  <slot></slot>
<!-- </div> -->
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

globalThis.customElements.define(DddStepsList.tag, DddStepsList);