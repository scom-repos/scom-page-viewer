import { Module, customModule } from '@ijstech/components';
import Viewer from '@scom/scom-page-viewer';

const data = {
  "_data": {
    "sections": [
        {
            "id": "959e8a41-5041-4d12-8211-e590f61fc9ff",
            "row": 0,
            "elements": [
                {
                    "id": "951337cb-4368-4d4c-946b-12df2edab4e5",
                    "column": 1,
                    "columnSpan": 5,
                    "type": "primitive",
                    "properties": {
                        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac est sit amet urna consectetur semper. Curabitur posuere justo et nibh gravida, non tristique urna fringilla. Vestibulum id velit sed nisl tincidunt aliquet. Morbi viverra sapien eu purus venenatis, vitae vestibulum odio bibendum. Fusce volutpat gravida velit, id efficitur erat luctus id. Nullam malesuada hendrerit orci, a pretium tortor facilisis non. Sed euismod euismod felis. Nunc rhoncus diam in mi placerat efficitur. Aenean pulvinar neque ac nisl consequat, non lacinia lectus dapibus. Phasellus sagittis sagittis massa a luctus. Etiam auctor semper ullamcorper. Suspendisse potenti."
                    },
                    "module": {
                        "name": "Text box",
                        "path": "scom-markdown-editor",
                        "category": "composables"
                    },
                    "tag": {
                        "width": 440,
                        "height": 190
                    }
                },
                {
                    "id": "4cbd2dcf-d64a-4cc2-b279-3f69edf8dc55",
                    "column": 6,
                    "columnSpan": 7,
                    "type": "primitive",
                    "properties": {
                        "showHeader": false,
                        "showFooter": false
                    },
                    "module": {
                        "name": "Image",
                        "path": "scom-image",
                        "category": "composables",
                        "disableClicked": true
                    },
                    "tag": {
                        "width": 624,
                        "height": 216
                    }
                }
            ],
            config: {
              maxWidth: 900,
              backgroundColor: '#ff0',
              margin: {x: 30, y: 20}
            }
        },
        {
            "id": "d6a35d3a-41b7-4489-9e87-a04e1a94747b",
            "row": 9,
            "elements": [
                {
                    "id": "41d1e453-eeac-4194-bfbe-26b59330f6a2",
                    "column": 1,
                    "columnSpan": 6,
                    "type": "primitive",
                    "properties": {
                        "componentId": 0,
                        "apiEndpoint": "https://api.dune.com/api/v1/query/2030584/results?api_key=GZ0R7Jim7TWLY7umXitxtiswiaD4eM7j",
                        "title": "Ethereum Beacon Chain Deposits",
                        "options": {
                            "counterColName": "deposited",
                            "counterLabel": "ETH deposited"
                        }
                    },
                    "module": {
                        "name": "Dune Blocks",
                        "path": "scom-counter",
                        "category": "charts"
                    },
                    "tag": {}
                },
                {
                    "id": "d225c86d-5a6f-4cd1-a26c-a890ef7bbc09",
                    "column": 7,
                    "columnSpan": 6,
                    "type": "primitive",
                    "properties": {
                        "componentId": 5,
                        "apiEndpoint": "https://api.dune.com/api/v1/query/2360788/results?api_key=GZ0R7Jim7TWLY7umXitxtiswiaD4eM7j",
                        "title": "Liquid Staking validators - All",
                        "options": {
                            "xColumn": "depositor_entity_category",
                            "yColumn": "staked",
                            "serieName": "ETH Staked",
                            "numberFormat": "0,000",
                            "showDataLabels": true,
                            "valuesOptions": [
                                {
                                    "name": "CEX",
                                    "color": "#f00c0c"
                                },
                                {
                                    "name": "Other",
                                    "color": "#000000"
                                },
                                {
                                    "name": "Others",
                                    "color": "#000000"
                                },
                                {
                                    "name": "Staking Pools",
                                    "color": "#3995ce"
                                },
                                {
                                    "name": "Liquid Staking",
                                    "color": "#c1ba2a"
                                }
                            ]
                        }
                    },
                    "module": {
                        "name": "Dune Blocks",
                        "path": "scom-pie-chart",
                        "category": "charts"
                    },
                    "tag": {
                        "width": 532,
                        "height": 504
                    }
                }
            ]
        },
        {
            "id": "7339d5f9-70fb-452c-8f12-a3c22e6110e8",
            "row": 10,
            "elements": [
                {
                    "id": "5f091518-4d00-424d-9602-f1c6fcaf6851",
                    "column": 1,
                    "columnSpan": 12,
                    "type": "primitive",
                    "properties": {
                        "showHeader": false,
                        "showFooter": false
                    },
                    "module": {
                        "name": "Text box",
                        "path": "scom-markdown-editor",
                        "category": "composables"
                    },
                    "tag": {
                        "textAlign": "left",
                        "background": "#fef0f0ff"
                    }
                }
            ]
        },
        {
            "id": "94d828a3-10b2-42ec-b43f-751924f6f4ef",
            "row": 1,
            "elements": [
                {
                    "id": "cb6181b6-6c82-4adc-9c2c-ef8ff6cedffa",
                    "column": 1,
                    "columnSpan": 6,
                    "type": "primitive",
                    "properties": {
                        "apiEndpoint": "/dune/query/2030664",
                        "title": "Ethereum Beacon Chain Deposits Entity",
                        "options": {
                            "columns": [
                                {
                                    "name": "ranking",
                                    "title": "Rnk"
                                },
                                {
                                    "name": "entity",
                                    "title": "Pool name"
                                },
                                {
                                    "name": "eth_deposited",
                                    "type": "progressbar",
                                    "title": "ETH deposited",
                                    "numberFormat": "0,000."
                                },
                                {
                                    "name": "validators",
                                    "title": "Validators",
                                    "numberFormat": "0,000"
                                },
                                {
                                    "name": "marketshare",
                                    "title": "Share",
                                    "numberFormat": "0,000.00%"
                                }
                            ]
                        },
                        "showHeader": false,
                        "showFooter": false
                    },
                    "module": {
                        "name": "Table",
                        "path": "scom-table",
                        "category": "charts"
                    },
                    "tag": {
                        "width": 532,
                        "height": 330
                    }
                },
                {
                    "id": "0b604e04-578e-4b1f-9239-40efb29177a3",
                    "column": 7,
                    "columnSpan": 6,
                    "type": "primitive",
                    "properties": {
                        "showHeader": false,
                        "showFooter": false
                    },
                    "module": {
                        "name": "Counter",
                        "path": "scom-counter",
                        "category": "charts"
                    },
                    "tag": {
                        "width": 532,
                        "height": 231
                    }
                }
            ]
        },
        {
            "id": "dfb099e7-ce7b-421e-98f4-8ad2e5fcc361",
            "row": 3,
            "elements": [
                {
                    "id": "e994aaf4-82a3-4877-9da1-2e657acf2eb9",
                    "column": 1,
                    "columnSpan": 6,
                    "type": "primitive",
                    "properties": {
                        "showHeader": false,
                        "showFooter": false
                    },
                    "module": {
                        "name": "Carousel",
                        "path": "scom-carousel",
                        "category": "composables"
                    },
                    "tag": {
                        "width": 532,
                        "height": 168
                    }
                },
                {
                    "id": "dde6049c-9536-4183-8deb-f07b0487dd84",
                    "column": 7,
                    "columnSpan": 6,
                    "type": "primitive",
                    "properties": {
                        "showHeader": false,
                        "showFooter": false
                    },
                    "module": {
                        "name": "Banner",
                        "path": "scom-banner",
                        "category": "composables"
                    },
                    "tag": {
                        "width": 532,
                        "height": 168
                    }
                }
            ]
        },
        {
            "id": "a2de5077-0d90-4751-ab70-6846e0c75099",
            "row": 4,
            "elements": [
                {
                    "id": "92976256-19d5-4d7f-b6bf-fde835c7d52d",
                    "column": 1,
                    "columnSpan": 5,
                    "type": "primitive",
                    "properties": {
                        "showHeader": false,
                        "showFooter": false
                    },
                    "module": {
                        "name": "Blog",
                        "path": "scom-blog",
                        "category": "composables",
                        "disableClicked": true
                    },
                    "tag": {
                        "width": 441,
                        "height": 380
                    }
                },
                {
                    "id": "1e10329f-cf7b-4391-ad88-ee867aa5c4cb",
                    "column": 6,
                    "columnSpan": 7,
                    "type": "primitive",
                    "properties": {
                        "showHeader": false,
                        "showFooter": false
                    },
                    "module": {
                        "name": "Randomizer",
                        "path": "scom-randomizer",
                        "category": "composables"
                    },
                    "tag": {
                        "width": 624,
                        "height": 380
                    }
                }
            ]
        },
        {
            "id": "03784c28-7185-4d29-8f35-a5fe2afdad18",
            "row": 5,
            "elements": [
                {
                    "id": "7c88ec1a-e725-411b-b7b9-fc92d1f11823",
                    "column": 1,
                    "columnSpan": 6,
                    "type": "primitive",
                    "properties": {
                        "showHeader": false,
                        "showFooter": false
                    },
                    "module": {
                        "name": "Video",
                        "path": "scom-video",
                        "category": "composables",
                        "disableClicked": true,
                        "shownBackdrop": true
                    },
                    "tag": {
                        "width": 532,
                        "height": 203
                    }
                },
                {
                    "id": "f359baf2-1713-49ed-bea1-0d8ab37da6d1",
                    "column": 7,
                    "columnSpan": 6,
                    "type": "primitive",
                    "properties": {
                        "showHeader": false,
                        "showFooter": false
                    },
                    "module": {
                        "name": "Map",
                        "path": "scom-map",
                        "category": "composables",
                        "disableClicked": true,
                        "shownBackdrop": true
                    },
                    "tag": {
                        "width": 532,
                        "height": 208
                    }
                }
            ]
        },
        {
            "id": "4e7838aa-c314-44ef-b752-5434325a3c0a",
            "row": 6,
            "elements": [
                {
                    "id": "6c4ea9af-65d0-4e75-9a86-cd383907f13d",
                    "column": 1,
                    "columnSpan": 6,
                    "type": "primitive",
                    "properties": {
                        "showHeader": true,
                        "showFooter": true
                    },
                    "module": {
                        "name": "NFT Minter DApp",
                        "path": "scom-nft-minter",
                        "category": "micro-dapps"
                    }
                },
                {
                    "id": "da00dc14-562b-471a-a942-a258645cd242",
                    "column": 7,
                    "columnSpan": 6,
                    "type": "primitive",
                    "properties": {
                        "showHeader": true,
                        "showFooter": true
                    },
                    "module": {
                        "name": "Gem Token DApp",
                        "path": "scom-gem-token",
                        "category": "micro-dapps"
                    },
                    "tag": {
                        "width": 532,
                        "height": 691
                    }
                }
            ]
        },
        {
            "id": "fe6b10e5-2cfe-4ae0-909f-f00b39e051e6",
            "row": 7,
            "elements": [
                {
                    "id": "6574b94a-058d-4761-9579-b76fba56c1b3",
                    "column": 1,
                    "columnSpan": 6,
                    "type": "primitive",
                    "properties": {
                        "showHeader": true,
                        "showFooter": true
                    },
                    "module": {
                        "name": "Commission Claim",
                        "path": "scom-commission-claim",
                        "category": "micro-dapps"
                    }
                },
                {
                    "id": "749574ec-3202-4b36-8e80-63307a119bfc",
                    "column": 7,
                    "columnSpan": 6,
                    "type": "primitive",
                    "properties": {
                        "showHeader": true,
                        "showFooter": true
                    },
                    "module": {
                        "name": "Disperse DApp",
                        "path": "scom-disperse",
                        "category": "micro-dapps"
                    },
                    "tag": {
                        "width": 532,
                        "height": 910
                    }
                }
            ]
        },
        {
            "id": "33be7808-45b2-4825-8f0f-c2701c583e19",
            "row": 2,
            "elements": [
                {
                    "id": "ea7995c6-e946-47bc-9e1c-e7f4497c7cd0",
                    "column": 1,
                    "columnSpan": 12,
                    "type": "primitive",
                    "properties": {
                        "providers": [
                            {
                                "caption": "OpenSwap",
                                "image": "ipfs://bafkreidoi5pywhyo4hqdltlosvrvefgqj4nuclmjl325exzmjgnyl2cc4y",
                                "key": "OpenSwap",
                                "dexId": 1,
                                "chainId": 97
                            },
                            {
                                "caption": "OpenSwap",
                                "image": "ipfs://bafkreidoi5pywhyo4hqdltlosvrvefgqj4nuclmjl325exzmjgnyl2cc4y",
                                "key": "OpenSwap",
                                "dexId": 1,
                                "chainId": 43113
                            }
                        ],
                        "category": "fixed-pair",
                        "tokens": [
                            {
                                "name": "USDT",
                                "address": "0x29386B60e0A9A1a30e1488ADA47256577ca2C385",
                                "symbol": "USDT",
                                "decimals": 6,
                                "chainId": 97
                            },
                            {
                                "name": "OpenSwap",
                                "address": "0x45eee762aaeA4e5ce317471BDa8782724972Ee19",
                                "symbol": "OSWAP",
                                "decimals": 18,
                                "chainId": 97
                            },
                            {
                                "name": "Tether USD",
                                "address": "0xb9C31Ea1D475c25E58a1bE1a46221db55E5A7C6e",
                                "symbol": "USDT.e",
                                "decimals": 6,
                                "chainId": 43113
                            },
                            {
                                "name": "OpenSwap",
                                "address": "0x78d9D80E67bC80A11efbf84B7c8A65Da51a8EF3C",
                                "symbol": "OSWAP",
                                "decimals": 18,
                                "chainId": 43113
                            }
                        ],
                        "defaultChainId": 43113,
                        "networks": [
                            {
                                "chainId": 43113
                            },
                            {
                                "chainId": 97
                            }
                        ],
                        "wallets": [
                            {
                                "name": "metamask"
                            }
                        ],
                        "showHeader": true,
                        "showFooter": true
                    },
                    "module": {
                        "name": "Swap DApp",
                        "path": "scom-swap",
                        "category": "micro-dapps"
                    },
                    "tag": {
                        "width": 724,
                        "height": 665
                    }
                }
            ]
        },
        {
            "id": "246df4e5-898e-4c3c-a059-6453becfaf9a",
            "row": 8,
            "elements": [
                {
                    "id": "3d3c349e-b52a-493c-a74c-542a89327273",
                    "column": 1,
                    "columnSpan": 6,
                    "type": "primitive",
                    "properties": {
                        "providers": [
                            {
                                "caption": "OpenSwap",
                                "image": "ipfs://bafkreidoi5pywhyo4hqdltlosvrvefgqj4nuclmjl325exzmjgnyl2cc4y",
                                "key": "OpenSwap",
                                "dexId": 1,
                                "chainId": 97
                            },
                            {
                                "caption": "OpenSwap",
                                "image": "ipfs://bafkreidoi5pywhyo4hqdltlosvrvefgqj4nuclmjl325exzmjgnyl2cc4y",
                                "key": "OpenSwap",
                                "dexId": 1,
                                "chainId": 43113
                            }
                        ],
                        "mode": "both",
                        "tokens": [
                            {
                                "name": "USDT",
                                "address": "0x29386B60e0A9A1a30e1488ADA47256577ca2C385",
                                "symbol": "USDT",
                                "decimals": 6,
                                "isCommon": true,
                                "chainId": 97
                            },
                            {
                                "name": "OpenSwap",
                                "address": "0x45eee762aaeA4e5ce317471BDa8782724972Ee19",
                                "symbol": "OSWAP",
                                "decimals": 18,
                                "isCommon": true,
                                "chainId": 97
                            },
                            {
                                "name": "Tether USD",
                                "address": "0xb9C31Ea1D475c25E58a1bE1a46221db55E5A7C6e",
                                "symbol": "USDT.e",
                                "decimals": 6,
                                "chainId": 43113
                            },
                            {
                                "name": "OpenSwap",
                                "address": "0x78d9D80E67bC80A11efbf84B7c8A65Da51a8EF3C",
                                "symbol": "OSWAP",
                                "decimals": 18,
                                "isCommon": true,
                                "chainId": 43113
                            }
                        ],
                        "defaultChainId": 43113,
                        "networks": [
                            {
                                "chainId": 43113
                            },
                            {
                                "chainId": 97
                            }
                        ],
                        "wallets": [
                            {
                                "name": "metamask"
                            }
                        ],
                        "showHeader": true,
                        "showFooter": true
                    },
                    "module": {
                        "name": "Pool DApp",
                        "path": "scom-amm-pool",
                        "category": "micro-dapps"
                    }
                }
            ]
        }
    ]
}
}

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