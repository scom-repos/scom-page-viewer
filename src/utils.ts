import { IPageData } from "./interface";

async function getDataByIpfsPath(ipfsPath: string) {
  let data: IPageData;
  try {
    let scconfig = await (await fetch(`/ipfs/${ipfsPath}`)).json();
    data = scconfig._data;
  } catch (err) {}
  return data || {} as IPageData;
}

const DEFAULT_MAX_COLUMN = 12;
const GAP_WIDTH = 15;

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export {
  getDataByIpfsPath,
  DEFAULT_MAX_COLUMN,
  GAP_WIDTH,
  generateUUID
}
