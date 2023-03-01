import {
  Module,
  customElements,
  ControlElement,
  Panel,
  application
} from '@ijstech/components';
import { ICodeInfoFileContent, IPageElement } from './interface';
import { fetchFileContentByCid, getSCConfigByCodeCid, IPFS_SCOM_URL } from './utils';
import { getRootDir } from './store/index';

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

  async setData(pageElement: IPageElement) {
    this.pnlElement.clearInnerHTML();
    this.data = pageElement;
    const { column, columnSpan, id, type, properties, elements, tag } = this.data;
    // this.pnlElement.grid = { column, columnSpan };
    this.pnlElement.id = id;
    const rootDir = getRootDir();
    if (type === 'primitive') {
      const { ipfscid, localPath } = this.data.module;
      let module = await this.loadModule(rootDir, { ipfscid, localPath });
      if (module) {
        if (module.confirm) module.confirm();
        if (module.setRootDir) module.setRootDir(rootDir);
        await module.setData(properties);
        if (tag) await module.setTag(tag);
      }
    } else {
      for (const element of elements) {
        const pnlElm = (<sc-page-viewer-page-element></sc-page-viewer-page-element>);
        this.pnlElement.append(pnlElm);
        await pnlElm.setData(element);
      }
    }
  }

  async loadModule(rootDir: string, options: { ipfscid?: string, localPath?: string }) {
    let module: any;
    if (options.localPath) {
      const localRootPath = rootDir ? `${rootDir}/${options.localPath}` : options.localPath;
      const scconfigRes = await fetch(`${localRootPath}/scconfig.json`);
      const scconfig = await scconfigRes.json();
      scconfig.rootDir = localRootPath;
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
