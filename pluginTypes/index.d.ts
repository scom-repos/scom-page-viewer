/// <amd-module name="@scom/scom-page-viewer/interface.ts" />
declare module "@scom/scom-page-viewer/interface.ts" {
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
        config?: IPageConfig;
    }
    interface IPageConfig {
        backgroundColor?: string;
        maxWidth?: number | string;
        margin?: {
            x?: number | string;
            y?: number | string;
        };
    }
    interface IConfigData {
        align?: AlignType;
    }
    interface IPageBlockData {
        name: string;
        path: string;
        category?: "components" | "micro-dapps";
        imgUrl?: string;
        disableClicked?: boolean;
        shownBackdrop?: boolean;
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
    export type AlignType = 'left' | 'center' | 'right';
    export interface IPageElement {
        id: string;
        column: number;
        columnSpan: number;
        type: 'primitive' | 'composite';
        properties: any;
        tag?: any;
        module?: IPageBlockData;
        elements?: IPageElement[];
        displaySettings?: {
            [key: string]: IGrid;
        };
    }
    interface IGrid {
        column?: number;
        columnSpan?: number;
        row?: number;
        rowSpan?: number;
        horizontalAlignment?: "stretch" | "start" | "end" | "center";
        verticalAlignment?: "stretch" | "start" | "end" | "center";
        area?: string;
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
        config?: IConfigData;
    }
    export interface IPageFooter {
        image: string;
        elements: IPageElement[];
    }
    export interface IRowData {
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
    type ThemeType = 'dark' | 'light';
    export { IPageData, ICodeInfoFileContent, IConfigData, ThemeType };
}
/// <amd-module name="@scom/scom-page-viewer/paging.css.ts" />
declare module "@scom/scom-page-viewer/paging.css.ts" {
    const _default: string;
    export default _default;
}
/// <amd-module name="@scom/scom-page-viewer/paging.tsx" />
declare module "@scom/scom-page-viewer/paging.tsx" {
    import { ControlElement, Module } from '@ijstech/components';
    import { IPageData } from "@scom/scom-page-viewer/interface.ts";
    type pageChangeCallback = (page: IPageData) => void;
    interface PagingElement extends ControlElement {
        onPrevPage: pageChangeCallback;
        onNextPage: pageChangeCallback;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['sc-page-viewer-paging']: PagingElement;
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
/// <amd-module name="@scom/scom-page-viewer/body.css.ts" />
declare module "@scom/scom-page-viewer/body.css.ts" {
    const _default_1: string;
    export default _default_1;
}
/// <amd-module name="@scom/scom-page-viewer/body.tsx" />
declare module "@scom/scom-page-viewer/body.tsx" {
    import { ControlElement, Module } from "@ijstech/components";
    import { IPageData, IPageSection } from "@scom/scom-page-viewer/interface.ts";
    type pageChangeCallback = (page: IPageData) => void;
    interface ViewerBodyElement extends ControlElement {
        onUpdatePage: pageChangeCallback;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['sc-page-viewer-body']: ViewerBodyElement;
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
/// <amd-module name="@scom/scom-page-viewer/footer.tsx" />
declare module "@scom/scom-page-viewer/footer.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import { IPageFooter } from "@scom/scom-page-viewer/interface.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['sc-page-viewer-footer']: ControlElement;
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
/// <amd-module name="@scom/scom-page-viewer/store.ts" />
declare module "@scom/scom-page-viewer/store.ts" {
    import { ThemeType } from "@scom/scom-page-viewer/interface.ts";
    export const state: {
        rootDir: string;
        theme: string;
    };
    export const setRootDir: (value: string) => void;
    export const getRootDir: () => string;
    export const setTheme: (value: ThemeType) => void;
    export const getTheme: () => string;
}
/// <amd-module name="@scom/scom-page-viewer/index.css.ts" />
declare module "@scom/scom-page-viewer/index.css.ts" {
    const _default_2: string;
    export default _default_2;
}
/// <amd-module name="@scom/scom-page-viewer/pageElement.tsx" />
declare module "@scom/scom-page-viewer/pageElement.tsx" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    import { IPageElement } from "@scom/scom-page-viewer/interface.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['sc-page-viewer-page-element']: ControlElement;
            }
        }
    }
    export class ViewrPageElement extends Module {
        private pnlElement;
        private data;
        private module;
        private observerOptions;
        private observer;
        constructor(parent?: Container, options?: any);
        setData(pageElement: IPageElement): Promise<void>;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-viewer/utils.ts" />
declare module "@scom/scom-page-viewer/utils.ts" {
    const IPFS_SCOM_URL = "https://ipfs.scom.dev/ipfs";
    function fetchFileContentByCid(ipfsCid: string): Promise<Response | undefined>;
    function getSCConfigByCodeCid(codeCid: string): Promise<any>;
    const DEFAULT_MAX_COLUMN = 12;
    const GAP_WIDTH = 15;
    export { IPFS_SCOM_URL, fetchFileContentByCid, getSCConfigByCodeCid, DEFAULT_MAX_COLUMN, GAP_WIDTH };
}
/// <amd-module name="@scom/scom-page-viewer/section.tsx" />
declare module "@scom/scom-page-viewer/section.tsx" {
    import { ControlElement, Module } from "@ijstech/components";
    import { IPageSection } from "@scom/scom-page-viewer/interface.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['sc-page-viewer-section']: SectionElement;
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
        private sectionData;
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
        setData(sectionData: IPageSection): Promise<void>;
        private updateElementConfig;
        private updateAlign;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-viewer/sidebar.css.ts" />
declare module "@scom/scom-page-viewer/sidebar.css.ts" {
    const _default_3: string;
    export default _default_3;
}
/// <amd-module name="@scom/scom-page-viewer/sidebar.tsx" />
declare module "@scom/scom-page-viewer/sidebar.tsx" {
    import { Module, ControlElement, TreeView, TreeNode } from '@ijstech/components';
    import { IPageData } from "@scom/scom-page-viewer/interface.ts";
    type activedChangeCallback = (page: IPageData) => void;
    interface SidebarElement extends ControlElement {
        onTreeViewActiveChange: activedChangeCallback;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['sc-page-viewer-sidebar']: SidebarElement;
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
/// <amd-module name="@scom/scom-page-viewer" />
declare module "@scom/scom-page-viewer" {
    import { ControlElement, Module } from "@ijstech/components";
    import { IPageData, ThemeType } from "@scom/scom-page-viewer/interface.ts";
    export { ViewrBody } from "@scom/scom-page-viewer/body.tsx";
    export { ViewrPageElement } from "@scom/scom-page-viewer/pageElement.tsx";
    export { ViewrSection } from "@scom/scom-page-viewer/section.tsx";
    export { ViewerSidebar } from "@scom/scom-page-viewer/sidebar.tsx";
    export { ViewerPaging } from "@scom/scom-page-viewer/paging.tsx";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-page-viewer']: ControlElement;
            }
        }
    }
    export default class Viewer extends Module {
        private pnlLoading;
        private viewerFooter;
        private gridMain;
        private viewerBody;
        private pnlContainer;
        private isLoaded;
        private _data;
        private _theme;
        get theme(): ThemeType;
        set theme(value: ThemeType);
        onShow(options: any): Promise<void>;
        setData(data: IPageData): Promise<void>;
        setRootDir(value: string): void;
        private setTheme;
        renderPage(page: IPageData): Promise<void>;
        private getBackgroundColor;
        private updateContainer;
        render(): any;
    }
}
