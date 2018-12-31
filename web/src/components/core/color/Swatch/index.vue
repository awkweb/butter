<script>
import Theme from '@/components/theme'
import Box from '@/components/core/layout/Box'
import Tex from '@/components/core/typography/Tex'

export default {
    name: 'Swatch',
    functional: true,
    props: {
        color: {
            required: true,
            type: String,
            validator: value => value in Theme.Color,
        },
        textColor: {
            default: 'Gray1',
            type: String,
        },
    },
    render(h, { props }) {
        const { color, textColor } = props
        return (
            <Box
                b
                backgroundColor={color}
                borderColor="Gray8"
                cornerRadius="Small"
                css={`
                    width: 10rem;
                `}
                mb={2}
                mr={2}
                ph={2}
                pv={6}
            >
                <Tex color={textColor} size="Sm" weight="Medium">
                    {color}
                </Tex>
                <Tex color={textColor} size="Xs">
                    {Theme.Color[color]}
                </Tex>
            </Box>
        )
    },
}
</script>
