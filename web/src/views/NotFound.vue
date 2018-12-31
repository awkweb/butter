<template>
    <Grid
        maxWidth="Md"
        :ph="4"
    >
        <Row>
            <Column
                fluidHeight
                :bottomPadding="false"
                :md="12"
                :xs="12"
            >
                <Box
                    display="Flex"
                    justifyContent="Center"
                    :mt="6"
                >
                    <Tex weight="Bold">Something went wrong :(</Tex>
                </Box>
            </Column>
        </Row>
    </Grid>
</template>

<script>
import Box from '@/components/core/layout/Box'
import Column from '@/components/core/layout/Column'
import Grid from '@/components/core/layout/Grid'
import Row from '@/components/core/layout/Row'
import Tex from '@/components/core/typography/Tex'

export default {
    name: 'NotFound',
    components: {
        Box,
        Column,
        Grid,
        Row,
        Tex,
    },
    metaInfo: {
        title: 'Something went wrong',
    },
}
</script>


<style lang="scss" scoped>
@import '../assets/styles/partials/variables';
@import '../assets/styles/partials/functions';
@import '../assets/styles/partials/mixins';

.not-found {
    @include flex-row;
    @include flex-center;
    @include page;
}
</style>
