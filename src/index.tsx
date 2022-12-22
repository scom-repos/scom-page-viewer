import { customModule, GridLayout, Module, Panel, Styles } from "@ijstech/components";
import { IViewerData, IPageData } from "./interface";
import { IPFS_SCOM_URL } from "./utils";
import styleClass from './index.css';
import { ViewrBody } from './body';
import { ViewerSidebar } from "./sidebar";
export { ViewrBody } from './body';
export { ViewrRow } from './row';
export { ViewrSection } from './section';
export { ViewerSidebar } from './sidebar';
export { ViewerPaging } from './paging';

const Theme = Styles.Theme.ThemeVars;

@customModule
export default class Viewer extends Module {
  private pnlLoading: Panel;
  private gridMain: GridLayout;
  private viewerSidebar: ViewerSidebar;
  private viewerBody: ViewrBody;
  private _data: IViewerData | undefined;
  private pagingVisible: boolean;
  private params: {
    page?: string;
  };
  private isLoaded: boolean = false;

  async onShow(options: any) {
    this.pnlLoading.visible = true;
    this.gridMain.visible = false;
    if (!this.isLoaded) {
      this.gridMain.templateColumns = ["1fr"];
      this.viewerSidebar.visible = false;
      if (options?.cid) {
        this._data = await this.autoRetryGetIPFSContent(options.cid);
      } else {
        this._data = undefined;
      }
      if (options) {
        this.params = options.params;
      }
      await this.setData();
    } else if (this._data.pages && this._data.pages.length > 0) {
      const page = this._data.pages[0];
      this.viewerSidebar.resetActiveTreeNode();
      this.renderPage(page);
    }
    this.pnlLoading.visible = false;
    this.gridMain.visible = true;
  }

  async setData() {
    if (!this._data) return;
    this.pagingVisible = this._data.config?.body.showPagination || false;
    this.viewerBody.setPagingVisibility(this.pagingVisible);
    this.viewerSidebar.treeData = this._data.pages;
    await this.renderPageByConfig();
    if (this._data.pages && this._data.pages.length > 0) {
      let page;
      if (this.params && "page" in this.params)
        page = this._data.pages.find(v => v.url === this.params.page);
      if (!page)
        page = this._data.pages[0];
      this.renderPage(page);
    }
    this.isLoaded = true;
  }

  async renderPageByConfig() {
    if (!this._data) return;
    const showSideMenu = this._data.config?.header?.showSideMenu || false;
    this.gridMain.templateColumns = showSideMenu ? ["350px", "1fr"] : ["1fr"];
    this.viewerSidebar.visible = showSideMenu;
    const rows = this._data.pages[0].rows;
    await this.viewerBody.setRows(rows);
  }

  async renderPage(page: IPageData) {
    await this.viewerBody.setRows(page.rows);
    await this.viewerBody.setPaging(this._data.pages, page)
    this.viewerBody.setPagingVisibility(this.pagingVisible);
  }

  private async autoRetryGetIPFSContent(cid: string): Promise<IViewerData> {
    return new Promise((resolve, reject) => {
      const load = async (counter: number): Promise<any> => {
        try {
          if (counter >= 10) return reject();
          const response = await fetch(`${IPFS_SCOM_URL}/${cid}`);
          if (response.ok) {
            resolve(response.json());
          } else {
            return load(++counter);
          }
        } catch (err) {
          return load(++counter);
        }
      };
      load(0);
    });
  }

  render() {
    return (
      <i-vstack class={styleClass} width="100%" height="100%" background={{ color: Theme.background.main }}>
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
            <scpage-viewer-sidebar
              id="viewerSidebar"
              visible={false}
              overflow="auto"
              onTreeViewActiveChange={this.renderPage.bind(this)}
            ></scpage-viewer-sidebar>
            <scpage-viewer-body id="viewerBody" overflow="auto" onUpdatePage={this.renderPage.bind(this)}></scpage-viewer-body>
          </i-grid-layout>
        </i-panel>
      </i-vstack>
    )
  }
}