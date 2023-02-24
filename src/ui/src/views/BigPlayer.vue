<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { usePlayerStore } from "../store/player";
import { useDataStore } from "../store/data";
import { computed, onMounted, ref, watch } from "vue";

import PlaylistEntry from "../components/songContainers/PlaylistEntry.vue";
import PlaylistHeader from "../components/songContainers/PlaylistHeader.vue";

import PlaylistItem from "../components/Catalogue/Items/Playlists/PlaylistItem.vue";
import Cover from "@/components/image/Cover.vue";

const player = usePlayerStore();
const data = useDataStore();

const playing = computed(() => player.playing);
const cover = computed(() => player.song.cover);
const songId = computed(() => player.song.id);
const playlist = computed(() => player.playlist);
const title = computed(() => `${player.song.title} • ${player.song.artist}`);
const playlists = computed(() => data.playlists);

const playlistScroll = ref(null);

const emit = defineEmits(["maximise"]);

document.title = title.value;
// watch title
watch(title, (newTitle) => {
    document.title = newTitle;
});

onMounted(() => {
    window.setTimeout(() => {
        if (playlistScroll.value?.scrollTop) {
            return;
        }

        const scroll = document.getElementById(`bplayer-entry-${songId.value}`)?.offsetTop;

        if (scroll >= 354) {
            playlistScroll.value.scrollTop = scroll - 354;
        }
    }, 1000);
})

let maximised = ref(false);
const toggleMaximise = () => {
    maximised.value = !maximised.value;
    emit("maximise", maximised.value);
};
const noPlaylist = ref(false); // hide playlist
const animate = ref(false); // animations

const selectedSongId = ref(-1);
</script>

<template>
    <div class="bigPlayer">
        <template v-if="player.loaded">
            <div class="upNow">
                <Cover
                    :class="{ playing, animate }"
                    :src="cover"
                    class="drop-shadow-2xl"
                    type="track"
                    with-ambient
                />
                <div :class="{ playing, animate }" class="blocks">
                    <div :style="{'animation-delay': '0s'}" class="block"></div>
                    <div :style="{'animation-delay': '.25s'}" class="block"></div>
                    <div :style="{'animation-delay': '.5s'}" class="block"></div>
                </div>
            </div>
            <div v-if="!noPlaylist" class="playlistOverflow drop-shadow-2xl">
                <div ref="playlistScroll" class="playlist">
                    <PlaylistHeader />
                    <PlaylistEntry
                        v-for="(element, index) in playlist.songs"
                        :id="'bplayer-entry-' + element.id"
                        :key="element.source"
                        :index="index"
                        :selected="selectedSongId == element.id"
                        :song="element"
                        with-cover
                        @click="selectedSongId == element.id ? selectedSongId = -1 : selectedSongId = element.id"
                    />
                </div>
            </div>

            <div class="settings">
            <span class="iconButton material-symbols-rounded"
                  @click="toggleMaximise">{{ maximised ? "fullscreen_exit" : "fullscreen" }}</span>
                <span :style="{ transform: `rotate(${ noPlaylist ? 0 : 180 }deg)` }" class="iconButton material-symbols-rounded"
                      @click="() => noPlaylist = !noPlaylist">menu_open</span>
                <span class="iconButton material-symbols-rounded"
                      @click="() => animate = !animate">{{
                        !animate ? "animation" : "motion_photos_off"
                    }}</span>
            </div>
        </template>
        <template v-else>
            <div class="no-playlist-selected">
                <div class="wrapper">
                    <h2>Nothing playing yet...</h2>
                    <div class="playlists">
                        <playlist-item
                            v-for="playlist in playlists"
                            :key="playlist.id"
                            :cover="playlist.cover"
                            :description="playlist.description"
                            :title="playlist.name"
                            @click.stop="() => player.loadPlaylist(playlist.id)"
                        />
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.settings {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    padding: 10px;
}

.bigPlayer {
    overflow: hidden;
}

.iconButton {
    font-size: 2em;
    border-radius: 10px;
    padding: 5px;

    &:hover {
        cursor: pointer;
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        background: var(--bg-hover-lt);
        color: var(--fg-secondary);
    }
}

.bigPlayer {
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 40px;
    align-items: center;
    z-index: 1;
    height: 100%;
    filter: none;
}

.bigPlayer .upNow {
    flex: 3;
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;

    @keyframes pump {
        0% {
            transform: scale(1);
            opacity: 0;
        }
        6% {
            transform: scale(1);
            opacity: 0;
        }
        7% {
            transform: scale(1);
            opacity: 1;
        }
        85% {
            transform: scale(1);
            opacity: 1;
        }
        95% {
            transform: scale(5);
            opacity: 0;
        }
        97% {
            transform: scale(0);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }

    img {
        transition: transform .5s;
        animation: pump 20s infinite ease-in-out;

        &:not(.playing) {
            transform: scale(0.95);
            animation: none;
        }

        &:not(.animate) {
            animation: none;
        }
    }

    .blocks {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 80%;
        height: 100%;
        max-width: min(80%, 600px);
        border-radius: 20px;
        position: absolute;

        @keyframes increase1 {
            0% {
                transform: scaleX(0);
                transform-origin: 0% 50%;
            }
            1% {
                transform: scaleX(0);
            }
            4% {
                transform: scaleX(1);
                transform-origin: 0% 50%;
            }
            6% {
                transform: scaleX(1);
                transform-origin: 100% 50%;
            }
            9% {
                transform: scaleX(0);
            }
            100% {
                transform: scaleX(0);
                transform-origin: 100% 50%;
            }
        }

        .block {
            transform: scaleX(0);
            background: var(--fg-contrast);
            width: 100%;
            flex: 1;
            transform-origin: 0% 50%;

            animation: increase1 20s infinite ease-in-out;

            &:first-child {
                border-radius: 20px 20px 0 0;
            }

            &:last-child {
                border-radius: 0 0 20px 20px;
            }
        }

        &:not(.animate) .block, &:not(.playing) .block {
            animation: none;
            opacity: 0;
        }
    }
}

.bigPlayer .upNow img {
    width: 80%;
    height: auto;
    max-width: 600px;
    border-radius: 20px;
}

.bigPlayer .playlistOverflow {
    flex: 2;
    height: calc(100% - 220px);
    margin: 100px 0;
    background: var(--bg-base-lt);
    border-radius: 20px;
    overflow: hidden;
}

.bigPlayer .playlistOverflow .playlist {
    overflow-y: auto;
    height: 100%;
    padding: 10px 20px;
}

.no-playlist-selected {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    .wrapper {
        width: 80%;
        background: var(--bg-base-lt);
        border-radius: 20px;
        overflow: hidden;
        padding: 20px;

        h2 {
            margin-top: 0;
        }

        .playlists {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

            .wrapper {
                padding: 0;
            }
        }
    }
}
</style>