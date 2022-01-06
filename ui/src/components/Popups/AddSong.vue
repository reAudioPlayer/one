<template>
    <div>
        <vue-final-modal @click="hideFindSourcesCtx" v-model="showModal" classes="modal-container" content-class="modal-content">
            <div class="wrapper">
                <div class="header">
                    <h3>Add song</h3>
                    <button class="modal-close" @click="showModal = false">
                        <span class="material-icons-round">
                            close
                        </span>
                    </button>
                </div>
                <h4>Source</h4>
                <FindSources ref="findSources" :title="title" :artist="artist">
                    <div class="content">
                        <input @change="loadMetadata" type="text" ref="source">
                        <span class="material-icons-round more" ref="sourceMore" @click="opencontextmenu">more_vert</span>
                    </div>
                </FindSources>
                <h4>Title</h4>
                <div class="content">
                    <input v-model="title" type="text">
                </div>
                <h4>Album</h4>
                <div class="content">
                    <input type="text" ref="album">
                </div>
                <h4>Artist</h4>
                <div class="content">
                    <input v-model="artist" type="text">
                </div>
                <h4>Cover</h4>
                <div class="content">
                    <input type="text" class="addSong cover" v-model="cover" ref="cover">
                    <img @click="openInNewTab" class="addSong cover"
                        :src="cover ? cover : '/assets/img/music_placeholder.png'">
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
        name: "AddSong",
        components: {
            FindSources
        },
        data() {
            return {
                showModal: false,
                cover: "",
                artist: "",
                title: ""
            }
        },
        methods: {
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
                        id: Number(this.$route.params.id),
                        source: this.$refs.source.value,
                        title: this.title,
                        artist: this.artist,
                        album: this.$refs.album.value,
                        cover: this.cover
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
                        this.title = jdata.title
                        this.$refs.album.value = jdata.album
                        this.artist = jdata.artists.join(", ")
                        this.cover = jdata.cover
                        this.$refs.source.value = jdata.src
                    })
            },
            openInNewTab() {
                window.open(this.cover ? this.cover : '/assets/img/music_placeholder.png')
            }
        }
    }
</script>


<style>
    .modal-container {
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
        color: var(--font-colour);
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
        color: var(--font-colour);
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
        color: var(--hover-4);
        background-color: var(--font-colour);
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
</style>