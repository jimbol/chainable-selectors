## Getting started
**THIS FUNCTIONALLITY UNDER DEVELOPMENT**

In your initialization file
```es6
import { setSelectorCreator } from 'chainable-selectors';
import { createSelector } from 'reselect';

setSelectorCreator(createSelector);
```

This will take any library that uses reselect's basic api footprint.
`createSelector(sel1, sel2, ... , callback = (sel1Output, sel2Output) => ...)`

## Using Chainable Selectors
```es6
import { select } from 'chainable-selectors';
import { getIds, getHash } from './my-selectors';

const hiNames = select(ids)
  .map(hash, (id, h) => h[id])
  .reduce((prev = [], item) => {
    return [...prev, item.name];
  })
  .map((name) => `Hi ${name}`)
  .create();
```

### Supported Methods
#### Map
#### Reduce
