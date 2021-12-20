<template>
    <div @dblclick="() => { playAt(); onselect() }" @click="onselect" @mouseover="displayPlay" @mouseleave="displayId" class="playlistEntry"
        :class="{ 'selected': highlighted }">
        <span @click="playAt" ref="idOrPlay" class="id">{{id + 1}}</span>
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
    </div>
</template>

<script>
    export default {
        name: 'PlaylistEntry',
        props: {
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
            onselect() {
                this.highlighted = !this.highlighted
            },
            displayPlay() {
                const element = this.$refs.idOrPlay
                element.innerHTML = "play_arrow"
                element.classList.add("material-icons-round")
            },
            displayId() {
                const element = this.$refs.idOrPlay
                element.innerHTML = this.id + 1
                element.classList.remove("material-icons-round")
            },
            playAt() {
                fetch("http://localhost:1234/api/at", {
                    method: "POST",
                    body: JSON.stringify({
                        index: this.id
                    })
                })
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
        margin-right: 20px;
        visibility: hidden;
        font-size: 1.4em;
    }

    div.playlistEntry:hover .favourite, .showfavourite {
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
        margin: auto;
        margin-left: 10px;
        display: flex;
        flex-direction: row;
    }

    .title {
        color: var(--font);
    }

    .album {
        flex-grow: 1;
        margin-left: 5px;
        line-height: var(--playlistEntry-height);
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
    }

    .duration {
        text-align: right;
        margin-right: 20px;
        line-height: var(--playlistEntry-height);
        width: 40px;
    }
</style>