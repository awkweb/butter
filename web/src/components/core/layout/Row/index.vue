<script>
import Box from '@/components/core/layout/Box'

/**
 * Use `<Row>` to encapsulate `<Col>`s which need to be vertically separated from other `<Col>`s. The component uses global `flexboxgrid` classes and is modeled off of [Bootstrap’s CSS grid](http://getbootstrap.com/css/#grid).
 *
 * See [`<Grid>`](/#/Layout/Grid) for examples.
 */
export default {
    name: 'Row',
    functional: true,
    render: (h, { props, children }) => {
        // TODO: In the future, this should use <Row> from react-grid-system
        return (
            <Box
                display="Flex"
                flexWrap="Wrap"
                flexDirection="Row"
                justifyContent="FlexStart"
                alignContent="FlexStart"
                alignItems="FlexStart"
                mh={-1}
            >
                {children}
            </Box>
        )
    },
}
</script>
