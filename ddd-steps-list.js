/**
 * Copyright 2025 luckyshearer
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import { DddStepsListItem } from "./ddd-steps-list-item.js";

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
    this.dddPrimary = "";

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
      dddPrimary: { type: String, attribute: 'ddd-primary'},
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        position: relative;
        padding: var(--ddd-spacing-4, 16px);
        font-family: var(--ddd-font-primary, sans-serif);
      }

      .steps-container {
        position: relative;
        padding-left: calc(var(--ddd-icon-size-xl, 50px) + var(--ddd-spacing-4, 16px));
      }

      

      @media (max-width: 768px){
        .steps-container {
          padding-left: calc(var(--ddd-icon-size-lg, 40px) + var(--ddd-spacing-4, 16px));
        }
      }

    `];
  }

  firstUpdated() {
    this.validate();
  }

  validate() {
    const children = Array.from(this.children);
    let step = 0;
    children.forEach((child) => {
      const tag = child.tagName.toLowerCase();
      if (tag !== DddStepsListItem.tag) {
        this.removeChild(child);
      } else {
        step++;
        child.step = step;
      }
    });
  }

  updated(changedProperties) {
    if (changedProperties.has("dddPrimary")) {
      const items = this.querySelectorAll(DddStepsListItem.tag);
      items.forEach((item) => {
        if (this.dddPrimary) {
          item.setAttribute ("ddd-primary", this.dddPrimary);
          item.style.setProperty('--ddd-primary', `#${this.dddPrimary}`);
        } else {
          item.removeAttribute("ddd-primary");
        }
      });
  }
}

  // Lit render the HTML
  render() {
    return html`
    <div class="steps-container">
    
    <slot @slotchange="${this.validate}"></slot>
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

globalThis.customElements.define(DddStepsList.tag, DddStepsList);