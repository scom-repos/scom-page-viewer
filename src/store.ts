import { ThemeType, ViewerMode } from "./interface";

export const state = {
  rootDir: '',
  theme: 'light',
  mode: ViewerMode.NORMAL
}

export const setRootDir = (value: string) => {
  state.rootDir = value || '';
}

export const getRootDir = () => {
  return state.rootDir;
}

export const setMode = (value: ViewerMode) => {
  state.mode = value ?? ViewerMode.NORMAL;
}

export const getMode = () => {
  return state.mode ?? ViewerMode.NORMAL;
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

export const maxContainerWidths = {
  sm: 540,
  md: 720,
  lg: 960,
  xl: 1140
}
