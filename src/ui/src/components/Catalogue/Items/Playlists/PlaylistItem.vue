<template>
    <div class="wrapper drop-shadow-md">
        <add-playlist-to-playlist
            :playlist="{
                cover,
                name: title,
                description,
                id,
                href
            }"
            ref="import"
            v-if="spotify"
        />
        <div class="item" @click="redirect">
            <Cover :src="parseCover(cover)" type="playlist" />
            <h4>{{title}}</h4>
            <p class="text-muted text-xs hideIfMobile" v-html="description" />
        </div>
    </div>
</template>

<script>
    import {parseCover} from "@/common";
    import AddPlaylistToPlaylist from '../../../popups/ImportSpotifyPlaylist.vue'
    import Cover from "@/components/image/Cover.vue";
    export default {
        components: {Cover, AddPlaylistToPlaylist },
        name: 'PlaylistItem',
        methods: {
            parseCover,
            redirect() {
                if (!this.spotify)
                {
                    this.$router.push(this.href)
                }
                else
                {
                    this.$refs.import.show()
                }
            }
        },
        props: {
            cover: String,
            title: String,
            description: String,
            href: String,
            spotify: Boolean,
            id: String
        }
    }
</script>

<style scoped lang="scss">
    $horizontalWidth: 1200px;
    $mobileWidth: 950px;

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
        height: calc(100% - 40px);

        @media screen and (max-width: $mobileWidth) {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
    }

    img {
        width: 100%;
        border-radius: 12px;

        @media screen and (max-width: $mobileWidth) {
            width: 20%;
        }
    }

    h4 {
        margin-bottom: 0;

        @media screen and (max-width: $mobileWidth) {
            margin-left: 20px;
        }
    }

    p {
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
