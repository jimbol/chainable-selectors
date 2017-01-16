import { createSelector } from 'reselect';
const MAP = 'map';
const FILTER = 'filter';
const REDUCE = 'reduce';
const INIT = 'init';

class Select {
  constructor(initialSelector) {
    this.selectors = [initialSelector];
    this.cbs = [];
    this.transforms = [];
  }

  addTransform(a, method) {
    const { selectors } = this;
    const newSelectors = getAllButLast(a);
    const cb = getLast(a);

    const indexStart = this.selectors.length;
    this.selectors = selectors.concat(newSelectors);
    const indexEnd = this.selectors.length;

    const transformCb = (prevOutput, results) => {
      const args = results.slice(indexStart, indexEnd);
      return method(prevOutput, cb, args);
    }

    this.transforms.push(transformCb);
  }

  map(...a) {
    this.addTransform(a, (prevOutput, cb, args) =>
      prevOutput.map((item) =>
        cb.apply(null, [item, ...args])));

    return this;
  }

  reduce(...a) {
    this.addTransform(a, (prevOutput, cb, args) =>
      prevOutput.reduce((prev, item) => {
        return cb.apply(null, [prev, item, ...args])
      }, undefined));

    return this;
  }

  create() {
    const { transforms, selectors } = this;

    const callback = (...args) => {
      return this.transforms.reduce((prevOutput, t) =>
        t(prevOutput, args), args[0]);
    };

    const outputSel = createSelector
      .apply(null, [...selectors, callback]);

    return outputSel;
  }
}

export function select(seedSelector) {
  if (typeof seedSelector !== 'function') {
    throw new Error(`reselect-array: 'select' expects a function but got ${seedSelector}`);
  }

  return new Select(seedSelector);
}

const getAllButLast = (arr) => arr.slice(0, arr.length - 1);
const getLast = (arr) => arr.slice(arr.length - 1, arr.length)[0];
