/// <amd-module name="@scom/secure-page-viewer/interface.ts" />
declare module "@scom/secure-page-viewer/interface.ts" {
    interface IViewerData {
        config?: IConfigData;
        pages: IPageData[];
    }
    interface IPageData {
        cid?: string;
        title?: string;
        name: string;
        path: string;
        url: string;
        visible: boolean;
        header: IPageHeader;
        sections: IPageSection[];
        footer: IPageFooter;
    }
    interface IRowData {
        config: IRowSettings;
        sections: ISectionData[];
    }
    interface IRowSettings {
        height?: string;
        width?: string;
        columns?: number;
        columnsSettings?: {
            width?: string;
            size?: {
                width?: string;
                height?: string;
            };
        }[];
        anchorName?: string;
    }
    interface ISectionData {
        module: IPageBlockData | null;
        data: any;
        tag: any;
    }
    interface IConfigData {
        header: {
            showHeader: boolean;
            showWalletAuthentication: boolean;
            showTopMenu: boolean;
            showSideMenu: boolean;
            showLogo: boolean;
            logo: string;
        };
        body: {
            boxedLayout: boolean;
            boxedWidth: string;
            containerLayout: boolean;
            containerSettings: IContainerSettings;
            showPagination: boolean;
        };
        footer: {
            showFooter: boolean;
            stickyFooter: boolean;
            copyrightText: string;
        };
    }
    type StyleValues = "-moz-initial" | "inherit" | "initial" | "revert" | "unset";
    interface IContainerSettings {
        width?: string;
        maxWidth?: string;
        textAlign?: StyleValues | "center" | "end" | "justify" | "left" | "match-parent" | "right" | "start";
        overflow?: StyleValues | "-moz-hidden-unscrollable" | "auto" | "clip" | "hidden" | "scroll" | "visible" | (string & {});
    }
    interface IPageBlockData {
        name: string;
        description: string;
        ipfscid?: string;
        imgUrl: string;
        category: {
            icon: string;
            idx: string;
            name: string;
        }[];
        chainId: number;
        packageId: number;
        projectId: number;
        local?: boolean;
        localPath?: string;
        dependencies?: any;
    }
    interface ICodeInfoFileContent {
        version: ISemanticVersion;
        codeCID: string;
        source: string;
    }
    interface ISemanticVersion {
        major: number;
        minor: number;
        patch: number;
    }
    export interface IPageElement {
        id: string;
        column: number;
        columnSpan: number;
        type: 'primitive' | 'composite';
        properties: any;
        module?: IPageBlockData;
        elements?: IPageElement[];
        visibleOn?: string;
        invisibleOn?: string;
    }
    export enum HeaderType {
        'COVER' = "cover",
        'LARGE' = "largeBanner",
        'NORMAL' = "banner",
        'TITLE' = "titleOnly"
    }
    export interface IPageHeader {
        headerType: HeaderType;
        image: string;
        elements: IPageElement[];
    }
    export interface IPageSection {
        id: string;
        row: number;
        anchorName?: string;
        image?: string;
        backgroundColor?: string;
        elements: IPageElement[];
    }
    export interface IPageFooter {
        image: string;
        elements: IPageElement[];
    }
    export { IViewerData, IPageData, IRowData, ISectionData, ICodeInfoFileContent };
}
/// <amd-module name="@scom/secure-page-viewer/header.tsx" />
declare module "@scom/secure-page-viewer/header.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import { IPageHeader } from "@scom/secure-page-viewer/interface.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scpage-viewer-header']: ControlElement;
            }
        }
    }
    export class ViewerHeader extends Module {
        private _data;
        private pnlHeader;
        constructor(parent?: any);
        init(): Promise<void>;
        get data(): IPageHeader;
        set data(value: IPageHeader);
        private renderHeader;
        render(): any;
    }
}
/// <amd-module name="@scom/secure-page-viewer/paging.css.ts" />
declare module "@scom/secure-page-viewer/paging.css.ts" {
    const _default: string;
    export default _default;
}
/// <amd-module name="@scom/secure-page-viewer/paging.tsx" />
declare module "@scom/secure-page-viewer/paging.tsx" {
    import { ControlElement, Module } from '@ijstech/components';
    import { IPageData } from "@scom/secure-page-viewer/interface.ts";
    type pageChangeCallback = (page: IPageData) => void;
    interface PagingElement extends ControlElement {
        onPrevPage: pageChangeCallback;
        onNextPage: pageChangeCallback;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scpage-viewer-paging']: PagingElement;
            }
        }
    }
    export class ViewerPaging extends Module {
        private _visiblePagesData;
        private _currentPageData;
        private currentPageIndex;
        private prevPageWrapper;
        private nextPageWrapper;
        private prevPageLabel;
        private nextPageLabel;
        private prevPageNotExist;
        private nextPageNotExist;
        onPrevPage: pageChangeCallback;
        onNextPage: pageChangeCallback;
        setPaging(pages: IPageData[], currPage?: IPageData): Promise<void>;
        setVisible(visible: boolean): void;
        renderUI(): Promise<void>;
        navToPrevPage(): void;
        navToNextPage(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/secure-page-viewer/body.css.ts" />
declare module "@scom/secure-page-viewer/body.css.ts" {
    const _default_1: string;
    export default _default_1;
}
/// <amd-module name="@scom/secure-page-viewer/body.tsx" />
declare module "@scom/secure-page-viewer/body.tsx" {
    import { ControlElement, Module } from "@ijstech/components";
    import { IPageData, IPageSection } from "@scom/secure-page-viewer/interface.ts";
    type pageChangeCallback = (page: IPageData) => void;
    interface ViewerBodyElement extends ControlElement {
        onUpdatePage: pageChangeCallback;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scpage-viewer-body']: ViewerBodyElement;
            }
        }
    }
    export class ViewrBody extends Module {
        private sections;
        private pnlSections;
        private viewerPaging;
        private archorElm;
        onUpdatePage: pageChangeCallback;
        generateUUID(): string;
        setSections(sections: IPageSection[]): Promise<void>;
        renderSections(): Promise<void>;
        private updateAnchors;
        private onScrollListener;
        private onScrollToRow;
        clearSections(): void;
        setPaging(pages: IPageData[], currPage: IPageData): Promise<void>;
        setPagingVisibility(pagingVisible: boolean): void;
        render(): any;
    }
}
/// <amd-module name="@scom/secure-page-viewer/footer.tsx" />
declare module "@scom/secure-page-viewer/footer.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import { IPageFooter } from "@scom/secure-page-viewer/interface.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scpage-viewer-footer']: ControlElement;
            }
        }
    }
    export class ViewerFooter extends Module {
        private _data;
        private pnlFooter;
        constructor(parent?: any);
        init(): Promise<void>;
        get data(): IPageFooter;
        set data(value: IPageFooter);
        private renderFooter;
        render(): any;
    }
}
/// <amd-module name="@scom/secure-page-viewer/index.css.ts" />
declare module "@scom/secure-page-viewer/index.css.ts" {
    const _default_2: string;
    export default _default_2;
}
/// <amd-module name="@scom/secure-page-viewer/utils.ts" />
declare module "@scom/secure-page-viewer/utils.ts" {
    const IPFS_SCOM_URL = "https://ipfs.scom.dev/ipfs";
    function fetchFileContentByCid(ipfsCid: string): Promise<Response | undefined>;
    function getSCConfigByCodeCid(codeCid: string): Promise<any>;
    export { IPFS_SCOM_URL, fetchFileContentByCid, getSCConfigByCodeCid };
}
/// <amd-module name="@scom/secure-page-viewer/pageElement.tsx" />
declare module "@scom/secure-page-viewer/pageElement.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import { IPageElement } from "@scom/secure-page-viewer/interface.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scpage-viewer-page-element']: ControlElement;
            }
        }
    }
    export class ViewrPageElement extends Module {
        private pnlElement;
        private data;
        setData(pageElement: IPageElement): Promise<void>;
        loadModule(options: {
            ipfscid?: string;
            localPath?: string;
        }): Promise<any>;
        render(): any;
    }
}
/// <amd-module name="@scom/secure-page-viewer/section.tsx" />
declare module "@scom/secure-page-viewer/section.tsx" {
    import { ControlElement, Module } from "@ijstech/components";
    import { IPageElement } from "@scom/secure-page-viewer/interface.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scpage-viewer-section']: SectionElement;
            }
        }
    }
    interface SectionElement extends ControlElement {
        containerSize?: {
            width?: string;
            height?: string;
        };
    }
    export class ViewrSection extends Module {
        private pnlSection;
        private _size;
        get size(): {
            width?: string;
            height?: string;
        };
        set size(value: {
            width?: string;
            height?: string;
        });
        clear(): void;
        init(): Promise<void>;
        updateContainerSize(): void;
        setData(listPageElm: IPageElement[]): Promise<void>;
        render(): any;
    }
}
/// <amd-module name="@scom/secure-page-viewer/sidebar.css.ts" />
declare module "@scom/secure-page-viewer/sidebar.css.ts" {
    const _default_3: string;
    export default _default_3;
}
/// <amd-module name="@scom/secure-page-viewer/sidebar.tsx" />
declare module "@scom/secure-page-viewer/sidebar.tsx" {
    import { Module, ControlElement, TreeView, TreeNode } from '@ijstech/components';
    import { IPageData } from "@scom/secure-page-viewer/interface.ts";
    type activedChangeCallback = (page: IPageData) => void;
    interface SidebarElement extends ControlElement {
        onTreeViewActiveChange: activedChangeCallback;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scpage-viewer-sidebar']: SidebarElement;
            }
        }
    }
    export class ViewerSidebar extends Module {
        private tvMenu;
        private _treeData;
        onTreeViewActiveChange: activedChangeCallback;
        get treeData(): IPageData[];
        set treeData(value: IPageData[]);
        renderUI(): Promise<void>;
        onActiveChange(parent: TreeView, prevNode?: TreeNode): void;
        resetActiveTreeNode(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/secure-page-viewer" />
declare module "@scom/secure-page-viewer" {
    import { Module } from "@ijstech/components";
    import { IPageData } from "@scom/secure-page-viewer/interface.ts";
    export { ViewrBody } from "@scom/secure-page-viewer/body.tsx";
    export { ViewrPageElement } from "@scom/secure-page-viewer/pageElement.tsx";
    export { ViewrSection } from "@scom/secure-page-viewer/section.tsx";
    export { ViewerSidebar } from "@scom/secure-page-viewer/sidebar.tsx";
    export { ViewerPaging } from "@scom/secure-page-viewer/paging.tsx";
    export default class Viewer extends Module {
        private pnlLoading;
        private viewerHeader;
        private viewerFooter;
        private gridMain;
        private viewerBody;
        private data;
        private isLoaded;
        onShow(options: any): Promise<void>;
        setData(): Promise<void>;
        renderPage(page: IPageData): Promise<void>;
        render(): any;
    }
}
