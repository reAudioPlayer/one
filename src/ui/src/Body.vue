<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="body" :class="{ maximised: maximised }">
        <router-view @maximise="onMaximiseChange" class="view" />
    </div>
</template>

<script>
export default {
    name: "Body",
    data() {
        return {
            maximised: false,
        };
    },
    methods: {
        onMaximiseChange(val) {
            this.maximised = val;
            this.$emit("maximise", val);
        },
    },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/icon?family=Material+Icons+Outlined");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons+Round");

$horizontalWidth: 1200px;
$mobileWidth: 950px;

div.body {
    flex-grow: 1;
    padding-left: calc(var(--w-sidebar) + 40px);
    margin-top: var(--h-header);
    margin-bottom: var(--h-player);
    max-height: calc(100vh - var(--h-header) - var(--h-player));
    height: 100vh;
    height: 100svh;
    width: 100vw;
    overflow-x: hidden;
    overflow-y: auto;

    &.maximised {
        max-width: 100vw;
        max-height: 100vh;
    }

    @media screen and (max-width: $mobileWidth) {
        max-width: 100vw;
        max-height: calc(
            100vh - var(--player-height-mobile) - var(--sidebar-height)
        );
        padding-left: 0;
        margin-bottom: 0;
    }
}
</style>
