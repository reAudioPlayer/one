<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <Card class="itemBig" with-hover>
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
            <img :src="cover"/>
            <div class="wrapper">
                <h4>{{ title }}</h4>
                <p>{{ artist }}</p>
                <p v-if="releaseDate" class="note">Released on {{ releaseDate }}</p>
            </div>
        </div>
    </Card>
</template>

<script>
import AddAlbumToPlaylist from "../../../popups/ImportSpotifyAlbum.vue";
import Card from "@/containers/Card.vue";

export default {
    components: { Card, AddAlbumToPlaylist},
    name: 'ReleaseItemBig',
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
    font-size: .8em;
}

.itemBig {
    grid-column: span 2;
    background: var(--bg-base-lt);
    border-radius: 20px;
    min-height: 10vh;
    margin: 10px;
}

.item {
    display: flex;
    flex-direction: row;
    padding: 20px;
    height: 100%;
}

.wrapper {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.itemBig:hover {
    cursor: pointer;
    background: var(--bg-hover-dk);
}

img {
    width: 50%;
    border-radius: 12px;
}

h4 {
    margin: 0;
    font-size: 1.2em;
}

p {
    margin: 0;
    color: var(--fg-base-dk);
    font-size: .9em;
}
</style>
