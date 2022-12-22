const IPFS_SCOM_URL = "https://ipfs.scom.dev/ipfs";

async function fetchFileContentByCid(ipfsCid: string): Promise<Response | undefined> {
  let response;
  try {
    response = await fetch(`${IPFS_SCOM_URL}/${ipfsCid}`);
  } catch (err) {
    const IPFS_Gateway = 'https://ipfs.io/ipfs/{CID}';
    response = await fetch(IPFS_Gateway.replace('{CID}', ipfsCid));
  }
  return response;
};

async function getSCConfigByCodeCid(codeCid: string) {
  let scConfig;
  try {
    let scConfigRes = await fetchFileContentByCid(`${codeCid}/dist/scconfig.json`);
    if (scConfigRes) scConfig = await scConfigRes.json();
  } catch (err) { }
  return scConfig;
}

export {
  IPFS_SCOM_URL,
  fetchFileContentByCid,
  getSCConfigByCodeCid
}