<template>
    <div class="wrapper">
        <add-album-to-playlist :id="this.href.replace('https://open.spotify.com/album/', '')" :cover="cover" :title="title" :artist="artist" :href="href" ref="addAlbum" />
        <div class="item" @click="redirect">
            <img :src="cover" />
            <h4>{{title}}</h4>
            <p>{{artist}}</p>
            <p class="note" v-if="releaseDate">Released on {{releaseDate}}</p>
        </div>
    </div>
</template>

<script>
import AddAlbumToPlaylist from '../../../Popups/AddAlbumToPlaylist.vue'
    export default {
        name: 'ReleaseItem',
        components: { AddAlbumToPlaylist },
        methods: {
            redirect() {
                this.$refs.addAlbum.showModal = true
            }
        },
        props: {
            cover: String,
            title: String,
            artist: String,
            href: String,
            releaseDate: String
        }
    }
</script>

<style scoped>
    p.note {
        font-size: .7em;
    }

    .wrapper {
        background: var(--background-light);
        border-radius: 5px;
        min-height: 10vh;
        margin: 10px;
    }

    .wrapper:hover {
        cursor: pointer;
        background: var(--hover-1);
    }

    .item {
        padding: 20px;
        height: calc(100% - 40px);
    }

    img {
        width: 100%;
        border-radius: 2px;
    }

    h4 {
        margin: 0;
    }

    p {
        margin: 0;
        color: var(--font-darker);
        font-size: .8em;
    }
</style>
