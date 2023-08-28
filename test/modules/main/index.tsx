import { Module, customModule } from '@ijstech/components';
import Viewer from '@scom/scom-page-viewer';

const data = {
  mode: "slideshow",
  "_data": {
    "sections": [
      {
        "id": "6876b0ab-a29c-4ed8-905e-51cd515fa26c",
        "row": 0,
        "name": "First section",
        "elements": [
          {
            "id": "c1dc9a45-1533-449b-83b7-919c60b9e94c",
            "column": 1,
            "columnSpan": 6,
            "properties": {
              "content": `"Lorem ipsum dolor sit amet, consectetur a<strong><span style="color: #f7ca88">dipiscing elit. Nulla ac est sit amet urn</span></strong>a consectetur semper. Curabitur posuere justo et nibh gravida, non tristique urna fringilla. Vestibulum id velit sed nisl tincidunt aliquet. Morbi viverra sapien eu purus venenatis, vitae vestibulum odio bibendum. Fusce volutpat gravida velit, id efficitur erat luctus id. Nullam malesuada hendrerit orci, a pretium tortor facilisis non. Sed euismod euismod felis. Nunc rhoncus diam in mi placerat efficitur. Aenean pulvinar neque ac nisl consequat, non lacinia lectus dapibus. Phasellus sagittis sagittis massa a luctus. Etiam auctor semper ullamcorper. Suspendisse potenti."`
            },
            "module": {
              "name": "Text box",
              "path": "scom-markdown-editor",
              "category": "widgets",
              "imgUrl": "https://ipfs.scom.dev/ipfs/bafybeiaabddf67ht6nohe37bvg75ifgvrqeti4iuipuoxhpuvrfg3f4tdi/composables/textbox.png"
            },
            "tag": {}
          }
        ],
        "config": {
          "backgroundColor": "",
          "margin": {
            "x": "auto",
            "y": "0px"
          },
          "sectionWidth": 1000,
          "textColor": "#b55e5eff",
          "backdropColor": "",
          "fullWidth": false,
          "border": false,
          "borderColor": ""
        }
      },
      {
        "id": "6876b0ab-a29c-4ed8-905e-51cd515fa26c",
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
                "columnSpan": 6,
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
                  "width": 439,
                  "height": 272
                }
              },
              {
                "id": "cd074331-8ffb-444d-8159-d662d7b0e424",
                "column": 1,
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
                  "width": 439,
                  "height": 260
                }
              }
            ]
          }
        ],
        "config": {
          "backgroundColor": "#e2dfdfff",
          "maxWidth": 1200,
          "margin": {
            "x": 12,
            "y": 0
          },
          "align": "center"
        }
      },
      {
        "id": "ee073653-16e0-4550-ab19-87bdcbda623d",
        "row": 2,
        "elements": [
          {
            "id": "5ce90c57-ce0c-464b-aea5-4c64a4a3da7a",
            "column": 1,
            "columnSpan": 12,
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
              "width": 896,
              "height": 353
            }
          }
        ],
        "config": {
          "backgroundColor": "#e2dfdfff",
          "margin": {
            "x": "auto",
            "y": 0
          },
          "maxWidth": 1200
        }
      },
      {
        "id": "425604af-f069-4285-b286-0762cb0ef9a7",
        "row": 3,
        "elements": [
          {
            "id": "094ac18f-5cd3-42af-908c-5118a066c7f1",
            "column": 1,
            "columnSpan": 4,
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
              "width": 287,
              "height": 384
            }
          },
          {
            "id": "63a59fa0-5b3e-4e96-84ec-96af7971ff1d",
            "column": 5,
            "columnSpan": 4,
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
              "width": 287,
              "height": 213
            }
          },
          {
            "id": "bc4cdc78-c5e9-48dc-9d40-67f544a449db",
            "column": 9,
            "columnSpan": 4,
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
              "width": 287,
              "height": 213
            }
          }
        ],
        "config": {
          "backgroundColor": "#e2dfdfff",
          "maxWidth": 1200,
          "margin": {
            "x": "auto",
            "y": 15
          },
          "align": "left"
        }
      }
    ],
    "footer": {
      "image": "",
      "elements": []
    },
    "config": {
      "backgroundColor": "#e2dfdfff",
      "textColor": "#000",
      "margin": {
        "x": "auto",
        "y": 0
      },
      "maxWidth": 1200
    }
  }
}


const mikeyData = {
  sections: [
    {
      id: "6876b0ab-a29c-4ed8-905e-51cd515fa26c",
      row: 0,
      name: "My banner",
      elements: [
        {
          id: "ff69df4f-ebb0-4446-adde-9bcb8a07f25d",
          column: 1,
          columnSpan: 7,
          type: "composite",
          properties: {
            url: "https://placehold.co/600x400.png",
            showHeader: false,
            showFooter: false,
          },
          module: {},
          tag: {
            width: 257,
            height: 257,
          },
          elements: [
            {
              id: "da140da9-9701-4928-b0fd-c5af250d5817",
              column: 1,
              columnSpan: 7,
              type: "primitive",
              module: {
                name: "Banner",
                path: "scom-banner",
                category: "composables",
              },
              properties: {
                title: "Page Banner Title",
                description: "page banner description",
                backgroundInageUrl: "",
              },
              tag: {
                pt: 45,
                pb: 34,
                pl: 32,
                pr: 51,
              },
            },
          ],
        },
        {
          id: "45d5ae59-1930-4b3c-862a-a6e3fa44b037",
          column: 8,
          columnSpan: 5,
          properties: {
            showHeader: false,
            showFooter: false,
          },
          module: {
            name: "Image",
            path: "scom-image",
            category: "composables",
            disableClicked: true,
          },
          tag: {
            pt: 123,
            pb: 23,
            pl: 54,
            pr: 23,
          },
        },
      ],
      config: {
        backdropColor: "#46b800ff",
        backdropImage: undefined,
        backgroundImage: undefined,
        border: false,
        borderColor: "",
        customBackdrop: false,
        customBackgroundColor: false,
        customTextColor: false,
        customTextSize: true,
        fullWidth: false,
        margin: {
          x: "auto",
          y: "0px",
        },
        pb: undefined,
        pl: undefined,
        plr: undefined,
        pr: undefined,
        pt: undefined,
        ptb: undefined,
        scrollToTop: false,
        sectionWidth: 1000,
        backgroundColor: "#bdbdbdff",
        textColor: "#000000de",
        textSize: "xl",
      },
    },
  ],
  footer: {
    image: "",
    elements: [],
  },
  config: {
    backgroundColor: "#ff0000ff",
    customBackgroundColor: false,
    customTextColor: false,
    customTextSize: true,
    margin: {
      x: "auto",
      y: "0",
    },
    plr: undefined,
    ptb: undefined,
    scrollToTop: false,
    sectionWidth: 1000,
    textColor: "#000000de",
    textSize: "xs",
  },
};
@customModule
export default class Main extends Module {
  private viewer: Viewer;

  init() {
    super.init();
    this.viewer.onShow(mikeyData);
    // this.viewer.setData(data._data as any);
  }

  render() {
    return <i-panel>
      <i-scom-page-viewer id="viewer"></i-scom-page-viewer>
    </i-panel>
  }
}