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
  maxWidth?: number|string;
  margin?: {
    x?: number|string;
    y?: number|string;
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
    }
  }[];
  anchorName?: string;
}

interface ISectionData {
  module: IPageBlockData | null;
  data: any;
  tag: any;
}

type ThemeType = 'dark' | 'light'

export {
  IPageData,
  ICodeInfoFileContent,
  IConfigData,
  ThemeType
}