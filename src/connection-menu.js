import Menu from './menu/index';
import {traverse} from './utils';

export default class ConnectionMenu extends Menu {
    constructor(editor, props, vueComponent, connectionItems, con,e) {
        super(editor, props, vueComponent);
        if (connectionItems["add_pink"] !== false) {
            if (connectionItems["add_pink"] && "function" != typeof connectionItems["add_pink"]) {
                if (connectionItems["add_pink"].title && connectionItems["add_pink"].callback) {

                    this.addItem(connectionItems["add_pink"].title, () => connectionItems["add_pink"].callback(editor, con))

                } else if (connectionItems["add_pink"].title) {
                    if ("function" === typeof con.connection.addPink) {
                        this.addItem(connectionItems["add_pink"].title, () => con.connection.addPink())
                    }
                }
            } else {
                if ("function" === typeof con.connection.addPink) {
                    this.addItem('Add pink', () => con.connection.addPink())
                }
            }
        }
        if(e.target&& e.target.__vue__ && "function"===typeof e.target.__vue__.pinup){
            if (connectionItems["remove_pink"] !== false) {
                if (connectionItems["remove_pink"] && connectionItems["remove_pink"].title) {
                        this.addItem(connectionItems["remove_pink"].title, () => e.target.__vue__.pinup())
                }else{
                    this.addItem('Remove pink', () => e.target.__vue__.pinup())
                }
            }

        }
        if (connectionItems["colors"] !== false) {
            let changColor = (color) => {
                con.connection.data.color = color
                con.el.querySelector('.connection path').style.setProperty("stroke", color)
                con.el.classList.remove("select-connection")
            }
            if (connectionItems["colors"] && "function" != typeof connectionItems["colors"]) {
                if (connectionItems["colors"].title && connectionItems["colors"].colors && connectionItems["colors"].callback) {

                    for (var key in connectionItems["colors"].colors) {
                        this.addItem(key, (color => () => connectionItems["colors"].callback(editor, con, color))(connectionItems["colors"].colors[key]), [connectionItems["colors"].title])
                    }
                } else if (connectionItems["colors"].title && connectionItems["colors"].colors) {
                    for (var key in connectionItems["colors"].colors) {
                        this.addItem(key, (color => () => changColor(color))(connectionItems["colors"].colors[key]), [connectionItems["colors"].title])
                    }
                }
            } else {
                let colors = {
                    "red": "red",
                    "black": "black",
                    "blue": "blue",
                    "yellow": "yellow",

                }
                for (var key in colors) {
                    this.addItem(key, (color => () => changColor(color))(colors[key]), ["Colors"])
                }
            }

        }
        if (connectionItems["delete_connection"] !== false) {
            let deleteConnection = () => {
                editor.removeConnection(con.connection)
            }
            if (connectionItems["delete_connection"] && "function" != typeof connectionItems["delete_connection"]) {
                if (connectionItems["delete_connection"].title && connectionItems["delete_connection"].callback) {

                    this.addItem(connectionItems["delete_connection"].title, () => connectionItems["delete_connection"].callback(editor, con))

                } else if (connectionItems["delete_connection"].title) {
                        this.addItem(connectionItems["delete_connection"].title, () => deleteConnection())
                }
            } else {
                    this.addItem('Delete connection', () => deleteConnection())

            }
        }
           traverse(connectionItems, (name, func, path) => this.addItem(name, func, path))
    }
}
