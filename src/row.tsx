import {
  Module,
  customElements,
  ControlElement,
  GridLayout
} from '@ijstech/components';
import { IRowData } from './interface';
import { containerStyle } from './row.css';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['scpage-viewer-row']: ControlElement;
    }
  }
}

@customElements('scpage-viewer-row')
export class ViewrRow extends Module {
  private gridSections: GridLayout;
  private rowData: IRowData;

  async setData(rowData: IRowData) {
    this.gridSections.clearInnerHTML();
    this.rowData = rowData;
    if (this.rowData.config.width) {
      this.width = this.rowData.config.width;
    }
    if (this.rowData.config.height) {
      // use minHeight instead of height to avoid the overflow of inner containers
      // when the markdown editor is in edit mode
      this.minHeight = this.rowData.config.height;
    }
    this.gridSections.templateColumns = Array(this.rowData.sections?.length || 0).fill("1fr")
    if (this.rowData.sections && this.rowData.sections.length > 0) {
      for (let i = 0; i < this.rowData.sections.length; i++) {
        const sectionData = this.rowData.sections[i];
        const pageSection = (<scpage-viewer-section></scpage-viewer-section>);
        this.gridSections.append(pageSection);
        await pageSection.setData(sectionData);
      }
    }
  }

  render() {
    return (
      <i-grid-layout id="gridSections" class={containerStyle} verticalAlignment='center'></i-grid-layout>
    )
  }
}
