<template>
    <div class="padding-20">
        <CollectionHeader />
        <div class="playlists">
            <full-shelf heading="Playlists">
                <playlist-item-big v-if="likedTracks?.songs?.length" title="Liked Songs" :description="`${likedTracks?.songs?.length} liked Songs`" href="/collection/tracks" />
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

    import Hashids from 'hashids'
    const hashids = new Hashids("reapOne.playlist", 22)

    export default {
        components: {
            CollectionHeader,
            PlaylistItem,
                FullShelf,
                PlaylistItemBig
        },
        name: 'Playlists',

        data() {
            fetch("/api/playlists")
                .then(x => x.json())
                .then(async jdata => {
                    for (let i = 0; i < jdata.length; i++) {
                        const resp = await fetch("/api/playlist", {
                            method: "POST",
                            body: JSON.stringify({ 
                                id: i
                            })
                        })
                        const jdata = await resp.json()
                        this.playlists.push({
                            name: jdata.name,
                            description: jdata.description,
                            cover: jdata.songs[0].cover,
                            href: `/playlist/${hashids.encode(i)}`
                        })
                    }
                })
            fetch("/api/collection/tracks")
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