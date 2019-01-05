```js
<Grid backgroundColor={Grid.BackgroundColor.Gray8} maxWidth="Md">
    <Box p={4}>
        <Row>
            <Col xs={12} md={8} fluidHeight>
                <Box
                    p={3}
                    backgroundColor={Box.BackgroundColor.Gray10}
                    fluidHeight
                >
                    <Text align={Text.Align.Center}>
                        I’m 8 columns on desktop, 12 on mobile!
                    </Text>
                </Box>
            </Col>
            <Col xs={12} md={4} fluidHeight>
                <Box
                    p={3}
                    backgroundColor={Box.BackgroundColor.Gray10}
                    fluidHeight
                >
                    <Text align={Text.Align.Center}>
                        I’m 4 columns on desktop, 12 on mobile!
                    </Text>
                </Box>
            </Col>
        </Row>
    </Box>
</Grid>
```
