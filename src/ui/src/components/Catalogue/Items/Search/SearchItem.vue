<template>
    <div class="wrapper drop-shadow-md">
        <add-song-to-playlist
            :song="{
                cover,
                artist,
                title,
                preview,
                href
            }"
            ref="addAlbum"
        />
        <div class="item" @click="redirect">
            <Cover :src="cover" />
            <h4>{{title}}</h4>
            <p>{{artist}}</p>
            <p class="note" v-if="releaseDate">Released on {{releaseDate}}</p>
        </div>
    </div>
</template>

<script>
    import AddSongToPlaylist from '../../../popups/ImportSpotifySong.vue'
    import Cover from "@/components/image/Cover.vue";
    export default {
        components: {Cover, AddSongToPlaylist },
        name: 'SearchItem',
        methods: {
            redirect() {
                this.$refs.addAlbum.show()
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
        background: var(--bg-base-lt);
        min-height: 10vh;
        margin: 10px;
        border-radius: 20px;
        padding: 20px;
    }

    .wrapper:hover {
        cursor: pointer;
        background: var(--bg-hover-dk);
    }

    .item {
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
