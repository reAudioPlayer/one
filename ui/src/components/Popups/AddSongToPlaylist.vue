<template>
    <div>
        <vue-final-modal @click="hideFindSourcesCtx" v-model="showModal" classes="modal-container"
            content-class="addAlbumToPlaylistPopup">
            <div class="wrapper">
                <div class="header">
                    <h3>Add song</h3>
                    <button class="modal-close" @click="close">
                        <span class="material-icons-round">
                            close
                        </span>
                    </button>
                </div>
                <h4>To Playlist</h4>
                <select v-model="selectedPlaylist">
                    <option v-for="element in playlists" :key="element">{{element}}</option>
                </select>
                <br>
                <div>
                    <div class="padding-20 playlisteditor" @click="editPlaylist"
                        v-observe-visibility="headerVisibilityChanged">
                        <img class="cover" :src="cover" />
                        <div class="details">
                            <div class="detailswrapper"><h7>Song</h7><span class="material-icons-round share" @click="share">share</span></div>
                            <h1>{{title}}</h1>
                            <h5>{{artist}}</h5>
                        </div>
                    </div>
                </div>
                <div class="confirm">
                    <mini-player class="miniPlayer" :src="preview" />
                    <button @click="add" class="negative">Add</button>
                </div>
            </div>
        </vue-final-modal>
    </div>
</template>
<script>
import MiniPlayer from '../MiniPlayer.vue'
    export default {
  components: { MiniPlayer },
        name: "AddSongToPlaylist",
        props: {
            cover: String,
            artist: String,
            title: String,
            href: String,
            preview: String
        },
        data() {
            return {
                showModal: false,
                selectedPlaylist: -1,
                track: { },
                playlists: [ ]
            }
        },
        methods: {
            share() {
                window.open(this.href)
            },
            close() {
                this.showModal = false
                this.$emit("close")
            },
            loadMetadata() {
                fetch("/api/metadata", {
                        method: "POST",
                        body: JSON.stringify({
                            url: this.href
                        })
                    })
                    .then(x => x.json())
                    .then(jdata => {
                        this.track = jdata
                    })
            },
            openInNewTab() {
                window.open(this.cover ? this.cover : '/assets/img/music_placeholder.png')
            },
            add() {
                const track = this.track
                const id = this.playlists.findIndex(x => x == this.selectedPlaylist)

                console.log(track, id)

                if (id < 0) {
                    alert("no playlist selected")
                    return
                }

                fetch("/api/add", {
                    method: "POST",
                    body: JSON.stringify({
                        id: id,
                        source: track.src,
                        title: track.title,
                        artist: track.artists.join(", "),
                        album: this.title,
                        cover: this.cover
                    })
                }).then(x => {
                    if (x.status == 200) {
                        track.added = true
                        this.close()
                    }
                })
            }
        },
        watch: {
            showModal() {
                if (!this.showModal)
                {
                    return
                }

                fetch("/api/playlists")
                    .then(x => x.json())
                    .then(jdata => {
                        this.playlists.length = 0;
                        this.playlists.push(...jdata)
                    })
                this.loadMetadata()
            }
        }
    }
</script>

<style scoped>

    .share:hover {
        cursor: pointer;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
    }

    .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .content {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }

    input[type="text"] {
        background: var(--hover-2);
        border: 1px solid var(--hover-3);
        border-radius: 5px;
        color: var(--font-colour);
        padding: 10px;
        width: auto;
        flex-grow: 1;
        font-family: var(--font-family);
    }

    input[type="text"]:focus {
        outline: none;
    }

    input[type="text"]:hover {
        background: var(--hover-1);
        border: 1px solid var(--font-colour);
    }

    button.negative {
        color: var(--font-contrast);
        background-color: var(--font-colour);
        border: none;
        border-radius: 20px;
        padding: 10px 25px 10px 25px;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: bold;
        font-family: var(--font-family);
        margin-left: auto;
    }

    .confirm {
        margin-top: 20px;
        height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    .confirm>* {
        margin-left: auto;
    }

    .confirm>.miniPlayer {
        margin-left: 0;
    }

    button.negative:hover {
        cursor: pointer;
        padding: 11px 26px 11px 26px;
        border-radius: 21px;
    }

    input[type="text"].addSong.cover {
        width: auto;
        flex-grow: 1;
    }

    img.addSong.cover {
        height: 42px;
        width: 42px;
        margin-left: 10px;
        border-radius: 5px;
    }

    img.addSong.cover:hover {
        cursor: pointer;
        filter: grayscale(0.4) blur(2px);
    }

    span.more {
        width: 20px;
        line-height: 42px;
    }

    span.more:hover {
        cursor: pointer;
    }

    select {
        background: var(--hover-1);
        border: 1px solid var(--hover-3);
        border-radius: 5px;
        color: var(--font-colour);
        padding: 10px;
        width: auto;
        flex-grow: 1;
        font-family: var(--font-family);
    }

    h7 {
        text-transform: uppercase;
        font-weight: bold;
    }

    option {
        background: var(--accent-dark);
        border: 1px solid var(--hover-3);
        border-radius: 5px;
        color: var(--font-colour);
        padding: 10px;
        width: auto;
        flex-grow: 1;
        font-family: var(--font-family);
    }

    .playlisteditor {
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;
    }

    .playlisteditor>img {
        width: 20%;
        margin-right: 20px;
        border-radius: 5px;
    }

    .playlisteditor>.details {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .playlisteditor>.details>h1 {
        font-size: 2em;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .playlisteditor>.details>.detailswrapper {
        font-size: .8em;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }  

    .playlisteditor>.details>.detailswrapper>.share {
        margin-left: 10px;
        line-height: 15px;
        font-size: 15px;
    }

    .playlisteditor>.details>h5 {
        font-size: .8em;
        margin: 0;
    }
</style>