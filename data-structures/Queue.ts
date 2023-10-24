import Double_Linked_List from "./DoubleLinkedList";

export default class Queue {
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
   *
   * @returns the element of index 0
   */
  get_next_of_queue = (): number => this._data.element_by_index(0);

  /**
   *
   * @description remove the element of index 0
   */
  pop = (): void => this._data.remove_at_start();

  element_by_index = (index: number): number => this._data.element_by_index(index);
}
