import {
  ControlElement,
  customElements,
  Module,
  Styles,
  VStack,
  HStack
} from "@ijstech/components";
import { IPageData, IRowData } from "./interface";
import { ViewerPaging } from "./paging";
import styleClass from "./body.css";
const Theme = Styles.Theme.ThemeVars;

type pageChangeCallback = (page: IPageData) => void;

interface ViewerBodyElement extends ControlElement {
  onUpdatePage: pageChangeCallback;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['scpage-viewer-body']: ViewerBodyElement;
    }
  }
}

@customElements('scpage-viewer-body')
export class ViewrBody extends Module {
  private rows: IRowData[];
  private pnlRows: VStack;
  private viewerPaging: ViewerPaging;
  private archorElm: HStack;
  public onUpdatePage: pageChangeCallback;

  async setRows(rows: IRowData[]) {
    this.rows = rows;
    await this.renderRows();
  }

  async renderRows() {
    this.clearRows();
    if ((!this.rows || (this.rows && this.rows.length == 0))) {
      this.rows = [{
        config: {
          width: '100%',
          height: '100%',
          columns: 1,
        },
        sections: []
      }]
    }
    let anchors: { name: string, rowElm: any }[] = [];
    for (const rowData of this.rows) {
      const pageRow = (<scpage-viewer-row></scpage-viewer-row>);
      this.pnlRows.append(pageRow);
      await pageRow.setData(rowData);
      const anchorName = rowData?.config?.anchorName;
      if (anchorName) {
        anchors.push({
          name: anchorName,
          rowElm: pageRow
        });
      }
    }
    this.updateAnchors(anchors);
  }

  private updateAnchors(anchors: { name: string, rowElm: any }[]) {
    this.archorElm.clearInnerHTML();
    if (anchors && anchors.length) {
      for (let i = 0; i < anchors.length; i++) {
        const anchor = anchors[i];
        if (i > 0) {
          this.archorElm.appendChild(<i-panel width={1} height={16} display="block" background={{ color: Theme.divider }} />);
        }
        this.archorElm.appendChild(<i-label caption={anchor.name} class="pointer anchor-item" onClick={() => this.onScrollToRow(anchor.rowElm)} />);
      }
      this.archorElm.visible = true;
      this.archorElm.display = 'flex';
      this.pnlRows.padding.top = (this.archorElm.clientHeight > 45 ? this.archorElm.clientHeight : 45) + 12;
      window.addEventListener("scroll", this.onScrollListener);
    } else {
      this.pnlRows.padding.top = 12;
      this.archorElm.visible = false;
      window.removeEventListener("scroll", this.onScrollListener);
    }
  }

  private onScrollListener = () => {
    const currentScroll = window.pageYOffset;
    const mainHeader = document.querySelector('main-header');
    const hHeight = mainHeader?.clientHeight || 0;
    if (currentScroll > hHeight) {
      this.archorElm.top = 0;
    } else {
      this.archorElm.top = hHeight - currentScroll;
    }
  }

  private onScrollToRow(rowElm: any) {
    if (rowElm) {
      const _offsetTop = rowElm.getBoundingClientRect().top + window.pageYOffset - this.archorElm.offsetHeight;
      window.scrollTo({ top: _offsetTop, behavior: 'smooth' });
    }
  }

  clearRows() {
    this.pnlRows.clearInnerHTML();
  }

  async setPaging(pages: IPageData[], currPage: IPageData) {
    await this.viewerPaging.setPaging(pages, currPage);
  }

  setPagingVisibility(pagingVisible: boolean) {
    this.viewerPaging.setVisible(pagingVisible);
  }

  render() {
    return (
      <i-panel class={styleClass} height={'100%'}>
        <i-hstack id={'archorElm'} display="flex" background={{ color: Theme.background.default }} zIndex={9999} gap={10} verticalAlignment="center" horizontalAlignment="center" wrap="wrap" position="fixed" width="100%" padding={{ left: 50, right: 50, top: 10, bottom: 10 }}></i-hstack>
        <i-vstack id={'pnlRows'} alignItems="center" padding={{ top: 12, bottom: 50 }}></i-vstack>
        <scpage-viewer-paging id="viewerPaging" visible={false} onPrevPage={this.onUpdatePage.bind(this)} onNextPage={this.onUpdatePage.bind(this)}></scpage-viewer-paging>
      </i-panel>
    );
  }
}