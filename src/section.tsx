import { ControlElement, customElements, GridLayout, Module, Panel } from "@ijstech/components";
import { IColumnLayoutType, IPageElement } from "./interface";
import { getConfig } from "./store";
import { DEFAULT_MAX_COLUMN, GAP_WIDTH } from "./utils";

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

  init() {
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
    const { columnLayout } = getConfig();
    this.updateGridTemplateColumns();
    for (const pageElm of listPageElm) {
      const pageElement = (<sc-page-viewer-page-element></sc-page-viewer-page-element>) as any;
      if (columnLayout === IColumnLayoutType.FIXED) {
        const { column, columnSpan } = pageElm;
        pageElement.grid = { column, columnSpan };
        pageElement.style.gridRow = '1';
      }
      this.pnlSection.append(pageElement);
      await pageElement.setData(pageElm);
    }
  }

  private updateGridTemplateColumns() {
    let { columnLayout, columnsNumber, maxColumnsPerRow, columnMinWidth } = getConfig();
    if (columnLayout === IColumnLayoutType.FIXED) {
      const columnsPerRow = columnsNumber || DEFAULT_MAX_COLUMN;
      this.pnlSection.style.gridTemplateColumns = `repeat(${columnsPerRow}, 1fr)`;
    } else {
      let minWidth = typeof columnMinWidth === 'string' ? columnMinWidth : `${columnMinWidth}px`;
      if (columnMinWidth && maxColumnsPerRow) {
        let minmaxFirstParam = `max(${minWidth}, calc(100% / ${maxColumnsPerRow} - ${GAP_WIDTH}px))`;
        this.pnlSection.style.gridTemplateColumns = `repeat(auto-fill, minmax(${minmaxFirstParam}, 1fr))`;
      }
      else if (columnMinWidth) {
        this.pnlSection.style.gridTemplateColumns = `repeat(auto-fill, minmax(min(${minWidth}, 100%), 1fr))`;
      }
      else if (maxColumnsPerRow) {
        this.pnlSection.style.gridTemplateColumns = `repeat(${maxColumnsPerRow}, 1fr)`;
      } else {
        this.pnlSection.style.gridTemplateColumns = `repeat(${DEFAULT_MAX_COLUMN}, 1fr)`;
      }
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
        gap={{column: 15, row: 15}}
        padding={{top: '1.5rem', bottom: '1.5rem'}}
    ></i-grid-layout>
    )
  }
}