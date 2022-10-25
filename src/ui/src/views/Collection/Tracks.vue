<template>
    <div class="playlist">
        <fixed-playlist-header @click="loadPlaylist" ref="fixedHeading" :class="{ 'hidden': fixedHeaderHidden }"
                               :title="playlistName"/>
        <div class="padding-20" v-observe-visibility="headerVisibilityChanged">
            <h7>Playlist</h7>
            <h1>{{ playlistName }}</h1>
            <h5>Your {{ playlist.length }} favourite tracks, auto-generated just for you</h5>
        </div>
        <hr>
        <div class="padding-20">
            <span id="loadPlaylist" @click="loadPlaylist" class="material-icons-outlined">play_circle_filled</span>
            <div class="grid">
                <grid-header class="hideIfMobile"/>
                <hr>
                <div class="playlistEntries">
                    <playlist-entry
                        v-for="(element, index) in playlist"
                        :key="index"
                        :index="index"
                        :source="element.source"
                        :id="element.id"
                        :title="element.title"
                        :playing="element.playing"
                        :album="element.album"
                        :artist="element.artist"
                        :cover="element.cover"
                        :favourite="element.favourite"
                        :duration="element.duration"
                        @download="download"
                        @requestUpdate="updateTracks"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FixedPlaylistHeader from '@/components/Playlist/FixedPlaylistHeader.vue'
import GridHeader from '@/components/Playlist/GridHeader.vue'
import PlaylistEntry from '@/components/Playlist/PlaylistEntry.vue'
import {mapState} from "vuex";

export default {
    components: {
        PlaylistEntry,
        FixedPlaylistHeader,
        GridHeader
    },
    data() {
        this.updateTracks()
        return {
            fixedHeaderHidden: true,
            playlist: [],
            playlistName: "N/A"
        }
    },
    computed: mapState("player", {
        "currentSong": state => state.song.id,
    }),
    watch: {
        currentSong() {
            this.updateIsPlaying()
        }
    },
    methods: {
        download(index) {
            const data = this.playlist?.[index]
            window.open(`/api/tracks/${data.id}/download`)
        },
        updateIsPlaying() {
            console.log("Updating is playing", this.currentSong)
            this.playlist.forEach((element) => {
                element.playing = element.id == this.currentSong
            })
        },
        headerVisibilityChanged(a) {
            this.fixedHeaderHidden = a
        },
        updateTracks() {
            fetch("/api/me/liked")
                .then(x => x.json()).then(jdata => {
                this.playlist = jdata.songs
                this.playlistName = jdata.name
                this.updateIsPlaying()
            })
        },
        loadPlaylist() {
            fetch("/api/player/load", {
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