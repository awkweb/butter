```js
initialState = { checked: false };
<BooleanField
    id="checkbox"
    checked={state.checked}
    onChange={() => setState({ checked: !state.checked })}
/>;
```
