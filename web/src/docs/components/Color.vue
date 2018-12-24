<script>
import { codes } from '@/constants/color'
import Tex from '@/components/typography/Tex'

export default {
    name: 'Color',
    components: {
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
    computed: {
        style() {
            return {
                backgroundColor: codes[this.name],
            }
        },
    },
    render(h) {
        return (
            <div class="color">
                <div class="color__swatch" style={this.style} />
                <Tex color="Gray3" size="Sm">
                    {this.name}
                </Tex>
                <Tex color="Gray5" size="Sm">
                    {this.code}
                </Tex>
            </div>
        )
    },
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/partials/variables';
@import '../../assets/styles/partials/functions';
@import '../../assets/styles/partials/mixins';

.color {
    margin: {
        bottom: 1rem;
        right: 1rem;
    }
}

.color__swatch {
    border-radius: $border-radius;
    height: 2.5rem;
    margin-bottom: 0.25rem;
    width: 9rem;
}
</style>
