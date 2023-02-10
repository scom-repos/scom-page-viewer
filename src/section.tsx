import { application, ControlElement, customElements, Module, Panel } from "@ijstech/components";
import { ICodeInfoFileContent, ISectionData } from "./interface";
import { fetchFileContentByCid, getSCConfigByCodeCid, IPFS_SCOM_URL } from "./utils";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['scpage-viewer-section']: SectionElement;
    }
  }
}

interface SectionElement extends ControlElement {
  containerSize?: {
    width?: string;
    height?: string;
  }
}

@customElements('scpage-viewer-section')
export class ViewrSection extends Module {
  private pnlModule: Panel;
  private _size: {
    width?: string;
    height?: string;
  }

  get size() {
    return this._size || {};
  }

  set size(value: { width?: string; height?: string }) {
    this._size = value;
    this.updateContainerSize();
  }

  clear() {
    this.pnlModule.clearInnerHTML();
  }

  async init() {
    super.init();
    this.size = this.getAttribute('containerSize', true, {});
  }

  updateContainerSize() {
    const sizeWidth = this.size.width || 'none';
    const sizeHeight = this.size.height || 'none';
    if (this.pnlModule) {
      this.pnlModule.maxWidth = sizeWidth;
      this.pnlModule.maxHeight = sizeHeight;
    }
  }

  async setData(sectionData: ISectionData) {
    if (sectionData.module) {
      let module = await this.loadModule(sectionData.module.ipfscid);
      if (module) {
        if (module.confirm) module.confirm();
        module.setData(sectionData.data);
        module.setTag(sectionData.tag);
      }
    }
  }

  async loadModule(ipfsCid: string) {
    const response = await fetchFileContentByCid(ipfsCid);
    if (!response) return;
    const result: ICodeInfoFileContent = await response.json();
    const codeCID = result.codeCID;
    const scConfig = await getSCConfigByCodeCid(codeCID);
    if (!scConfig) return;
    const main: string = scConfig.main;
    let module: any;
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
    if (module) {
      this.pnlModule.append(module);
    }
    return module;
  }

  render() {
    return (
      <i-panel id="pnlModule"></i-panel>
    )
  }
}