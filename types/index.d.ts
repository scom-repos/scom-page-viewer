/// <amd-module name="@scom/secure-page-viewer/interface.ts" />
declare module "@scom/secure-page-viewer/interface.ts" {
    interface IViewerData {
        config?: IConfigData;
        pages: IPageData[];
    }
    interface IPageData {
        cid?: string;
        name: string;
        path: string;
        url: string;
        visible: boolean;
        rows: IRowData[];
    }
    interface IRowData {
        config: IRowSettings;
        sections: ISectionData[];
    }
    interface IRowSettings {
        height?: string;
        width?: string;
        columns?: number;
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
        ipfscid: string;
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
    export { IViewerData, IPageData, IRowData, ISectionData, ICodeInfoFileContent };
}
/// <amd-module name="@scom/secure-page-viewer/utils.ts" />
declare module "@scom/secure-page-viewer/utils.ts" {
    const IPFS_SCOM_URL = "https://ipfs.scom.dev/ipfs";
    function fetchFileContentByCid(ipfsCid: string): Promise<Response | undefined>;
    function getSCConfigByCodeCid(codeCid: string): Promise<any>;
    export { IPFS_SCOM_URL, fetchFileContentByCid, getSCConfigByCodeCid };
}
/// <amd-module name="@scom/secure-page-viewer/index.css.ts" />
declare module "@scom/secure-page-viewer/index.css.ts" {
    const _default: string;
    export default _default;
}
/// <amd-module name="@scom/secure-page-viewer/body.tsx" />
declare module "@scom/secure-page-viewer/body.tsx" {
    import { ControlElement, Module } from "@ijstech/components";
    import { IRowData } from "@scom/secure-page-viewer/interface.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scpage-viewer-body']: ControlElement;
            }
        }
    }
    export class ViewrBody extends Module {
        private rows;
        private pnlRows;
        setRows(rows: IRowData[]): Promise<void>;
        renderRows(): Promise<void>;
        clearRows(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/secure-page-viewer/sidebar.css.ts" />
declare module "@scom/secure-page-viewer/sidebar.css.ts" {
    const _default_1: string;
    export default _default_1;
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
        render(): any;
    }
}
/// <amd-module name="@scom/secure-page-viewer/row.tsx" />
declare module "@scom/secure-page-viewer/row.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import { IRowData } from "@scom/secure-page-viewer/interface.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scpage-viewer-row']: ControlElement;
            }
        }
    }
    export class ViewrRow extends Module {
        private gridSections;
        private rowData;
        setData(rowData: IRowData): Promise<void>;
        render(): any;
    }
}
/// <amd-module name="@scom/secure-page-viewer/section.tsx" />
declare module "@scom/secure-page-viewer/section.tsx" {
    import { ControlElement, Module } from "@ijstech/components";
    import { ISectionData } from "@scom/secure-page-viewer/interface.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scpage-viewer-section']: ControlElement;
            }
        }
    }
    export class ViewrSection extends Module {
        private pnlModule;
        clear(): void;
        setData(sectionData: ISectionData): Promise<void>;
        loadModule(ipfsCid: string): Promise<any>;
        render(): any;
    }
}
/// <amd-module name="@scom/secure-page-viewer" />
declare module "@scom/secure-page-viewer" {
    import { Module } from "@ijstech/components";
    import { IPageData } from "@scom/secure-page-viewer/interface.ts";
    export { ViewrBody } from "@scom/secure-page-viewer/body.tsx";
    export { ViewrRow } from "@scom/secure-page-viewer/row.tsx";
    export { ViewrSection } from "@scom/secure-page-viewer/section.tsx";
    export { ViewerSidebar } from "@scom/secure-page-viewer/sidebar.tsx";
    export default class Viewer extends Module {
        private pnlLoading;
        private gridMain;
        private viewerSidebar;
        private viewerBody;
        private _data;
        onShow(options: any): Promise<void>;
        setData(): Promise<void>;
        renderPageByConfig(): Promise<void>;
        renderPage(page: IPageData): Promise<void>;
        private autoRetryGetIPFSContent;
        render(): any;
    }
}
