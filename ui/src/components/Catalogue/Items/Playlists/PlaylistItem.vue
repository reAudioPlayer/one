<template>
    <div class="wrapper">
        <add-playlist-to-playlist :cover="cover" :href="href" :title="title" :description="description" :id="id" ref="import" v-if="spotify" />
        <div class="item" @click="redirect">
            <img :src="cover" />
            <h4>{{title}}</h4>
            <p class="hideIfMobile" v-html="description" />
        </div>
    </div>
</template>

<script>
    import AddPlaylistToPlaylist from '../../../Popups/AddPlaylistToPlaylist.vue'
    export default {
        components: { AddPlaylistToPlaylist },
        name: 'PlaylistItem',
        methods: {
            redirect() {
                if (!this.spotify)
                {
                    this.$router.push(this.href)
                }
                else
                {
                    this.$refs.import.showModal = true
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
        background: var(--background-light);
        border-radius: 20px;
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
        color: var(--font-darker);
        font-size: .8em;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
