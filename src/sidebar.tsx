import {
  Module,
  customElements,
  Panel,
  ControlElement,
  Image,
  Styles,
  TreeView,
  TreeNode,
  application,
} from '@ijstech/components';
import { IPageData } from './interface';
import styleClass from './sidebar.css';

type activedChangeCallback = (page: IPageData) => void;

interface SidebarElement extends ControlElement {
  onTreeViewActiveChange: activedChangeCallback;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['scpage-viewer-sidebar']: SidebarElement;
    }
  }
}

@customElements('scpage-viewer-sidebar')
export class ViewerSidebar extends Module {
  private tvMenu: TreeView;
  private _treeData: IPageData[] = [];
  public onTreeViewActiveChange: activedChangeCallback;

  get treeData() {
    return this._treeData;
  }

  set treeData(value: IPageData[]) {
    this._treeData = value;
    this.renderUI();
  }

  async renderUI() {
    this.tvMenu.clear();
    let fileNodes: { [idx: string]: TreeNode } = {};
    let self = this;

    async function addFileNode(nodeData: IPageData) {
      const name = nodeData.name;
      let idx: string = '';
      let items = nodeData.path.split('/');
      let node: TreeNode | null = null;

      for (let i = 0; i < items.length; i++) {
        if (items[i]) {
          idx = idx + '/' + items[i];
          if (!fileNodes[idx]) {
            node = await self.tvMenu.add(node, name);
            if (!nodeData.visible) node.classList.add('invisible');
            fileNodes[idx] = node;
            node.tag = nodeData;
          } else {
            node = fileNodes[idx];
          }
          if (node) node.expanded = true;
        }
      }
    }

    for (let nodeData of this.treeData) {
      await addFileNode(nodeData);
    }
  }

  onActiveChange(parent: TreeView, prevNode?: TreeNode) {
    const page = parent.activeItem?.tag;
    if (this.onTreeViewActiveChange) {
      this.onTreeViewActiveChange(page);
    }
  }
  
  resetActiveTreeNode() {
    this.tvMenu.activeItem = undefined;
  }

  render() {
    return (
      <i-panel class={styleClass} height={'100%'}>
        <i-tree-view
          id="tvMenu"
          class="page-list"
          height={'100%'}
          padding={{ bottom: '20px' }}
          onActiveChange={this.onActiveChange}
        ></i-tree-view>
      </i-panel>
    );
  }
}