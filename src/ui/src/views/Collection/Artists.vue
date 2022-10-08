<template>
    <div class="padding-20">
        <CollectionHeader />
        <div class="artists">
            <full-shelf heading="Following on Spotify">
                <artist-item v-for="(element, index) in spotifyArtists" :key="index" :cover="element.cover"
                    :description="element.description" :name="element.name" :id="element.id" />
            </full-shelf>
        </div>
    </div>
</template>

<script>
import FullShelf from '@/components/Catalogue/FullShelf.vue'
import ArtistItem from '@/components/Catalogue/Items/Artist/ArtistItem.vue'
import CollectionHeader from '@/components/CollectionHeader.vue'
    export default {
        components: { CollectionHeader, ArtistItem, FullShelf },
        name: 'Artists',
        data() {
            fetch("/api/spotify/artists")
                .then(x => x.json())
                .then(jdata => this.spotifyArtists.push(...jdata))
            return {
                spotifyArtists: [ ]
            }
        }
    }
</script>

<style scoped>
    .padding-20 {
        padding: 20px;
    }
</style>
