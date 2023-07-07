var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-page-viewer/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HeaderType = void 0;
    var HeaderType;
    (function (HeaderType) {
        HeaderType["COVER"] = "cover";
        HeaderType["LARGE"] = "largeBanner";
        HeaderType["NORMAL"] = "banner";
        HeaderType["TITLE"] = "titleOnly";
    })(HeaderType = exports.HeaderType || (exports.HeaderType = {}));
    ;
});
define("@scom/scom-page-viewer/paging.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.default = components_1.Styles.style({
        $nest: {
            '.raise:hover': {
                boxShadow: `0 0.5em 0.5em -0.4em ${Theme.colors.primary.main}`,
                transform: 'translateY(-0.25em)'
            },
            '.cut-text span': {
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                display: 'inline-block',
                width: '100%'
            },
            '.shadow': {
                boxShadow: '0px 1px 2px rgb(0 0 0 / 12%)'
            }
        }
    });
});
define("@scom/scom-page-viewer/paging.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-page-viewer/paging.css.ts"], function (require, exports, components_2, paging_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ViewerPaging = void 0;
    let ViewerPaging = class ViewerPaging extends components_2.Module {
        constructor() {
            super(...arguments);
            this._visiblePagesData = [];
            this.currentPageIndex = 0;
            this.prevPageNotExist = true;
            this.nextPageNotExist = true;
        }
        async setPaging(pages, currPage) {
            this._visiblePagesData = pages.filter(element => element.visible == true);
            let currentPageURL;
            if (currPage == undefined) {
                let isCurrentPageActive = this._visiblePagesData.includes(this._currentPageData);
                currentPageURL = isCurrentPageActive ? this._currentPageData.url : "nullUrl";
            }
            else {
                this._currentPageData = currPage;
                currentPageURL = currPage.url;
            }
            this.currentPageIndex = this._visiblePagesData.findIndex(element => element.url == currentPageURL);
            this.prevPageNotExist = (this.currentPageIndex == 0 || this.currentPageIndex == -1);
            this.nextPageNotExist = (this.currentPageIndex == this._visiblePagesData.length - 1 || this.currentPageIndex == -1);
            this.renderUI();
        }
        setVisible(visible) {
            this.visible = visible;
        }
        async renderUI() {
            if (this._visiblePagesData == undefined)
                return;
            this.prevPageWrapper.visible = this.prevPageNotExist ? false : true;
            this.nextPageWrapper.visible = this.nextPageNotExist ? false : true;
            if (this.prevPageNotExist && this.nextPageNotExist) {
                this.prevPageWrapper.width = '0%';
                this.nextPageWrapper.width = '0%';
            }
            else if (this.prevPageNotExist) {
                this.prevPageWrapper.width = '0%';
                this.nextPageWrapper.width = '100%';
            }
            else if (this.nextPageNotExist) {
                this.prevPageWrapper.width = '100%';
                this.nextPageWrapper.width = '0%';
            }
            else {
                this.prevPageWrapper.width = '50%';
                this.nextPageWrapper.width = '50%';
            }
            if (this.currentPageIndex != -1) {
                this.prevPageLabel.caption = this.prevPageNotExist ? "" : this._visiblePagesData[this.currentPageIndex - 1].name;
                this.nextPageLabel.caption = this.nextPageNotExist ? "" : this._visiblePagesData[this.currentPageIndex + 1].name;
            }
        }
        navToPrevPage() {
            if (this.prevPageNotExist || this.currentPageIndex == -1)
                return;
            if (this.onPrevPage) {
                this.onPrevPage(this._visiblePagesData[this.currentPageIndex - 1]);
            }
        }
        navToNextPage() {
            if (this.nextPageNotExist || this.currentPageIndex == -1)
                return;
            if (this.onNextPage) {
                this.onNextPage(this._visiblePagesData[this.currentPageIndex + 1]);
            }
        }
        render() {
            return (this.$render("i-hstack", { id: "paging-container", class: paging_css_1.default, padding: { left: '15px', top: '10px', right: '15px', bottom: '10px' }, height: 'auto', width: '100%', justifyContent: "space-between", gap: "15px" },
                this.$render("i-hstack", { id: "prevPageWrapper", width: '50%', height: '85px' },
                    this.$render("i-hstack", { id: "prevPage", class: "pointer raise shadow", width: '100%', height: "100%", onClick: this.navToPrevPage.bind(this), border: { radius: '4px', width: '1px', style: 'solid', color: 'rgba(227,232,237,1.00)' }, padding: { top: '16px', right: '16px', bottom: '16px', left: '16px' }, verticalAlignment: "center", justifyContent: "space-between" },
                        this.$render("i-icon", { name: "arrow-left", width: '20px', height: '20px', margin: { right: '20px' } }),
                        this.$render("i-vstack", { height: "100%", maxWidth: "70%", gap: "7px", horizontalAlignment: 'end' },
                            this.$render("i-label", { caption: "Previous", font: { color: 'grey', size: "12px" } }),
                            this.$render("i-label", { id: 'prevPageLabel', maxWidth: '100%', class: "cut-text", caption: "prevPage", font: { name: "roboto", size: "20px" } })))),
                this.$render("i-hstack", { id: "nextPageWrapper", width: '50%', height: '85px' },
                    this.$render("i-hstack", { id: "nextPage", class: "pointer raise shadow", width: '100%', height: "100%", onClick: this.navToNextPage.bind(this), border: { radius: '4px', width: '1px', style: 'solid', color: 'rgba(227,232,237,1.00)' }, padding: { top: '16px', right: '16px', bottom: '16px', left: '16px' }, verticalAlignment: "center", justifyContent: "space-between" },
                        this.$render("i-vstack", { height: "100%", maxWidth: "70%", gap: "7px", horizontalAlignment: 'start' },
                            this.$render("i-label", { caption: "Next", font: { color: 'grey', size: "12px" } }),
                            this.$render("i-label", { id: 'nextPageLabel', maxWidth: '100%', class: "cut-text", caption: "nextPage", font: { name: "roboto", size: "20px" } })),
                        this.$render("i-icon", { name: "arrow-right", width: '20px', height: '20px', margin: { left: '20px' } })))));
        }
    };
    ViewerPaging = __decorate([
        (0, components_2.customElements)('sc-page-viewer-paging')
    ], ViewerPaging);
    exports.ViewerPaging = ViewerPaging;
});
define("@scom/scom-page-viewer/body.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = components_3.Styles.style({
        $nest: {
            '.anchor-item': {
                opacity: 0.85,
                $nest: {
                    '&:hover': {
                        opacity: 1
                    }
                }
            }
        }
    });
});
define("@scom/scom-page-viewer/body.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-page-viewer/body.css.ts"], function (require, exports, components_4, body_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ViewrBody = void 0;
    const Theme = components_4.Styles.Theme.ThemeVars;
    let ViewrBody = class ViewrBody extends components_4.Module {
        generateUUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        async setSections(sections) {
            this.sections = sections;
            if (this.pnlSections)
                this.pnlSections.clearInnerHTML();
            await this.renderSections();
        }
        async renderSections() {
            this.clearSections();
            if ((!this.sections || (this.sections && this.sections.length == 0))) {
                this.sections = [
                    {
                        id: this.generateUUID(),
                        row: 0,
                        elements: []
                    }
                ];
            }
            // let anchors: { name: string, sectionElm: any }[] = [];
            for (const section of this.sections) {
                const { image = '', backgroundColor = '', margin, maxWidth } = (section === null || section === void 0 ? void 0 : section.config) || {};
                const { x = 'auto', y = 0 } = margin || {};
                const pageSection = (this.$render("sc-page-viewer-section", { id: section.id, display: "block", background: { image, color: backgroundColor }, maxWidth: maxWidth || '100%', width: "100%", margin: { top: y, bottom: y, left: x, right: x }, padding: { left: '3rem', right: '3rem' }, mediaQueries: [
                        {
                            maxWidth: '767px',
                            properties: {
                                padding: { left: '1rem', right: '1rem' }
                            }
                        }
                    ] }));
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
        async setPaging(pages, currPage) {
            await this.viewerPaging.setPaging(pages, currPage);
        }
        setPagingVisibility(pagingVisible) {
            this.viewerPaging.setVisible(pagingVisible);
        }
        render() {
            return (this.$render("i-panel", { class: body_css_1.default, height: '100%' },
                this.$render("i-vstack", { id: 'pnlSections', alignItems: "center", padding: {} }),
                this.$render("sc-page-viewer-paging", { id: "viewerPaging", visible: false, onPrevPage: this.onUpdatePage.bind(this), onNextPage: this.onUpdatePage.bind(this) })));
        }
    };
    ViewrBody = __decorate([
        (0, components_4.customElements)('sc-page-viewer-body')
    ], ViewrBody);
    exports.ViewrBody = ViewrBody;
});
define("@scom/scom-page-viewer/footer.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ViewerFooter = void 0;
    let ViewerFooter = class ViewerFooter extends components_5.Module {
        constructor(parent) {
            super(parent);
        }
        async init() {
            super.init();
        }
        get data() {
            return this._data;
        }
        set data(value) {
            this._data = value;
            this.renderFooter();
        }
        async renderFooter() {
            if (!this.data || !this.pnlFooter)
                return;
            this.pnlFooter.clearInnerHTML();
            const { image, elements } = this.data;
            this.pnlFooter.background = { image: image };
            for (const element of elements) {
                const pageElement = (this.$render("sc-page-viewer-page-element", null));
                this.pnlFooter.append(pageElement);
                await pageElement.setData(element);
            }
        }
        render() {
            return (this.$render("i-panel", { id: "pnlFooter", position: "relative", width: "100%" }));
        }
    };
    ViewerFooter = __decorate([
        (0, components_5.customElements)('sc-page-viewer-footer')
    ], ViewerFooter);
    exports.ViewerFooter = ViewerFooter;
});
define("@scom/scom-page-viewer/store.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.maxContainerWidths = exports.getDefaultDisplaySettings = exports.getTheme = exports.setTheme = exports.getRootDir = exports.setRootDir = exports.state = void 0;
    exports.state = {
        rootDir: '',
        theme: 'light'
    };
    const setRootDir = (value) => {
        exports.state.rootDir = value || '';
    };
    exports.setRootDir = setRootDir;
    const getRootDir = () => {
        return exports.state.rootDir;
    };
    exports.getRootDir = getRootDir;
    const setTheme = (value) => {
        exports.state.theme = value !== null && value !== void 0 ? value : 'light';
    };
    exports.setTheme = setTheme;
    const getTheme = () => {
        var _a;
        return (_a = exports.state.theme) !== null && _a !== void 0 ? _a : 'light';
    };
    exports.getTheme = getTheme;
    const getDefaultDisplaySettings = () => {
        return [{
                maxWidth: 767,
                properties: {
                    column: 1,
                    columnSpan: 12
                }
            }];
    };
    exports.getDefaultDisplaySettings = getDefaultDisplaySettings;
    exports.maxContainerWidths = {
        sm: 540,
        md: 720,
        lg: 960,
        xl: 1140
    };
});
define("@scom/scom-page-viewer/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_6.Styles.Theme.ThemeVars;
    const spin = components_6.Styles.keyframes({
        "to": {
            "-webkit-transform": "rotate(360deg)"
        }
    });
    exports.default = components_6.Styles.style({
        $nest: {
            '.spinner': {
                display: "inline-block",
                width: "50px",
                height: "50px",
                border: "3px solid rgba(255,255,255,.3)",
                borderRadius: "50%",
                borderTopColor: Theme.colors.primary.main,
                "animation": `${spin} 1s ease-in-out infinite`,
                "-webkit-animation": `${spin} 1s ease-in-out infinite`
            }
        }
    });
});
define("@scom/scom-page-viewer/pageElement.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-page-viewer/store.ts"], function (require, exports, components_7, store_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ViewrPageElement = void 0;
    let ViewrPageElement = class ViewrPageElement extends components_7.Module {
        constructor(parent, options) {
            super(parent, options);
            this.module = null;
            this.observerOptions = {
                root: null,
                rootMargin: "0px"
            };
            this.observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(async (entry) => {
                    if (entry.isIntersecting) {
                        if (!this.module.isConnected)
                            await this.module.ready();
                        if (this.module.getConfigurators) {
                            const { properties, tag } = this.data;
                            const rootDir = (0, store_1.getRootDir)();
                            const builderTarget = this.module.getConfigurators().find(conf => conf.target === 'Builders');
                            if (builderTarget) {
                                if (builderTarget.setRootDir)
                                    builderTarget.setRootDir(rootDir);
                                if (builderTarget.setData)
                                    await builderTarget.setData(properties);
                                if (builderTarget.setRootParent)
                                    builderTarget.setRootParent(this.closest('sc-page-viewer-section'));
                                if (tag && builderTarget.setTag) {
                                    const newTag = Object.assign(Object.assign({}, tag), { width: '100%' });
                                    await builderTarget.setTag(newTag);
                                }
                            }
                        }
                        const parentElm = this.closest('i-scom-page-viewer');
                        const themeVar = parentElm && parentElm.style.getPropertyValue('--viewer-theme');
                        this.module.theme = themeVar || 'light';
                        observer.unobserve(entry.target);
                    }
                });
            }, this.observerOptions);
        }
        ;
        async setData(pageElement) {
            if (!this.pnlElement)
                return;
            this.pnlElement.clearInnerHTML();
            this.data = pageElement;
            const { elements, module: moduleData } = this.data;
            // this.pnlElement.id = id;
            // const rootDir = getRootDir();
            if (elements === null || elements === void 0 ? void 0 : elements.length) {
                for (const element of elements) {
                    const pnlElm = (this.$render("sc-page-viewer-page-element", { id: element.id, display: "block" }));
                    this.pnlElement.append(pnlElm);
                    await pnlElm.setData(element);
                }
            }
            else if (moduleData === null || moduleData === void 0 ? void 0 : moduleData.path) {
                // let module: any = await this.getEmbedElement(rootDir, this.data.module.path);
                let module = await components_7.application.createElement(moduleData.path);
                if (module) {
                    this.pnlElement.append(module);
                    this.module = module;
                    module.style.display = 'block';
                    module.maxWidth = '100%';
                    module.maxHeight = '100%';
                    this.observer.observe(module);
                }
            }
        }
        render() {
            return (this.$render("i-panel", { id: "pnlElement" }));
        }
    };
    ViewrPageElement = __decorate([
        (0, components_7.customElements)('sc-page-viewer-page-element')
    ], ViewrPageElement);
    exports.ViewrPageElement = ViewrPageElement;
});
define("@scom/scom-page-viewer/utils.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GAP_WIDTH = exports.DEFAULT_MAX_COLUMN = exports.getSCConfigByCodeCid = exports.fetchFileContentByCid = exports.IPFS_SCOM_URL = void 0;
    ///<amd-module name='@scom/scom-page-viewer/utils.ts'/> 
    const IPFS_SCOM_URL = "https://ipfs.scom.dev/ipfs";
    exports.IPFS_SCOM_URL = IPFS_SCOM_URL;
    async function fetchFileContentByCid(ipfsCid) {
        let response;
        try {
            response = await fetch(`${IPFS_SCOM_URL}/${ipfsCid}`);
        }
        catch (err) {
            const IPFS_Gateway = 'https://ipfs.io/ipfs/{CID}';
            response = await fetch(IPFS_Gateway.replace('{CID}', ipfsCid));
        }
        return response;
    }
    exports.fetchFileContentByCid = fetchFileContentByCid;
    ;
    async function getSCConfigByCodeCid(codeCid) {
        let scConfig;
        try {
            let scConfigRes = await fetchFileContentByCid(`${codeCid}/dist/scconfig.json`);
            if (scConfigRes)
                scConfig = await scConfigRes.json();
        }
        catch (err) { }
        return scConfig;
    }
    exports.getSCConfigByCodeCid = getSCConfigByCodeCid;
    const DEFAULT_MAX_COLUMN = 12;
    exports.DEFAULT_MAX_COLUMN = DEFAULT_MAX_COLUMN;
    const GAP_WIDTH = 15;
    exports.GAP_WIDTH = GAP_WIDTH;
});
define("@scom/scom-page-viewer/section.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-page-viewer/utils.ts", "@scom/scom-page-viewer/store.ts"], function (require, exports, components_8, utils_1, store_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ViewrSection = void 0;
    let ViewrSection = class ViewrSection extends components_8.Module {
        get size() {
            return this._size || {};
        }
        set size(value) {
            this._size = value;
            this.updateContainerSize();
        }
        clear() {
            this.pnlSection.clearInnerHTML();
        }
        async init() {
            super.init();
            this.size = this.getAttribute('containerSize', true, {});
        }
        updateContainerSize() {
            const sizeWidth = this.size.width || 'none';
            const sizeHeight = this.size.height || 'none';
            if (this.pnlSection) {
                this.pnlSection.maxWidth = sizeWidth;
                this.pnlSection.maxHeight = sizeHeight;
            }
        }
        async setData(sectionData) {
            const { elements = [], config = {} } = sectionData;
            this.sectionData = JSON.parse(JSON.stringify(sectionData));
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                const pageElement = (this.$render("sc-page-viewer-page-element", { display: "block", class: "is-parent" }));
                pageElement.id = element.id;
                this.updateElementConfig(pageElement, element, i);
                this.pnlSection.append(pageElement);
                await pageElement.setData(element);
            }
            this.updateAlign(config);
        }
        updateElementConfig(el, data, index) {
            const { column, columnSpan, displaySettings = (0, store_2.getDefaultDisplaySettings)() } = data;
            el.grid = { column, columnSpan };
            el.style.gridRow = '1';
            if (displaySettings === null || displaySettings === void 0 ? void 0 : displaySettings.length) {
                let mediaQueries = [];
                for (let displaySetting of displaySettings) {
                    const { minWidth = 0, maxWidth = 0, properties: grid } = displaySetting;
                    if (!grid.row && grid.column && grid.columnSpan && grid.column + grid.columnSpan === utils_1.DEFAULT_MAX_COLUMN + 1) {
                        grid.row = 1 + index;
                    }
                    const mediaQuery = { properties: { grid, width: '100%' } };
                    if (minWidth)
                        mediaQuery.minWidth = !isNaN(+minWidth) ? `${+minWidth}px` : minWidth;
                    if (maxWidth)
                        mediaQuery.maxWidth = !isNaN(+maxWidth) ? `${+maxWidth}px` : maxWidth;
                    mediaQueries.push(mediaQuery);
                    // if (/^\>/.test(key)) {
                    //   minWidth = key.replace('>', '').trim();
                    //   mediaQueries.push({
                    //     minWidth: !isNaN(+minWidth) ? `${+minWidth}px` : minWidth,
                    //     properties
                    //   })
                    // } else if (/^\</.test(key)) {
                    //   maxWidth = key.replace('<', '').trim();
                    //   mediaQueries.push({
                    //     maxWidth: !isNaN(+maxWidth) ? `${+maxWidth}px` : maxWidth,
                    //     properties
                    //   })
                    // } else if (/^\d+\-\d+$/.test(key)) {
                    //   const data = key.split('-');
                    //   minWidth = data[0].trim();
                    //   maxWidth = data[1].trim();
                    //   mediaQueries.push({
                    //     minWidth: !isNaN(+minWidth) ? `${+minWidth}px` : minWidth,
                    //     maxWidth: !isNaN(+maxWidth) ? `${+maxWidth}px` : maxWidth,
                    //     properties
                    //   })
                    // }
                }
                el.mediaQueries = mediaQueries;
            }
        }
        updateAlign(config) {
            const { align = 'left' } = config;
            let alignValue = 'start';
            switch (align) {
                case 'right':
                    alignValue = 'end';
                    break;
                case 'center':
                    alignValue = 'center';
                    break;
            }
            if (alignValue !== 'start') {
                this.pnlSection.grid = { horizontalAlignment: alignValue };
                this.pnlSection.style.maxWidth = '100%';
                this.pnlSection.style.gridTemplateColumns = 'min-content';
                const sections = Array.from(this.pnlSection.querySelectorAll('.is-parent'));
                const sectionWidth = this.pnlSection.offsetWidth;
                const sectionDatas = this.sectionData.elements || [];
                const gridColWidth = (sectionWidth - utils_1.GAP_WIDTH * (utils_1.DEFAULT_MAX_COLUMN - 1)) / utils_1.DEFAULT_MAX_COLUMN;
                const unitWidth = Number((1 / utils_1.DEFAULT_MAX_COLUMN).toFixed(3)) * 100;
                for (let i = 0; i < sections.length; i++) {
                    const section = sections[i];
                    if (sectionWidth <= store_2.maxContainerWidths.sm) {
                        section.style.width = '100%';
                        continue;
                    }
                    const sectionData = sectionDatas[i]; // sectionDatas.find(sec => section.id === sec.id);
                    const columnSpan = (sectionData === null || sectionData === void 0 ? void 0 : sectionData.columnSpan) || 1;
                    const widthNumber = columnSpan * gridColWidth + ((columnSpan - 1) * utils_1.GAP_WIDTH);
                    section.style.width = widthNumber ? `${widthNumber}px` : `${columnSpan * unitWidth}%`;
                    section.style.maxWidth = '100%';
                }
            }
        }
        render() {
            return (this.$render("i-grid-layout", { id: "pnlSection", width: "100%", height: "100%", maxWidth: "100%", maxHeight: "100%", position: "relative", overflow: 'hidden', gap: { column: 15, row: 15 }, templateColumns: [`repeat(${utils_1.DEFAULT_MAX_COLUMN}, minmax(${utils_1.GAP_WIDTH}px, 1fr))`], padding: { top: '1.5rem', bottom: '1.5rem' }, mediaQueries: [
                    {
                        maxWidth: '767px',
                        properties: {
                            templateColumns: [`repeat(${utils_1.DEFAULT_MAX_COLUMN}, minmax(${utils_1.GAP_WIDTH}px, 1fr))`]
                        }
                    }
                ] }));
        }
    };
    ViewrSection = __decorate([
        (0, components_8.customElements)('sc-page-viewer-section')
    ], ViewrSection);
    exports.ViewrSection = ViewrSection;
});
define("@scom/scom-page-viewer/sidebar.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_9.Styles.Theme.ThemeVars;
    exports.default = components_9.Styles.style({
        borderRight: `1px solid ${Theme.divider}`,
        $nest: {
            'i-tree-node.is-checked > .i-tree-node_children': {
                marginLeft: '20px'
            },
            '.i-tree-node': {
                $nest: {
                    '&.invisible': {
                        display: 'none'
                    },
                    '.i-tree-node_content': {
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        height: '40px'
                    },
                    '.i-tree-node_icon': {
                        fill: 'black!important'
                    },
                }
            }
        }
    });
});
define("@scom/scom-page-viewer/sidebar.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-page-viewer/sidebar.css.ts"], function (require, exports, components_10, sidebar_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ViewerSidebar = void 0;
    let ViewerSidebar = class ViewerSidebar extends components_10.Module {
        constructor() {
            super(...arguments);
            this._treeData = [];
        }
        get treeData() {
            return this._treeData;
        }
        set treeData(value) {
            this._treeData = value;
            this.renderUI();
        }
        async renderUI() {
            this.tvMenu.clear();
            let fileNodes = {};
            let self = this;
            async function addFileNode(nodeData) {
                const name = nodeData.name;
                let idx = '';
                let items = nodeData.path.split('/');
                let node = null;
                for (let i = 0; i < items.length; i++) {
                    if (items[i]) {
                        idx = idx + '/' + items[i];
                        if (!fileNodes[idx]) {
                            node = await self.tvMenu.add(node, name);
                            if (!nodeData.visible)
                                node.classList.add('invisible');
                            fileNodes[idx] = node;
                            node.tag = nodeData;
                        }
                        else {
                            node = fileNodes[idx];
                        }
                        if (node)
                            node.expanded = true;
                    }
                }
            }
            for (let nodeData of this.treeData) {
                await addFileNode(nodeData);
            }
        }
        onActiveChange(parent, prevNode) {
            var _a;
            const page = (_a = parent.activeItem) === null || _a === void 0 ? void 0 : _a.tag;
            if (this.onTreeViewActiveChange) {
                this.onTreeViewActiveChange(page);
            }
        }
        resetActiveTreeNode() {
            this.tvMenu.activeItem = undefined;
        }
        render() {
            return (this.$render("i-panel", { class: sidebar_css_1.default, height: '100%' },
                this.$render("i-tree-view", { id: "tvMenu", class: "page-list", height: '100%', padding: { bottom: '20px' }, onActiveChange: this.onActiveChange })));
        }
    };
    ViewerSidebar = __decorate([
        (0, components_10.customElements)('sc-page-viewer-sidebar')
    ], ViewerSidebar);
    exports.ViewerSidebar = ViewerSidebar;
});
define("@scom/scom-page-viewer", ["require", "exports", "@ijstech/components", "@scom/scom-page-viewer/store.ts", "@scom/scom-page-viewer/index.css.ts", "@scom/scom-page-viewer/body.tsx", "@scom/scom-page-viewer/pageElement.tsx", "@scom/scom-page-viewer/section.tsx", "@scom/scom-page-viewer/sidebar.tsx", "@scom/scom-page-viewer/paging.tsx"], function (require, exports, components_11, store_3, index_css_1, body_1, pageElement_1, section_1, sidebar_1, paging_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ViewerPaging = exports.ViewerSidebar = exports.ViewrSection = exports.ViewrPageElement = exports.ViewrBody = void 0;
    Object.defineProperty(exports, "ViewrBody", { enumerable: true, get: function () { return body_1.ViewrBody; } });
    Object.defineProperty(exports, "ViewrPageElement", { enumerable: true, get: function () { return pageElement_1.ViewrPageElement; } });
    Object.defineProperty(exports, "ViewrSection", { enumerable: true, get: function () { return section_1.ViewrSection; } });
    Object.defineProperty(exports, "ViewerSidebar", { enumerable: true, get: function () { return sidebar_1.ViewerSidebar; } });
    Object.defineProperty(exports, "ViewerPaging", { enumerable: true, get: function () { return paging_1.ViewerPaging; } });
    const lightTheme = components_11.Styles.Theme.defaultTheme;
    const darkTheme = components_11.Styles.Theme.darkTheme;
    let Viewer = class Viewer extends components_11.Module {
        constructor() {
            super(...arguments);
            this.isLoaded = false;
            this._theme = 'light';
        }
        get theme() {
            var _a;
            return (_a = this._theme) !== null && _a !== void 0 ? _a : 'light';
        }
        set theme(value) {
            this._theme = value;
            this.setTheme(this.theme);
        }
        async onShow(options) {
            var _a, _b, _c;
            if (options === null || options === void 0 ? void 0 : options.theme) {
                this.setTheme(options.theme);
            }
            if (!this.isLoaded) {
                this.gridMain.templateColumns = ["1fr"];
                (0, store_3.setRootDir)(options === null || options === void 0 ? void 0 : options.rootDir);
                await this.setData((_a = options === null || options === void 0 ? void 0 : options._data) !== null && _a !== void 0 ? _a : options);
            }
            else if ((_b = options === null || options === void 0 ? void 0 : options._data) !== null && _b !== void 0 ? _b : options) {
                await this.renderPage((_c = options === null || options === void 0 ? void 0 : options._data) !== null && _c !== void 0 ? _c : options);
            }
        }
        async setData(data) {
            this._data = data;
            await this.renderPage(data);
            this.isLoaded = true;
        }
        setRootDir(value) {
            (0, store_3.setRootDir)(value);
        }
        setTheme(value) {
            this.style.setProperty('--viewer-theme', value);
            this.updateContainer();
            if (this._data) {
                this.renderPage(this._data);
            }
        }
        async renderPage(page) {
            const { header, footer, sections } = page;
            this.viewerFooter.data = footer;
            this.viewerFooter.visible = !!header;
            this.updateContainer();
            await this.viewerBody.setSections(sections);
        }
        getBackgroundColor() {
            return this.theme === 'light' ? lightTheme.background.main : darkTheme.background.main;
        }
        updateContainer() {
            var _a;
            if (this.pnlContainer) {
                const defaultColor = this.getBackgroundColor();
                const { backgroundColor = defaultColor, margin, maxWidth } = ((_a = this._data) === null || _a === void 0 ? void 0 : _a.config) || {};
                this.pnlContainer.background = { color: backgroundColor };
                this.pnlContainer.maxWidth = maxWidth || 1280;
                const { x = 'auto', y = 8 } = margin || {};
                this.pnlContainer.margin = { top: y, bottom: y, left: x, right: x };
            }
        }
        render() {
            return (this.$render("i-vstack", { id: "pnlContainer", class: `sc-page-viewer-container ${index_css_1.default}`, width: "100%", height: "100%" },
                this.$render("i-panel", { stack: { grow: "1" }, overflow: "hidden" },
                    this.$render("i-vstack", { id: "pnlLoading", height: "100%", horizontalAlignment: "center", verticalAlignment: "center", padding: { top: "1rem", bottom: "1rem", left: "1rem", right: "1rem" }, visible: false },
                        this.$render("i-panel", { class: 'spinner' })),
                    this.$render("i-grid-layout", { id: "gridMain", height: "100%", templateColumns: ["1fr"] },
                        this.$render("sc-page-viewer-body", { id: "viewerBody", overflow: "auto", onUpdatePage: this.renderPage.bind(this) })),
                    this.$render("sc-page-viewer-footer", { id: "viewerFooter", visible: false }))));
        }
    };
    Viewer = __decorate([
        components_11.customModule,
        (0, components_11.customElements)('i-scom-page-viewer')
    ], Viewer);
    exports.default = Viewer;
});
