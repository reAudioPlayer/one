<template>
    <div class="bigPlayer">
        <div class="upNow">
            <img :src="cover" />
        </div>
        <div class="playlist">
            <spotify-playlist-header />
            <light-playlist-entry v-for="element in playlist.songs" :key="element.source" @download="download" @requestUpdate="updatePlaylist" :index="playlist.songs.findIndex(x => x.source == element.source)" :source="element.source" :playing="element.playing" :id="element.id" :title="element.title" :album="element.album" :artist="element.artist" :cover="element.cover" :favourite="element.favourite" :duration="element.duration" />
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
            fetchPlaylist() {
                fetch("http://localhost:1234/api/playlist", {method: "POST"}).then(x => x.json()).then(jdata => this.playlist = jdata)
            },
            updateData(jdata) {
                if (jdata.path == "player.song")
                {
                    this.cover = jdata?.data?.cover || "/assets/img/music_placeholder.png"
                    return;
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
                playlist: [ ]
            }
        }
    }
</script>

<style scoped>
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

    .bigPlayer .playlist {
        flex: 2;
        height: calc(100% - 220px);
        margin: 100px 0;
        padding: 10px;
        background: var(--background-light);
        border-radius: 20px;
        overflow-y: auto;
        overflow-x: hidden;
    }
</style>