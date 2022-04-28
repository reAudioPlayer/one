<template>
    <div class="playlist">
        <fixed-playlist-header @click="loadPlaylist" ref="fixedHeading" :class="{ 'hidden': fixedHeaderHidden }" :title="playlistName" />
        <div class="padding-20" v-observe-visibility="headerVisibilityChanged">
            <h7>Playlist</h7>
            <h1>{{playlistName}}</h1>
            <h5>My Description</h5>
        </div>
        <hr>
        <div class="padding-20">
            <span id="loadPlaylist" @click="loadPlaylist" class="material-icons-outlined">play_circle_filled</span>
            <div class="grid">
                <grid-header />
                <hr>
                <div class="playlistEntries">
                    <playlist-entry v-for="(element, index) in playlist" :key="index" :index="index" :source="element.source" :id="element.id" :title="element.title" :playing="element.playing" :album="element.album" :artist="element.artist" :cover="element.cover" :favourite="element.favourite" :duration="element.duration" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import FixedPlaylistHeader from '../../Playlist/FixedPlaylistHeader.vue'
    import GridHeader from '../../Playlist/GridHeader.vue'
    import PlaylistEntry from '../../Playlist/PlaylistEntry.vue'

    export default {
        components: {
            PlaylistEntry,
            FixedPlaylistHeader,
            GridHeader
        },
        name: 'Tracks',
        data() {
            this.updateTracks()
            return {
                fixedHeaderHidden: true,
                playlist: [],
                playlistName: "N/A"
            }
        },
        methods: {
            connect() {
                const ctx = this
                console.log("attempting reconnect")
                let ws = new WebSocket('ws://localhost:1234/ws');

                ws.onclose = function() {
                    console.log("ws closed")

                    setTimeout(this.connect, 1000);
                }
                
                ws.onopen = () => {
                    console.log("ws connected")
                }

                ws.onmessage = function(msg) {
                    const jdata = JSON.parse(msg.data);
                    ctx.updateData(jdata)
                }
            },
            updateData(jdata) {
                if (jdata.path == "player.song")
                {
                    let title = jdata?.data?.title || "N/A"

                    for (const entry of this.playlist)
                    {
                        entry.playing = entry.title == title;
                    }
                }
            },
            headerVisibilityChanged(a) {
                this.fixedHeaderHidden = a
            },
            updateTracks() {
                fetch("/api/collection/tracks")
                    .then(x => x.json()).then(jdata => {
                        this.playlist = jdata.songs
                        this.playlistName = jdata.name
                        console.log(this.playlist)
                        this.connect()
                    })
            },
            loadPlaylist() {
                fetch("/api/loadPlaylist", {
                    method: "POST",
                    body: JSON.stringify({
                        type: "collection"
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .playlistEntries {
        display: flex;
        flex-direction: column;
    }

    #loadPlaylist,
    #addToPlaylist {
        cursor: pointer;
        font-size: 60px;
        margin-bottom: 20px;
        width: 70px;
        line-height: 70px;
        text-align: center;
        align-items: center;
        vertical-align: middle;
    }

    #loadPlaylist:hover, #addToPlaylist:hover {
        cursor: pointer;
        font-size: 62px;
    }

    .padding-20 {
        padding: 20px;
    }

    h3 {
        text-transform: uppercase;
    }

    h7 {
        text-transform: uppercase;
        font-weight: bold;
        font-size: 0.83em;
    }

    h1 {
        margin-block-start: 0.15em;
        margin-block-end: 0.15em;
        font-size: 2.91em;
    }

    .hidden {
        display: none !important;
    }
</style>