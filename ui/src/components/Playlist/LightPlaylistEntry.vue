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
                    <span class="title" :class="{ 'playing': playing }"><router-link class="linkOnHover" :to="`/track/${trackId}`"><Marquee :text="title" /></router-link></span>
                    <span class="artist" :class="{ 'playing': playing }"><router-link class="linkOnHover" :to="`/search/${artist}`"><Marquee :text="artist" /></router-link></span>
                </div>
            </div>
            <span class="duration">{{duration}}</span>
        </div>
    </SongCtx>
</template>

<script>
    import SongCtx from '../ContextMenus/SongCtx.vue'
    import Marquee from '../Marquee.vue'
    import EditSong from '../Popups/EditSong.vue'

    import Hashids from 'hashids'
    const hashids = new Hashids("reapOne.track", 22)

    export default {
        name: 'LightPlaylistEntry',
        components: {
            SongCtx,
            EditSong,
            Marquee
        },
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
            cover: {
                type: String,
                default: "/assets/img/music_placeholder.png"
            },
            source: String,
            album: {
                type: String,
                default: "N/A"
            },
            duration: {
                type: String,
                default: "N/A"
            },
            favourite: {
                type: Boolean,
                default: false
            },
            playing: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                highlighted: false,
                favourited: this.favourite,
                isAutoPlaylist: this.$route.path == "/collection/tracks",
                hovering: false
            }
        },
        computed: {
            trackId() {
                return hashids.encode(this.id);
            }
        },
        methods: {
            download() {
                window.open("/api/download/" + this.id)
            },
            addToPlaylist(index) {
                fetch("/api/add", {
                    method: "POST",
                    body: JSON.stringify({
                        id: index,
                        source: this.source // song already exists, metadata unecessary
                    })
                }).then(x => {
                    if (x.status == 200)
                    {
                        this.$emit("requestUpdate")
                    }
                })
            },
            update() {
                this.$refs.editSongPopup.showModal = true
            },
            remove() {
                fetch("/api/remove", {
                    method: "POST",
                    body: JSON.stringify({
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
                fetch("/api/at", {
                    method: "POST",
                    body: JSON.stringify(body)
                })
            },
            setFavourite() {
                fetch("/api/updateSong", {
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
            },
            favourited() {
                this.setFavourite()
            },
            favourite() {
                console.log("mounted", this.title, this.favourite, this.favourited)
                this.favourited = this.favourite
                this.highlighted = false
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
        width: 50%;
    }

    .title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 100%;
        position: relative;
        color: var(--font-colour);
    }

    .artist {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 100%;
        position: relative;
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
        position: relative;
        width: calc(100% - 40px - 10px);
        align-items: flex-start;
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