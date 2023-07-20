import { ControlElement, customElements, customModule, GridLayout, Module, Panel, Styles } from "@ijstech/components";
import { IPageData, ThemeType } from './interface';
import { ViewrBody } from './body';
import { ViewerFooter } from './footer';
import { setRootDir } from './store';
import styleClass from './index.css';
import { getDataByIpfsPath } from "./utils";
export { ViewrBody } from './body';
export { ViewrPageElement } from './pageElement';
export { ViewrSection } from './section';
export { ViewerSidebar } from './sidebar';
export { ViewerPaging } from './paging';

declare global {
  namespace JSX {
      interface IntrinsicElements {
          ['i-scom-page-viewer']: ControlElement;
      }
  }
}

const lightTheme = Styles.Theme.defaultTheme;
const darkTheme = Styles.Theme.darkTheme;

@customModule
@customElements('i-scom-page-viewer')
export default class Viewer extends Module {
  private pnlLoading: Panel;
  private viewerFooter: ViewerFooter;
  private gridMain: GridLayout;
  private viewerBody: ViewrBody;
  private pnlContainer: Panel;
  private isLoaded: boolean = false;
  private _data: IPageData;
  private _theme: ThemeType = 'light';

  get theme() {
    return this._theme ?? 'light';
  }
  set theme(value: ThemeType) {
    this._theme = value;
    this.setTheme(this.theme);
  }

  async onShow(options: any) { 
    if (options?.theme) {
      this.setTheme(options.theme);
    }
    if (!this.isLoaded) {
      this.gridMain.templateColumns = ["1fr"];
      setRootDir(options?.rootDir);
      await this.setData(options?._data??options);
    } else if (options?._data??options) {
      await this.renderPage(options?._data??options);
    }    
  }

  async setData(data: IPageData) {
    if (data.cid) {
      data = await getDataByIpfsPath(data.cid);
    }
    this._data = data;
    await this.renderPage(data);
    this.isLoaded = true;
  }

  setRootDir(value: string) {
    setRootDir(value);
  }

  private setTheme(value: ThemeType) {
    this.style.setProperty('--viewer-theme', value);
    this.updateContainer();
    if (this._data) {
      this.renderPage(this._data);
    }
  }

  async renderPage(page: IPageData) {
    const { header, footer, sections } = page;
    this.viewerFooter.data = footer;
    this.viewerFooter.visible = !!header;
    this.updateContainer();
    await this.viewerBody.setSections(sections);
  }

  private getBackgroundColor() {
    return this.theme === 'light' ? lightTheme.background.main : darkTheme.background.main;
  }

  private updateContainer() {
    if (this.pnlContainer) {
      const defaultColor = this.getBackgroundColor();
      const { backgroundColor = defaultColor, margin, maxWidth } = this._data?.config || {};
      this.pnlContainer.background = {color: backgroundColor};
      this.pnlContainer.maxWidth = maxWidth || 1280;
      const { x = 'auto', y = 8 } = margin || {};
      this.pnlContainer.margin = {top: y, bottom: y, left: x, right: x};
    }
  }

  render() {
    return (
      <i-vstack id="pnlContainer" class={`sc-page-viewer-container ${styleClass}`} width="100%" height="100%">
        <i-panel stack={{ grow: "1" }} overflow="hidden">
          <i-vstack
            id="pnlLoading"
            height="100%"
            horizontalAlignment="center"
            verticalAlignment="center"
            padding={{ top: "1rem", bottom: "1rem", left: "1rem", right: "1rem" }}
            visible={false}
          >
            <i-panel class={'spinner'}></i-panel>
          </i-vstack>
          <i-grid-layout id="gridMain" height="100%" templateColumns={["1fr"]}>
            <sc-page-viewer-body id="viewerBody" overflow="auto" onUpdatePage={this.renderPage.bind(this)}></sc-page-viewer-body>
          </i-grid-layout>
          <sc-page-viewer-footer id="viewerFooter" visible={false}></sc-page-viewer-footer>
        </i-panel>
      </i-vstack>
    )
  }
}