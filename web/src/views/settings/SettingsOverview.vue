<template>
    <div class="settings-overview">
        <SettingsBasicInfoForm/>
        <SettingsChangePasswordForm/>
    </div>
</template>

<script>
export default {
    name: 'SettingsOverview',
    components: {
        SettingsBasicInfoForm: () =>
            import('./components/SettingsBasicInfoForm'),
        SettingsChangePasswordForm: () =>
            import('./components/SettingsChangePasswordForm'),
    },
    metaInfo: {
        title: 'Account',
    },
}
</script>


<style lang="scss" scoped>
@import '../../assets/styles/variables';
@import '../../assets/styles/functions';
@import '../../assets/styles/mixins';

.settings-overview {
    @include flex-column;
    @include respond-to(md) {
        @include flex-row;
    }
}
</style>
