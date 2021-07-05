import MainMenu from './main-menu';
import NodeMenu from './node-menu';
import VueItem from './menu/Item.vue';
import VueMenu from './menu/Menu.vue';
import VueSearch from './menu/Search.vue';
import { isFunction } from './utils';
import ConnectionMenu from "./connection-menu";

function install(editor, {
    searchBar = true,
    searchKeep = () => false,
    delay = 1000,
    items = {},
    nodeItems = {},
    connectionItems = {},
    allocate = () => [],
    rename = component => component.name,
    vueComponent = null
}) {
    editor.bind('hidecontextmenu');
    editor.bind('showcontextmenu');

    let menu = null;

    editor.on('hidecontextmenu', () => {
        if (menu) menu.hide();
    });

    editor.on('click contextmenu', () => {
        editor.trigger('hidecontextmenu');
    });

    editor.on('contextmenu', ({ e, node,connection }) => {
        e.preventDefault();
        e.stopPropagation();

        if (!editor.trigger('showcontextmenu', { e, node })) return;

        const [x, y] = [e.clientX, e.clientY];

        if(connection) {

            menu = new ConnectionMenu(editor, { searchBar: false, delay }, vueComponent,  isFunction(connectionItems) ? connectionItems(node) : connectionItems,connection,e);
            menu.show(x, y);
        } else if(node) {
            menu = new NodeMenu(editor, { searchBar: false, delay }, vueComponent,  isFunction(nodeItems) ? nodeItems(node) : nodeItems);
            menu.show(x, y, { node });
        } else {
            menu = new MainMenu(editor, { searchBar, searchKeep, delay }, vueComponent, { items, allocate, rename });
            menu.show(x, y);
        }
    });
}

export const Menu = VueMenu;
export const Item = VueItem;
export const Search = VueSearch;

export default {
    name: 'context-menu',
    install
}
