import { IConfig } from "./interface";

export const state = {
  rootDir: '',
  config: {} as IConfig
}

export const setRootDir = (value: string) => {
  state.rootDir = value || '';
}

export const getRootDir = () => {
  return state.rootDir;
}

export const setConfig = (value: IConfig) => {
  state.config = value || {};
}

export const getConfig = () => {
  return state.config || {};
}
