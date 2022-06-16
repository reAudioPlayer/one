<template>
    <div>
        <vue-final-modal v-model="showModal" classes="modal-container" content-class="modal-content">
            <div class="wrapper">
                <div class="header">
                    <h3>Edit details</h3>
                    <button class="modal-close" @click="showModal = false">
                        <span class="material-icons-round">
                            close
                        </span>
                    </button>
                </div>
                <h4>Name</h4>
                <div class="content">
                    <input v-model="name" type="text" ref="name">
                </div>
                <h4>Description</h4>
                <div class="content">
                    <input v-model="description" type="text" ref="description">
                </div>
                <h4>Cover</h4>
                <div class="content">
                    <input type="text" class="addSong cover" v-model="cover" ref="cover">
                    <img @click="openInNewTab" class="addSong cover"
                        :src="cover ? cover : '/assets/img/music_placeholder.png'">
                </div>
                <div class="confirm">
                    <button @click="remove" class="negative left">Delete</button>
                    <button @click="apply" class="negative">Save</button>
                </div>
            </div>
        </vue-final-modal>
    </div>
</template>
<script>
    import Hashids from 'hashids'
    const hashids = new Hashids("reapOne.playlist", 22)

    export default {
        name: "EditPlaylist",
        props: {
            playlistName: String,
            playlistDescription: String,
            playlistCover: String
        },
        data() {
            return {
                showModal: false,
                cover: "",
                name: this.playlistName,
                description: this.playlistDescription,
                cover: this.playlistCover
            }
        },
        methods: {
            apply() {                
                this.showModal = false
                console.log("fetch")
                fetch("/api/updatePlaylist", {
                    method: "POST",
                    body: JSON.stringify({
                        id: Number(hashids.decode(this.$route.params.id)),
                        name: this.name || "N/A",
                        description: this.description || "N/A",
                        cover: this.cover || "/assets/img/music_placeholder.png"
                    })
                }).then(x => {
                    console.log(x)
                    this.$emit("close")
                })
            },
            remove() {
                fetch(`/api/playlist/${Number(hashids.decode(this.$route.params.id))}`, {
                    method: "DELETE"
                }).then(() => {
                    this.$router.push("/")
                })
            },
            openInNewTab() {
                window.open(this.cover ? this.cover : '/assets/img/music_placeholder.png')
            }
        },
        watch: {
            playlistName() {
                this.name = this.playlistName
            },
            playlistDescription() {
                this.description = this.playlistDescription
            },
            playlistCover() {
                this.cover = this.playlistCover
            }
        }
    }
</script>

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
        width: 100%;
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

    button.negative:hover {
        cursor: pointer;
        padding: 11px 26px 11px 26px;
        border-radius: 21px;
    }

    .negative.left {
        margin-left: 0;
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
</style>