import {
  Container,
  ControlElement,
  customElements,
  HStack,
  Label,
  Module,
  Panel,
  Progress,
  Styles,
  VStack
} from "@ijstech/components";
import { IPageData, IPageSection } from "./interface";
import { generateUUID } from './utils';
import styleClass from "./sliderBody.css";
import { ViewrSection } from "./section";
const Theme = Styles.Theme.ThemeVars;

type pageChangeCallback = (page: IPageData) => void;

interface ViewerSlideBodyElement extends ControlElement {
  onUpdatePage: pageChangeCallback;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['sc-page-viewer-slide-body']: ViewerSlideBodyElement;
    }
  }
}

@customElements('sc-page-viewer-slide-body')
export class ViewrSlideBody extends Module {
  private pnlSections: VStack;
  private pnlNavigation: Panel;
  private pnlWrapper: Panel;
  private currentSection: ViewrSection;
  private pnlProgress: Panel;
  private wheelProgress: Progress;
  private sectionLb: Label;

  private currentScrollY: number = 0;
  private sections: IPageSection[];
  private curSectIndex: number = 0;
  private navMapper: Map<number, HStack>;
  private scrollTimer: any;
  public onUpdatePage: pageChangeCallback;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    this.onKeyHandler = this.onKeyHandler.bind(this);
    this.onScrollHandler = this.onScrollHandler.bind(this);
  };


  async setSections(sections: IPageSection[]) {
    this.sections = sections;
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
    for (let i = 0; i < this.sections.length; i++) {
      const section = this.sections[i];
      const { image = '', backgroundColor = '', margin, maxWidth = 1024, customTextColor, textColor, customBackground } = section?.config || {};
      const { x = 'auto', y = 0 } = margin || {};
      const pageSection = (
        <sc-page-viewer-section
          id={section.id}
          display="block"
          background={{ image, color: `var(--custom-background-color, var(--background-main))`}}
          font={{color: `var(--custom-text-color, var(--text-primary))`}}
          containerSize={{width: maxWidth.toString()}}
          width="100%" minHeight="100vh" height="100%"
          margin={{top: y, bottom: y, left: x, right: x}}
          mediaQueries={[
            {
              maxWidth: '767px',
              properties: {
                padding: {left: '1rem', right: '1rem'}
              }
            }
          ]}
        ></sc-page-viewer-section>);
      if (customTextColor && textColor)
        pageSection.style.setProperty('--custom-text-color', textColor);
      if (customBackground && backgroundColor)
        pageSection.style.setProperty('--custom-background-color', backgroundColor);
      this.pnlSections.append(pageSection);
      await pageSection.setData(section);
    }
    this.initEventListeners();
    this.renderNavigation();
    this.showSlide(this.curSectIndex)
  }

  private renderNavigation() {
    this.navMapper = new Map();
    this.pnlNavigation.clearInnerHTML();
    const length = this.sections.length;
    for (let i = 0; i < length; i++) {
      const navItem = (
        <i-hstack
          border={{radius: 2}}
          background={{color: Theme.colors.primary.light}}
          height={6}
          class={`nav-item ${this.curSectIndex === i ? 'is-actived' : ''}`}
        ></i-hstack>
      )
      this.pnlNavigation.appendChild(navItem);
      this.navMapper.set(i, navItem);
    }
  }

  private initEventListeners() {
    if (this.sections?.length) {
      this.pnlWrapper.addEventListener("wheel", this.onScrollHandler);
      document.addEventListener("keydown", this.onKeyHandler);
    } else {
      this.pnlWrapper.removeEventListener("wheel", this.onScrollHandler);
      document.removeEventListener("keydown", this.onKeyHandler);
    }
  }

  onHide(): void {
    this.pnlWrapper.removeEventListener("wheel", this.onScrollHandler);
    document.removeEventListener("keydown", this.onKeyHandler);
  }

  private onScrollHandler = (event: any) => {
    event.preventDefault();
    if (this.scrollTimer) clearTimeout(this.scrollTimer);
    this.scrollTimer = setTimeout(() => {
      if (this.currentScrollY !== 0) this.resetProgress();
    }, 1000);

    this.currentSection && this.currentSection.classList.remove('slide-bounce');
    const deltaY = event.deltaY;
    const canNotMove = deltaY > 0 && this.curSectIndex === this.sections.length - 1 ||
      deltaY < 0 && this.curSectIndex === 0;
    if (canNotMove) {
      this.currentSection && this.currentSection.classList.add('slide-bounce');
      return;
    }
    this.currentScrollY += Math.abs(deltaY);
    this.updateProgress();
    const threshold = 50;
    const parentH = this.pnlWrapper.offsetHeight;
    const newPos = parentH - this.currentScrollY;
    if (newPos < threshold && deltaY > 0) {
      this.goToNextSlide();
      this.resetProgress();
    } else if (newPos < threshold && deltaY < 0) {
      this.goToPrevSlide();
      this.resetProgress();
    }
  }

  private updateProgress() {
    this.pnlProgress.opacity = 1;
    const percent = (this.currentScrollY / this.pnlWrapper.offsetHeight) * 100;
    this.wheelProgress.percent = percent;
  }

  private resetProgress() {
    this.pnlProgress.opacity = 0;
    this.wheelProgress.percent = 0;
    this.currentScrollY = 0;
  }

  private onKeyHandler(event: KeyboardEvent) {
    if (event.key === "ArrowUp") {
      this.goToPrevSlide();
    } else if (event.key === "ArrowDown") {
      this.goToNextSlide();
    }
  }

  private goToNextSlide() {
    if (this.curSectIndex < this.sections.length - 1) {
      this.showSlide(this.curSectIndex + 1);
    }
  }

  private goToPrevSlide() {
    if (this.curSectIndex > 0) {
      this.showSlide(this.curSectIndex - 1);
    }
  }

  private showSlide(index: number) {
    const oldNav = this.navMapper.get(this.curSectIndex);
    if (oldNav) oldNav.classList.remove('is-actived');
    this.curSectIndex = index;
    const newNav = this.navMapper.get(this.curSectIndex);
    if (newNav) newNav.classList.add('is-actived');
    const sections = Array.from(this.querySelectorAll('sc-page-viewer-section'));
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i] as ViewrSection;
      if (index === i) {
        const translateY = `${100 * (-index)}%`;
        this.pnlWrapper.style.setProperty('--translateY', translateY);
        section.style.transform = `translateY(${translateY})`;
        section.classList.add('slide-active');
        this.currentSection = section;
      } else {
        section.style.transform = `translateY(100%)`;
        section.classList.remove('slide-active');
      }
    }
  }

  clearSections() {
    if (this.pnlSections)
      this.pnlSections.clearInnerHTML();
    this.curSectIndex = 0;
    this.currentSection && this.currentSection.classList.remove('slide-bounce');
  }

  render() {
    return (
      <i-panel
        id="pnlWrapper"
        class={styleClass}
        width="100%" height="100vh"
        overflow={'hidden'}
      >
        <i-vstack
          id={'pnlSections'}
          width="100%"
          height="100%"
          overflow={'hidden'}
          class="pnl-sections"
        ></i-vstack>
        <i-hstack
          id="pnlNavigation"
          width="100%" zIndex={10}
          class="pnl-navigation"
        ></i-hstack>
        <i-hstack
          verticalAlignment="center"
          horizontalAlignment="center"
          top="inherit" bottom="10px"
          width="100%"
          zIndex={12}
        >
          <i-hstack
            id="pnlProgress"
            gap="4px" verticalAlignment="center" horizontalAlignment="center"
            border={{radius: '0.375rem'}}
            background={{ color: Theme.background.default }}
            height={40} maxWidth={450}
            padding={{left: '1rem', right: '1rem'}}
          >
            <i-progress
              id="wheelProgress"
              type="circle"
              width={20} height={20}
              strokeWidth={2}
              percent={0}
              strokeColor={Theme.colors.primary.main}
            ></i-progress>
            <i-label id="sectionLb" caption="" visible={false}></i-label>
          </i-hstack>
        </i-hstack>
      </i-panel>
    );
  }
}
