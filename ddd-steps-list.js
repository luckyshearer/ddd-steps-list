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
    this.dddPrimary = false;

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
      dddPrimary: { type: Boolean, attribute: 'ddd-primary', reflect: true },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
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

  change() {
    this.validate();
  }

  validate() {
    const children = Array.from(this.children);
    let step = 0;
    children.forEach(child => {
      const tag = child.tagName.toLowerCase();
      if (tag !== DddStepsListItems.tag) {
        this.removeChild(child);
      } else {
        step++;
        child.step = step;
        if (this.dddPrimary) {
          child.setAttribute('ddd-primary', '');
        }else{
          child.removeAttribute('ddd-primary');
        }
      }
    }
    );
  }

  updated() {
    if (this.change.has('dddPrimary')) {
      const items = this.querySelectorAll(DddStepsListItems.tag);
      items.forEach(item => {
        if (this.dddPrimary) {
          item.dddPrimary = this.dddPrimary;
        } else {
          item.removeAttribute('ddd-primary');
        }
      });
  }
}

  // Lit render the HTML
  render() {
    return html`
    <slot></slot>
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