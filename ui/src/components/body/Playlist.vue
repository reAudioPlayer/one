<template>
    <div class="playlist">
        <AddSong @close="updatePlaylist" ref="addSongPopup" />
        <EditPlaylist @close="updatePlaylist" :playlistName="playlistName" :playlistDescription="playlistDescription" ref="editPlaylistPopup" />
        <fixed-playlist-header @loadPlaylist="loadPlaylist" ref="fixedHeading" :class="{ 'hidden': fixedHeaderHidden }" :title="playlistName" />
        <div class="padding-20 playlisteditor" @click="editPlaylist" v-observe-visibility="headerVisibilityChanged">
            <h7>Playlist</h7>
            <h1>{{playlistName}}</h1>
            <h5>{{playlistDescription}}</h5>
        </div>
        <hr>
        <div class="padding-20">
            <span id="loadPlaylist" @click="loadPlaylist" class="material-icons-outlined">play_circle_filled</span>
            <span id="addToPlaylist" @click="addToPlaylist" class="material-icons-outlined">add_circle</span>
            <div class="grid">
                <grid-header />
                <hr>
                <div class="playlistEntries">
                    <draggable v-model="playlist" @change="onPlaylistRearrange">
                        <template #item="{element}">
                            <playlist-entry @download="download" @requestUpdate="updatePlaylist" :index="playlist.findIndex(x => x.source == element.source)" :source="element.source" :playing="element.playing" :id="element.id" :title="element.title" :album="element.album" :artist="element.artist" :cover="element.cover" :favourite="element.favourite" :duration="element.duration" />
                        </template>
                    </draggable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import FixedPlaylistHeader from '../Playlist/FixedPlaylistHeader.vue'
    import GridHeader from '../Playlist/GridHeader.vue'
    import PlaylistEntry from '../Playlist/PlaylistEntry.vue'
    import AddSong from "../Popups/AddSong.vue"
    import EditPlaylist from '../Popups/EditPlaylist.vue'
    import draggable from 'vuedraggable'

    import Hashids from 'hashids'
    const hashids = new Hashids("reapOne.playlist", 22)

    export default {
        components: {
            PlaylistEntry,
            FixedPlaylistHeader,
            GridHeader,
            AddSong,
            EditPlaylist,
            draggable
        },
        name: 'Playlist',
        data() {
            this.updatePlaylist()
            
            return {
                fixedHeaderHidden: true,
                playlist: [],
                playlistName: "N/A",
                playlistDescription: ""
            }
        },
        methods: {
            getId() {
                return hashids.decode(this.$route.params.id);
            },
            download(index) {
                const data = this.playlist?.[index]
                window.open("/api/download/" + data.id)
            },
            onPlaylistRearrange(type) {
                const moved = type.moved
                
                if (!moved)
                {
                    return;
                }

                fetch("/api/rearrange", {
                    method: "POST",
                    body: JSON.stringify({
                        playlistIndex: Number(this.getId()),
                        songOldIndex: moved.oldIndex,
                        songNewIndex: moved.newIndex
                    })
                })
            },
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
            headerVisibilityChanged(a) {
                this.fixedHeaderHidden = a
            },
            addToPlaylist() {
                this.$refs.addSongPopup.showModal = true
            },
            editPlaylist() {
                this.$refs.editPlaylistPopup.showModal = true
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
            updatePlaylist() {
                if (!this.getId())
                {
                    return
                }
                if (!this.$route.path.includes("/playlist/"))
                {
                    return;
                }

                if (this.getId() == "create")
                {
                    fetch("/api/playlist/create")
                        .then(x => x.text()).then(y => {
                            console.log(y)
                            this.$router.push(y)
                        })
                    return
                }
                fetch("/api/playlist", {
                    method: "POST",
                    body: JSON.stringify({ 
                        id: Number(this.getId())
                    })
                }).then(async x => {
                    if (x.status == 404)
                    {
                        this.$router.push("/")
                        return
                    }

                    const jdata = await x.json()
                    this.playlist = jdata.songs
                    this.playlistName = jdata.name
                    this.playlistDescription = jdata.description
                    document.title = `${this.playlistName} - reAudioPlayer One`;
                    console.log(this.playlist)
                    this.connect()
                })
            },
            loadPlaylist() {
                fetch("/api/loadPlaylist", {
                    method: "POST",
                    body: JSON.stringify({
                        id: Number(this.getId()),
                        type: "playlist"
                    })
                })
            }
        },
        watch:{
            $route (){
                this.updatePlaylist()
            }
        }
    }
</script>

<style scoped>
    .playlisteditor:hover {
        cursor: pointer;
    }

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

    h5 {
        color: var(--font-darker);
        font-weight: normal;
    }
</style>