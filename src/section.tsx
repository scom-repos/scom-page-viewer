import { ControlElement, customElements, GridLayout, Module } from "@ijstech/components";
import { IColumnLayoutType, IConfigData, IPageSection } from "./interface";
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

  async setData(sectionData: IPageSection) {
    this.width = '100%';
    this.padding = {left: '3rem', right: '3rem'};
    const { elements = [], config = {} } = sectionData;
    const columnLayout = config?.columnLayout || IColumnLayoutType.AUTOMATIC;
    for (const pageElm of elements) {
      const pageElement = (<sc-page-viewer-page-element display="block"></sc-page-viewer-page-element>) as any;
      const { column, columnSpan } = pageElm;
      if (columnLayout !== IColumnLayoutType.AUTOMATIC) {
        pageElement.grid = { column, columnSpan };
        pageElement.style.gridRow = '1';
      }
      this.pnlSection.append(pageElement);
      await pageElement.setData(pageElm);
    }
    this.updateGridTemplateColumns(sectionData);
  }

  private updateGridTemplateColumns(sectionData: IPageSection) {
    const { elements = [], config = {} } = sectionData;
    let { columnLayout = IColumnLayoutType.AUTOMATIC, columnsNumber, maxColumnsPerRow, columnMinWidth } = config || {};
    if (columnLayout === IColumnLayoutType.AUTOMATIC) {
      let minWidth = '';
      if (columnMinWidth)
        minWidth = typeof columnMinWidth === 'string' ? columnMinWidth : `${columnMinWidth}px`;
      else {
        const bodyWidth = document.body.offsetWidth;
        minWidth = bodyWidth < 1024 ? `100%` : `calc((100% / ${elements.length}) - ${GAP_WIDTH}px)`;
      }

      let maxColumn = maxColumnsPerRow || elements.length || DEFAULT_MAX_COLUMN;
      let minmaxFirstParam = `max(${minWidth}, calc(100% / ${maxColumn} - ${GAP_WIDTH}px))`;
      this.pnlSection.style.gridTemplateColumns = `repeat(auto-fill, minmax(${minmaxFirstParam}, 1fr))`;
    } else {
      const columnsPerRow = columnsNumber || DEFAULT_MAX_COLUMN;
      this.pnlSection.style.gridTemplateColumns = `repeat(${columnsPerRow}, 1fr)`;
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