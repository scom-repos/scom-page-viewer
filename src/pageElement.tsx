import {
  Module,
  customElements,
  ControlElement,
  Panel,
  application,
  Container
} from '@ijstech/components';
import { ICodeInfoFileContent, IColumnLayoutType, IConfigData, IPageElement } from './interface';
import { DEFAULT_MAX_COLUMN, fetchFileContentByCid, getSCConfigByCodeCid, IPFS_SCOM_URL } from './utils';
import { getRootDir, getTheme } from './store';

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
  private _config: IConfigData;
  private module: Module = null;
  private observerOptions = {
    root: null,
    rootMargin: "0px"
  };
  private observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(async entry => {
      if (entry.isIntersecting) {
        if (!this.module.isConnected) await this.module.ready();
        if ((this.module as any).getConfigurators) {
          const { properties, tag } = this.data;
          const rootDir = getRootDir();
          const builderTarget = (this.module as any).getConfigurators().find(conf => conf.target === 'Builders');
          if (builderTarget) {
            if (builderTarget.setRootDir) builderTarget.setRootDir(rootDir);
            if (builderTarget.setData) await builderTarget.setData(properties);
            if (tag && builderTarget.setTag) {
              const newTag = {...tag, width: '100%'};
              await builderTarget.setTag(newTag);
            }
          }
        }
        // const themeVar = document.body.style.getPropertyValue('--theme')
        (this.module as any).theme = getTheme();
        observer.unobserve(entry.target);
      }
    });
  }, this.observerOptions);

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    // application.EventBus.register(this, 'themeChanged', (value: string) => {
    //   if (this.module) (this.module as any).theme = value
    // })
  };

  get config() {
    return this._config ?? {};
  }
  set config(value: IConfigData) {
    this._config = value;
  }

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
        this.module = module;
        this.observer.observe(module);
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
    element.setAttribute('lazyLoad', 'true');
    return element;
  }

  render() {
    return (
      <i-panel id="pnlElement"></i-panel>
    )
  }
}
