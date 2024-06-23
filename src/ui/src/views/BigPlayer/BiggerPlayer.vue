<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { usePlayerStore } from "../../store/player";
import { useDataStore } from "../../store/data";
import { computed, ref, watch } from "vue";
import Cover from "@/components/image/Cover.vue";
import { getCover } from "../../components/image/placeholder";
import { debounce } from "lodash";
import ProgressBar from "@/components/ProgressBar.vue";

const player = usePlayerStore();
const data = useDataStore();

const playing = computed(() => player.playing);
const cover = computed(() => player.song.cover);
const title = computed(() =>
    player.loaded
        ? `${player.song.title} • ${player.song.artist}`
        : "reAudioPlayer One"
);
const playlists = computed(() => data.playlists);
const currentPlaylistName = computed(() => player.playlist?.name);
const showing = ref(false);
const showControls = ref(false);
const progressPercent = ref(0);

const resolvedCover = ref(null);

document.title = title.value;
watch(title, (newTitle) => {
    document.title = newTitle;
});

watch(
    () => player.song.cover,
    async () => {
        resolvedCover.value = await getCover(
            player.song.cover,
            title.value,
            1000
        );
    }
);

watch(
    () => player.progressPercent,
    (percent) => {
        progressPercent.value = percent;
    }
);

const emit = defineEmits(["close"]);

const show = () => {
    showing.value = true;
    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("mousemove", onMouseMove);

    // try fullscreen
    if (document.fullscreenEnabled) {
        document.documentElement.requestFullscreen();
    }
};

const hide = () => {
    console.log("hiding...");
    showing.value = false;
    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.removeEventListener("mousemove", onMouseMove);
    emit("close");
};

defineExpose({
    show,
    hide,
});

const hideAfterDebounce = debounce(() => {
    showControls.value = false;
}, 1000);

const onMouseMove = () => {
    showControls.value = true;
    hideAfterDebounce();
};

const onFullscreenChange = () => {
    if (!document.fullscreenElement) {
        hide();
    }
};
</script>

<template>
    <Teleport to="#fullscreen-target" v-if="showing">
        <div class="fullscreen">
            <div
                class="bg-img"
                :style="{ backgroundImage: `url(${cover})` }"
            ></div>
            <div class="now">
                <Cover
                    :src="cover"
                    :alt="title"
                    class="cover"
                    :class="{ playing }"
                />
                <div class="details">
                    <p class="playlist">
                        playing from {{ currentPlaylistName }}
                    </p>
                    <h1 class="title text-5xl mb-4">{{ player.song.title }}</h1>
                    <h3 class="artist text-xl">
                        {{ player.song.artist }}
                    </h3>
                </div>
            </div>
            <div
                class="controls"
                :class="{ showControls: showControls || !playing }"
            >
                <div class="progress">
                    <span class="text-xs text-muted text-right cursor-pointer">
                        {{ player.displayProgress }}
                    </span>
                    <ProgressBar
                        v-model="progressPercent"
                        :max="1000"
                        @change="(e) => player.seekPercent(e / 10)"
                    />
                    <span class="text-xs text-muted text-left">
                        {{ player.displayDuration }}
                    </span>
                </div>
                <div class="lower">
                    <div></div>
                    <div class="actions">
                        <span
                            class="icon cursor-pointer material-symbols-rounded ms-wght-300"
                            @click="player.toggleShuffle"
                        >
                            {{ player.shuffleIcon }}
                        </span>
                        <span
                            class="icon cursor-pointer material-symbols-rounded ms-fill"
                            @click="player.previous"
                        >
                            skip_previous
                        </span>
                        <span
                            class="cursor-pointer material-symbols-rounded ms-fill text-5xl"
                            @click="player.playPause"
                        >
                            {{
                                player.playing ? "pause_circle" : "play_circle"
                            }}
                        </span>
                        <span
                            class="icon cursor-pointer material-symbols-rounded ms-fill"
                            @click="player.next"
                        >
                            skip_next
                        </span>
                        <span
                            class="icon cursor-pointer material-symbols-rounded ms-wght-300"
                            @click="player.toggleRepeat"
                        >
                            {{ player.repeat }}
                        </span>
                    </div>
                    <div class="volume">
                        <span
                            class="icon cursor-pointer material-symbols-rounded ms-fill select-none"
                            @click="player.toggleMute"
                        >
                            {{ player.muteIcon }}
                        </span>
                        <ProgressBar
                            v-model="player.volume"
                            :max="100"
                            @change="(e) => player.setVolume(e)"
                        />
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style lang="scss" scoped>
.cover {
    width: min(40%, 400px);
    height: auto;
    max-width: 600px;
    border-radius: 20px;
    transition: transform 0.5s;

    &:not(.playing) {
        transform: scale(0.95);
        animation: none;
    }
}

.fullscreen {
    position: absolute;
    inset: 0;
    z-index: 1000;

    width: 100vw;
    width: 100svw;
    height: 100vh;
    height: 100svh;

    padding: 2em;

    display: flex;
    justify-content: flex-end;
    flex-direction: column;

    isolation: isolate;

    color: white;
    background: black;

    overflow: clip;
}

.now {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 2em;
    margin-bottom: 1em;

    .artist {
        color: #bbb;
    }

    .playlist {
        text-transform: uppercase;
        letter-spacing: 0.25ch;
        color: #aaa;
    }
}

.bg-img {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    z-index: -1;
    scale: 1.1;
    filter: blur(50px) brightness(0.25);
}

.controls {
    overflow: clip;
    gap: 1em;
    max-height: 0;
    transition: max-height 1s;

    .progress {
        margin-top: 1em;
        display: grid;
        grid-template-columns: 5ch 1fr 5ch;
        gap: 1em;
        align-items: center;
    }

    &.showControls {
        max-height: 50vh;
    }
}

.lower {
    display: grid;
    align-items: center;
    margin-top: 1em;
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1fr);

    .volume {
        display: grid;
        justify-content: end;
        gap: 1em;
        grid-template-columns: 20px minmax(auto, 8vw);
    }

    .actions {
        display: grid;
        align-items: center;
        gap: 1em;
        grid-template-columns: repeat(5, minmax(0, 5ch));
        justify-content: center;
    }
}
</style>
