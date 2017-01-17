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
Loop through previous output.
```es6
select(<selector>).
  .map(
    ...<dependent selectors>,
    <callback: ( <item at index>, ...<dependent selector output> )>
  )
```

Example:
```es6
.map(hash, (id, h) => h[id])
```

#### Reduce
Reduce previous output.
```es6
select(<selector>).
  .reduce(
    ...<dependent selectors>,
    <callback: ( <prev reduced value> = initial, <item at index>, ...<dependent selector output> )>
  )
```

Example:
```es6
.reduce((prev = [], item) => {
  return [...prev, item.id];
})
```

#### Use
Use custom function on previous output.
```es6
select(<selector>).
  .use(
    ...<dependent selectors>,
    <callback: ( <prev transform output>, ...<dependent selector output> )>
  )
```

Example:
```es6
.use(getSelectedId, (prevOutput, selectedId) =>
  R.equals(selectedId)(prevOutput.id)
)
```
```es6
.use(getSelectedId, hasSelectedId)
```
