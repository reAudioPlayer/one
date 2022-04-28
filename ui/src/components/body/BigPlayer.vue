<template>
    <div class="bigPlayer">
        <div class="upNow">
            <img :src="cover" />
        </div>
        <div class="playlistOverflow">
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
                currentSongName: ""
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