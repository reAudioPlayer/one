<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <Template
        :cover-icon="icon"
        :playlist="playlist"
        :playlist-id="id"
    />
</template>

<script>
import FixedPlaylistHeader from "@/components/Playlist/FixedPlaylistHeader.vue";
import PlaylistEntry from "@/components/songContainers/PlaylistEntry.vue";
import PlaylistHeader from "@/components/songContainers/PlaylistHeader.vue";
import { usePlayerStore } from "@/store/player";
import { parseCover } from "@/common";
import Index from "@/views/Playlist/index.vue";
import Template from "@/views/Playlist/Template.vue";


export default {
    components: {
        Template,
        Index,
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
        },
        icon: {
            type: String,
            required: false,
            default: "favorite"
        },
    },
    data() {
        this.updateTracks()
        return {
            fixedHeaderHidden: true,
            playlist: {},
            store: usePlayerStore(),
            selectedSongId: -1
        }
    },
    methods: {
        parseCover,
        download(index) {
            const data = this.playlist?.[index]
            window.open(`/api/tracks/${data.id}/download`)
        },
        updateTracks() {
            fetch(this.src)
                .then(x => x.json()).then(jdata => {
                this.playlist = jdata;
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