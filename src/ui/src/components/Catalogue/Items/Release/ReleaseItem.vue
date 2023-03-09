<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <Card class="wrapper" with-hover>
        <add-album-to-playlist
            :id="this.href?.replace('https://open.spotify.com/album/', '')"
            ref="addAlbum"
            :album="{
                id: this.href?.replace('https://open.spotify.com/album/', ''),
                title: this.title,
                artist: this.artist,
                cover: this.cover,
                href: this.href,
                releaseDate: this.releaseDate
            }"
            :artist="artist"
            :cover="cover"
            :href="href"
            :title="title"
        />
        <div class="item" @click="redirect">
            <img :src="cover" />
            <h4>{{title}}</h4>
            <p>{{artist}}</p>
            <p v-if="releaseDate" class="note">Released on {{releaseDate}}</p>
        </div>
    </Card>
</template>

<script>
import AddAlbumToPlaylist from "../../../popups/ImportSpotifyAlbum.vue";
import Card from "@/containers/Card.vue";

export default {
        name: 'ReleaseItem',
        components: { Card, AddAlbumToPlaylist },
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
