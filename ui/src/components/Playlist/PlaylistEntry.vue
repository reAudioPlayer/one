<template>
    <SongCtx @like="favourited = !favourited" :liked="favourited" ref="ctxMenu">
        <div @dblclick="() => { playAt(); onselect() }" @click="onselect" @mouseover="displayPlay" @mouseleave="displayId" class="playlistEntry"
            :class="{ 'selected': highlighted }">
            <span @click="playAt" ref="idOrPlay" class="id">{{index + 1}}</span>
            <div class="track">
                <img :src="cover || '/assets/img/music_placeholder.png'">
                <div class="trackwrapper">
                    <span class="title">{{title}}</span>
                    <span class="artist">{{artist}}</span>
                </div>
            </div>
            <span class="album">{{album}}</span>
            <span @click="favourited = !favourited" class="favourite material-icons-round" :class="{ 'showfavourite': favourited || highlighted }">{{favourited ? "favorite" : "favorite_border"}}</span>
            <span class="duration">{{duration}}</span>
            <span @click="showCtxMenu" class="more material-icons-round" :class="{ 'hidden': !highlighted }">more_horiz</span>
        </div>
    </SongCtx>
</template>

<script>
    import SongCtx from '../ContextMenus/SongCtx.vue'

    export default {
        name: 'PlaylistEntry',
        components: {
            SongCtx
        },
        props: {
            index: Number,
            id: Number,
            artist: {
                type: String,
                default: "N/A"
            },
            cover: {
                type: String,
                default: "/assets/img/music_placeholder.png"
            },
            title: {
                type: String,
                default: "N/A"
            },
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
            }
        },
        data() {
            return {
                highlighted: false,
                favourited: this.favourite
            }
        },
        methods: {
            hideCtxMenu() {
                this.$refs.ctxMenu.hide()
            },
            showCtxMenu(evt) {
                console.log("show")
                this.$refs.ctxMenu.show(evt)
            },
            onselect() {
                this.highlighted = !this.highlighted
                this.hideCtxMenu()
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
            playAt() {
                fetch("http://localhost:1234/api/at", {
                    method: "POST",
                    body: JSON.stringify({
                        index: this.index
                    })
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
                        cover: this.cover
                    })
                })
            }
        },
        watch: {
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

    .id {
        width: 50px;
        text-align: right;
        line-height: var(--playlistEntry-height);
    }

    .favourite {
        width: 50px;
        text-align: right;
        line-height: var(--playlistEntry-height);
        margin-right: 10px;
        visibility: hidden;
        font-size: 1.4em;
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

    .id:hover {
        cursor: pointer;
    }

    .track {
        width: 40vw;
        margin-left: 10px;
        display: flex;
        flex-direction: row;
    }

    .title {
        color: var(--font);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 100%;
    }

    .album {
        flex-grow: 1;
        margin-left: 5px;
        line-height: var(--playlistEntry-height);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 20vw;
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
        width: 35vw;
        margin-right: 100px;
    }

    .duration {
        text-align: right;
        margin-right: 20px;
        line-height: var(--playlistEntry-height);
        width: 50px;
    }

    .more {
        line-height: var(--playlistEntry-height);
        width: 20px;
        margin-right: 20px;
    }

    .more:hover {
        cursor: pointer;
    }
</style>