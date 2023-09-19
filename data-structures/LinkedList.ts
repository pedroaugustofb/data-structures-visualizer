class Node {
  value: number;
  next: Node | null = null;

  constructor(value: number) {
    this.value = value;
  }
}

export default class Linked_List {
  private _size: number = 0;
  private _head: Node | null = null;

  get_head = (): typeof this._head => this._head;

  get_next = (node: Node): Node => {
    if (node.next === null) throw "No next node";

    return node.next as Node;
  };

  empty = (): boolean => this._head === null;

  length = (): number => this._size;

  element_by_index = (index: number): number => {
    if (index < 0 || index >= this._size) throw "Index out of bounds";

    if (this.empty()) throw "List is empty";

    let node = this._head as Node;

    if (index === 0) return node.value as number;

    for (let i = 1; i < index; i++) {
      if (node.next === null) throw "Index out of bounds";
      node = this.get_next(node);
    }

    return node.value as number;
  };

  index_by_element = (element: number): number => {
    if (this.empty()) throw "List is empty";

    let node = this._head as Node;
    for (let i = 0; i < this._size; i++) {
      if (node.value === element) return i;
      if (node.next === null) throw "Element not found";
      node = this.get_next(node);
    }

    throw "Element not found";
  };

  add_at_end = (element: number) => {
    let node = new Node(element);

    if (this.empty()) {
      this._head = node;
      this._size++;
      return;
    }

    let current_node = this._head as Node;
    while (current_node.next !== null) {
      current_node = this.get_next(current_node);
    }

    current_node.next = node;
    this._size++;
  };

  add_at_index = (element: number, index: number) => {
    if (index < 0 || index > this._size) throw "Index out of bounds";

    let node = new Node(element);

    if (index === 0) {
      node.next = this._head as Node;
      this._head = node;
      this._size++;
      return;
    }

    let current_node = this._head as Node;
    for (let i = 0; i < index - 1; i++) {
      if (current_node.next === null) throw "Index out of bounds";
      current_node = this.get_next(current_node);
    }

    node.next = current_node.next as Node;
    current_node.next = node;
    this._size++;
  };

  remove_at_end = () => {
    if (this.empty()) throw "List is empty";

    if (this._size === 1) {
      this._head = null;
      this._size--;
      return;
    }

    let current_node = this._head as Node;
    for (let i = 0; i < this._size - 2; i++) {
      if (current_node.next === null) throw "Index out of bounds";
      current_node = this.get_next(current_node);
    }

    current_node.next = null;
    this._size--;
  };

  remove_at_index = (index: number) => {
    if (this.empty()) throw "List is empty";

    if (index < 0 || index >= this._size) throw "Index out of bounds";

    if (index === 0) {
      this._head = this._head?.next as Node;
      this._size--;
      return;
    }

    let current_node = this._head as Node;
    for (let i = 0; i < index - 1; i++) {
      if (current_node.next === null) throw "Index out of bounds";
      current_node = this.get_next(current_node);
    }

    current_node.next = current_node.next?.next as Node;
    this._size--;
  };
}
