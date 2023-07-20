import { IPageData } from "./interface";

async function getDataByIpfsPath(ipfsPath: string) {
  let data: IPageData;
  try {
    let scconfig = await (await fetch(`/ipfs/${ipfsPath}`)).json();
    data = scconfig._data;
  } catch (err) {}
  return data;
}

const DEFAULT_MAX_COLUMN = 12;
const GAP_WIDTH = 15;

export {
  getDataByIpfsPath,
  DEFAULT_MAX_COLUMN,
  GAP_WIDTH
}