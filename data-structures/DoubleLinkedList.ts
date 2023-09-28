class Node {
  value: number;
  next: Node | null = null;
  prev: Node | null = null;

  constructor(value: number) {
    this.value = value;
  }
}

export default class Double_Linked_List {
  private _size: number = 0;
  private _head: Node | null = null;
  private _tail: Node | null = null;

  length = (): number => this._size;

  empty = (): boolean => this._head === null;

  element_by_index = (index: number): number => {
    if (index < 0 || index >= this._size) throw "Index out of bounds";

    if (this.empty()) throw "List is empty";

    let node = this._head as Node;

    if (index === 0) return node.value as number;

    for (let i = 0; i < index; i++) {
      if (node.next === null) throw "Index out of bounds";
      node = node.next;
    }

    return node.value as number;
  };

  index_by_element = (element: number): number => {
    if (this.empty()) throw "List is empty";

    let node = this._head as Node;
    for (let i = 0; i < this._size; i++) {
      if (node.value === element) return i;
      if (node.next === null) throw "Element not found";
      node = node.next;
    }

    throw "Element not found";
  };

  add_at_end = (element: number) => {
    let node = new Node(element);

    if (this.empty()) {
      this._head = node;
      this._tail = node;
    } else {
      node.prev = this._tail;
      this._tail!.next = node;
      this._tail = node;
    }

    this._size++;
  };

  add_at_start = (element: number) => {
    let node = new Node(element);

    if (this.empty()) {
      this._head = node;
      this._tail = node;
    } else {
      node.next = this._head;
      this._head!.prev = node;
      this._head = node;
    }

    this._size++;
  };

  add_at_index = (element: number, index: number) => {
    if (index < 0 || index > this._size) throw "Index out of bounds";

    if (index === 0) {
      this.add_at_start(element);
      return;
    }

    if (index === this._size) {
      this.add_at_end(element);
      return;
    }

    let node = new Node(element);

    let current_node = this._head as Node;
    for (let i = 0; i < index - 1; i++) {
      if (current_node.next === null) throw "Index out of bounds";
      current_node = current_node.next;
    }

    node.next = current_node.next;
    node.prev = current_node;
    current_node.next!.prev = node;
    current_node.next = node;

    this._size++;
  };

  remove_at_end = () => {
    if (this.empty()) throw "List is empty";

    if (this._size === 1) {
      this._head = null;
      this._tail = null;
      this._size--;
      return;
    }

    this._tail = this._tail!.prev;
    this._tail!.next = null;
    this._size--;
  };

  remove_at_start = () => {
    if (this.empty()) throw "List is empty";

    if (this._size === 1) {
      this._head = null;
      this._tail = null;
      this._size--;
      return;
    }

    this._head = this._head!.next;
    this._head!.prev = null;
    this._size--;
  };

  remove_at_index = (index: number) => {
    if (index < 0 || index >= this._size) throw "Index out of bounds";

    if (index === 0) {
      this.remove_at_start();
      return;
    }

    if (index === this._size - 1) {
      this.remove_at_end();
      return;
    }

    let current_node = this._head as Node;
    for (let i = 0; i < index; i++) {
      if (current_node.next === null) throw "Index out of bounds";
      current_node = current_node.next;
    }

    current_node.prev!.next = current_node.next;
    current_node.next!.prev = current_node.prev;

    this._size--;
  };
}
