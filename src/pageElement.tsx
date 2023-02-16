import {
  Module,
  customElements,
  ControlElement,
  Panel,
  application
} from '@ijstech/components';
import { ICodeInfoFileContent, IPageElement } from './interface';
import { fetchFileContentByCid, getSCConfigByCodeCid, IPFS_SCOM_URL } from './utils';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['scpage-viewer-page-element']: ControlElement;
    }
  }
}

@customElements('sc-page-viewer-page-element')
export class ViewrPageElement extends Module {
  private pnlElement: Panel;
  private data: IPageElement;

  async setData(pageElement: IPageElement) {
    this.pnlElement.clearInnerHTML();
    this.data = pageElement;
    const { column, columnSpan, id, type, properties, elements } = this.data;
    this.pnlElement.grid = { column, columnSpan };
    this.pnlElement.id = id;
    if (type === 'primitive') {
      const { ipfscid, localPath } = this.data.module;
      let module = await this.loadModule({ ipfscid, localPath });
      if (module) {
        if (module.confirm) module.confirm();
        module.setData(properties);
      }
    } else {
      for (const element of elements) {
        const pnlElm = (<scpage-viewer-page-element></scpage-viewer-page-element>);
        this.pnlElement.append(pnlElm);
        await pnlElm.setData(element);
      }
    }
  }

  async loadModule(options: { ipfscid?: string, localPath?: string }) {
    let module: any;
    if (options.localPath) {
      const scconfigRes = await fetch(`${options.localPath}/scconfig.json`);
      const scconfig = await scconfigRes.json();
      scconfig.rootDir = options.localPath;
      module = await application.newModule(scconfig.main, scconfig);
    } else {
      const response = await fetchFileContentByCid(options.ipfscid);
      if (!response) return;
      const result: ICodeInfoFileContent = await response.json();
      const codeCID = result.codeCID;
      const scConfig = await getSCConfigByCodeCid(codeCID);
      if (!scConfig) return;
      const main: string = scConfig.main;
      if (main.startsWith("@")) {
        scConfig.rootDir = `${IPFS_SCOM_URL}/${codeCID}/dist`;
        module = await application.newModule(main, scConfig);
      } else {
        const root = `${IPFS_SCOM_URL}/${codeCID}/dist`;
        const mainScriptPath = main.replace('{root}', root);
        const dependencies = scConfig.dependencies;
        for (let key in dependencies) {
          dependencies[key] = dependencies[key].replace('{root}', root);
        }
        module = await application.newModule(mainScriptPath, { dependencies });
      }
    }
    if (module) {
      this.pnlElement.append(module);
    }
    return module;
  }

  render() {
    return (
      <i-panel id="pnlElement"></i-panel>
    )
  }
}
