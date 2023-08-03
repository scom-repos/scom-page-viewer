import { ControlElement, customElements, customModule, GridLayout, Module, Panel, Styles } from "@ijstech/components";
import { IPageData, ThemeType, ViewerMode } from './interface';
import { ViewrBody } from './body';
import { ViewerFooter } from './footer';
import { setMode, setRootDir } from './store';
import styleClass from './index.css';
import { getDataByIpfsPath } from "./utils";
import { ViewrSlideBody } from "./slideBody";
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
  private viewerFooter: ViewerFooter;
  private gridMain: GridLayout;
  private viewerBody: ViewrBody;
  private viewerSlideBody: ViewrSlideBody;
  private pnlContainer: Panel;
  private isLoaded: boolean = false;
  private _data: IPageData;
  private _theme: ThemeType = 'light';
  private _mode: ViewerMode = ViewerMode.NORMAL;

  get theme() {
    return this._theme ?? 'light';
  }
  set theme(value: ThemeType) {
    this._theme = value;
    this.setTheme(this.theme);
  }

  get mode(): ViewerMode {
    return this._mode ?? ViewerMode.NORMAL;
  }
  set mode(value: ViewerMode) {
    this._mode = value;
    setMode(value);
    if (this._data) {
      this.renderPage(this._data);
    }
  }

  async onShow(options: any) { 
    if (options?.theme) {
      this.setTheme(options.theme);
    }
    if (options?.mode) {
      this._mode = options.mode;
    }
    if (!this.isLoaded) {
      this.gridMain.templateColumns = ["1fr"];
      setRootDir(options?.rootDir);
      await this.setData(options?._data??options);
    } else if (options?._data??options) {
      await this.renderPage(options?._data??options);
    }    
  }

  onHide(): void {
    if (this.viewerSlideBody)
      this.viewerSlideBody.onHide()
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
    if (this.mode === ViewerMode.NORMAL) {
      await this.viewerBody.setSections(sections);
      this.viewerBody.visible = true;
      this.viewerSlideBody.visible = false;
    } else {
      await this.viewerSlideBody.setSections(sections);
      this.viewerBody.visible = false;
      this.viewerSlideBody.visible = true;
    }
  }

  private getBackgroundColor() {
    return this.theme === 'light' ? lightTheme.background.main : darkTheme.background.main;
  }

  private updateContainer() {
    if (this.pnlContainer) {
      const defaultColor = this.getBackgroundColor();
      const { backgroundColor = defaultColor, margin, maxWidth } = this._data?.config || {};
      this.pnlContainer.background = {color: backgroundColor};
      this.pnlContainer.maxWidth = '100%'; // maxWidth || 1280;
      const { x = 'auto', y = 8 } = margin || {};
      this.pnlContainer.margin = {top: y, bottom: y, left: x, right: x};
    }
  }

  render() {
    return (
      <i-vstack id="pnlContainer" class={`sc-page-viewer-container ${styleClass}`} width="100%" height="100%">
        <i-panel stack={{ grow: "1" }} overflow="inherit">
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
            <sc-page-viewer-body id="viewerBody" overflow="inherit" onUpdatePage={this.renderPage.bind(this)}></sc-page-viewer-body>
            <sc-page-viewer-slide-body id="viewerSlideBody" overflow="hidden" onUpdatePage={this.renderPage.bind(this)} visible={false}></sc-page-viewer-slide-body>
          </i-grid-layout>
          <sc-page-viewer-footer id="viewerFooter" visible={false}></sc-page-viewer-footer>
        </i-panel>
      </i-vstack>
    )
  }
}