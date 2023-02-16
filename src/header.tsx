import {
  Module,
  customElements,
  ControlElement,
  Panel,
} from '@ijstech/components';
import { HeaderType, IPageHeader } from './interface';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['scpage-viewer-header']: ControlElement;
    }
  }
}

@customElements('sc-page-viewer-header')
export class ViewerHeader extends Module {
  private _data: IPageHeader;
  private pnlHeader: Panel;

  constructor(parent?: any) {
    super(parent);
  }

  async init() {
    super.init();
  }

  get data() {
    return this._data;
  }

  set data(value: IPageHeader) {
    this._data = value;
    this.renderHeader();
  }

  private async renderHeader() {
    if (!this.data || !this.pnlHeader) return;
    this.pnlHeader.clearInnerHTML();
    const { headerType, image, elements } = this.data;
    switch (headerType) {
      case HeaderType.COVER:
        this.pnlHeader.height = '100vh';
        this.pnlHeader.background = { image };
        break;
      case HeaderType.LARGE:
        this.pnlHeader.height = 520;
        this.pnlHeader.background = { image };
        break;
      case HeaderType.NORMAL:
        this.pnlHeader.height = 340;
        this.pnlHeader.background = { image };
        break;
      case HeaderType.TITLE:
        this.pnlHeader.height = 180;
        break;
    }
    for (const element of elements) {
      const pageElement = (<scpage-viewer-page-element></scpage-viewer-page-element>);
      this.pnlHeader.append(pageElement);
      await pageElement.setData(element);
    }
  }

  render() {
    return (
      <i-panel id="pnlHeader" position="relative" width="100%"></i-panel>
    );
  }
}

