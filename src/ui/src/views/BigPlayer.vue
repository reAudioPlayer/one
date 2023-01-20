<script setup>
import {usePlayerStore} from "@/store/player";
import {useDataStore} from "@/store/data";
import {computed, onMounted, ref, watch} from "vue";

import PlaylistEntry from '../components/songContainers/PlaylistEntry.vue'
import PlaylistHeader from '../components/songContainers/PlaylistHeader.vue'

import PlaylistItem from "@/components/Catalogue/Items/Playlists/PlaylistItem";
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

const maximised = ref(false);
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
                    :src="cover"
                    :class="{ playing, animate }"
                    class="drop-shadow-2xl"
                    type="track"
                />
                <div class="blocks" :class="{ playing, animate }">
                    <div class="block" :style="{'animation-delay': '0s'}"></div>
                    <div class="block" :style="{'animation-delay': '.25s'}"></div>
                    <div class="block" :style="{'animation-delay': '.5s'}"></div>
                </div>
            </div>
            <div v-if="!noPlaylist" class="playlistOverflow drop-shadow-2xl">
                <div class="playlist" ref="playlistScroll">
                    <PlaylistHeader />
                    <PlaylistEntry
                        v-for="(element, index) in playlist.songs"
                        :key="element.source"
                        @requestUpdate="updatePlaylist"
                        :song="element"
                        :index="index"
                        @click="selectedSongId == element.id ? selectedSongId = -1 : selectedSongId = element.id"
                        @update="updatePlaylist"
                        :selected="selectedSongId == element.id"
                        with-cover
                    />
                </div>
            </div>

            <div class="settings">
            <span @click="toggleMaximise"
                  class="iconButton material-symbols-rounded">{{ maximised ? "fullscreen_exit" : "fullscreen" }}</span>
                <span @click="() => noPlaylist = !noPlaylist" class="iconButton material-symbols-rounded"
                      :style="{ transform: `rotate(${ noPlaylist ? 0 : 180 }deg)` }">menu_open</span>
                <span @click="() => animate = !animate"
                      class="iconButton material-symbols-rounded">{{
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
                            :title="playlist.name"
                            :description="playlist.description"
                            @click.stop="() => player.loadPlaylist(playlist.id)"
                        />
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss">
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
        background: var(--font-darker);
        color: var(--accent);
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
            background: var(--font-contrast);
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
    background: var(--background-light);
    border-radius: 20px;
    overflow: hidden;
}

.bigPlayer .playlistOverflow .playlist {
    overflow-y: auto;
    height: 100%;
    padding: 10px;
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
        background: var(--background-light);
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