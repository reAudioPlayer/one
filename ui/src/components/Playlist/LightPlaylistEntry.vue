a<template>
    <SongCtx @download="download" @addto="addToPlaylist" @remove="remove" @update="update"
        @like="favourited = !favourited" :isAutoPlaylist="isAutoPlaylist" :liked="favourited" ref="ctxMenu">
        <EditSong @close="updatePlaylist" ref="editSongPopup" :cover="cover" :id="id" :title="title" :album="album"
            :artist="artist" :source="source" />
        <div @dblclick="() => { playAt(); onselect() }" @click="onselect" @mouseover="displayPlay" @mouseleave="displayId" class="playlistEntry"
            :class="{ 'selected': highlighted }">
            <span @click="playAt" ref="idOrPlay" :class="{ 'playing': playing }" class="id">{{index + 1}}</span>
            <div class="track">
                <img :src="cover || '/assets/img/music_placeholder.png'">
                <div class="trackwrapper">
                    <span class="title">{{title}}</span>
                    <span class="artist">{{artist}}</span>
                </div>
                <span v-if="false" class="album">{{album}}</span>
            </div>
            <span class="duration">{{duration}}</span>
        </div>
    </SongCtx>
</template>

<script>
    export default {
        name: 'LightPlaylistEntry',
        props: {
            index: Number,
            id: Number,
            artist: {
                type: String,
                default: "N/A"
            },
            title: {
                type: String,
                default: "N/A"
            },
            cover: String,
            preview: String,
            duration: String,
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
                console.log(this.$route.path)
                const body = {
                    index: this.index,
                }
                body.playlistIndex = Number(this.$route.params.id)
                fetch("http://localhost:1234/api/at", {
                    method: "POST",
                    body: JSON.stringify(body)
                })
            },
            setFavourite() {
                fetch("http://localhost:1234/api/updateSong", {
                    method: "POST",
                    body: JSON.stringify({
                        id: this.id,
                        favourite: this.favourited,
                        album: this.album,
                        artist: this.artist,
                        title: this.title,
                        duration: this.duration,
                        cover: this.cover,
                        source: this.source
                    })
                })
            },
            displayPlay() {
                const element = this.$refs.idOrPlay
                element.innerHTML = "play_arrow"
                element.classList.add("material-icons-round")
            },
            displayId() {
                const element = this.$refs.idOrPlay
                element.innerHTML = this.index + 1
                element.classList.remove("material-icons-round")
            },
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

    .id,
    .edit,
    .miniPlayer {
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

    div.playlistEntry:hover .favourite,
    .showfavourite,
    div.playlistEntry:hover .more {
        visibility: visible;
    }

    .favourite:hover {
        cursor: pointer;
    }

    .id:hover,
    .edit:hover {
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

    .title.playing,
    .id.playing {
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
        display: none;
    }
</style>