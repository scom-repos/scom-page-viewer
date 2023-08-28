import {
  ControlElement,
  customElements,
  Module,
  Styles,
  VStack,
  HStack
} from "@ijstech/components";
import { IPageData, IPageSection } from "./interface";
import { ViewerPaging } from "./paging";
import styleClass from "./body.css";
import { generateUUID } from "./utils";
const Theme = Styles.Theme.ThemeVars;

type pageChangeCallback = (page: IPageData) => void;

interface ViewerBodyElement extends ControlElement {
  onUpdatePage: pageChangeCallback;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['sc-page-viewer-body']: ViewerBodyElement;
    }
  }
}

@customElements('sc-page-viewer-body')
export class ViewrBody extends Module {
  private sections: IPageSection[];
  private pnlSections: VStack;
  private viewerPaging: ViewerPaging;
  // private archorElm: HStack;
  public onUpdatePage: pageChangeCallback;

  async setSections(sections: IPageSection[]) {
    this.sections = sections;
    if (this.pnlSections) this.pnlSections.clearInnerHTML();
    await this.renderSections();
  }

  async renderSections() {
    this.clearSections();
    if ((!this.sections || (this.sections && this.sections.length == 0))) {
      this.sections = [
        {
          id: generateUUID(),
          row: 0,
          elements: []
        }
      ]
    }
    // let anchors: { name: string, sectionElm: any }[] = [];
    for (const section of this.sections) {
      const { image = '', backgroundColor = '', margin, maxWidth = 1024, textColor, customTextSize, textSize } = section?.config || {};
      const { x = 'auto', y = 0 } = margin || {};
      const {top = 0, bottom = 0, left = 0, right = 0} = padding || {};
      console.dir(padding)
      const pageSection = (
        <sc-page-viewer-section
          id={section.id}
          class={customTextSize && textSize ? `font-${textSize}` : ''}
          display="block"
          background={{ image, color: backgroundColor }}
          font={{color: textColor}}
          // maxWidth={maxWidth || '100%'}
          containerSize={{width: maxWidth.toString()}}
          width="100%"
          margin={{top: y, bottom: y, left: x, right: x}}
          padding={{top, bottom, left, right}}
          mediaQueries={[
            {
              maxWidth: '767px',
              properties: {
                padding: {left: '1rem', right: '1rem'}
              }
            }
          ]}
        ></sc-page-viewer-section>);
      this.pnlSections.append(pageSection);
      await pageSection.setData(section);
      // const anchorName = section.anchorName;
      // if (anchorName) {
      //   anchors.push({
      //     name: anchorName,
      //     sectionElm: pageSection
      //   });
      // }
    }
    // this.updateAnchors(anchors);
  }

  // private updateAnchors(anchors: { name: string, sectionElm: any }[]) {
  //   this.archorElm.clearInnerHTML();
  //   if (anchors && anchors.length) {
  //     for (let i = 0; i < anchors.length; i++) {
  //       const anchor = anchors[i];
  //       if (i > 0) {
  //         this.archorElm.appendChild(<i-panel width={1} height={16} display="block" background={{ color: Theme.divider }} />);
  //       }
  //       this.archorElm.appendChild(<i-label caption={anchor.name} class="pointer anchor-item" onClick={() => this.onScrollToRow(anchor.sectionElm)} />);
  //     }
  //     this.archorElm.visible = true;
  //     this.archorElm.display = 'flex';
  //     this.pnlSections.padding.top = (this.archorElm.clientHeight > 45 ? this.archorElm.clientHeight : 45);
  //     window.addEventListener("scroll", this.onScrollListener);
  //   } else {
  //     this.pnlSections.padding.top = 0;
  //     this.archorElm.visible = false;
  //     window.removeEventListener("scroll", this.onScrollListener);
  //   }
  // }

  // private onScrollListener = () => {
  //   const currentScroll = window.pageYOffset;
  //   const mainHeader = document.querySelector('main-header');
  //   const hHeight = mainHeader?.clientHeight || 0;
  //   if (currentScroll > hHeight) {
  //     this.archorElm.top = 0;
  //   } else {
  //     this.archorElm.top = hHeight - currentScroll;
  //   }
  // }

  // private onScrollToRow(rowElm: any) {
  //   if (rowElm) {
  //     const _offsetTop = rowElm.getBoundingClientRect().top + window.pageYOffset - this.archorElm.offsetHeight;
  //     window.scrollTo({ top: _offsetTop, behavior: 'smooth' });
  //   }
  // }

  clearSections() {
    this.pnlSections.clearInnerHTML();
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
        {/* <i-hstack id={'archorElm'} display="flex" background={{ color: Theme.background.default }} zIndex={9999} gap={10} verticalAlignment="center" horizontalAlignment="center" wrap="wrap" position="fixed" width="100%" padding={{ left: 50, right: 50, top: 10, bottom: 10 }}></i-hstack> */}
        <i-vstack id={'pnlSections'} alignItems="center" padding={{}}></i-vstack>
        <sc-page-viewer-paging id="viewerPaging" visible={false} onPrevPage={this.onUpdatePage.bind(this)} onNextPage={this.onUpdatePage.bind(this)}></sc-page-viewer-paging>
      </i-panel>
    );
  }
}