<template>
    <div class="home">
        <h1>{{greeting}}</h1>
        <full-shelf-smaller-grid>
            <playlist-item-wide v-for="(element, index) in playlists" :key="index" :href="`/playlist/${index}`" :cover="element.cover"
                        :title="element.name" :spotify="false" />
        </full-shelf-smaller-grid>
        <shelf heading="New releases for you" href="/collection/releases">
            <release-item v-for="element in releases" :key="element.url" :releaseDate="element.releaseDate" :cover="element.cover" :href="element.url" :artist="element.artists.join(', ')" :title="element.title" />
        </shelf>
    </div>
</template>

<script>
import FullShelfSmallerGrid from '../Catalogue/FullShelfSmallerGrid.vue'
import PlaylistItemWide from '../Catalogue/Items/Playlists/PlaylistItemWide.vue'
import ReleaseItem from '../Catalogue/Items/Release/ReleaseItem.vue'
import Shelf from '../Catalogue/Shelf.vue'
    export default {
  components: { Shelf, ReleaseItem, PlaylistItemWide, FullShelfSmallerGrid },
        name: 'Home',
        data() {
            const time = new Date()
            const greeting = time.getHours() < 12 ? "Good morning" : time.getHours() < 18 ? "Good afternoon" : "Good evening"
            return {
                greeting,
                releases: [ ],
                playlists: [ ]
            }
        },
        mounted() {
            fetch("http://localhost:1234/api/releases")
                .then(x => x.json())
                .then(jdata => {
                    this.releases.length = 0
                    this.releases.push(...jdata)
                })
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
        }
    }
</script>

<style scoped>
    .home {
        padding: 20px;
    }
</style>
