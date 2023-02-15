import { customModule, GridLayout, Module, Panel } from "@ijstech/components";
import { IPageData } from './interface';
import { ViewerHeader } from './header';
import { ViewrBody } from './body';
import { ViewerFooter } from './footer';
import styleClass from './index.css';
export { ViewrBody } from './body';
export { ViewrPageElement } from './pageElement';
export { ViewrSection } from './section';
export { ViewerSidebar } from './sidebar';
export { ViewerPaging } from './paging';

@customModule
export default class Viewer extends Module {
  private pnlLoading: Panel;
  private viewerHeader: ViewerHeader;
  private viewerFooter: ViewerFooter;
  private gridMain: GridLayout;
  private viewerBody: ViewrBody;
  private data: IPageData | undefined;
  private isLoaded: boolean = false;

  async onShow(options: IPageData) {
    this.pnlLoading.visible = true;
    this.gridMain.visible = false;
    if (!this.isLoaded) {
      this.gridMain.templateColumns = ["1fr"];
      this.data = options;
      await this.setData();
    } else if (this.data) {
      await this.renderPage(this.data);
    }
    this.pnlLoading.visible = false;
    this.gridMain.visible = true;
  }

  async setData() {
    if (!this.data) return;
    await this.renderPage(this.data);
    this.isLoaded = true;
  }

  async renderPage(page: IPageData) {
    const { header, footer, sections } = page;
    this.viewerHeader.data = header;
    this.viewerFooter.data = footer;
    this.viewerHeader.visible = !!header;
    this.viewerFooter.visible = !!header;
    await this.viewerBody.setSections(sections);
  }

  render() {
    return (
      <i-vstack class={`scpage-viewer-container ${styleClass}`} width="100%" height="100%">
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
          <scpage-viewer-header id="viewerHeader" visible={false}></scpage-viewer-header>
          <i-grid-layout id="gridMain" height="100%" templateColumns={["1fr"]}>
            <scpage-viewer-body id="viewerBody" overflow="auto" onUpdatePage={this.renderPage.bind(this)}></scpage-viewer-body>
          </i-grid-layout>
          <scpage-viewer-footer id="viewerFooter" visible={false}></scpage-viewer-footer>
        </i-panel>
      </i-vstack>
    )
  }
}