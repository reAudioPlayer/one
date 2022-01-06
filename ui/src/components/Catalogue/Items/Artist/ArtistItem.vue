<template>
    <div class="wrapper">
        <add-artist-to-playlist :cover="cover" :name="name" :description="description" :id="id" ref="import" />
        <div class="item" @click="redirect">
            <img :src="cover" />
            <h4>{{name}}</h4>
            <p v-html="description" />
        </div>
    </div>
</template>

<script>
    import AddArtistToPlaylist from '../../../Popups/AddArtistToPlaylist.vue'
    export default {
        components: { AddArtistToPlaylist },
        name: 'ArtistItem',
        methods: {
            redirect() {
                this.$refs.import.showModal = true
            }
        },
        props: {
            cover: String,
            name: String,
            description: String,
            id: String
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
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
