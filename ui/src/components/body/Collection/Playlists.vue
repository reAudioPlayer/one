<template>
    <div class="padding-20">
        <CollectionHeader />
        <div class="playlists">
            <full-shelf heading="Playlists">
                <playlist-item-big v-if="likedTracks?.songs?.length" title="Liked Songs" :description="`${likedTracks?.songs?.length} liked Songs`" href="/collection/tracks" />
                <playlist-item v-for="(element, index) in playlists" :key="index" :href="`/playlist/${index}`" :cover="element.cover"
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
    import FullShelf from '../../Catalogue/FullShelf.vue'
    import PlaylistItem from '../../Catalogue/Items/Playlists/PlaylistItem.vue'
    import PlaylistItemBig from '../../Catalogue/Items/Playlists/PlaylistItemBig.vue'
    import CollectionHeader from './CollectionHeader.vue'
    export default {
        components: {
            CollectionHeader,
            PlaylistItem,
                FullShelf,
                PlaylistItemBig
        },
        name: 'Playlists',

        data() {
            fetch("http://localhost:1234/api/playlists")
                .then(x => x.json())
                .then(async jdata => {
                    for (let i = 0; i < jdata.length; i++) {
                        const resp = await fetch("http://localhost:1234/api/playlist", {
                            method: "POST",
                            body: JSON.stringify({ 
                                id: i
                            })
                        })
                        const jdata = await resp.json()
                        this.playlists.push({
                            "name": jdata.name,
                            "description": jdata.description,
                            "cover": jdata.songs[0].cover
                        })
                    }
                })
            fetch("http://localhost:1234/api/collection/tracks")
                .then(x => x.json())
                .then(jdata => {
                    this.likedTracks = jdata
                })
            fetch("http://localhost:1234/api/spotify/playlists")
                .then(x => x.json())
                .then(jdata => {
                    this.spotifyPlaylists = jdata
                })

            return {
                playlists: [],
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