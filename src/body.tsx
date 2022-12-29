import {
  ControlElement,
  customElements,
  Module,
  VStack
} from "@ijstech/components";
import { IPageData, IRowData } from "./interface";
import { ViewerPaging } from "./paging";

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
    for (const rowData of this.rows) {
      const pageRow = (<scpage-viewer-row></scpage-viewer-row>);
      this.pnlRows.append(pageRow);
      await pageRow.setData(rowData);
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
      <i-panel height={'100%'}>
        <i-vstack id={'pnlRows'} alignItems="center" padding={{ top: 12, bottom: 50 }}></i-vstack>
        <scpage-viewer-paging id="viewerPaging" visible={false} onPrevPage={this.onUpdatePage.bind(this)} onNextPage={this.onUpdatePage.bind(this)}></scpage-viewer-paging>
      </i-panel>
    );
  }
}