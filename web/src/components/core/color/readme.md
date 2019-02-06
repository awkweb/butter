### Palette

```js
const colors = require("../../theme/colors").default;
<Box display={Box.Display.Flex} flexWrap={Box.FlexWrap.Wrap}>
    {Object.keys(colors)
        .filter(
            key =>
                !key.includes("gray") &&
                !key.includes("white") &&
                !key.includes("background")
        )
        .map(key => (
            <Box
                b
                backgroundColor={key}
                cornerRadius="small"
                css={`
                    width: 10rem;
                `}
                key={key}
                mb={2}
                mr={2}
                ph={1}
                pv={6}
                textAlign={Box.TextAlign.Center}
            >
                <Text>{key}</Text>
                <Text size={Text.Size.Sm}>{colors[key]}</Text>
            </Box>
        ))}
</Box>;
```

### Neutrals

```js
const colors = require("../../theme/colors").default;
<Box display={Box.Display.Flex} flexWrap={Box.FlexWrap.Wrap}>
    {Object.keys(colors)
        .filter(
            key =>
                key.includes("gray") ||
                key.includes("white") ||
                key.includes("background")
        )
        .map(key => (
            <Box
                b
                backgroundColor={key}
                cornerRadius="small"
                css={`
                    width: 10rem;
                `}
                key={key}
                mb={2}
                mr={2}
                ph={1}
                pv={6}
                textAlign={Box.TextAlign.Center}
            >
                <Text>{key}</Text>
                <Text size={Text.Size.Sm}>{colors[key]}</Text>
            </Box>
        ))}
</Box>;
```
