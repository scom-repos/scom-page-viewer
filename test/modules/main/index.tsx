import { Module, customModule } from '@ijstech/components';
import Viewer from '@scom/secure-page-viewer';

const data = {
  "_data": {
    "header": {
      "elements": [],
      "headerType": "banner",
      "image": "https://ssl.gstatic.com/atari/images/simple-header-blended-small.png"
    },
    "sections": [
      {
        "id": "0e03efc4-3ceb-4fa5-b8fa-20a37606f7bd",
        "row": 1,
        "elements": [
          {
            "id": "3878138a-0768-4901-9c4d-ec9657233914",
            "column": 1,
            "columnSpan": 12,
            "type": "primitive",
            "module": {
              "description": "Textbox (dev)",
              "localPath": "https://ipfs.scom.dev/ipfs/bafybeicxnno34otrha5cjc3amk6drnm2b6pi753h2uxvzcbr7frqmtnc4u",
              "name": "Textbox",
              "local": true
            },
            "properties": {
              "content": "<span class='frame' style='box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; font: inherit; vertical-align: top; backface-visibility: hidden; transform: translate3d(0px, 0px, 0px); display: inline-block; max-width: 100%; overflow: hidden; width: 7rem; border-radius: 100%; transition: none 0s ease 0s;'>![](https://8614b9d4b51242cf.demo.carrd.co/assets/images/image01.jpg?v=40c6bc31)</span>\n\n# Cayce Pollard\n\nHi there, my name is Cayce Pollard and I'm a full-time video creator. My focus is on creating educational content about science and technology with the goal of making complex topics accessible and interesting to everyone. I've been creating videos for over five years now, and it's been an incredible journey so far. I'm deeply passionate about all things science and technology, and I take great joy in sharing my knowledge and experiences with others.</span>"
            }
          }
        ]
      },
      {
        "id": "48bcbd8f-d9a6-4db3-8926-bbfdaf1a7f7e",
        "row": 2,
        "elements": [
          {
            "id": "bfeb6932-6192-4ca3-b20c-7e43a7014e20",
            "column": 1,
            "columnSpan": 12,
            "type": "primitive",
            "module": {
              "name": "@PageBlock/NFT Minter",
              "description": "Donation / NFT Minter Micro-DApp",
              "local": true,
              "localPath": "https://ipfs.scom.dev/ipfs/bafybeibavy5bzhyry5eon7wck7hlxp6xelja7bn2y53icrwafwoyqh6tjm"
            },
            "properties": {
              "name": "Donation Dapp",
              "chainId": 43113,
              "productType": "DonateToEveryone",
              "description": "#### Donate for rainforest conservation!\n\nPlease support our work and that of our partners on the ground. Your donation is vital to our fight to preserve and protect tropical forests.",
              "link": "https://www.rainforest-rescue.org",
              "logo": "ipfs://bafkreiabdmajj5vftou33ljsahb36ii6t6xugez7l2zgw72jvjjddtwobq",
              "maxOrderQty": 1,
              "maxPrice": "0",
              "price": "0",
              "qty": 999999999,
              "token": {
                "name": "OpenSwap",
                "address": "0x78d9D80E67bC80A11efbf84B7c8A65Da51a8EF3C",
                "symbol": "OSWAP",
                "decimals": 18,
                "isCommon": true
              },
              "productId": 1,
              "donateTo": "0xb15E094957c31D6b0d08714015fF85Bec7842635"
            }
          }
        ]
      }
    ],
    "footer": {
      "elements": []
    }
  }
};

@customModule
export default class Main extends Module {
  private viewer: Viewer;

  init() {
    super.init();
    this.viewer.onShow(data);
    // this.viewer.setData(data._data as any);
  }

  render() {
    return <i-panel>
      <i-scom-page-viewer id="viewer"></i-scom-page-viewer>
    </i-panel>
  }
}