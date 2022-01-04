<template>
    <div>
        <vue-final-modal @click="hideFindSourcesCtx" v-model="showModal" classes="modal-containerr"
            content-class="modal-content">
            <div class="wrapper">
                <div class="header">
                    <h3>Add song</h3>
                    <button class="modal-close" @click="close">
                        <span class="material-icons-round">
                            close
                        </span>
                    </button>
                </div>
                <h4>Playlist</h4>
                <select v-model="playlist">
                    <option v-for="element in playlists" :key="element">{{element}}</option>
                </select>
                <h4>Source</h4>
                <FindSources ref="findSources" :title="title" :artist="artist">
                    <div class="content">
                        <input type="text" v-model="dSource" ref="source">
                        <span class="material-icons-round more" ref="sourceMore"
                            @click="opencontextmenu">more_vert</span>
                    </div>
                </FindSources>
                <h4>Title</h4>
                <div class="content">
                    <input v-model="dTitle" type="text">
                </div>
                <h4>Album</h4>
                <div class="content">
                    <input v-model="dAlbum" type="text" ref="album">
                </div>
                <h4>Artist</h4>
                <div class="content">
                    <input v-model="dArtist" type="text">
                </div>
                <h4>Cover</h4>
                <div class="content">
                    <input type="text" class="addSong cover" v-model="dCover" ref="cover">
                    <img @click="openInNewTab" class="addSong cover"
                        :src="dCover ? dCover : '/assets/img/music_placeholder.png'">
                </div>
                <div class="confirm">
                    <button @click="add" class="negative">Add</button>
                </div>
            </div>
        </vue-final-modal>
    </div>
</template>
<script>
    import FindSources from '../ContextMenus/FindSources.vue'
    export default {
        name: "AddSongToPlaylist",
        components: {
            FindSources
        },
        props: {
            cover: String,
            artist: String,
            title: String,
            href: String
        },
        data() {
            //this.$refs.source.value = this.href
            //this.$refs.album.value = this.cover

            fetch("http://localhost:1234/api/playlists")
                .then(x => x.json())
                .then(jdata => {
                    this.playlists.length = 0;
                    this.playlists.push(...jdata)
                })

            return {
                showModal: false,
                dCover: this.cover,
                dArtist: this.artist,
                dTitle: this.title,
                dSource: this.href,
                dAlbum: this.album,
                playlists: [],
                playlist: 0,
            }
        },
        methods: {
            close() {
                this.showModal = false
                this.$emit("close")
            },
            opencontextmenu(evt) {
                this.$refs.findSources.show(evt)
            },
            hideFindSourcesCtx() {
                this.$refs.findSources.hide()
            },
            add() {
                this.showModal = false
                console.log("fetch")
                fetch("http://localhost:1234/api/add", {
                    method: "POST",
                    body: JSON.stringify({
                        id: this.playlist,
                        source: this.$refs.source.value,
                        title: this.dTitle,
                        artist: this.dArtist,
                        album: this.$refs.album.value,
                        cover: this.dCover
                    })
                }).then(x => {
                    console.log(x)
                    this.$emit("close")
                })
            },
            loadMetadata() {
                fetch("http://localhost:1234/api/metadata", {
                        method: "POST",
                        body: JSON.stringify({
                            url: this.$refs.source.value
                        })
                    })
                    .then(x => x.json())
                    .then(jdata => {
                        console.log(jdata)
                        this.dTitle = jdata.title
                        this.$refs.album.value = jdata.album
                        this.dArtist = jdata.artists.join(", ")
                        this.dCover = jdata.cover
                        this.$refs.source.value = jdata.src
                    })
            },
            openInNewTab() {
                window.open(this.cover ? this.cover : '/assets/img/music_placeholder.png')
            }
        },
        watch: {
            dSource() {
                this.loadMetadata()
            }
        }
    }
</script>


<style>
    .modal-containerr {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #0000;
    }

    .modal-content {
        position: relative;
        width: 40%;
        max-height: 70vh;
        padding: 16px;
        overflow: auto;
        background: var(--hover-4);
        border-radius: 10px;
        color: var(--font);
    }

    .modal-close {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        font-size: 1.5em;
        cursor: pointer;
        background: var(--hover-4);
        border: none;
        color: var(--font-darker);
    }

    h3 {
        margin: 0;
    }

    .modal-close:hover {
        color: var(--font);
    }
</style>

<style scoped>
    .wrapper {
        display: flex;
        flex-direction: column;
    }

    .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
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
        color: var(--font);
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
        border: 1px solid var(--font);
    }

    button.negative {
        color: var(--hover-4);
        background-color: var(--font);
        border: none;
        border-radius: 20px;
        padding: 10px 25px 10px 25px;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: bold;
        font-family: var(--font-family);
    }

    .confirm {
        margin-top: 20px;
        height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
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
        background: var(--hover-2);
        border: 1px solid var(--hover-3);
        border-radius: 5px;
        color: var(--font);
        padding: 10px;
        width: auto;
        flex-grow: 1;
        font-family: var(--font-family);
    }

    option {
        background: var(--hover-4);
        border: 1px solid var(--hover-3);
        border-radius: 5px;
        color: var(--font);
        padding: 10px;
        width: auto;
        flex-grow: 1;
        font-family: var(--font-family);
    }
</style>