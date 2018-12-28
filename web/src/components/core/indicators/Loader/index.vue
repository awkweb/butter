<script>
import Box from '@/components/core/layout/Box'
import Loader from './constants'
import { StyledLoader } from './styled-components'

export default {
    name: 'Loader',
    functional: true,
    components: {
        Box,
    },
    props: {
        /**
         * Center loader in screen.
         */
        center: {
            default: true,
            type: Boolean,
        },
        /**
         * Defaults to `Brand`.
         */
        color: {
            default: 'Brand',
            type: String,
            validator: value => value in Loader.Color,
        },
    },
    render: (h, { props }) => {
        return (
            <Box
                display="Flex"
                justifyContent={props.center && 'Center'}
                pt={3}
            >
                {[0, 1, 2].map(() => (
                    <StyledLoader {...{ props }} />
                ))}
            </Box>
        )
    },
}
</script>

<docs>
## Examples

```jsx
<Loader />
```
</docs>
