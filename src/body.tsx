import {
  ControlElement,
  customElements,
  Module,
  Styles,
  VStack,
  HStack
} from "@ijstech/components";
import { IPageData, IPageSection, IPageConfig } from "./interface";
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
  private pageConfig: IPageConfig;
  private pnlSections: VStack;
  private viewerPaging: ViewerPaging;
  // private archorElm: HStack;
  public onUpdatePage: pageChangeCallback;

  async setSections(sections: IPageSection[], config?: IPageConfig) {
    this.sections = sections;
    this.pageConfig = config;
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
      const isSectionExisted = this.pnlSections.querySelector(`[id='${section.id}']`)
      if (!isSectionExisted) {
        const { image = '', customBackground, backgroundColor = '', margin, maxWidth = 1024, customTextColor, textColor, customTextSize, textSize, padding } = section?.config || {};
        const { x = 'auto', y = 0 } = margin || {};
        const pageSection = (
          <sc-page-viewer-section
            id={section.id}
            display="block"
            class="i-page-section"
            background={{color: "var(--custom-background-color, var(--background-main))"}}
            font={{color: `var(--custom-text-color, var(--text-primary))`}}
            containerSize={{width: maxWidth.toString()}}
            margin={{top: y, bottom: y, left: x, right: x}}
            width="100%"
            // maxWidth={maxWidth || '100%'}
            // padding={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }}
            // mediaQueries={[
            //   {
            //     maxWidth: '767px',
            //     properties: {
            //       padding: {left: '1rem', right: '1rem'}
            //     }
            //   }
            // ]}
          ></sc-page-viewer-section>);

        if (customTextColor && textColor)
          pageSection.style.setProperty('--custom-text-color', textColor);
        if (customBackground && backgroundColor)
          pageSection.style.setProperty('--custom-background-color', backgroundColor);
        if(customTextSize && textSize)
          pageSection.classList.add(`font-${textSize}`)
        if(padding && (padding.top !== undefined || padding.bottom !== undefined || padding.left !== undefined || padding.right !== undefined)) {
          if(padding.top !== undefined) {
            pageSection.style.setProperty('--custom-padding-top', `${padding.top}px`);
          }
          else {
            pageSection.style.setProperty('--custom-padding-top', '0px')
          }
          if(padding.bottom !== undefined) {
            pageSection.style.setProperty('--custom-padding-bottom', `${padding.bottom}px`);
          }
          else {
            pageSection.style.setProperty('--custom-padding-bottom', '0px')
          }
          if(padding.left !== undefined) {
            pageSection.style.setProperty('--custom-padding-left', `${padding.left}px`);
          }
          else {
            pageSection.style.setProperty('--custom-padding-left', '0px')
          }
          if(padding.right !== undefined) {
            pageSection.style.setProperty('--custom-padding-right', `${padding.right}px`);
          }
          else {
            pageSection.style.setProperty('--custom-padding-right', '0px')
          }
        }
      
        this.pnlSections.append(pageSection);
        await pageSection.setData(section, this.pageConfig);
        // const anchorName = section.anchorName;
        // if (anchorName) {
        //   anchors.push({
        //     name: anchorName,
        //     sectionElm: pageSection
        //   });
        // }
      }
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
