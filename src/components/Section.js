export default class Section {
    constructor({ items, renderer, containerSelector }) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = containerSelector;
        this._container = document.querySelector(this._containerSelector);
    }

    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }

    addItem(element) {
        console.log(element);
        this._items.push(element);
        this._container.append(element);
    }

    _clear() {
        this._items.internalHTML = ""
    }

    getLastElement() {
        console.log(this._container);
      console.log(this._items[this._items.length - 1]);
        return this._items[this._items.length - 1];
    }
}