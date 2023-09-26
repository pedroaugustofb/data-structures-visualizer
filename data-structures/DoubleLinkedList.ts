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
}
