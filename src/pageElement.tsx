import {
  Module,
  customElements,
  ControlElement,
  Panel,
  application,
  Container
} from '@ijstech/components';
import { IPageElement } from './interface';
// import { fetchFileContentByCid, getSCConfigByCodeCid, IPFS_SCOM_URL } from './utils';
import { getRootDir } from './store';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['sc-page-viewer-page-element']: ControlElement;
    }
  }
}

@customElements('sc-page-viewer-page-element')
export class ViewrPageElement extends Module {
  private pnlElement: Panel;
  private data: IPageElement;
  private module: Module = null;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    application.EventBus.register(this, 'themeChanged', (value: string) => {
      if (this.module) (this.module as any).theme = value
    })
  };

  async setData(pageElement: IPageElement) {
    this.pnlElement.clearInnerHTML();
    this.data = pageElement;
    const { id, type, properties, elements, tag } = this.data;
    this.pnlElement.id = id;
    const rootDir = getRootDir();
    if (type === 'primitive') {
      let module: any = await this.getEmbedElement(rootDir, this.data.module.path);
      if (module) {
        this.pnlElement.append(module);
        if (module.ready) await module.ready();
        if (module.getConfigurators) {
          const builderTarget = module.getConfigurators().find(conf => conf.target === 'Builders');
          if (builderTarget?.setRootDir) builderTarget.setRootDir(rootDir);
          if (builderTarget?.setData) await builderTarget.setData(properties);
          if (tag && builderTarget?.setTag) await builderTarget.setTag(tag);
        }
        const themeVar = document.body.style.getPropertyValue('--theme')
        if (themeVar) module.theme = themeVar
        this.module = module;
      }
    } else {
      for (const element of elements) {
        const pnlElm = (<sc-page-viewer-page-element></sc-page-viewer-page-element>);
        this.pnlElement.append(pnlElm);
        await pnlElm.setData(element);
      }
    }
  }

  async getEmbedElement(rootDir: string, path: string) {
    let modulePath = rootDir ? `${rootDir}/libs/@scom/${path}` : `libs/@scom/${path}`;
    application.currentModuleDir = modulePath;
    const result = await application.loadScript(`${modulePath}/index.js`);
    application.currentModuleDir = '';
    if (!result) return null;
    const elementName = `i-${path.split('/').pop()}`;
    const element = document.createElement(elementName);
    return element;
  }

  render() {
    return (
      <i-panel id="pnlElement"></i-panel>
    )
  }
}
