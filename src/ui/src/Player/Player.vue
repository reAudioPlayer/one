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
import {hashTrack} from "../common";

const player = usePlayerStore();
const settings = useSettingsStore();

const playable: Ref<Playable> = ref(null);

const dropdownValue = ref("");
const dropdownOptions = computed(() => {
    return player.sharedPlayer.connections.map(c => ({
        value: c.id,
        label: c.friendlyName,
    }));
});
watch(dropdownValue, (value) => {
    if (value === player.sharedPlayer.me?.id) {
        player.sharedPlayer.makeMePlayer();
        player.setPlaying(false);
    }
    else
        setPlayerTo(value);
});

const setPlayerTo = (id: string) => {
    const connection = player.sharedPlayer.connections.find(c => c.id === id);
    console.log("setPlayerTo", id, connection);
    if (connection) {
        player.sharedPlayer.setPlayer(connection);
        playable.value = player.sharedPlayer;
    }
}

onMounted(() => {
    dropdownValue.value = player.sharedPlayer.me?.id;
});

watch(playable, () => {
    console.log("playable changed");
    player.setPlayer(playable.value);
});

onMounted(() => {
    player.setPlayer(playable.value);
});

const mobileExpanded = ref(false);
</script>
<template>
    <div class="player">
        <HtmlAudio
            v-if="dropdownValue === player.sharedPlayer.me?.id"
            ref="playable"
        />

        <div class="hideIfMobile desktop mx-4">
            <div class="song-info">
                <router-link to="/player" class="linkOnHover">
                    <Cover
                        class="cover rounded-md"
                        :src="player.song.cover"
                    />
                </router-link>
                <div class="title-artist">
                    <router-link :to="`/track/${hashTrack(player.song.id)}`" class="linkOnHover">
                        <Marquee class="" :text="player.song.title" />
                    </router-link>
                    <router-link :to="`/search/${player.song.artist}`" class="linkOnHover">
                        <Marquee class="text-muted text-xs" :text="player.song.artist" />
                    </router-link>
                </div>
                <span
                    class="favourite text-xl cursor-pointer material-symbols-rounded ms-wght-300"
                    :class="{'ms-fill': player.song.favourite}"
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
            </div>
            <div class="controls">
                <div class="top">
                    <span
                        @click="player.toggleShuffle"
                        class="cursor-pointer material-symbols-rounded ms-wght-300"
                    >
                        shuffle
                    </span>
                    <span
                        @click="player.previous"
                        class="cursor-pointer material-symbols-rounded ms-fill"
                    >
                        skip_previous
                    </span>
                    <span
                        @click="player.playPause"
                        class="cursor-pointer material-symbols-rounded ms-fill text-4xl"
                    >
                        {{ player.playing ? "pause_circle" : "play_circle" }}
                    </span>
                    <span
                        @click="player.next"
                        class="cursor-pointer material-symbols-rounded ms-fill"
                    >
                        skip_next
                    </span>
                    <span
                        @click="player.toggleRepeat"
                        class="cursor-pointer material-symbols-rounded ms-wght-300"
                    >
                        {{ player.repeat }}
                    </span>
                </div>
                <div class="bottom">
                    <div class="display">
                        <span
                            class="text-xs text-muted text-right"
                        >
                            {{ player.displayProgress }}
                        </span>
                        <ProgressBar
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
                    icon="devices"
                    :options="dropdownOptions"
                    v-model="dropdownValue"
                />
                <span
                    @click="player.volume = 0"
                    class="cursor-pointer material-symbols-rounded ms-fill"
                >
                    {{ player.volume === 0 ? "volume_off" : "volume_down" }}
                </span>
                <ProgressBar
                    v-model="player.volume"
                    max="100"
                    @change="e => player.setVolume(e)"
                />
            </div>
        </div>
        <div class="showIfMobile mobile mx-4">
            <div
                class="small"
                v-if="!mobileExpanded"
                @click="mobileExpanded = true"
            >
                <Cover
                    class="cover rounded-md"
                    :src="player.song.cover"
                />
                <div class="artist-title overflow-hidden">
                    <Marquee class="text-sm" :text="player.song.title" />
                    <Marquee class="text-xs text-muted" :text="player.song.artist" />
                </div>
                <IconDropdown
                    @click.stop
                    class="material-symbols-rounded"
                    icon="devices"
                    :options="dropdownOptions"
                    v-model="dropdownValue"
                />
                <span
                    @click.stop="player.playPause"
                    class="cursor-pointer material-symbols-rounded ms-fill text-xl"
                >
                    {{ player.playing ? "pause" : "play_arrow" }}
                </span>
            </div>
            <div class="full" v-else>
                <div>
                    <span
                        class="material-symbols-rounded ms-wght-500"
                        @click="mobileExpanded = false"
                    >
                        expand_more
                    </span>
                </div>
                <router-link to="/player" class="my-auto linkOnHover">
                    <Cover
                        class="cover rounded-md"
                        :src="player.song.cover"
                    />
                </router-link>
                <div class="rest">
                    <div class="song-info">
                        <div class="rest"></div>
                        <div class="title-artist mb-4">
                            <router-link :to="`/track/${hashTrack(player.song.id)}`" class="linkOnHover">
                                <Marquee class="text-2xl font-bold" :text="player.song.title" />
                            </router-link>
                            <router-link :to="`/search/${player.song.artist}`" class="linkOnHover">
                                <Marquee class="text-muted text-xs" :text="player.song.artist" />
                            </router-link>
                        </div>
                    </div>
                    <div class="controls mb-4">
                        <div class="top">
                            <span
                                @click="player.toggleShuffle"
                                class="cursor-pointer material-symbols-rounded ms-wght-300"
                            >
                                shuffle
                            </span>
                            <span
                                @click="player.previous"
                                class="cursor-pointer material-symbols-rounded ms-fill"
                            >
                                skip_previous
                            </span>
                            <span
                                @click="player.playPause"
                                class="cursor-pointer material-symbols-rounded ms-fill text-4xl"
                            >
                                {{ player.playing ? "pause_circle" : "play_circle" }}
                            </span>
                            <span
                                @click="player.next"
                                class="cursor-pointer material-symbols-rounded ms-fill"
                            >
                                skip_next
                            </span>
                            <span
                                @click="player.toggleRepeat"
                                class="cursor-pointer material-symbols-rounded ms-wght-300"
                            >
                                {{ player.repeat }}
                            </span>
                        </div>
                        <div class="bottom">
                            <ProgressBar
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
                                    class="favourite text-xl cursor-pointer material-symbols-rounded ms-wght-300"
                                    :class="{'ms-fill': player.song.favourite}"
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
                            icon="devices"
                            :options="dropdownOptions"
                            v-model="dropdownValue"
                        />
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<style lang="scss" scoped>
.player {
    background: var(--bg-base-dk);
    border-top: 1px solid var(--border-base);
    z-index: 2;
}

.desktop {
    display: grid;
    height: calc(var(--h-player) - 1px);
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-areas: "song-info controls aux";
    gap: 10px;

    .song-info {
        grid-area: song-info;
        display: grid;
        align-items: center;
        grid-template-columns: calc(var(--h-player) - 40px) fit-content(100%) 20px 20px;
        gap: 10px;

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