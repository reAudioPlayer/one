<template>
    <div class="bigPlayer">
        <div class="settings">
            <span @click="toggleMaximise" class="iconButton material-symbols-rounded">{{ maximised ? "fullscreen_exit" : "fullscreen" }}</span>
            <span @click="() => noPlaylist = !noPlaylist" class="iconButton material-symbols-rounded" :style="{ transform: `rotate(${ noPlaylist ? 0 : 180 }deg)` }">menu_open</span>
        </div>

        <div class="upNow">
            <img :src="cover" />
        </div>
        <div v-if="!noPlaylist" class="playlistOverflow">
            <div class="playlist">
                <spotify-playlist-header />
                <light-playlist-entry v-for="element in playlist.songs" :key="element.source" @download="download" @requestUpdate="updatePlaylist" :index="playlist.songs.findIndex(x => x.source == element.source)" :source="element.source" :playing="element.title == currentSongName" :id="element.id" :title="element.title" :album="element.album" :artist="element.artist" :cover="element.cover" :favourite="element.favourite" :duration="element.duration" />
            </div>
        </div>
    </div>
</template>

<script>
    import LightPlaylistEntry from '../Playlist/LightPlaylistEntry.vue'
    import SpotifyPlaylistHeader from '../SpotifyPlaylist/SpotifyPlaylistHeader.vue'
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
                fetch("/api/playlist", {method: "POST"}).then(x => x.json()).then(jdata => this.playlist = jdata)
            },
            updateData(jdata) {
                if (jdata.path == "player.song")
                {
                    this.cover = jdata?.data?.cover || "/assets/img/music_placeholder.png"

                    this.currentSongName = jdata?.data?.title || ""

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
                noPlaylist: false
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
        height: calc(100% - 80px);
        filter: none;
    }

    .bigPlayer .upNow {
        flex: 3;
        display: flex;
        flex-direction: row;
        justify-content: center;
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
        height: calc(100% - 20px);;
        padding: 10px;
    }
</style>