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
export { ViewerMode } from './interface';

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
  private pnlLoading: Panel;
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
      if (this.pnlLoading) this.pnlLoading.visible = true;
      this.gridMain.visible = false;
      this.gridMain.templateColumns = ["1fr"];
      setRootDir(options?.rootDir);
      await this.setData(options?._data??options);
      if (this.pnlLoading) this.pnlLoading.visible = false;
      this.gridMain.visible = true;
    } else if (options?._data??options) {
      await this.renderPage(options?._data??options);
    }
  }

  onHide(): void {
    if (this.viewerSlideBody)
      this.viewerSlideBody.onHide()
  }

  async setData(data: IPageData) {
    if (this.pnlLoading) this.pnlLoading.visible = true;
    this.gridMain.visible = false;
    if (data.cid) {
      data = await getDataByIpfsPath(data.cid);
    }
    this._data = data;
    await this.renderPage(data);
    this.isLoaded = true;
    if (this.pnlLoading) this.pnlLoading.visible = false;
    this.gridMain.visible = true;
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
    const { header, footer, sections, config } = page;
    this.viewerFooter.data = footer;
    this.viewerFooter.visible = !!header;
    if (page.config?.customBackground)
      this.style.setProperty('--custom-background-color', page.config.backgroundColor)
    else
      this.style.removeProperty('--custom-background-color');
    if (page.config?.customTextColor)
      this.style.setProperty('--custom-text-color', page.config.textColor)
    else
      this.style.removeProperty('--custom-text-color');
    if(page.config?.plr !== undefined) {
      this.style.setProperty('--custom-padding-left', `${page.config?.plr}px`);
      this.style.setProperty('--custom-padding-right', `${page.config?.plr}px`);
    }
    if(page.config?.ptb !== undefined) {
      this.style.setProperty('--custom-padding-top', `${page.config?.ptb}px`);
      this.style.setProperty('--custom-padding-bottom', `${page.config?.ptb}px`);
    }
    this.updateContainer();
    if (this.mode === ViewerMode.NORMAL) {
      await this.viewerBody.setSections(sections, config);
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

  private getColor() {
    return this.theme === 'light' ? lightTheme.text.primary : darkTheme.text.primary;
  }

  private updateContainer() {
    if (this.pnlContainer) {
      const { customBackground, backgroundColor, backgroundImage, margin, maxWidth,  customTextColor, textColor, customTextSize, textSize } = this._data?.config || {};
      if (backgroundImage) {
        const ipfsUrl = 'https://ipfs.scom.dev/ipfs'
        this.pnlContainer.style.backgroundImage = `url("${ipfsUrl}/${backgroundImage}")`;
      }
      else
        this.pnlContainer.style.backgroundImage = '';
      
      this.pnlContainer.style.backgroundColor = 'var(--custom-background-color, var(--background-main))';
      this.pnlContainer.font = { color: 'var(--custom-text-color, var(--text-primary))' };

      if (customTextSize && textSize) this.classList.add(`font-${textSize}`)

      this.pnlContainer.maxWidth = '100%'; // maxWidth || 1280;
      const { x = 'auto', y = 8 } = margin || {};
      this.pnlContainer.margin = {top: y, bottom: y, left: x, right: x};
      if(customTextSize && textSize)
        this.pnlContainer.classList.add(`font-${textSize}`)
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
            <sc-page-viewer-body id="viewerBody" overflow={{ x: 'hidden', y: 'auto' }} onUpdatePage={this.renderPage.bind(this)}></sc-page-viewer-body>
            <sc-page-viewer-slide-body id="viewerSlideBody" overflow="hidden" onUpdatePage={this.renderPage.bind(this)} visible={false}></sc-page-viewer-slide-body>
          </i-grid-layout>
          <sc-page-viewer-footer id="viewerFooter" visible={false}></sc-page-viewer-footer>
        </i-panel>
      </i-vstack>
    )
  }
}
