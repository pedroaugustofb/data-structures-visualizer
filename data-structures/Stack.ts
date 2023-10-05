import Double_Linked_List from "./DoubleLinkedList";

export default class Stack {
  constructor(private _data: Double_Linked_List = new Double_Linked_List()) {}

  /**
   * @param {number} value
   */
  push = (value: number): void => this._data.add_at_end(value);

  /**
   * @returns { number } the size of the stack
   */
  length = (): number => this._data.length();

  /**
   
   * @returns {number} the value on top of the stack
   */
  getTop = (): number => this._data.element_by_index(this.length() - 1);

  pop = (): void => this._data.remove_at_end();

  element_by_index = (index: number): number => this._data.element_by_index(index);
}
