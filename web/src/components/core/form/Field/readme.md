```js
initialState = { email: undefined };
<Field
    autofocus
    id="email"
    label="Email"
    value={state.email}
    showSuccess
    isValid={state.email === "thom.meagher@gmail.com"}
    onChange={e => setState({ email: e.target.value })}
/>;
```
