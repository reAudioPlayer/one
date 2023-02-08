<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

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
        max-width: calc(100vw - var(--w-sidebar));
        max-height: calc(100vh - var(--h-player));

        &.maximised {
            max-width: 100vw;
            max-height: 100vh;
        }
    }
</style>