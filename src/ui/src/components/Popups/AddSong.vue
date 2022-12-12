<template>
    <div>
        <vue-final-modal @click="hideFindSourcesCtx" v-model="showModal" classes="modal-container" content-class="modal-content">
            <div class="wrapper">
                <div class="header">
                    <h3>Add song - LEGACY</h3>
                    <button class="modal-close" @click="showModal = false">
                        <span class="material-icons-round">
                            close
                        </span>
                    </button>
                </div>
                <h4>Source</h4>
                <FindSources ref="findSources" :src="$refs.source?.value" :title="title" :artist="artist">
                    <div class="content">
                        <button @click="() => $refs.upSong.click()">
                            <span class="material-symbols-rounded">file_upload</span>
                        </button>
                        <input type="file" ref="upSong" style="display: none" accept="audio/mp3" />

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
                    <button @click="() => $refs.upCover.click()">
                        <span class="material-symbols-rounded">file_upload</span>
                    </button>
                    <input type="file" ref="upCover" style="display: none" accept="image/*" />

                    <input type="text" class="addSong cover" v-model="cover" ref="cover">
                    <img @click="openInNewTab" class="addSong cover"
                        :src="parseCover(cover)">
                </div>
                <div class="confirm">
                    <button @click="add" class="negative">Add</button>
                </div>
            </div>
        </vue-final-modal>
    </div>
</template>
<script>
    import FindSources from '../ContextMenus/FindSources.vue';
    import {unhashPlaylist, hashTrack, parseCover} from "@/common";

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
        mounted() {
            const id = hashTrack(String(new Date().getTime()));

            this.$refs.upSong.addEventListener("change", () => {
                const data = new FormData()
                var file = this.$refs.upSong.files[0];

                var blob = file.slice(0, file.size, file.type);
                var newFile = new File([blob], id + ".mp3", {type: file.type});

                data.append('file', newFile);

                fetch('/api/config/tracks', {
                    method: 'POST',
                    body: data
                }).then(x => x.text()).then(url => this.$refs.source.value = url)
            });

            this.$refs.upCover.addEventListener("change", () => {
                const data = new FormData()
                var file = this.$refs.upCover.files[0];

                var blob = file.slice(0, file.size, file.type);
                const ext = file.name.split('.').pop();
                var newFile = new File([blob], id + `.${ext}`, {type: file.type});

                data.append('file', newFile);

                fetch('/api/config/images', {
                    method: 'POST',
                    body: data
                }).then(x => x.text()).then(url => this.cover = url)
            });
        },
        watch: {
            showModal() {
                if (!this.showModal)
                {
                    return;
                }

                navigator.clipboard.readText().then(x => {
                    if (!this.isValidHttpUrl(x))
                    {
                        return;
                    }
                    this.$refs.source.value = x;
                    this.loadMetadata()
                })
            }
        },
        methods: {
            parseCover,
            isValidHttpUrl(string) {
                let url;
                
                try {
                    url = new URL(string);
                } catch (_) {
                    return false;  
                }

                return url.protocol === "http:" || url.protocol === "https:";
            },
            opencontextmenu(evt) {                
                this.$refs.findSources.show(evt)
            },
            hideFindSourcesCtx() {
                this.$refs.findSources.hide()
            },
            getId() {
                return Number(unhashPlaylist(this.$route.params.id));
            },
            add() {
                this.showModal = false
                console.log("fetch")
                fetch(`/api/playlists/${this.getId()}/tracks`, {
                    method: "POST",
                    body: JSON.stringify({
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
                fetch("/api/browse/track", {
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

<style scoped lang="scss">

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

        button {
            border: none;
            border-radius: 5px;
            width: 42px;
            background: var(--font-colour);
            display: flex;

            span {
                color: var(--font-contrast);
                font-variation-settings: 'wght' 250;
                margin: auto;
            }

            &:first-child {
                 margin-right: 10px;
             }

            &:not(:first-child) {
                 margin-left: 10px;
             }

            &:hover {
                 background: var(--font-darker);
                 cursor: pointer;
             }
        }
    }

    input[type="text"] {
        background: var(--hover-1);
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