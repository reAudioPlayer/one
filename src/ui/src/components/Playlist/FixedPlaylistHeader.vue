<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="fixedPlaylistHeader" :style="{ '--colour': accentColour }">
        <div class="upperWrapper">
            <span
                id="loadPlaylist"
                class="material-symbols-rounded hideIfMobile ms-fill"
                @click="this.$emit('loadPlaylist')"
                >play_circle</span
            >
            <h3 class="font-bold">{{ title }}</h3>
        </div>
        <div class="padding-20 darkback">
            <PlaylistHeader
                class="fixedHeader hideIfMobile"
                with-album
                with-more
            />
        </div>
    </div>
</template>

<script lang="ts">
import PlaylistHeader from "@/components/songContainers/PlaylistHeader.vue";

export default {
    name: "FixedPlaylistHeader",
    components: {
        PlaylistHeader,
    },
    props: {
        title: String,
        accentColour: {
            type: String,
        },
    },
};
</script>

<style lang="scss" scoped>
$mobileWidth: 950px;

.padding-20 {
    padding-left: 20px;
    padding-right: 20px;
}

.darkback {
    backdrop-filter: blur(100px);

    padding-top: 10px;
    padding-bottom: 10px;
}

.fixedHeader {
    margin-right: var(--w-scrollbar);
}

.upperWrapper {
    padding: 10px;
    display: flex;
    flex-direction: row;
    backdrop-filter: blur(100px);

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
    top: var(--h-header);
    left: calc(var(--w-sidebar) + 40px);
    right: -3px;
    padding-right: 3px;
    background: var(--bg-base-lt);
    border: var(--border-container);
    border-top: none;

    z-index: 100;
    overflow: clip;
    border-radius: 0 0 20px 20px;

    @media screen and (max-width: $mobileWidth) {
        left: 0;
        height: 45px;
    }
}
</style>
