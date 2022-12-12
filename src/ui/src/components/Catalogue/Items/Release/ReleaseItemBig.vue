<template>
    <div class="itemBig drop-shadow-md">
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
                href: this.href
            }"
        />
        <div class="item" @click="redirect">
            <img :src="cover"/>
            <div class="wrapper">
                <h4>{{ title }}</h4>
                <p>{{ artist }}</p>
                <p class="note" v-if="releaseDate">Released on {{ releaseDate }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import AddAlbumToPlaylist from '../../../popups/ImportSpotifyAlbum.vue'

export default {
    components: {AddAlbumToPlaylist},
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
    background: var(--background-light);
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
    background: var(--hover-1);
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
    color: var(--font-darker);
    font-size: .9em;
}
</style>
