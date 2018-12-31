<template>
    <Box
        alignItems="Center"
        bb
        backgroundColor="White"
        borderColor="Gray9"
        el="Nav"
        display="Flex"
        fluidWidth
        justifyContent="SpaceBetween"
        :pv="1.25"
    >
        <Box
            alignItems="Baseline"
            display="Flex"
            fluidHeight
            :pt="0.5"
        >
            <StyledLink
                :active="$route.name === 'Home'"
                :to="{ name: 'Home'}"
            >
                Budgets
            </StyledLink>
            <StyledLink
                v-if="false"
                :active="$route.name === 'Transactions'"
                :to="{ name: 'Transactions'}"
            >
                Transactions
            </StyledLink>
        </Box>
        <Box
            display="Flex"
            fluidHeight
        >
            <Box
                alignItems="Center"
                display="Flex"
                position="Relative"
            >
                <StyledUserContainer
                    v-click-outside="onClickOutsideDropdown"
                    :active="isDropDownOpen"
                    @click="onClickToggleDropdown"
                >
                    <Box
                        alignItems="Center"
                        b
                        backgroundColor="Gold2"
                        borderColor="Gold1"
                        cornerRadius="Circle"
                        display="Flex"
                        justifyContent="Center"
                        :css="`
                            height: 2rem;
                            width: 2rem;
                        `"
                    >
                        <Tex
                            color="White"
                            el="Span"
                            size="Md"
                            transform="Uppercase"
                            weight="Bold"
                        >{{initial}}</Tex>
                    </Box>
                    <ChevronDownIcon />
                </StyledUserContainer>

                <StyledDropdown :open="isDropDownOpen">
                    <StyledDropdownItem v-if="false">
                        <Tex
                            color="Gray2"
                            size="Xs"
                        >
                            <router-link :to="{ name: 'Accounts'}">Connected Accounts</router-link>
                        </Tex>
                    </StyledDropdownItem>
                    <StyledDropdownItem>
                        <button @click="onClickLogOut">
                            <Tex
                                color="Gray2"
                                size="Xs"
                            >
                                Log Out
                            </Tex>
                        </button>
                    </StyledDropdownItem>
                </StyledDropdown>
            </Box>
        </Box>
    </Box>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { get } from '@/utils'
import ChevronDownIcon from '@/assets/icons/chevron-down.svg'
import Logo from '@/assets/icons/logo.svg'
import Box from '@/components/core/layout/Box'
import Tex from '@/components/core/typography/Tex'
import {
    StyledLink,
    StyledUserContainer,
    StyledDropdown,
    StyledDropdownItem,
} from './styled-components'

export default {
    name: 'Navbar',
    components: {
        Box,
        ChevronDownIcon,
        Logo,
        StyledDropdown,
        StyledDropdownItem,
        StyledLink,
        StyledUserContainer,
        Tex,
    },
    data: () => ({
        isDropDownOpen: false,
    }),
    computed: {
        ...mapGetters(['user']),
        initial() {
            return (
                get(() => this.user.first_name[0]) ||
                get(() => this.user.email[0])
            )
        },
    },
    methods: {
        ...mapActions(['LOG_OUT_USER']),
        onClickToggleDropdown() {
            this.isDropDownOpen = !this.isDropDownOpen
        },
        onClickOutsideDropdown() {
            if (this.isDropDownOpen) this.isDropDownOpen = false
        },
        async onClickLogOut() {
            await this.LOG_OUT_USER()
            this.$router.push({ name: 'LogIn' })
        },
    },
}
</script>
