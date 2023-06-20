import { ControlElement, customElements, customModule, GridLayout, Module, Panel } from "@ijstech/components";
import { IPageData, ThemeType } from './interface';
import { ViewrBody } from './body';
import { ViewerFooter } from './footer';
import { setRootDir, setTheme } from './store';
import styleClass from './index.css';
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
    setTheme(value);
    if (this.pnlContainer) {
      const color = this.theme === 'light' ? '#ffffff' : '#1E1E1E';
      this.pnlContainer.background = {color};
    }
    if (this._data)
      this.renderPage(this._data);
  }

  async onShow(options: any) {
    this.pnlLoading.visible = true;
    this.gridMain.visible = false;
    if (options?.theme)
      setTheme(options.theme);
    if (!this.isLoaded) {
      this.gridMain.templateColumns = ["1fr"];
      setRootDir(options?.rootDir);
      await this.setData(options?._data??options);
    } else if (options?._data??options) {
      await this.renderPage(options?._data??options);
    }
    this.pnlLoading.visible = false;
    this.gridMain.visible = true;
  }

  async setData(data: IPageData) {
    this._data = data;
    await this.renderPage(data);
    this.isLoaded = true;
  }

  setRootDir(value: string) {
    setRootDir(value);
  }

  async renderPage(page: IPageData) {
    const { header, footer, sections } = page;
    this.viewerFooter.data = footer;
    this.viewerFooter.visible = !!header;
    if (this.pnlContainer) {
      const color = this.theme === 'light' ? '#ffffff' : '#1E1E1E';
      this.pnlContainer.background = {color};
    }
    await this.viewerBody.setSections(sections);
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