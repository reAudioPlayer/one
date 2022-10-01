<template>
    <div class="bigPlayer">
        <div class="upNow">
            <img :src="cover" :class="{ playing, animate }" />
            <div class="blocks" :class="{ playing, animate }">
                <div class="block" :style="{'animation-delay': '0s'}"></div>
                <div class="block" :style="{'animation-delay': '.25s'}"></div>
                <div class="block" :style="{'animation-delay': '.5s'}"></div>
            </div>
        </div>
        <div v-if="!noPlaylist" class="playlistOverflow">
            <div class="playlist" ref="playlistScroll">
                <spotify-playlist-header />
                <light-playlist-entry v-for="element in playlist.songs" :key="element.source" @download="download" @requestUpdate="updatePlaylist" :index="playlist.songs.findIndex(x => x.source == element.source)" :source="element.source" :playing="element.title == currentSongName" :id="element.id" :title="element.title" :album="element.album" :artist="element.artist" :cover="element.cover" :favourite="element.favourite" :duration="element.duration" />
            </div>
        </div>

        <div class="settings">
            <span @click="toggleMaximise" class="iconButton material-symbols-rounded">{{ maximised ? "fullscreen_exit" : "fullscreen" }}</span>
            <span @click="() => noPlaylist = !noPlaylist" class="iconButton material-symbols-rounded" :style="{ transform: `rotate(${ noPlaylist ? 0 : 180 }deg)` }">menu_open</span>
            <span @click="() => animate = !animate" class="iconButton material-symbols-rounded">{{ !animate ? "animation" : "motion_photos_off" }}</span>
        </div>
    </div>
</template>

<script>
import { nextTick } from '@vue/runtime-core';
    import LightPlaylistEntry from '../components/Playlist/LightPlaylistEntry.vue'
    import SpotifyPlaylistHeader from '../components/SpotifyPlaylist/SpotifyPlaylistHeader.vue'
    export default {
        components: {
            LightPlaylistEntry, SpotifyPlaylistHeader
        },
        name: "BigPlayer",
        methods: {
            toggleMaximise() {
                this.maximised = !this.maximised;
                this.$emit('maximise', this.maximised);
            },
            fetchPlaylist() {
                fetch("/api/me/player/current-playlist").then(x => x.json()).then(jdata => this.playlist = jdata)
            },
            updateData(jdata) {
                console.log(jdata)
                if (jdata.path == "player.song")
                {
                    this.cover = jdata?.data?.cover || "/assets/img/music_placeholder.png"

                    this.currentSongName = jdata?.data?.title || ""

                    if (this.$refs.playlistScroll.scrollTop) {
                        return;
                    }

                    const scroll = document.getElementById(`bplayer-entry-${jdata?.data?.id}`)?.offsetTop;

                    if (!scroll && scroll != 0) {
                        window.setTimeout(() => this.updateData(jdata), 1000)
                    }

                    if (scroll >= 354)
                    {
                        this.$refs.playlistScroll.scrollTop = scroll - 354;
                    }
                    return;
                }

                if (jdata.path == "player.playState")
                {
                    this.playing = jdata?.data || false
                    return
                }                
            }
        },
        data() {
            const connect = () => {
                console.log("attempting reconnect")
                let ws = new WebSocket('ws://localhost:1234/ws');

                ws.onclose = () => {
                    console.log("ws closed")

                    setTimeout(connect, 1000);
                }

                ws.onopen = () => {
                    console.log("ws connected")
                }

                ws.onmessage = msg => {
                    const jdata = JSON.parse(msg.data);
                    this.updateData(jdata)
                }
            }
            connect()
            this.fetchPlaylist();

            return {
                cover: "/assets/img/music_placeholder.png",
                playlist: [ ],
                currentSongName: "",
                maximised: false,
                noPlaylist: false,
                playing: false,
                animate: false
            }
        }
    }
</script>

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
</style>