<template>
    <div @dblclick="() => { playAt(); onselect() }" @click="onselect" @mouseover="hovering = true" @mouseleave="hovering = false" class="playlistEntry"
        :class="{ 'selected': highlighted }">
        <mini-player class="miniPlayer" :class="{'hidden': !hovering }" :src="preview" />
        <span v-if="!hovering" @click="edit" class="id">{{index + 1}}</span>
        <div class="track">
            <div class="trackwrapper">
                <span class="title" :class="{ 'playing': playing }">{{title}}</span>
                <span class="artist" :class="{ 'playing': playing }">{{artist}}</span>
            </div>
        </div>
        <span @click="add" class="material-icons-round edit" ref="add">add</span>
    </div>
</template>

<script>
    import MiniPlayer from '../MiniPlayer.vue'
    export default {
        components: { MiniPlayer },
        name: 'AlbumEntry',
        props: {
            index: Number,
            id: Number,
            source: String,
            artist: {
                type: String,
                default: "N/A"
            },
            title: {
                type: String,
                default: "N/A"
            },
            added: Boolean,
            preview: String
        },
        data() {
            return {
                highlighted: false,
                favourited: this.favourite,
                isAutoPlaylist: this.$route.path == "/collection/tracks",
                hovering: false
            }
        },
        methods: {
            remove() {
                fetch("http://localhost:1234/api/remove", {
                    method: "POST",
                    body: JSON.stringify({
                        playlistId: Number(this.$route.params.id),
                        songId: this.id
                    })
                })
            },
            onselect() {
                this.highlighted = !this.highlighted
            },
            playAt() {
                this.$emit("edit", this.index)
            },
            add() {
                console.log("add")
                this.$emit("add", this.index)
            }
        },
        watch: {
            added() {
                console.log("change")
                this.$refs.add.innerHTML = this.added ? "done" : "add"
            }
        }
    }
</script>

<style scoped>
    div.playlistEntry {
        padding-top: 7px;
        padding-bottom: 7px;
        height: var(--playlistEntry-height);
        display: flex;
        flex-direction: row;
        color: var(--font-darker);
        font-size: 0.91em;
        border-radius: 5px;
    }

    div.playlistEntry:hover {
        background-color: var(--hover-1);
    }

    div.playlistEntry.selected {
        background-color: var(--hover-2);
    }

    .id, .edit, .miniPlayer {
        width: 50px;
        text-align: right;
        line-height: var(--playlistEntry-height);
        flex-shrink: 0;
    }

    .edit {
        margin-right: 10px;    
    }

    .favourite {
        width: 50px;
        text-align: right;
        line-height: var(--playlistEntry-height);
        margin-right: 10px;
        visibility: hidden;
        font-size: 1.4em;
        flex-shrink: 0;
    }

    .hidden {
        visibility: hidden;
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
        color: var(--font-colour);
    }

    .title.playing, .id.playing {
        color: var(--accent);
    }

    .id.playing.material-icons-round {
        color: var(--font-darker);
    }

    div.playlistEntry:hover .album,
    div.playlistEntry:hover .artist,
    div.playlistEntry:hover .id,
    div.playlistEntry.selected .album,
    div.playlistEntry.selected .artist,
    div.playlistEntry.selected .id {
        color: var(--font-colour);
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
        line-height: var(--playlistEntry-height);
        width: 50px;
        flex-shrink: 0;
    }

    .more {
        line-height: var(--playlistEntry-height);
        width: 20px;
        margin-right: 20px;
    }

    .more:hover {
        cursor: pointer;
    }

    .hidden {
        display: none
    }
</style>