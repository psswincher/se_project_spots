export default class Section {
  constructor({ createItem, containerSelector, initialize }) {
    this._items = [];
    this.createItem = createItem;
    this._containerSelector = containerSelector;
    this._container = document.querySelector(this._containerSelector);
    this.initialize = initialize;
  }

  renderItems() {
    if (this._items) {
      this._clear();
      this._items.forEach((item) => {
        this.renderItem(item);
      });
    } else {
      console.error(`No items to render in Section.`);
    }
  }

  createItems(data) {
    data.forEach((item) => {
      const newItem = this.createItem(item);
      this._addItem(newItem);
    });
  }

  _addItem(element) {
    this._items.unshift(element);
  }

  renderItem(element) {
    this._container.prepend(element);
  }

  _clear() {
    this._items.internalHTML = "";
  }

  createAndRenderItem(data) {
    const newCard = this.createItem(data);
    this._addItem(newCard);
    this.renderItem(newCard);
  }
}
