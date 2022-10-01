<template>
    <div class="wrapper drop-shadow-md">
        <add-song-to-playlist :href="href" :cover="cover" :title="title" :artist="artist" :preview="preview" ref="addAlbum" />
        <div class="item" @click="redirect">
            <img :src="cover" />
            <h4>{{title}}</h4>
            <p>{{artist}}</p>
            <p class="note" v-if="releaseDate">Released on {{releaseDate}}</p>
        </div>
    </div>
</template>

<script>
    import AddSongToPlaylist from '../../../Popups/AddSongToPlaylist.vue'
    export default {
        components: { AddSongToPlaylist },
        name: 'SearchItem',
        methods: {
            redirect() {
                this.$refs.addAlbum.showModal = true
            }
        },
        props: {
            cover: String,
            title: String,
            artist: String,
            releaseDate: String,
            href: String,
            preview: String
        }
    }
</script>

<style scoped>
    p.note {
        font-size: .7em;
    }

    .wrapper {
        background: var(--background-light);
        min-height: 10vh;
        margin: 10px;
        border-radius: 20px;
        padding: 20px;
    }

    .wrapper:hover {
        cursor: pointer;
        background: var(--hover-1);
    }

    .item {
        height: calc(100% - 40px);
    }

    img {
        width: 100%;
        border-radius: 12px;
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
