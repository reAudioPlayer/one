<template>
    <div class="itemBig">
        <add-album-to-playlist :id="this.href.replace('https://open.spotify.com/album/', '')" :cover="cover" :title="title" :artist="artist" ref="addAlbum" />
        <div class="item" @click="redirect">
            <div class="wrapper">
                <h4>{{title}}</h4>
            <p>{{description}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import AddAlbumToPlaylist from '../../../Popups/AddAlbumToPlaylist.vue'
    export default {
  components: { AddAlbumToPlaylist },
        name: 'ReleaseItemBig',
        methods: {
            redirect() {
                this.$router.push(this.href)
            }
        },
        props: {
            title: String,
            description: String,
            href: String
        }
    }
</script>

<style scoped lang="scss">
    $horizontalWidth: 1200px;
    $mobileWidth: 950px;

    p.note {
        font-size: .8em;
    }

    .itemBig {
        grid-column: span 2;
        background: linear-gradient(to bottom right, #450bf5, #8d8ce5);
        border-radius: 5px;
        min-height: 10vh;
        margin: 10px;

        @media screen and (max-width: $mobileWidth) {
            grid-column: span 1;
        }
    }

    .item {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 20px;
        height: calc(100% - 40px);
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .itemBig:hover {
        cursor: pointer;
    }

    img {
        width: 50%;
        border-radius: 2px;
    }

    h4 {
        margin: 0;
        font-size: 2em;
    }

    p {
        margin: 0;
        color: var(--font-colour);
    }
</style>
