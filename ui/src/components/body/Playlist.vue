<template>
    <div class="playlist">
        <AddSong ref="addSongPopup" />
        <fixed-playlist-header @click="loadPlaylist" ref="fixedHeading" :class="{ 'hidden': fixedHeaderHidden }" :title="playlistName" />
        <div class="padding-20" v-observe-visibility="headerVisibilityChanged">
            <h7>Playlist</h7>
            <h1>{{playlistName}}</h1>
            <h5>My Description</h5>
        </div>
        <hr>
        <div class="padding-20">
            <span id="loadPlaylist" @click="loadPlaylist" class="material-icons-outlined">play_circle_filled</span>
            <span id="addToPlaylist" @click="addToPlaylist" class="material-icons-outlined">add_circle</span>
            <div class="grid">
                <grid-header />
                <hr>
                <div class="playlistEntries">
                    <playlist-entry v-for="(element, index) in playlist" :key="index" :index="index" :id="element.id" :title="element.title" :album="element.album" :artist="element.artist" :cover="element.cover" :favourite="element.favourite" :duration="element.duration" />
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

    export default {
        components: {
            PlaylistEntry,
            FixedPlaylistHeader,
            GridHeader,
            AddSong
        },
        name: 'Playlist',
        data() {
            this.updatePlaylist()
            return {
                fixedHeaderHidden: false,
                playlist: [],
                playlistName: "N/A"
            }
        },
        methods: {
            headerVisibilityChanged(a) {
                this.fixedHeaderHidden = a
            },
            addToPlaylist() {
                this.$refs.addSongPopup.showModal = true
            },
            updatePlaylist() {
                if (this.$route.params.id == "create")
                {
                    fetch("http://localhost:1234/api/playlist/create")
                        .then(x => x.text()).then(y => {
                            console.log(y)
                            this.$router.push(y)
                        })
                    return
                }
                fetch("http://localhost:1234/api/playlist", {
                    method: "POST",
                    body: JSON.stringify({ 
                        id: Number(this.$route.params.id)
                    })
                }).then(x => x.json()).then(jdata => {
                    this.playlist = jdata.songs
                    this.playlistName = jdata.name
                    console.log(this.playlist)
                })
            },
            loadPlaylist() {
                fetch("http://localhost:1234/api/loadPlaylist", {
                    method: "POST",
                    body: JSON.stringify({
                        id: Number(this.$route.params.id)
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