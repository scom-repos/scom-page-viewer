import { Styles } from '@ijstech/components';
import { MatchFunction } from './pathToRegexp';

interface IMenu {
  caption: string;
  url: string;
  module: string;
  data?: any;
  env?: string;
  networks?: number[];
  isToExternal?: boolean;
  img?: string;
  isDisabled?: boolean;
  menus?: IMenu[];
  regex?: MatchFunction;
};

interface ISCConfig {
  env: string;
  moduleDir?: string;
  modules: { [name: string]: { path: string, dependencies: string[] } };
  dependencies?: { [name: string]: string };
  menus: IMenu[];
  routes: IRoute[];
  networks?: INetwork[] | "*";
  copyrightInfo: string;
  version?: string;
  wallet?: string[];
  themes?: ITheme;
  breakpoints?: IBreakpoints;
  header?: IHeaderFooter;
  footer?: IHeaderFooter;
};

interface INetwork {
  name?: string,
  chainId: number,
  img?: string,
  rpc?: string,
  symbol?: string,
  env?: string,
  explorerName?: string,
  explorerTxUrl?: string,
  explorerAddressUrl?: string,
  isDisabled?: boolean,
};

interface IRoute {
  url: string;
  module: string;
  data?: any;
  default?: boolean;
  regex?: MatchFunction;
}

interface ITheme {
  default: string;
  dark?: Styles.Theme.ITheme;
  light?: Styles.Theme.ITheme;
}

interface IBreakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
}

interface IHeaderFooter {
  visible?: boolean,
  fixed?: boolean
}

export {
  IMenu,
  IRoute,
  ISCConfig,
  INetwork,
  ITheme,
  IBreakpoints,
  IHeaderFooter
}