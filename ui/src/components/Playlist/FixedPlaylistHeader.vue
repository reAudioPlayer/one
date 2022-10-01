<template>
    <div class="fixedPlaylistHeader">
        <div class="upperWrapper">
            <span id="loadPlaylist" @click="this.$emit('loadPlaylist')" class="material-symbols-rounded hideIfMobile">play_circle</span>
            <h3 class="font-bold">{{title}}</h3>
        </div>
        <grid-header class="padding-20 darkback hideIfMobile" />
    </div>
</template>

<script>
import GridHeader from './GridHeader.vue'

export default {
    name: "FixedPlaylistHeader",
    components: {
        GridHeader
    },
    props: {
        title: String
    }
}
</script>

<style scoped lang="scss">
    $mobileWidth: 950px;

    .padding-20 {
        padding-left: 20px;
        padding-right: 20px;
    }

    .darkback {
        background: var(--fixedplaylistheader-background);
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid var(--fixedplaylistheader-border);
    }

    .upperWrapper {
        padding: 10px;
        display: flex;
        flex-direction: row;
        background: var(--accent-dark);

        @media screen and (max-width: $mobileWidth) {
            justify-content: center;
        }
    }

    #loadPlaylist {
        font-size: 2.5em;
        line-height: 35px;
        width: 42px;
        vertical-align: middle;
    }

    #loadPlaylist:hover {
        cursor: pointer;
        font-size: 2.6em;
    }

    h3 {
        font-size: 1.4em;
        display: inline;
        margin: 0;
        margin-left: 10px;

        @media screen and (max-width: $mobileWidth) {
            font-size: 1em;
        }
    }

    .fixedPlaylistHeader {
        position: fixed;
        top: var(--header-height);
        left: calc(var(--sidebar-width) + 40px);
        right: -3px;
        padding-right: 3px;

        z-index: 100;
        height: 80px;
        padding-bottom: 10px;

        @media screen and (max-width: $mobileWidth) {
            left: 0;
            height: 45px;
        }
    }
</style>
