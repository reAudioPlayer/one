<script lang="ts" setup>
import {Playable, usePlayerStore} from "../store/player";
import HtmlAudio from "./HtmlAudio.vue";
import {computed, onMounted, Ref, ref, watch} from "vue";
import Cover from "../components/image/Cover.vue";
import Marquee from "../components/Marquee.vue";
import ProgressBar from "../components/ProgressBar.vue";
import IconDropdown from "../components/inputs/IconDropdown.vue";
import {useSettingsStore} from "../store/settings";
import {pictureInPictureStatus, requestPictureInPicture} from "../pictureInPicture";
import Spinner from "../components/loaders/Spinner.vue";
import {hashTrack, isMobile} from "../common";
import WaveAudio from "./WaveAudio.vue";

const player = usePlayerStore();
const settings = useSettingsStore();

const playable: Ref<Playable> = ref(null);

const selectedPlaybackDevice = ref("");
const playbackDevices = computed(() => {
    return player.sharedPlayer.connections.map(c => ({
        value: c.id,
        label: c.friendlyName,
    }));
});
watch(selectedPlaybackDevice, (value) => {
    if (value === player.sharedPlayer.me?.id) {
        player.sharedPlayer.makeMePlayer();
        player.setPlaying(false);
    }
    else
        setPlayerTo(value);
});
watch(() => player.sharedPlayer.connections, connections => {
    if (!selectedPlaybackDevice.value || !connections.find(c => c.id === selectedPlaybackDevice.value)) {
        selectedPlaybackDevice.value = player.sharedPlayer.me?.id;
    }
});

const setPlayerTo = (id: string) => {
    const connection = player.sharedPlayer.connections.find(c => c.id === id);
    if (connection) {
        player.sharedPlayer.setPlayer(connection);
        playable.value = player.sharedPlayer;
    }
}

onMounted(() => {
    selectedPlaybackDevice.value = player.sharedPlayer.me?.id;
});

watch(playable, () => {
    player.setPlayer(playable.value);
});

onMounted(() => {
    player.setPlayer(playable.value);
});

const mobileExpanded = ref(false);

const onThisDevice = computed(() => {
    return selectedPlaybackDevice.value === player.sharedPlayer.me?.id;
});
const showWebPlayer = computed(() => {
    return settings.player.type === "web" && onThisDevice.value;
});
const showWebWavePlayer = computed(() => {
    return settings.player.type === "web/wave" && onThisDevice.value;
});
</script>
<template>
    <div class="player">
        <HtmlAudio
            v-if="showWebPlayer"
            ref="playable"
        />

        <div v-if="!isMobile" class="desktop mx-4">
            <div class="song-info">
                <router-link class="linkOnHover" to="/player">
                    <Cover
                        :src="player.song.cover"
                        class="cover rounded-md"
                    />
                </router-link>
                <template v-if="player.loaded">
                    <div class="title-artist">
                        <router-link :to="`/track/${hashTrack(player.song.id)}`" class="linkOnHover">
                            <Marquee :text="player.song.title" class="" />
                        </router-link>
                        <router-link :to="`/search/${player.song.artist}`" class="linkOnHover">
                            <Marquee :text="player.song.artist" class="text-muted text-xs" />
                        </router-link>
                    </div>
                    <span
                        :class="{'ms-fill': player.song.favourite}"
                        class="favourite text-xl cursor-pointer material-symbols-rounded ms-wght-300"
                        @click="player.toggleFavourite"
                    >
                        favorite
                    </span>
                        <template v-if="settings.player.pictureInPicture">
                            <Spinner
                                v-if="pictureInPictureStatus == 'loading'"
                            />
                            <span
                                v-else
                                class="favourite material-icons-round cursor-pointer text-xl"
                                @click="requestPictureInPicture"
                            >
                            {{ pictureInPictureStatus == "ready" ? "picture_in_picture_alt" : "error" }}
                        </span>
                        </template>
                </template>
                <template v-else>
                    <router-link :to="`/collection/playlists`">
                        <Marquee class="text-xs text-muted" text="Nothing playing yet..." />
                    </router-link>
                </template>
            </div>
            <div class="controls">
                <div class="top">
                    <span
                        class="cursor-pointer material-symbols-rounded ms-wght-300"
                        @click="player.toggleShuffle"
                    >
                        {{player.shuffleIcon}}
                    </span>
                    <span
                        :class="{
                            'cursor-not-allowed': !player.loaded,
                        }"
                        :disabled="!player.loaded"
                        class="cursor-pointer material-symbols-rounded ms-fill"
                        @click="player.previous"
                    >
                        skip_previous
                    </span>
                    <span
                        :class="{
                            'cursor-not-allowed': !player.loaded,
                        }"
                        :disabled="!player.loaded"
                        class="cursor-pointer material-symbols-rounded ms-fill text-4xl"
                        @click="player.playPause"
                    >
                        {{ player.playing ? "pause_circle" : "play_circle" }}
                    </span>
                    <span
                        :class="{
                            'cursor-not-allowed': !player.loaded,
                        }"
                        :disabled="!player.loaded"
                        class="cursor-pointer material-symbols-rounded ms-fill"
                        @click="player.next"
                    >
                        skip_next
                    </span>
                    <span
                        class="cursor-pointer material-symbols-rounded ms-wght-300"
                        @click="player.toggleRepeat"
                    >
                        {{ player.repeat }}
                    </span>
                </div>
                <div class="bottom">
                    <div class="display">
                        <span
                            class="text-xs text-muted text-right cursor-pointer"
                            @click="settings.player.type = settings.player.type === 'web' ? 'web/wave' : 'web'"
                        >
                            {{ player.displayProgress }}
                        </span>
                        <WaveAudio
                            v-if="showWebWavePlayer"
                            ref="playable"
                        />
                        <ProgressBar
                            v-else
                            v-model="player.progressPercent"
                            max="1000"
                            @change="e => player.seekPercent(e / 10)"
                        />
                        <span
                            class="text-xs text-muted text-left"
                        >
                            {{ player.song.duration }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="aux">
                <IconDropdown
                    v-model="selectedPlaybackDevice"
                    :class="{
                        'on-this-device': onThisDevice
                    }"
                    :options="playbackDevices"
                    icon="devices"
                />
                <span
                    class="cursor-pointer material-symbols-rounded ms-fill"
                    @click="player.toggleMute"
                >
                    {{ player.muteIcon }}
                </span>
                <ProgressBar
                    v-model="player.volume"
                    max="100"
                    @change="e => player.setVolume(e)"
                />
            </div>
        </div>
        <div v-else class="mobile mx-4">
            <audio
                v-if="isMobile && !onThisDevice"
                id="hijackVolume"
                @volumechange="player.setVolume($event.target.volume * 100)"
            />
            <div
                v-show="!mobileExpanded"
                class="small"
                @click="mobileExpanded = true"
            >
                <Cover
                    :src="player.song.cover"
                    class="cover rounded-md"
                />
                <div class="artist-title overflow-hidden">
                    <Marquee :text="player.song.title" class="text-sm"/>
                    <Marquee :text="player.song.artist" class="text-xs text-muted"/>
                </div>
                <IconDropdown
                    v-model="selectedPlaybackDevice"
                    :class="{
                        'on-this-device': onThisDevice
                    }"
                    :options="playbackDevices"
                    class="material-symbols-rounded"
                    icon="devices"
                    @click.stop
                />
                <span
                    class="cursor-pointer material-symbols-rounded ms-fill text-xl"
                    @click.stop="player.playPause"
                >
                    {{ player.playing ? "pause" : "play_arrow" }}
                </span>
            </div>
            <div v-show="mobileExpanded" class="full">
                <div>
                    <span
                        class="material-symbols-rounded ms-wght-500"
                        @click="mobileExpanded = false"
                    >
                        expand_more
                    </span>
                </div>
                <router-link class="my-auto linkOnHover" to="/player">
                    <Cover
                        :src="player.song.cover"
                        class="cover rounded-md"
                    />
                </router-link>
                <div class="rest">
                    <div class="song-info">
                        <div class="rest"></div>
                        <div class="title-artist mb-4">
                            <router-link :to="`/track/${hashTrack(player.song.id)}`" class="linkOnHover">
                                <Marquee :text="player.song.title" class="text-2xl font-bold" />
                            </router-link>
                            <router-link :to="`/search/${player.song.artist}`" class="linkOnHover">
                                <Marquee :text="player.song.artist" class="text-muted text-xs" />
                            </router-link>
                        </div>
                    </div>
                    <div class="controls mb-4">
                        <div class="top">
                            <span
                                class="cursor-pointer material-symbols-rounded ms-wght-300"
                                @click="player.toggleShuffle"
                            >
                                {{ player.shuffleIcon}}
                            </span>
                            <span
                                class="cursor-pointer material-symbols-rounded ms-fill"
                                @click="player.previous"
                            >
                                skip_previous
                            </span>
                            <span
                                class="cursor-pointer material-symbols-rounded ms-fill text-4xl"
                                @click="player.playPause"
                            >
                                {{ player.playing ? "pause_circle" : "play_circle" }}
                            </span>
                            <span
                                class="cursor-pointer material-symbols-rounded ms-fill"
                                @click="player.next"
                            >
                                skip_next
                            </span>
                            <span
                                class="cursor-pointer material-symbols-rounded ms-wght-300"
                                @click="player.toggleRepeat"
                            >
                                {{ player.repeat }}
                            </span>
                        </div>
                        <div class="bottom">
                            <WaveAudio
                                v-if="showWebWavePlayer"
                                ref="playable"
                            />
                            <ProgressBar
                                v-else
                                v-model="player.progressPercent"
                                max="1000"
                                @change="e => player.seekPercent(e / 10)"
                            />
                            <div class="flex flex-row justify-between">
                                <span
                                    class="text-xs text-muted text-right"
                                >
                                    {{ player.displayProgress }}
                                </span>
                                <span
                                    class="text-xs text-muted text-left"
                                >
                                    {{ player.song.duration }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="aux flex flex-row justify-between">
                        <div class="flex flex-row">
                            <span
                                    :class="{'ms-fill': player.song.favourite}"
                                    class="favourite text-xl cursor-pointer material-symbols-rounded ms-wght-300"
                                    @click="player.toggleFavourite"
                                >
                                favorite
                            </span>
                                <template v-if="settings.player.pictureInPicture">
                                    <Spinner
                                        v-if="pictureInPictureStatus == 'loading'"
                                    />
                                    <span
                                        v-else
                                        class="favourite material-icons-round cursor-pointer text-xl ml-2"
                                        @click="requestPictureInPicture"
                                    >
                                        {{ pictureInPictureStatus == "ready" ? "picture_in_picture_alt" : "error" }}
                                    </span>
                            </template>
                        </div>

                        <IconDropdown
                            v-model="selectedPlaybackDevice"
                            :class="{
                                'on-this-device': onThisDevice
                            }"
                            :options="playbackDevices"
                            icon="devices"
                        />
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<style lang="scss">
.player .on-this-device > .material-symbols-rounded {
    color: var(--fg-secondary)
}
</style>
<style lang="scss" scoped>
.player {
    background: var(--bg-base-lt);
    border-top: 1px solid var(--border-base);
    z-index: 2;
}

.desktop {
    display: grid;
    height: calc(var(--h-player) - 1px);
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1fr);
    grid-template-areas: "song-info controls aux";
    gap: 10px;

    .song-info {
        grid-area: song-info;
        display: grid;
        align-items: center;
        grid-template-columns: calc(var(--h-player) - 40px) fit-content(100%) 20px 20px;
        gap: 10px;
        overflow: hidden;

        .title-artist {
            overflow: hidden;
        }

        div {
            margin: auto 0;
        }
    }

    .controls {
        grid-area: controls;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr auto;

        .top {
            display: grid;
            grid-template-columns: repeat(2, 20px) 40px repeat(2, 20px);
            gap: 1.5em;
            justify-content: center;

            span {
                margin: auto 0;
                font-size: 1.5rem;

                &:nth-child(3) {
                    font-size: 2.5rem;
                }
            }
        }

        .bottom .display {
            display: grid;
            grid-template-columns: 1fr 10fr 1fr;
            gap: .5em;
            margin-bottom: .5em;
            align-items: center;
        }
    }

    .aux {
        grid-area: aux;
        justify-content: end;
        display: grid;
        grid-template-columns: 20px 20px minmax(auto, 8vw);
        gap: 1em;
        align-items: center;
    }
}

.mobile {
    .small {
        display: grid;
        grid-template-columns: calc(var(--h-player-mobile) - 1em) 1fr 30px 30px;
        gap: 1em;
        margin: .5em;
        align-items: center;
        max-width: calc(100vw - 2em);

        .cover {
            border-radius: 10px;
            background: var(--bg-base-dk);
            margin: auto 0;
        }
    }

    .full {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: calc(100vh - var(--h-sidebar));
        max-height: calc(100vh - var(--h-sidebar));
        overflow: hidden;
        background: var(--bg-base);
        padding: 2em;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 30px 1fr fit-content(100%);

        .cover {
            filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.3));
        }

        .controls {
            display: flex;
            flex-direction: column-reverse;

            .top {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                gap: 1.5em;
                justify-content: center;

                span {
                    margin: auto 0;
                    font-size: 2rem;

                    &:nth-child(3) {
                        font-size: 3rem;
                    }
                }
            }
        }
    }
}
</style>