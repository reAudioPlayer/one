<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="fixedPlaylistHeader" :style="{ '--colour': accentColour }">
        <AmbientBackground v-if="playlist.cover" :src="playlist.cover" />
        <div class="upperWrapper">
            <span
                id="loadPlaylist"
                class="material-symbols-rounded hideIfMobile ms-fill"
                @click="this.$emit('loadPlaylist')"
            >
                {{ playOrPauseIcon }}
            </span>
            <h3 class="font-black">{{ playlist.name }}</h3>
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

<script lang="ts" setup>
import PlaylistHeader from "@/components/songContainers/PlaylistHeader.vue";
import AmbientBackground from "@/components/image/AmbientBackground.vue";
import { PropType, computed } from "vue";
import { IFullPlaylist } from "../../common";
import { usePlayerStore } from "../../store/player";

const player = usePlayerStore();

const props = defineProps({
    accentColour: {
        type: String,
    },
    playlist: {
        type: Object as PropType<IFullPlaylist>,
        required: true,
    },
});

const playOrPauseIcon = computed(() =>
    player.playlistPlayOrPauseIcon(props.playlist.id)
);
</script>

<style lang="scss" scoped>
$mobileWidth: 950px;

.padding-20 {
    padding-left: 20px;
    padding-right: 20px;
}

.darkback {
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

    @media screen and (max-width: $mobileWidth) {
        justify-content: center;
    }
}

#loadPlaylist {
    font-size: 2.5em;
    line-height: 35px;
    width: 42px;
    vertical-align: middle;
    cursor: pointer;
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

@keyframes slideDown {
    0% {
        transform: translateY(-100%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

.fixedPlaylistHeader {
    position: fixed;
    top: var(--h-header);
    left: calc(var(--w-sidebar) + 40px);
    right: -3px;
    padding-right: 3px;
    border: var(--border-container);
    border-top: none;
    backdrop-filter: blur(100px);

    animation: slideDown 0.3s ease-in-out;

    z-index: 100;
    overflow: clip;
    border-radius: 0 0 20px 20px;

    @media screen and (max-width: $mobileWidth) {
        left: 0;
        height: 45px;
    }
}
</style>
