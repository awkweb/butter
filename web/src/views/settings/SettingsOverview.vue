<template>
    <div class="settings-overview">
        <SettingsBasicInfoForm/>
        <SettingsChangePasswordForm/>
    </div>
</template>

<script>
import SettingsBasicInfoForm from './components/SettingsBasicInfoForm'
import SettingsChangePasswordForm from './components/SettingsChangePasswordForm'

export default {
    name: 'SettingsOverview',
    components: {
        SettingsBasicInfoForm,
        SettingsChangePasswordForm,
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
