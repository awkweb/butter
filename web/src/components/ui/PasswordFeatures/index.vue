<template>
    <Box
        display="Flex"
        :flexDirection="{ xs: 'Column', sm: 'Row' }"
    >
        <Box :mr="{ sm: 3 }">
            <StyledPasswordFeature :success="hasLowercaseLetter">
                <Tex size="Xxs">One lowercase letter</Tex>
            </StyledPasswordFeature>
            <StyledPasswordFeature :success="hasUppercaseLetter">
                <Tex size="Xxs">One uppercase letter</Tex>
            </StyledPasswordFeature>
        </Box>
        <Box class="password-features__list">
            <StyledPasswordFeature :success="hasNumber">
                <Tex size="Xxs">One number</Tex>
            </StyledPasswordFeature>
            <StyledPasswordFeature :success="isMinLength">
                <Tex size="Xxs">8 characters minimum</Tex>
            </StyledPasswordFeature>
        </Box>
    </Box>
</template>

<script>
import Box from '@/components/core/layout/Box'
import Tex from '@/components/core/typography/Tex'
import { StyledPasswordFeature } from './styled-components'

export default {
    name: 'PasswordFeatures',
    components: {
        Box,
        Tex,
        StyledPasswordFeature,
    },
    props: {
        hasLowercaseLetter: {
            required: true,
            type: Boolean,
        },
        hasUppercaseLetter: {
            required: true,
            type: Boolean,
        },
        hasNumber: {
            required: true,
            type: Boolean,
        },
        isMinLength: {
            required: true,
            type: Boolean,
        },
    },
}
</script>
