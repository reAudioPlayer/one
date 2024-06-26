<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { usePlayerStore } from "../../store/player";
import { useDataStore } from "../../store/data";
import { computed, onMounted, ref, watch } from "vue";
import Playlist from "@/components/playlist/Playlist.vue";
import PlaylistItem from "@/components/playlist/PlaylistCard.vue";
import Cover from "@/components/image/Cover.vue";
import BiggerPlayer from "./BiggerPlayer.vue";

const player = usePlayerStore();
const data = useDataStore();

const biggerPlayer = ref<typeof BiggerPlayer>();

const playing = computed(() => player.playing);
const cover = computed(() => player.song.cover);
const songId = computed(() => player.song.id);
const title = computed(() =>
    player.loaded
        ? `${player.song.title} • ${player.song.artist}`
        : "reAudioPlayer One"
);
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

        playlistScroll.value.scrollToSong(songId.value);
    }, 1000);
});

let maximised = ref(false);
const toggleMaximise = () => {
    biggerPlayer.value?.show();
};
const noPlaylist = ref(false); // hide playlist
const animate = ref(false); // animations
</script>

<template>
    <div class="bigPlayer">
        <BiggerPlayer ref="biggerPlayer" />
        <template v-if="player.loaded">
            <div class="upNow">
                <Cover
                    :class="{ playing, animate }"
                    :src="cover"
                    class="drop-shadow-2xl"
                    type="track"
                    with-ambient
                    :name="player.song.title"
                />
                <div :class="{ playing, animate }" class="blocks">
                    <div
                        :style="{ 'animation-delay': '0s' }"
                        class="block"
                    ></div>
                    <div
                        :style="{ 'animation-delay': '.25s' }"
                        class="block"
                    ></div>
                    <div
                        :style="{ 'animation-delay': '.5s' }"
                        class="block"
                    ></div>
                </div>
            </div>

            <Card
                v-if="player.queue && player.playlist"
                class="playlist-overflow drop-shadow-2xl relative"
                :key="player.playlist.id"
            >
                <Playlist
                    ref="playlistScroll"
                    :playlist="{ ...player.playlist, queue: player.queue }"
                    use-queue
                    draggable
                    @rearrange="player.rearrangeQueue"
                />
            </Card>
            <div class="settings">
                <span
                    class="iconButton material-symbols-rounded"
                    @click="toggleMaximise"
                    >{{ maximised ? "fullscreen_exit" : "fullscreen" }}</span
                >
                <span
                    :style="{ transform: `rotate(${noPlaylist ? 0 : 180}deg)` }"
                    class="iconButton material-symbols-rounded"
                    @click="() => (noPlaylist = !noPlaylist)"
                    >menu_open</span
                >
                <span
                    class="iconButton material-symbols-rounded"
                    @click="() => (animate = !animate)"
                    >{{ !animate ? "animation" : "motion_photos_off" }}</span
                >
                <span
                    class="iconButton material-symbols-rounded"
                    @click="$router.push('/player/insights')"
                >
                    insights
                </span>
            </div>
        </template>
        <template v-else>
            <div class="no-playlist-selected">
                <div class="wrapper">
                    <h2>Nothing playing yet...</h2>
                    <div class="playlists">
                        <playlist-item
                            v-for="playlist in playlists"
                            :playlist="playlist"
                        />
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<style lang="scss">
.bigPlayer .upNow img {
    width: 80%;
    height: auto;
    max-width: 600px;
    border-radius: 20px;
    transition: transform 0.5s;
    animation: pump 20s infinite ease-in-out;

    &:not(.playing) {
        transform: scale(0.95);
        animation: none;
    }

    &:not(.animate) {
        animation: none;
    }
}

div.body:has(.bigPlayer) {
    overflow: visible !important;
}

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
</style>

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

.playlist-overflow {
    flex: 2;
    height: calc(100% - 220px);
    margin: 100px 0;
    overflow: hidden;

    .playlist {
        overflow-y: auto;
        height: 100%;
        padding: 10px 20px;
    }
}

.iconButton {
    font-size: 2em;
    border-radius: 10px;
    padding: 5px;
    font-variation-settings: "wght" 200;

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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    position: relative;

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

        &:not(.animate) .block,
        &:not(.playing) .block {
            animation: none;
            opacity: 0;
        }
    }
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
