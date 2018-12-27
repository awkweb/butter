<script>
import Box from '@/components/layout/Box'
import Tex from '@/components/typography/Tex'
import { codes } from '../constants'

export default {
    name: 'Swatch',
    components: {
        Box,
        Tex,
    },
    props: {
        code: {
            default: true,
            type: String,
        },
        name: {
            required: true,
            type: String,
        },
    },
    render(h) {
        const css = {
            height: '2.5rem',
            width: '9rem',
        }
        return (
            <Box>
                <Box
                    backgroundColor={this.name}
                    cornerRadius="Small"
                    css={css}
                />
                <Tex color="Gray3" size="Sm">
                    {this.name}
                </Tex>
                <Tex color="Gray5" size="Sm">
                    {this.code}
                </Tex>
            </Box>
        )
    },
}
</script>
