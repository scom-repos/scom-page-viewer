import { Module, customModule } from '@ijstech/components';
import Viewer from '@scom/scom-page-viewer';

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
      },
      {
        "id": "d5c5b486-37fc-4cbf-bd71-82ceb9b8104f",
        "row": 1,
        "elements": [
          {
            "id": "6aee2af5-fef2-4dab-ad19-d0fe896e7316",
            "column": 1,
            "columnSpan": 12,
            "type": "primitive",
            "module": {
              "description": "Textbox (dev)",
              "localPath": "libs/@scom/scom-markdown-editor",
              "name": "Text box",
              "imgUrl": "data:image/png;base64,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",
              "local": true
            },
            "properties": {
              "content": "122ds\\nwwwww"
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