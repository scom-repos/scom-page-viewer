import { Control, ControlElement, customElements, GridLayout, Module, Styles } from "@ijstech/components";
import { IPageSectionConfig, IPageElement, IPageSection, IDisplaySettings, IPageConfig } from "./interface";
import { DEFAULT_MAX_COLUMN, GAP_WIDTH } from "./utils";
import { getDefaultDisplaySettings, maxContainerWidths } from "./store";
import classes from './section.css';

const Theme = Styles.Theme.ThemeVars;

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
    this.classList.add(classes);
  }

  updateContainerSize() {
    const sizeWidth = this.size.width || 'none';
    const sizeHeight = this.size.height || 'none';
    if (this.pnlSection) {
      this.pnlSection.maxWidth = sizeWidth;
      this.pnlSection.maxHeight = sizeHeight;
      this.pnlSection.margin = { left: 'auto', right: 'auto' }
    }
  }

  async setData(sectionData: IPageSection, pageConfig: IPageConfig) {
    const { elements = [], config = {} as any } = sectionData;
    const { customBackdrop, backdropImage, backdropColor, customBackground, backgroundColor, fullWidth, padding, sectionWidth, border, borderColor } = config;
    this.background.color = 'var(--custom-background-color, var(--background-main))';

    if(sectionWidth !== undefined) {
      // this.pnlSection.width = sectionWidth;
      this.pnlSection.maxWidth = sectionWidth;
    }

    if(fullWidth) {
      if(customBackground && backgroundColor) {
        this.style.setProperty('--custom-background-color', backgroundColor);
        this.pnlSection.style.setProperty('--custom-background-color', backgroundColor);
      }
      else {
        this.style.removeProperty('--custom-background-color');
        this.pnlSection.style.removeProperty('--custom-background-color');
      }
    }
    else {
      if(customBackdrop) {
        if(backdropImage) {
          const ipfsUrl = `https://ipfs.scom.dev/ipfs`;
          this.style.setProperty('--custom-background-color', `url("${ipfsUrl}/${backdropImage}")`);
        }
        else if(backdropColor) {
          this.style.setProperty('--custom-background-color', backdropColor);
        }
      }
      else {
        this.style.removeProperty('--custom-background-color');
      }
      if(customBackground) {
        // Add background image later
        if(backgroundColor) {
          this.pnlSection.style.setProperty('--custom-background-color', backgroundColor);
        }
      }
      else {
        this.pnlSection.style.removeProperty('--custom-background-color');
      }
    }

    if(border && borderColor) {
      this.pnlSection.border = {
        width: 2,
        style: 'solid',
        color: borderColor,
        radius: 10
      }
    }

    if(padding) {
      this.pnlSection.padding = padding;
    }

    this.sectionData = JSON.parse(JSON.stringify(sectionData));
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const pageElement = (
        <sc-page-viewer-page-element
          display="block"
          class="is-parent"
        ></sc-page-viewer-page-element>
      ) as any;
      pageElement.id = element.id;
      this.updateElementConfig(pageElement, element, i);
      this.pnlSection.append(pageElement);
      await pageElement.setData(element);
    }
    this.updateAlign(config);
  }

  private updateElementConfig(el: Control, data: IPageElement, index: number) {
    const { column, columnSpan, displaySettings = getDefaultDisplaySettings() } = data;
    el.grid = { column, columnSpan };
    el.style.gridRow = '1';
    if (displaySettings?.length) {
      let mediaQueries = [];
      for (let displaySetting of displaySettings) {
        const { minWidth = 0, maxWidth = 0, properties: grid } = displaySetting as IDisplaySettings;
        if (!grid.row && grid.column && grid.columnSpan && grid.column + grid.columnSpan === DEFAULT_MAX_COLUMN + 1) {
          grid.row = 1 + index;
        }
        const mediaQuery: any = {properties: { grid, width: '100%' }};
        if (minWidth) mediaQuery.minWidth = !isNaN(+minWidth) ? `${+minWidth}px` : minWidth;
        if (maxWidth) mediaQuery.maxWidth = !isNaN(+maxWidth) ? `${+maxWidth}px` : maxWidth;
        mediaQueries.push(mediaQuery);

        // if (/^\>/.test(key)) {
        //   minWidth = key.replace('>', '').trim();
        //   mediaQueries.push({
        //     minWidth: !isNaN(+minWidth) ? `${+minWidth}px` : minWidth,
        //     properties
        //   })
        // } else if (/^\</.test(key)) {
        //   maxWidth = key.replace('<', '').trim();
        //   mediaQueries.push({
        //     maxWidth: !isNaN(+maxWidth) ? `${+maxWidth}px` : maxWidth,
        //     properties
        //   })
        // } else if (/^\d+\-\d+$/.test(key)) {
        //   const data = key.split('-');
        //   minWidth = data[0].trim();
        //   maxWidth = data[1].trim();
        //   mediaQueries.push({
        //     minWidth: !isNaN(+minWidth) ? `${+minWidth}px` : minWidth,
        //     maxWidth: !isNaN(+maxWidth) ? `${+maxWidth}px` : maxWidth,
        //     properties
        //   })
        // }
      }
      el.mediaQueries = mediaQueries;
    }
  }

  private updateAlign(config: IPageSectionConfig) {
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
      this.pnlSection.grid = {horizontalAlignment: alignValue as any}
      this.pnlSection.style.maxWidth = '100%'
      this.pnlSection.style.gridTemplateColumns = 'min-content'
      const sections = Array.from(this.pnlSection.querySelectorAll('.is-parent'))
      const sectionWidth = this.pnlSection.offsetWidth;
      const sectionDatas = this.sectionData.elements || [];
      const gridColWidth = (sectionWidth - GAP_WIDTH * (DEFAULT_MAX_COLUMN - 1)) / DEFAULT_MAX_COLUMN;
      const unitWidth = Number((1 / DEFAULT_MAX_COLUMN).toFixed(3)) * 100;
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as Control;
        if (sectionWidth <= maxContainerWidths.sm) {
          section.style.width = '100%';
          continue;
        }
        const sectionData = sectionDatas[i]; // sectionDatas.find(sec => section.id === sec.id);
        const columnSpan = sectionData?.columnSpan || 1;
        const widthNumber = columnSpan * gridColWidth + ((columnSpan - 1) * GAP_WIDTH);
        section.style.width = widthNumber ? `${widthNumber}px` : `${columnSpan * unitWidth}%`;
        section.style.maxWidth = '100%';
      }
    }
  }

  render() {
    return (
      <i-grid-layout
        id="pnlSection"
        background={{color: 'var(--custom-background-color, var(--background-main))'}}
        height="100%"
        maxWidth="100%"
        maxHeight="100%"
        position="relative"
        overflow="inherit"
        gap={{column: 15, row: 15}}
        templateColumns={[`repeat(${DEFAULT_MAX_COLUMN}, minmax(${GAP_WIDTH}px, 1fr))`]}
        padding={{top: '1.5rem', bottom: '1.5rem'}}
        mediaQueries={[
          {
            maxWidth: '767px',
            properties: {
              templateColumns: [`repeat(${DEFAULT_MAX_COLUMN}, minmax(0px, 1fr))`]
            }
          }
        ]}
      ></i-grid-layout>
    )
  }
}
