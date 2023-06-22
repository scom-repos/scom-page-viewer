import { Control, ControlElement, customElements, GridLayout, Module } from "@ijstech/components";
import { IConfigData, IPageElement, IPageSection } from "./interface";
import { GAP_WIDTH } from "./utils";

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
  private maxColumn: number = 1;
  private sectionData: IPageSection;

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
    this.sectionData = {...sectionData};
    for (const element of elements) {
      const pageElement = (
        <sc-page-viewer-page-element
          display="block"
        ></sc-page-viewer-page-element>
      ) as any;
      // const columnLayout = config?.columnLayout || IColumnLayoutType.AUTOMATIC;
      // if (columnLayout !== IColumnLayoutType.AUTOMATIC) {
      //   pageElement.grid = { column, columnSpan };
      //   pageElement.style.gridRow = '1';
      // }
      this.updateElementConfig(pageElement, element);
      this.pnlSection.append(pageElement);
      await pageElement.setData(element);
    }
    // this.updateGridTemplateColumns(sectionData);
    this.updateAlign(config);
  }

  private updateElementConfig(el: Control, data: IPageElement) {
    const { column, columnSpan } = data;
    el.grid = { column, columnSpan };
    el.style.gridRow = '1';
  }

  // private updateGridTemplateColumns(sectionData: IPageSection) {
  //   const { elements = [], config = {} } = sectionData;
  //   let { columnLayout = IColumnLayoutType.AUTOMATIC, columnsNumber, maxColumnsPerRow, columnMinWidth } = config || {};
  //   if (columnLayout === IColumnLayoutType.AUTOMATIC) {
  //     let minWidth = '';
  //     if (columnMinWidth)
  //       minWidth = typeof columnMinWidth === 'string' ? columnMinWidth : `${columnMinWidth}px`;
  //     else {
  //       const bodyWidth = document.body.offsetWidth;
  //       minWidth = bodyWidth < 1024 ? `100%` : `calc((100% / ${elements.length}) - ${GAP_WIDTH}px)`;
  //     }

  //     let maxColumn = maxColumnsPerRow || elements.length || DEFAULT_MAX_COLUMN;
  //     let minmaxFirstParam = `max(${minWidth}, calc(100% / ${maxColumn} - ${GAP_WIDTH}px))`;
  //     this.pnlSection.style.gridTemplateColumns = `repeat(auto-fill, minmax(${minmaxFirstParam}, 1fr))`;
  //     this.maxColumn = DEFAULT_MAX_COLUMN;
  //   } else {
  //     const columnsPerRow = columnsNumber || DEFAULT_MAX_COLUMN;
  //     this.pnlSection.style.gridTemplateColumns = `repeat(${columnsPerRow}, 1fr)`;
  //     this.maxColumn = columnsPerRow;
  //   }
  // }

  private updateAlign(config: IConfigData) {
    const { align = 'left' } = config;
    let alignValue = 'start'
    switch (align) {
      case 'right':
        alignValue = 'end'
        break
      case 'center':
        alignValue = 'center'
        break
    }
    if (alignValue !== 'start') {
      this.pnlSection.grid = { horizontalAlignment: alignValue as any }
      this.pnlSection.style.maxWidth = '100%'
      // if (columnLayout === IColumnLayoutType.AUTOMATIC) return;
      this.pnlSection.style.gridTemplateColumns = 'min-content'
      const sections = Array.from(this.pnlSection.querySelectorAll('sc-page-viewer-page-element'))
      const sectionWidth = this.pnlSection.offsetWidth;
      const sectionDatas = this.sectionData.elements || [];
      const gridColWidth = (sectionWidth - GAP_WIDTH * (this.maxColumn - 1)) / this.maxColumn;
      for (let i = 0; i < sections.length; i++) {
        const columnSpan = sectionDatas[i]?.columnSpan || 1;
        const widthNumber = columnSpan * gridColWidth + ((columnSpan - 1) * GAP_WIDTH);
        (sections[i] as Control).width = `${widthNumber}px`;
        (sections[i] as Control).style.gridArea = 'unset';
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
        templateColumns={[`repeat(12, 1fr)`]}
        padding={{top: '1.5rem', bottom: '1.5rem'}}
        mediaQueries={[
          {
            maxWidth: '992px',
            properties: {
              templateColumns: [`repeat(auto-fill, minmax(300px, 1fr))`]
            }
          },
          {
            maxWidth: '768px',
            properties: {
              templateColumns: [`auto`]
            }
          },
        ]}
      ></i-grid-layout>
    )
  }
}