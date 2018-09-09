export default class IteratorFromArray {
  private _array = [];
  private _cursor = 0;

  constructor(arr) {
    this._array = arr;
    this._cursor = 0;
  }

  next() {
    return this._cursor < this._array.length ?
    {value: this._array[this._cursor++], done: false}:
    {done: true};
  }

  map(callback) {
    const iterator = new IteratorFromArray(this._array);
    return {
      next: () => {
        const {done, value} = iterator.next();
        return {
          done: done,
          value: done? undefined: callback(value)
        };
      }
    }
  }
}