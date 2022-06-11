<template>
    <div class="body" :class="{ 'maximised': maximised }">
        <router-view @maximise="onMaximiseChange" class="view" />
    </div>
</template>

<script>
    export default {
        name: 'Body',
        data() {
            return {
                maximised: false
            }
        },
        methods: {
            onMaximiseChange(val) {
                this.maximised = val;
                this.$emit('maximise', val);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import url("https://fonts.googleapis.com/icon?family=Material+Icons+Outlined");
    @import url("https://fonts.googleapis.com/icon?family=Material+Icons+Round");

    div.body {
        flex-grow: 1;
        overflow-y: auto;
        overflow-x: hidden;
        max-width: calc(100vw - var(--sidebar-width));
        max-height: calc(100vh - var(--player-height));

        &.maximised {
            max-width: 100vw;
            max-height: 100vh;
        }
    }
</style>