import {
  Module,
  customElements,
  ControlElement,
  Panel,
  application,
  Container
} from '@ijstech/components';
import { IPageElement } from './interface';
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
            if (builderTarget.setRootParent) builderTarget.setRootParent(this.closest('sc-page-viewer-section'));
            if (tag && builderTarget.setTag) {
              const newTag = {...tag, width: '100%'};
              await builderTarget.setTag(newTag);
            }
          }
        }
        const parentElm = this.closest('i-scom-page-viewer') as HTMLElement;
        const themeVar = parentElm && parentElm.style.getPropertyValue('--viewer-theme');
        (this.module as any).theme = themeVar || 'light';
        observer.unobserve(entry.target);
      }
    });
  }, this.observerOptions);

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  };

  async setData(pageElement: IPageElement) {
      if (!this.pnlElement) return;
      this.pnlElement.clearInnerHTML();
      this.data = pageElement;
      const { elements, module: moduleData } = this.data;
      // this.pnlElement.id = id;
      // const rootDir = getRootDir();
      if (elements?.length) {
        for (const element of elements) {
          const pnlElm = (<sc-page-viewer-page-element id={element.id} display="block"></sc-page-viewer-page-element>);
          this.pnlElement.append(pnlElm);
          await pnlElm.setData(element);
        }
      } else if (moduleData?.path) {
        const { tag } = this.data
        // let module: any = await this.getEmbedElement(rootDir, this.data.module.path);
        let module:any = await application.createElement(moduleData.path);
        if (module) {
          this.pnlElement.append(module);
          this.module = module;
          module.style.display = 'block';
          module.maxWidth = '100%';
          module.maxHeight = '100%';
          if (tag) {
            const { pt, pb, pl, pr } = tag
            module.padding = { top: pt || 0, bottom: pb || 0, left: pl || 0, right: pr || 0 }
          }
          this.observer.observe(module);
        }
      }
  }

  render() {
    return (
      <i-panel id="pnlElement"></i-panel>
    )
  }
}
