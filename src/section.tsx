import { ControlElement, customElements, Module, Panel } from "@ijstech/components";
import { IPageElement } from "./interface";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['scpage-viewer-section']: SectionElement;
    }
  }
}

interface SectionElement extends ControlElement {
  containerSize?: {
    width?: string;
    height?: string;
  }
}

@customElements('sc-page-viewer-section')
export class ViewrSection extends Module {
  private pnlSection: Panel;
  private _size: {
    width?: string;
    height?: string;
  }

  get size() {
    return this._size || {};
  }

  set size(value: { width?: string; height?: string }) {
    this._size = value;
    this.updateContainerSize();
  }

  clear() {
    this.pnlSection.clearInnerHTML();
  }

  async init() {
    super.init();
    this.size = this.getAttribute('containerSize', true, {});
  }

  updateContainerSize() {
    const sizeWidth = this.size.width || 'none';
    const sizeHeight = this.size.height || 'none';
    if (this.pnlSection) {
      this.pnlSection.maxWidth = sizeWidth;
      this.pnlSection.maxHeight = sizeHeight;
    }
  }

  async setData(listPageElm: IPageElement[]) {
    for (const pageElm of listPageElm) {
      const pageElement = (<scpage-viewer-page-element></scpage-viewer-page-element>);
      this.pnlSection.append(pageElement);
      await pageElement.setData(pageElm);
    }
  }

  render() {
    return (
      <i-panel id="pnlSection"></i-panel>
    )
  }
}