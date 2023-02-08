a
<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <ImportSpotifySong
        ref="addSong"
        :song="{
            id: id,
            title: title,
            artist: artist,
            cover: cover,
            preview,
            href: source
        }"
    />
    <div
        :class="{ 'selected': highlighted }"
        class="playlistEntry" @click="onselect" @dblclick="() => { playAt(); onselect() }"
        @mouseleave="hovering = false" @mouseover="hovering = true">
        <mini-player :artist="artist" :class="{'hidden': !hovering }" :src="source" :title="title" class="miniPlayer" @click.stop />
        <span v-if="!hovering" class="id" @click="edit">{{ index + 1 }}</span>
        <div class="track">
            <img :src="cover || '/assets/img/music_placeholder.png'">
            <div class="trackwrapper">
                <span class="title">{{ title }}</span>
                <span class="artist">{{ artist }}</span>
            </div>
            <span v-if="false" class="album">{{ album }}</span>
        </div>
    </div>
</template>

<script>
import MiniPlayer from "../MiniPlayer.vue";
import ImportSpotifySong from "@/components/popups/ImportSpotifySong.vue";

export default {
    components: { ImportSpotifySong, MiniPlayer },
    name: "SpotifyPlaylistEntry",
    props: {
        index: Number,
        id: Number,
        source: String,
        artist: {
            type: String,
            default: "N/A",
        },
        title: {
            type: String,
            default: "N/A",
        },
        added: Boolean,
        cover: String,
        album: String,
        preview: String
    },
    data() {
        return {
            highlighted: false,
            favourited: this.favourite,
            isAutoPlaylist: this.$route.path == "/collection/tracks",
            hovering: false,
        };
    },
    methods: {
        remove() {
            fetch(`/api/playlists/${this.$route.params.id}/tracks`, {
                method: "DELETE",
                body: JSON.stringify({
                    songId: this.id,
                }),
            });
        },
        onselect() {
            this.$refs.addSong.show();
        },
        playAt() {
            this.$emit("edit", this.index);
        },
        add() {
            console.log("add");
            this.$emit("add", this.index);
        },
    },
    watch: {
        added() {
            console.log("change");
            this.$refs.add.innerHTML = this.added ? "done" : "add";
        },
    },
};
</script>

<style scoped>
div.playlistEntry {
    padding-top: 7px;
    padding-bottom: 7px;
    height: var(--h-playlistEntry);
    display: flex;
    flex-direction: row;
    color: var(--fg-base-dk);
    font-size: 0.91em;
    border-radius: 20px;
}

div.playlistEntry:hover {
    background-color: var(--bg-hover);
}

div.playlistEntry.selected {
    background-color: var(--bg-hover-lt);
}

.id, .edit, .miniPlayer {
    width: 50px;
    text-align: right;
    line-height: var(--h-playlistEntry);
    flex-shrink: 0;
}

.edit {
    margin-right: 10px;
}

.favourite {
    width: 50px;
    text-align: right;
    line-height: var(--h-playlistEntry);
    margin-right: 10px;
    visibility: hidden;
    font-size: 1.4em;
    flex-shrink: 0;
}

div.playlistEntry:hover .favourite, .showfavourite, div.playlistEntry:hover .more {
    visibility: visible;
}

.favourite:hover {
    cursor: pointer;
}

.id:hover, .edit:hover {
    cursor: pointer;
}

.track {
    flex-grow: 1;
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;
    color: var(--fg-base);
}

.title.playing, .id.playing {
    color: var(--fg-secondary);
}

.id.playing.material-icons-round {
    color: var(--fg-base-dk);
}

div.playlistEntry:hover .album,
div.playlistEntry:hover .artist,
div.playlistEntry:hover .id,
div.playlistEntry.selected .album,
div.playlistEntry.selected .artist,
div.playlistEntry.selected .id {
    color: var(--fg-base);
}

img {
    height: 40px;
    margin-right: 10px;
    display: inline;
    border-radius: 5px;
}

.trackwrapper {
    display: flex;
    flex-direction: column;
    max-width: 35vw;
    margin-right: 100px;
}

.duration {
    text-align: right;
    margin-right: 20px;
    line-height: var(--h-playlistEntry);
    width: 50px;
    flex-shrink: 0;
}

.more {
    line-height: var(--h-playlistEntry);
    width: 20px;
    margin-right: 20px;
}

.more:hover {
    cursor: pointer;
}

.hidden {
    display: none !important;
}
</style>