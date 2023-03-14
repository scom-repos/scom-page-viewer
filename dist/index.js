var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/secure-page-viewer/interface.ts", ["require", "exports"], function (require, exports) {
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
define("@scom/secure-page-viewer/header.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_1.Styles.Theme.ThemeVars;
    components_1.Styles.cssRule('#pnlHeader', {
        backgroundSize: 'cover',
        $nest: {}
    });
});
define("@scom/secure-page-viewer/header.tsx", ["require", "exports", "@ijstech/components", "@scom/secure-page-viewer/interface.ts", "@scom/secure-page-viewer/header.css.ts"], function (require, exports, components_2, interface_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ViewerHeader = void 0;
    let ViewerHeader = class ViewerHeader extends components_2.Module {
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
            this.renderHeader();
        }
        async renderHeader() {
            if (!this.data || !this.pnlHeader)
                return;
            this.pnlHeader.clearInnerHTML();
            const { headerType, image, elements } = this.data;
            switch (headerType) {
                case interface_1.HeaderType.COVER:
                    this.pnlHeader.height = '100vh';
                    this.pnlHeader.background = { image };
                    break;
                case interface_1.HeaderType.LARGE:
                    this.pnlHeader.height = 520;
                    this.pnlHeader.background = { image };
                    break;
                case interface_1.HeaderType.NORMAL:
                    this.pnlHeader.height = 340;
                    this.pnlHeader.background = { image };
                    break;
                case interface_1.HeaderType.TITLE:
                    this.pnlHeader.height = 180;
                    break;
            }
            for (const element of elements) {
                const pageElement = (this.$render("sc-page-viewer-page-element", null));
                this.pnlHeader.append(pageElement);
                await pageElement.setData(element);
            }
        }
        render() {
            return (this.$render("i-panel", { id: "pnlHeader", position: "relative", width: "100%", class: "header" }));
        }
    };
    ViewerHeader = __decorate([
        components_2.customElements('sc-page-viewer-header')
    ], ViewerHeader);
    exports.ViewerHeader = ViewerHeader;
});
define("@scom/secure-page-viewer/paging.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_3.Styles.Theme.ThemeVars;
    exports.default = components_3.Styles.style({
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
define("@scom/secure-page-viewer/paging.tsx", ["require", "exports", "@ijstech/components", "@scom/secure-page-viewer/paging.css.ts"], function (require, exports, components_4, paging_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ViewerPaging = void 0;
    let ViewerPaging = class ViewerPaging extends components_4.Module {
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
        components_4.customElements('sc-page-viewer-paging')
    ], ViewerPaging);
    exports.ViewerPaging = ViewerPaging;
});
define("@scom/secure-page-viewer/body.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = components_5.Styles.style({
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
define("@scom/secure-page-viewer/body.tsx", ["require", "exports", "@ijstech/components", "@scom/secure-page-viewer/body.css.ts"], function (require, exports, components_6, body_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ViewrBody = void 0;
    const Theme = components_6.Styles.Theme.ThemeVars;
    let ViewrBody = class ViewrBody extends components_6.Module {
        constructor() {
            super(...arguments);
            this.onScrollListener = () => {
                const currentScroll = window.pageYOffset;
                const mainHeader = document.querySelector('main-header');
                const hHeight = (mainHeader === null || mainHeader === void 0 ? void 0 : mainHeader.clientHeight) || 0;
                if (currentScroll > hHeight) {
                    this.archorElm.top = 0;
                }
                else {
                    this.archorElm.top = hHeight - currentScroll;
                }
            };
        }
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
            let anchors = [];
            for (const section of this.sections) {
                const { image, backgroundColor } = section;
                const pageSection = (this.$render("sc-page-viewer-section", { id: section.id, background: { image, color: backgroundColor } }));
                this.pnlSections.append(pageSection);
                await pageSection.setData(section.elements);
                const anchorName = section.anchorName;
                if (anchorName) {
                    anchors.push({
                        name: anchorName,
                        sectionElm: pageSection
                    });
                }
            }
            this.updateAnchors(anchors);
        }
        updateAnchors(anchors) {
            this.archorElm.clearInnerHTML();
            if (anchors && anchors.length) {
                for (let i = 0; i < anchors.length; i++) {
                    const anchor = anchors[i];
                    if (i > 0) {
                        this.archorElm.appendChild(this.$render("i-panel", { width: 1, height: 16, display: "block", background: { color: Theme.divider } }));
                    }
                    this.archorElm.appendChild(this.$render("i-label", { caption: anchor.name, class: "pointer anchor-item", onClick: () => this.onScrollToRow(anchor.sectionElm) }));
                }
                this.archorElm.visible = true;
                this.archorElm.display = 'flex';
                this.pnlSections.padding.top = (this.archorElm.clientHeight > 45 ? this.archorElm.clientHeight : 45) + 12;
                window.addEventListener("scroll", this.onScrollListener);
            }
            else {
                this.pnlSections.padding.top = 12;
                this.archorElm.visible = false;
                window.removeEventListener("scroll", this.onScrollListener);
            }
        }
        onScrollToRow(rowElm) {
            if (rowElm) {
                const _offsetTop = rowElm.getBoundingClientRect().top + window.pageYOffset - this.archorElm.offsetHeight;
                window.scrollTo({ top: _offsetTop, behavior: 'smooth' });
            }
        }
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
                this.$render("i-hstack", { id: 'archorElm', display: "flex", background: { color: Theme.background.default }, zIndex: 9999, gap: 10, verticalAlignment: "center", horizontalAlignment: "center", wrap: "wrap", position: "fixed", width: "100%", padding: { left: 50, right: 50, top: 10, bottom: 10 } }),
                this.$render("i-vstack", { id: 'pnlSections', alignItems: "center", padding: { bottom: 50 } }),
                this.$render("sc-page-viewer-paging", { id: "viewerPaging", visible: false, onPrevPage: this.onUpdatePage.bind(this), onNextPage: this.onUpdatePage.bind(this) })));
        }
    };
    ViewrBody = __decorate([
        components_6.customElements('sc-page-viewer-body')
    ], ViewrBody);
    exports.ViewrBody = ViewrBody;
});
define("@scom/secure-page-viewer/footer.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ViewerFooter = void 0;
    let ViewerFooter = class ViewerFooter extends components_7.Module {
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
        components_7.customElements('sc-page-viewer-footer')
    ], ViewerFooter);
    exports.ViewerFooter = ViewerFooter;
});
define("@scom/secure-page-viewer/store/index.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getRootDir = exports.setRootDir = exports.state = void 0;
    ///<amd-module name='@scom/secure-page-viewer/store/index.ts'/> 
    exports.state = {
        rootDir: ''
    };
    const setRootDir = (value) => {
        exports.state.rootDir = value || '';
    };
    exports.setRootDir = setRootDir;
    const getRootDir = () => {
        return exports.state.rootDir;
    };
    exports.getRootDir = getRootDir;
});
define("@scom/secure-page-viewer/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_8.Styles.Theme.ThemeVars;
    const spin = components_8.Styles.keyframes({
        "to": {
            "-webkit-transform": "rotate(360deg)"
        }
    });
    exports.default = components_8.Styles.style({
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
define("@scom/secure-page-viewer/utils.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSCConfigByCodeCid = exports.fetchFileContentByCid = exports.IPFS_SCOM_URL = void 0;
    ///<amd-module name='@scom/secure-page-viewer/utils.ts'/> 
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
});
define("@scom/secure-page-viewer/pageElement.tsx", ["require", "exports", "@ijstech/components", "@scom/secure-page-viewer/utils.ts", "@scom/secure-page-viewer/store/index.ts"], function (require, exports, components_9, utils_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ViewrPageElement = void 0;
    let ViewrPageElement = class ViewrPageElement extends components_9.Module {
        async setData(pageElement) {
            this.pnlElement.clearInnerHTML();
            this.data = pageElement;
            const { column, columnSpan, id, type, properties, elements, tag } = this.data;
            // this.pnlElement.grid = { column, columnSpan };
            this.pnlElement.id = id;
            const rootDir = index_1.getRootDir();
            if (type === 'primitive') {
                const { ipfscid, localPath } = this.data.module;
                let module = await this.loadModule(rootDir, { ipfscid, localPath });
                if (module) {
                    if (module.confirm)
                        module.confirm();
                    if (module.setRootDir)
                        module.setRootDir(rootDir);
                    await module.setData(properties);
                    if (tag)
                        await module.setTag(tag);
                }
            }
            else {
                for (const element of elements) {
                    const pnlElm = (this.$render("sc-page-viewer-page-element", null));
                    this.pnlElement.append(pnlElm);
                    await pnlElm.setData(element);
                }
            }
        }
        async loadModule(rootDir, options) {
            let module;
            if (options.localPath) {
                const localRootPath = rootDir ? `${rootDir}/${options.localPath}` : options.localPath;
                const scconfigRes = await fetch(`${localRootPath}/scconfig.json`);
                const scconfig = await scconfigRes.json();
                scconfig.rootDir = localRootPath;
                module = await components_9.application.newModule(scconfig.main, scconfig);
            }
            else {
                const response = await utils_1.fetchFileContentByCid(options.ipfscid);
                if (!response)
                    return;
                const result = await response.json();
                const codeCID = result.codeCID;
                const scConfig = await utils_1.getSCConfigByCodeCid(codeCID);
                if (!scConfig)
                    return;
                const main = scConfig.main;
                if (main.startsWith("@")) {
                    scConfig.rootDir = `${utils_1.IPFS_SCOM_URL}/${codeCID}/dist`;
                    module = await components_9.application.newModule(main, scConfig);
                }
                else {
                    const root = `${utils_1.IPFS_SCOM_URL}/${codeCID}/dist`;
                    const mainScriptPath = main.replace('{root}', root);
                    const dependencies = scConfig.dependencies;
                    for (let key in dependencies) {
                        dependencies[key] = dependencies[key].replace('{root}', root);
                    }
                    module = await components_9.application.newModule(mainScriptPath, { dependencies });
                }
            }
            if (module) {
                this.pnlElement.append(module);
            }
            return module;
        }
        render() {
            return (this.$render("i-panel", { id: "pnlElement" }));
        }
    };
    ViewrPageElement = __decorate([
        components_9.customElements('sc-page-viewer-page-element')
    ], ViewrPageElement);
    exports.ViewrPageElement = ViewrPageElement;
});
define("@scom/secure-page-viewer/section.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ViewrSection = void 0;
    let ViewrSection = class ViewrSection extends components_10.Module {
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
        async setData(listPageElm) {
            this.width = '100%';
            this.padding = { left: '3rem', right: '3rem' };
            for (const pageElm of listPageElm) {
                const { column, columnSpan } = pageElm;
                const pageElement = (this.$render("sc-page-viewer-page-element", null));
                pageElement.grid = { column, columnSpan };
                pageElement.style.gridRow = '1';
                this.pnlSection.append(pageElement);
                await pageElement.setData(pageElm);
            }
        }
        render() {
            return (this.$render("i-grid-layout", { id: "pnlSection", width: "100%", height: "100%", maxWidth: "100%", maxHeight: "100%", position: "relative", gap: { column: 15 }, columnsPerRow: 12, padding: { top: '1.5rem', bottom: '1.5rem' } }));
        }
    };
    ViewrSection = __decorate([
        components_10.customElements('sc-page-viewer-section')
    ], ViewrSection);
    exports.ViewrSection = ViewrSection;
});
define("@scom/secure-page-viewer/sidebar.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_11.Styles.Theme.ThemeVars;
    exports.default = components_11.Styles.style({
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
define("@scom/secure-page-viewer/sidebar.tsx", ["require", "exports", "@ijstech/components", "@scom/secure-page-viewer/sidebar.css.ts"], function (require, exports, components_12, sidebar_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ViewerSidebar = void 0;
    let ViewerSidebar = class ViewerSidebar extends components_12.Module {
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
        components_12.customElements('sc-page-viewer-sidebar')
    ], ViewerSidebar);
    exports.ViewerSidebar = ViewerSidebar;
});
define("@scom/secure-page-viewer", ["require", "exports", "@ijstech/components", "@scom/secure-page-viewer/store/index.ts", "@scom/secure-page-viewer/index.css.ts", "@scom/secure-page-viewer/body.tsx", "@scom/secure-page-viewer/pageElement.tsx", "@scom/secure-page-viewer/section.tsx", "@scom/secure-page-viewer/sidebar.tsx", "@scom/secure-page-viewer/paging.tsx"], function (require, exports, components_13, index_2, index_css_1, body_1, pageElement_1, section_1, sidebar_1, paging_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ViewerPaging = exports.ViewerSidebar = exports.ViewrSection = exports.ViewrPageElement = exports.ViewrBody = void 0;
    Object.defineProperty(exports, "ViewrBody", { enumerable: true, get: function () { return body_1.ViewrBody; } });
    Object.defineProperty(exports, "ViewrPageElement", { enumerable: true, get: function () { return pageElement_1.ViewrPageElement; } });
    Object.defineProperty(exports, "ViewrSection", { enumerable: true, get: function () { return section_1.ViewrSection; } });
    Object.defineProperty(exports, "ViewerSidebar", { enumerable: true, get: function () { return sidebar_1.ViewerSidebar; } });
    Object.defineProperty(exports, "ViewerPaging", { enumerable: true, get: function () { return paging_1.ViewerPaging; } });
    let Viewer = class Viewer extends components_13.Module {
        constructor() {
            super(...arguments);
            this.isLoaded = false;
        }
        async onShow(options) {
            var _a, _b, _c;
            this.pnlLoading.visible = true;
            this.gridMain.visible = false;
            if (!this.isLoaded) {
                this.gridMain.templateColumns = ["1fr"];
                index_2.setRootDir(options === null || options === void 0 ? void 0 : options.rootDir);
                await this.setData((_a = options === null || options === void 0 ? void 0 : options._data) !== null && _a !== void 0 ? _a : options);
            }
            else if ((_b = options === null || options === void 0 ? void 0 : options._data) !== null && _b !== void 0 ? _b : options) {
                await this.renderPage((_c = options === null || options === void 0 ? void 0 : options._data) !== null && _c !== void 0 ? _c : options);
            }
            this.pnlLoading.visible = false;
            this.gridMain.visible = true;
        }
        async setData(data) {
            await this.renderPage(data);
            this.isLoaded = true;
        }
        async renderPage(page) {
            const { header, footer, sections } = page;
            this.viewerHeader.data = header;
            this.viewerFooter.data = footer;
            this.viewerHeader.visible = !!header;
            this.viewerFooter.visible = !!header;
            await this.viewerBody.setSections(sections);
        }
        render() {
            return (this.$render("i-vstack", { class: `sc-page-viewer-container ${index_css_1.default}`, width: "100%", height: "100%" },
                this.$render("i-panel", { stack: { grow: "1" }, overflow: "hidden" },
                    this.$render("i-vstack", { id: "pnlLoading", height: "100%", horizontalAlignment: "center", verticalAlignment: "center", padding: { top: "1rem", bottom: "1rem", left: "1rem", right: "1rem" }, visible: false },
                        this.$render("i-panel", { class: 'spinner' })),
                    this.$render("sc-page-viewer-header", { id: "viewerHeader", visible: false }),
                    this.$render("i-grid-layout", { id: "gridMain", height: "100%", templateColumns: ["1fr"] },
                        this.$render("sc-page-viewer-body", { id: "viewerBody", overflow: "auto", onUpdatePage: this.renderPage.bind(this) })),
                    this.$render("sc-page-viewer-footer", { id: "viewerFooter", visible: false }))));
        }
    };
    Viewer = __decorate([
        components_13.customModule,
        components_13.customElements('i-scom-page-viewer')
    ], Viewer);
    exports.default = Viewer;
});
