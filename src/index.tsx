import { ControlElement, customElements, customModule, GridLayout, Module, Panel } from "@ijstech/components";
import { IPageData, IColumnLayoutType, IConfig } from './interface';
import { ViewrBody } from './body';
import { ViewerFooter } from './footer';
import { setConfig, setRootDir } from './store';
import styleClass from './index.css';
import { DEFAULT_MAX_COLUMN } from "./utils";
export { ViewrBody } from './body';
export { ViewrPageElement } from './pageElement';
export { ViewrSection } from './section';
export { ViewerSidebar } from './sidebar';
export { ViewerPaging } from './paging';

interface ScomPageViewerElement extends ControlElement {
  columnLayout?: string;
  columnsNumber?: number;
  maxColumnsPerRow?: number;
  columnMinWidth?: number;
}

declare global {
  namespace JSX {
      interface IntrinsicElements {
          ['i-scom-page-viewer']: ScomPageViewerElement;
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
  private isLoaded: boolean = false;
  private config: IConfig = {};

  get columnLayout() {
    return this.config.columnLayout ?? IColumnLayoutType.FIXED;
  }
  set columnLayout(value: IColumnLayoutType) {
    this.config.columnLayout = value ?? IColumnLayoutType.FIXED;
    setConfig({...this.config});
  }

  get columnsNumber() {
    return this.config.columnsNumber ?? DEFAULT_MAX_COLUMN;
  }
  set columnsNumber(value: number) {
    this.config.columnsNumber = value ?? DEFAULT_MAX_COLUMN;
    setConfig({...this.config});
  }

  get maxColumnsPerRow() {
    return this.config.maxColumnsPerRow ?? 0;
  }
  set maxColumnsPerRow(value: number) {
    this.config.maxColumnsPerRow = value ?? 0;
    setConfig({...this.config});
  }

  get columnMinWidth() {
    return this.config.columnMinWidth ?? 0;
  }
  set columnMinWidth(value: number|string) {
    this.config.columnMinWidth = value ?? 0;
    setConfig({...this.config});
  }

  setConfigData(data: IConfig) {
    this.config = data;
    setConfig(data);
  }

  getConfigData() {
    return this.config;
  }

  async onShow(options: any) {
    this.pnlLoading.visible = true;
    this.gridMain.visible = false;
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
    await this.viewerBody.setSections(sections);
  }

  init() {
    super.init();
    const columnLayout = this.getAttribute('columnLayout', true, IColumnLayoutType.FIXED);
    const maxColumnsPerRow = this.getAttribute('maxColumnsPerRow', true, 0);
    const columnMinWidth = this.getAttribute('columnMinWidth', true, '');
    const columnsNumber = this.getAttribute('columnsNumber', true, DEFAULT_MAX_COLUMN);
    this.setConfigData({columnLayout, maxColumnsPerRow, columnMinWidth, columnsNumber});
  }

  render() {
    return (
      <i-vstack class={`sc-page-viewer-container ${styleClass}`} width="100%" height="100%">
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