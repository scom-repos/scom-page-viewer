import { Styles } from '@ijstech/components';

const Theme = Styles.Theme.ThemeVars;

export default Styles.style({
    borderRight: `1px solid ${Theme.divider}`,
    $nest: {
        'i-tree-node.is-checked > .i-tree-node_children': {
            marginLeft: '20px'
        },
        '.i-tree-node': {
            $nest: {
                '&.invisible': {
                    display: 'none'
                },
                '.i-tree-node_content': {
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    height: '40px'
                },
                '.i-tree-node_icon': {
                    fill: 'black!important'
                },
            }
        }
    }
});
