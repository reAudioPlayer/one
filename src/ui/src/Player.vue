<script setup>
import {computed} from 'vue'
import {usePlayerStore} from "@/store/player";

const playerStore = usePlayerStore();

const playing = computed(() => playerStore.playing);
const title = computed(() => playerStore.song.title);
const artist = computed(() => playerStore.song.artist);
const durationStr = computed(() => playerStore.song.duration);
const favourite = computed(() => playerStore.song.favourite);
const storedVolume = computed(() => playerStore.volume);
const cover = computed(() => playerStore.cover);
const stream = computed(() => playerStore.stream);
const durationSeconds = computed(() => playerStore.durationSeconds);
const progresslbl = computed(() => playerStore.getProgress);
const progress = computed(() => playerStore.progressPercent);

const settings = useSettingsStore();
</script>

<template>
    <div v-if="!expandedMobile" class="player">
        <audio ref="audio" @ended="get('player/next')" src="/api/player/stream" style="display: none"/>
        <div class="left hideIfMobile">
            <img v-if="!settings.player.expandedCover" @click="settings.player.expandedCover = true" :src="cover"/>
            <div class="titleartist">
        <span class="title">
            <router-link class="linkOnHover" to="/player">
            <Marquee :text="title"/></router-link>
        </span>
                <span class="artist">
          <router-link class="linkOnHover" :to="`/search/${artist}`">
            <Marquee :text="artist"/></router-link>
        </span>
            </div>
            <span
                @click="setFavourite"
                class="favourite material-icons-round hideIfMobile">
        {{ favourite ? "favorite" : "favorite_border" }}</span>
        </div>
        <div class="left showIfMobile" @click="expandedMobile = true">
            <img
                v-if="settings.player.expandedCover"
                @click="settings.player.expandedCover = true"
                :src="cover"
            />
            <div class="titleartist">
        <span class="title">
            <Marquee :text="title"/>
        </span>
                <span class="artist">
            <Marquee :text="artist"/>
        </span>
            </div>
            <span
                @click="favourite = !favourite"
                class="favourite material-icons-round hideIfMobile">
        {{ favourite ? "favorite" : "favorite_border" }}</span>
        </div>
        <div class="centre w-2/5">
            <div class="upper">
                <span @click="shuffle = !shuffle" class="material-icons-round defaultbtn hideIfMobile">{{
                        shuffle ? "shuffle_on" : "shuffle"
                    }}</span>
                <span @click="get('player/previous')"
                      class="material-icons-round defaultbtn hideIfMobile">skip_previous</span>
                <span @click="playPause"
                      class="material-icons-round circle hideIfMobile">{{
                        playing ? "pause_circle" : "play_circle"
                    }}</span>
                <span @click="playPause"
                      class="material-icons-round circle showIfMobile">{{ playing ? "pause" : "play_arrow" }}</span>
                <span @click="get('player/next')" class="material-icons-round defaultbtn hideIfMobile">skip_next</span>
                <span @click="songLoop = !songLoop" class="material-icons-round defaultbtn hideIfMobile">{{
                        songLoop ? "repeat_one" : "repeat"
                    }}</span>
            </div>
            <div class="lower hideIfMobile w-full">
                <span class="positionLabel">{{ progresslbl }}</span>
                <ProgressBar
                    @change="progresschange"
                    v-model="progress"
                    max="1000"
                    type="range"
                    class="progress w-full"
                />
                <span class="positionLabel">{{ durationStr }}</span>
            </div>
        </div>
        <div class="right hideIfMobile">
            <span class="material-icons-round defaultbtn">volume_up</span>
            <div class="max-w-[8vw] w-4/5 mr-[20px]">
                <ProgressBar @change="volumechange" v-model="volume" type="range" class="volume"/>
            </div>
        </div>
    </div>
    <div v-else class="player fullscreen">
        <audio ref="audio" @ended="get('player/next')" src="/api/player/stream" style="display: none"/>
        <div class="top">
            <span class="material-symbols-rounded" @click="expandedMobile = false">expand_more</span>
            <p></p>
            <span class="material-symbols-rounded">more_horiz</span>
        </div>
        <div class="cover">
            <img :src="cover"/>
        </div>
        <div class="data">
            <div class="titleartist">
        <span class="title">
            <Marquee :text="title"/>
        </span>
                <span class="artist">
            <Marquee :text="artist"/>
        </span>
            </div>
        </div>
        <div class="progress">
            <input
                @change="progresschange"
                v-model="progress"
                max="1000"
                type="range"
                class="progress"
            />
            <div class="details">
                <span class="positionLabel">{{ progresslbl }}</span>
                <span class="positionLabel">{{ durationStr }}</span>
            </div>
        </div>
        <div class="controls">
            <span @click="shuffle = !shuffle"
                  class="material-icons-round defaultbtn">{{ shuffle ? "shuffle_on" : "shuffle" }}</span>
            <span @click="get('player/previous')" class="material-icons-round defaultbtn">skip_previous</span>
            <span @click="playPause"
                  class="material-icons-round circle">{{ playing ? "pause_circle" : "play_circle" }}</span>
            <span @click="get('player/next')" class="material-icons-round defaultbtn">skip_next</span>
            <span @click="songLoop = !songLoop"
                  class="material-icons-round defaultbtn">{{ songLoop ? "repeat_one" : "repeat" }}</span>
        </div>
    </div>
</template>

<script>
import Marquee from '@/components/Marquee.vue'
import ProgressBar from "@/components/ProgressBar";

import {hashPlaylist, zeroPad} from "@/common";
import {usePlayerStore} from "@/store/player";
import {useSettingsStore} from "@/store/settings";

export default {
    components: {ProgressBar, Marquee},
    name: 'Player',
    data() {
        const player = usePlayerStore();
        const settings = useSettingsStore();
        const playInBrowser = settings.player.inBrowser;

        setInterval(() => {
            if (!this.playing) {
                return;
            }
            player.incrementProgress();
        }, 1000)

        if (playInBrowser) {
            fetch("/api/player/volume", {
                method: "POST",
                body: JSON.stringify({
                    value: 0
                })
            })
        } else {
            fetch("/api/player/volume")
                .then(x => x.text())
                .then(value => {
                    this.volume = value
                })
        }

        fetch("/api/player/repeat")
            .then(x => x.text())
            .then(value => {
                this.songLoop = value == "True"
            })

        fetch("/api/player/shuffle")
            .then(x => x.text())
            .then(value => {
                this.shuffle = value == "True"
            })

        return {
            songLoop: false,
            shuffle: false,
            playInBrowser,
            expandedMobile: false,
            volume: player.volume,
            store: player,
        }
    },
    mounted() {
        window.addEventListener('keydown', (e) => {
            if (e.key == " " && e.ctrlKey) {
                this.playPause();
                return;
            }
            if (e.key == "ArrowRight" && e.ctrlKey) {
                this.get('player/next');
                return;
            }
            if (e.key == "ArrowLeft" && e.ctrlKey) {
                this.get('player/previous');
                return;
            }
            if (e.key == "ArrowUp" && e.ctrlKey) {
                this.volume = Math.max(0, Math.min(this.volume + 5, 100));
                this.volumechange();
                return;
            }
            if (e.key == "ArrowDown" && e.ctrlKey) {
                this.volume = Math.max(0, Math.min(this.volume - 5, 100));
                this.volumechange();
                return;
            }
            if (e.key == "ArrowRight") {
                this.progress = Math.saturate(this.progress + 10, 0, 100);
                this.progresschange();
                return;
            }
            if (e.key == "ArrowLeft") {
                this.progress = Math.saturate(this.progress - 10, 0, 100);
                this.progresschange();
                return;
            }
            if (e.key && !isNaN(e.key) && e.altKey) {
                const playlist = hashPlaylist(e.key);
                console.error(playlist)
                this.$router.push(`/playlist/${playlist}`);
                return;
            }
        });
    },
    watch: {
        songLoop() {
            fetch("/api/player/repeat", {
                method: "POST",
                body: JSON.stringify({
                    value: this.songLoop
                })
            })
        },
        shuffle() {
            fetch("/api/player/shuffle", {
                method: "POST",
                body: JSON.stringify({
                    value: this.shuffle
                })
            })
        },
        stream() {
            if (this.playInBrowser) {
                this.get('player/pause')

                this.$refs.audio.src = null;
                this.$refs.audio.src = this.stream;

                // get duration
                this.$refs.audio.onloadedmetadata = () => {
                    this.store.setDuration(this.$refs.audio.duration);
                }

                this.$refs.audio.load();
                if (this.playing) {
                    this.$refs.audio.play();
                }
                this.playing = !this.$refs.audio.paused;
            }
        },
        storedVolume() {
            this.volume = this.storedVolume
            this.volumechange();
        },
    },
    methods: {
        setFavourite() {
            this.store.setFavourite(!this.favourite)

            const track = this.state.song;

            fetch(`/api/tracks/${track.id}`, {
                method: "PUT",
                body: JSON.stringify(track)
            });
        },
        onExpandCover() {
            this.$emit('expandCover', true)
        },
        playPause() {
            if (this.playInBrowser) {
                if (this.$refs.audio.paused) {
                    this.$refs.audio.play();
                } else {
                    this.$refs.audio.pause();
                }
                this.store.setPlaying(!this.$refs.audio.paused);
                return;
            }
            this.get('player/playPause')
        },
        get(endpoint) {
            fetch(`/api/${endpoint}`)
        },
        volumechange() {
            if (this.playInBrowser) {
                this.$refs.audio.volume = this.volume / 100;
                this.store.setVolume(this.volume);
                return;
            }

            fetch("/api/player/volume", {
                method: "POST",
                body: JSON.stringify({
                    value: this.volume
                })
            })
        },
        progresschange(newVal) {
            let duration = this.durationSeconds;
            let value = newVal * duration / 1000; // in 1/1000

            this.store.setProgress(value);

            if (this.playInBrowser) {
                this.$refs.audio.currentTime = value;
                return;
            }

            fetch("/api/player/seek", {
                method: "POST",
                body: JSON.stringify({
                    value
                })
            })
        },
        updateData(jdata) {
            if (jdata.path == "player.playState") {
                if (this.playInBrowser) {
                    return;
                }

                this.playing = jdata?.data || false
                return
            }
            if (jdata.path == "player.posSync") {
                if (this.playInBrowser) {
                    return;
                }
                let value = jdata?.data || 0
                this.progresslbl = `${Math.floor(value / 60)}:${zeroPad(Math.round(value % 60), 2)}`
            }
        }
    }
}
</script>

<style scoped lang="scss">
$horizontalWidth: 1200px;
$mobileWidth: 950px;

div.player.fullscreen {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 20px !important;

    .top {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .cover {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;

        img {
            width: 90%;
        }
    }

    .data {
        .title {
            font-weight: bold;
            font-size: 1.4em;
        }
    }

    .progress {
        display: flex;
        width: 100%;
        flex-direction: column;

        .details {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            color: var(--font-darker);
        }
    }

    .controls {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 50px;

        .circle {
            font-size: 4em;
            width: 100px;
        }

        .defaultbtn {
            font-size: 2em;
        }
    }
}

div.player {
    background: var(--player-background);
    height: var(--player-height);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    border-top: 1px solid var(--border);
    z-index: 1;

    @media screen and (max-width: $mobileWidth) {
        height: calc(var(--player-height-mobile) - 20px);
        padding: 3px;
        position: absolute;
        bottom: var(--sidebar-height);
        left: 0;
        width: 100vw;
        z-index: 5;
        border-top: none;
        border-bottom: 1px solid var(--border);
    }

    &.fullscreen {
        height: 100vh;
        width: calc(100vw - 40px);
        border-top: none;
        border-bottom: none;
        margin: 0;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 5;
    }
}

.favourite {
    line-height: calc(var(--player-height) - 40px);
    margin-left: 20px;
    font-size: 1.2em;
    color: var(--font-darker);

    @media screen and (max-width: $mobileWidth) {
        line-height: calc(var(--player-height-mobile) - 40px);
    }
}

.favourite:hover {
    cursor: pointer;
}

.left {
    max-height: var(--player-height);
    display: flex;
    flex-direction: row;
    padding: 10px;
    width: 25vw;

    @media screen and (max-width: $mobileWidth) {
        max-height: calc(var(--player-height-mobile) - 6px);
        padding: 3px;
        max-width: inherit;
        flex-grow: 1;
    }

    img {
        height: calc(var(--player-height) - 40px);
        border-radius: 5px;
        margin-right: 10px;

        @media screen and (max-width: $mobileWidth) {
            height: calc(var(--player-height-mobile) - 12px);
        }
    }
}

.left > .titleartist {
    display: flex;
    flex-direction: column;
    justify-content: center;

    max-width: 20vw;

    @media screen and (max-width: $mobileWidth) {
        max-width: inherit;
        width: 100%;
    }
}

.left > .titleartist > .title {
    font-size: 0.9em;
    /*overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;*/
}

.left > .titleartist > .artist {
    font-size: 0.7em;
    color: var(--font-darker);
    /*overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;*/
}

.centre {
    max-height: calc(var(--player-height) - 20px);
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    @media screen and (max-width: $mobileWidth) {
        max-height: calc(var(--player-height-mobile) - 6px);
        margin-right: 10px;
    }
}

.centre > .upper {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.centre > .lower {
    line-height: 25px;
    height: 25px;
    align-items: center;
    display: flex;
    flex-direction: row;
}

.positionLabel {
    font-size: 0.7em;
    color: var(--font-darker);
}

input[type="range"].progress {
    width: 40vw;
}

input[type="range"]:hover {
    cursor: pointer;
}

.defaultbtn {
    font-size: 1.4em;
    color: var(--font-darker);
    margin-left: 10px;
    margin-right: 10px;
}

.defaultbtn:hover {
    color: var(--font-colour);
    cursor: pointer;
}

.circle {
    font-size: 2.4em;
    width: 40px;
}

.defaultbtn,
.circle {
    line-height: 24px;
    text-align: center;
}

.circle:hover {
    font-size: 2.5em;
    cursor: pointer;
}

.right {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 25vw;
}

span.circle.showIfMobile {
    font-size: 1.4em;
}
</style>