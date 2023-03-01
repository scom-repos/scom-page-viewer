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
    }
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
  id: string; // uuid
  column: number;
  columnSpan: number;
  type: 'primitive' | 'composite',
  properties: any;
  tag?: any;
  module?: IPageBlockData; // follow the standard defined in secure page, if type === 'primitive'
  elements?: IPageElement[]; // type === 'composite'

  visibleOn?: string;
  invisibleOn?: string;
}

export enum HeaderType {
  'COVER' = 'cover',
  'LARGE' = 'largeBanner',
  'NORMAL' = 'banner',
  'TITLE' = 'titleOnly'
};
export interface IPageHeader {
  headerType: HeaderType;
  image: string;
  elements: IPageElement[];
}

export interface IPageSection {
  id: string; // uuid
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

export {
  IViewerData,
  IPageData,
  IRowData,
  ISectionData,
  ICodeInfoFileContent
}