<template>
    <div class="wrapper drop-shadow-md">
        <add-album-to-playlist
            :id="this.href?.replace('https://open.spotify.com/album/', '')"
            :cover="cover"
            :title="title"
            :artist="artist"
            :href="href"
            ref="addAlbum"
            :album="{
                id: this.href?.replace('https://open.spotify.com/album/', ''),
                title: this.title,
                artist: this.artist,
                cover: this.cover,
                href: this.href,
                releaseDate: this.releaseDate
            }"
        />
        <div class="item" @click="redirect">
            <img :src="cover" />
            <h4>{{title}}</h4>
            <p>{{artist}}</p>
            <p class="note" v-if="releaseDate">Released on {{releaseDate}}</p>
        </div>
    </div>
</template>

<script>
import AddAlbumToPlaylist from '../../../popups/ImportSpotifyAlbum.vue';
    export default {
        name: 'ReleaseItem',
        components: { AddAlbumToPlaylist },
        methods: {
            redirect() {
                this.$refs.addAlbum.show()
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
        background: var(--bg-base-lt);
        border-radius: 20px;
        min-height: 10vh;
        margin: 10px;
    }

    .wrapper:hover {
        cursor: pointer;
        background: var(--bg-hover-dk);
    }

    .item {
        padding: 20px;
        height: 100%;
    }

    img {
        width: 100%;
        border-radius: 12px;
        margin-bottom: 1em;
    }

    h4 {
        margin: 0;
    }

    p {
        margin: 0;
        color: var(--fg-base-dk);
        font-size: .8em;
    }
</style>
