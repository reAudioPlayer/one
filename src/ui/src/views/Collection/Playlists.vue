<template>
    <div class="padding-20">
        <CollectionHeader />
        <div class="playlists">
            <full-shelf heading="Playlists">
                <playlist-item-big v-if="likedTracks?.songs?.length" title="Liked Songs" icon="favorite" :description="`${likedTracks?.songs?.length} liked songs`" href="/collection/tracks" />
                <playlist-item-big title="Breaking Songs" :description="`your 25 newest songs`" icon="trending_up" href="/collection/tracks/breaking" />
                <playlist-item v-for="(element, index) in playlists" :key="index" :href="element.href" :cover="element.cover"
                    :description="element.description" :title="element.name" :spotify="false" />
            </full-shelf>
            <full-shelf heading="Import From Spotify">
                <playlist-item v-for="(element, index) in spotifyPlaylists" :key="index" :cover="element.cover"
                    :description="element.description" :title="element.name" :id="element.id" :spotify="true" :href="`https://open.spotify.com/playlist/${element.id}`" />
            </full-shelf>
        </div>
    </div>
</template>

<script>
    import FullShelf from '@/components/Catalogue/FullShelf.vue'
    import PlaylistItem from '@/components/Catalogue/Items/Playlists/PlaylistItem.vue'
    import PlaylistItemBig from '@/components/Catalogue/Items/Playlists/PlaylistItemBig.vue'
    import CollectionHeader from '@/components/CollectionHeader.vue'

    import {mapState} from "vuex";

    export default {
        components: {
            CollectionHeader,
            PlaylistItem,
            FullShelf,
            PlaylistItemBig
        },
        computed: mapState({
            "playlists": state => state.playlists,
        }),
        data() {
            fetch("/api/me/liked")
                .then(x => x.json())
                .then(jdata => {
                    this.likedTracks = jdata
                })
            fetch("/api/spotify/playlists")
                .then(x => x.json())
                .then(jdata => {
                    this.spotifyPlaylists = jdata
                })

            return {
                likedTracks: null,
                spotifyPlaylists: []
            }
        }
    }
</script>

<style scoped>
    .padding-20 {
        padding: 20px;
    }
</style>