<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="playlist">
        <fixed-playlist-header @click="loadPlaylist" ref="fixedHeading" :class="{ 'hidden': fixedHeaderHidden }"
                               :title="playlistName"/>
        <div class="padding-20" v-observe-visibility="headerVisibilityChanged">
            <h1>{{ playlistName }}</h1>
            <h6>Your {{ playlist.length }} favourite tracks, auto-generated just for you</h6>
        </div>
        <hr>
        <div class="padding-20">
            <span id="loadPlaylist" @click="loadPlaylist" class="material-icons-outlined">play_circle_filled</span>
            <div class="grid">
                <PlaylistHeader
                    class="hideIfMobile"
                    with-more
                />
                <hr>
                <div class="playlistEntries">
                    <PlaylistEntry
                        v-for="(element, index) in playlist"
                        :key="element.source"
                        :index="index"
                        :song="element"
                        with-cover
                        with-album
                        with-more
                        :playlist-id="id"
                        @click="selectedSongId == element.id ? selectedSongId = -1 : selectedSongId = element.id"
                        @update="updateTracks"
                        :selected="selectedSongId == element.id"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FixedPlaylistHeader from '@/components/Playlist/FixedPlaylistHeader.vue'
import PlaylistEntry from '@/components/songContainers/PlaylistEntry.vue'
import PlaylistHeader from '@/components/songContainers/PlaylistHeader.vue'
import {usePlayerStore} from "@/store/player";
import {parseCover} from "@/common";

export default {
    components: {
        PlaylistEntry,
        FixedPlaylistHeader,
        PlaylistHeader
    },
    props: {
        src: {
            type: String,
            required: true
        },
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        this.updateTracks()
        return {
            fixedHeaderHidden: true,
            playlist: [],
            playlistName: "",
            store: usePlayerStore(),
            selectedSongId: -1
        }
    },
    watch: {
        currentSong() {
            this.updateIsPlaying()
        }
    },
    computed: {
        currentSong() {
            return this.store.song.id
        }
    },
    methods: {
        parseCover,
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
            fetch(this.src)
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

#loadPlaylist {
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