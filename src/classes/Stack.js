export default class Stack {
  constructor() {
    // let's store our items array inside the weakmap
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  /**
   * Pop the last element or all element until the element with index [unitlIndex]
   * @param untilIndex the element that we want to reach
   * @returns {*}
   */
  pop(untilIndex) {
    if (typeof untilIndex !== 'undefined' && untilIndex > 0) {
      if (untilIndex > this.size() - 1) {
        throw Error('Stack overflow');
      }
      this.items.splice(untilIndex + 1);
      return this.items.peek();
    }
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

  findIndex(what) {
    return this.items.findIndex(what);
  }

  map(how) {
    return this.items.map(how);
  }

  empty() {
    this.items.splice(0);
  }

  isEmpty() {
    return this.items.length === 0;
  }

  toArray() {
    // return items of the queue
    return this.items;
  }
}
