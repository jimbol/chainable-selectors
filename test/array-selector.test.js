import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
const { expect } = chai;

chai.use(sinonChai);

import { select } from '../src';
import { ids, hash } from './fake-selectors';

const STATE = {
  ids: [2, 5],
  hash: {
    1: { id: 1, name: '1 name' },
    2: { id: 2, name: '2 name' },
    3: { id: 3, name: '3 name' },
    4: { id: 4, name: '4 name' },
    5: { id: 5, name: '5 name' },
  },
};

describe('select', () => {
  it('throws when not fn passed', () => {
    expect(select)
      .to.throw();
  });

  it('returns object', () => {
    expect(typeof select(ids))
      .to.equal('object');
  });

  it('has methods', () => {
    const { map, filter, create } = select(ids);
    expect(typeof map).to.equal('function');
    // expect(typeof filter).to.equal('function');
    // expect(typeof create).to.equal('function');
  });

  it('maps', () => {
    const sel = select(ids)
      .map(hash, (id, h) => h[id])
      .create();

    expect(sel(STATE)).to.deep.equal([
      STATE.hash['2'],
      STATE.hash['5'],
    ]);
  });

  it('reduces', () => {
    const sel = select(ids)
      .map(hash, (id, h) => h[id])
      .reduce((prev = [], item) => {
        prev.push(item.name);
        return prev;
      })
      .create();

    expect(sel(STATE)).to.deep.equal([
      STATE.hash['2'].name,
      STATE.hash['5'].name,
    ]);
  });

  it('allows complex combos', () => {
    const sel = select(ids)
      .map(hash, (id, h) => h[id])
      .reduce((prev = [], item) => {
        prev.push(item.name);
        return prev;
      })
      .map((name) => `Hi ${name}`)
      .create();

    expect(sel(STATE)).to.deep.equal([
      'Hi ' + STATE.hash['2'].name,
      'Hi ' + STATE.hash['5'].name,
    ]);
  });
});
