```js
initialState = { isLoading: false };
const onClick = () => {
    setState({ isLoading: true });
    setTimeout(() => setState({ isLoading: false }), 1000);
};
<Box
    display={Box.Display.Flex}
    justifyContent={Box.JustifyContent.SpaceBetween}
>
    <Button
        color={Button.Color.Brand}
        onClick={onClick}
        isLoading={state.isLoading}
    >
        Brand Button
    </Button>

    <Button
        color={Button.Color.Primary}
        onClick={onClick}
        isLoading={state.isLoading}
    >
        Primary Button
    </Button>

    <Button
        color={Button.Color.Secondary}
        onClick={onClick}
        isLoading={state.isLoading}
    >
        Secondary Button
    </Button>

    <Button
        color={Button.Color.Success}
        onClick={onClick}
        isLoading={state.isLoading}
    >
        Success Button
    </Button>

    <Button
        color={Button.Color.Error}
        onClick={onClick}
        isLoading={state.isLoading}
    >
        Error Button
    </Button>
</Box>;
```
