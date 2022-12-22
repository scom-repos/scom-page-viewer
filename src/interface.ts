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

export {
  IViewerData,
  IPageData,
  IRowData,
  ISectionData,
  ICodeInfoFileContent
}