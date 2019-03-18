export default class Stack {
  constructor() {
    // let's store our items array inside the weakmap
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    if (this.items.length === 0) {
      return null;
    }
    return this.items[this.items.length - 1];
  }

  previous() {
    if (this.items.length <= 1) {
      return null;
    }
    return this.items[this.items.length - 2];
  }

  size() {
    return this.items.length;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  toArray() {
    // return items of the queue
    return this.items;
  }
}
