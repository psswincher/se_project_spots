export default class Section {
    constructor({ renderer, containerSelector }) {
        this._items = "";
        this._renderer = renderer;
        this._containerSelector = containerSelector;
        this._container = document.querySelector(this._containerSelector);
    }

    renderItems() {
        if(this._items) {
        this._items.forEach((item) => {
            this._renderer(item);
        }); 
        } else {
            console.error(`No items to render in Section.`);
        }
    }

    setItems(items) {
        this._items = items;
        return (this._items);
    }

     addItem(element) {
        this._items.push(element);
        this._container.append(element);
    }

    _clear() {
        this._items.internalHTML = ""
    }

    // getLastElement() {
    //     console.log(this._container);
    //     console.log(this._items[this._items.length - 1]);
    //     return this._items[this._items.length - 1];
    // }
}