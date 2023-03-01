import { Control, ControlElement, customElements, GridLayout, Module } from "@ijstech/components";
import { IPageElement } from "./interface";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['sc-page-viewer-section']: SectionElement;
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
  private pnlSection: GridLayout;
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
    this.width = '100%';
    this.padding = {left: '3rem', right: '3rem'};
    for (const pageElm of listPageElm) {
      const { column, columnSpan } = pageElm;
      const pageElement = (<sc-page-viewer-page-element></sc-page-viewer-page-element>) as any;
      pageElement.grid = { column, columnSpan };
      pageElement.style.gridRow = '1';
      this.pnlSection.append(pageElement);
      await pageElement.setData(pageElm);
    }
  }

  render() {
    return (
      <i-grid-layout
        id="pnlSection"
        width="100%"
        height="100%"
        maxWidth="100%"
        maxHeight="100%"
        position="relative"
        gap={{column: 15}}
        columnsPerRow={12}
        padding={{top: '1.5rem', bottom: '1.5rem'}}
    ></i-grid-layout>
    )
  }
}