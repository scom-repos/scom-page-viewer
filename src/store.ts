import { ThemeType } from "./interface";

export const state = {
  rootDir: '',
  theme: 'light'
}

export const setRootDir = (value: string) => {
  state.rootDir = value || '';
}

export const getRootDir = () => {
  return state.rootDir;
}

export const setTheme = (value: ThemeType) => {
  state.theme = value ?? 'light';
}

export const getTheme = () => {
  return state.theme ?? 'light';
}

export const getDefaultDisplaySettings = () => {
  return [{
    maxWidth: 767,
    properties: {
      column: 1,
      columnSpan: 12
    }
  }]
}
