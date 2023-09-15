export default class Sequential_List {
  constructor(private _max_size: number = 0, private _data: number[] = [], private _size: number = 0) {}

  /**
   *
   * @returns {Array of numbers} all data from list
   */
  get_list = (): number[] => this._data;

  /**
   * @returns {number} the max size of the list
   */
  get_max_size = (): number => this._max_size;

  /**
   * @param value @type {number} the new max size of the list
   */
  set_max_size = (value: number) => {
    if (value < 0) throw "Invalid max size";

    this._max_size = value;
  };

  /**
   * @returns {boolean} true if the list is empty, false otherwise
   */
  empty = (): boolean => this._size === 0;

  /**
   * @returns {boolean} true if the list is full, false otherwise
   */
  full = (): boolean => this._size === this._max_size;

  /**
   * @returns {number} the size of the list
   */
  length = (): number => this._size;

  /**
   *
   * @param index @type {number} the index of the element to be returned
   * @returns {number} the element at the given index
   */
  element_by_index = (index: number): number => {
    if (index < 0 || index >= this._size) throw "Index out of bounds";

    return this._data[index];
  };

  /**
   * @param element @type {number} the element to be searched
   * @returns {number} the index of the element if found, error otherwise
   */
  index_by_element = (element: number): number => {
    let index = this._data.indexOf(element);

    if (index === -1) throw "Element not found";

    return index;
  };

  /**
   * @param element @type {number} the element to be inserted
   */
  push = (element: number): void => {
    // verify if the list is full, if so, throw an error
    if (this.full()) throw "List is full";

    this._data[this._size] = element;
    this._size++;
  };

  /**
   *
   * @param index @type {number} the index of the element to be removed
   */
  remove = (index: number): void => {
    // verify if the index param is valid
    if (index < 0 || index >= this._size) throw "Index out of bounds";

    // shift all elements to the left from the index param, overwriting the element to be removed
    for (let i = index; i < this._size - 1; i++) this._data[i] = this._data[i + 1];

    // decrement the size of the list, now that an element was removed
    this._size--;
  };
}
