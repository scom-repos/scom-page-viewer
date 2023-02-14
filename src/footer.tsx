import {
  Module,
  customElements,
  ControlElement,
  Panel,
} from '@ijstech/components';
import { IPageFooter } from './interface';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['scpage-viewer-footer']: ControlElement;
    }
  }
}

@customElements('scpage-viewer-footer')
export class ViewerFooter extends Module {
  private _data: IPageFooter;
  private pnlFooter: Panel;

  constructor(parent?: any) {
    super(parent);
  }

  async init() {
    super.init();
  }

  get data() {
    return this._data;
  }

  set data(value: IPageFooter) {
    this._data = value;
    this.renderFooter();
  }

  private async renderFooter() {
    if (!this.data || !this.pnlFooter) return;
    this.pnlFooter.clearInnerHTML();
    const { image, elements } = this.data;    
    this.pnlFooter.background = { image: image };
    for (const element of elements) {
      const pageElement = (<scpage-viewer-page-element></scpage-viewer-page-element>);
      this.pnlFooter.append(pageElement);
      await pageElement.setData(element);
    }
  }

  render() {
    return (
      <i-panel id="pnlFooter" position="relative" width="100%"></i-panel>
    );
  }
}

