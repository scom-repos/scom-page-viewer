import { Module, customModule } from '@ijstech/components';
import Viewer from '@scom/scom-page-viewer';

const data = {
  "_data": {
    "sections": [
        {
            "id": "c4239791-402b-4b3d-9201-6160b8de5ef6",
            "row": 1,
            "elements": [
                {
                    "id": "ff69df4f-ebb0-4446-adde-9bcb8a07f25d",
                    "column": 1,
                    "columnSpan": 6,
                    "type": "composite",
                    "properties": {
                      "url": "https://placehold.co/600x400.png",
                      "showHeader": false,
                      "showFooter": false
                    },
                    "module": {},
                    "tag": {
                      "width": 257,
                      "height": 257
                    },
                    "elements": [
                      {
                        "id": "da140da9-9701-4928-b0fd-c5af250d5817",
                        "column": 1,
                        "columnSpan": 8,
                        "type": "primitive",
                        "properties": {
                          "url": "https://placehold.co/600x400.png",
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
                          "width": 708,
                          "height": 269
                        }
                      },
                      {
                        "id": "cd074331-8ffb-444d-8159-d662d7b0e424",
                        "column": 4,
                        "columnSpan": 9,
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
                          "width": 803,
                          "height": 257
                        }
                      }
                    ],
                    displaySettings: {
                        '<768': {
                            column: 1,
                            columnSpan: 12
                        }
                    }
                },
                {
                    "id": "b4f7f51e-1512-4f53-b909-1b4dad47ae79",
                    "column": 7,
                    "columnSpan": 6,
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
                        "width": 441,
                        "height": 565
                    },
                    displaySettings: {
                        '<768': {
                            column: 1,
                            columnSpan: 12
                        }
                    }
                }
            ]
        },
        {
            "id": "8e082945-cae0-42dd-b5e7-1919f89e3f57",
            "row": 2,
            "elements": [
                {
                    "id": "71d1de83-b9eb-4de9-a809-74bf97b49815",
                    "column": 3,
                    "columnSpan": 3,
                    "type": "primitive",
                    "properties": {
                        "url": "https://public.bnbstatic.com/static/academy/uploads/934ba45d2e6948048b71c4592fad02b3.png",
                        "altText": "",
                        "link": ""
                    },
                    "module": {
                        "name": "Image",
                        "path": "scom-image",
                        "category": "composables",
                        "disableClicked": true
                    },
                    "tag": {
                        "width": 1084,
                        "height": 301
                    },
                    displaySettings: {
                        '<768': {
                            column: 1,
                            columnSpan: 12
                        }
                    }
                },
                {
                    "id": "71d1de83-b9eb-4de9-a809-74bf97b49815",
                    "column": 6,
                    "columnSpan": 3,
                    "type": "primitive",
                    "properties": {
                        "url": "https://public.bnbstatic.com/static/academy/uploads/934ba45d2e6948048b71c4592fad02b3.png",
                        "altText": "",
                        "link": ""
                    },
                    "module": {
                        "name": "Image",
                        "path": "scom-image",
                        "category": "composables",
                        "disableClicked": true
                    },
                    "tag": {
                        "width": 1084,
                        "height": 301
                    },
                    displaySettings: {
                        '<768': {
                            column: 1,
                            columnSpan: 12
                        }
                    }
                }
            ],
            "config": {
                "align": "center"
            }
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